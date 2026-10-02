import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LandRecord, DisputeRecord, DuplicateRecordPair, AuditLog, AppNotification, RecordStatus } from '../types';
import { sampleUsers } from '../data/sampleUsers';
import { recordService } from '../services/recordService';
import { translations, SupportedLanguage } from '../data/translations';

export type NavTab = 
  | 'dashboard'
  | 'digitize'
  | 'records'
  | 'validation'
  | 'verification'
  | 'gis'
  | 'duplicates'
  | 'disputes'
  | 'analytics'
  | 'audit'
  | 'reports'
  | 'users'
  | 'settings';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  currentLanguage: SupportedLanguage;
  setCurrentLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Data lists
  records: LandRecord[];
  disputes: DisputeRecord[];
  duplicates: DuplicateRecordPair[];
  auditLogs: AuditLog[];
  notifications: AppNotification[];

  // Active Modals & Selected items
  selectedRecordForDetail: LandRecord | null;
  setSelectedRecordForDetail: (record: LandRecord | null) => void;
  selectedRecordForReview: LandRecord | null;
  setSelectedRecordForReview: (record: LandRecord | null) => void;
  selectedRecordForValidation: LandRecord | null;
  setSelectedRecordForValidation: (record: LandRecord | null) => void;
  selectedDuplicatePair: DuplicateRecordPair | null;
  setSelectedDuplicatePair: (pair: DuplicateRecordPair | null) => void;
  selectedDispute: DisputeRecord | null;
  setSelectedDispute: (dispute: DisputeRecord | null) => void;

  // Actions
  login: (email: string, role?: string) => boolean;
  logout: () => void;
  switchRole: (role: User['role']) => void;
  updateRecordStatus: (recordId: string, status: RecordStatus, remarks: string) => void;
  addNewRecord: (record: LandRecord) => void;
  updateRecord: (record: LandRecord) => void;
  resolveDuplicatePair: (pairId: string, resolution: DuplicateRecordPair['status']) => void;
  updateDisputeStatus: (disputeId: string, status: DisputeRecord['status']) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bhoomiverify_auth_user');
    return saved ? JSON.parse(saved) : sampleUsers[0]; // Default to Officer
  });

  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Districts');
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [records, setRecords] = useState<LandRecord[]>(() => recordService.getRecords());
  const [disputes, setDisputes] = useState<DisputeRecord[]>(() => recordService.getDisputes());
  const [duplicates, setDuplicates] = useState<DuplicateRecordPair[]>(() => recordService.getDuplicates());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => recordService.getAuditLogs());
  const [notifications, setNotifications] = useState<AppNotification[]>(() => recordService.getNotifications());

  const [selectedRecordForDetail, setSelectedRecordForDetail] = useState<LandRecord | null>(null);
  const [selectedRecordForReview, setSelectedRecordForReview] = useState<LandRecord | null>(null);
  const [selectedRecordForValidation, setSelectedRecordForValidation] = useState<LandRecord | null>(null);
  const [selectedDuplicatePair, setSelectedDuplicatePair] = useState<DuplicateRecordPair | null>(null);
  const [selectedDispute, setSelectedDispute] = useState<DisputeRecord | null>(null);

  useEffect(() => {
    const unsubscribe = recordService.subscribe(() => {
      setRecords(recordService.getRecords());
      setDisputes(recordService.getDisputes());
      setDuplicates(recordService.getDuplicates());
      setAuditLogs(recordService.getAuditLogs());
      setNotifications(recordService.getNotifications());
    });
    return unsubscribe;
  }, []);

  const t = (key: string): string => {
    const langDict = translations[currentLanguage] || translations.en;
    return langDict[key] || translations.en[key] || key;
  };

  const login = (email: string, role?: string) => {
    const matched = sampleUsers.find(u => u.email.toLowerCase() === email.toLowerCase()) 
      || (role ? sampleUsers.find(u => u.role === role) : sampleUsers[0]);
    if (matched) {
      setCurrentUser(matched);
      localStorage.setItem('bhoomiverify_auth_user', JSON.stringify(matched));
      recordService.addAuditLog({
        officerName: matched.name,
        officerId: matched.employeeId,
        action: 'Officer Secure Login',
        module: 'Authentication & Session',
        ipAddress: '10.24.110.82',
        status: 'Success',
        details: `Authenticated as ${matched.role} (${matched.district}).`
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    if (currentUser) {
      recordService.addAuditLog({
        officerName: currentUser.name,
        officerId: currentUser.employeeId,
        action: 'Officer Logout',
        module: 'Authentication & Session',
        ipAddress: '10.24.110.82',
        status: 'Success',
        details: 'Session terminated gracefully.'
      });
    }
    setCurrentUser(null);
    localStorage.removeItem('bhoomiverify_auth_user');
  };

  const switchRole = (role: User['role']) => {
    const targetUser = sampleUsers.find(u => u.role === role) || sampleUsers[0];
    setCurrentUser(targetUser);
    localStorage.setItem('bhoomiverify_auth_user', JSON.stringify(targetUser));
    recordService.addAuditLog({
      officerName: targetUser.name,
      officerId: targetUser.employeeId,
      action: 'Role Switched',
      module: 'Session Management',
      ipAddress: '10.24.110.82',
      status: 'Success',
      details: `Switched active role to ${targetUser.role} (${targetUser.name}).`
    });
  };

  const updateRecordStatus = (recordId: string, status: RecordStatus, remarks: string) => {
    const officerName = currentUser?.name || 'Authorized Officer';
    const officerId = currentUser?.employeeId || 'EMP-GOV-999';
    recordService.updateRecordStatus(recordId, status, remarks, officerName, officerId);
  };

  const addNewRecord = (record: LandRecord) => {
    const officerName = currentUser?.name || 'Authorized Officer';
    const officerId = currentUser?.employeeId || 'EMP-GOV-999';
    recordService.addRecord(record, officerName, officerId);
  };

  const updateRecord = (record: LandRecord) => {
    const officerName = currentUser?.name || 'Authorized Officer';
    const officerId = currentUser?.employeeId || 'EMP-GOV-999';
    recordService.updateRecord(record, officerName, officerId);
  };

  const resolveDuplicatePair = (pairId: string, resolution: DuplicateRecordPair['status']) => {
    const officerName = currentUser?.name || 'Authorized Officer';
    const officerId = currentUser?.employeeId || 'EMP-GOV-999';
    recordService.resolveDuplicate(pairId, resolution, officerName, officerId);
  };

  const updateDisputeStatus = (disputeId: string, status: DisputeRecord['status']) => {
    const officerName = currentUser?.name || 'Authorized Officer';
    const officerId = currentUser?.employeeId || 'EMP-GOV-999';
    recordService.updateDisputeStatus(disputeId, status, officerName, officerId);
  };

  const markNotificationRead = (id: string) => {
    recordService.markNotificationAsRead(id);
  };

  const markAllNotificationsRead = () => {
    recordService.markAllNotificationsAsRead();
  };

  const resetAllData = () => {
    recordService.resetToSampleData();
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        activeTab,
        setActiveTab,
        selectedDistrict,
        setSelectedDistrict,
        currentLanguage,
        setCurrentLanguage,
        t,
        searchQuery,
        setSearchQuery,
        records,
        disputes,
        duplicates,
        auditLogs,
        notifications,
        selectedRecordForDetail,
        setSelectedRecordForDetail,
        selectedRecordForReview,
        setSelectedRecordForReview,
        selectedRecordForValidation,
        setSelectedRecordForValidation,
        selectedDuplicatePair,
        setSelectedDuplicatePair,
        selectedDispute,
        setSelectedDispute,
        login,
        logout,
        switchRole,
        updateRecordStatus,
        addNewRecord,
        updateRecord,
        resolveDuplicatePair,
        updateDisputeStatus,
        markNotificationRead,
        markAllNotificationsRead,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
