import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { TrendingUp, Clock, CheckCircle2, AlertTriangle, Sparkles, Cpu } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import MetricCard from '../components/common/MetricCard';
import { analyticsAPI } from '../api/client';

export const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const res = await analyticsAPI.get();
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const metrics = data?.metrics || {
    workflowCompletionRate: { value: "91.4%", change: "+3.2%", label: "Workflow Completion Rate" },
    averageWorkflowTime: { value: "4.8 hrs", change: "-18.5%", label: "Average Workflow Time" },
    SLACompliance: { value: "93.8%", change: "+5.1%", label: "SLA Compliance" },
    bottleneckFrequency: { value: "13.2%", change: "-22.4%", label: "Bottleneck Frequency" },
    automationImpact: { value: "3,840 hrs", change: "+24.0%", label: "Automation Impact" },
    aiRecommendationAdoption: { value: "87.2%", change: "+9.6%", label: "AI Recommendation Adoption" }
  };

  const timeSeries = data?.timeSeriesPerformance || [
    { day: "Mon", completed: 42, delayed: 6, atRisk: 11 },
    { day: "Tue", completed: 58, delayed: 8, atRisk: 9 },
    { day: "Wed", completed: 64, delayed: 5, atRisk: 14 },
    { day: "Thu", completed: 78, delayed: 7, atRisk: 12 },
    { day: "Fri", completed: 86, delayed: 4, atRisk: 8 },
    { day: "Sat", completed: 34, delayed: 2, atRisk: 3 },
    { day: "Sun", completed: 28, delayed: 1, atRisk: 2 }
  ];

  const deptBottlenecks = data?.departmentBottlenecks || [
    { department: "Finance", delayHours: 8.4, bottlenecks: 7 },
    { department: "Human Res.", delayHours: 6.2, bottlenecks: 4 },
    { department: "Info Tech", delayHours: 5.8, bottlenecks: 5 },
    { department: "Procurement", delayHours: 4.1, bottlenecks: 2 },
    { department: "Operations", delayHours: 2.8, bottlenecks: 1 }
  ];

  const slaRiskDistribution = data?.slaRiskDistribution || [
    { name: "Low Risk", count: 82, percentage: 64, color: "#15803D" },
    { name: "Medium Risk", count: 29, percentage: 23, color: "#B45309" },
    { name: "High Risk", count: 17, percentage: 13, color: "#DC2626" }
  ];

  const automationSavings = data?.automationSavings || [
    { month: "May", manualHours: 4200, automatedHours: 1900 },
    { month: "Jun", manualHours: 3900, automatedHours: 2400 },
    { month: "Jul", manualHours: 3600, automatedHours: 2900 },
    { month: "Aug", manualHours: 3200, automatedHours: 3400 },
    { month: "Sep", manualHours: 2800, automatedHours: 3840 }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Page Header */}
      <PageHeader
        title="Operational Intelligence"
        subtitle="Understand how your organization is performing."
      />

      {/* Primary Metrics Grid (Spacious, 6 items) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          label="Workflow Completion Rate"
          value={metrics.workflowCompletionRate?.value || "91.4%"}
          delta={metrics.workflowCompletionRate?.change || "+3.2%"}
          isPositiveGood={true}
          icon={CheckCircle2}
        />
        <MetricCard
          label="Average Workflow Time"
          value={metrics.averageWorkflowTime?.value || "4.8 hrs"}
          delta={metrics.averageWorkflowTime?.change || "-18.5%"}
          isPositiveGood={false}
          icon={Clock}
        />
        <MetricCard
          label="SLA Compliance"
          value={metrics.slaCompliance?.value || "93.8%"}
          delta={metrics.slaCompliance?.change || "+5.1%"}
          isPositiveGood={true}
          icon={TrendingUp}
        />
        <MetricCard
          label="Bottleneck Frequency"
          value={metrics.bottleneckFrequency?.value || "13.2%"}
          delta={metrics.bottleneckFrequency?.change || "-22.4%"}
          isPositiveGood={false}
          icon={AlertTriangle}
        />
        <MetricCard
          label="Automation Impact (Monthly)"
          value={metrics.automationImpact?.value || "3,840 hrs"}
          delta={metrics.automationImpact?.change || "+24.0%"}
          isPositiveGood={true}
          icon={Cpu}
        />
        <MetricCard
          label="AI Recommendation Adoption"
          value={metrics.aiRecommendationAdoption?.value || "87.2%"}
          delta={metrics.aiRecommendationAdoption?.change || "+9.6%"}
          isPositiveGood={true}
          icon={Sparkles}
        />
      </section>

      {/* Chart Section 1: Workflow Performance & Department Bottlenecks */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Workflow Performance Area Chart */}
        <div className="lg:col-span-7 bg-white border border-[#E6E8EC] rounded-3xl p-6 md:p-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#101828]">
              Workflow Performance
            </h3>
            <p className="text-xs text-[#667085] mt-1">
              Throughput comparison over current operational cycle
            </p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAnalytics" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F2F4F7" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#98A2B3', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#98A2B3', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E6E8EC',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="completed" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAnalytics)" />
                <Area type="monotone" dataKey="delayed" stroke="#DC2626" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Bottlenecks Bar Chart */}
        <div className="lg:col-span-5 bg-white border border-[#E6E8EC] rounded-3xl p-6 md:p-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#101828]">
              Department Bottlenecks
            </h3>
            <p className="text-xs text-[#667085] mt-1">
              Average delay hours per operational group
            </p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptBottlenecks} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F2F4F7" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#98A2B3', fontSize: 11 }} />
                <YAxis type="category" dataKey="department" axisLine={false} tickLine={false} tick={{ fill: '#667085', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E6E8EC',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="delayHours" fill="#14213D" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </section>

      {/* Chart Section 2: SLA Risk & Automation Savings */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SLA Risk Donut */}
        <div className="lg:col-span-5 bg-white border border-[#E6E8EC] rounded-3xl p-6 md:p-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#101828]">
              SLA Risk Distribution
            </h3>
            <p className="text-xs text-[#667085] mt-1">
              Workflow allocation by risk profile
            </p>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={slaRiskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {slaRiskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 text-xs">
            {slaRiskDistribution.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[#667085]">{item.name} ({item.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Automation Savings Bar Chart */}
        <div className="lg:col-span-7 bg-white border border-[#E6E8EC] rounded-3xl p-6 md:p-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#101828]">
              Automation Savings (Hours)
            </h3>
            <p className="text-xs text-[#667085] mt-1">
              Manual operational hours vs AI automated execution
            </p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={automationSavings} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F2F4F7" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#98A2B3', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#98A2B3', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E6E8EC',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="manualHours" fill="#E6E8EC" radius={[6, 6, 0, 0]} name="Manual Hours" />
                <Bar dataKey="automatedHours" fill="#2563EB" radius={[6, 6, 0, 0]} name="Automated Hours" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </section>

    </div>
  );
};

export default Analytics;
