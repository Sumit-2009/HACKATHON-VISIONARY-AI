import React, { useState, useEffect } from 'react';
import { Users, AlertTriangle, ShieldCheck, Mail, GitBranch, CheckSquare, Search } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import RiskBadge from '../components/common/RiskBadge';
import { teamAPI } from '../api/client';

export const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');

  useEffect(() => {
    loadTeam();
  }, [search, department]);

  const loadTeam = async () => {
    setLoading(true);
    try {
      const res = await teamAPI.list({ search, department });
      setTeam(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const departments = ['All', 'Finance', 'Human Resources', 'Information Technology', 'Procurement', 'Operations'];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <PageHeader
        title="Operational Workload & Team"
        subtitle="Monitor human capacity, workload saturation, and SLA risk distribution across teams."
      />

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E6E8EC] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search team members by name or role..."
            className="w-full pl-10 pr-4 py-2 bg-[#F7F8FA] border border-[#E6E8EC] rounded-xl text-sm text-[#101828] placeholder-[#98A2B3] outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#667085] font-medium">Department:</span>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="bg-[#F7F8FA] border border-[#E6E8EC] rounded-xl px-3 py-1.5 font-medium outline-none cursor-pointer"
          >
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Team Operational Workload Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => {
          const isHighWorkload = member.workload >= 90;
          return (
            <div
              key={member.id}
              className="editorial-card p-6 md:p-8 flex flex-col justify-between"
            >
              <div>
                {/* Header Profile */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#14213D] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                      {member.avatarInitials}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#101828]">
                        {member.name}
                      </h3>
                      <p className="text-xs text-[#667085]">{member.role}</p>
                    </div>
                  </div>
                  <RiskBadge risk={member.slaRisk} />
                </div>

                <div className="text-xs text-[#98A2B3] mb-4">
                  <span>{member.department}</span> • <span>{member.email}</span>
                </div>

                {/* Workload Capacity Bar */}
                <div className="space-y-1.5 my-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#667085] font-medium">Workload Saturation</span>
                    <span className={`font-semibold ${isHighWorkload ? 'text-[#DC2626]' : 'text-[#101828]'}`}>
                      {member.workload}% {isHighWorkload && '⚠️ Near Cap'}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#F2F4F7] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isHighWorkload ? 'bg-[#DC2626]' : 'bg-[#2563EB]'
                      }`}
                      style={{ width: `${member.workload}%` }}
                    />
                  </div>
                </div>

                {/* Telemetry Stats */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#F2F4F7] text-xs">
                  <div className="p-3 bg-[#F7F8FA] rounded-xl border border-[#E6E8EC]">
                    <span className="text-[#98A2B3] block mb-1">Active Workflows</span>
                    <span className="text-lg font-semibold text-[#101828] flex items-center gap-1.5">
                      <GitBranch className="w-4 h-4 text-[#2563EB]" />
                      {member.activeWorkflows}
                    </span>
                  </div>
                  <div className="p-3 bg-[#F7F8FA] rounded-xl border border-[#E6E8EC]">
                    <span className="text-[#98A2B3] block mb-1">Pending Tasks</span>
                    <span className="text-lg font-semibold text-[#101828] flex items-center gap-1.5">
                      <CheckSquare className="w-4 h-4 text-[#B45309]" />
                      {member.pendingTasks}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-6 pt-4 border-t border-[#F2F4F7] text-[11px] text-[#667085]">
                <span className="font-semibold text-[#101828]">Recent Activity:</span> {member.recentActivity}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Team;
