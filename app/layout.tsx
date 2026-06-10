import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Ankit Jangid — Senior Frontend Engineer & MERN Stack Developer',
  description:
    'Portfolio of Ankit Jangid — Senior Frontend Engineer with 6+ years of experience building production-grade React, Next.js, and Node.js applications.',
  keywords: ['Ankit Jangid', 'Frontend Engineer', 'React', 'Next.js', 'MERN', 'TypeScript', 'Portfolio'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}`,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
