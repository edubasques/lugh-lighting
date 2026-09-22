/**
 * Lugh Lighting — Shared Authentication Module
 * Handles Google OAuth login, session persistence, and route protection.
 */

const GOOGLE_CLIENT_ID = '313230016841-bte9olt0p0uuelk3m34p3h8uoku0e811.apps.googleusercontent.com';
const SESSION_KEY = 'lugh_user';

/**
 * Dynamically loads the Google Identity Services script.
 * Returns a Promise that resolves once the script is ready.
 */
function initGoogleAuth() {
  return new Promise((resolve, reject) => {
    // If the script is already loaded, resolve immediately
    if (window.google && window.google.accounts) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Identity Services script'));
    document.head.appendChild(script);
  });
}

/**
 * Callback invoked by Google Identity Services after a successful sign-in.
 * Decodes the JWT credential, persists user info, and redirects to /principal/.
 * @param {Object} response — Google credential response containing `credential` (JWT string)
 */
function handleCredentialResponse(response) {
  try {
    const token = response.credential;
    const payload = _decodeJwtPayload(token);

    const userInfo = {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
      token: token
    };

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(userInfo));
    window.location.href = '/principal/';
  } catch (err) {
    console.error('[Lugh Auth] Failed to process credential response:', err);
  }
}

/**
 * Checks whether a user session exists.
 * @returns {Object|null} The stored user object, or null if not authenticated.
 */
function checkAuth() {
  const data = sessionStorage.getItem(SESSION_KEY);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

/**
 * Logs the user out by clearing session storage and redirecting to /login/.
 */
function logout() {
  sessionStorage.clear();
  window.location.href = '/login/';
}

/**
 * Returns the current user's info from session storage, or null.
 * @returns {Object|null} { name, email, picture, token }
 */
function getUserInfo() {
  return checkAuth();
}

/* ------------------------------------------------------------------ */
/*  Internal helpers                                                   */
/* ------------------------------------------------------------------ */

/**
 * Decodes the payload portion of a JWT (index 1 after splitting by '.').
 * Google JWTs are base64url-encoded; we convert to standard base64 first.
 * @param {string} token — raw JWT string
 * @returns {Object} parsed payload
 */
function _decodeJwtPayload(token) {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format');
  }

  // Base64url → Base64
  let base64 = parts[1]
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  // Pad to a multiple of 4
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }

  const jsonStr = atob(base64);
  // Handle UTF-8 characters properly
  const decoded = decodeURIComponent(
    jsonStr.split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
  );

  return JSON.parse(decoded);
}
