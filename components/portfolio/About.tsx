'use client';
import { motion } from 'framer-motion';
import { resume } from '@/lib/resume-data';
import { Card } from '@/components/ui/card';

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container max-w-5xl mx-auto px-4">
        <SectionHeader number="01" title="About Me" />

        <div className="grid md:grid-cols-5 gap-10 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3 space-y-4 text-muted-foreground leading-relaxed"
          >
            <p>
              Hello! I&apos;m <span className="text-foreground font-semibold">Ankit</span>, a senior frontend engineer based in Jaipur, India, who genuinely enjoys turning complex problems into clean, performant interfaces.
            </p>
            <p>
              Over the last <span className="text-primary">{resume.yearsOfExperience}+ years</span>, I&apos;ve led frontend delivery at <span className="text-foreground">HCLTech</span> and <span className="text-foreground">Celebal Technologies</span>, shipped enterprise ESG platforms used by 500+ corporate users, and built community products handling 1,000+ concurrent connections.
            </p>
            <p>
              My day-to-day tools are <span className="text-primary">React</span>, <span className="text-primary">Next.js (App Router)</span>, <span className="text-primary">TypeScript</span>, <span className="text-primary">Node.js</span>, and <span className="text-primary">MongoDB</span> — with strong opinions on accessibility, design systems, and CI/CD.
            </p>
            <p>
              I&apos;ve mentored <span className="text-foreground">8+ engineers</span>, grown a <span className="text-foreground">30+ component</span> shared UI library, and consistently delivered <span className="text-foreground">25%</span> smaller bundles and <span className="text-foreground">30%</span> faster releases.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 grid grid-cols-2 gap-3"
          >
            {resume.highlights.map((h) => (
              <Card key={h.label} className="p-5 bg-card/50 border-border/60 backdrop-blur hover:border-primary/50 transition-colors">
                <div className="text-3xl font-bold bg-gradient-to-br from-primary to-violet-400 bg-clip-text text-transparent">{h.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{h.label}</div>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4"
    >
      <h2 className="text-3xl md:text-4xl font-bold whitespace-nowrap">
        {/* <span className="font-mono text-primary text-xl md:text-2xl">{number}.</span> */}
        {title}
      </h2>
      <div className="h-px flex-1 bg-border max-w-xs" />
    </motion.div>
  );
}
