import express from 'express';
import db from '../models/db.js';

const router = express.Router();

// GET /api/workflows
router.get('/', (req, res) => {
  try {
    const { department, risk, status, search } = req.query;
    let workflows = db.get('workflows');

    if (department && department !== 'All') {
      workflows = workflows.filter(w => w.department.toLowerCase() === department.toLowerCase());
    }
    if (risk && risk !== 'All') {
      workflows = workflows.filter(w => w.riskLevel.toLowerCase() === risk.toLowerCase());
    }
    if (status && status !== 'All') {
      if (status === 'Delayed' || status === 'At Risk') {
        workflows = workflows.filter(w => w.riskLevel === 'High' || w.riskLevel === 'Medium');
      } else if (status === 'Completed') {
        workflows = workflows.filter(w => w.progress === 100);
      }
    }
    if (search) {
      const q = search.toLowerCase();
      workflows = workflows.filter(w =>
        w.name.toLowerCase().includes(q) ||
        w.id.toLowerCase().includes(q) ||
        w.owner.toLowerCase().includes(q) ||
        w.department.toLowerCase().includes(q)
      );
    }

    res.json(workflows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/workflows/bottlenecks
router.get('/bottlenecks', (req, res) => {
  try {
    const bottlenecks = db.get('bottlenecks');
    res.json(bottlenecks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/workflows/:id
router.get('/:id', (req, res) => {
  try {
    const workflows = db.get('workflows');
    const wf = workflows.find(w => w.id === req.params.id);
    if (!wf) {
      return res.status(404).json({ error: `Workflow ${req.params.id} not found` });
    }
    res.json(wf);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/workflows
router.post('/', (req, res) => {
  try {
    const { name, department, description, stages, sla, owner } = req.body;
    const workflows = db.get('workflows');
    const newId = `WF-${2050 + workflows.length + 1}`;

    const newStages = (stages && stages.length > 0)
      ? stages.map((s, idx) => ({
          name: typeof s === 'string' ? s : s.name,
          status: idx === 0 ? "in-progress" : "pending",
          duration: idx === 0 ? "Started" : "Estimated",
          isCurrent: idx === 0,
          timestamp: "Just now"
        }))
      : [
          { name: "Initiated", status: "completed", duration: "1 min", timestamp: "Just now" },
          { name: "Initial Processing", status: "in-progress", duration: "Active", isCurrent: true, timestamp: "Now" },
          { name: "Approval Gate", status: "pending", duration: "Est. 2 hrs", timestamp: "Queued" },
          { name: "Execution", status: "pending", duration: "Est. 1 hr", timestamp: "Queued" }
        ];

    const newWorkflow = {
      id: newId,
      name: name || "New Enterprise Workflow",
      department: department || "Operations",
      currentStage: newStages[0]?.name || "Initiated",
      owner: owner || "Priya Shah",
      progress: 15,
      slaDeadline: sla ? `${sla} remaining` : "3 days left",
      riskLevel: "Low",
      createdDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
      description: description || "Autonomous organizational workflow managed by FlowMind AI.",
      stages: newStages,
      aiAnalysis: {
        currentBottleneck: "None detected",
        reason: "Initial routing optimized for zero delay.",
        recommendation: "Activate baseline automation triggers.",
        confidence: 96,
        impact: "On track for SLA compliance"
      },
      documents: [],
      approvals: [
        { role: "Stage Supervisor", approver: owner || "Priya Shah", status: "Pending", pendingTime: "10 mins", sla: "On Track" }
      ],
      auditHistory: [
        { action: "Workflow synthesized and saved", user: "FlowMind AI System", time: "Just now" }
      ]
    };

    workflows.unshift(newWorkflow);
    db.set('workflows', workflows);

    // Update summary count
    const summary = db.data.summary;
    if (summary) {
      summary.activeWorkflows += 1;
      db.saveData();
    }

    res.status(201).json(newWorkflow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/workflows/:id
router.patch('/:id', (req, res) => {
  try {
    const workflows = db.get('workflows');
    const idx = workflows.findIndex(w => w.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ error: `Workflow ${req.params.id} not found` });
    }

    const updated = {
      ...workflows[idx],
      ...req.body,
      auditHistory: [
        { action: req.body.actionNote || "Workflow parameters updated", user: "Enterprise Admin", time: "Just now" },
        ...(workflows[idx].auditHistory || [])
      ]
    };

    workflows[idx] = updated;
    db.set('workflows', workflows);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
