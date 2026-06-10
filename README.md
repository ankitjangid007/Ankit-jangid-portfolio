# Ankit Jangid — Developer Portfolio

> A modern, fully-featured developer portfolio built with **Next.js 14 (App Router)**, **TypeScript**, **Zustand**, **Tailwind CSS**, **shadcn/ui**, **MongoDB**, and **Resend**.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Resend](https://img.shields.io/badge/Resend-Email-000?logo=resend)](https://resend.com/)

---

## ✨ Features

- **Hero, About, Skills, Experience, Projects, Contact** — fully-animated single-page portfolio
- **Light / Dark mode toggle** — persisted to `localStorage` with no flash of unstyled content
- **Resume download** — served from `/public` (no ad-blocker issues)
- **Contact form** with MongoDB storage + **Resend email notification** to your inbox
- **Public `/admin` dashboard** — password-protected inbox to view, reply, and delete messages
- **HMAC-SHA256 signed admin tokens** with 7-day expiry
- **Zustand state management** for active section detection, mobile menu, and contact counter
- **Framer Motion** scroll & layout animations
- **shadcn/ui** components throughout
- **SEO-friendly** — admin pages are `noindex`, public pages have proper metadata

---

## 📦 Tech Stack

| Layer | Technology |
|------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand |
| Animation | Framer Motion |
| Database | MongoDB |
| Email | Resend |
| Icons | lucide-react |
| Notifications | sonner |

---

## 🚀 Getting Started

### 1. Clone & install
```bash
git clone https://github.com/ankitjangid007/Ankit-jangid-portfolio.git
cd Ankit-jangid-portfolio
yarn install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Then edit `.env` and fill in:
- `MONGO_URL` — your MongoDB connection string
- `RESEND_API_KEY` — get one at [resend.com/api-keys](https://resend.com/api-keys)
- `CONTACT_RECIPIENT_EMAIL` — where contact form notifications will be sent
- `ADMIN_PASSWORD` — your admin dashboard password
- `ADMIN_TOKEN_SECRET` — any long random string (used to sign tokens)

### 3. Run locally
```bash
yarn dev
```
Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production
```bash
yarn build
yarn start
```

---

## 🗂️ Project Structure

```
.
├── app/
│   ├── admin/                # Password-protected admin dashboard
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── api/[[...path]]/      # Catch-all API route (contact, admin, etc.)
│   │   └── route.js
│   ├── layout.tsx            # Root layout with theme script + metadata
│   ├── page.tsx              # Portfolio home page
│   ├── providers.tsx         # React Query provider
│   └── globals.css
├── components/
│   ├── portfolio/            # Page sections (Hero, About, Skills, ...)
│   └── ui/                   # shadcn/ui primitives
├── lib/
│   ├── store.ts              # Zustand portfolio store
│   ├── resume-data.ts        # All resume content (edit me!)
│   └── utils.ts
├── public/
│   └── Ankit-Jangid-Resume.pdf
└── .env.example
```

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/contact` | public | Submit a contact form message (saves to DB + sends email) |
| `POST` | `/api/admin/login` | password | Returns a signed admin token |
| `GET`  | `/api/admin/verify` | token | Check if a token is still valid |
| `GET`  | `/api/admin/messages` | token | List all contact messages + stats |
| `DELETE` | `/api/admin/messages/:id` | token | Delete a message |

Admin endpoints require the header: `x-admin-token: <token>`

---

## 🔐 Admin Dashboard

Visit `/admin` and log in with your `ADMIN_PASSWORD`.

Features:
- Stat cards — total messages, emails delivered, email failures
- Gmail-style inbox with avatars, timestamps, and email-delivery badges
- Click any message for full detail in a modal (Reply / Delete)
- One-click Reply opens your mail client with a pre-filled response

---

## ✏️ Customising for your own portfolio

All content lives in **`lib/resume-data.ts`** — update:
- `name`, `title`, `summary`, `location`, `email`, `phone`
- `linkedin`, `github`
- `highlights` (the 4 stat cards in About)
- `skills` array (categorised tag clouds)
- `experience` (tabbed timeline)
- `projects` (cards in the Projects section)
- `education`, `certifications`

Replace `public/Ankit-Jangid-Resume.pdf` with your own PDF (keep the filename or update the references in `Hero.tsx` and `Navbar.tsx`).

---

## 🌐 Deployment

Deploy easily to **Vercel**, **Netlify**, or any Node host. Required env vars (set them in your platform dashboard — do **NOT** commit `.env`):

```
MONGO_URL
DB_NAME
NEXT_PUBLIC_BASE_URL
RESEND_API_KEY
CONTACT_RECIPIENT_EMAIL
ADMIN_PASSWORD
ADMIN_TOKEN_SECRET
```

For MongoDB in production, the easiest path is [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier).

---

## 📝 License

MIT · Designed & built by **Ankit Jangid**

- LinkedIn: [linkedin.com/in/ankit-jangid95](https://linkedin.com/in/ankit-jangid95)
- Email: ankitjangid155@gmail.com

If you found this useful, please ⭐️ the repo!
