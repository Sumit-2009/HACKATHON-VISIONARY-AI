import express from 'express';
import db from '../models/db.js';

const router = express.Router();

// GET /api/search?q=...
router.get('/', (req, res) => {
  try {
    const q = (req.query.q || '').trim().toLowerCase();
    if (!q) {
      return res.json({
        workflows: [],
        tasks: [],
        employees: [],
        approvals: [],
        documents: [],
        aiInsights: []
      });
    }

    const workflows = db.get('workflows').filter(w =>
      w.name.toLowerCase().includes(q) ||
      w.id.toLowerCase().includes(q) ||
      w.department.toLowerCase().includes(q) ||
      w.owner.toLowerCase().includes(q)
    ).slice(0, 5);

    const tasks = db.get('tasks').filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q) ||
      t.workflow.toLowerCase().includes(q)
    ).slice(0, 5);

    const employees = db.get('team').filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.department.toLowerCase().includes(q)
    ).slice(0, 5);

    const approvals = db.get('approvals').filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.id.toLowerCase().includes(q) ||
      a.department.toLowerCase().includes(q)
    ).slice(0, 5);

    const documents = db.get('documents').filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.type.toLowerCase().includes(q) ||
      d.department.toLowerCase().includes(q)
    ).slice(0, 5);

    const aiInsights = [
      {
        title: "Finance Approval Bottleneck",
        snippet: "Manager approval stage pending 5.4 hours (31% delay).",
        route: "/workflows/WF-2045"
      },
      {
        title: "High Risk Requisitions",
        snippet: "Laptop procurement awaiting Engineering Director sign-off.",
        route: "/workflows/WF-2049"
      }
    ].filter(i => i.title.toLowerCase().includes(q) || i.snippet.toLowerCase().includes(q));

    res.json({
      workflows,
      tasks,
      employees,
      approvals,
      documents,
      aiInsights
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
