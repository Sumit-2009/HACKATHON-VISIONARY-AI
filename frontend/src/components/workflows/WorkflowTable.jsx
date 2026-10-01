import React from 'react';
import { Eye, ArrowUpRight, Clock, User, ChevronRight } from 'lucide-react';
import RiskBadge from '../common/RiskBadge';
import StatusBadge from '../common/StatusBadge';

export const WorkflowTable = ({ workflows = [], onSelectWorkflow }) => {
  if (!workflows || workflows.length === 0) {
    return (
      <div className="text-center py-12 text-[#98A2B3] text-sm bg-white rounded-2xl border border-[#E6E8EC]">
        No active workflows found matching current criteria.
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E6E8EC] rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E6E8EC] bg-[#F7F8FA] text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
              <th className="py-3.5 px-5">Workflow ID</th>
              <th className="py-3.5 px-5">Workflow</th>
              <th className="py-3.5 px-5">Department</th>
              <th className="py-3.5 px-5">Current Stage</th>
              <th className="py-3.5 px-5">Owner</th>
              <th className="py-3.5 px-5">Progress</th>
              <th className="py-3.5 px-5">SLA</th>
              <th className="py-3.5 px-5">AI Risk</th>
              <th className="py-3.5 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F4F7] text-sm">
            {workflows.map((wf) => (
              <tr
                key={wf.id}
                onClick={() => onSelectWorkflow && onSelectWorkflow(wf)}
                className="hover:bg-[#F9FAFB] cursor-pointer transition-colors group"
              >
                {/* Workflow ID */}
                <td className="py-4 px-5 font-mono text-xs text-[#2563EB] font-medium whitespace-nowrap">
                  {wf.id}
                </td>

                {/* Workflow Name */}
                <td className="py-4 px-5 font-medium text-[#101828] max-w-[200px] truncate">
                  {wf.name}
                </td>

                {/* Department */}
                <td className="py-4 px-5 text-[#667085] whitespace-nowrap">
                  {wf.department}
                </td>

                {/* Current Stage */}
                <td className="py-4 px-5 text-[#344054] font-medium whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    {wf.stages?.find(s => s.name === wf.currentStage)?.status === 'bottleneck' && (
                      <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
                    )}
                    <span>{wf.currentStage}</span>
                  </div>
                </td>

                {/* Owner */}
                <td className="py-4 px-5 text-[#667085] whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-[#EEF4FF] text-[#2563EB] flex items-center justify-center text-[10px] font-semibold">
                      {wf.owner ? wf.owner.split(' ').map(n => n[0]).join('') : 'U'}
                    </div>
                    <span>{wf.owner}</span>
                  </div>
                </td>

                {/* Progress */}
                <td className="py-4 px-5 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-[#F2F4F7] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          wf.riskLevel === 'High' ? 'bg-[#DC2626]' : 'bg-[#2563EB]'
                        }`}
                        style={{ width: `${wf.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-[#667085]">{wf.progress}%</span>
                  </div>
                </td>

                {/* SLA */}
                <td className="py-4 px-5 text-xs text-[#667085] whitespace-nowrap">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#98A2B3]" />
                    {wf.slaDeadline}
                  </span>
                </td>

                {/* AI Risk */}
                <td className="py-4 px-5 whitespace-nowrap">
                  <RiskBadge risk={wf.riskLevel} />
                </td>

                {/* Actions */}
                <td className="py-4 px-5 text-right whitespace-nowrap">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectWorkflow && onSelectWorkflow(wf);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-[#101828] bg-[#F7F8FA] border border-[#E6E8EC] group-hover:bg-[#14213D] group-hover:text-white transition-colors"
                  >
                    <span>Inspect</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkflowTable;
