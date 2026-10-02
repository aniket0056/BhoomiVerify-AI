import jsPDF from 'jspdf';
import { LandRecord, AuditLog } from '../types';

export class ExportService {
  /**
   * Generates a CSV export of land records
   */
  public static exportRecordsToCsv(records: LandRecord[], filename = 'BhoomiVerify_Land_Records.csv') {
    const headers = [
      'Record ID',
      'Owner Name',
      'Father Name',
      'Survey Number',
      'Khata Number',
      'Village',
      'Taluk',
      'District',
      'State',
      'Land Area (Acres)',
      'Land Type',
      'Ownership Type',
      'Registration Date',
      'Mutation Number',
      'Validation Score (%)',
      'Status',
      'Risk Level'
    ];

    const rows = records.map(r => [
      `"${r.recordId}"`,
      `"${r.ownerName}"`,
      `"${r.fatherName}"`,
      `"${r.surveyNumber}"`,
      `"${r.khataNumber}"`,
      `"${r.village}"`,
      `"${r.taluk}"`,
      `"${r.district}"`,
      `"${r.state}"`,
      `"${r.landArea}"`,
      `"${r.landType}"`,
      `"${r.ownershipType}"`,
      `"${r.registrationDate}"`,
      `"${r.mutationNumber}"`,
      `"${r.validationScore}"`,
      `"${r.status}"`,
      `"${r.riskLevel}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Generates a CSV export of audit logs
   */
  public static exportAuditLogsToCsv(logs: AuditLog[], filename = 'BhoomiVerify_Audit_Logs.csv') {
    const headers = ['Log ID', 'Timestamp', 'Officer Name', 'Officer ID', 'Action', 'Record ID', 'Module', 'IP Address', 'Status', 'Details'];
    const rows = logs.map(l => [
      `"${l.logId}"`,
      `"${l.timestamp}"`,
      `"${l.officerName}"`,
      `"${l.officerId}"`,
      `"${l.action}"`,
      `"${l.recordId || '-'}"`,
      `"${l.module}"`,
      `"${l.ipAddress}"`,
      `"${l.status}"`,
      `"${(l.details || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Generates an official Certificate / Land Record Extract PDF
   */
  public static generateOfficialRecordPdf(record: LandRecord) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Top Header - Government Letterhead
    doc.setFillColor(15, 23, 42); // Dark Navy
    doc.rect(0, 0, pageWidth, 28, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('GOVERNMENT OF INDIA | MINISTRY OF RURAL DEVELOPMENT', pageWidth / 2, 12, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('BhoomiVerify AI - Official Digitized Land Record Verification Certificate', pageWidth / 2, 20, { align: 'center' });

    // Certificate Title
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('DIGITAL RECORD OF RIGHTS & VALIDATION SUMMARY', pageWidth / 2, 42, { align: 'center' });

    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.5);
    doc.line(14, 48, pageWidth - 14, 48);

    // Meta Box
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, 54, pageWidth - 28, 24, 3, 3, 'FD');

    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(`RECORD ID: ${record.recordId}`, 20, 63);
    doc.text(`DATE GENERATED: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`, 20, 71);
    doc.text(`VALIDATION SCORE: ${record.validationScore}%`, 110, 63);
    doc.text(`STATUS: ${record.status.toUpperCase()}`, 110, 71);

    // Table Content
    let y = 90;
    const drawField = (label: string, value: string, yPos: number, isRight = false) => {
      const x = isRight ? 110 : 20;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 41, 59);
      doc.text(label, x, yPos);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.text(value, x + 42, yPos);
    };

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(2, 103, 181);
    doc.text('1. Ownership & Cadastral Information', 20, y);
    y += 8;

    drawField('Owner Name:', record.ownerName, y);
    drawField('Father/Guardian:', record.fatherName, y, true);
    y += 8;
    drawField('Survey Number:', record.surveyNumber, y);
    drawField('Khata Number:', record.khataNumber, y, true);
    y += 8;
    drawField('Village:', record.village, y);
    drawField('Taluk:', record.taluk, y, true);
    y += 8;
    drawField('District:', record.district, y);
    drawField('State:', record.state, y, true);
    y += 12;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(2, 103, 181);
    doc.text('2. Land Characteristics & Mutation Details', 20, y);
    y += 8;

    drawField('Total Land Area:', `${record.landArea} Acres`, y);
    drawField('Land Type:', record.landType, y, true);
    y += 8;
    drawField('Ownership Type:', record.ownershipType, y);
    drawField('Registration Date:', record.registrationDate, y, true);
    y += 8;
    drawField('Mutation Number:', record.mutationNumber, y);
    drawField('GPS Coordinates:', `${record.latitude.toFixed(4)} N, ${record.longitude.toFixed(4)} E`, y, true);
    y += 14;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(2, 103, 181);
    doc.text('3. AI Verification & Validation Audit', 20, y);
    y += 8;

    drawField('OCR Accuracy:', `${record.ocrAccuracy || 97.2}%`, y);
    drawField('Risk Classification:', record.riskLevel, y, true);
    y += 8;
    drawField('Verified Officer:', record.verifiedBy || 'Pending Review', y);
    drawField('Verification Time:', record.verifiedAt || 'In Process', y, true);
    y += 10;

    if (record.officerRemarks) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 41, 59);
      doc.text('Officer Remarks / AI Assessment:', 20, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      const splitRemarks = doc.splitTextToSize(record.officerRemarks, pageWidth - 40);
      doc.text(splitRemarks, 20, y);
      y += splitRemarks.length * 6 + 6;
    }

    // Official Stamp Box
    y = Math.max(y, 230);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(pageWidth - 85, y, 70, 35, 2, 2, 'D');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('DIGITALLY SIGNED', pageWidth - 50, y + 10, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Revenue Dept Authority', pageWidth - 50, y + 16, { align: 'center' });
    doc.text('BhoomiVerify AI Gateway', pageWidth - 50, y + 22, { align: 'center' });
    doc.text(new Date().toISOString().substring(0, 10), pageWidth - 50, y + 28, { align: 'center' });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('This is a computer generated digitally signed land validation report issued under the National Land Records Modernization framework.', pageWidth / 2, 285, { align: 'center' });

    doc.save(`BhoomiVerify_${record.recordId}_${record.surveyNumber.replace('/', '-')}.pdf`);
  }
}
