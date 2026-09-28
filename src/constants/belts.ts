import type { BeltDefinition, BeltType } from '../types';

export const BJJ_BELTS: BeltDefinition[] = [
  // Adultos
  {
    id: 'branca',
    name: 'Faixa Branca',
    category: 'adulto',
    colorHex: '#f8fafc',
    barColorHex: '#0f172a',
    textColor: '#1e293b',
    badgeBg: 'bg-slate-100 text-slate-800 border-slate-300'
  },
  {
    id: 'azul',
    name: 'Faixa Azul',
    category: 'adulto',
    colorHex: '#2563eb',
    barColorHex: '#0f172a',
    textColor: '#ffffff',
    badgeBg: 'bg-blue-500 text-white border-blue-600'
  },
  {
    id: 'roxa',
    name: 'Faixa Roxa',
    category: 'adulto',
    colorHex: '#7c3aed',
    barColorHex: '#0f172a',
    textColor: '#ffffff',
    badgeBg: 'bg-purple-600 text-white border-purple-700'
  },
  {
    id: 'marrom',
    name: 'Faixa Marrom',
    category: 'adulto',
    colorHex: '#78350f',
    barColorHex: '#0f172a',
    textColor: '#ffffff',
    badgeBg: 'bg-amber-900 text-white border-amber-950'
  },
  {
    id: 'preta',
    name: 'Faixa Preta',
    category: 'adulto',
    colorHex: '#0f172a',
    barColorHex: '#dc2626',
    textColor: '#ffffff',
    badgeBg: 'bg-zinc-900 text-amber-400 border-zinc-950'
  },
  {
    id: 'coral',
    name: 'Faixa Coral (Vermelha e Preta)',
    category: 'adulto',
    colorHex: '#b91c1c',
    barColorHex: '#ffffff',
    textColor: '#ffffff',
    badgeBg: 'bg-red-700 text-white border-red-800'
  },
  {
    id: 'vermelha',
    name: 'Faixa Vermelha (Grande Mestre)',
    category: 'adulto',
    colorHex: '#dc2626',
    barColorHex: '#fbbf24',
    textColor: '#ffffff',
    badgeBg: 'bg-red-600 text-white border-red-700'
  },

  // Infanto-Juvenil
  {
    id: 'cinza-branca',
    name: 'Faixa Cinza e Branca',
    category: 'infantil',
    colorHex: '#94a3b8',
    barColorHex: '#0f172a',
    textColor: '#ffffff',
    badgeBg: 'bg-slate-400 text-white border-slate-500'
  },
  {
    id: 'cinza',
    name: 'Faixa Cinza',
    category: 'infantil',
    colorHex: '#64748b',
    barColorHex: '#0f172a',
    textColor: '#ffffff',
    badgeBg: 'bg-slate-500 text-white border-slate-600'
  },
  {
    id: 'cinza-preta',
    name: 'Faixa Cinza e Preta',
    category: 'infantil',
    colorHex: '#475569',
    barColorHex: '#0f172a',
    textColor: '#ffffff',
    badgeBg: 'bg-slate-600 text-white border-slate-700'
  },
  {
    id: 'amarela-branca',
    name: 'Faixa Amarela e Branca',
    category: 'infantil',
    colorHex: '#facc15',
    barColorHex: '#0f172a',
    textColor: '#713f12',
    badgeBg: 'bg-yellow-400 text-yellow-950 border-yellow-500'
  },
  {
    id: 'amarela',
    name: 'Faixa Amarela',
    category: 'infantil',
    colorHex: '#eab308',
    barColorHex: '#0f172a',
    textColor: '#713f12',
    badgeBg: 'bg-yellow-500 text-yellow-950 border-yellow-600'
  },
  {
    id: 'amarela-preta',
    name: 'Faixa Amarela e Preta',
    category: 'infantil',
    colorHex: '#ca8a04',
    barColorHex: '#0f172a',
    textColor: '#ffffff',
    badgeBg: 'bg-yellow-600 text-white border-yellow-700'
  },
  {
    id: 'laranja-branca',
    name: 'Faixa Laranja e Branca',
    category: 'infantil',
    colorHex: '#fb923c',
    barColorHex: '#0f172a',
    textColor: '#ffffff',
    badgeBg: 'bg-orange-400 text-white border-orange-500'
  },
  {
    id: 'laranja',
    name: 'Faixa Laranja',
    category: 'infantil',
    colorHex: '#f97316',
    barColorHex: '#0f172a',
    textColor: '#ffffff',
    badgeBg: 'bg-orange-500 text-white border-orange-600'
  },
  {
    id: 'laranja-preta',
    name: 'Faixa Laranja e Preta',
    category: 'infantil',
    colorHex: '#ea580c',
    barColorHex: '#0f172a',
    textColor: '#ffffff',
    badgeBg: 'bg-orange-600 text-white border-orange-700'
  },
  {
    id: 'verde-branca',
    name: 'Faixa Verde e Branca',
    category: 'infantil',
    colorHex: '#4ade80',
    barColorHex: '#0f172a',
    textColor: '#14532d',
    badgeBg: 'bg-emerald-400 text-emerald-950 border-emerald-500'
  },
  {
    id: 'verde',
    name: 'Faixa Verde',
    category: 'infantil',
    colorHex: '#22c55e',
    barColorHex: '#0f172a',
    textColor: '#ffffff',
    badgeBg: 'bg-emerald-500 text-white border-emerald-600'
  },
  {
    id: 'verde-preta',
    name: 'Faixa Verde e Preta',
    category: 'infantil',
    colorHex: '#16a34a',
    barColorHex: '#0f172a',
    textColor: '#ffffff',
    badgeBg: 'bg-emerald-600 text-white border-emerald-700'
  }
];

export function getBeltById(id: BeltType | string): BeltDefinition {
  const found = BJJ_BELTS.find(b => b.id === id);
  return found || BJJ_BELTS[0];
}

export function formatDegrees(degrees: number): string {
  if (!degrees || degrees <= 0) return '';
  return ` - ${degrees}º Grau`;
}
