import React, { useState } from 'react';
import type { Student, CertificateConfig } from '../types';
import { CertificateView } from './CertificateView';
import { PrintEngine } from '../services/printEngine';
import { X, Printer, Download, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BatchPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  config: CertificateConfig;
  onMarkAsPrinted: (studentIds: string[]) => void;
}

export const BatchPrintModal: React.FC<BatchPrintModalProps> = ({
  isOpen,
  onClose,
  students,
  config,
  onMarkAsPrinted,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfProgress, setPdfProgress] = useState({ current: 0, total: 0 });

  if (!isOpen || students.length === 0) return null;

  const currentStudent = students[currentIndex] || students[0];

  const handlePrintDirect = () => {
    onMarkAsPrinted(students.map(s => s.id));

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      PrintEngine.printDirectly();
    }, 250);
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    try {
      await PrintEngine.generateBatchPDF(students, config, (curr, tot) => {
        setPdfProgress({ current: curr, total: tot });
      });
      onMarkAsPrinted(students.map(s => s.id));
      confetti({
        particleCount: 60,
        spread: 60,
      });
    } catch (err) {
      console.error('Erro ao gerar PDF', err);
      alert('Houve um erro ao montar o PDF. Tente a opção "Imprimir Direto na Epson".');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                <Printer className="w-4 h-4" />
              </span>
              <h2 className="text-lg md:text-xl font-bold text-slate-900">
                Fila de Impressão Epson L3250
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white">
                {students.length} certificados
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Visualização prévia exata no formato A4 Paisagem (297 x 210 mm)
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Preview Stage */}
        <div className="p-4 md:p-6 bg-slate-900/5 flex-1 overflow-y-auto flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-full max-w-3xl shadow-2xl rounded-xl overflow-hidden border border-slate-200 bg-white">
            <CertificateView
              student={currentStudent}
              config={config}
              isPrintVersion={false}
            />
          </div>

          {/* Navigation Controls between certificates */}
          <div className="flex items-center justify-between w-full max-w-3xl mt-4 px-2">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 disabled:opacity-30 hover:bg-slate-50 shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </button>

            <span className="text-xs font-bold text-slate-600 bg-white/80 px-3 py-1 rounded-full border border-slate-200">
              Certificado {currentIndex + 1} de {students.length} ({currentStudent.name})
            </span>

            <button
              onClick={() => setCurrentIndex(prev => Math.min(students.length - 1, prev + 1))}
              disabled={currentIndex === students.length - 1}
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 disabled:opacity-30 hover:bg-slate-50 shadow-xs"
            >
              Próximo
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Epson L3250 Setup Quick Tip Banner */}
        <div className="bg-amber-50/70 border-t border-b border-amber-200/70 px-6 py-2.5 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Dica Epson L3250:</strong> Na tela de impressão, selecione <strong>A4 Paisagem</strong>, <strong>Margens: Nenhuma</strong> e marque <strong>Gráficos de 2º Plano</strong>.
            </span>
          </div>
          <span className="text-[11px] font-semibold text-amber-700 hidden sm:inline">
            Local do Selo Dourado reservado
          </span>
        </div>

        {/* Action Controls Footer */}
        <div className="px-6 py-4 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2"
          >
            Fechar
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-all shadow-xs"
            >
              <Download className="w-4 h-4 text-slate-500" />
              {isGeneratingPdf
                ? `Gerando PDF (${pdfProgress.current}/${pdfProgress.total})...`
                : 'Baixar PDF em Lote'}
            </button>

            <button
              onClick={handlePrintDirect}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all transform active:scale-95"
            >
              <Printer className="w-4 h-4" />
              Imprimir Lote ({students.length}) na Epson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
