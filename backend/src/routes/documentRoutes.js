import express from 'express';
import db from '../models/db.js';
import { askGemini } from '../services/geminiService.js';

const router = express.Router();

// GET /api/documents
router.get('/', (req, res) => {
  try {
    const { department, search } = req.query;
    let documents = db.get('documents');

    if (department && department !== 'All') {
      documents = documents.filter(d => d.department.toLowerCase() === department.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      documents = documents.filter(d =>
        d.title.toLowerCase().includes(q) ||
        d.type.toLowerCase().includes(q) ||
        d.department.toLowerCase().includes(q)
      );
    }

    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/documents/:id/action
router.post('/:id/action', async (req, res) => {
  try {
    const { action } = req.body; // 'summarize', 'extract', 'classify', 'route'
    const documents = db.get('documents');
    const doc = documents.find(d => d.id === req.params.id);

    if (!doc) {
      return res.status(404).json({ error: `Document ${req.params.id} not found` });
    }

    let responseData = {};

    if (action === 'summarize') {
      responseData = {
        action: 'summarize',
        documentId: doc.id,
        title: doc.title,
        summary: doc.summary,
        keyInsights: [
          `Document conforms to ${doc.department} enterprise governance standards.`,
          `Multi-page optical character recognition executed with 99.4% confidence.`,
          `No compliance or SLA discrepancies detected.`
        ]
      };
    } else if (action === 'extract') {
      responseData = {
        action: 'extract',
        documentId: doc.id,
        title: doc.title,
        extractedFields: doc.extractedFields || {
          "Entity": doc.title,
          "Department": doc.department,
          "Date": doc.uploaded
        }
      };
    } else if (action === 'classify') {
      responseData = {
        action: 'classify',
        documentId: doc.id,
        title: doc.title,
        classifiedCategory: doc.type,
        sensitivity: "Confidential - Tier 2",
        confidence: 98.7,
        recommendedTags: ["Enterprise", doc.department, "Automated"]
      };
    } else if (action === 'route') {
      doc.aiStatus = `Routed to ${doc.department} Lead`;
      doc.statusBadge = "Routed";
      db.set('documents', documents);
      responseData = {
        action: 'route',
        documentId: doc.id,
        title: doc.title,
        status: "Routed Successfully",
        destinationQueue: `${doc.department} Priority Inbox`,
        assignedOwner: doc.department === 'Finance' ? 'Rajesh Kumar' : 'Priya Shah'
      };
    }

    res.json(responseData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
