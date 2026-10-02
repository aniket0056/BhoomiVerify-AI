import { LandRecord, ValidationResult, ValidationCheckResult, RiskLevel } from '../types';

export interface AIProcessingMetrics {
  ocrAccuracy: number;
  extractedFieldsCount: number;
  detectedLanguage: string;
  potentialMismatches: number;
  overallConfidence: number;
  processingTimeSeconds: number;
}

export class AIEngine {
  /**
   * Simulates full AI document processing pipeline with callback progress
   */
  public static async processDocumentSimulation(
    documentData: {
      fileName: string;
      docType?: string;
      language?: string;
      isDemoMismatch?: boolean;
    },
    onProgress: (stageIndex: number, stageName: string, progressPercent: number) => void
  ): Promise<AIProcessingMetrics> {
    const stages = [
      'Document Uploaded & Pre-processed',
      'Image Enhancement & Despeckling',
      'OCR Script Recognition (Tesseract / Vision Transformer)',
      'Language & Dialect Identification',
      'Named Entity Recognition (NER) & Field Extraction',
      'Cadastral Entity Normalization',
      'State Land Database Matching',
      'AI Cross-Validation & Anomaly Scoring',
      'Structured Land Record Ready'
    ];

    for (let i = 0; i < stages.length; i++) {
      onProgress(i, stages[i], Math.round(((i + 1) / stages.length) * 100));
      // Artificial realistic delay
      await new Promise(resolve => setTimeout(resolve, 320));
    }

    return {
      ocrAccuracy: 97.2,
      extractedFieldsCount: 18,
      detectedLanguage: documentData.language || 'Kannada (ಕನ್ನಡ)',
      potentialMismatches: documentData.isDemoMismatch ? 2 : 0,
      overallConfidence: documentData.isDemoMismatch ? 82 : 96,
      processingTimeSeconds: 2.8,
    };
  }

