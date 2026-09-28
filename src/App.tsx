import { useState, useEffect } from 'react';
import type { Student, Filial, BeltType, CertificateConfig } from './types';
import { StorageService } from './services/storage';
import { BJJ_BELTS, getBeltById } from './constants/belts';
import { INITIAL_STUDENTS } from './constants/defaultConfig';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { RightPanel } from './components/RightPanel';
import { FolderCard } from './components/FolderCard';
import { StudentListView } from './components/StudentListView';
import { FiliaisManager } from './components/FiliaisManager';
import { BatchImporterModal } from './components/BatchImporterModal';
import { BatchPrintModal } from './components/BatchPrintModal';
import { TemplateSettingsModal } from './components/TemplateSettingsModal';
import { StudentPreviewModal } from './components/StudentPreviewModal';
import { CertificateView } from './components/CertificateView';
import { Printer } from 'lucide-react';

export function App() {
  // App State
  const [students, setStudents] = useState<Student[]>([]);
  const [filiais, setFiliais] = useState<Filial[]>([]);
  const [config, setConfig] = useState<CertificateConfig>(StorageService.getConfig());

  // UI Navigation
  const [activeTab, setActiveTab] = useState<'folders' | 'all-students' | 'filiais' | 'settings'>('folders');
  const [selectedBeltId, setSelectedBeltId] = useState<BeltType | null>(null);
  const [selectedFilialId, setSelectedFilialId] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'adulto' | 'infantil'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Modals
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [printModalStudents, setPrintModalStudents] = useState<Student[] | null>(null);
  const [previewStudent, setPreviewStudent] = useState<Student | null>(null);

  // Load Initial Data and Sync with Cloud
  useEffect(() => {
    // 1. Instant local read
    setStudents(StorageService.getStudents());
    setFiliais(StorageService.getFiliais());
    setConfig(StorageService.getConfig());

    // 2. Background sync from Supabase if online
    StorageService.fetchStudentsFromSupabase().then(cloudStudents => {
      if (cloudStudents) setStudents(cloudStudents);
    });

    StorageService.fetchFiliaisFromSupabase().then(cloudFiliais => {
      if (cloudFiliais) setFiliais(cloudFiliais);
    });

    StorageService.fetchConfigFromSupabase().then(cloudConfig => {
      if (cloudConfig) setConfig(cloudConfig);
    });
  }, []);

  // Sync to Storage
  const handleUpdateStudents = (newStudents: Student[]) => {
    setStudents(newStudents);
    StorageService.saveStudents(newStudents);
  };

  const handleUpdateFiliais = (newFiliais: Filial[]) => {
    setFiliais(newFiliais);
    StorageService.saveFiliais(newFiliais);
  };

  const handleUpdateConfig = (newConfig: CertificateConfig) => {
    setConfig(newConfig);
    StorageService.saveConfig(newConfig);
  };

  // Actions
  const handleAddStudents = (incoming: Student[]) => {
    const updated = [...incoming, ...students];
    handleUpdateStudents(updated);
  };

  const handleTogglePrinted = (studentId: string) => {
    const updated = students.map(s =>
      s.id === studentId ? { ...s, printed: !s.printed, printedAt: new Date().toISOString() } : s
    );
    handleUpdateStudents(updated);
  };

  const handleDeleteStudent = (studentId: string) => {
    if (confirm('Deseja excluir este graduando?')) {
      const updated = students.filter(s => s.id !== studentId);
      setStudents(updated);
      StorageService.saveStudents(updated);
      StorageService.deleteStudent(studentId);
    }
  };

  const handleClearAllStudents = () => {
    if (confirm('Tem certeza que deseja apagar todos os alunos cadastrados para começar limpo?')) {
      setStudents([]);
      StorageService.clearAllStudents();
    }
  };

  const handleLoadDemoStudents = () => {
    handleUpdateStudents(INITIAL_STUDENTS);
  };

  const handleMarkAsPrinted = (studentIds: string[]) => {
    const updated = students.map(s =>
      studentIds.includes(s.id) ? { ...s, printed: true, printedAt: new Date().toISOString() } : s
    );
    handleUpdateStudents(updated);
  };

  // Filtered Students
  const filteredStudents = students.filter(s => {
    const matchFilial = selectedFilialId === 'all' || s.filialId === selectedFilialId;
    const matchSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.professor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.filialName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilial && matchSearch;
  });

  const pendingStudents = filteredStudents.filter(s => !s.printed);

  const selectedBeltDef = selectedBeltId ? getBeltById(selectedBeltId) : null;
  const beltStudents = selectedBeltId
    ? filteredStudents.filter(s => s.belt === selectedBeltId)
    : [];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col antialiased text-slate-800">
      {/* 1. Header */}
      <Header
        onOpenImport={() => setIsImportModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onToggleMobileDrawer={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
        pendingCount={pendingStudents.length}
        onPrintPending={() => setPrintModalStudents(pendingStudents)}
      />

      {/* 2. Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Desktop) */}
        <div className="hidden lg:block">
          <Sidebar
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
          />
        </div>

        {/* Mobile Slide Drawer */}
        {isMobileDrawerOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex">
            <div
              onClick={() => setIsMobileDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />
            <div className="relative z-50 w-64 h-full bg-white">
              <Sidebar
                activeTab={activeTab}
                onSelectTab={setActiveTab}
                onOpenSettings={() => setIsSettingsModalOpen(true)}
                onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Center Main Stage */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* View 1: Lotes por Faixa (Kintsugi Folder View) */}
            {activeTab === 'folders' && !selectedBeltId && (
              <div className="space-y-6">
                {/* Top Controls / Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      Lotes de Graduação por Faixa
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Selecione uma faixa para imprimir todos os certificados em série na Epson L3250
                    </p>
                  </div>

                  {/* Category Pills (Adulto vs Infantil) */}
                  <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 shadow-xs self-start">
                    <button
                      onClick={() => setCategoryFilter('all')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        categoryFilter === 'all'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Todas as Faixas
                    </button>
                    <button
                      onClick={() => setCategoryFilter('adulto')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        categoryFilter === 'adulto'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Adulto
                    </button>
                    <button
                      onClick={() => setCategoryFilter('infantil')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        categoryFilter === 'infantil'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Infantil
                    </button>
                  </div>
                </div>

                {/* Grid of Belt Folders (styled like Kintsugi UI) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                  {BJJ_BELTS.filter(b => categoryFilter === 'all' || b.category === categoryFilter).map(belt => {
                    const beltStudentsCount = filteredStudents.filter(s => s.belt === belt.id).length;
                    const unprintedCount = filteredStudents.filter(s => s.belt === belt.id && !s.printed).length;

                    return (
                      <FolderCard
                        key={belt.id}
                        belt={belt}
                        count={beltStudentsCount}
                        unprintedCount={unprintedCount}
                        isSelected={selectedBeltId === belt.id}
                        onClick={() => setSelectedBeltId(belt.id)}
                        onPrintBelt={(e) => {
                          e.stopPropagation();
                          const toPrint = filteredStudents.filter(s => s.belt === belt.id);
                          if (toPrint.length > 0) {
                            setPrintModalStudents(toPrint);
                          }
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* View 2: Inside a Selected Belt */}
            {activeTab === 'folders' && selectedBeltId && selectedBeltDef && (
              <StudentListView
                belt={selectedBeltDef}
                students={beltStudents}
                onBack={() => setSelectedBeltId(null)}
                onPrintStudents={(selected) => setPrintModalStudents(selected)}
                onTogglePrinted={handleTogglePrinted}
                onDeleteStudent={handleDeleteStudent}
                onPreviewStudent={(s) => setPreviewStudent(s)}
              />
            )}

            {/* View 3: All Students Flat List */}
            {activeTab === 'all-students' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Todos os Graduandos</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Visualização completa de todas as faixas e filiais cadastradas
                    </p>
                  </div>
                  <button
                    onClick={() => setPrintModalStudents(filteredStudents)}
                    disabled={filteredStudents.length === 0}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-md shadow-blue-500/20 disabled:opacity-40"
                  >
                    <Printer className="w-4 h-4" />
                    Imprimir Todos ({filteredStudents.length})
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {filteredStudents.map(student => {
                    const belt = getBeltById(student.belt);
                    return (
                      <div
                        key={student.id}
                        className="p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                            style={{ backgroundColor: belt.colorHex }}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-900 text-sm">{student.name}</h4>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                                {belt.name} {student.degrees > 0 ? `(${student.degrees}º Grau)` : ''}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {student.filialName} • {student.professor}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => handleTogglePrinted(student.id)}
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-all ${
                              student.printed
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {student.printed ? 'Impresso' : 'Pendente'}
                          </button>
                          <button
                            onClick={() => setPreviewStudent(student)}
                            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                          >
                            Ver Certificado
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* View 4: Filiais e Professores */}
            {activeTab === 'filiais' && (
              <FiliaisManager
                filiais={filiais}
                onSaveFiliais={handleUpdateFiliais}
              />
            )}
          </div>
        </main>

        {/* Right Info Panel (Desktop) */}
        <div className="hidden xl:block">
          <RightPanel
            students={students}
            filiais={filiais}
            selectedFilialId={selectedFilialId}
            onSelectFilial={setSelectedFilialId}
            onOpenImport={() => setIsImportModalOpen(true)}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
            onPrintAllPending={() => setPrintModalStudents(pendingStudents)}
            onClearAllStudents={handleClearAllStudents}
            onLoadDemoStudents={handleLoadDemoStudents}
          />
        </div>
      </div>

      {/* 3. Hidden Multi-Page Printing Surface for Epson L3250 & jsPDF */}
      <div className="print-only">
        {(printModalStudents || []).map(student => (
          <div key={`print-${student.id}`} id={`cert-render-${student.id}`}>
            <CertificateView
              student={student}
              config={config}
              isPrintVersion={true}
            />
          </div>
        ))}
      </div>

      {/* 4. Modals */}
      <BatchImporterModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        filiais={filiais}
        selectedFilialId={selectedFilialId === 'all' ? filiais[0]?.id : selectedFilialId}
        onAddStudents={handleAddStudents}
      />

      <BatchPrintModal
        isOpen={Boolean(printModalStudents)}
        onClose={() => setPrintModalStudents(null)}
        students={printModalStudents || []}
        config={config}
        onMarkAsPrinted={handleMarkAsPrinted}
      />

      <TemplateSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        config={config}
        onSaveConfig={handleUpdateConfig}
      />

      <StudentPreviewModal
        student={previewStudent}
        config={config}
        onClose={() => setPreviewStudent(null)}
        onMarkAsPrinted={(id) => handleMarkAsPrinted([id])}
      />
    </div>
  );
}

export default App;
