import React, { useState, useEffect } from 'react';
import { X, Bell, AlertTriangle, Clock, ShieldAlert, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { notificationsAPI } from '../../api/client';

export const NotificationDrawer = ({ isOpen, onClose, onSelectWorkflow }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const res = await notificationsAPI.list();
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id, e) => {
    e.stopPropagation();
    try {
      await notificationsAPI.markRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredNotifications = activeCategory === 'all'
    ? notifications
    : notifications.filter(n => {
        if (activeCategory === 'bottleneck') return n.type === 'bottleneck';
        if (activeCategory === 'sla') return n.type === 'warning' || n.type === 'escalation';
        if (activeCategory === 'recommendation') return n.type === 'opportunity';
        return true;
      });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#101828]/20 backdrop-blur-[2px] transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-[#E6E8EC] flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E6E8EC] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#F7F8FA] border border-[#E6E8EC] flex items-center justify-center text-[#101828]">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#101828]">
                    Operational Notifications
                  </h3>
                  <p className="text-xs text-[#667085]">
                    AI real-time telemetry alerts
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-[#667085] hover:text-[#101828] hover:bg-[#F7F8FA] rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'all', label: 'All' },
                { id: 'bottleneck', label: 'Bottlenecks' },
                { id: 'sla', label: 'SLA Risks' },
                { id: 'recommendation', label: 'AI Actions' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-[#111827] text-white shadow-xs'
                      : 'bg-[#F4F5F8] text-[#4B5563] hover:text-[#111827]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            {filteredNotifications.map((n) => {
              const isBottleneck = n.type === 'bottleneck';
              const isWarning = n.type === 'warning';
              const isEscalation = n.type === 'escalation';
              const isOpportunity = n.type === 'opportunity';

              return (
                <div
                  key={n.id}
                  onClick={() => {
                    if (n.workflowId && onSelectWorkflow) {
                      onSelectWorkflow({ id: n.workflowId, name: n.title });
                      onClose();
                    }
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative group ${
                    !n.read
                      ? 'bg-[#FFFFFF] border-[#E6E8EC] shadow-sm hover:border-[#D0D5DD]'
                      : 'bg-[#F9FAFB] border-[#F2F4F7] opacity-80'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isBottleneck
                        ? 'bg-[#FFF1F2] text-[#DC2626] border border-[#FECDCA]'
                        : isWarning
                        ? 'bg-[#FFFAEB] text-[#B45309] border border-[#FEDF89]'
                        : isEscalation
                        ? 'bg-[#FFF1F2] text-[#B42318] border border-[#FECDCA]'
                        : 'bg-[#F4F2FF] text-[#6366F1] border border-[#DDD6FE]'
                    }`}>
                      {isBottleneck ? (
                        <AlertTriangle className="w-4 h-4" />
                      ) : isWarning ? (
                        <Clock className="w-4 h-4" />
                      ) : isEscalation ? (
                        <ShieldAlert className="w-4 h-4" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                    </div>

                    <div className="flex-1 pr-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold text-[#101828]">
                          {n.title}
                        </h4>
                        <span className="text-[11px] text-[#98A2B3]">
                          {n.time}
                        </span>
                      </div>
                      <p className="text-xs text-[#667085] mt-1 font-normal leading-relaxed">
                        {n.message}
                      </p>
                    </div>

                    {!n.read && (
                      <button
                        onClick={(e) => handleMarkRead(n.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-[#98A2B3] hover:text-[#101828] transition-opacity"
                        title="Mark as read"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#E6E8EC] bg-[#F7F8FA] text-center">
            <span className="text-xs text-[#667085]">
              AI Engine continuously audits SLAs every 60s
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NotificationDrawer;
