import { LandRecord, DisputeRecord, DuplicateRecordPair, AuditLog, AppNotification, RecordStatus } from '../types';
import { sampleLandRecords } from '../data/sampleRecords';
import { sampleDisputes } from '../data/sampleDisputes';
import { sampleDuplicatePairs } from '../data/sampleDuplicates';
import { sampleAuditLogs } from '../data/sampleAuditLogs';

const STORAGE_KEYS = {
  RECORDS: 'bhoomiverify_records_v1',
  DISPUTES: 'bhoomiverify_disputes_v1',
  DUPLICATES: 'bhoomiverify_duplicates_v1',
  AUDIT_LOGS: 'bhoomiverify_audit_v1',
  NOTIFICATIONS: 'bhoomiverify_notifications_v1',
  THRESHOLDS: 'bhoomiverify_thresholds_v1',
};

export const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Manual Verification Required',
    message: 'Record LR-2026-58421 (Ramesh Kumar, Rampura) has an area mismatch (2.45 vs 2.51 Acres).',
    timestamp: '10 mins ago',
    type: 'alert',
    read: false,
    linkTab: 'validation',
    recordId: 'LR-2026-58421'
  },
  {
    id: 'notif-2',
    title: 'Duplicate Survey Detected',
    message: 'High-risk duplicate detected for Survey 112/3 Kadakola (Anil Patil vs Sunil Patil).',
    timestamp: '45 mins ago',
    type: 'warning',
    read: false,
    linkTab: 'duplicates',
    recordId: 'LR-2026-58424'
  },
  {
    id: 'notif-3',
    title: 'Cadastral GIS Verification Complete',
    message: 'Record LR-2026-58425 (Vijay Kumar Reddy, Devanahalli) boundary polygons verified with 99% match.',
    timestamp: '2 hours ago',
    type: 'success',
    read: true,
    linkTab: 'gis',
    recordId: 'LR-2026-58425'
  },
  {
    id: 'notif-4',
    title: 'New Dispute Assigned',
    message: 'Senior Civil Court injunction OS No. 412/2023 assigned for survey 45/1 Mandya.',
    timestamp: 'Yesterday',
    type: 'info',
    read: true,
    linkTab: 'disputes',
    recordId: 'LR-2026-58423'
  }
];

