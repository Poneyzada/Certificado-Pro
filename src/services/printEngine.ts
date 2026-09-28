import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { Student, CertificateConfig } from '../types';
import { getBeltById } from '../constants/belts';

export const PrintEngine = {
  /**
   * Generates a high-quality multi-page PDF for a list of students
   */
  generateBatchPDF: async (
    students: Student[],
    _config?: CertificateConfig,
    onProgress?: (current: number, total: number) => void
  ): Promise<void> => {
    if (!students.length) return;

    // A4 Landscape: 297mm x 210mm
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      if (onProgress) onProgress(i + 1, students.length);

      if (i > 0) {
        pdf.addPage('a4', 'landscape');
      }

      // Render certificate element to canvas or vector
      const elementId = `cert-render-${student.id}`;
      const element = document.getElementById(elementId);

      // If rendered element exists, snapshot it to canvas
      if (element) {
        const canvas = await html2canvas(element, {
          scale: 2.5, // Crisp 300DPI equivalent
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210);
      }
    }

    const beltName = getBeltById(students[0]?.belt).name.replace(/\s+/g, '_');
    const filename = `Certificados_${beltName}_${new Date().toISOString().slice(0, 10)}.pdf`;
    pdf.save(filename);
  },

  /**
   * Triggers native browser print dialog for selected batch
   */
  printDirectly: () => {
    window.print();
  }
};
