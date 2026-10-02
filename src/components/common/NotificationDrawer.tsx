import React from 'react';
import { Bell, CheckCheck, AlertCircle, AlertTriangle, CheckCircle2, Info, ArrowRight } from 'lucide-react';
import { useApp, NavTab } from '../../context/AppContext';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead, setActiveTab, setSelectedRecordForDetail, records } = useApp();

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleActionClick = (tab?: string, recordId?: string) => {
    if (tab) setActiveTab(tab as NavTab);
    if (recordId) {
      const rec = records.find(r => r.recordId === recordId);
      if (rec) setSelectedRecordForDetail(rec);
    }
    onClose();
  };

  return (
    <div className="absolute right-0 top-14 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="w-4 h-4 text-blue-600" />
          <h4 className="text-sm font-bold text-slate-900">Notifications</h4>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
              {unreadCount} new
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No notifications at this time.
          </div>
        ) : (
          notifications.map((notif) => {
            const getIcon = () => {
              switch (notif.type) {
                case 'alert':
                  return <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5" />;
                case 'warning':
                  return <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />;
                case 'success':
                  return <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" />;
                case 'info':
                default:
                  return <Info className="w-4 h-4 text-blue-600 mt-0.5" />;
              }
            };

            return (
              <div
                key={notif.id}
                onClick={() => markNotificationRead(notif.id)}
                className={`p-3.5 transition-colors hover:bg-slate-50 flex gap-3 ${
                  !notif.read ? 'bg-blue-50/40' : ''
                }`}
              >
                <div className="shrink-0">{getIcon()}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className={`text-xs font-semibold ${!notif.read ? 'text-slate-900' : 'text-slate-700'}`}>
                      {notif.title}
                    </p>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-2">{notif.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{notif.message}</p>

                  {notif.linkTab && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markNotificationRead(notif.id);
                        handleActionClick(notif.linkTab, notif.recordId);
                      }}
                      className="mt-2 inline-flex items-center text-[11px] font-semibold text-blue-600 hover:text-blue-800"
                    >
                      <span>Take Action</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
        <button
          onClick={() => {
            setActiveTab('audit');
            onClose();
          }}
          className="text-xs text-slate-600 hover:text-slate-900 font-medium"
        >
          View Complete System Audit Trail
        </button>
      </div>
    </div>
  );
};
