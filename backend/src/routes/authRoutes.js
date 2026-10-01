import express from 'express';

const router = express.Router();

const DEMO_USER = {
  id: "USR-01",
  name: "Priya Shah",
  email: "priya.shah@flowmind.ai",
  role: "Lead People Operations",
  department: "Human Resources",
  avatarInitials: "PS"
};

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Accept standard or demo credentials
  const user = {
    ...DEMO_USER,
    email: email || DEMO_USER.email
  };
  return res.json({
    token: "flowmind-jwt-enterprise-token-2026",
    user
  });
});

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { name, email, department, role } = req.body;
  const user = {
    id: `USR-${Date.now().toString().slice(-4)}`,
    name: name || "Enterprise Operator",
    email: email || "operator@flowmind.ai",
    department: department || "Operations",
    role: role || "Workflow Specialist",
    avatarInitials: (name || "EO").split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  };
  return res.json({
    token: "flowmind-jwt-enterprise-token-2026",
    user
  });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  return res.json(DEMO_USER);
});

export default router;
