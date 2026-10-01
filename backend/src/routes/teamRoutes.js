import express from 'express';
import db from '../models/db.js';

const router = express.Router();

// GET /api/team
router.get('/', (req, res) => {
  try {
    const { department, search } = req.query;
    let team = db.get('team');

    if (department && department !== 'All') {
      team = team.filter(m => m.department.toLowerCase() === department.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      team = team.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q)
      );
    }

    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
