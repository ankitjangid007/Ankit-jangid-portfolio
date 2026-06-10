'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { resume } from '@/lib/resume-data';
import { SectionHeader } from './About';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Linkedin, MapPin, Phone, GraduationCap, Award, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      toast.success("Message sent! 🚀", { description: "I'll get back to you within 24 hours." });
      setForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      toast.error('Could not send', { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container max-w-5xl mx-auto px-4">
        <SectionHeader number="05" title="Education & Get In Touch" />

        <div className="grid md:grid-cols-2 gap-5 mt-12">
          {resume.education.map((e) => (
            <Card key={e.school} className="p-5 bg-card/40 border-border/60 backdrop-blur">
              <div className="flex items-start gap-3">
                <GraduationCap className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">{e.degree}</h3>
                  <p className="text-sm text-muted-foreground">{e.school}</p>
                  <p className="text-xs font-mono text-primary mt-1">{e.dates}</p>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{e.details}</p>
                </div>
              </div>
            </Card>
          ))}
          <Card className="p-5 bg-card/40 border-border/60 backdrop-blur">
            <div className="flex items-start gap-3">
              <Award className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div className="w-full">
                <h3 className="font-semibold">Certifications</h3>
                <ul className="mt-2 space-y-2">
                  {resume.certifications.map((c) => (
                    <li key={c.name} className="text-sm flex justify-between gap-2">
                      <span className="text-muted-foreground">{c.name} · <span className="text-foreground/70">{c.provider}</span></span>
                      <span className="font-mono text-xs text-primary">{c.year}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center max-w-2xl mx-auto"
        >
          <p className="font-mono text-primary text-sm">What&apos;s Next?</p>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">Let&apos;s build something great.</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            I&apos;m currently open to freelance projects and senior frontend / full-stack roles.
            Drop a message below — I read every one.
          </p>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 max-w-2xl mx-auto"
        >
          <Card className="p-6 md:p-8 bg-card/40 border-border/60 backdrop-blur">
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-mono text-xs text-primary">NAME</Label>
                  <Input id="name" required minLength={2} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-mono text-xs text-primary">EMAIL</Label>
                  <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="font-mono text-xs text-primary">MESSAGE</Label>
                <Textarea id="message" required minLength={10} rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project, role, or just say hi…" />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <p className="text-xs text-muted-foreground font-mono">
                  Or email me at{' '}
                  <a href={`mailto:${resume.email}`} className="text-primary hover:underline">{resume.email}</a>
                </p>
                <Button type="submit" disabled={loading} className="font-mono">
                  {loading ? (
                    <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Sending…</>
                  ) : (
                    <><Send className="mr-2 w-4 h-4" /> Send Message</>
                  )}
                </Button>
              </div>
            </form>
          </Card>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground mt-10">
            <a href={`mailto:${resume.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" /> {resume.email}
            </a>
            <a href={`tel:${resume.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" /> {resume.phone}
            </a>
            <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {resume.location}</span>
          </div>
        </motion.div>

        <footer className="mt-24 text-center text-xs font-mono text-muted-foreground">
          <p>• Designed & Built by Ankit Jangid •</p>
        </footer>
      </div>
    </section>
  );
}
