import React from 'react';
import { Search, Plus, SlidersHorizontal, Menu, Printer } from 'lucide-react';

interface HeaderProps {
  onOpenImport: () => void;
  onOpenSettings: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onToggleMobileDrawer: () => void;
  pendingCount: number;
  onPrintPending: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenImport,
  onOpenSettings,
  searchTerm,
  onSearchChange,
  onToggleMobileDrawer,
  pendingCount,
  onPrintPending,
}) => {
  return (
    <header className="bg-white border-b border-slate-100 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: Mobile Menu + Title & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileDrawer}
          className="p-2 -ml-1 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
              🥋
            </span>
            <h1 className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">
              Certificado Pro
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full hidden sm:inline">
              Epson L3250
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden sm:block">
            Emissão em série de certificados de graduação de Jiu-Jitsu
          </p>
        </div>
      </div>

      {/* Center: Search input */}
      <div className="hidden md:flex items-center relative w-72 lg:w-96">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por aluno, faixa ou professor..."
          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
        />
      </div>

      {/* Right: Quick Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        {pendingCount > 0 && (
          <button
            onClick={onPrintPending}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Imprimir Fila</span>
            <span className="bg-white/20 px-1.5 py-0.2 rounded-full text-[10px]">
              {pendingCount}
            </span>
          </button>
        )}

        <button
          onClick={onOpenSettings}
          title="Configurações do Certificado"
          className="p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs flex items-center gap-1.5 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
          <span className="hidden sm:inline">Modelo</span>
        </button>

        <button
          onClick={onOpenImport}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Graduando</span>
        </button>
      </div>
    </header>
  );
};
