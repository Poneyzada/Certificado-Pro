import React from 'react';
import type { Student, Filial } from '../types';
import { Printer, Download, Upload, SlidersHorizontal, Plus, Building2, Trash2, RefreshCw } from 'lucide-react';
import { StorageService } from '../services/storage';

interface RightPanelProps {
  students: Student[];
  filiais: Filial[];
  selectedFilialId: string;
  onSelectFilial: (id: string) => void;
  onOpenImport: () => void;
  onOpenSettings: () => void;
  onPrintAllPending: () => void;
  onClearAllStudents: () => void;
  onLoadDemoStudents: () => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  students,
  filiais,
  selectedFilialId,
  onSelectFilial,
  onOpenImport,
  onOpenSettings,
  onPrintAllPending,
  onClearAllStudents,
  onLoadDemoStudents,
}) => {
  const totalStudents = students.length;
  const printedStudents = students.filter(s => s.printed).length;
  const pendingStudents = totalStudents - printedStudents;
  const progressPercent = totalStudents > 0 ? Math.round((printedStudents / totalStudents) * 100) : 0;

  const handleBackupExport = () => {
    StorageService.exportAllData();
  };

  const handleBackupImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      StorageService.importAllData(file).then(success => {
        if (success) {
          alert('Backup restaurado com sucesso! Recarregando...');
          window.location.reload();
        } else {
          alert('Arquivo de backup inválido.');
        }
      });
    }
  };

  return (
    <div className="w-full lg:w-80 bg-white border-l border-slate-100 p-6 flex flex-col gap-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 text-lg">Central de Impressão</h3>
        <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
          <Printer className="w-4 h-4" />
        </span>
      </div>

      {/* Printer Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-300">Pronta para Impressão</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded-md text-amber-300">
            A4 Paisagem
          </span>
        </div>
        <p className="font-bold text-base">Epson L3250 EcoTank</p>
        <p className="text-xs text-slate-400 mt-0.5">Gramatura ideal: 180g a 240g</p>

        {pendingStudents > 0 && (
          <button
            onClick={onPrintAllPending}
            className="mt-4 w-full py-2 px-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            Imprimir Pendentes ({pendingStudents})
          </button>
        )}
      </div>

      {/* Progress & Counters */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500 font-medium">Status Geral das Faixas</span>
            <span className="font-bold text-slate-800">{printedStudents} de {totalStudents} impressos</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-500 font-medium">Graduandos</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{totalStudents}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-500 font-medium">Pendentes</p>
            <p className="text-2xl font-black text-amber-600 mt-1">{pendingStudents}</p>
          </div>
        </div>
      </div>

      {/* Filiais Quick Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-slate-400" />
          Filial / Academia
        </label>
        <div className="space-y-1.5">
          <button
            onClick={() => onSelectFilial('all')}
            className={`w-full text-left text-xs font-semibold py-2 px-3 rounded-xl transition-all flex items-center justify-between ${
              selectedFilialId === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>Todas as Filiais</span>
            <span className="text-[10px] opacity-80">{students.length}</span>
          </button>

          {filiais.map(f => {
            const countInFilial = students.filter(s => s.filialId === f.id).length;
            const isSelected = selectedFilialId === f.id;
            return (
              <button
                key={f.id}
                onClick={() => onSelectFilial(f.id)}
                className={`w-full text-left text-xs font-semibold py-2 px-3 rounded-xl transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="truncate">{f.name}</span>
                <span className="text-[10px] opacity-80">{countInFilial}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-auto space-y-2 pt-4 border-t border-slate-100">
        <button
          onClick={onOpenImport}
          className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          Adicionar / Importar Nomes
        </button>

        <button
          onClick={onOpenSettings}
          className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-all"
        >
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
          Personalizar Modelo
        </button>

        {/* Clear or Restore Demo Data button */}
        {totalStudents > 0 ? (
          <button
            onClick={onClearAllStudents}
            className="w-full py-2 px-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Limpar Todos os Alunos
          </button>
        ) : (
          <button
            onClick={onLoadDemoStudents}
            className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            Carregar Alunos de Exemplo
          </button>
        )}

        {/* Backup / Export */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleBackupExport}
            title="Fazer Backup de Tudo"
            className="flex-1 py-1.5 px-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-[11px] font-semibold flex items-center justify-center gap-1"
          >
            <Download className="w-3 h-3 text-slate-400" />
            Backup
          </button>

          <label
            title="Restaurar Backup"
            className="flex-1 py-1.5 px-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-[11px] font-semibold flex items-center justify-center gap-1 cursor-pointer"
          >
            <Upload className="w-3 h-3 text-slate-400" />
            Restaurar
            <input
              type="file"
              accept=".json"
              onChange={handleBackupImport}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
