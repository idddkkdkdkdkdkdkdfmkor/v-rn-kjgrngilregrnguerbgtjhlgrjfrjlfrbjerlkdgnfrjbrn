import React from 'react';

/** Stripe Dashboard–inspired design tokens for Super Admin */
export const stripe = {
  page: 'bg-[#f6f9fc] text-[#0a2540]',
  sidebar: 'bg-[#fafbfc] border-[#e3e8ee]',
  surface: 'bg-white border border-[#e3e8ee]',
  border: 'border-[#e3e8ee]',
  text: 'text-[#0a2540]',
  textSecondary: 'text-[#425466]',
  textMuted: 'text-[#697386]',
  accent: '#635bff',
  accentBrand: '#14764B',
  heading1: 'text-[28px] font-semibold text-[#0a2540] tracking-[-0.02em]',
  heading2: 'text-[15px] font-semibold text-[#0a2540]',
  heading3: 'text-[13px] font-medium text-[#697386] uppercase tracking-[0.04em]',
  body: 'text-[14px] text-[#425466]',
  caption: 'text-[13px] text-[#697386]',
} as const;

export const btnPrimary =
  'inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#635bff] hover:bg-[#5851ea] text-white text-[13px] font-medium rounded-md transition-colors disabled:opacity-50 disabled:pointer-events-none';

export const btnSecondary =
  'inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#e3e8ee] hover:bg-[#f6f9fc] text-[#0a2540] text-[13px] font-medium rounded-md transition-colors';

export const btnBrand =
  'inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#14764B] hover:bg-[#0F5A3A] text-white text-[13px] font-medium rounded-md transition-colors';

export const inputClass =
  'w-full px-3 py-2 bg-white border border-[#e3e8ee] rounded-md text-[14px] text-[#0a2540] placeholder:text-[#697386] focus:outline-none focus:border-[#635bff] focus:ring-1 focus:ring-[#635bff] transition-shadow';

export const cardClass = 'bg-white border border-[#e3e8ee] rounded-lg overflow-hidden';

export const badge = (variant: 'success' | 'neutral' | 'warning' | 'brand' = 'neutral') => {
  const variants = {
    success: 'bg-[#d7f7c2] text-[#05690a]',
    neutral: 'bg-[#f6f9fc] text-[#425466] border border-[#e3e8ee]',
    warning: 'bg-[#fef9e7] text-[#9a6700] border border-[#f5e6a3]',
    brand: 'bg-[#e8f5ef] text-[#14764B] border border-[#b8e0cc]',
  };
  return `inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${variants[variant]}`;
};

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, actions }) => (
  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
    <div>
      <h1 className={stripe.heading1}>{title}</h1>
      {description && <p className={`${stripe.body} mt-1`}>{description}</p>}
    </div>
    {actions && <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div>}
  </div>
);

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'neutral' | 'negative';
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, changeType = 'neutral' }) => (
  <div className={`${cardClass} p-5`}>
    <p className={stripe.heading3}>{label}</p>
    <p className="text-[32px] font-semibold text-[#0a2540] tabular-nums leading-none mt-2">{value}</p>
    {change && (
      <p
        className={`text-[13px] font-medium mt-2 ${
          changeType === 'positive'
            ? 'text-[#05690a]'
            : changeType === 'negative'
              ? 'text-[#c0123c]'
              : 'text-[#697386]'
        }`}
      >
        {change}
      </p>
    )}
  </div>
);
