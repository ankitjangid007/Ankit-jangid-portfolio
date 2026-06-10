'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Download, Mail, MapPin, Github, Linkedin } from 'lucide-react';
import { resume } from '@/lib/resume-data';

const RESUME_URL = '/Ankit-Jangid-Resume.pdf';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_75%)]" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      </div>

      <div className="container max-w-5xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start gap-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-mono text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Available for freelance & full-time roles
          </span>

          <p className="font-mono text-primary text-sm md:text-base">Hi, my name is</p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
            {resume.name}.
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-muted-foreground tracking-tight leading-[1.05]">
            I build things for the <span className="bg-gradient-to-r from-primary via-violet-400 to-pink-400 bg-clip-text text-transparent">web</span>.
          </h2>

          <p className="max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed mt-2">
            Senior Frontend Engineer & MERN Stack Developer with{' '}
            <span className="text-foreground font-semibold">~{resume.yearsOfExperience} years</span> of experience shipping production-grade React, Next.js,
            and Node.js applications. I specialize in{' '}
            <span className="text-primary">performance</span>,{' '}
            <span className="text-primary">accessibility</span>, and{' '}
            <span className="text-primary">design systems</span>.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Button
              size="lg"
              className="font-mono"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
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
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" download="Ankit-Jangid-Resume.pdf">
                <Download className="mr-2 w-4 h-4" /> Download Resume
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mt-6">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {resume.location}</span>
            <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors"><Linkedin className="w-4 h-4 text-primary" /> LinkedIn</a>
            <a href={`mailto:${resume.email}`} className="flex items-center gap-2 hover:text-primary transition-colors"><Mail className="w-4 h-4 text-primary" /> {resume.email}</a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="font-mono text-xs">scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
