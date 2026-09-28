import React, { useState } from 'react';
import type { Student, BeltDefinition } from '../types';
import { Printer, CheckCircle, Search, Trash2, Eye, CheckSquare, Square, ChevronLeft } from 'lucide-react';

interface StudentListViewProps {
  belt: BeltDefinition;
  students: Student[];
  onBack: () => void;
  onPrintStudents: (selectedStudents: Student[]) => void;
  onTogglePrinted: (studentId: string) => void;
  onDeleteStudent: (studentId: string) => void;
  onPreviewStudent: (student: Student) => void;
}

export const StudentListView: React.FC<StudentListViewProps> = ({
  belt,
  students,
  onBack,
  onPrintStudents,
  onTogglePrinted,
  onDeleteStudent,
  onPreviewStudent,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>(students.map(s => s.id));

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.filialName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredStudents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredStudents.map(s => s.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handlePrintBatch = () => {
    const toPrint = students.filter(s => selectedIds.includes(s.id));
    if (toPrint.length > 0) {
      onPrintStudents(toPrint);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Header / Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-full border border-black/20"
                style={{ backgroundColor: belt.colorHex }}
              />
              <h2 className="text-xl font-black text-slate-900">{belt.name}</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {students.length} graduando(s) cadastrados nesta faixa
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handlePrintBatch}
            disabled={selectedIds.length === 0}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 disabled:opacity-40 transition-all"
          >
            <Printer className="w-4 h-4" />
            Imprimir Selecionados ({selectedIds.length}) na Epson
          </button>
        </div>
      </div>

      {/* Filter and Select Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar aluno ou filial..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={toggleSelectAll}
          className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors"
        >
          {selectedIds.length === filteredStudents.length && filteredStudents.length > 0 ? (
            <CheckSquare className="w-4 h-4 text-blue-600" />
          ) : (
            <Square className="w-4 h-4 text-slate-400" />
          )}
          <span>Selecionar Todos ({filteredStudents.length})</span>
        </button>
      </div>

      {/* Student List */}
      <div className="space-y-2">
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-500">Nenhum aluno encontrado nesta faixa.</p>
          </div>
        ) : (
          filteredStudents.map(student => {
            const isSelected = selectedIds.includes(student.id);
            return (
              <div
                key={student.id}
                className={`p-4 rounded-2xl bg-white border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs ${
                  isSelected ? 'border-blue-300 ring-1 ring-blue-200 bg-blue-50/20' : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                {/* Left: Checkbox + Name + Details */}
                <div className="flex items-center gap-3.5">
                  <button
                    onClick={() => toggleSelectOne(student.id)}
                    className="text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    {isSelected ? (
                      <CheckSquare className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-300" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{student.name}</h4>
                      {student.degrees > 0 && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-slate-900 text-white">
                          {student.degrees}º GRAU
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span>{student.filialName}</span>
                      <span>•</span>
                      <span>{student.professor}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Print Status & Action Buttons */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => onTogglePrinted(student.id)}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 transition-all ${
                      student.printed
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    {student.printed ? 'Impresso' : 'Pendente'}
                  </button>

                  <button
                    onClick={() => onPreviewStudent(student)}
                    title="Prévia do Certificado"
                    className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDeleteStudent(student.id)}
                    title="Excluir"
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
