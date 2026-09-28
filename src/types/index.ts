export type BeltType =
  | 'branca'
  | 'cinza-branca'
  | 'cinza'
  | 'cinza-preta'
  | 'amarela-branca'
  | 'amarela'
  | 'amarela-preta'
  | 'laranja-branca'
  | 'laranja'
  | 'laranja-preta'
  | 'verde-branca'
  | 'verde'
  | 'verde-preta'
  | 'azul'
  | 'roxa'
  | 'marrom'
  | 'preta'
  | 'coral'
  | 'vermelha';

export interface BeltDefinition {
  id: BeltType;
  name: string;
  category: 'adulto' | 'infantil';
  colorHex: string;
  barColorHex: string; // Cor da ponteira (ex: preta na branca/azul/roxa/marrom; vermelha na preta)
  textColor: string;
  badgeBg: string;
}

export interface Student {
  id: string;
  name: string;
  belt: BeltType;
  degrees: number; // 0 a 4 graus
  date: string;
  professor: string;
  filialId: string;
  filialName: string;
  batchId?: string;
  printed: boolean;
  printedAt?: string;
  notes?: string;
}

export interface Filial {
  id: string;
  name: string;
  professorDefault: string;
  city?: string;
  color?: string;
}

export interface GraduationBatch {
  id: string;
  title: string;
  date: string;
  filialId: string;
  professor: string;
  createdAt: string;
  notes?: string;
}

export interface CertificateConfig {
  backgroundType: 'default_ornate' | 'custom_image' | 'blank_preprinted';
  customImageBase64?: string;
  academyName: string;
  teamSlogan?: string;
  headerTitle: string; // "CERTIFICADO DE GRADUAÇÃO"
  customTextFormula: string; // "Certificamos que {ALUNO} concluiu com mérito as exigências técnicas e graduou-se à {FAIXA}..."
  
  // Posicionamento e Tipografia (em porcentagem % da folha A4 para ser 100% responsivo)
  fontFamilyName: 'Cinzel' | 'Great Vibes' | 'Montserrat' | 'Playfair Display' | 'Inter';
  nameY: number; // ex: 44%
  nameFontSize: number; // ex: 38px
  nameColor: string; // #111827
  
  beltY: number; // ex: 54%
  beltFontSize: number;
  
  dateY: number; // ex: 74%
  dateX: number; // ex: 30%
  
  professorY: number; // ex: 74%
  professorX: number; // ex: 70%
  
  // Selo Dourado Físico (onde ele cola na mão com a logo da equipe)
  goldSeal: {
    showGuide: boolean; // Mostrar círculo tracejado na tela/teste
    printGuide: boolean; // Se false, não imprime o círculo na Epson L3250
    x: number; // % horizontal (ex: 50% centro ou 15% canto)
    y: number; // % vertical (ex: 78%)
    sizeMm: number; // diâmetro do selo (ex: 45mm padrão)
  };
}
