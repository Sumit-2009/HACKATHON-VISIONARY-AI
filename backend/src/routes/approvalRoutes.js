import express from 'express';
import db from '../models/db.js';

const router = express.Router();

// GET /api/approvals
router.get('/', (req, res) => {
  try {
    const { filter, department } = req.query;
    let approvals = db.get('approvals');

    if (filter) {
      if (filter === 'High Risk' || filter === 'High-risk approvals') {
        approvals = approvals.filter(a => a.risk === 'High Risk');
      } else if (filter === 'SLA-critical' || filter === 'SLA-critical approvals') {
        approvals = approvals.filter(a => a.pendingTime.includes('4.') || a.pendingTime.includes('6.'));
      } else if (filter === 'Recently completed') {
        approvals = approvals.filter(a => a.status === 'Recently Completed' || a.status === 'Approved');
      } else if (filter === 'Pending approvals' || filter === 'Pending') {
        approvals = approvals.filter(a => a.status === 'Pending');
      }
    }

    if (department && department !== 'All') {
      approvals = approvals.filter(a => a.department.toLowerCase() === department.toLowerCase());
    }

    res.json(approvals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/approvals/:id/action
router.post('/:id/action', (req, res) => {
  try {
    const { action, note } = req.body; // 'approve', 'reject', 'remind', 'escalate'
    const approvals = db.get('approvals');
    const idx = approvals.findIndex(a => a.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ error: `Approval ${req.params.id} not found` });
    }

    const app = approvals[idx];
    if (action === 'approve') {
      app.status = 'Approved';
      app.risk = 'Low Risk';
    } else if (action === 'reject') {
      app.status = 'Rejected';
    } else if (action === 'remind') {
      app.aiRecommendation = `Reminder dispatched to ${app.approver} via Slack/Email`;
    } else if (action === 'escalate') {
      app.risk = 'Escalated';
      app.aiRecommendation = 'Escalated to Department VP queue';
    }

    approvals[idx] = app;
    db.set('approvals', approvals);

    res.json({
      success: true,
      message: `Action ${action} executed successfully on ${app.id}`,
      approval: app
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
