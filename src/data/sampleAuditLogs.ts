import { AuditLog } from '../types';

export const sampleAuditLogs: AuditLog[] = [
  {
    logId: 'AUD-88912',
    timestamp: '2026-10-02 10:45:12',
    officerName: 'Shri Rajesh Sharma',
    officerId: 'EMP-RD-4821',
    action: 'AI Validation Completed',
    recordId: 'LR-2026-58421',
    module: 'AI Validation Engine',
    ipAddress: '10.24.110.82',
    status: 'Warning',
    details: 'AI flagged area mismatch: Extracted 2.45 Acres vs Govt Record 2.51 Acres (Confidence 82%).'
  },
  {
    logId: 'AUD-88911',
    timestamp: '2026-10-02 10:14:03',
    officerName: 'Smt. Ananya Deshmukh',
    officerId: 'EMP-RD-1092',
    action: 'System Configuration Updated',
    module: 'Admin Panel / AI Thresholds',
    ipAddress: '10.24.100.15',
    status: 'Success',
    details: 'Updated OCR confidence threshold to 85% for Kannada & Marathi legacy scripts.'
  },
  {
    logId: 'AUD-88910',
    timestamp: '2026-10-02 09:50:22',
    officerName: 'Shri B. S. Venkatesh',
    officerId: 'EMP-RD-3349',
    action: 'Record Uploaded',
    recordId: 'LR-2026-58433',
    module: 'Digitize Records',
    ipAddress: '10.24.112.44',
    status: 'Success',
    details: 'Scanned Kannada Patta document uploaded for Survey 53/1B, Bilikere Village.'
  },
  {
    logId: 'AUD-88909',
    timestamp: '2026-10-01 16:30:45',
    officerName: 'Dr. Praveen Naik',
    officerId: 'EMP-RD-6612',
    action: 'Record Approved',
    recordId: 'LR-2026-58425',
    module: 'Verification Queue',
    ipAddress: '10.24.118.09',
    status: 'Success',
    details: 'Record approved after verifying DC Conversion Order and GIS Cadastral parcel.'
  },
  {
    logId: 'AUD-88908',
    timestamp: '2026-10-01 14:15:10',
    officerName: 'Shri Rajesh Sharma',
    officerId: 'EMP-RD-4821',
    action: 'Record Approved',
    recordId: 'LR-2026-58422',
    module: 'Verification Queue',
    ipAddress: '10.24.110.82',
    status: 'Success',
    details: 'Verified Suresh Gowda (Survey 104/2B, Bannur) with 98% AI confidence.'
  },
  {
    logId: 'AUD-88907',
    timestamp: '2026-10-01 11:48:30',
    officerName: 'Shri Rajesh Sharma',
    officerId: 'EMP-RD-4821',
    action: 'Record Flagged',
    recordId: 'LR-2026-58428',
    module: 'AI Validation Engine',
    ipAddress: '10.24.110.82',
    status: 'Warning',
    details: 'Mutation MR-2010-8841 mismatch with portal entry MR-2010-8840.'
  },
  {
    logId: 'AUD-88906',
    timestamp: '2026-09-30 14:22:18',
    officerName: 'System / BhoomiVerify AI',
    officerId: 'SYSTEM-AI-AGENT',
    action: 'Duplicate Detected',
    recordId: 'LR-2026-58424 / LR-2026-58440',
    module: 'Duplicate Detection',
    ipAddress: '127.0.0.1 (Internal Engine)',
    status: 'Security Alert',
    details: '96% duplicate conflict detected for Survey 112/3 Kadakola between Anil Patil and Sunil Patil.'
  },
  {
    logId: 'AUD-88905',
    timestamp: '2026-09-29 16:40:02',
    officerName: 'Dr. K. Jayaram, IAS',
    officerId: 'EMP-RD-0018',
    action: 'Dispute Hearing Scheduled',
    recordId: 'LR-2026-58423',
    module: 'Dispute Records',
    ipAddress: '10.24.101.02',
    status: 'Success',
    details: 'Civil court inheritance hearing scheduled for 18-Oct-2026 before Sub-Divisional Magistrate.'
  },
  {
    logId: 'AUD-88904',
    timestamp: '2026-09-28 11:10:50',
    officerName: 'Shri Rajesh Sharma',
    officerId: 'EMP-RD-4821',
    action: 'Document Downloaded',
    recordId: 'LR-2026-58421',
    module: 'Land Records Profile',
    ipAddress: '10.24.110.82',
    status: 'Success',
    details: 'Digitized Land Record Certificate & RoR Extract generated in PDF format.'
  }
];
