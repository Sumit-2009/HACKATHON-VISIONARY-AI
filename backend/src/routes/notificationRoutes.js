import express from 'express';
import db from '../models/db.js';

const router = express.Router();

// GET /api/notifications
router.get('/', (req, res) => {
  try {
    const notifications = db.get('notifications');
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/notifications/:id/read
router.patch('/:id/read', (req, res) => {
  try {
    const notifications = db.get('notifications');
    const notif = notifications.find(n => n.id === req.params.id);
    if (notif) {
      notif.read = true;
      db.set('notifications', notifications);
    }
    res.json({ success: true, notification: notif });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
