import { MapPin, Maximize, User, Sprout } from 'lucide-react';
import { FARM_INFO } from '@/utils/constants';

export default function FarmInfoPanel() {
  const items = [
    { icon: MapPin, label: 'Location', value: FARM_INFO.location },
    { icon: Maximize, label: 'Area', value: `${FARM_INFO.area} m²` },
    { icon: User, label: 'Farm Owner', value: FARM_INFO.owner },
    { icon: Sprout, label: 'Type', value: 'Multi-Crop Farm' },
  ];

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label} className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <item.icon className="w-4 h-4 text-slate-600" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wide font-semibold text-slate-500">
              {item.label}
            </p>
            <p className="text-sm text-slate-700 font-medium truncate">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}