class RecordService {
  private records: LandRecord[] = [];
  private disputes: DisputeRecord[] = [];
  private duplicates: DuplicateRecordPair[] = [];
  private auditLogs: AuditLog[] = [];
  private notifications: AppNotification[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const storedRecords = localStorage.getItem(STORAGE_KEYS.RECORDS);
      this.records = storedRecords ? JSON.parse(storedRecords) : sampleLandRecords;

      const storedDisputes = localStorage.getItem(STORAGE_KEYS.DISPUTES);
      this.disputes = storedDisputes ? JSON.parse(storedDisputes) : sampleDisputes;

      const storedDuplicates = localStorage.getItem(STORAGE_KEYS.DUPLICATES);
      this.duplicates = storedDuplicates ? JSON.parse(storedDuplicates) : sampleDuplicatePairs;

      const storedAudit = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      this.auditLogs = storedAudit ? JSON.parse(storedAudit) : sampleAuditLogs;

      const storedNotifs = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      this.notifications = storedNotifs ? JSON.parse(storedNotifs) : initialNotifications;
    } catch {
      this.records = sampleLandRecords;
      this.disputes = sampleDisputes;
      this.duplicates = sampleDuplicatePairs;
      this.auditLogs = sampleAuditLogs;
      this.notifications = initialNotifications;
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(this.records));
      localStorage.setItem(STORAGE_KEYS.DISPUTES, JSON.stringify(this.disputes));
      localStorage.setItem(STORAGE_KEYS.DUPLICATES, JSON.stringify(this.duplicates));
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(this.auditLogs));
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(this.notifications));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }
    this.notifyListeners();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(l => l());
  }

  // --- Records Operations ---
  public getRecords(): LandRecord[] {
    return [...this.records];
  }

  public getRecordById(recordId: string): LandRecord | undefined {
    return this.records.find(r => r.recordId === recordId);
  }

  public addRecord(record: LandRecord, officerName: string, officerId: string): LandRecord {
    this.records.unshift(record);
    this.addAuditLog({
      officerName,
      officerId,
      action: 'Record Digitized & Saved',
      recordId: record.recordId,
      module: 'Digitize Records',
      ipAddress: '10.24.110.82',
      status: 'Success',
      details: `New digitized record created for ${record.ownerName} (Survey: ${record.surveyNumber}, ${record.village}).`
    });
    this.saveToStorage();
    return record;
  }

  public updateRecord(updated: LandRecord, officerName: string, officerId: string): LandRecord {
    this.records = this.records.map(r => r.recordId === updated.recordId ? updated : r);
    this.addAuditLog({
      officerName,
      officerId,
      action: 'Record Details Updated',
      recordId: updated.recordId,
      module: 'Land Records',
      ipAddress: '10.24.110.82',
      status: 'Success',
      details: `Updated field values for Survey: ${updated.surveyNumber}.`
    });
    this.saveToStorage();
    return updated;
  }

  public updateRecordStatus(
    recordId: string, 
    status: RecordStatus, 
    remarks: string, 
    officerName: string, 
    officerId: string
  ): LandRecord | undefined {
    const record = this.getRecordById(recordId);
    if (!record) return undefined;

    const updated: LandRecord = {
      ...record,
      status,
      officerRemarks: remarks,
      verifiedBy: status === 'Verified' ? officerName : record.verifiedBy,
      verifiedAt: status === 'Verified' ? new Date().toISOString().replace('T', ' ').substring(0, 19) : record.verifiedAt,
      lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    this.records = this.records.map(r => r.recordId === recordId ? updated : r);

    this.addAuditLog({
      officerName,
      officerId,
      action: `Record ${status}`,
      recordId: recordId,
      module: 'Verification Queue',
      ipAddress: '10.24.110.82',
      status: status === 'Rejected' || status === 'Flagged' ? 'Warning' : 'Success',
      details: `Status changed to ${status}. Remarks: "${remarks}"`
    });

    this.saveToStorage();
    return updated;
  }

  // --- Disputes Operations ---
  public getDisputes(): DisputeRecord[] {
    return [...this.disputes];
  }

  public updateDisputeStatus(disputeId: string, status: DisputeRecord['status'], officerName: string, officerId: string) {
    this.disputes = this.disputes.map(d => d.disputeId === disputeId ? { ...d, status } : d);
    this.addAuditLog({
      officerName,
      officerId,
      action: 'Dispute Status Updated',
      module: 'Dispute Records',
      ipAddress: '10.24.110.82',
      status: 'Success',
      details: `Dispute ${disputeId} status updated to ${status}.`
    });
    this.saveToStorage();
  }

  // --- Duplicates Operations ---
  public getDuplicates(): DuplicateRecordPair[] {
    return [...this.duplicates];
  }

  public resolveDuplicate(pairId: string, resolution: DuplicateRecordPair['status'], officerName: string, officerId: string) {
    this.duplicates = this.duplicates.map(d => d.id === pairId ? { ...d, status: resolution } : d);
    this.addAuditLog({
      officerName,
      officerId,
      action: `Duplicate Pair ${resolution}`,
      module: 'Duplicate Detection',
      ipAddress: '10.24.110.82',
      status: 'Success',
      details: `Duplicate pair ${pairId} resolution set to ${resolution}.`
    });
    this.saveToStorage();
  }

  // --- Audit Logs ---
  public getAuditLogs(): AuditLog[] {
    return [...this.auditLogs];
  }

  public addAuditLog(log: Omit<AuditLog, 'logId' | 'timestamp'>) {
    const newLog: AuditLog = {
      ...log,
      logId: `AUD-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    this.auditLogs.unshift(newLog);
    if (this.auditLogs.length > 200) {
      this.auditLogs.pop();
    }
  }

  // --- Notifications ---
  public getNotifications(): AppNotification[] {
    return [...this.notifications];
  }

  public markNotificationAsRead(id: string) {
    this.notifications = this.notifications.map(n => n.id === id ? { ...n, read: true } : n);
    this.saveToStorage();
  }

  public markAllNotificationsAsRead() {
    this.notifications = this.notifications.map(n => ({ ...n, read: true }));
    this.saveToStorage();
  }

  public resetToSampleData() {
    this.records = sampleLandRecords;
    this.disputes = sampleDisputes;
    this.duplicates = sampleDuplicatePairs;
    this.auditLogs = sampleAuditLogs;
    this.notifications = initialNotifications;
    this.saveToStorage();
  }
}

export const recordService = new RecordService();
