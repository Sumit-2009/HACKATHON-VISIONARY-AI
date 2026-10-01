import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, LayoutGrid, List, Clock, User, ArrowRight, Sparkles } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import WorkflowTable from '../components/workflows/WorkflowTable';
import RiskBadge from '../components/common/RiskBadge';
import StatusBadge from '../components/common/StatusBadge';
import { useShell } from '../components/layout/AppShell';
import { workflowsAPI } from '../../src/api/client';

export const Workflows = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [risk, setRisk] = useState('All');
  const [status, setStatus] = useState('All');

  const { openWorkflowDrawer } = useShell();

  useEffect(() => {
    loadWorkflows();
  }, [department, risk, status, search]);

  const loadWorkflows = async () => {
    setLoading(true);
    try {
      const res = await workflowsAPI.list({ department, risk, status, search });
      setWorkflows(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const departments = ['All', 'Finance', 'Human Resources', 'Information Technology', 'Procurement', 'Operations'];
  const risks = ['All', 'Low', 'Medium', 'High'];
  const statuses = ['All', 'At Risk', 'Completed'];

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <PageHeader
        title="Workflows"
        subtitle="Monitor every operational process across the organization."
        actions={
          <Link
            to="/workflows/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14213D] text-white text-sm font-medium hover:bg-[#1E293B] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create Workflow</span>
          </Link>
        }
      />

      {/* Filter and Control Bar */}
      <div className="bg-white border border-[#E6E8EC] rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search workflows, owners, IDs..."
            className="w-full pl-10 pr-4 py-2 bg-[#F7F8FA] border border-[#E6E8EC] rounded-xl text-sm text-[#101828] placeholder-[#98A2B3] outline-none focus:border-[#2563EB] transition-colors"
          />
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Department Filter */}
          <div className="flex items-center gap-1.5 text-xs text-[#667085]">
            <span className="font-medium hidden sm:inline">Dept:</span>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="bg-[#F7F8FA] border border-[#E6E8EC] rounded-xl px-2.5 py-1.5 text-xs text-[#101828] font-medium outline-none cursor-pointer"
            >
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Risk Filter */}
          <div className="flex items-center gap-1.5 text-xs text-[#667085]">
            <span className="font-medium hidden sm:inline">Risk:</span>
            <select
              value={risk}
              onChange={(e) => setRisk(e.target.value)}
              className="bg-[#F7F8FA] border border-[#E6E8EC] rounded-xl px-2.5 py-1.5 text-xs text-[#101828] font-medium outline-none cursor-pointer"
            >
              {risks.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-[#F7F8FA] border border-[#E6E8EC] rounded-xl">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-[#101828] shadow-sm' : 'text-[#667085]'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-[#101828] shadow-sm' : 'text-[#667085]'
              }`}
              title="Grid Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Main Content: Table or Grid */}
      {viewMode === 'table' ? (
        <WorkflowTable
          workflows={workflows}
          onSelectWorkflow={openWorkflowDrawer}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((wf) => (
            <div
              key={wf.id}
              onClick={() => openWorkflowDrawer(wf)}
              className="editorial-card p-6 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-medium text-[#2563EB] bg-[#EEF4FF] px-2 py-0.5 rounded-md">
                    {wf.id}
                  </span>
                  <RiskBadge risk={wf.riskLevel} />
                </div>

                <h3 className="text-lg font-semibold text-[#101828] group-hover:text-[#2563EB] transition-colors leading-snug">
                  {wf.name}
                </h3>
                
                <p className="text-xs text-[#667085] mt-1">
                  {wf.department} • Stage: <span className="font-medium text-[#101828]">{wf.currentStage}</span>
                </p>

                {wf.aiAnalysis?.currentBottleneck && wf.aiAnalysis?.currentBottleneck !== 'None' && (
                  <div className="mt-3 p-2.5 rounded-xl bg-[#F4F2FF] border border-[#DDD6FE] text-xs text-[#4F46E5] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Bottleneck: {wf.aiAnalysis.currentBottleneck}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#F2F4F7]">
                <div className="flex items-center justify-between text-xs text-[#667085] mb-2">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#98A2B3]" />
                    {wf.owner}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#98A2B3]" />
                    {wf.slaDeadline}
                  </span>
                </div>

                <div className="w-full h-1.5 bg-[#F2F4F7] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2563EB] rounded-full"
                    style={{ width: `${wf.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Workflows;
