import React from 'react';
import type { Student, CertificateConfig } from '../types';
import { CertificateView } from './CertificateView';
import { X, Printer, Download } from 'lucide-react';
import { PrintEngine } from '../services/printEngine';
import confetti from 'canvas-confetti';

interface StudentPreviewModalProps {
  student: Student | null;
  config: CertificateConfig;
  onClose: () => void;
  onMarkAsPrinted: (id: string) => void;
}

export const StudentPreviewModal: React.FC<StudentPreviewModalProps> = ({
  student,
  config,
  onClose,
  onMarkAsPrinted,
}) => {
  if (!student) return null;

  const handlePrint = () => {
    onMarkAsPrinted(student.id);
    confetti({ particleCount: 50, spread: 50 });
    setTimeout(() => {
      PrintEngine.printDirectly();
    }, 200);
  };

  const handleDownload = async () => {
    await PrintEngine.generateBatchPDF([student], config);
    onMarkAsPrinted(student.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Prévia do Certificado</h2>
            <p className="text-xs text-slate-500">{student.name} • {student.filialName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Rendering Box */}
        <div className="p-4 md:p-8 bg-slate-900/5 flex-1 overflow-y-auto flex items-center justify-center">
          <div className="w-full max-w-3xl shadow-2xl rounded-xl overflow-hidden border border-slate-200 bg-white">
            <CertificateView
              student={student}
              config={config}
              isPrintVersion={false}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2"
          >
            Voltar
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all shadow-xs"
            >
              <Download className="w-4 h-4 text-slate-500" />
              Baixar PDF
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all"
            >
              <Printer className="w-4 h-4" />
              Imprimir na Epson L3250
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
