import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  Radio,
  Sprout,
  History,
  Settings,
  X,
} from 'lucide-react';
import clsx from 'clsx';
import { useApp } from '@/context/AppContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/predictions', label: 'Predictions', icon: Sparkles },
  { to: '/sensors', label: 'Sensors', icon: Radio },
  { to: '/crops', label: 'Crops', icon: Sprout },
  { to: '/history', label: 'History', icon: History },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useApp();

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={clsx(
          'fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 z-50',
          'flex flex-col transition-transform lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-sm">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-800 leading-tight">CropSuit AI</h1>
              <p className="text-[10px] text-slate-500">Crop Suitability System</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-primary-50 text-primary-700 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="rounded-lg bg-gradient-to-br from-primary-50 to-earth-50 p-3 border border-primary-100">
            <p className="text-[10px] font-semibold text-primary-800 uppercase tracking-wider">
              Study Area
            </p>
            <p className="text-xs text-slate-700 mt-1 font-medium">Macabud, Rodriguez</p>
            <p className="text-[10px] text-slate-500">Rizal, Philippines</p>
          </div>
        </div>
      </aside>
    </>
  );
}