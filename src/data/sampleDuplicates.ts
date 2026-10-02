import { DuplicateRecordPair } from '../types';
import { sampleLandRecords } from './sampleRecords';

const recordA = sampleLandRecords.find(r => r.recordId === 'LR-2026-58424') || sampleLandRecords[3];
const recordB = sampleLandRecords.find(r => r.recordId === 'LR-2026-58440') || sampleLandRecords[4];

export const sampleDuplicatePairs: DuplicateRecordPair[] = [
  {
    id: 'DUP-2026-001',
    recordA: recordA,
    recordB: recordB,
    similarityScore: 96,
    conflictReasons: [
      'Same survey number (112/3) in Village Kadakola registered under two different owners.',
      'Identical land area of 4.20 Acres with 99.4% GIS boundary polygon overlap.',
      'Father name matches (Basavaraj Patil) suggesting non-demarcated brother co-inheritance.'
    ],
    detectedAt: '2026-09-30 02:18 PM',
    status: 'Unresolved',
    investigatingOfficer: 'Shri B. S. Venkatesh'
  },
  {
    id: 'DUP-2026-002',
    recordA: {
      ...sampleLandRecords[0],
      recordId: 'LR-2026-58421',
      ownerName: 'Ramesh Kumar',
      surveyNumber: '82/4A',
    },
    recordB: {
      ...sampleLandRecords[0],
      recordId: 'LR-LEGACY-1998-091',
      ownerName: 'Ramesh Kumar S/o Mahesh Kumar',
      surveyNumber: '82/4',
      landArea: 2.51,
      landAreaFormatted: '2.51 Acres',
      status: 'Pending',
    },
    similarityScore: 91,
    conflictReasons: [
      'Sub-division 4A mapped to parent survey 82/4.',
      'Document area variance (2.45 Acres vs 2.51 Acres legacy volume).'
    ],
    detectedAt: '2026-10-02 09:16 AM',
    status: 'Under Investigation',
    investigatingOfficer: 'Shri Rajesh Sharma'
  }
];
