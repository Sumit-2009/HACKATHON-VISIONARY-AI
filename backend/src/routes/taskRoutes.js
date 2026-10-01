import express from 'express';
import db from '../models/db.js';

const router = express.Router();

// GET /api/tasks
router.get('/', (req, res) => {
  try {
    const { filter, department, search } = req.query;
    let tasks = db.get('tasks');

    if (filter) {
      if (filter === 'My Tasks') {
        tasks = tasks.filter(t => t.owner === 'Priya Shah' || t.owner === 'Rajesh Kumar');
      } else if (filter === 'At Risk') {
        tasks = tasks.filter(t => t.status === 'At Risk' || t.aiRisk === 'High');
      } else if (filter === 'Overdue') {
        tasks = tasks.filter(t => t.status === 'Overdue');
      } else if (filter === 'Recently Completed') {
        tasks = tasks.filter(t => t.status === 'Recently Completed');
      }
    }

    if (department && department !== 'All') {
      tasks = tasks.filter(t => t.department.toLowerCase() === department.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      tasks = tasks.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.workflow.toLowerCase().includes(q) ||
        t.owner.toLowerCase().includes(q)
      );
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/tasks
router.post('/', (req, res) => {
  try {
    const tasks = db.get('tasks');
    const newTask = {
      id: `TSK-${400 + tasks.length + 1}`,
      title: req.body.title || "New Enterprise Task",
      workflowId: req.body.workflowId || "WF-2048",
      workflow: req.body.workflow || "Employee Onboarding",
      owner: req.body.owner || "Priya Shah",
      department: req.body.department || "Operations",
      due: req.body.due || "In 24 hours",
      status: req.body.status || "In Progress",
      aiRisk: req.body.aiRisk || "Low",
      recommendedAction: req.body.recommendedAction || "Monitor stage progression"
    };

    tasks.unshift(newTask);
    db.set('tasks', tasks);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/tasks/:id
router.patch('/:id', (req, res) => {
  try {
    const tasks = db.get('tasks');
    const idx = tasks.findIndex(t => t.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ error: `Task ${req.params.id} not found` });
    }

    tasks[idx] = { ...tasks[idx], ...req.body };
    db.set('tasks', tasks);
    res.json(tasks[idx]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
