import React, { useState } from 'react';
import type { Filial } from '../types';
import { Building2, Plus, Trash2, Check, X, User } from 'lucide-react';

interface FiliaisManagerProps {
  filiais: Filial[];
  onSaveFiliais: (filiais: Filial[]) => void;
}

export const FiliaisManager: React.FC<FiliaisManagerProps> = ({
  filiais,
  onSaveFiliais,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newProfessor, setNewProfessor] = useState('');
  const [newCity, setNewCity] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newFilial: Filial = {
      id: `filial-${Date.now()}`,
      name: newName.trim(),
      professorDefault: newProfessor.trim() || 'Mestre Responsável',
      city: newCity.trim() || 'Brasil',
    };

    onSaveFiliais([...filiais, newFilial]);
    setNewName('');
    setNewProfessor('');
    setNewCity('');
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (filiais.length <= 1) {
      alert('É necessário manter pelo menos uma filial cadastrada.');
      return;
    }
    if (confirm('Deseja realmente remover esta filial?')) {
      onSaveFiliais(filiais.filter(f => f.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-black text-slate-900">Filiais & Professores</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cadastre as academias filiais parceiras que encomendam os certificados
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-md shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          Cadastrar Nova Filial
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <form onSubmit={handleAdd} className="p-5 rounded-2xl bg-white border border-blue-200 shadow-md space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Nova Filial / Unidade</h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nome da Filial:</label>
              <input
                type="text"
                required
                placeholder="Ex: Filial Barra da Tijuca"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Professor Responsável:</label>
              <input
                type="text"
                placeholder="Ex: Prof. André Galvão"
                value={newProfessor}
                onChange={e => setNewProfessor(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Cidade / Estado:</label>
              <input
                type="text"
                placeholder="Ex: Rio de Janeiro - RJ"
                value={newCity}
                onChange={e => setNewCity(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs font-semibold px-4 py-2 text-slate-600 hover:text-slate-900"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-sm"
            >
              <Check className="w-4 h-4" />
              Salvar Filial
            </button>
          </div>
        </form>
      )}

      {/* Grid of Filiais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filiais.map(filial => (
          <div
            key={filial.id}
            className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Building2 className="w-5 h-5" />
                </span>
                <button
                  onClick={() => handleDelete(filial.id)}
                  title="Remover filial"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h4 className="font-bold text-slate-900 text-base">{filial.name}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{filial.city || 'Brasil'}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-medium truncate">{filial.professorDefault}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
