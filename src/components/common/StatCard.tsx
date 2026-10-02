import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  colorScheme?: 'blue' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'slate';
  subtitle?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  colorScheme = 'blue',
  subtitle,
  onClick
}) => {
  const colorStyles = {
    blue: {
      bg: 'bg-blue-50/60',
      text: 'text-blue-600',
      border: 'border-blue-100',
      accent: 'bg-blue-600',
      glow: 'hover:border-blue-300'
    },
    emerald: {
      bg: 'bg-emerald-50/60',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
      accent: 'bg-emerald-600',
      glow: 'hover:border-emerald-300'
    },
    amber: {
      bg: 'bg-amber-50/60',
      text: 'text-amber-600',
      border: 'border-amber-100',
      accent: 'bg-amber-600',
      glow: 'hover:border-amber-300'
    },
    rose: {
      bg: 'bg-rose-50/60',
      text: 'text-rose-600',
      border: 'border-rose-100',
      accent: 'bg-rose-600',
      glow: 'hover:border-rose-300'
    },
    indigo: {
      bg: 'bg-indigo-50/60',
      text: 'text-indigo-600',
      border: 'border-indigo-100',
      accent: 'bg-indigo-600',
      glow: 'hover:border-indigo-300'
    },
    slate: {
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      border: 'border-slate-200',
      accent: 'bg-slate-700',
      glow: 'hover:border-slate-300'
    }
  }[colorScheme];

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200 p-5 shadow-gov transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:shadow-gov-md hover:-translate-y-0.5 ' + colorStyles.glow : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        <div className={`p-2.5 rounded-lg ${colorStyles.bg} ${colorStyles.border} border`}>
          <Icon className={`w-5 h-5 ${colorStyles.text}`} />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-bold text-slate-900 tracking-tight">{value}</span>
        {change && (
          <span
            className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
              isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}
          >
            {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {change}
          </span>
        )}
      </div>

      {subtitle && <p className="mt-2 text-xs text-slate-500 truncate">{subtitle}</p>}
    </div>
  );
};
