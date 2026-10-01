import React, { useState, useEffect } from 'react';
import { Search, X, GitBranch, CheckSquare, Users, FileText, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchAPI } from '../../api/client';

export const GlobalSearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchAPI.query(query);
        setResults(res.data);
      } catch (err) {
        console.error('Search error', err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (path) => {
    onClose();
    navigate(path);
  };

  const hasAnyResults = results && (
    (results.workflows?.length || 0) +
    (results.tasks?.length || 0) +
    (results.employees?.length || 0) +
    (results.approvals?.length || 0) +
    (results.documents?.length || 0) +
    (results.aiInsights?.length || 0) > 0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 md:p-12">
      <div
        className="fixed inset-0 bg-[#101828]/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative mx-auto max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E6E8EC] overflow-hidden my-8">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-[#E6E8EC]">
          <Search className="w-5 h-5 text-[#98A2B3] shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search workflows, tasks, employees, approvals, documents..."
            className="w-full text-base text-[#101828] placeholder-[#98A2B3] bg-transparent outline-none font-normal"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#98A2B3] hover:text-[#101828] mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono text-[#98A2B3] bg-[#F7F8FA] border border-[#E6E8EC] rounded">
            ESC
          </kbd>
        </div>

        {/* Search Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 md:p-6 space-y-6">
          {loading && (
            <div className="text-center py-8 text-[#98A2B3] text-sm">
              Searching enterprise graph...
            </div>
          )}

          {!query && (
            <div className="py-6 px-2 text-center">
              <span className="text-xs uppercase tracking-wider text-[#98A2B3] font-semibold block mb-3">
                Quick Navigation
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => handleSelect('/dashboard')}
                  className="px-3 py-1.5 rounded-xl bg-[#F7F8FA] text-xs font-medium text-[#101828] hover:bg-[#EEF4FF] hover:text-[#2563EB] transition-colors"
                >
                  Command Center
                </button>
                <button
                  onClick={() => handleSelect('/workflows/WF-2045')}
                  className="px-3 py-1.5 rounded-xl bg-[#F7F8FA] text-xs font-medium text-[#101828] hover:bg-[#EEF4FF] hover:text-[#2563EB] transition-colors"
                >
                  Finance Approval (WF-2045)
                </button>
                <button
                  onClick={() => handleSelect('/copilot')}
                  className="px-3 py-1.5 rounded-xl bg-[#F4F2FF] text-xs font-medium text-[#4F46E5] hover:bg-[#EDE9FE] transition-colors"
                >
                  AI Copilot
                </button>
                <button
                  onClick={() => handleSelect('/automation')}
                  className="px-3 py-1.5 rounded-xl bg-[#F7F8FA] text-xs font-medium text-[#101828] hover:bg-[#EEF4FF] hover:text-[#2563EB] transition-colors"
                >
                  Automation Center
                </button>
              </div>
            </div>
          )}

          {query && !loading && !hasAnyResults && (
            <div className="text-center py-8 text-sm text-[#667085]">
              No results found for "{query}". Try searching for <span className="font-semibold text-[#101828]">Finance</span>, <span className="font-semibold text-[#101828]">Onboarding</span>, or <span className="font-semibold text-[#101828]">Priya</span>.
            </div>
          )}

          {hasAnyResults && (
            <div className="space-y-6">
              
              {/* AI Insights */}
              {results.aiInsights?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4F46E5] mb-2 px-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Insights</span>
                  </div>
                  <div className="space-y-1">
                    {results.aiInsights.map((insight, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelect(insight.route)}
                        className="p-3 rounded-2xl bg-[#F4F2FF] border border-[#DDD6FE] hover:border-[#C4B5FD] cursor-pointer transition-all flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs font-semibold text-[#101828]">{insight.title}</p>
                          <p className="text-[11px] text-[#667085] mt-0.5">{insight.snippet}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#4F46E5]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Workflows */}
              {results.workflows?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#667085] mb-2 px-2">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>Workflows</span>
                  </div>
                  <div className="space-y-1">
                    {results.workflows.map((wf) => (
                      <div
                        key={wf.id}
                        onClick={() => handleSelect(`/workflows/${wf.id}`)}
                        className="p-3 rounded-2xl hover:bg-[#F7F8FA] cursor-pointer transition-colors flex items-center justify-between group"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-[#2563EB]">{wf.id}</span>
                            <span className="text-sm font-medium text-[#101828]">{wf.name}</span>
                          </div>
                          <p className="text-xs text-[#667085] mt-0.5">{wf.department} • Stage: {wf.currentStage}</p>
                        </div>
                        <span className="text-xs text-[#98A2B3] group-hover:text-[#101828] flex items-center gap-1">
                          View <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasks */}
              {results.tasks?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#667085] mb-2 px-2">
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>Tasks</span>
                  </div>
                  <div className="space-y-1">
                    {results.tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => handleSelect('/tasks')}
                        className="p-3 rounded-2xl hover:bg-[#F7F8FA] cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium text-[#101828]">{task.title}</p>
                          <p className="text-xs text-[#667085] mt-0.5">{task.workflow} • {task.owner}</p>
                        </div>
                        <span className="text-xs font-medium text-[#DC2626] bg-[#FFF1F2] px-2 py-0.5 rounded-full">
                          {task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Employees */}
              {results.employees?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#667085] mb-2 px-2">
                    <Users className="w-3.5 h-3.5" />
                    <span>Team Members</span>
                  </div>
                  <div className="space-y-1">
                    {results.employees.map((emp) => (
                      <div
                        key={emp.id}
                        onClick={() => handleSelect('/team')}
                        className="p-3 rounded-2xl hover:bg-[#F7F8FA] cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#EEF4FF] text-[#2563EB] flex items-center justify-center text-xs font-semibold">
                            {emp.avatarInitials}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#101828]">{emp.name}</p>
                            <p className="text-xs text-[#667085]">{emp.role} • {emp.department}</p>
                          </div>
                        </div>
                        <span className="text-xs text-[#667085]">Workload: {emp.workload}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F7F8FA] border-t border-[#E6E8EC] px-6 text-[11px] text-[#98A2B3] flex items-center justify-between">
          <span>Search organizational workflows, telemetry, and operations</span>
          <span className="hidden sm:inline">Use ↑↓ to navigate, ENTER to select</span>
        </div>

      </div>
    </div>
  );
};

export default GlobalSearchModal;
