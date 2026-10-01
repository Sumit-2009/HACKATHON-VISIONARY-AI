import express from 'express';
import db from '../models/db.js';

const router = express.Router();

// GET /api/analytics
router.get('/', (req, res) => {
  try {
    const { timeRange } = req.query; // '7 Days', '30 Days', '90 Days'
    const analytics = db.data.analytics;
    const summary = db.data.summary;

    res.json({
      summary,
      metrics: {
        workflowCompletionRate: { value: "91.4%", change: "+3.2%", label: "Workflow Completion Rate" },
        averageWorkflowTime: { value: "4.8 hrs", change: "-18.5%", label: "Average Workflow Time" },
        slaCompliance: { value: "93.8%", change: "+5.1%", label: "SLA Compliance" },
        bottleneckFrequency: { value: "13.2%", change: "-22.4%", label: "Bottleneck Frequency" },
        automationImpact: { value: "3,840 hrs", change: "+24.0%", label: "Automation Impact (Monthly)" },
        aiRecommendationAdoption: { value: "87.2%", change: "+9.6%", label: "AI Recommendation Adoption" }
      },
      timeSeriesPerformance: analytics.timeSeriesPerformance,
      departmentBottlenecks: analytics.departmentBottlenecks,
      slaRiskDistribution: analytics.slaRiskDistribution,
      automationSavings: analytics.automationSavings
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
