import { create } from 'zustand';

type Section = 'home' | 'about' | 'skills' | 'experience' | 'projects' | 'contact';

interface PortfolioState {
  activeSection: Section;
  setActiveSection: (s: Section) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  contactCount: number;
  incContactCount: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeSection: 'home',
  setActiveSection: (s) => set({ activeSection: s }),
  mobileMenuOpen: false,
  setMobileMenuOpen: (v) => set({ mobileMenuOpen: v }),
  contactCount: 0,
  incContactCount: () => set((st) => ({ contactCount: st.contactCount + 1 })),
}));
