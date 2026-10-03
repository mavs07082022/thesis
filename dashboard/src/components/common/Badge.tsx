import clsx from 'clsx';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  className?: string;
}

const variants = {
  success: 'bg-green-100 text-green-700 border border-green-200',
  warning: 'bg-amber-100 text-amber-700 border border-amber-200',
  danger: 'bg-red-100 text-red-700 border border-red-200',
  info: 'bg-blue-100 text-blue-700 border border-blue-200',
  neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
};

export default function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return <span className={clsx('badge', variants[variant], className)}>{children}</span>;
}