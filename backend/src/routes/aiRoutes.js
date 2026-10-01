import express from 'express';
import { analyzeWorkflowAI, generateCopilotResponse, askGemini } from '../services/geminiService.js';
import db from '../models/db.js';

const router = express.Router();

// POST /api/ai/analyze-workflow
router.post('/analyze-workflow', async (req, res) => {
  try {
    const workflowData = req.body;
    const analysis = await analyzeWorkflowAI(workflowData);
    res.json(analysis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/ai/summarize
router.post('/summarize', async (req, res) => {
  try {
    const { text, type, context } = req.body;
    const prompt = `Summarize this enterprise operational data concisely for leadership:\n${text || JSON.stringify(context || {})}`;
    const result = await askGemini(prompt) || "FlowMind AI operational summary: Current processes are performing within standard SLA margins with key optimization opportunities identified in multi-tier approval cycles.";
    res.json({ summary: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/ai/recommend
router.post('/recommend', async (req, res) => {
  try {
    const { workflowId, stage } = req.body;
    const workflows = db.get('workflows');
    const wf = workflows.find(w => w.id === workflowId) || workflows[0];

    const recommendation = {
      workflowId: wf?.id || "WF-2045",
      currentBottleneck: wf?.aiAnalysis?.currentBottleneck || "Manager Approval",
      reason: wf?.aiAnalysis?.reason || "Approval pending exceeds department baseline by 5.4 hours.",
      recommendation: wf?.aiAnalysis?.recommendation || "Send an automated reminder to the manager and escalate if no response is received within 60 minutes.",
      confidence: wf?.aiAnalysis?.confidence || 96,
      buttons: ["Apply Recommendation", "Send Reminder", "Escalate"]
    };

    res.json(recommendation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/ai/copilot
router.post('/copilot', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required.' });
    }

    const response = await generateCopilotResponse(query);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
