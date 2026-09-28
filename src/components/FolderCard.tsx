import React from 'react';
import type { BeltDefinition } from '../types';
import { Printer, CheckCircle2, Users, ChevronRight } from 'lucide-react';

interface FolderCardProps {
  belt: BeltDefinition;
  count: number;
  unprintedCount: number;
  isSelected: boolean;
  onClick: () => void;
  onPrintBelt: (e: React.MouseEvent) => void;
}

export const FolderCard: React.FC<FolderCardProps> = ({
  belt,
  count,
  unprintedCount,
  isSelected,
  onClick,
  onPrintBelt,
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative cursor-pointer select-none transition-all duration-300 transform active:scale-95 ${
        isSelected ? 'scale-[1.02]' : 'hover:-translate-y-1'
      }`}
    >
      {/* Folder Tab Effect */}
      <div className="flex items-end pl-4">
        <div
          className={`h-4 w-28 rounded-t-xl transition-all duration-300 ${
            isSelected
              ? 'bg-blue-600 shadow-md'
              : 'bg-slate-200 group-hover:bg-slate-300'
          }`}
        />
      </div>

      {/* Main Folder Body */}
      <div
        className={`relative overflow-hidden rounded-2xl p-5 border transition-all duration-300 shadow-sm ${
          isSelected
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-400 shadow-blue-500/25 shadow-xl'
            : 'bg-white text-slate-800 border-slate-100 hover:shadow-lg'
        }`}
      >
        {/* Belt Color Pill */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full border border-black/20 shadow-xs"
              style={{ backgroundColor: belt.colorHex }}
            />
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                isSelected ? 'text-blue-100' : 'text-slate-500'
              }`}
            >
              {belt.category === 'adulto' ? 'Adulto' : 'Infantil'}
            </span>
          </div>

          {unprintedCount > 0 ? (
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                isSelected
                  ? 'bg-white/20 text-white'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              <Printer className="w-3 h-3" />
              {unprintedCount} pendentes
            </span>
          ) : (
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                isSelected
                  ? 'bg-white/20 text-white'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              <CheckCircle2 className="w-3 h-3" />
              Prontos
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className={`text-lg font-bold truncate mb-1 ${
            isSelected ? 'text-white' : 'text-slate-900'
          }`}
        >
          {belt.name}
        </h3>

        {/* Subtitle / Count */}
        <div className="flex items-center gap-1.5 text-xs">
          <Users className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-200' : 'text-slate-400'}`} />
          <span className={isSelected ? 'text-blue-100' : 'text-slate-500'}>
            {count} {count === 1 ? 'graduando' : 'graduandos'}
          </span>
        </div>

        {/* Action Button inside folder */}
        <div className="mt-5 pt-3 border-t flex items-center justify-between border-slate-100/20">
          <button
            onClick={onPrintBelt}
            disabled={count === 0}
            className={`text-xs font-semibold py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all shadow-xs ${
              count === 0
                ? 'opacity-40 cursor-not-allowed'
                : isSelected
                ? 'bg-white text-blue-600 hover:bg-blue-50 active:bg-blue-100'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            Imprimir Lote ({count})
          </button>

          <ChevronRight
            className={`w-4 h-4 transition-transform ${
              isSelected ? 'text-white translate-x-1' : 'text-slate-400 group-hover:translate-x-1'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
