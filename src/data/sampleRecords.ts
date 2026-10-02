import { LandRecord } from '../types';

export const sampleLandRecords: LandRecord[] = [
  // 1. PRIMARY DEMO SCENARIO RECORD
  {
    recordId: 'LR-2026-58421',
    surveyNumber: '82/4A',
    subDivision: '4A',
    khataNumber: 'KH-203948',
    ownerName: 'Ramesh Kumar',
    fatherName: 'Mahesh Kumar',
    jointOwners: ['Sunita Ramesh Kumar'],
    village: 'Rampura',
    taluk: 'Nanjangud',
    district: 'Mysuru',
    state: 'Karnataka',
    landArea: 2.45,
    landAreaFormatted: '2.45 Acres (2 Acres 18 Guntas)',
    landType: 'Agricultural',
    ownershipType: 'Individual',
    registrationDate: '1998-07-14',
    mutationNumber: 'MR-1998-2837',
    marketValuationInr: 4850000,
    latitude: 12.1198,
    longitude: 76.6832,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [76.6820, 12.1190],
        [76.6845, 12.1192],
        [76.6843, 12.1208],
        [76.6818, 12.1205],
        [76.6820, 12.1190]
      ]
    },
    validationScore: 82,
    status: 'Review Required',
    riskLevel: 'HIGH',
    lastUpdated: '2026-10-02 09:15 AM',
    detectedLanguage: 'Kannada (ಕನ್ನಡ)',
    ocrAccuracy: 97.2,
    anomaliesDetected: [
      'Document area (2.45 Acres) differs from Government Cadastral database (2.51 Acres).',
      'Historical mutation MR-1998-2837 registered under manual registry book #42 with minor boundary offset.'
    ],
    officerRemarks: 'Manual verification recommended due to inconsistency between digitized document area and existing government database information.',
    existingGovtData: {
      ownerName: 'Ramesh Kumar',
      fatherName: 'Mahesh Kumar',
      surveyNumber: '82/4A',
      khataNumber: 'KH-203948',
      landArea: 2.51,
      village: 'Rampura',
      taluk: 'Nanjangud',
      mutationNumber: 'MR-1998-2837'
    }
  },

  // 2. High Confidence Verified Record
  {
    recordId: 'LR-2026-58422',
    surveyNumber: '104/2B',
    subDivision: '2B',
    khataNumber: 'KH-118274',
    ownerName: 'Suresh Gowda',
    fatherName: 'Channegowda',
    jointOwners: ['Jayamma Gowda'],
    village: 'Bannur',
    taluk: 'T. Narasipura',
    district: 'Mysuru',
    state: 'Karnataka',
    landArea: 3.80,
    landAreaFormatted: '3.80 Acres',
    landType: 'Agricultural',
    ownershipType: 'Joint / Co-owners',
    registrationDate: '2004-11-20',
    mutationNumber: 'MR-2004-9912',
    marketValuationInr: 7600000,
    latitude: 12.3312,
    longitude: 76.8624,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [76.8610, 12.3300],
        [76.8640, 12.3305],
        [76.8638, 12.3325],
        [76.8608, 12.3320],
        [76.8610, 12.3300]
      ]
    },
    validationScore: 98,
    status: 'Verified',
    riskLevel: 'LOW',
    lastUpdated: '2026-10-01 03:40 PM',
    verifiedBy: 'Shri Rajesh Sharma',
    verifiedAt: '2026-10-01 03:40 PM',
    detectedLanguage: 'Kannada (ಕನ್ನಡ)',
    ocrAccuracy: 99.1,
    officerRemarks: 'All 7 field checks matched perfectly with 2004 revenue survey records. DGPS coordinates verified.',
    existingGovtData: {
      ownerName: 'Suresh Gowda',
      fatherName: 'Channegowda',
      surveyNumber: '104/2B',
      khataNumber: 'KH-118274',
      landArea: 3.80,
      village: 'Bannur',
      taluk: 'T. Narasipura',
      mutationNumber: 'MR-2004-9912'
    }
  },

  // 3. Disputed Record with Multiple Claims
  {
    recordId: 'LR-2026-58423',
    surveyNumber: '45/1',
    subDivision: '1',
    khataNumber: 'KH-902183',
    ownerName: 'Lakshmi Devi',
    fatherName: 'Late K. Rangappa',
    village: 'Mandya Rural',
    taluk: 'Mandya',
    district: 'Mandya',
    state: 'Karnataka',
    landArea: 1.50,
    landAreaFormatted: '1.50 Acres',
    landType: 'Agricultural',
    ownershipType: 'Ancestral / Coparcenary',
    registrationDate: '2012-03-15',
    mutationNumber: 'MR-2012-3341',
    marketValuationInr: 3200000,
    latitude: 12.5240,
    longitude: 76.8970,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [76.8950, 12.5230],
        [76.8985, 12.5235],
        [76.8980, 12.5250],
        [76.8945, 12.5245],
        [76.8950, 12.5230]
      ]
    },
    validationScore: 64,
    status: 'Disputed',
    riskLevel: 'CRITICAL',
    lastUpdated: '2026-09-28 11:20 AM',
    detectedLanguage: 'Kannada (ಕನ್ನಡ)',
    ocrAccuracy: 95.4,
    anomaliesDetected: [
      'Active Civil Court Injunction pending (OS No. 412/2023) by secondary claimant Nagarajappa.',
      'Duplicate mutation claim filed under MR-2015-8812.'
    ],
    officerRemarks: 'Case flagged for District Magistrate review. Civil dispute pending in Mandya Senior Civil Court.',
    existingGovtData: {
      ownerName: 'Lakshmi Devi',
      fatherName: 'Late K. Rangappa',
      surveyNumber: '45/1',
      khataNumber: 'KH-902183',
      landArea: 1.50,
      village: 'Mandya Rural',
      taluk: 'Mandya',
      mutationNumber: 'MR-2012-3341'
    }
  },

  // 4. Duplicate Candidate Pair Record A
  {
    recordId: 'LR-2026-58424',
    surveyNumber: '112/3',
    subDivision: '3',
    khataNumber: 'KH-554109',
    ownerName: 'Anil Patil',
    fatherName: 'Basavaraj Patil',
    village: 'Kadakola',
    taluk: 'Mysuru',
    district: 'Mysuru',
    state: 'Karnataka',
    landArea: 4.20,
    landAreaFormatted: '4.20 Acres',
    landType: 'Industrial',
    ownershipType: 'Individual',
    registrationDate: '2016-08-10',
    mutationNumber: 'MR-2016-5510',
    marketValuationInr: 12500000,
    latitude: 12.2105,
    longitude: 76.6540,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [76.6520, 12.2090],
        [76.6560, 12.2095],
        [76.6555, 12.2120],
        [76.6515, 12.2115],
        [76.6520, 12.2090]
      ]
    },
    validationScore: 71,
    status: 'Flagged',
    riskLevel: 'HIGH',
    lastUpdated: '2026-09-30 02:15 PM',
    detectedLanguage: 'English',
    ocrAccuracy: 98.0,
    anomaliesDetected: [
      'High similarity (96%) with record LR-2026-58440 registered under Sunil Patil for survey 112/3.',
      'Potential overlapping partition deed without sub-division demarcation.'
    ],
    existingGovtData: {
      ownerName: 'Anil Patil',
      fatherName: 'Basavaraj Patil',
      surveyNumber: '112/3',
      khataNumber: 'KH-554109',
      landArea: 4.20,
      village: 'Kadakola',
      taluk: 'Mysuru',
      mutationNumber: 'MR-2016-5510'
    }
  },

  // 5. Duplicate Candidate Pair Record B
  {
    recordId: 'LR-2026-58440',
    surveyNumber: '112/3',
    subDivision: '3',
    khataNumber: 'KH-554110',
    ownerName: 'Sunil Patil',
    fatherName: 'Basavaraj Patil',
    village: 'Kadakola',
    taluk: 'Mysuru',
    district: 'Mysuru',
    state: 'Karnataka',
    landArea: 4.20,
    landAreaFormatted: '4.20 Acres',
    landType: 'Industrial',
    ownershipType: 'Individual',
    registrationDate: '2018-02-14',
    mutationNumber: 'MR-2018-1209',
    marketValuationInr: 12500000,
    latitude: 12.2107,
    longitude: 76.6542,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [76.6521, 12.2092],
        [76.6561, 12.2097],
        [76.6556, 12.2122],
        [76.6516, 12.2117],
        [76.6521, 12.2092]
      ]
    },
    validationScore: 68,
    status: 'Flagged',
    riskLevel: 'HIGH',
    lastUpdated: '2026-09-30 02:18 PM',
    detectedLanguage: 'English',
    ocrAccuracy: 98.4,
    anomaliesDetected: [
      'Survey number 112/3 already claimed under Record LR-2026-58424 (Anil Patil).',
      'Identical 4.20 Acre parcel boundary overlap detected by GIS module.'
    ],
    existingGovtData: {
      ownerName: 'Sunil Patil',
      fatherName: 'Basavaraj Patil',
      surveyNumber: '112/3',
      khataNumber: 'KH-554110',
      landArea: 4.20,
      village: 'Kadakola',
      taluk: 'Mysuru',
      mutationNumber: 'MR-2018-1209'
    }
  },

  // 6. Verified Bengaluru Rural Tech / Commercial Parcel
  {
    recordId: 'LR-2026-58425',
    surveyNumber: '67/1A',
    subDivision: '1A',
    khataNumber: 'KH-778901',
    ownerName: 'Vijay Kumar Reddy',
    fatherName: 'N. Ramaiah Reddy',
    village: 'Devanahalli Rural',
    taluk: 'Devanahalli',
    district: 'Bengaluru Rural',
    state: 'Karnataka',
    landArea: 5.50,
    landAreaFormatted: '5.50 Acres',
    landType: 'Commercial',
    ownershipType: 'Individual',
    registrationDate: '2019-05-18',
    mutationNumber: 'MR-2019-7819',
    marketValuationInr: 38500000,
    latitude: 13.2450,
    longitude: 77.7120,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [77.7100, 13.2435],
        [77.7145, 13.2440],
        [77.7140, 13.2465],
        [77.7095, 13.2460],
        [77.7100, 13.2435]
      ]
    },
    validationScore: 99,
    status: 'Verified',
    riskLevel: 'LOW',
    lastUpdated: '2026-09-29 04:10 PM',
    verifiedBy: 'Dr. Praveen Naik',
    verifiedAt: '2026-09-29 04:10 PM',
    detectedLanguage: 'English',
    ocrAccuracy: 99.5,
    officerRemarks: 'Converted from Agri to Commercial with official DC Conversion Order #DC/DEV/2018/88.',
    existingGovtData: {
      ownerName: 'Vijay Kumar Reddy',
      fatherName: 'N. Ramaiah Reddy',
      surveyNumber: '67/1A',
      khataNumber: 'KH-778901',
      landArea: 5.50,
      village: 'Devanahalli Rural',
      taluk: 'Devanahalli',
      mutationNumber: 'MR-2019-7819'
    }
  },

  // 7. Hindi Khasra Legacy Record (Varanasi, UP)
  {
    recordId: 'LR-2026-58426',
    surveyNumber: '214/ख',
    subDivision: 'ख',
    khataNumber: 'KH-UP-44910',
    ownerName: 'Rajesh Yadav',
    fatherName: 'Ramdhani Yadav',
    village: 'Shivpur',
    taluk: 'Pindra',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    landArea: 1.85,
    landAreaFormatted: '1.85 Hectares (4.57 Acres)',
    landType: 'Agricultural',
    ownershipType: 'Individual',
    registrationDate: '1995-10-12',
    mutationNumber: 'MR-VAR-1995-12',
    marketValuationInr: 6500000,
    latitude: 25.3610,
    longitude: 82.9730,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [82.9710, 25.3595],
        [82.9750, 25.3600],
        [82.9745, 25.3625],
        [82.9705, 25.3620],
        [82.9710, 25.3595]
      ]
    },
    validationScore: 94,
    status: 'Verified',
    riskLevel: 'LOW',
    lastUpdated: '2026-09-25 10:00 AM',
    verifiedBy: 'Shri Rajesh Sharma',
    verifiedAt: '2026-09-25 10:00 AM',
    detectedLanguage: 'Hindi (हिन्दी)',
    ocrAccuracy: 96.8,
    officerRemarks: 'Legacy 1995 Khasra handwritten text extracted and verified against UP Bhulekh database.',
    existingGovtData: {
      ownerName: 'Rajesh Yadav',
      fatherName: 'Ramdhani Yadav',
      surveyNumber: '214/ख',
      khataNumber: 'KH-UP-44910',
      landArea: 1.85,
      village: 'Shivpur',
      taluk: 'Pindra',
      mutationNumber: 'MR-VAR-1995-12'
    }
  },

  // 8. Pending Verification Record (Hassan)
  {
    recordId: 'LR-2026-58427',
    surveyNumber: '31/8',
    subDivision: '8',
    khataNumber: 'KH-882103',
    ownerName: 'Meena Sharma',
    fatherName: 'Gopal Sharma',
    village: 'Belur Rural',
    taluk: 'Belur',
    district: 'Hassan',
    state: 'Karnataka',
    landArea: 3.10,
    landAreaFormatted: '3.10 Acres',
    landType: 'Agricultural',
    ownershipType: 'Individual',
    registrationDate: '2015-06-22',
    mutationNumber: 'MR-2015-4491',
    marketValuationInr: 4650000,
    latitude: 13.1610,
    longitude: 75.8620,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [75.8600, 13.1595],
        [75.8635, 13.1600],
        [75.8630, 13.1625],
        [75.8595, 13.1620],
        [75.8600, 13.1595]
      ]
    },
    validationScore: 91,
    status: 'Pending',
    riskLevel: 'LOW',
    lastUpdated: '2026-10-02 08:30 AM',
    detectedLanguage: 'Kannada (ಕನ್ನಡ)',
    ocrAccuracy: 95.8,
    existingGovtData: {
      ownerName: 'Meena Sharma',
      fatherName: 'Gopal Sharma',
      surveyNumber: '31/8',
      khataNumber: 'KH-882103',
      landArea: 3.10,
      village: 'Belur Rural',
      taluk: 'Belur',
      mutationNumber: 'MR-2015-4491'
    }
  },

  // 9. Flagged Mutation Number Mismatch (Tumakuru)
  {
    recordId: 'LR-2026-58428',
    surveyNumber: '156/4',
    subDivision: '4',
    khataNumber: 'KH-331908',
    ownerName: 'Sunita Devi',
    fatherName: 'Malleshaiah',
    village: 'Kunigal Town',
    taluk: 'Kunigal',
    district: 'Tumakuru',
    state: 'Karnataka',
    landArea: 2.15,
    landAreaFormatted: '2.15 Acres',
    landType: 'Residential',
    ownershipType: 'Individual',
    registrationDate: '2010-09-08',
    mutationNumber: 'MR-2010-8841',
    marketValuationInr: 5800000,
    latitude: 13.0240,
    longitude: 77.0340,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [77.0325, 13.0230],
        [77.0355, 13.0233],
        [77.0350, 13.0250],
        [77.0320, 13.0248],
        [77.0325, 13.0230]
      ]
    },
    validationScore: 78,
    status: 'Flagged',
    riskLevel: 'MEDIUM',
    lastUpdated: '2026-10-01 11:45 AM',
    detectedLanguage: 'Kannada (ಕನ್ನಡ)',
    ocrAccuracy: 94.2,
    anomaliesDetected: [
      'Extracted Mutation number MR-2010-8841 differs from online Bhoomi portal entry MR-2010-8840.',
      'Minor name spelling variance: Sunita vs Suneetha in legacy book.'
    ],
    existingGovtData: {
      ownerName: 'Suneetha Devi',
      fatherName: 'Malleshaiah',
      surveyNumber: '156/4',
      khataNumber: 'KH-331908',
      landArea: 2.15,
      village: 'Kunigal Town',
      taluk: 'Kunigal',
      mutationNumber: 'MR-2010-8840'
    }
  },

  // 10. Verified Shivamogga Arecanut Plantation Record
  {
    recordId: 'LR-2026-58429',
    surveyNumber: '92/3C',
    subDivision: '3C',
    khataNumber: 'KH-619204',
    ownerName: 'Chandrashekar Bhat',
    fatherName: 'Subramanya Bhat',
    village: 'Thirthahalli Rural',
    taluk: 'Thirthahalli',
    district: 'Shivamogga',
    state: 'Karnataka',
    landArea: 6.40,
    landAreaFormatted: '6.40 Acres (Areca Plantation)',
    landType: 'Agricultural',
    ownershipType: 'Ancestral / Coparcenary',
    registrationDate: '1988-04-19',
    mutationNumber: 'MR-1988-1092',
    marketValuationInr: 15400000,
    latitude: 13.6930,
    longitude: 75.2340,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [75.2320, 13.6915],
        [75.2365, 13.6920],
        [75.2360, 13.6945],
        [75.2315, 13.6940],
        [75.2320, 13.6915]
      ]
    },
    validationScore: 97,
    status: 'Verified',
    riskLevel: 'LOW',
    lastUpdated: '2026-09-27 01:15 PM',
    verifiedBy: 'Shri B. S. Venkatesh',
    verifiedAt: '2026-09-27 01:15 PM',
    detectedLanguage: 'Kannada (ಕನ್ನಡ)',
    ocrAccuracy: 98.6,
    officerRemarks: '1988 manual settlement index verified with Taluk sub-treasury records.',
    existingGovtData: {
      ownerName: 'Chandrashekar Bhat',
      fatherName: 'Subramanya Bhat',
      surveyNumber: '92/3C',
      khataNumber: 'KH-619204',
      landArea: 6.40,
      village: 'Thirthahalli Rural',
      taluk: 'Thirthahalli',
      mutationNumber: 'MR-1988-1092'
    }
  },

  // 11. Maharashtra 7/12 Extract (Pune)
  {
    recordId: 'LR-2026-58430',
    surveyNumber: '402/1',
    subDivision: '1',
    khataNumber: 'MH-PN-99201',
    ownerName: 'Dnyaneshwar Shinde',
    fatherName: 'Tukaram Shinde',
    village: 'Wagholi',
    taluk: 'Haveli',
    district: 'Pune',
    state: 'Maharashtra',
    landArea: 1.25,
    landAreaFormatted: '1.25 Hectares',
    landType: 'Commercial',
    ownershipType: 'Individual',
    registrationDate: '2009-12-05',
    mutationNumber: 'MR-MH-2009-771',
    marketValuationInr: 22000000,
    latitude: 18.5790,
    longitude: 73.9810,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [73.9790, 18.5775],
        [73.9830, 18.5780],
        [73.9825, 18.5805],
        [73.9785, 18.5800],
        [73.9790, 18.5775]
      ]
    },
    validationScore: 96,
    status: 'Verified',
    riskLevel: 'LOW',
    lastUpdated: '2026-09-24 02:40 PM',
    verifiedBy: 'Smt. Ananya Deshmukh',
    verifiedAt: '2026-09-24 02:40 PM',
    detectedLanguage: 'Marathi (मराठी)',
    ocrAccuracy: 98.2,
    officerRemarks: 'Mahabhulekh 7/12 OCR extraction matched with Haveli Taluka land registry.',
    existingGovtData: {
      ownerName: 'Dnyaneshwar Shinde',
      fatherName: 'Tukaram Shinde',
      surveyNumber: '402/1',
      khataNumber: 'MH-PN-99201',
      landArea: 1.25,
      village: 'Wagholi',
      taluk: 'Haveli',
      mutationNumber: 'MR-MH-2009-771'
    }
  },

  // 12. Tamil Nadu Patta / Chitta (Madurai)
  {
    recordId: 'LR-2026-58431',
    surveyNumber: '188/3A',
    subDivision: '3A',
    khataNumber: 'TN-MD-3091',
    ownerName: 'M. Senthil Nathan',
    fatherName: 'Muruganathan Pillai',
    village: 'Thiruparankundram',
    taluk: 'Madurai South',
    district: 'Madurai',
    state: 'Tamil Nadu',
    landArea: 2.10,
    landAreaFormatted: '2.10 Acres',
    landType: 'Residential',
    ownershipType: 'Joint / Co-owners',
    registrationDate: '2014-03-29',
    mutationNumber: 'MR-TN-2014-410',
    marketValuationInr: 9500000,
    latitude: 9.8820,
    longitude: 78.0720,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [78.0700, 9.8810],
        [78.0740, 9.8815],
        [78.0735, 9.8835],
        [78.0695, 9.8830],
        [78.0700, 9.8810]
      ]
    },
    validationScore: 95,
    status: 'Verified',
    riskLevel: 'LOW',
    lastUpdated: '2026-09-23 11:30 AM',
    verifiedBy: 'Shri Rajesh Sharma',
    verifiedAt: '2026-09-23 11:30 AM',
    detectedLanguage: 'Tamil (தமிழ்)',
    ocrAccuracy: 97.5,
    officerRemarks: 'Tamil Nilam portal records validated successfully against sub-registrar deed.',
    existingGovtData: {
      ownerName: 'M. Senthil Nathan',
      fatherName: 'Muruganathan Pillai',
      surveyNumber: '188/3A',
      khataNumber: 'TN-MD-3091',
      landArea: 2.10,
      village: 'Thiruparankundram',
      taluk: 'Madurai South',
      mutationNumber: 'MR-TN-2014-410'
    }
  },

  // 13. Andhra Pradesh Adangal Record
  {
    recordId: 'LR-2026-58432',
    surveyNumber: '75/2',
    subDivision: '2',
    khataNumber: 'AP-GNT-4401',
    ownerName: 'Venkatachalam Naidu',
    fatherName: 'Appa Rao Naidu',
    village: 'Mangalagiri',
    taluk: 'Mangalagiri',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    landArea: 3.45,
    landAreaFormatted: '3.45 Acres',
    landType: 'Agricultural',
    ownershipType: 'Individual',
    registrationDate: '2001-08-14',
    mutationNumber: 'MR-AP-2001-901',
    marketValuationInr: 11200000,
    latitude: 16.4310,
    longitude: 80.5620,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [80.5600, 16.4300],
        [80.5640, 16.4305],
        [80.5635, 16.4325],
        [80.5595, 16.4320],
        [80.5600, 16.4300]
      ]
    },
    validationScore: 93,
    status: 'Verified',
    riskLevel: 'LOW',
    lastUpdated: '2026-09-22 03:10 PM',
    detectedLanguage: 'Telugu (తెలుగు)',
    ocrAccuracy: 96.5,
    existingGovtData: {
      ownerName: 'Venkatachalam Naidu',
      fatherName: 'Appa Rao Naidu',
      surveyNumber: '75/2',
      khataNumber: 'AP-GNT-4401',
      landArea: 3.45,
      village: 'Mangalagiri',
      taluk: 'Mangalagiri',
      mutationNumber: 'MR-AP-2001-901'
    }
  },

  // 14. Pending Verification (Mysuru Hunsur)
  {
    recordId: 'LR-2026-58433',
    surveyNumber: '53/1B',
    subDivision: '1B',
    khataNumber: 'KH-402911',
    ownerName: 'Pradeep Gowda',
    fatherName: 'Ninge Gowda',
    village: 'Bilikere',
    taluk: 'Hunsur',
    district: 'Mysuru',
    state: 'Karnataka',
    landArea: 2.75,
    landAreaFormatted: '2.75 Acres',
    landType: 'Agricultural',
    ownershipType: 'Individual',
    registrationDate: '2017-04-11',
    mutationNumber: 'MR-2017-6621',
    marketValuationInr: 4100000,
    latitude: 12.3120,
    longitude: 76.4520,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [76.4500, 12.3110],
        [76.4535, 12.3115],
        [76.4530, 12.3135],
        [76.4495, 12.3130],
        [76.4500, 12.3110]
      ]
    },
    validationScore: 92,
    status: 'Pending',
    riskLevel: 'LOW',
    lastUpdated: '2026-10-02 10:05 AM',
    detectedLanguage: 'Kannada (ಕನ್ನಡ)',
    ocrAccuracy: 97.0,
    existingGovtData: {
      ownerName: 'Pradeep Gowda',
      fatherName: 'Ninge Gowda',
      surveyNumber: '53/1B',
      khataNumber: 'KH-402911',
      landArea: 2.75,
      village: 'Bilikere',
      taluk: 'Hunsur',
      mutationNumber: 'MR-2017-6621'
    }
  },

  // 15. Flagged Overlapping Boundary (Bengaluru Rural)
  {
    recordId: 'LR-2026-58434',
    surveyNumber: '19/2',
    subDivision: '2',
    khataNumber: 'KH-819200',
    ownerName: 'K. Muniraju',
    fatherName: 'Krishnappa',
    village: 'Hosakote Rural',
    taluk: 'Hosakote',
    district: 'Bengaluru Rural',
    state: 'Karnataka',
    landArea: 1.80,
    landAreaFormatted: '1.80 Acres',
    landType: 'Residential',
    ownershipType: 'Individual',
    registrationDate: '2020-01-19',
    mutationNumber: 'MR-2020-1920',
    marketValuationInr: 16200000,
    latitude: 13.0720,
    longitude: 77.7980,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [77.7960, 13.0710],
        [77.7995, 13.0715],
        [77.7990, 13.0735],
        [77.7955, 13.0730],
        [77.7960, 13.0710]
      ]
    },
    validationScore: 74,
    status: 'Flagged',
    riskLevel: 'HIGH',
    lastUpdated: '2026-10-01 05:20 PM',
    detectedLanguage: 'English',
    ocrAccuracy: 98.1,
    anomaliesDetected: [
      'GIS Boundary Overlap (14.2% area intersection) with adjacent survey parcel 19/1 (State Highway expansion corridor).',
      'Survey demarcation pillar missing during 2021 aerial drone survey.'
    ],
    existingGovtData: {
      ownerName: 'K. Muniraju',
      fatherName: 'Krishnappa',
      surveyNumber: '19/2',
      khataNumber: 'KH-819200',
      landArea: 1.80,
      village: 'Hosakote Rural',
      taluk: 'Hosakote',
      mutationNumber: 'MR-2020-1920'
    }
  },

  // 16. Verified Mandya Sugarcane Farmland
  {
    recordId: 'LR-2026-58435',
    surveyNumber: '142/5',
    subDivision: '5',
    khataNumber: 'KH-661029',
    ownerName: 'Shivanna',
    fatherName: 'Boregowda',
    village: 'Maddur Rural',
    taluk: 'Maddur',
    district: 'Mandya',
    state: 'Karnataka',
    landArea: 4.10,
    landAreaFormatted: '4.10 Acres',
    landType: 'Agricultural',
    ownershipType: 'Individual',
    registrationDate: '2006-03-12',
    mutationNumber: 'MR-2006-4401',
    marketValuationInr: 6150000,
    latitude: 12.5840,
    longitude: 77.0420,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [77.0400, 12.5825],
        [77.0440, 12.5830],
        [77.0435, 12.5855],
        [77.0395, 12.5850],
        [77.0400, 12.5825]
      ]
    },
    validationScore: 97,
    status: 'Verified',
    riskLevel: 'LOW',
    lastUpdated: '2026-09-26 04:50 PM',
    verifiedBy: 'Shri Rajesh Sharma',
    verifiedAt: '2026-09-26 04:50 PM',
    detectedLanguage: 'Kannada (ಕನ್ನಡ)',
    ocrAccuracy: 98.9,
    existingGovtData: {
      ownerName: 'Shivanna',
      fatherName: 'Boregowda',
      surveyNumber: '142/5',
      khataNumber: 'KH-661029',
      landArea: 4.10,
      village: 'Maddur Rural',
      taluk: 'Maddur',
      mutationNumber: 'MR-2006-4401'
    }
  },

  // 17. Gujarati Revenue Document (Ahmedabad)
  {
    recordId: 'LR-2026-58436',
    surveyNumber: '88/1',
    subDivision: '1',
    khataNumber: 'GJ-AHM-1980',
    ownerName: 'Pravinbhai Patel',
    fatherName: 'Ranchhodbhai Patel',
    village: 'Sanand Rural',
    taluk: 'Sanand',
    district: 'Ahmedabad',
    state: 'Gujarat',
    landArea: 3.20,
    landAreaFormatted: '3.20 Hectares (7.90 Acres)',
    landType: 'Industrial',
    ownershipType: 'Individual',
    registrationDate: '2011-10-09',
    mutationNumber: 'MR-GJ-2011-88',
    marketValuationInr: 45000000,
    latitude: 22.9860,
    longitude: 72.3780,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [72.3760, 22.9845],
        [72.3800, 22.9850],
        [72.3795, 22.9875],
        [72.3755, 22.9870],
        [72.3760, 22.9845]
      ]
    },
    validationScore: 96,
    status: 'Verified',
    riskLevel: 'LOW',
    lastUpdated: '2026-09-21 01:20 PM',
    verifiedBy: 'Smt. Ananya Deshmukh',
    verifiedAt: '2026-09-21 01:20 PM',
    detectedLanguage: 'Gujarati (ગુજરાતી)',
    ocrAccuracy: 98.0,
    officerRemarks: 'AnyRoR 7/12 record matched with GIDC industrial buffer parcel.',
    existingGovtData: {
      ownerName: 'Pravinbhai Patel',
      fatherName: 'Ranchhodbhai Patel',
      surveyNumber: '88/1',
      khataNumber: 'GJ-AHM-1980',
      landArea: 3.20,
      village: 'Sanand Rural',
      taluk: 'Sanand',
      mutationNumber: 'MR-GJ-2011-88'
    }
  },

  // 18. Bengali Khatian Record (North 24 Parganas)
  {
    recordId: 'LR-2026-58437',
    surveyNumber: '312/ক',
    subDivision: 'ক',
    khataNumber: 'WB-N24-5510',
    ownerName: 'Subhasish Banerjee',
    fatherName: 'Prabir Banerjee',
    village: 'Barasat',
    taluk: 'Barasat I',
    district: 'North 24 Parganas',
    state: 'West Bengal',
    landArea: 0.85,
    landAreaFormatted: '0.85 Acres (51 Cottahs)',
    landType: 'Residential',
    ownershipType: 'Individual',
    registrationDate: '2005-07-25',
    mutationNumber: 'MR-WB-2005-312',
    marketValuationInr: 7200000,
    latitude: 22.7210,
    longitude: 88.4830,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [88.4810, 22.7200],
        [88.4845, 22.7205],
        [88.4840, 22.7225],
        [88.4805, 22.7220],
        [88.4810, 22.7200]
      ]
    },
    validationScore: 94,
    status: 'Verified',
    riskLevel: 'LOW',
    lastUpdated: '2026-09-20 11:15 AM',
    detectedLanguage: 'Bengali (বাংলা)',
    ocrAccuracy: 96.4,
    existingGovtData: {
      ownerName: 'Subhasish Banerjee',
      fatherName: 'Prabir Banerjee',
      surveyNumber: '312/ক',
      khataNumber: 'WB-N24-5510',
      landArea: 0.85,
      village: 'Barasat',
      taluk: 'Barasat I',
      mutationNumber: 'MR-WB-2005-312'
    }
  },

  // 19. Punjabi Jamabandi Record (Ludhiana)
  {
    recordId: 'LR-2026-58438',
    surveyNumber: '95//12/2',
    subDivision: '12/2',
    khataNumber: 'PB-LDH-8902',
    ownerName: 'Gurpreet Singh',
    fatherName: 'Harbhajan Singh',
    village: 'Sahnewal',
    taluk: 'Ludhiana East',
    district: 'Ludhiana',
    state: 'Punjab',
    landArea: 8.50,
    landAreaFormatted: '8.50 Acres (68 Kanals)',
    landType: 'Agricultural',
    ownershipType: 'Ancestral / Coparcenary',
    registrationDate: '1992-11-04',
    mutationNumber: 'MR-PB-1992-95',
    marketValuationInr: 25500000,
    latitude: 30.8450,
    longitude: 75.9860,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [75.9830, 30.8435],
        [75.9885, 30.8440],
        [75.9880, 30.8470],
        [75.9825, 30.8465],
        [75.9830, 30.8435]
      ]
    },
    validationScore: 97,
    status: 'Verified',
    riskLevel: 'LOW',
    lastUpdated: '2026-09-19 03:30 PM',
    detectedLanguage: 'Punjabi (ਪੰਜਾਬੀ)',
    ocrAccuracy: 98.4,
    existingGovtData: {
      ownerName: 'Gurpreet Singh',
      fatherName: 'Harbhajan Singh',
      surveyNumber: '95//12/2',
      khataNumber: 'PB-LDH-8902',
      landArea: 8.50,
      village: 'Sahnewal',
      taluk: 'Ludhiana East',
      mutationNumber: 'MR-PB-1992-95'
    }
  },

  // 20. Malayalam Thandapper Record (Ernakulam)
  {
    recordId: 'LR-2026-58439',
    surveyNumber: '241/8',
    subDivision: '8',
    khataNumber: 'KL-EKM-3310',
    ownerName: 'K. V. Mathew',
    fatherName: 'Varghese Mathew',
    village: 'Aluva Rural',
    taluk: 'Aluva',
    district: 'Ernakulam',
    state: 'Kerala',
    landArea: 0.65,
    landAreaFormatted: '0.65 Acres (26 Cents)',
    landType: 'Residential',
    ownershipType: 'Individual',
    registrationDate: '2013-05-16',
    mutationNumber: 'MR-KL-2013-241',
    marketValuationInr: 13000000,
    latitude: 10.1080,
    longitude: 76.3570,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [76.3555, 10.1070],
        [76.3585, 10.1075],
        [76.3580, 10.1095],
        [76.3550, 10.1090],
        [76.3555, 10.1070]
      ]
    },
    validationScore: 98,
    status: 'Verified',
    riskLevel: 'LOW',
    lastUpdated: '2026-09-18 10:45 AM',
    detectedLanguage: 'Malayalam (മലയാളം)',
    ocrAccuracy: 99.0,
    existingGovtData: {
      ownerName: 'K. V. Mathew',
      fatherName: 'Varghese Mathew',
      surveyNumber: '241/8',
      khataNumber: 'KL-EKM-3310',
      landArea: 0.65,
      village: 'Aluva Rural',
      taluk: 'Aluva',
      mutationNumber: 'MR-KL-2013-241'
    }
  },

  // 21-35. More diverse records for rich tables, filtering, district metrics
  {
    recordId: 'LR-2026-58441',
    surveyNumber: '55/3',
    subDivision: '3',
    khataNumber: 'KH-190281',
    ownerName: 'Basavarajappa',
    fatherName: 'Eregowda',
    village: 'Hullahalli',
    taluk: 'Nanjangud',
    district: 'Mysuru',
    state: 'Karnataka',
    landArea: 3.25,
    landAreaFormatted: '3.25 Acres',
    landType: 'Agricultural',
    ownershipType: 'Individual',
    registrationDate: '2002-01-28',
    mutationNumber: 'MR-2002-1102',
    marketValuationInr: 4800000,
    latitude: 12.1640,
    longitude: 76.6210,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [76.6190, 12.1630],
        [76.6230, 12.1635],
        [76.6225, 12.1655],
        [76.6185, 12.1650],
        [76.6190, 12.1630]
      ]
    },
    validationScore: 96,
    status: 'Verified',
    riskLevel: 'LOW',
    lastUpdated: '2026-10-02 07:15 AM',
    detectedLanguage: 'Kannada (ಕನ್ನಡ)',
    ocrAccuracy: 97.8,
    existingGovtData: {
      ownerName: 'Basavarajappa',
      fatherName: 'Eregowda',
      surveyNumber: '55/3',
      khataNumber: 'KH-190281',
      landArea: 3.25,
      village: 'Hullahalli',
      taluk: 'Nanjangud',
      mutationNumber: 'MR-2002-1102'
    }
  },
  {
    recordId: 'LR-2026-58442',
    surveyNumber: '89/1C',
    subDivision: '1C',
    khataNumber: 'KH-789012',
    ownerName: 'Girijamma',
    fatherName: 'Late Shivanna',
    village: 'Nagamangala',
    taluk: 'Nagamangala',
    district: 'Mandya',
    state: 'Karnataka',
    landArea: 1.90,
    landAreaFormatted: '1.90 Acres',
    landType: 'Agricultural',
    ownershipType: 'Ancestral / Coparcenary',
    registrationDate: '1999-09-17',
    mutationNumber: 'MR-1999-3891',
    marketValuationInr: 2850000,
    latitude: 12.8210,
    longitude: 76.7580,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [76.7565, 12.8200],
        [76.7595, 12.8203],
        [76.7590, 12.8220],
        [76.7560, 12.8218],
        [76.7565, 12.8200]
      ]
    },
    validationScore: 89,
    status: 'Pending',
    riskLevel: 'LOW',
    lastUpdated: '2026-10-02 09:40 AM',
    detectedLanguage: 'Kannada (ಕನ್ನಡ)',
    ocrAccuracy: 95.2,
    existingGovtData: {
      ownerName: 'Girijamma',
      fatherName: 'Late Shivanna',
      surveyNumber: '89/1C',
      khataNumber: 'KH-789012',
      landArea: 1.90,
      village: 'Nagamangala',
      taluk: 'Nagamangala',
      mutationNumber: 'MR-1999-3891'
    }
  },
  {
    recordId: 'LR-2026-58443',
    surveyNumber: '210/6',
    subDivision: '6',
    khataNumber: 'KH-391082',
    ownerName: 'Muniswamappa',
    fatherName: 'Venkataswamy',
    village: 'Nelamangala Rural',
    taluk: 'Nelamangala',
    district: 'Bengaluru Rural',
    state: 'Karnataka',
    landArea: 3.60,
    landAreaFormatted: '3.60 Acres',
    landType: 'Commercial',
    ownershipType: 'Joint / Co-owners',
    registrationDate: '2015-11-30',
    mutationNumber: 'MR-2015-9981',
    marketValuationInr: 21600000,
    latitude: 13.0980,
    longitude: 77.3890,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [77.3870, 13.0965],
        [77.3910, 13.0970],
        [77.3905, 13.0995],
        [77.3865, 13.0990],
        [77.3870, 13.0965]
      ]
    },
    validationScore: 95,
    status: 'Verified',
    riskLevel: 'LOW',
    lastUpdated: '2026-10-01 02:00 PM',
    verifiedBy: 'Dr. Praveen Naik',
    verifiedAt: '2026-10-01 02:00 PM',
    detectedLanguage: 'Kannada (ಕನ್ನಡ)',
    ocrAccuracy: 98.3,
    existingGovtData: {
      ownerName: 'Muniswamappa',
      fatherName: 'Venkataswamy',
      surveyNumber: '210/6',
      khataNumber: 'KH-391082',
      landArea: 3.60,
      village: 'Nelamangala Rural',
      taluk: 'Nelamangala',
      mutationNumber: 'MR-2015-9981'
    }
  },
  {
    recordId: 'LR-2026-58444',
    surveyNumber: '44/2',
    subDivision: '2',
    khataNumber: 'KH-661902',
    ownerName: 'Manjunath Swamy',
    fatherName: 'Shankaraiah',
    village: 'Gubbi Rural',
    taluk: 'Gubbi',
    district: 'Tumakuru',
    state: 'Karnataka',
    landArea: 2.80,
    landAreaFormatted: '2.80 Acres',
    landType: 'Agricultural',
    ownershipType: 'Individual',
    registrationDate: '2008-05-14',
    mutationNumber: 'MR-2008-5521',
    marketValuationInr: 4200000,
    latitude: 13.3120,
    longitude: 76.9410,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [76.9395, 13.3110],
        [76.9430, 13.3113],
        [76.9425, 13.3132],
        [76.9390, 13.3128],
        [76.9395, 13.3110]
      ]
    },
    validationScore: 97,
    status: 'Verified',
    riskLevel: 'LOW',
    lastUpdated: '2026-09-30 10:15 AM',
    detectedLanguage: 'Kannada (ಕನ್ನಡ)',
    ocrAccuracy: 98.7,
    existingGovtData: {
      ownerName: 'Manjunath Swamy',
      fatherName: 'Shankaraiah',
      surveyNumber: '44/2',
      khataNumber: 'KH-661902',
      landArea: 2.80,
      village: 'Gubbi Rural',
      taluk: 'Gubbi',
      mutationNumber: 'MR-2008-5521'
    }
  },
  {
    recordId: 'LR-2026-58445',
    surveyNumber: '178/1',
    subDivision: '1',
    khataNumber: 'KH-812903',
    ownerName: 'Nagesh Poojary',
    fatherName: 'Ramanna Poojary',
    village: 'Sagar Rural',
    taluk: 'Sagar',
    district: 'Shivamogga',
    state: 'Karnataka',
    landArea: 5.10,
    landAreaFormatted: '5.10 Acres',
    landType: 'Forest / Wasteland',
    ownershipType: 'Government Leased',
    registrationDate: '2014-08-20',
    mutationNumber: 'MR-2014-7719',
    marketValuationInr: 5100000,
    latitude: 14.1640,
    longitude: 75.0320,
    boundaryGeoJson: {
      type: 'Polygon',
      coordinates: [
        [75.0300, 14.1625],
        [75.0345, 14.1630],
        [75.0340, 14.1655],
        [75.0295, 14.1650],
        [75.0300, 14.1625]
      ]
    },
    validationScore: 90,
    status: 'Pending',
    riskLevel: 'LOW',
    lastUpdated: '2026-10-02 06:50 AM',
    detectedLanguage: 'Kannada (ಕನ್ನಡ)',
    ocrAccuracy: 96.1,
    existingGovtData: {
      ownerName: 'Nagesh Poojary',
      fatherName: 'Ramanna Poojary',
      surveyNumber: '178/1',
      khataNumber: 'KH-812903',
      landArea: 5.10,
      village: 'Sagar Rural',
      taluk: 'Sagar',
      mutationNumber: 'MR-2014-7719'
    }
  }
];
