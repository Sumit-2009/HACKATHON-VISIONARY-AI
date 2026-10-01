import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppShell from './components/layout/AppShell';

import Dashboard from './pages/Dashboard';
import Workflows from './pages/Workflows';
import WorkflowWorkspace from './pages/WorkflowWorkspace';
import CreateWorkflow from './pages/CreateWorkflow';
import Tasks from './pages/Tasks';
import Approvals from './pages/Approvals';
import Documents from './pages/Documents';
import Copilot from './pages/Copilot';
import Analytics from './pages/Analytics';
import Automation from './pages/Automation';
import Team from './pages/Team';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Application Workspace Shell */}
          <Route element={<AppShell />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workflows" element={<Workflows />} />
            <Route path="/workflows/create" element={<CreateWorkflow />} />
            <Route path="/workflows/:id" element={<WorkflowWorkspace />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/approvals" element={<Approvals />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/copilot" element={<Copilot />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/automation" element={<Automation />} />
            <Route path="/team" element={<Team />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
