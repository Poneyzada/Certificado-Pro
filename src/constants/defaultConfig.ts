import type { CertificateConfig, Filial, Student, GraduationBatch } from '../types';

export const DEFAULT_CERTIFICATE_CONFIG: CertificateConfig = {
  backgroundType: 'default_ornate',
  academyName: 'EQUIPE DE JIU-JITSU',
  teamSlogan: 'ARTE SUAVE • DISCIPLINA • HONRA',
  headerTitle: 'CERTIFICADO DE GRADUAÇÃO',
  customTextFormula: 'Certificamos para os devidos fins que o(a) atleta concluiu com mérito todas as exigências técnicas e éticas estabelecidas, sendo solenemente graduado(a) à:',
  
  fontFamilyName: 'Cinzel',
  nameY: 42,
  nameFontSize: 36,
  nameColor: '#1e293b',
  
  beltY: 53,
  beltFontSize: 24,
  
  dateY: 74,
  dateX: 28,
  
  professorY: 74,
  professorX: 72,
  
  goldSeal: {
    showGuide: true,
    printGuide: false,
    x: 50,
    y: 80,
    sizeMm: 45
  }
};

export const INITIAL_FILIAIS: Filial[] = [
  { id: 'matriz', name: 'Matriz - Centro', professorDefault: 'Mestre Carlos Silva', city: 'São Paulo - SP', color: '#2563eb' },
  { id: 'filial-norte', name: 'Filial Zona Norte', professorDefault: 'Prof. Rafael Santos', city: 'São Paulo - SP', color: '#7c3aed' },
  { id: 'filial-sul', name: 'Filial Zona Sul', professorDefault: 'Prof. Diego Oliveira', city: 'São Paulo - SP', color: '#059669' },
  { id: 'filial-praia', name: 'Filial Litoral', professorDefault: 'Prof. Lucas Almeida', city: 'Santos - SP', color: '#ea580c' },
];

export const INITIAL_BATCHES: GraduationBatch[] = [
  {
    id: 'lote-2026-09',
    title: 'Graduação Geral de Setembro / 2026',
    date: '2026-09-28',
    filialId: 'matriz',
    professor: 'Mestre Carlos Silva',
    createdAt: '2026-09-28',
    notes: 'Exame de faixas e entrega solene dos certificados'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'aluno-1',
    name: 'Gabriel Albuquerque de Souza',
    belt: 'branca',
    degrees: 4,
    date: '2026-09-28',
    professor: 'Mestre Carlos Silva',
    filialId: 'matriz',
    filialName: 'Matriz - Centro',
    batchId: 'lote-2026-09',
    printed: false
  },
  {
    id: 'aluno-2',
    name: 'Matheus Henrique Ramos',
    belt: 'branca',
    degrees: 3,
    date: '2026-09-28',
    professor: 'Mestre Carlos Silva',
    filialId: 'matriz',
    filialName: 'Matriz - Centro',
    batchId: 'lote-2026-09',
    printed: false
  },
  {
    id: 'aluno-3',
    name: 'Felipe Augusto Ferreira',
    belt: 'branca',
    degrees: 2,
    date: '2026-09-28',
    professor: 'Mestre Carlos Silva',
    filialId: 'matriz',
    filialName: 'Matriz - Centro',
    batchId: 'lote-2026-09',
    printed: false
  },
  {
    id: 'aluno-4',
    name: 'Rodrigo Medeiros Costa',
    belt: 'azul',
    degrees: 2,
    date: '2026-09-28',
    professor: 'Mestre Carlos Silva',
    filialId: 'matriz',
    filialName: 'Matriz - Centro',
    batchId: 'lote-2026-09',
    printed: false
  },
  {
    id: 'aluno-5',
    name: 'Juliana Castro Mendes',
    belt: 'azul',
    degrees: 1,
    date: '2026-09-28',
    professor: 'Mestre Carlos Silva',
    filialId: 'matriz',
    filialName: 'Matriz - Centro',
    batchId: 'lote-2026-09',
    printed: false
  },
  {
    id: 'aluno-6',
    name: 'Thiago Barreto Guimarães',
    belt: 'roxa',
    degrees: 0,
    date: '2026-09-28',
    professor: 'Mestre Carlos Silva',
    filialId: 'matriz',
    filialName: 'Matriz - Centro',
    batchId: 'lote-2026-09',
    printed: false
  },
  {
    id: 'aluno-7',
    name: 'Eduardo Martins Silveira',
    belt: 'marrom',
    degrees: 1,
    date: '2026-09-28',
    professor: 'Mestre Carlos Silva',
    filialId: 'matriz',
    filialName: 'Matriz - Centro',
    batchId: 'lote-2026-09',
    printed: false
  },
  {
    id: 'aluno-8',
    name: 'Arthur Vinicius dos Santos',
    belt: 'amarela',
    degrees: 2,
    date: '2026-09-28',
    professor: 'Mestre Carlos Silva',
    filialId: 'matriz',
    filialName: 'Matriz - Centro',
    batchId: 'lote-2026-09',
    printed: false
  }
];
