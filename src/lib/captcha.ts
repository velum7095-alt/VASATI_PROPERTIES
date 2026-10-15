/**
 * Cloudflare Turnstile CAPTCHA Verification
 * Privacy-preserving, non-intrusive bot defense complying with DPDP Act 2023.
 */

export interface CaptchaVerificationResult {
  success: boolean;
  message?: string;
  errorCodes?: string[];
  bypass?: boolean;
}

export async function verifyTurnstileToken(
  token?: string,
  clientIp?: string
): Promise<CaptchaVerificationResult> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // Development / Local environment without configured Turnstile keys
  if (!secretKey) {
    return {
      success: true,
      bypass: true,
      message: 'Turnstile verification bypassed (TURNSTILE_SECRET_KEY not set in environment).',
    };
  }

  // Token is required if secret key is configured
  if (!token) {
    return {
      success: false,
      message: 'CAPTCHA token is required to verify human submission.',
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (clientIp) {
      formData.append('remoteip', clientIp);
    }

    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      }
    );

    const outcome = await response.json();

    if (outcome.success) {
      return { success: true };
    }

    return {
      success: false,
      message: 'CAPTCHA verification failed. Please refresh and try again.',
      errorCodes: outcome['error-codes'],
    };
  } catch (error) {
    console.error('[CAPTCHA_VERIFY_ERROR]', error);
    // Fail secure or gracefully allow depending on policy
    return {
      success: false,
      message: 'Security challenge verification service unavailable.',
    };
  }
}

