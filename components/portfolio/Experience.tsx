'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { resume } from '@/lib/resume-data';
import { Card } from '@/components/ui/card';
import { SectionHeader } from './About';
import { Briefcase, MapPin } from 'lucide-react';

export default function Experience() {
  const [active, setActive] = useState(0);
  const job = resume.experience[active];

  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="container max-w-5xl mx-auto px-4">
        <SectionHeader number="03" title="Where I've Worked" />

        <div className="grid md:grid-cols-[260px_1fr] gap-6 mt-12">
          {/* Tabs */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-border">
            {resume.experience.map((e, i) => (
              <button
                key={e.company + i}
                onClick={() => setActive(i)}
                className={`relative whitespace-nowrap md:whitespace-normal text-left px-4 py-3 font-mono text-sm transition-colors ${
                  active === i
                    ? 'text-primary bg-primary/5'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
              >
                {active === i && (
                  <motion.span
                    layoutId="exp-marker"
                    className="absolute md:left-[-1px] md:top-0 md:bottom-0 md:w-0.5 left-0 right-0 bottom-0 h-0.5 md:h-auto bg-primary"
                  />
                )}
                {e.company}
              </button>
            ))}
          </div>

          {/* Detail */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 md:p-8 bg-card/40 border-border/60 backdrop-blur">
              <h3 className="text-xl md:text-2xl font-bold">
                {job.role} <span className="text-primary">@ {job.company}</span>
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-muted-foreground mt-2">
                <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {job.dates}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
              </div>
              <ul className="mt-5 space-y-3">
                {job.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-primary mt-1">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {job.stack.map((s) => (
                  <span key={s} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20 font-mono">
                    {s}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
