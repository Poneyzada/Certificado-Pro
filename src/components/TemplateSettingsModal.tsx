import React, { useState } from 'react';
import type { CertificateConfig } from '../types';
import { X, Upload, Palette, Award, RotateCcw, Check, Sparkles, Image as ImageIcon } from 'lucide-react';
import { DEFAULT_CERTIFICATE_CONFIG } from '../constants/defaultConfig';

interface TemplateSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CertificateConfig;
  onSaveConfig: (newConfig: CertificateConfig) => void;
}

export const TemplateSettingsModal: React.FC<TemplateSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [localConfig, setLocalConfig] = useState<CertificateConfig>({ ...config });

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setLocalConfig(prev => ({
        ...prev,
        backgroundType: 'custom_image',
        customImageBase64: base64,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSaveConfig(localConfig);
    onClose();
  };

  const handleReset = () => {
    if (confirm('Deseja restaurar as configurações visuais para o padrão original?')) {
      setLocalConfig(DEFAULT_CERTIFICATE_CONFIG);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-100 text-purple-700">
              <Palette className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Personalizar Modelo do Certificado</h2>
              <p className="text-xs text-slate-500">
                Ajuste fundo, brasão, fontes e local de colagem do selo dourado
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* Background Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Arte de Fundo do Certificado:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Option 1: Built-in Ornate */}
              <div
                onClick={() => setLocalConfig(prev => ({ ...prev, backgroundType: 'default_ornate' }))}
                className={`cursor-pointer p-4 rounded-2xl border-2 transition-all text-center ${
                  localConfig.backgroundType === 'default_ornate'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-900 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Award className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                <p className="text-xs font-bold">Arte Padrão BJJ</p>
                <p className="text-[10px] text-slate-500 mt-1">Bordas douradas e arabescos</p>
              </div>

              {/* Option 2: Upload Custom Image */}
              <label
                className={`cursor-pointer p-4 rounded-2xl border-2 transition-all text-center flex flex-col items-center justify-center ${
                  localConfig.backgroundType === 'custom_image'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-900 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Upload className="w-6 h-6 mb-2 text-purple-600" />
                <p className="text-xs font-bold">Subir Modelo Próprio</p>
                <p className="text-[10px] text-slate-500 mt-1">
                  {localConfig.customImageBase64 ? 'Imagem carregada' : 'PNG ou JPG A4'}
                </p>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {/* Option 3: Preprinted Paper */}
              <div
                onClick={() => setLocalConfig(prev => ({ ...prev, backgroundType: 'blank_preprinted' }))}
                className={`cursor-pointer p-4 rounded-2xl border-2 transition-all text-center ${
                  localConfig.backgroundType === 'blank_preprinted'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-900 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <ImageIcon className="w-6 h-6 mx-auto mb-2 text-slate-500" />
                <p className="text-xs font-bold">Papel Pré-Impresso</p>
                <p className="text-[10px] text-slate-500 mt-1">Imprime só texto no papel da gráfica</p>
              </div>
            </div>
          </div>

          {/* Texts & Academy Branding */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nome da Academia / Equipe:
              </label>
              <input
                type="text"
                value={localConfig.academyName}
                onChange={(e) => setLocalConfig(prev => ({ ...prev, academyName: e.target.value }))}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Lema / Subtítulo:
              </label>
              <input
                type="text"
                value={localConfig.teamSlogan || ''}
                onChange={(e) => setLocalConfig(prev => ({ ...prev, teamSlogan: e.target.value }))}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Texto do Reconhecimento:
              </label>
              <textarea
                rows={2}
                value={localConfig.customTextFormula}
                onChange={(e) => setLocalConfig(prev => ({ ...prev, customTextFormula: e.target.value }))}
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Typography Settings */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Tipografia do Nome do Aluno:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Cinzel', 'Great Vibes', 'Montserrat', 'Playfair Display'] as const).map(font => (
                <button
                  key={font}
                  type="button"
                  onClick={() => setLocalConfig(prev => ({ ...prev, fontFamilyName: font }))}
                  className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                    localConfig.fontFamilyName === font
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                  style={{ fontFamily: font }}
                >
                  {font}
                </button>
              ))}
            </div>
          </div>

          {/* Gold Seal Configuration */}
          <div className="pt-2 border-t border-slate-100 bg-amber-50/50 p-4 rounded-2xl border border-amber-200/60">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Guia do Selo Dourado Físico
                </span>
              </div>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localConfig.goldSeal.showGuide}
                  onChange={(e) => setLocalConfig(prev => ({
                    ...prev,
                    goldSeal: { ...prev.goldSeal, showGuide: e.target.checked }
                  }))}
                  className="rounded text-blue-600"
                />
                Exibir Guia na Tela
              </label>
            </div>

            <p className="text-xs text-amber-800/80 mb-3">
              Mostra o círculo tracejado no certificado onde ele cola com a mão o selo de relevo dourado.
            </p>

            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-slate-700">Diâmetro do Selo:</label>
              <select
                value={localConfig.goldSeal.sizeMm}
                onChange={(e) => setLocalConfig(prev => ({
                  ...prev,
                  goldSeal: { ...prev.goldSeal, sizeMm: Number(e.target.value) }
                }))}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
              >
                <option value={40}>40 mm (Pequeno)</option>
                <option value={45}>45 mm (Padrão Ouro)</option>
                <option value={50}>50 mm (Grande Solene)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restaurar Padrão
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 shadow-md shadow-blue-500/20 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