  /**
   * Generates deep validation results by comparing an extracted record with existing govt database
   */
  public static validateRecord(record: LandRecord): ValidationResult {
    const govt = record.existingGovtData;
    const checks: ValidationCheckResult[] = [];
    const anomalies: string[] = [];

    // 1. Owner Name Check
    const ownerExtracted = record.ownerName;
    const ownerGovt = govt?.ownerName || record.ownerName;
    const isOwnerMatch = ownerExtracted.toLowerCase().trim() === ownerGovt.toLowerCase().trim();
    checks.push({
      checkName: 'Owner Name Match',
      extractedValue: ownerExtracted,
      govtRecordValue: ownerGovt,
      confidence: isOwnerMatch ? 98 : 74,
      status: isOwnerMatch ? 'MATCHED' : 'PARTIAL MATCH',
      notes: isOwnerMatch ? 'Exact match with Revenue Department voter & Aadhaar seeding.' : 'Minor spelling phonetic variation in legacy registry.'
    });

    // 2. Survey Number Check
    const surveyExtracted = record.surveyNumber;
    const surveyGovt = govt?.surveyNumber || record.surveyNumber;
    const isSurveyMatch = surveyExtracted === surveyGovt;
    checks.push({
      checkName: 'Survey Number Match',
      extractedValue: surveyExtracted,
      govtRecordValue: surveyGovt,
      confidence: isSurveyMatch ? 99 : 60,
      status: isSurveyMatch ? 'MATCHED' : 'MISMATCH',
      notes: isSurveyMatch ? 'Survey number and hissa sub-division verified in Village Tippani.' : 'Survey number mismatch detected in Cadastral index.'
    });

    // 3. Land Area Check (Demo Scenario Alert)
    const areaExtracted = record.landArea;
    const areaGovt = govt?.landArea ?? record.landArea;
    const areaDiff = Math.abs(areaExtracted - areaGovt);
    let areaStatus: 'MATCHED' | 'PARTIAL MATCH' | 'MISMATCH' = 'MATCHED';
    let areaConfidence = 98;

    if (areaDiff > 0.01) {
      areaStatus = areaDiff > 0.1 ? 'MISMATCH' : 'PARTIAL MATCH';
      areaConfidence = 82;
      anomalies.push(`Land Area discrepancy detected: Document shows ${areaExtracted} Acres, whereas Government Database indicates ${areaGovt} Acres.`);
    }

    checks.push({
      checkName: 'Land Area Match',
      extractedValue: `${areaExtracted} Acres`,
      govtRecordValue: `${areaGovt} Acres`,
      confidence: areaConfidence,
      status: areaStatus,
      notes: areaDiff > 0.01 ? 'Historical measurement unit conversion variance between Gunta and Acre units.' : 'Cadastral GIS polygon area aligns with deed measurement.'
    });

    // 4. Village & Taluk Check
    const villageExtracted = record.village;
    const villageGovt = govt?.village || record.village;
    const isVillageMatch = villageExtracted === villageGovt;
    checks.push({
      checkName: 'Village Boundary Match',
      extractedValue: `${villageExtracted}, ${record.taluk}`,
      govtRecordValue: `${villageGovt}, ${govt?.taluk || record.taluk}`,
      confidence: isVillageMatch ? 99 : 70,
      status: isVillageMatch ? 'MATCHED' : 'MISMATCH',
      notes: 'Revenue jurisdiction code matches Census 2011 Local Body Directory (LGD).'
    });

    // 5. Mutation Record Check
    const mutExtracted = record.mutationNumber;
    const mutGovt = govt?.mutationNumber || record.mutationNumber;
    const isMutMatch = mutExtracted === mutGovt;
    checks.push({
      checkName: 'Mutation Register Match',
      extractedValue: mutExtracted,
      govtRecordValue: mutGovt,
      confidence: isMutMatch ? 95 : 68,
      status: isMutMatch ? 'MATCHED' : 'MISMATCH',
      notes: isMutMatch ? 'Mutation verified in digital Taluk Mutation Register.' : 'Mutation entry in physical book has illegible endorsement.'
    });

    // 6. Historical Record Match
    checks.push({
      checkName: 'Historical Record (Legacy 1998)',
      extractedValue: '14/07/1998 Sale Deed #2837',
      govtRecordValue: 'Volume 42, Book I, Page 118',
      confidence: 94,
      status: 'MATCHED',
      notes: 'Sub-Registrar archival microfilm record matched.'
    });

    // 7. GIS Boundary Match
    const gisScore = record.status === 'Disputed' || record.riskLevel === 'CRITICAL' ? 62 : (record.riskLevel === 'HIGH' ? 84 : 96);
    checks.push({
      checkName: 'GIS Cadastral Overlay Match',
      extractedValue: 'DGPS Boundary Polygon',
      govtRecordValue: 'Karnataka GIS Cadastral Grid',
      confidence: gisScore,
      status: gisScore >= 90 ? 'MATCHED' : (gisScore >= 75 ? 'PARTIAL MATCH' : 'MISMATCH'),
      notes: gisScore >= 90 ? 'Zero overlap with adjacent road or public easements.' : 'Minor polygon perimeter deviation along southern irrigation canal.'
    });

    // Calculate Overall Score & Risk Level
    let totalScore = Math.round(checks.reduce((sum, c) => sum + c.confidence, 0) / checks.length);
    if (record.validationScore) {
      totalScore = record.validationScore;
    }

    let riskLevel: RiskLevel = 'LOW';
    let recommendation = 'Document validated with high confidence. Approved for digital issuance.';

    if (totalScore < 70 || record.status === 'Disputed') {
      riskLevel = 'CRITICAL';
      recommendation = 'Critical discrepancies detected. Immediate physical boundary survey and Sub-Divisional Magistrate review required.';
    } else if (totalScore < 85 || areaDiff > 0.01) {
      riskLevel = 'HIGH';
      recommendation = 'Manual verification is recommended due to inconsistency between digitized document area and existing government database information.';
    } else if (totalScore < 92) {
      riskLevel = 'MEDIUM';
      recommendation = 'Minor discrepancies noted in secondary attributes. Officer verification advised prior to final approval.';
    }

    return {
      validationId: `VAL-${record.recordId.replace('LR-', '')}`,
      recordId: record.recordId,
      overallScore: totalScore,
      riskLevel,
      ownerMatch: isOwnerMatch ? 'MATCHED' : 'PARTIAL MATCH',
      surveyMatch: isSurveyMatch ? 'MATCHED' : 'MISMATCH',
      areaMatch: areaStatus,
      gisMatch: gisScore >= 90 ? 'MATCHED' : 'PARTIAL MATCH',
      mutationMatch: isMutMatch ? 'MATCHED' : 'MISMATCH',
      villageMatch: isVillageMatch ? 'MATCHED' : 'MISMATCH',
      historicalRecordMatch: 'MATCHED',
      checks,
      anomalies: anomalies.length > 0 ? anomalies : (record.anomaliesDetected || []),
      aiRecommendation: recommendation,
      validatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
  }

  /**
   * Generates AI intelligent analytical insights
   */
  public static generateAIInsights(records: LandRecord[]) {
    const total = records.length;
    const verified = records.filter(r => r.status === 'Verified').length;
    const flagged = records.filter(r => r.status === 'Flagged' || r.status === 'Review Required').length;
    const verificationPercentage = total > 0 ? ((verified / total) * 100).toFixed(1) : '0';

    return [
      {
        id: 'ins-1',
        title: 'Digitization & Validation Progress',
        content: `Digitization completion reached 76.6% across active districts. Verified rate currently stands at ${verificationPercentage}%.`,
        badge: 'High Impact',
        badgeColor: 'emerald',
        trend: '+4.8% this week'
      },
      {
        id: 'ins-2',
        title: 'Area Inconsistency Pattern',
        content: 'Most validation mismatches (64.2%) are related to historical land-area measurements in legacy pre-2000 records transitioning from Gunta to Acre standards.',
        badge: 'Pattern Detected',
        badgeColor: 'amber',
        trend: 'Affects Mysuru & Mandya'
      },
      {
        id: 'ins-3',
        title: 'Pending Queue Concentration',
        content: 'Mysuru district currently has the highest number of pending verifications (42.8%), primarily concentrated in Nanjangud and T. Narasipura taluks.',
        badge: 'Action Needed',
        badgeColor: 'rose',
        trend: '17 Pending Review'
      },
      {
        id: 'ins-4',
        title: 'Duplicate Ownership AI Surveillance',
        content: '17 potential duplicate ownership records were detected this week using Cadastral Geo-Spatial Intersection and phonetic matching.',
        badge: 'Anomaly Alert',
        badgeColor: 'indigo',
        trend: '96% Match Accuracy'
      },
      {
        id: 'ins-5',
        title: 'Boundary Inconsistencies',
        content: 'Boundary inconsistencies increased by 4.3% this month, mainly due to infrastructure corridor expansions along National Highway routes.',
        badge: 'GIS Metric',
        badgeColor: 'blue',
        trend: 'Survey Dept Alerted'
      }
    ];
  }
}
