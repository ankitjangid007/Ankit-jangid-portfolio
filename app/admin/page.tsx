'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Lock, Loader2, LogOut, Trash2, Mail, RefreshCw, Inbox, CheckCircle2, XCircle, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const TOKEN_KEY = 'portfolio_admin_token';

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  emailStatus?: 'sent' | 'failed' | 'skipped' | null;
  emailError?: string | null;
  emailProviderId?: string | null;
};

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const t = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
    if (!t) { setChecking(false); return; }
    fetch('/api/admin/verify', { headers: { 'x-admin-token': t } })
      .then((r) => r.json().then((d) => ({ ok: r.ok, d })))
      .then(({ ok }) => { if (ok) setToken(t); else localStorage.removeItem(TOKEN_KEY); })
      .finally(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!token) return <LoginForm onSuccess={(t) => { localStorage.setItem(TOKEN_KEY, t); setToken(t); }} />;

  return <Dashboard token={token} onLogout={() => { localStorage.removeItem(TOKEN_KEY); setToken(null); }} />;
}

function LoginForm({ onSuccess }: { onSuccess: (t: string) => void }) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      toast.success('Welcome back, Ankit 👋');
      onSuccess(data.token);
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
      </div>
      <Card className="w-full max-w-sm p-8 bg-card/60 border-border/60 backdrop-blur-xl">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-3">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-xl font-bold">Admin Access</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter the admin password to continue</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pw" className="font-mono text-xs text-primary">PASSWORD</Label>
            <Input id="pw" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoFocus />
          </div>
          <Button type="submit" disabled={loading} className="w-full font-mono">
            {loading ? <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Verifying…</> : 'Sign In'}
          </Button>
        </form>
        <a href="/" className="block text-center text-xs text-muted-foreground hover:text-primary mt-6 font-mono">← back to portfolio</a>
      </Card>
    </div>
  );
}

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<{ total: number; sent: number; failed: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/messages', { headers: { 'x-admin-token': token } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setMessages(data.messages);
      setStats(data.stats);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    if (!confirm('Delete this message permanently?')) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE', headers: { 'x-admin-token': token } });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Message deleted');
      setSelected(null);
      load();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Inbox className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight">Inbox</h1>
              <p className="text-xs text-muted-foreground font-mono">Contact form submissions</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={load} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <StatCard label="Total Messages" value={stats?.total ?? '—'} icon={<Mail className="w-4 h-4" />} accent="text-primary" />
          <StatCard label="Emails Delivered" value={stats?.sent ?? '—'} icon={<CheckCircle2 className="w-4 h-4" />} accent="text-emerald-400" />
          <StatCard label="Email Failures" value={stats?.failed ?? '—'} icon={<XCircle className="w-4 h-4" />} accent="text-rose-400" />
        </div>

        {/* List */}
        <Card className="bg-card/40 border-border/60 backdrop-blur overflow-hidden">
          {loading ? (
            <div className="py-20 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : messages.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              <Inbox className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p className="font-mono text-sm">No messages yet — share your portfolio!</p>
            </div>
          ) : (
            <ul className="divide-y divide-border/40">
              {messages.map((m) => (
                <li key={m.id}>
                  <button onClick={() => setSelected(m)} className="w-full text-left p-4 hover:bg-muted/30 transition-colors flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 font-mono text-xs text-primary uppercase">
                      {m.name.slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm truncate">{m.name}</span>
                        <span className="text-xs text-muted-foreground truncate">&lt;{m.email}&gt;</span>
                        <EmailBadge status={m.emailStatus} />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{m.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono shrink-0">{formatDate(m.createdAt)}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </main>

      {selected && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <Card className="w-full max-w-2xl bg-card border-border/60 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-border/50 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="font-bold text-lg truncate">{selected.name}</h2>
                <a href={`mailto:${selected.email}`} className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                  {selected.email} <ExternalLink className="w-3 h-3" />
                </a>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground font-mono">
                  <span>{new Date(selected.createdAt).toLocaleString()}</span>
                  <EmailBadge status={selected.emailStatus} />
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button variant="outline" size="sm" asChild>
                  <a href={`mailto:${selected.email}?subject=Re: Your message&body=Hi ${selected.name},%0D%0A%0D%0A`}><Mail className="w-4 h-4 mr-2" /> Reply</a>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => remove(selected.id)} className="text-rose-400 hover:text-rose-300">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="font-mono text-xs text-primary uppercase tracking-wider mb-3">Message</div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">{selected.message}</p>
              {selected.emailError && (
                <div className="mt-6 p-3 rounded-md bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-300">
                  Email error: {selected.emailError}
                </div>
              )}
            </div>
            <div className="p-4 border-t border-border/50 flex justify-end">
              <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>Close</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, accent }: { label: string; value: any; icon: React.ReactNode; accent: string }) {
  return (
    <Card className="p-4 bg-card/40 border-border/60 backdrop-blur">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className={accent}>{icon}</span>
      </div>
      <div className="text-3xl font-bold mt-2">{value}</div>
    </Card>
  );
}

function EmailBadge({ status }: { status?: Message['emailStatus'] }) {
  if (status === 'sent') return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">EMAIL SENT</span>;
  if (status === 'failed') return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">EMAIL FAILED</span>;
  if (status === 'skipped') return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border">EMAIL SKIPPED</span>;
  return null;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString();
}
