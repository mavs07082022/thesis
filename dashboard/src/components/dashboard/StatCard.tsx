import { ReactNode } from 'react';
import clsx from 'clsx';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
  color?: 'green' | 'blue' | 'amber' | 'purple';
}

const colorMap = {
  green: 'bg-primary-50 text-primary-700',
  blue: 'bg-blue-50 text-blue-700',
  amber: 'bg-amber-50 text-amber-700',
  purple: 'bg-purple-50 text-purple-700',
};

export default function StatCard({
  title,
  value,
  icon,
  trend,
  trendUp,
  color = 'green',
}: StatCardProps) {
  return (
    <div className="card card-hover animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold text-slate-800 mt-2">{value}</p>
          {trend && (
            <p
              className={clsx(
                'text-xs font-medium mt-1.5',
                trendUp ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend}
            </p>
          )}
        </div>
        <div
          className={clsx(
            'w-11 h-11 rounded-xl flex items-center justify-center',
            colorMap[color]
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}