'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Lock,
  KeyRound,
  ShieldCheck,
  Loader2,
  AlertCircle,
  QrCode,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();

  // Step 1: Credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmittingCredentials, setIsSubmittingCredentials] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Step 2: 2FA State
  const [step, setStep] = useState<'CREDENTIALS' | 'VERIFY_2FA' | 'SETUP_2FA'>('CREDENTIALS');
  const [tempToken, setTempToken] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [setupSecret, setSetupSecret] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isVerifying2fa, setIsVerifying2fa] = useState(false);
  const [twoFactorError, setTwoFactorError] = useState<string | null>(null);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!email || !password) {
      setLoginError('Please enter both email and password.');
      return;
    }

    setIsSubmittingCredentials(true);
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      setTempToken(data.tempToken);

      if (data.requires2fa) {
        setStep('VERIFY_2FA');
      } else if (data.requires2faSetup) {
        setSetupSecret(data.secret);
        setQrCodeUrl(data.qrCode);
        setStep('SETUP_2FA');
      }
    } catch (err) {
      setLoginError((err as Error).message || 'Invalid credentials');
    } finally {
      setIsSubmittingCredentials(false);
    }
  };

  const handle2faSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTwoFactorError(null);

    if (!totpCode || totpCode.trim().length !== 6) {
      setTwoFactorError('Please enter a valid 6-digit TOTP code');
      return;
    }

    setIsVerifying2fa(true);
    try {
      const res = await fetch('/api/admin/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tempToken,
          totpCode: totpCode.trim(),
          setupSecret: step === 'SETUP_2FA' ? setupSecret : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || '2FA verification failed');
      }

      // Successful 2FA login -> Go to Admin Dashboard
      router.push('/admin');
    } catch (err) {
      setTwoFactorError((err as Error).message || 'Verification failed');
    } finally {
      setIsVerifying2fa(false);
    }
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
          {/* STEP 1: PASSWORD AUTHENTICATION */}
          {step === 'CREDENTIALS' && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Administrator Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  disabled={isSubmittingCredentials}
                  autoComplete="email"
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
                  disabled={isSubmittingCredentials}
                  autoComplete="current-password"
                />
              </div>

              {loginError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmittingCredentials}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >
                {isSubmittingCredentials ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to 2FA Challenge</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 text-[11px] text-slate-500 text-center">
                Default Dev Admin: <code className="text-emerald-400">admin@example.com</code> / <code className="text-emerald-400">ChangeMeInProduction#2026!</code>
              </div>
            </form>
          )}

          {/* STEP 2: VERIFY EXISTING 2FA */}
          {step === 'VERIFY_2FA' && (
            <form onSubmit={handle2faSubmit} className="space-y-4">
              <div className="text-center space-y-1">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  TOTP 2FA Required
                </span>
                <h2 className="text-base font-bold text-white">Enter 6-Digit Code</h2>
                <p className="text-xs text-slate-400">
                  Check your Authenticator App (Google Authenticator, Microsoft, 1Password)
                </p>
              </div>

              <div>
                <input
                  type="text"
                  maxLength={6}
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="000000"
                  className="w-full py-3 text-center text-2xl tracking-[0.4em] font-mono font-bold rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  disabled={isVerifying2fa}
                  autoFocus
                />
              </div>

              {twoFactorError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{twoFactorError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying2fa}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >
                {isVerifying2fa ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Authenticator Token...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Verify & Open Dashboard</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('CREDENTIALS')}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-300 transition"
              >
                ← Back to credentials
              </button>
            </form>
          )}

          {/* STEP 3: FIRST-TIME 2FA SETUP (QR CODE) */}
          {step === 'SETUP_2FA' && (
            <form onSubmit={handle2faSubmit} className="space-y-4">
              <div className="text-center space-y-1">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Initial Security Enrollment
                </span>
                <h2 className="text-base font-bold text-white">Enroll 2FA Authenticator</h2>
                <p className="text-xs text-slate-400">
                  Scan this QR code with Google Authenticator or 1Password:
                </p>
              </div>

              {/* QR Code Container */}
              {qrCodeUrl && (
                <div className="p-3 bg-white rounded-2xl w-48 h-48 mx-auto flex items-center justify-center shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrCodeUrl} alt="2FA QR Code" className="w-full h-full object-contain" />
                </div>
              )}

              {setupSecret && (
                <div className="text-center text-[11px] text-slate-400">
                  Manual Entry Secret: <code className="text-emerald-400 font-mono select-all">{setupSecret}</code>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 text-center">
                  Enter Generated 6-Digit Code to Confirm
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="000000"
                  className="w-full py-2.5 text-center text-xl tracking-[0.3em] font-mono font-bold rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  disabled={isVerifying2fa}
                  autoFocus
                />
              </div>

              {twoFactorError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{twoFactorError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying2fa}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >
                {isVerifying2fa ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Activating 2FA Token...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Confirm & Activate 2FA</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Security Guarantee Notice */}
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

