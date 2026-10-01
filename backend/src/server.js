import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import workflowRoutes from './routes/workflowRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import approvalRoutes from './routes/approvalRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import automationRoutes from './routes/automationRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import db from './models/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// Core Routes
app.use('/api/auth', authRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/approvals', approvalRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/automations', automationRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/search', searchRoutes);

// GET /api/dashboard - Convenience combined endpoint for fast dashboard loading
app.get('/api/dashboard', (req, res) => {
  try {
    const summary = db.data.summary;
    const workflows = db.get('workflows').slice(0, 6);
    const bottlenecks = db.get('bottlenecks');
    const analytics = db.data.analytics;

    res.json({
      summary,
      workflows,
      bottlenecks,
      timeSeriesPerformance: analytics.timeSeriesPerformance
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'Operational',
    product: 'FlowMind AI',
    version: '2.0.0',
    tagline: 'AI-Powered Enterprise Workflow Intelligence',
    aiStatus: (process.env.GEMINI_API_KEY && process.env.GROQ_API_KEY)
      ? 'Multi-Engine Hybrid (Google Gemini 3.5 + Groq Cloud)'
      : process.env.GEMINI_API_KEY
      ? 'Google Gemini 3.5 Active'
      : process.env.GROQ_API_KEY
      ? `Groq Cloud Active (${process.env.GROQ_MODEL || 'openai/gpt-oss-120b'})`
      : 'Operational (Enterprise Heuristic AI)',
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[FlowMind ServerError]', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Enterprise Server Error',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  const activeEngine = (process.env.GEMINI_API_KEY && process.env.GROQ_API_KEY)
    ? 'Multi-Engine Hybrid (Google Gemini 3.5 + Groq Cloud)'
    : process.env.GEMINI_API_KEY
    ? 'Google Gemini 3.5 Active'
    : process.env.GROQ_API_KEY
    ? `Groq Cloud Active (${process.env.GROQ_MODEL || 'openai/gpt-oss-120b'})`
    : 'FlowMind Enterprise Engine Active';

  console.log(`====================================================`);
  console.log(`⚡ FLOWMIND AI Enterprise Backend running on port ${PORT}`);
  console.log(`🔗 API Health: http://localhost:${PORT}/health`);
  console.log(`🤖 AI Engine: ${activeEngine}`);
  console.log(`====================================================`);
});
