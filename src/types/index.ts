export type UserRole = 
  | 'Administrator'
  | 'Land Records Officer'
  | 'Verification Officer'
  | 'Survey Officer'
  | 'District Authority';

export interface User {
  id: string;
  name: string;
  employeeId: string;
  email: string;
  role: UserRole;
  district: string;
  department: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  lastLogin: string;
  avatarUrl?: string;
  designation?: string;
}

export type RecordStatus = 'Verified' | 'Pending' | 'Flagged' | 'Review Required' | 'Rejected' | 'Disputed' | 'Draft';
export type LandType = 'Agricultural' | 'Residential' | 'Commercial' | 'Industrial' | 'Forest / Wasteland' | 'Government / Public';
export type OwnershipType = 'Individual' | 'Joint / Co-owners' | 'Ancestral / Coparcenary' | 'Trust / Institutional' | 'Government Leased';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface LandRecord {
  recordId: string;
  surveyNumber: string;
  subDivision?: string;
  khataNumber: string;
  ownerName: string;
  fatherName: string;
  jointOwners?: string[];
  village: string;
  taluk: string;
  district: string;
  state: string;
  landArea: number; // in Acres
  landAreaFormatted: string; // e.g. "2.45 Acres" or "2 Acres 18 Guntas"
  landType: LandType;
  ownershipType: OwnershipType;
  registrationDate: string;
  mutationNumber: string;
  marketValuationInr: number;
  latitude: number;
  longitude: number;
  boundaryGeoJson?: {
    type: 'Polygon';
    coordinates: [number, number][];
  };
  validationScore: number; // 0 to 100
  status: RecordStatus;
  lastUpdated: string;
  verifiedBy?: string;
  verifiedAt?: string;
  officerRemarks?: string;
  scannedDocumentUrl?: string;
  detectedLanguage?: string;
  ocrAccuracy?: number;
  anomaliesDetected?: string[];
  riskLevel: RiskLevel;
  existingGovtData?: {
    ownerName: string;
    fatherName: string;
    surveyNumber: string;
    khataNumber: string;
    landArea: number;
    village: string;
    taluk: string;
    mutationNumber: string;
  };
}

export interface DocumentScan {
  documentId: string;
  recordId?: string;
  fileName: string;
  fileSize: string;
  documentType: 'Patta / RoR' | 'Sale Deed' | 'Mutation Register' | 'Survey Map (Tippani)' | 'Form 16' | 'Legacy Archive';
  language: string;
  ocrStatus: 'Not Started' | 'Processing' | 'Extracted' | 'Failed';
  uploadedAt: string;
  uploadedBy: string;
  pagesCount: number;
  imageUrls: string[];
  rawText?: string;
}

export interface ValidationCheckResult {
  checkName: string;
  extractedValue: string;
  govtRecordValue: string;
  confidence: number;
  status: 'MATCHED' | 'PARTIAL MATCH' | 'MISMATCH' | 'NOT AVAILABLE';
  notes?: string;
}

export interface ValidationResult {
  validationId: string;
  recordId: string;
  overallScore: number;
  riskLevel: RiskLevel;
  ownerMatch: 'MATCHED' | 'PARTIAL MATCH' | 'MISMATCH';
  surveyMatch: 'MATCHED' | 'PARTIAL MATCH' | 'MISMATCH';
  areaMatch: 'MATCHED' | 'PARTIAL MATCH' | 'MISMATCH';
  gisMatch: 'MATCHED' | 'PARTIAL MATCH' | 'MISMATCH';
  mutationMatch: 'MATCHED' | 'PARTIAL MATCH' | 'MISMATCH';
  villageMatch: 'MATCHED' | 'PARTIAL MATCH' | 'MISMATCH';
  historicalRecordMatch: 'MATCHED' | 'PARTIAL MATCH' | 'MISMATCH';
  checks: ValidationCheckResult[];
  anomalies: string[];
  aiRecommendation: string;
  validatedAt: string;
}

export interface DuplicateRecordPair {
  id: string;
  recordA: LandRecord;
  recordB: LandRecord;
  similarityScore: number; // e.g. 96%
  conflictReasons: string[];
  detectedAt: string;
  status: 'Unresolved' | 'Merged' | 'Marked Different' | 'Under Investigation';
  investigatingOfficer?: string;
}

export interface DisputeRecord {
  disputeId: string;
  recordId: string;
  surveyNumber: string;
  village: string;
  district: string;
  claimant: string;
  respondent: string;
  disputeType: 'Ownership Conflict' | 'Boundary Overlap' | 'Duplicate Record' | 'Inheritance Claim' | 'Registration Conflict' | 'Illegal Encroachment';
  filingDate: string;
  hearingDate?: string;
  courtCaseNumber?: string;
  status: 'Active' | 'In Hearing' | 'Under Investigation' | 'Resolved' | 'Dismissed';
  priority: 'High' | 'Medium' | 'Low';
  description: string;
  assignedOfficer: string;
  evidenceDocumentsCount: number;
}

export interface AuditLog {
  logId: string;
  timestamp: string;
  officerName: string;
  officerId: string;
  action: string;
  recordId?: string;
  module: string;
  ipAddress: string;
  status: 'Success' | 'Warning' | 'Security Alert';
  details?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  read: boolean;
  linkTab?: string;
  recordId?: string;
}

export interface AIProcessingPipelineStage {
  id: number;
  label: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  details?: string;
  timeTakenMs?: number;
}
