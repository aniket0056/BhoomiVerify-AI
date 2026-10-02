export interface SamplePresetDocument {
  id: string;
  title: string;
  docType: string;
  language: string;
  state: string;
  district: string;
  fileName: string;
  fileSize: string;
  pages: number;
  previewSvg: string;
  extractedFields: {
    ownerName: string;
    fatherName: string;
    surveyNumber: string;
    subDivision: string;
    khataNumber: string;
    village: string;
    taluk: string;
    district: string;
    state: string;
    landArea: number;
    landAreaFormatted: string;
    landType: string;
    ownershipType: string;
    registrationDate: string;
    mutationNumber: string;
    latitude: number;
    longitude: number;
  };
  confidenceScores: Record<string, number>;
  regionalOriginalText?: Record<string, string>;
  scenarioDescription: string;
  isMismatchDemo?: boolean;
}

export const samplePresetDocuments: SamplePresetDocument[] = [
  // PRESET 1: Primary Ramesh Kumar Demo Scenario
  {
    id: 'preset-ramesh-kumar',
    title: 'Karnataka Revenue Patta / RoR (Mysuru)',
    docType: 'Patta / RoR (RTC Extract)',
    language: 'Kannada (ಕನ್ನಡ)',
    state: 'Karnataka',
    district: 'Mysuru',
    fileName: 'RTC_MY_Rampura_SY82-4A_1998.pdf',
    fileSize: '2.4 MB',
    pages: 2,
    isMismatchDemo: true,
    scenarioDescription: 'Primary Demo Scenario: Document shows 2.45 Acres while Govt Database has 2.51 Acres. AI triggers 82% confidence warning.',
    previewSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 840" width="100%" height="100%" class="shadow-md bg-amber-50/20 font-serif">
      <rect width="600" height="840" fill="#fdfbf7" stroke="#cbd5e1" stroke-width="2"/>
      <rect x="20" y="20" width="560" height="800" fill="none" stroke="#94a3b8" stroke-dasharray="4,4"/>
      <!-- Header / Seal -->
      <circle cx="300" cy="70" r="32" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
      <text x="300" y="65" font-size="11" font-weight="bold" text-anchor="middle" fill="#78350f">ಕಂದಾಯ ಇಲಾಖೆ</text>
      <text x="300" y="80" font-size="9" text-anchor="middle" fill="#92400e">ಕರ್ನಾಟಕ ಸರ್ಕಾರ</text>
      
      <text x="300" y="125" font-size="16" font-weight="bold" text-anchor="middle" fill="#1e293b">ಭೂಮಿ ಕಂದಾಯ ಹಕ್ಕು ದಾಖಲೆ (RTC - FORM NO. 16)</text>
      <text x="300" y="145" font-size="11" text-anchor="middle" fill="#64748b">REVENUE RECORD OF RIGHTS, TENANCY & CROPS</text>
      <line x1="40" y1="160" x2="560" y2="160" stroke="#cbd5e1" stroke-width="1.5"/>

      <!-- Meta Grid -->
      <text x="50" y="185" font-size="12" font-weight="bold" fill="#334155">ಜಿಲ್ಲೆ (District): <tspan font-weight="normal">ಮೈಸೂರು (Mysuru)</tspan></text>
      <text x="320" y="185" font-size="12" font-weight="bold" fill="#334155">ತಾಲೂಕು (Taluk): <tspan font-weight="normal">ನಂಜನಗೂಡು (Nanjangud)</tspan></text>
      <text x="50" y="210" font-size="12" font-weight="bold" fill="#334155">ಹೋಬಳಿ (Hobli): <tspan font-weight="normal">ಚಿಕ್ಕಯ್ಯನ ಛತ್ರ</tspan></text>
      <text x="320" y="210" font-size="12" font-weight="bold" fill="#334155">ಗ್ರಾಮ (Village): <tspan font-weight="normal">ರಾಂಪುರ (Rampura)</tspan></text>
      
      <line x1="40" y1="230" x2="560" y2="230" stroke="#cbd5e1"/>

      <!-- Table Section -->
      <rect x="40" y="245" width="520" height="26" fill="#f1f5f9" stroke="#cbd5e1"/>
      <text x="50" y="262" font-size="11" font-weight="bold" fill="#1e293b">ಸರ್ವೆ ನಂ (Survey No)</text>
      <text x="180" y="262" font-size="11" font-weight="bold" fill="#1e293b">ಖಾತೆ ನಂ (Khata)</text>
      <text x="280" y="262" font-size="11" font-weight="bold" fill="#1e293b">ವಿಸ್ತೀರ್ಣ (Area)</text>
      <text x="390" y="262" font-size="11" font-weight="bold" fill="#1e293b">ಭೂಮಿ ವಿಧ (Type)</text>

      <rect x="40" y="271" width="520" height="40" fill="#fff" stroke="#cbd5e1"/>
      <text x="50" y="295" font-size="14" font-weight="bold" fill="#0369a1">82/4A</text>
      <text x="180" y="295" font-size="13" fill="#334155">KH-203948</text>
      <text x="280" y="295" font-size="14" font-weight="bold" fill="#b91c1c">2.45 ಎಕರೆ (Acres)</text>
      <text x="390" y="295" font-size="13" fill="#334155">ಖುಷ್ಕಿ (Agricultural)</text>

      <!-- Owner Details -->
      <text x="50" y="340" font-size="12" font-weight="bold" fill="#1e293b">ಕಬ್ಜೇದಾರರ ಹೆಸರು (Owner Name):</text>
      <rect x="40" y="350" width="520" height="70" fill="#fffbeb" stroke="#fef3c7"/>
      <text x="60" y="375" font-size="15" font-weight="bold" fill="#1e293b">ರಮೇಶ್ ಕುಮಾರ್ ಬಿನ್ ಮಹೇಶ್ ಕುಮಾರ್</text>
      <text x="60" y="395" font-size="13" fill="#475569">(Ramesh Kumar S/o Mahesh Kumar)</text>
      <text x="60" y="412" font-size="11" fill="#64748b">ಸ್ವಾಧೀನ ಸ್ವರೂಪ: ಸ್ವಯಾರ್ಜಿತ / ಖರೀದಿ ಕ್ರಯಪತ್ರ (Individual Owner)</text>

      <!-- Mutation / Registration -->
      <text x="50" y="450" font-size="12" font-weight="bold" fill="#1e293b">ಮ್ಯುಟೇಶನ್ ವಿವರ (Mutation & Registration):</text>
      <rect x="40" y="460" width="520" height="60" fill="#fff" stroke="#cbd5e1"/>
      <text x="60" y="485" font-size="12" fill="#334155">ಮ್ಯುಟೇಶನ್ ನಂ (MR No): <tspan font-weight="bold">MR-1998-2837</tspan></text>
      <text x="320" y="485" font-size="12" fill="#334155">ನೋಂದಣಿ ದಿನಾಂಕ: <tspan font-weight="bold">14/07/1998</tspan></text>
      <text x="60" y="505" font-size="11" fill="#64748b">ಉಪ ನೋಂದಣಾಧಿಕಾರಿ ಕಚೇರಿ, ನಂಜನಗೂಡು (Sub-Registrar Nanjangud)</text>

      <!-- Boundaries (Chakkubandi) -->
      <text x="50" y="545" font-size="12" font-weight="bold" fill="#1e293b">ಚಕ್ಕುಬಂದಿ (Cadastral Boundaries):</text>
      <rect x="40" y="555" width="520" height="75" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="60" y="575" font-size="11" fill="#475569">ಪೂರ್ವ (East): ಕೃಷ್ಣಯ್ಯನವರ ಜಮೀನು (Survey 82/3)</text>
      <text x="320" y="575" font-size="11" fill="#475569">ಪಶ್ಚಿಮ (West): ಗ್ರಾಮ ಸಾರ್ವಜನಿಕ ರಸ್ತೆ (Village Road)</text>
      <text x="60" y="600" font-size="11" fill="#475569">ಉತ್ತರ (North): ನಾಲಾ ಕಾಲುವೆ (Irrigation Canal)</text>
      <text x="320" y="600" font-size="11" fill="#475569">ದಕ್ಷಿಣ (South): ರಂಗಪ್ಪ ಅವರ ಜಮೀನು (Survey 82/4B)</text>

      <!-- Cadastral Stamp & Signature -->
      <rect x="360" y="660" width="190" height="120" fill="#f8fafc" stroke="#94a3b8" stroke-dasharray="2,2"/>
      <circle cx="455" cy="710" r="30" fill="none" stroke="#2563eb" stroke-width="1.5"/>
      <text x="455" y="705" font-size="8" text-anchor="middle" fill="#1d4ed8">ತಹಶೀಲ್ದಾರ್ ಕಚೇರಿ</text>
      <text x="455" y="718" font-size="7" text-anchor="middle" fill="#1d4ed8">ನಂಜನಗೂಡು</text>
      <text x="455" y="760" font-size="10" font-weight="bold" text-anchor="middle" fill="#334155">Tahsildar / Village Accountant</text>
      <text x="455" y="772" font-size="8" text-anchor="middle" fill="#64748b">Digital Token Signed</text>
    </svg>`,
    extractedFields: {
      ownerName: 'Ramesh Kumar',
      fatherName: 'Mahesh Kumar',
      surveyNumber: '82/4A',
      subDivision: '4A',
      khataNumber: 'KH-203948',
      village: 'Rampura',
      taluk: 'Nanjangud',
      district: 'Mysuru',
      state: 'Karnataka',
      landArea: 2.45,
      landAreaFormatted: '2.45 Acres',
      landType: 'Agricultural',
      ownershipType: 'Individual',
      registrationDate: '1998-07-14',
      mutationNumber: 'MR-1998-2837',
      latitude: 12.1198,
      longitude: 76.6832,
    },
    confidenceScores: {
      ownerName: 98,
      fatherName: 97,
      surveyNumber: 96,
      khataNumber: 95,
      village: 99,
      taluk: 98,
      district: 99,
      landArea: 82, // Flagged mismatch with 2.51 in DB
      landType: 94,
      ownershipType: 93,
      registrationDate: 96,
      mutationNumber: 95,
      latitude: 92,
      longitude: 92,
    },
    regionalOriginalText: {
      ownerName: 'ರಮೇಶ್ ಕುಮಾರ್ ಬಿನ್ ಮಹೇಶ್ ಕುಮಾರ್',
      surveyNumber: '೮೨/೪ಎ (82/4A)',
      village: 'ರಾಂಪುರ (Rampura)',
      taluk: 'ನಂಜನಗೂಡು (Nanjangud)',
      district: 'ಮೈಸೂರು (Mysuru)',
      landAreaFormatted: '೨.೪೫ ಎಕರೆ (2.45 Acres)',
      landType: 'ಖುಷ್ಕಿ (Agricultural)'
    }
  },

  // PRESET 2: Suresh Gowda 104/2B Perfect Match
  {
    id: 'preset-suresh-gowda',
    title: 'Karnataka RoR Bannur (Mysuru)',
    docType: 'Patta / RoR',
    language: 'Kannada (ಕನ್ನಡ)',
    state: 'Karnataka',
    district: 'Mysuru',
    fileName: 'Bhoomi_RTC_Bannur_SY104-2B.pdf',
    fileSize: '1.8 MB',
    pages: 1,
    isMismatchDemo: false,
    scenarioDescription: 'High Confidence Record (98%): All extracted fields match the revenue database and GIS boundaries perfectly.',
    previewSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 840" width="100%" height="100%" class="shadow-md bg-white font-serif">
      <rect width="600" height="840" fill="#fefefe" stroke="#cbd5e1" stroke-width="2"/>
      <circle cx="300" cy="70" r="30" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
      <text x="300" y="65" font-size="10" font-weight="bold" text-anchor="middle" fill="#0369a1">ಕಂದಾಯ ಇಲಾಖೆ</text>
      <text x="300" y="78" font-size="8" text-anchor="middle" fill="#0284c7">ಕರ್ನಾಟಕ</text>
      <text x="300" y="125" font-size="16" font-weight="bold" text-anchor="middle" fill="#0f172a">ಭೂಮಿ ತಂತ್ರಾಂಶ - ಹಕ್ಕು ದಾಖಲೆ (RTC)</text>
      <text x="50" y="180" font-size="12" fill="#334155"><tspan font-weight="bold">ಜಿಲ್ಲೆ:</tspan> ಮೈಸೂರು | <tspan font-weight="bold">ತಾಲೂಕು:</tspan> ಟಿ. ನರಸೀಪುರ | <tspan font-weight="bold">ಗ್ರಾಮ:</tspan> ಬನ್ನೂರು</text>
      <rect x="40" y="210" width="520" height="120" fill="#f8fafc" stroke="#cbd5e1"/>
      <text x="60" y="240" font-size="13" font-weight="bold" fill="#1e293b">ಸರ್ವೆ ನಂ: 104/2B | ಖಾತೆ ನಂ: KH-118274</text>
      <text x="60" y="270" font-size="14" font-weight="bold" fill="#047857">ಮಾಲೀಕರು: ಸುರೇಶ್ ಗೌಡ ಬಿನ್ ಚನ್ನೇಗೌಡ (Suresh Gowda)</text>
      <text x="60" y="300" font-size="13" fill="#334155">ವಿಸ್ತೀರ್ಣ: 3.80 ಎಕರೆ | ಮ್ಯುಟೇಶನ್ ನಂ: MR-2004-9912</text>
    </svg>`,
    extractedFields: {
      ownerName: 'Suresh Gowda',
      fatherName: 'Channegowda',
      surveyNumber: '104/2B',
      subDivision: '2B',
      khataNumber: 'KH-118274',
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
      latitude: 12.3312,
      longitude: 76.8624,
    },
    confidenceScores: {
      ownerName: 99,
      fatherName: 98,
      surveyNumber: 99,
      khataNumber: 98,
      village: 99,
      taluk: 99,
      district: 99,
      landArea: 98,
      landType: 97,
      ownershipType: 96,
      registrationDate: 98,
      mutationNumber: 98,
      latitude: 96,
      longitude: 96,
    }
  },

  // PRESET 3: Hindi Khasra / Khatauni (Varanasi, UP)
  {
    id: 'preset-hindi-khasra',
    title: 'Uttar Pradesh Bhulekh Khasra (Varanasi)',
    docType: 'Khasra / Khatauni (UP Bhulekh)',
    language: 'Hindi (हिन्दी)',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    fileName: 'UP_Bhulekh_Khasra_214Kha_Varanasi.pdf',
    fileSize: '3.1 MB',
    pages: 1,
    isMismatchDemo: false,
    scenarioDescription: 'Multilingual Hindi Record: Handwritten legacy Devanagari script extraction with 96.8% accuracy.',
    previewSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 840" width="100%" height="100%" class="shadow-md bg-white font-serif">
      <rect width="600" height="840" fill="#fffdfa" stroke="#cbd5e1" stroke-width="2"/>
      <text x="300" y="80" font-size="16" font-weight="bold" text-anchor="middle" fill="#78350f">उत्तर प्रदेश राजस्व परिषद (भूलेख खतौनी)</text>
      <text x="300" y="105" font-size="12" text-anchor="middle" fill="#64748b">UP REVENUE BOARD - KHASRA / KHATAUNI EXTRACT</text>
      <line x1="40" y1="120" x2="560" y2="120" stroke="#cbd5e1"/>
      <text x="50" y="150" font-size="12" fill="#334155">जनपद: वाराणसी | तहसील: पिंडरा | ग्राम: शिवपुर</text>
      <rect x="40" y="170" width="520" height="110" fill="#fefce8" stroke="#fde047"/>
      <text x="60" y="200" font-size="13" font-weight="bold" fill="#1e293b">गाटा / खसरा संख्या: 214/ख | खाता संख्या: KH-UP-44910</text>
      <text x="60" y="230" font-size="14" font-weight="bold" fill="#1e293b">खातेदार का नाम: राजेश यादव सुपुत्र रामधनी यादव</text>
      <text x="60" y="258" font-size="13" fill="#334155">क्षेत्रफल: 1.85 हेक्टेयर (4.57 एकड़) | श्रेणी: कृषि भूमि</text>
    </svg>`,
    extractedFields: {
      ownerName: 'Rajesh Yadav',
      fatherName: 'Ramdhani Yadav',
      surveyNumber: '214/ख',
      subDivision: 'ख',
      khataNumber: 'KH-UP-44910',
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
      latitude: 25.3610,
      longitude: 82.9730,
    },
    confidenceScores: {
      ownerName: 97,
      fatherName: 96,
      surveyNumber: 97,
      khataNumber: 95,
      village: 98,
      taluk: 96,
      district: 99,
      landArea: 95,
      landType: 96,
      ownershipType: 94,
      registrationDate: 95,
      mutationNumber: 94,
      latitude: 91,
      longitude: 91,
    },
    regionalOriginalText: {
      ownerName: 'राजेश यादव सुपुत्र रामधनी यादव',
      surveyNumber: '२१४/ख (214/Kha)',
      village: 'शिवपुर (Shivpur)',
      taluk: 'पिंडरा (Pindra)',
      district: 'वाराणसी (Varanasi)',
      landAreaFormatted: '१.८५ हेक्टेयर (1.85 Hectares)'
    }
  },

  // PRESET 4: Maharashtra 7/12 (Pune)
  {
    id: 'preset-marathi-712',
    title: 'Maharashtra Mahabhulekh 7/12 (Pune)',
    docType: '7/12 Extract (Saat Baara)',
    language: 'Marathi (मराठी)',
    state: 'Maharashtra',
    district: 'Pune',
    fileName: 'Mahabhulekh_712_Haveli_SY402-1.pdf',
    fileSize: '2.1 MB',
    pages: 1,
    isMismatchDemo: false,
    scenarioDescription: 'Marathi Mahabhulekh Saat-Baara 7/12 extract from Haveli Taluka.',
    previewSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 840" width="100%" height="100%" class="shadow-md bg-white font-serif">
      <rect width="600" height="840" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
      <text x="300" y="80" font-size="16" font-weight="bold" text-anchor="middle" fill="#0f172a">महाराष्ट्र शासन - महाभूलेख (गाव नमुना ७/१२)</text>
      <text x="50" y="140" font-size="12" fill="#334155">जिल्हा: पुणे | तालुका: हवेली | गाव: वाघोली</text>
      <rect x="40" y="160" width="520" height="110" fill="#f0fdf4" stroke="#86efac"/>
      <text x="60" y="190" font-size="13" font-weight="bold" fill="#14532d">गट / सर्व्हे क्र.: 402/1 | खाते क्र.: MH-PN-99201</text>
      <text x="60" y="220" font-size="14" font-weight="bold" fill="#1e293b">खातेदाराचे नाव: ज्ञानेश्वर तुकाराम शिंदे (Dnyaneshwar Shinde)</text>
      <text x="60" y="250" font-size="13" fill="#334155">क्षेत्र: 1.25 हेक्टर आर | फेरफार क्र: MR-MH-2009-771</text>
    </svg>`,
    extractedFields: {
      ownerName: 'Dnyaneshwar Shinde',
      fatherName: 'Tukaram Shinde',
      surveyNumber: '402/1',
      subDivision: '1',
      khataNumber: 'MH-PN-99201',
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
      latitude: 18.5790,
      longitude: 73.9810,
    },
    confidenceScores: {
      ownerName: 98,
      fatherName: 97,
      surveyNumber: 98,
      khataNumber: 97,
      village: 99,
      taluk: 98,
      district: 99,
      landArea: 96,
      landType: 96,
      ownershipType: 95,
      registrationDate: 97,
      mutationNumber: 96,
      latitude: 93,
      longitude: 93,
    }
  }
];
