# FlowMind AI — Enterprise Workflow Intelligence

> Autonomous enterprise workflow intelligence platform that monitors, understands, predicts, and optimizes organizational workflows.

---

## ⚡ Overview

FlowMind AI bridges human operations and automated decision systems. It synthesizes operational telemetry across departments (Finance, HR, IT, Operations, Legal), predicts SLA breaches before they occur, detects approval bottlenecks, and recommends autonomous guardrails.

---

## 🌟 Key Features

- **Autonomous Command Center**: Live telemetry across 128 active organizational workflows, risk-scored bottleneck stages, and real-time SLA breach forecasting.
- **Workflow Execution Pipeline**: 5-stage interactive pipeline visualizer (`Request` → `AI Analysis` → `Approval [Bottleneck]` → `Execution` → `Completed`) with automated escalation thresholds.
- **Multi-Engine Hybrid AI**: Integrated with **Google Gemini 3.5** and **Groq Cloud** (`openai/gpt-oss-120b`) with automatic fallback and zero frontend credential exposure.
- **AI Operational Insight**: Interactive recommendation cards that apply guardrail routing rules on demand with instant feedback.
- **AI Activity Live Feed**: Real-time operations stream tracking optimizations, delays, and approvals.
- **Enterprise Copilot**: Conversational workflow assistant answering complex questions about department risk, cycle times, and automation opportunities.
- **Three-Mode Theme System**:
  - **Light Mode**: Crisp, airy enterprise canvas with indigo accents.
  - **Dark Mode**: Obsidian black background with glowing sparklines and dark slate cards.
  - **Monochrome Mode**: Minimalist editorial grayscale appearance without color accents.
- **Collapsible Responsive Sidebar**: Desktop icon-only toggle (`w-20` / `w-64`) with hover tooltips and mobile slide-over drawer.
- **Global Search (`⌘K` / `Ctrl+K`)**: Rapid search across workflows, tasks, employees, approvals, documents, and AI insights.

---

## 🏗️ Architecture

```
web2/
├── backend/                  # Node.js Express REST API & AI Service
│   ├── src/
│   │   ├── models/           # In-memory enterprise mock database (128 workflows, tasks, bottlenecks)
│   │   ├── routes/           # REST endpoints (/api/workflows, /api/tasks, /api/ai, etc.)
│   │   ├── services/         # Multi-engine AI client (Google Gemini + Groq Cloud)
│   │   └── server.js         # Express entry point
│   ├── .env.example          # Environment variables template
│   └── package.json
│
├── frontend/                 # Vite + React 18 SPA
│   ├── src/
│   │   ├── components/       # Layout, common, and workflow components
│   │   ├── context/          # ThemeContext (Light/Dark/Mono), AuthContext
│   │   ├── pages/            # Dashboard, Copilot, Workflows, Approvals, Tasks, etc.
│   │   ├── api/              # Axios API client
│   │   ├── index.css         # Tailwind & custom CSS variables design system
│   │   └── App.jsx           # React router routes & shells
│   ├── index.html            # Favicon & typography
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm or yarn

### 1. Backend Setup

```bash
cd backend
npm install

# Copy environment variables
cp .env.example .env

# Configure your keys in .env
# GEMINI_API_KEY=your_key
# GROQ_API_KEY=your_key

# Start the backend server
node src/server.js
```

Backend will run at `http://localhost:5000` (Health check: `http://localhost:5000/health`).

### 2. Frontend Setup

```bash
cd frontend
npm install

# Start Vite development server
npm run dev
```

Frontend will run at `http://localhost:5173`.

---

## 🔒 Security

All API keys are held strictly in the Express backend environment (`backend/.env`). No secrets or API credentials are ever bundled or exposed to the client browser.

---

## 📄 License

MIT © FlowMind AI Team
>>>>>>> d18b36a (feat: FlowMind AI enterprise workflow intelligence platform with 3-mode theme system and multi-engine AI)
