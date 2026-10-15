'use client';

import React, { useState } from 'react';
import {
  Lock,
  Loader2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('VasatiProperties@2026!');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const performLogin = async () => {
    setLoginError(null);

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setLoginError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Hard redirect to admin dashboard
      window.location.href = data.redirectTo || '/admin';
    } catch (err) {
      setLoginError((err as Error).message || 'Invalid credentials');
      setIsSubmitting(false);
    }
  };

  const handleCredentialsSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    performLogin();
  };

  const handleFillDemo = () => {
    setEmail('admin@example.com');
    setPassword('VasatiProperties@2026!');
    setLoginError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 selection:bg-emerald-500 selection:text-white">
      <div className="w-full max-w-md space-y-6">
        {/* Security Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight">
            Compliance & Operations Portal
          </h1>
          <p className="text-xs text-slate-400">
            DPDP Act 2023 & IT Act 2000 Administrative Control Room
          </p>
        </div>

        {/* Card Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <form
            action="javascript:void(0)"
            method="POST"
            onSubmit={handleCredentialsSubmit}
            className="space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-300">
                  Administrator Email
                </label>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold transition"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Autofill Dev Admin</span>
                </button>
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                disabled={isSubmitting}
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Master Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                disabled={isSubmitting}
                autoComplete="new-password"
              />
            </div>

            {loginError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => performLogin()}
              disabled={isSubmitting}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition disabled:opacity-50 inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="pt-2 text-[11px] text-slate-400 text-center space-y-1 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
              <div className="text-slate-300 font-semibold flex items-center justify-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Development Credentials Ready</span>
              </div>
              <div>
                Email: <code className="text-emerald-400 font-mono">admin@example.com</code>
              </div>
              <div>
                Password: <code className="text-emerald-400 font-mono">VasatiProperties@2026!</code>
              </div>
            </div>
          </form>
        </div>

        {/* Security Notice */}
        <div className="p-3.5 bg-slate-900/60 rounded-2xl border border-slate-800/80 text-[11px] text-slate-500 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Strict Access Security</span>
          </div>
          <p>
            All administrative actions, lead views, and export routines are immutably logged with salted IP hashing under Section 8 of the DPDP Act, 2023.
          </p>
        </div>
      </div>
    </div>
  );
}
