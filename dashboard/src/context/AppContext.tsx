import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  language: 'en' | 'tl';
  setLanguage: (lang: 'en' | 'tl') => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'tl'>('en');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AppContext.Provider value={{ language, setLanguage, sidebarOpen, setSidebarOpen }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}