export const COOKIE_CONSENT_KEY = 'dpdp_cookie_consent_v1';
export const CURRENT_COOKIE_POLICY_VERSION = 'v1.0-2026-03';

export interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  status: 'all' | 'rejected' | 'custom';
  version: string;
  timestamp: string;
}

export const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  functional: false,
  marketing: false,
  status: 'rejected',
  version: CURRENT_COOKIE_POLICY_VERSION,
  timestamp: '',
};

export function getStoredConsent(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookiePreferences;
    // Invalidate if policy version changed significantly
    if (parsed.version !== CURRENT_COOKIE_POLICY_VERSION) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveStoredConsent(prefs: CookiePreferences): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
    // Also set lightweight document cookie for server-side inspection if needed
    document.cookie = `${COOKIE_CONSENT_KEY}=${prefs.status}; path=/; max-age=31536000; SameSite=Lax; Secure`;

    // Notify listeners across app (analytics loaders, map guards)
    window.dispatchEvent(
      new CustomEvent('dpdp-consent-updated', { detail: prefs })
    );

    // Non-blocking statutory audit log to backend
    fetch('/api/consent/cookies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        preferences: prefs,
        pageUrl: window.location.pathname,
      }),
    }).catch(() => {
      // Non-blocking
    });
  } catch (err) {
    console.error('Failed to store cookie consent:', err);
  }
}

export function openCookieSettingsModal(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('dpdp-open-cookie-settings'));
}

