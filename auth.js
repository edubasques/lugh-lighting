/**
 * Lugh Lighting — Shared Authentication Module
 * Handles Google OAuth login, session persistence, Firestore integration, and route protection.
 */

const GOOGLE_CLIENT_ID = '313230016841-bte9olt0p0uuelk3m34p3h8uoku0e811.apps.googleusercontent.com';
const SESSION_KEY = 'lugh_user';

/**
 * Dynamically loads the Google Identity Services script.
 */
function initGoogleAuth() {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.accounts) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Identity Services'));
    document.head.appendChild(script);
  });
}

/**
 * Callback do Google Sign-In.
 * Decodifica JWT, registra no Firestore, e redireciona conforme status.
 */
async function handleCredentialResponse(response) {
  try {
    const token = response.credential;
    const payload = _decodeJwtPayload(token);

    const userInfo = {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
      token: token
    };

    // Tentar registrar/verificar no Firestore
    if (typeof initFirebase === 'function') {
      try {
        const userData = await registrarUsuario(userInfo);
        userInfo.status = userData.status;
        userInfo.role = userData.role;
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(userInfo));

        if (userData.status === 'aprovado') {
          window.location.href = '/principal/';
        } else {
          // Chamar função da página de login para mostrar status
          if (typeof mostrarStatusLogin === 'function') {
            mostrarStatusLogin(userData.status, userInfo);
          }
        }
      } catch (err) {
        console.error('[Lugh Auth] Firestore error:', err);
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(userInfo));
        window.location.href = '/principal/';
      }
    } else {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(userInfo));
      window.location.href = '/principal/';
    }
  } catch (err) {
    console.error('[Lugh Auth] Failed to process credential:', err);
  }
}

/**
 * Checks whether a user session exists.
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
 * Logs the user out.
 */
function logout() {
  sessionStorage.clear();
  window.location.href = '/login/';
}

/**
 * Returns the current user's info from session storage.
 */
function getUserInfo() {
  return checkAuth();
}

/* ---- Internal helpers ---- */

function _decodeJwtPayload(token) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid JWT format');

  let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4 !== 0) base64 += '=';

  const jsonStr = atob(base64);
  const decoded = decodeURIComponent(
    jsonStr.split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
  );
  return JSON.parse(decoded);
}
