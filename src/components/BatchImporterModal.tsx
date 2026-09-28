import React, { useState } from 'react';
import type { Student, BeltType, Filial } from '../types';
import { BJJ_BELTS } from '../constants/belts';
import { X, Upload, FileText, Check, Plus, AlertCircle } from 'lucide-react';

interface BatchImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filiais: Filial[];
  selectedFilialId: string;
  onAddStudents: (newStudents: Student[]) => void;
}

export const BatchImporterModal: React.FC<BatchImporterModalProps> = ({
  isOpen,
  onClose,
  filiais,
  selectedFilialId,
  onAddStudents,
}) => {
  const [mode, setMode] = useState<'text' | 'file' | 'single'>('text');
  
  // Common Fields
  const [targetBelt, setTargetBelt] = useState<BeltType>('branca');
  const [degrees, setDegrees] = useState<number>(0);
  const [filialId, setFilialId] = useState<string>(selectedFilialId || filiais[0]?.id || 'matriz');
  const [professor, setProfessor] = useState<string>(
    filiais.find(f => f.id === selectedFilialId)?.professorDefault || 'Mestre Responsável'
  );
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));

  // Text Mode state
  const [textInput, setTextInput] = useState<string>(
    'João Carlos da Silva\nMarcos Vinicius de Paula - 2º Grau\nLucas Gabriel Mendes - 3º Grau\nBernardo Rocha'
  );

  // Single Student state
  const [singleName, setSingleName] = useState<string>('');

  if (!isOpen) return null;

  const currentFilial = filiais.find(f => f.id === filialId) || filiais[0];

  const handleFilialChange = (newFilialId: string) => {
    setFilialId(newFilialId);
    const found = filiais.find(f => f.id === newFilialId);
    if (found?.professorDefault) {
      setProfessor(found.professorDefault);
    }
  };

  const parseTextStudents = () => {
    const lines = textInput
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const generatedStudents: Student[] = lines.map((line, index) => {
      let studentName = line;
      let studentDegrees = degrees;

      const degreeMatch = line.match(/(?:-|–|\(|,)\s*([0-4])\s*(?:º|°|grau|graus)?/i);
      if (degreeMatch) {
        studentDegrees = parseInt(degreeMatch[1], 10);
        studentName = line.replace(degreeMatch[0], '').replace(/\)/g, '').trim();
      }

      return {
        id: `student-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 6)}`,
        name: studentName,
        belt: targetBelt,
        degrees: studentDegrees,
        date,
        professor,
        filialId: currentFilial.id,
        filialName: currentFilial.name,
        printed: false,
      };
    });

    if (generatedStudents.length > 0) {
      onAddStudents(generatedStudents);
      onClose();
    }
  };

  const handleSingleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleName.trim()) return;

    const newStudent: Student = {
      id: `student-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: singleName.trim(),
      belt: targetBelt,
      degrees,
      date,
      professor,
      filialId: currentFilial.id,
      filialName: currentFilial.name,
      printed: false,
    };

    onAddStudents([newStudent]);
    setSingleName('');
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setTextInput(content);
        setMode('text');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Importar / Adicionar Graduandos</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Entrada em lote para emissão em série de certificados na Epson L3250
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-slate-200 px-6 pt-3 gap-2 bg-slate-50/30">
          <button
            onClick={() => setMode('text')}
            className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-all ${
              mode === 'text'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            Colar Lista (WhatsApp / Texto)
          </button>
          <button
            onClick={() => setMode('file')}
            className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-all ${
              mode === 'file'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-4 h-4" />
            Subir Documento (TXT / CSV)
          </button>
          <button
            onClick={() => setMode('single')}
            className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-all ${
              mode === 'single'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Plus className="w-4 h-4" />
            Individual (1 Aluno)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Global Parameters for this batch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            {/* Belt Target */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Faixa da Graduação:
              </label>
              <select
                value={targetBelt}
                onChange={(e) => setTargetBelt(e.target.value as BeltType)}
                className="w-full text-sm font-medium px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <optgroup label="Adultos">
                  {BJJ_BELTS.filter(b => b.category === 'adulto').map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Infantil">
                  {BJJ_BELTS.filter(b => b.category === 'infantil').map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Filial */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Filial / Academia:
              </label>
              <select
                value={filialId}
                onChange={(e) => handleFilialChange(e.target.value)}
                className="w-full text-sm font-medium px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {filiais.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>

            {/* Professor */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Professor / Mestre:
              </label>
              <input
                type="text"
                value={professor}
                onChange={(e) => setProfessor(e.target.value)}
                placeholder="Ex: Mestre Carlos Silva"
                className="w-full text-sm px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Data do Exame:
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-sm px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Mode 1: Paste Text */}
          {mode === 'text' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Cole os Nomes (1 por linha):
                </label>
                <span className="text-xs text-slate-400">
                  {textInput.split('\n').filter(l => l.trim()).length} nomes identificados
                </span>
              </div>
              <textarea
                rows={6}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Exemplo:&#10;Gabriel Albuquerque&#10;Matheus Ramos - 3º Grau&#10;Rodrigo Medeiros"
                className="w-full p-3 text-sm font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-blue-500" />
                Dica: Você pode copiar direto do WhatsApp! Se colocar &quot; - 2º Grau&quot; ao lado do nome, o sistema detecta os graus automaticamente.
              </p>
            </div>
          )}

          {/* Mode 2: Upload File */}
          {mode === 'file' && (
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:bg-slate-50/50 transition-colors">
              <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-700">Selecione o arquivo de texto ou planilha (CSV / TXT)</p>
              <p className="text-xs text-slate-400 mt-1 mb-4">Arquivo com um nome por linha</p>
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-medium text-sm cursor-pointer hover:bg-blue-700 shadow-md">
                <span>Escolher Arquivo</span>
                <input
                  type="file"
                  accept=".txt,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {/* Mode 3: Single Student */}
          {mode === 'single' && (
            <form onSubmit={handleSingleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nome Completo do Aluno:
                </label>
                <input
                  type="text"
                  required
                  value={singleName}
                  onChange={(e) => setSingleName(e.target.value)}
                  placeholder="Ex: Gabriel Albuquerque de Souza"
                  className="w-full text-base px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Graus na Faixa:
                </label>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map(g => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setDegrees(g)}
                      className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-all ${
                        degrees === g
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {g === 0 ? 'Sem grau' : `${g}º Grau`}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <button
            onClick={onClose}
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2"
          >
            Cancelar
          </button>

          {mode === 'single' ? (
            <button
              onClick={handleSingleSubmit}
              disabled={!singleName.trim()}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 shadow-md shadow-blue-500/20 disabled:opacity-50 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Adicionar Aluno
            </button>
          ) : (
            <button
              onClick={parseTextStudents}
              disabled={!textInput.trim()}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 shadow-md shadow-blue-500/20 disabled:opacity-50 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Importar {textInput.split('\n').filter(l => l.trim()).length} Certificados
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
