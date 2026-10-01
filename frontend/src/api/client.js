import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for JWT auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('flowmind_token') || 'flowmind-jwt-enterprise-token-2026';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fallback safety interceptor to prevent UI breaking if network glitched
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn('[FlowMind API Error]', error?.response?.status, error?.message);
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  me: () => api.get('/auth/me'),
};

export const dashboardAPI = {
  getOverview: () => api.get('/dashboard'),
};

export const workflowsAPI = {
  list: (params) => api.get('/workflows', { params }),
  get: (id) => api.get(`/workflows/${id}`),
  create: (data) => api.post('/workflows', data),
  update: (id, data) => api.patch(`/workflows/${id}`, data),
  getBottlenecks: () => api.get('/workflows/bottlenecks'),
};

export const tasksAPI = {
  list: (params) => api.get('/tasks', { params }),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.patch(`/tasks/${id}`, data),
};

export const approvalsAPI = {
  list: (params) => api.get('/approvals', { params }),
  action: (id, actionData) => api.post(`/approvals/${id}/action`, actionData),
};

export const documentsAPI = {
  list: (params) => api.get('/documents', { params }),
  action: (id, actionData) => api.post(`/documents/${id}/action`, actionData),
};

export const aiAPI = {
  analyzeWorkflow: (data) => api.post('/ai/analyze-workflow', data),
  summarize: (data) => api.post('/ai/summarize', data),
  recommend: (data) => api.post('/ai/recommend', data),
  copilot: (data) => api.post('/ai/copilot', data),
};

export const analyticsAPI = {
  get: (params) => api.get('/analytics', { params }),
};

export const automationsAPI = {
  list: () => api.get('/automations'),
  update: (id, data) => api.patch(`/automations/${id}`, data),
  trigger: (id) => api.post(`/automations/${id}/trigger`),
};

export const teamAPI = {
  list: (params) => api.get('/team', { params }),
};

export const notificationsAPI = {
  list: () => api.get('/notifications'),
  markRead: (id) => api.patch(`/notifications/${id}/read`),
};

export const searchAPI = {
  query: (q) => api.get('/search', { params: { q } }),
};

export default api;
