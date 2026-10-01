import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, User, Mail, Building, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api/client';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Operations');
  const [role, setRole] = useState('Workflow Specialist');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.register({ name, email, department, role });
      await login(email, 'password123');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col justify-center items-center p-6 text-[#101828]">
      
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-[#14213D] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Sparkles className="w-6 h-6 text-[#6366F1]" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[#101828]">
          FLOWMIND AI
        </h1>
        <p className="text-sm text-[#667085] mt-1">
          AI-Powered Enterprise Workflow Intelligence
        </p>
      </div>

      {/* Registration Card */}
      <div className="bg-white border border-[#E6E8EC] rounded-3xl p-8 md:p-10 max-w-md w-full shadow-subtle space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-[#101828]">Request Enterprise Workspace</h2>
          <p className="text-xs text-[#667085] mt-1">
            Join your organization's workflow intelligence domain.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#667085] mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Priya Shah"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8FA] border border-[#E6E8EC] rounded-xl text-sm font-medium outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#667085] mb-1.5">
              Work Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="priya.shah@flowmind.ai"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8FA] border border-[#E6E8EC] rounded-xl text-sm font-medium outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#667085] mb-1.5">
              Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F7F8FA] border border-[#E6E8EC] rounded-xl text-sm font-medium outline-none cursor-pointer"
            >
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Procurement">Procurement</option>
              <option value="Operations">Operations</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-[#14213D] text-white text-sm font-semibold hover:bg-[#1E293B] transition-colors shadow-sm cursor-pointer mt-2"
          >
            {loading ? 'Creating workspace seat...' : 'Join Workspace'}
          </button>
        </form>

        <div className="pt-4 border-t border-[#F2F4F7] text-center">
          <p className="text-xs text-[#667085]">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#2563EB] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Register;
