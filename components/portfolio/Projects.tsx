'use client';
import { motion } from 'framer-motion';
import { resume } from '@/lib/resume-data';
import { Card } from '@/components/ui/card';
import { SectionHeader } from './About';
import { Folder, ArrowUpRight } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-card/20">
      <div className="container max-w-5xl mx-auto px-4">
        <SectionHeader number="04" title="Things I've Built" />
        <div className="grid md:grid-cols-2 gap-5 mt-12">
          {resume.projects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Card className={`group relative h-full p-6 bg-card/40 border-border/60 backdrop-blur overflow-hidden hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_15px_40px_-15px_hsl(var(--primary)/0.4)]`}>
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${p.accent} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity`} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <Folder className="w-10 h-10 text-primary" strokeWidth={1.5} />
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{p.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">{p.description}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground">
                        {s}
                      </span>
                    )).reduce((acc: any, el, idx, arr) => {
                      acc.push(el);
                      if (idx < arr.length - 1) acc.push(<span key={`sep-${idx}`} className="text-muted-foreground/40">•</span>);
                      return acc;
                    }, [])}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
