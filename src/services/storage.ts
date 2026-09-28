import type { Student, Filial, GraduationBatch, CertificateConfig } from '../types';
import { DEFAULT_CERTIFICATE_CONFIG, INITIAL_FILIAIS, INITIAL_BATCHES, INITIAL_STUDENTS } from '../constants/defaultConfig';
import { supabase, isSupabaseConfigured } from './supabase';

const KEYS = {
  STUDENTS: 'certificadopro_students_v1',
  FILIAIS: 'certificadopro_filiais_v1',
  BATCHES: 'certificadopro_batches_v1',
  CONFIG: 'certificadopro_config_v1',
};

export const StorageService = {
  // Students
  getStudents: (): Student[] => {
    try {
      const data = localStorage.getItem(KEYS.STUDENTS);
      return data ? JSON.parse(data) : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  },

  saveStudents: (students: Student[]): void => {
    localStorage.setItem(KEYS.STUDENTS, JSON.stringify(students));
    if (isSupabaseConfigured && supabase) {
      supabase.from('students').upsert(students).then();
    }
  },

  // Filiais
  getFiliais: (): Filial[] => {
    try {
      const data = localStorage.getItem(KEYS.FILIAIS);
      return data ? JSON.parse(data) : INITIAL_FILIAIS;
    } catch {
      return INITIAL_FILIAIS;
    }
  },

  saveFiliais: (filiais: Filial[]): void => {
    localStorage.setItem(KEYS.FILIAIS, JSON.stringify(filiais));
    if (isSupabaseConfigured && supabase) {
      supabase.from('filiais').upsert(filiais).then();
    }
  },

  // Batches
  getBatches: (): GraduationBatch[] => {
    try {
      const data = localStorage.getItem(KEYS.BATCHES);
      return data ? JSON.parse(data) : INITIAL_BATCHES;
    } catch {
      return INITIAL_BATCHES;
    }
  },

  saveBatches: (batches: GraduationBatch[]): void => {
    localStorage.setItem(KEYS.BATCHES, JSON.stringify(batches));
    if (isSupabaseConfigured && supabase) {
      supabase.from('batches').upsert(batches).then();
    }
  },

  // Certificate Config
  getConfig: (): CertificateConfig => {
    try {
      const data = localStorage.getItem(KEYS.CONFIG);
      return data ? JSON.parse(data) : DEFAULT_CERTIFICATE_CONFIG;
    } catch {
      return DEFAULT_CERTIFICATE_CONFIG;
    }
  },

  saveConfig: (config: CertificateConfig): void => {
    localStorage.setItem(KEYS.CONFIG, JSON.stringify(config));
  },

  // Export full backup
  exportAllData: () => {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      students: StorageService.getStudents(),
      filiais: StorageService.getFiliais(),
      batches: StorageService.getBatches(),
      config: StorageService.getConfig(),
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_certificados_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  // Import backup
  importAllData: async (file: File): Promise<boolean> => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (data.students && data.filiais) {
        StorageService.saveStudents(data.students);
        StorageService.saveFiliais(data.filiais);
        if (data.batches) StorageService.saveBatches(data.batches);
        if (data.config) StorageService.saveConfig(data.config);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Falha ao importar backup', e);
      return false;
    }
  }
};
