import express from 'express';
import db from '../models/db.js';

const router = express.Router();

// GET /api/automations
router.get('/', (req, res) => {
  try {
    const automations = db.get('automations');
    res.json(automations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/automations/:id
router.patch('/:id', (req, res) => {
  try {
    const automations = db.get('automations');
    const idx = automations.findIndex(a => a.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ error: `Automation ${req.params.id} not found` });
    }

    const current = automations[idx];
    const updated = {
      ...current,
      ...req.body,
      status: req.body.enabled !== undefined ? (req.body.enabled ? "Active" : "Inactive") : current.status,
      lastRun: "Just now"
    };

    automations[idx] = updated;
    db.set('automations', automations);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/automations/:id/trigger
router.post('/:id/trigger', (req, res) => {
  try {
    const automations = db.get('automations');
    const auto = automations.find(a => a.id === req.params.id);
    if (!auto) {
      return res.status(404).json({ error: `Automation ${req.params.id} not found` });
    }

    auto.executions += 1;
    auto.lastRun = "Just now";
    db.set('automations', automations);

    res.json({
      success: true,
      message: `${auto.title} executed successfully. 1 batch item processed.`,
      automation: auto
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
