import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Lock, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('priya.shah@flowmind.ai');
  const [password, setPassword] = useState('password123');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/dashboard');
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

      {/* Login Card */}
      <div className="bg-white border border-[#E6E8EC] rounded-3xl p-8 md:p-10 max-w-md w-full shadow-subtle space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-[#101828]">Sign in to your account</h2>
          <p className="text-xs text-[#667085] mt-1">
            Access enterprise workflow telemetry and intelligence.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                required
                className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8FA] border border-[#E6E8EC] rounded-xl text-sm font-medium outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#667085] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8FA] border border-[#E6E8EC] rounded-xl text-sm font-medium outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-[#14213D] text-white text-sm font-semibold hover:bg-[#1E293B] transition-colors shadow-sm cursor-pointer mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="pt-4 border-t border-[#F2F4F7] text-center">
          <p className="text-xs text-[#667085]">
            Don't have an enterprise seat?{' '}
            <Link to="/register" className="font-semibold text-[#2563EB] hover:underline">
              Request access
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;
