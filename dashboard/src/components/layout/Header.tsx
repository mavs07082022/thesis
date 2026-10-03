import { Menu, Globe, Bell, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { FARM_INFO } from '@/utils/constants';

export default function Header() {
  const { language, setLanguage, setSidebarOpen } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">{FARM_INFO.name}</h2>
            <p className="text-xs text-slate-500 hidden sm:block">{FARM_INFO.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === 'en' ? 'tl' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
          >
            <Globe className="w-3.5 h-3.5" />
            {language === 'en' ? 'EN' : 'TL'}
          </button>

          <button className="relative p-2 rounded-lg hover:bg-slate-100">
            <Bell className="w-4 h-4 text-slate-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
              <User className="w-4 h-4 text-primary-700" />
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-semibold text-slate-700">Farm Admin</p>
              <p className="text-[10px] text-slate-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}