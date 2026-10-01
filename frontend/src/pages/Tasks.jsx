import React, { useState, useEffect } from 'react';
import { CheckSquare, Clock, AlertTriangle, CheckCircle2, User, Search, Filter, Sparkles, ArrowRight } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import RiskBadge from '../components/common/RiskBadge';
import StatusBadge from '../components/common/StatusBadge';
import { tasksAPI } from '../api/client';

export const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All'); // 'All' | 'My Tasks' | 'At Risk' | 'Overdue' | 'Recently Completed'
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');

  useEffect(() => {
    loadTasks();
  }, [activeTab, search, department]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const res = await tasksAPI.list({
        filter: activeTab !== 'All' ? activeTab : undefined,
        department,
        search
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const res = await tasksAPI.update(taskId, {
        status: "Recently Completed",
        aiRisk: "Low"
      });
      setTasks(prev => prev.map(t => t.id === taskId ? res.data : t));
    } catch (err) {
      console.error(err);
    }
  };

  const tabs = ['All', 'My Tasks', 'At Risk', 'Overdue', 'Recently Completed'];
  const departments = ['All', 'Finance', 'Human Resources', 'Information Technology', 'Procurement', 'Operations'];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <PageHeader
        title="Tasks"
        subtitle="Manage and execute operational checkpoints across workflows."
      />

      {/* Tabs and Filter Bar */}
      <div className="space-y-4">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#E6E8EC]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab
                  ? 'border-b-2 border-[#2563EB] text-[#101828] bg-white'
                  : 'text-[#667085] hover:text-[#101828]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filter Controls */}
        <div className="bg-white border border-[#E6E8EC] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks, workflows, or owners..."
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

      </div>

      {/* Tasks Table */}
      <div className="bg-white border border-[#E6E8EC] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E6E8EC] bg-[#F7F8FA] text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
                <th className="py-4 px-6">Task</th>
                <th className="py-4 px-6">Workflow</th>
                <th className="py-4 px-6">Owner</th>
                <th className="py-4 px-6">Due</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">AI Risk</th>
                <th className="py-4 px-6">Recommended Action</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F4F7] text-sm">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-[#F9FAFB] transition-colors">
                  
                  {/* Task Title & ID */}
                  <td className="py-4 px-6 max-w-xs">
                    <span className="font-semibold text-[#101828] block">{task.title}</span>
                    <span className="text-xs font-mono text-[#98A2B3]">{task.id}</span>
                  </td>

                  {/* Workflow */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="text-xs font-medium text-[#2563EB] bg-[#EEF4FF] px-2 py-0.5 rounded-md">
                      {task.workflow}
                    </span>
                  </td>

                  {/* Owner */}
                  <td className="py-4 px-6 text-xs text-[#667085] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#98A2B3]" />
                      <span>{task.owner}</span>
                    </div>
                  </td>

                  {/* Due */}
                  <td className="py-4 px-6 text-xs whitespace-nowrap">
                    <span className={`font-medium ${
                      task.due.includes('Overdue') ? 'text-[#DC2626]' : 'text-[#667085]'
                    }`}>
                      {task.due}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <StatusBadge status={task.status} />
                  </td>

                  {/* AI Risk */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <RiskBadge risk={task.aiRisk} />
                  </td>

                  {/* Recommended Action */}
                  <td className="py-4 px-6 text-xs text-[#4F46E5] max-w-xs">
                    <span className="bg-[#F4F2FF] border border-[#DDD6FE] px-2 py-1 rounded-lg block truncate">
                      💡 {task.recommendedAction}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    {task.status !== 'Recently Completed' ? (
                      <button
                        onClick={() => handleCompleteTask(task.id)}
                        className="px-3 py-1.5 rounded-xl bg-[#14213D] text-white text-xs font-medium hover:bg-[#1E293B] transition-colors cursor-pointer"
                      >
                        Complete
                      </button>
                    ) : (
                      <span className="text-xs font-medium text-[#15803D] flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Done
                      </span>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Tasks;
