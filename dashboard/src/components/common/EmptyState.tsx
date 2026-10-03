import { ReactNode } from 'react';

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {icon && <div className="text-slate-300 mb-4">{icon}</div>}
      <h3 className="text-lg font-semibold text-slate-700">{title}</h3>
      {description && <p className="text-sm text-slate-500 mt-2 max-w-md">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}