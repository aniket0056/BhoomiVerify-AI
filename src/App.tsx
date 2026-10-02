import React from 'react';
import { useApp } from './context/AppContext';
import { GovHeader } from './components/common/GovHeader';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';

// Pages
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { DigitizePage } from './pages/DigitizePage';
import { LandRecordsPage } from './pages/LandRecordsPage';
import { ValidationPage } from './pages/ValidationPage';
import { VerificationPage } from './pages/VerificationPage';
import { MapGisPage } from './pages/MapGisPage';
import { DuplicateDetectionPage } from './pages/DuplicateDetectionPage';
import { DisputeRecordsPage } from './pages/DisputeRecordsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { ReportsPage } from './pages/ReportsPage';
import { UsersPage } from './pages/UsersPage';
import { SettingsPage } from './pages/SettingsPage';

export function AppContent() {
  const { currentUser, activeTab } = useApp();

  if (!currentUser) {
    return <LoginPage />;
  }

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'digitize':
        return <DigitizePage />;
      case 'records':
        return <LandRecordsPage />;
      case 'validation':
        return <ValidationPage />;
      case 'verification':
        return <VerificationPage />;
      case 'gis':
        return <MapGisPage />;
      case 'duplicates':
        return <DuplicateDetectionPage />;
      case 'disputes':
        return <DisputeRecordsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'audit':
        return <AuditLogsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'users':
        return <UsersPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Official Government Top Header */}
      <GovHeader />

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex min-h-0">
        {/* Dark Navy Sidebar */}
        <Sidebar />

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Navbar />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
            {renderActivePage()}
          </main>

          {/* Bottom Compliance & Watermark Strip */}
          <footer className="py-2.5 px-6 bg-white border-t border-slate-200 text-slate-500 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-slate-700">BhoomiVerify AI</span>
              <span>•</span>
              <span>Ministry of Rural Development, Government of India</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-400">
              <span>NIC Node: Karnataka-DC-04</span>
              <span>•</span>
              <span className="text-emerald-600 font-medium">Cadastral Database Active</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
