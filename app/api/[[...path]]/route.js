import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import crypto from 'crypto'

let client
let db

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME || 'portfolio')
  }
  return db
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-token')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

// HMAC-signed admin token: payload.signature, payload = base64(JSON({iat, exp}))
function signAdminToken() {
  const secret = process.env.ADMIN_TOKEN_SECRET || 'dev-secret'
  const payload = Buffer.from(
    JSON.stringify({ iat: Date.now(), exp: Date.now() + 1000 * 60 * 60 * 24 * 7 })
  ).toString('base64url')
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

function verifyAdminToken(token) {
  if (!token || typeof token !== 'string') return false
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return false
  const secret = process.env.ADMIN_TOKEN_SECRET || 'dev-secret'
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('base64url')
  if (expected !== sig) return false
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    if (!data.exp || Date.now() > data.exp) return false
    return true
  } catch {
    return false
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function sendContactEmail({ name, email, message, id }) {
  if (!resend) return { skipped: true, reason: 'RESEND_API_KEY not set' }
  const to = process.env.CONTACT_RECIPIENT_EMAIL
  if (!to) return { skipped: true, reason: 'CONTACT_RECIPIENT_EMAIL not set' }

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;max-width:600px;margin:0 auto;background:#0b0b0e;color:#e4e4e7;padding:24px;border-radius:12px;border:1px solid #27272a">
      <h1 style="color:#a78bfa;margin:0 0 8px;font-size:22px">New contact form submission</h1>
      <p style="color:#a1a1aa;margin:0 0 20px;font-size:13px">Sent via your portfolio website</p>
      <div style="background:#18181b;border:1px solid #27272a;border-radius:8px;padding:16px;margin-bottom:12px">
        <div style="font-size:11px;letter-spacing:.08em;color:#a78bfa;text-transform:uppercase;margin-bottom:6px">From</div>
        <div style="font-size:15px;color:#fff">${escapeHtml(name)}</div>
        <div style="font-size:13px;color:#a1a1aa;margin-top:2px"><a style="color:#a78bfa;text-decoration:none" href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
      </div>
      <div style="background:#18181b;border:1px solid #27272a;border-radius:8px;padding:16px">
        <div style="font-size:11px;letter-spacing:.08em;color:#a78bfa;text-transform:uppercase;margin-bottom:6px">Message</div>
        <div style="font-size:14px;color:#e4e4e7;white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</div>
      </div>
      <p style="color:#52525b;font-size:11px;margin-top:18px;font-family:ui-monospace,Menlo,monospace">id: ${id}</p>
    </div>
  `

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [to],
      replyTo: email,
      subject: `[Portfolio] New message from ${name}`,
      html,
    })
    if (error) return { ok: false, error: error.message || String(error) }
    return { ok: true, id: data?.id }
  } catch (err) {
    return { ok: false, error: err.message || String(err) }
  }
}

async function handleRoute(request, { params }) {
  const { path = [] } = params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    const db = await connectToMongo()

    if (route === '/root' && method === 'GET') {
      return handleCORS(NextResponse.json({ message: 'Portfolio API live' }))
    }

    // POST /api/contact
    if (route === '/contact' && method === 'POST') {
      const body = await request.json()
      const { name, email, message } = body || {}

      if (!name || !email || !message) {
        return handleCORS(NextResponse.json({ error: 'name, email and message are required' }, { status: 400 }))
      }
      if (typeof email !== 'string' || !email.includes('@')) {
        return handleCORS(NextResponse.json({ error: 'invalid email' }, { status: 400 }))
      }
      if (String(message).length < 10) {
        return handleCORS(NextResponse.json({ error: 'message too short (min 10 chars)' }, { status: 400 }))
      }

      const doc = {
        id: uuidv4(),
        name: String(name).slice(0, 120),
        email: String(email).slice(0, 200),
        message: String(message).slice(0, 4000),
        createdAt: new Date().toISOString(),
      }
      await db.collection('contact_messages').insertOne(doc)

      // fire-and-await email (so we can include success info)
      const emailRes = await sendContactEmail(doc)
      await db.collection('contact_messages').updateOne(
        { id: doc.id },
        { $set: { emailStatus: emailRes.ok ? 'sent' : (emailRes.skipped ? 'skipped' : 'failed'), emailError: emailRes.error || null, emailProviderId: emailRes.id || null } }
      )

      const { _id, ...clean } = doc
      return handleCORS(NextResponse.json({ ok: true, data: clean, emailDelivered: !!emailRes.ok }))
    }

    // POST /api/admin/login
    if (route === '/admin/login' && method === 'POST') {
      const body = await request.json().catch(() => ({}))
      const { password } = body || {}
      if (!password || password !== process.env.ADMIN_PASSWORD) {
        return handleCORS(NextResponse.json({ error: 'Invalid password' }, { status: 401 }))
      }
      const token = signAdminToken()
      return handleCORS(NextResponse.json({ ok: true, token }))
    }

    // GET /api/admin/messages (protected)
    if (route === '/admin/messages' && method === 'GET') {
      const token = request.headers.get('x-admin-token')
      if (!verifyAdminToken(token)) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      const docs = await db.collection('contact_messages')
        .find({})
        .sort({ createdAt: -1 })
        .limit(500)
        .toArray()
      const clean = docs.map(({ _id, ...rest }) => rest)
      const stats = {
        total: clean.length,
        sent: clean.filter((d) => d.emailStatus === 'sent').length,
        failed: clean.filter((d) => d.emailStatus === 'failed').length,
      }
      return handleCORS(NextResponse.json({ ok: true, stats, messages: clean }))
    }

    // DELETE /api/admin/messages/:id  (protected)
    if (route.startsWith('/admin/messages/') && method === 'DELETE') {
      const token = request.headers.get('x-admin-token')
      if (!verifyAdminToken(token)) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      const id = route.split('/').pop()
      const res = await db.collection('contact_messages').deleteOne({ id })
      return handleCORS(NextResponse.json({ ok: true, deleted: res.deletedCount }))
    }

    // GET /api/admin/verify - check token validity
    if (route === '/admin/verify' && method === 'GET') {
      const token = request.headers.get('x-admin-token')
      const valid = verifyAdminToken(token)
      return handleCORS(NextResponse.json({ valid }, { status: valid ? 200 : 401 }))
    }

    return handleCORS(NextResponse.json({ error: `Route ${route} not found` }, { status: 404 }))
  } catch (error) {
    console.error('API Error:', error)
    return handleCORS(NextResponse.json({ error: 'Internal server error', detail: String(error?.message || error) }, { status: 500 }))
  }
}

export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute
