'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Download, Mail, MapPin, Github, Linkedin } from 'lucide-react';
import { resume } from '@/lib/resume-data';

const RESUME_URL = '/Ankit-Jangid-Resume.pdf';

const PROFILE_IMAGE = '/profile.jpg'; // ← change to your actual filename

function InitialsAvatar() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-violet-500/20 to-pink-500/20 rounded-full select-none">
      <span className="text-5xl font-bold bg-gradient-to-br from-primary via-violet-400 to-pink-400 bg-clip-text text-transparent">
        AJ
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_75%)]" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-20">
        {/* ── Two-column layout: text left, image right ── */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16">

          {/* ── LEFT: Text content ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start gap-6 md:flex-1"
          >
            {/* Status badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-mono text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Available for freelance &amp; full-time roles
            </span>

            <p className="font-mono text-primary text-sm md:text-base">Hi, my name is</p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              {resume.name}.
            </h1>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-muted-foreground tracking-tight leading-[1.05]">
              I build things for the{' '}
              <span className="bg-gradient-to-r from-primary via-violet-400 to-pink-400 bg-clip-text text-transparent">
                web
              </span>
              .
            </h2>

            <p className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed mt-2">
              Senior Frontend Engineer &amp; MERN Stack Developer with{' '}
              <span className="text-foreground font-semibold">~{resume.yearsOfExperience} years</span> of
              experience shipping production-grade React, Next.js, and Node.js applications. I
              specialise in{' '}
              <span className="text-primary">performance</span>,{' '}
              <span className="text-primary">accessibility</span>, and{' '}
              <span className="text-primary">design systems</span>.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <Button
                size="lg"
                className="font-mono"
                onClick={() =>
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                View My Work <ArrowDown className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-mono border-primary/40 text-primary hover:bg-primary/10"
                asChild
              >
                <a href={`mailto:${resume.email}`}>
                  <Mail className="mr-2 w-4 h-4" /> Get in touch
                </a>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="font-mono text-muted-foreground hover:text-primary"
                asChild
              >
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Ankit-Jangid-Resume.pdf"
                >
                  <Download className="mr-2 w-4 h-4" /> Download Resume
                </a>
              </Button>
            </div>

            {/* Social / contact links */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mt-6">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> {resume.location}
              </span>
              <a
                href={resume.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Linkedin className="w-4 h-4 text-primary" /> LinkedIn
              </a>
              <a
                href={`mailto:${resume.email}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" /> {resume.email}
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT: Profile photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="flex-shrink-0 flex items-center justify-center"
          >
            {/* Outer glow rings */}
            <div className="relative">
              {/* Outermost decorative ring (slow spin) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent 60%, hsl(var(--primary)) 80%, transparent 100%)',
                  padding: '3px',
                  borderRadius: '9999px',
                }}
              >
                <div className="w-full h-full rounded-full bg-background" />
              </motion.div>

              {/* Ambient glow behind the photo */}
              <div className="absolute inset-[-20px] rounded-full bg-primary/15 blur-2xl -z-10" />
              <div className="absolute inset-[-10px] rounded-full bg-violet-500/10 blur-xl -z-10" />

              {/* Photo container */}
              <div
                className="relative rounded-full overflow-hidden border-2 border-primary/30"
                style={{ width: 260, height: 260 }}
              >
                {/* ── Swap InitialsAvatar for <Image> once you add /public/profile.jpg ── */}
                <InitialsAvatar />

                  <InitialsAvatar /> above with this block:

                  <Image
                    src={PROFILE_IMAGE}
                    alt="Ankit Jangid — Senior Frontend Engineer"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="260px"
                  />
                
              </div>

              {/* Floating badge — experience */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-3 -right-4 flex items-center gap-2 rounded-xl border border-primary/30 bg-background/90 backdrop-blur px-3 py-2 shadow-lg"
              >
                <span className="text-xl font-bold bg-gradient-to-br from-primary to-violet-400 bg-clip-text text-transparent">
                  {resume.yearsOfExperience}+
                </span>
                <span className="text-xs text-muted-foreground leading-tight">
                  Years<br />Experience
                </span>
              </motion.div>

              {/* Floating badge — stack */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -top-3 -left-4 flex items-center gap-2 rounded-xl border border-primary/30 bg-background/90 backdrop-blur px-3 py-2 shadow-lg"
              >
                <span className="font-mono text-xs text-primary font-semibold">React · Next.js</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="font-mono text-xs">scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
