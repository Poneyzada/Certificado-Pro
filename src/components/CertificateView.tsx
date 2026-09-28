import React from 'react';
import type { Student, CertificateConfig } from '../types';
import { getBeltById, formatDegrees } from '../constants/belts';

interface CertificateViewProps {
  student: Student;
  config: CertificateConfig;
  isPrintVersion?: boolean;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  student,
  config,
  isPrintVersion = false,
}) => {
  const belt = getBeltById(student.belt);
  const degreesText = formatDegrees(student.degrees);

  // Background styling
  const isCustomBg = config.backgroundType === 'custom_image' && config.customImageBase64;
  const isBlankPreprinted = config.backgroundType === 'blank_preprinted';

  return (
    <div
      className={`certificate-page relative overflow-hidden bg-white text-slate-900 select-none shadow-xl ${
        isPrintVersion ? 'print-active' : 'rounded-lg'
      }`}
      style={{
        aspectRatio: '297 / 210',
        width: '100%',
        maxWidth: isPrintVersion ? '297mm' : '100%',
        height: isPrintVersion ? '210mm' : 'auto',
      }}
    >
      {/* Background Layer */}
      {!isBlankPreprinted && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {isCustomBg ? (
            <img
              src={config.customImageBase64}
              alt="Fundo do Certificado"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="/templates/default-certificate-bg.svg"
              alt="Fundo Padrão Jiu-Jitsu"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}

      {/* Certificate Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-14 text-center">
        {/* Header / Academy Name */}
        <div className="pt-2">
          <p className="text-xs md:text-sm tracking-widest uppercase font-semibold text-amber-700/80 mb-1">
            {config.teamSlogan || 'ARTE SUAVE • DISCIPLINA • HONRA'}
          </p>
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-wider text-slate-800" style={{ fontFamily: 'Cinzel, serif' }}>
            {config.academyName}
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mt-2" />
          
          <h1 className="text-2xl md:text-4xl font-extrabold uppercase tracking-wide text-slate-900 mt-4" style={{ fontFamily: 'Cinzel, serif' }}>
            {config.headerTitle}
          </h1>
        </div>

        {/* Middle Body / Student & Belt */}
        <div className="my-auto py-2">
          <p className="text-xs md:text-sm text-slate-600 max-w-2xl mx-auto mb-3 font-medium">
            {config.customTextFormula}
          </p>

          {/* Student Name */}
          <div className="py-2">
            <h3
              className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-slate-900 capitalize border-b-2 border-slate-300 pb-2 inline-block px-8"
              style={{
                fontFamily: config.fontFamilyName === 'Great Vibes' ? "'Great Vibes', cursive" : 
                            config.fontFamilyName === 'Playfair Display' ? "'Playfair Display', serif" :
                            config.fontFamilyName === 'Montserrat' ? "'Montserrat', sans-serif" :
                            config.fontFamilyName === 'Inter' ? "'Inter', sans-serif" : "'Cinzel', serif",
                color: config.nameColor || '#0f172a'
              }}
            >
              {student.name}
            </h3>
          </div>

          {/* Belt Awarded Box */}
          <div className="mt-4 flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border shadow-sm bg-white/90 backdrop-blur-xs">
              <span className="text-sm md:text-base font-semibold text-slate-700">Graduação:</span>
              <span className="text-base md:text-lg font-black tracking-wide" style={{ color: belt.colorHex === '#f8fafc' ? '#334155' : belt.colorHex }}>
                {belt.name.toUpperCase()} {degreesText.toUpperCase()}
              </span>
            </div>

            {/* Visual Belt Bar (Representação da faixa com a ponta preta/vermelha e graus) */}
            <div className="mt-3 flex items-center h-4 w-48 sm:w-64 rounded-xs shadow-inner overflow-hidden border border-black/20" style={{ backgroundColor: belt.colorHex }}>
              {/* Ponta da faixa (Barra de graus) */}
              <div
                className="h-full w-14 sm:w-16 ml-auto flex items-center justify-evenly px-1"
                style={{ backgroundColor: belt.barColorHex }}
              >
                {/* Graus (esparadrapos brancos na ponteira) */}
                {Array.from({ length: student.degrees }).map((_, idx) => (
                  <div key={idx} className="h-full w-1.5 bg-white shadow-xs" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer: Date, Professor Signature & Gold Seal Location */}
        <div className="grid grid-cols-3 items-end pt-4 border-t border-slate-200/60 text-xs md:text-sm text-slate-700">
          {/* Left: Date & Filial */}
          <div className="text-left pl-2">
            <p className="font-semibold text-slate-800">{student.filialName || 'Academia'}</p>
            <p className="text-slate-600 mt-1">
              Data: {new Date(student.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Center: Dedicated Gold Seal Area */}
          <div className="flex flex-col items-center justify-center">
            {config.goldSeal.showGuide && (
              <div
                className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-dashed flex flex-col items-center justify-center transition-all ${
                  isPrintVersion && !config.goldSeal.printGuide
                    ? 'opacity-0'
                    : 'border-amber-500/80 bg-amber-50/40 text-amber-800'
                }`}
              >
                <div className="text-[9px] md:text-[10px] font-bold text-center leading-tight">
                  SELO DE OURO
                  <span className="block text-[8px] font-normal text-amber-700">(Colar Aqui)</span>
                </div>
              </div>
            )}
          </div>

          {/* Right: Professor Signature */}
          <div className="text-right pr-2">
            <div className="w-36 md:w-48 ml-auto border-b border-slate-700 mb-1" />
            <p className="font-bold text-slate-900">{student.professor || 'Mestre Responsável'}</p>
            <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">Professor / Faixa Preta</p>
          </div>
        </div>
      </div>
    </div>
  );
};
