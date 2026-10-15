'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Lock,
  ShieldCheck,
  Users,
  Sliders,
  FileText,
  History,
  LogOut,
  Eye,
  EyeOff,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  PlayCircle,
  ExternalLink,
  Loader2,
  RefreshCw,
  Building,
  KeyRound,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();

  // Navigation State
  const [activeTab, setActiveTab] = useState<'leads' | 'content' | 'dsr' | 'audit'>('leads');
  const [adminUser, setAdminUser] = useState<{ email: string; name: string; role: string } | null>(null);

  // Data States
  const [leads, setLeads] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [dsrRequests, setDsrRequests] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // Action States
  const [isLoading, setIsLoading] = useState(true);
  const [decryptedLeads, setDecryptedLeads] = useState<Record<string, { phone: string; email: string | null }>>({});
  const [decryptingId, setDecryptingId] = useState<string | null>(null);
  const [retentionRunning, setRetentionRunning] = useState(false);
  const [retentionMessage, setRetentionMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const [leadsRes, propsRes, dsrRes, auditRes] = await Promise.all([
        fetch('/api/admin/leads'),
        fetch('/api/admin/properties'),
        fetch('/api/admin/dsr'),
        fetch('/api/admin/audit-logs'),
      ]);

      if (leadsRes.status === 401) {
        router.push('/admin/login');
        return;
      }

      const leadsData = await leadsRes.json();
      const propsData = await propsRes.json();
      const dsrData = await dsrRes.json();
      const auditData = await auditRes.json();

      setLeads(leadsData.leads || []);
      setProperties(propsData.properties || []);
      setDsrRequests(dsrData.requests || []);
      setAuditLogs(auditData.logs || []);

      setAdminUser({
        email: 'admin@example.com',
        name: 'Authorized Compliance Officer',
        role: 'ADMIN',
      });
    } catch (err) {
      console.error('Failed to fetch admin data', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  // AUDITED DECRYPTION ACTION (DPDP Act Sec 8)
  const handleDecryptLead = async (leadId: string, leadName: string) => {
    const confirmed = window.confirm(
      `STATUTORY NOTICE:\nViewing unmasked contact information for "${leadName}" will be permanently recorded in the Immutable Admin Audit Log with your ID, timestamp, and salted IP hash under DPDP Act 2023.\n\nProceed to decrypt?`
    );
    if (!confirmed) return;

    setDecryptingId(leadId);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/decrypt`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Decryption failed');

      setDecryptedLeads((prev) => ({
        ...prev,
        [leadId]: { phone: data.phone, email: data.email },
      }));

      // Refresh audit logs to show new entry
      const auditRes = await fetch('/api/admin/audit-logs');
      const auditData = await auditRes.json();
      setAuditLogs(auditData.logs || []);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setDecryptingId(null);
    }
  };

  // 12-MONTH RETENTION CLEANUP (Rule 6)
  const handleRunRetention = async () => {
    const confirmed = window.confirm(
      'Enforce 12-Month Inactivity Retention Rule?\n\nThis will permanently scrub and anonymize lead records with no customer activity over the past 365 days in accordance with DPDP Act 2023 purpose limitation.'
    );
    if (!confirmed) return;

    setRetentionRunning(true);
    setRetentionMessage(null);
    try {
      const res = await fetch('/api/admin/retention/run', { method: 'POST' });
      const data = await res.json();
      setRetentionMessage(data.message);
      fetchInitialData();
    } catch (err) {
      alert('Failed to execute retention routine');
    } finally {
      setRetentionRunning(false);
    }
  };

  // UPDATE PROPERTY HERO SLIDE & DETAILS
  const handleToggleHeroSlide = async (propertyId: string, currentHero: boolean) => {
    try {
      await fetch('/api/admin/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: propertyId, heroSlide: !currentHero }),
      });
      setProperties((prev) =>
        prev.map((p) => (p.id === propertyId ? { ...p, heroSlide: !currentHero } : p))
      );
    } catch (err) {
      alert('Failed to update property status');
    }
  };

  // FULFILL DSR REQUEST
  const handleUpdateDsrStatus = async (id: string, newStatus: string) => {
    const notes = prompt(`Enter officer resolution notes for status "${newStatus}":`, 'Verified and resolved.');
    if (!notes) return;

    try {
      await fetch('/api/admin/dsr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus, resolutionNotes: notes }),
      });
      setDsrRequests((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: newStatus, resolutionNotes: notes, fulfilledAt: new Date().toISOString() } : r
        )
      );
    } catch (err) {
      alert('Failed to update DSR status');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Admin Navbar */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-white tracking-tight block">
              DPDP Act Compliance & Operations Portal
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Authenticated via TOTP 2FA • Bangalore Jurisdiction
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400">Admin:</span>
            <span className="font-mono text-emerald-400 font-bold">{adminUser?.email || 'admin@example.com'}</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
              2FA ACTIVE
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Log out securely"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition inline-flex items-center gap-2 ${
              activeTab === 'leads'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Leads & Inquiries ({leads.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition inline-flex items-center gap-2 ${
              activeTab === 'content'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Frontend & Slider Controls ({properties.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dsr')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition inline-flex items-center gap-2 ${
              activeTab === 'dsr'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Data Subject Requests ({dsrRequests.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition inline-flex items-center gap-2 ${
              activeTab === 'audit'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Immutable Audit Trail ({auditLogs.length})</span>
          </button>
        </div>

        {/* TAB 1: LEADS & ENQUIRIES */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div>
                <h2 className="text-sm font-bold text-white">Lead Data Minimisation Register</h2>
                <p className="text-xs text-slate-400">
                  Sensitive PII encrypted at rest (AES-256-GCM). Phone & Email are masked by default.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRunRetention}
                  disabled={retentionRunning}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-300 rounded-xl transition border border-amber-500/20 inline-flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Enforce 12-Month Inactivity Retention</span>
                </button>
              </div>
            </div>

            {retentionMessage && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs">
                {retentionMessage}
              </div>
            )}

            {/* Table */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs text-left divide-y divide-slate-800">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="p-3.5">Name / Reference</th>
                      <th className="p-3.5">Protected Mobile (AES-256)</th>
                      <th className="p-3.5">Property / Locality</th>
                      <th className="p-3.5">Lead Type</th>
                      <th className="p-3.5">Statutory Consent</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Audited Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {leads.map((lead) => {
                      const decrypted = decryptedLeads[lead.id];
                      return (
                        <tr key={lead.id} className="hover:bg-slate-800/40 transition">
                          <td className="p-3.5">
                            <strong className="text-white block font-medium">{lead.name}</strong>
                            <span className="text-[10px] text-slate-500 font-mono">{lead.id}</span>
                          </td>
                          <td className="p-3.5 font-mono">
                            {decrypted ? (
                              <div className="space-y-0.5">
                                <span className="text-emerald-400 font-bold block bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                                  {decrypted.phone}
                                </span>
                                {decrypted.email && (
                                  <span className="text-[10px] text-slate-400 block">{decrypted.email}</span>
                                )}
                              </div>
                            ) : (
                              <div>
                                <span className="text-slate-300">{lead.phoneMasked}</span>
                                {lead.emailMasked && (
                                  <span className="text-[10px] text-slate-500 block">{lead.emailMasked}</span>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="p-3.5">
                            <span className="font-semibold text-slate-200 block">
                              {lead.propertyTitle || 'Bangalore General'}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {lead.preferredLocality || 'Any Corridor'} • {lead.preferredBudget || 'Flexible'}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                              {lead.leadType}
                            </span>
                          </td>
                          <td className="p-3.5">
                            {lead.consentLog ? (
                              <span className="text-[11px] text-emerald-400 font-semibold block">
                                ✓ Explicit ({lead.consentLog.language.toUpperCase()})
                              </span>
                            ) : (
                              <span className="text-[11px] text-slate-500">Recorded</span>
                            )}
                          </td>
                          <td className="p-3.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                lead.status === 'ANONYMIZED'
                                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              }`}
                            >
                              {lead.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            {lead.status === 'ANONYMIZED' ? (
                              <span className="text-[11px] text-slate-500 italic">Data Purged</span>
                            ) : decrypted ? (
                              <span className="text-[10px] text-emerald-400 font-mono">Unmasked (Logged)</span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleDecryptLead(lead.id, lead.name)}
                                disabled={decryptingId === lead.id}
                                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[11px] font-semibold transition border border-slate-700 inline-flex items-center gap-1"
                              >
                                {decryptingId === lead.id ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  <Eye className="w-3 h-3 text-emerald-400" />
                                )}
                                <span>Decrypt (Audited)</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FRONTEND & HERO CAROUSEL CONTROLS */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <h2 className="text-sm font-bold text-white">Frontend Slide & Content Control Room</h2>
              <p className="text-xs text-slate-400">
                Manage hero carousel slides, launch benefits, video tours, and verified Karnataka RERA registration numbers across the frontend.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {properties.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-white text-sm">{prop.title}</h3>
                      <span className="text-xs text-emerald-400 font-mono block">
                        K-RERA: {prop.kreraRegNo}
                      </span>
                      <span className="text-xs text-slate-400">
                        {prop.locality} • {prop.priceLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleHeroSlide(prop.id, Boolean(prop.heroSlide))}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                          prop.heroSlide
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{prop.heroSlide ? 'Hero Slide: ON' : 'Hero Slide: OFF'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Launch Offer Text:</span>
                      <span className="text-white font-medium truncate max-w-[200px]">
                        {prop.heroOfferText || 'None set'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Video Tour URL:</span>
                      <span className="text-emerald-400 font-mono truncate max-w-[200px]">
                        {prop.videoUrl || 'None linked'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DATA SUBJECT REQUESTS (DSR DESK) */}
        {activeTab === 'dsr' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <h2 className="text-sm font-bold text-white">Statutory Data Subject Requests Register</h2>
              <p className="text-xs text-slate-400">
                Track compliance requests under Sections 11, 12, and 13 with mandatory 30-day statutory resolution deadlines.
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs text-left divide-y divide-slate-800">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="p-3.5">Tracking ID</th>
                      <th className="p-3.5">Request Type</th>
                      <th className="p-3.5">Requester</th>
                      <th className="p-3.5">Statutory Due Date</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Resolution</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {dsrRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-800/40 transition">
                        <td className="p-3.5 font-mono font-bold text-white">
                          {req.requestTrackingId}
                        </td>
                        <td className="p-3.5 font-bold text-emerald-400">
                          {req.requestType}
                        </td>
                        <td className="p-3.5">
                          <span className="text-white block">{req.requesterName}</span>
                          <span className="text-[11px] text-slate-500 font-mono">{req.requesterPhoneMasked}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="text-amber-400 font-bold block">
                            {new Date(req.dueAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                          <span className="text-[10px] text-slate-500">30-Day SLA Window</span>
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              req.status === 'FULFILLED'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-amber-950 text-amber-300 border border-amber-800'
                            }`}
                          >
                            {req.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          {req.status === 'FULFILLED' ? (
                            <span className="text-[11px] text-emerald-400">✓ Complete</span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleUpdateDsrStatus(req.id, 'FULFILLED')}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition"
                            >
                              Mark Fulfilled
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: IMMUTABLE AUDIT TRAIL */}
        {activeTab === 'audit' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <h2 className="text-sm font-bold text-white">Cryptographic Security Audit Log</h2>
              <p className="text-xs text-slate-400">
                Immutable record of every administrative login, decryption, export, and deletion. IP addresses are hashed with salted SHA-256.
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs text-left divide-y divide-slate-800 font-mono">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-3.5">Timestamp (IST)</th>
                      <th className="p-3.5">Action</th>
                      <th className="p-3.5">Admin Email</th>
                      <th className="p-3.5">Resource</th>
                      <th className="p-3.5">Salted IP Hash</th>
                      <th className="p-3.5">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-800/40 transition">
                        <td className="p-3.5 text-slate-400 whitespace-nowrap">
                          {new Date(log.createdAt).toLocaleString('en-IN')}
                        </td>
                        <td className="p-3.5 font-bold text-emerald-400">
                          {log.action}
                        </td>
                        <td className="p-3.5 text-white">
                          {log.adminEmail}
                        </td>
                        <td className="p-3.5 text-slate-300">
                          {log.resource}
                        </td>
                        <td className="p-3.5 text-slate-500 text-[10px] truncate max-w-[120px]">
                          {log.ipHash}
                        </td>
                        <td className="p-3.5 text-slate-400 text-xs font-sans">
                          {log.metadata || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

