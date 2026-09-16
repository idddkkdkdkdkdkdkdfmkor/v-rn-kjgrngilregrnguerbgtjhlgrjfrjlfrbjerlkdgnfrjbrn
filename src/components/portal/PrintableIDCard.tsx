import React from 'react';
import { IDCardMember } from '../../data/idCardTemplates';
import { renderIDCardSvg } from '../../lib/idCardExport';

interface PrintableIDCardProps {
  member: IDCardMember;
  selected?: boolean;
  onToggleSelect?: () => void;
  compact?: boolean;
  size?: 'compact' | 'standard' | 'designer';
  side?: 'front' | 'back';
}

export const PrintableIDCard: React.FC<PrintableIDCardProps> = ({
  member,
  selected = false,
  onToggleSelect,
  compact = false,
  size,
  side = 'front',
}) => {
  const resolvedSize = size ?? (compact ? 'compact' : 'standard');
  const sizeClass =
    resolvedSize === 'designer'
      ? 'w-[620px] h-[391px]'
      : resolvedSize === 'compact'
        ? 'w-[280px] h-[176px]'
        : 'w-[340px] h-[214px]';

  return (
    <div
      className={`relative group ${onToggleSelect ? 'cursor-pointer' : ''}`}
      onClick={onToggleSelect}
    >
      {onToggleSelect && (
        <div
          className={`absolute -top-2 -left-2 z-30 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
            selected
              ? 'bg-[#14764B] border-[#14764B] text-white shadow-lg'
              : 'bg-white border-slate-300 text-transparent group-hover:border-[#14764B]'
          }`}
        >
          <span className="text-[11px] font-black">OK</span>
        </div>
      )}

      <div
        className={`relative overflow-hidden rounded-lg shadow-[0_20px_45px_-12px_rgba(0,0,0,0.28)] border bg-white transition-all ${
          selected ? 'border-[#14764B] ring-4 ring-[#14764B]/20' : 'border-slate-200/80'
        } ${sizeClass}`}
        style={{ aspectRatio: '1.586 / 1' }}
        dangerouslySetInnerHTML={{ __html: renderIDCardSvg(member, side as 'front' | 'back') }}
      />
    </div>
  );
};
