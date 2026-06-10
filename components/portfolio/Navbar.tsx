'use client';

import { useEffect } from 'react';
import { usePortfolioStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const RESUME_URL = '/Ankit-Jangid-Resume.pdf';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const;

export default function Navbar() {
  const { activeSection, setActiveSection, mobileMenuOpen, setMobileMenuOpen } = usePortfolioStore();

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id as any);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, [setActiveSection]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
      <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
        <button onClick={() => scrollTo('home')} className="font-mono font-bold text-lg group">
          <span className="text-primary">&lt;</span>
          <span className="text-foreground">Ankit</span>
          <span className="text-primary">/&gt;</span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l, idx) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                activeSection === l.id ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {/* <span className="font-mono text-xs text-primary/60 mr-1">0{idx + 1}.</span> */}
              {l.label}
              {activeSection === l.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-primary rounded-full"
                />
              )}
            </button>
          ))}
          <Button
            size="sm"
            variant="outline"
            className="ml-2 font-mono border-primary/40 text-primary hover:bg-primary/10"
            asChild
          >
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" download="Ankit-Jangid-Resume.pdf">
              <Download className="mr-1.5 w-3.5 h-3.5" /> Resume
            </a>
          </Button>
          <ThemeToggle />
        </nav>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border/50 overflow-hidden"
          >
            <nav className="flex flex-col py-2 px-4">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className={`text-left py-3 text-sm font-medium border-b border-border/30 last:border-0 ${
                    activeSection === l.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
