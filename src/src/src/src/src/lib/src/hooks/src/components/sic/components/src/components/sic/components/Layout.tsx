import { Navbar } from './Navbar';
import { Footer } from './Footer';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />
      <main className="flex-1 pt-[72px]">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
