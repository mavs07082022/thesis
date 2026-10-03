import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
  icon?: ReactNode;
}

export default function Button({
  variant = 'primary',
  children,
  icon,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={clsx(`btn-${variant}`, className)} {...props}>
      {icon}
      {children}
    </button>
  );
}