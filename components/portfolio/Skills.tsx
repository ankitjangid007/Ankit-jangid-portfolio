'use client';
import { motion } from 'framer-motion';
import { resume } from '@/lib/resume-data';
import { Card } from '@/components/ui/card';
import { SectionHeader } from './About';

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-card/20">
      <div className="container max-w-5xl mx-auto px-4">
        <SectionHeader number="02" title="Skills & Tech Stack" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {resume.skills.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Card className="p-5 h-full bg-card/40 border-border/60 backdrop-blur hover:border-primary/50 hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.4)] transition-all duration-300 group">
                <h3 className="font-mono text-xs uppercase tracking-wider text-primary mb-3">{group.category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2.5 py-1 rounded-md bg-muted/50 text-muted-foreground border border-border/40 group-hover:border-primary/30 group-hover:text-foreground transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
