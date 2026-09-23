/**
 * Lugh Lighting — Firebase Configuration & User Management
 * Uses Firebase Compat SDK (loaded via CDN script tags)
 */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCcd5F9D6tnxyoIghmXbPx05BfhoYNKsMc",
  authDomain: "lugh-lighting.firebaseapp.com",
  projectId: "lugh-lighting",
  storageBucket: "lugh-lighting.firebasestorage.app",
  messagingSenderId: "502317400035",
  appId: "1:502317400035:web:02c9b7bb3f8565100c2ad6"
};

let db = null;

function initFirebase() {
  if (!db) {
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
    db = firebase.firestore();
  }
  return db;
}

/**
 * Registra ou atualiza usuário no Firestore.
 * Primeiro usuário é auto-aprovado como admin.
 */
async function registrarUsuario(userInfo) {
  initFirebase();
  const docRef = db.collection('users').doc(userInfo.email);
  const doc = await docRef.get();

  if (!doc.exists) {
    // Verificar se é o primeiro usuário (será admin)
    const allUsers = await db.collection('users').limit(1).get();
    const isFirstUser = allUsers.empty;

    const newUser = {
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture || '',
      role: isFirstUser ? 'admin' : 'user',
      status: isFirstUser ? 'aprovado' : 'pendente',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    await docRef.set(newUser);
    // Return with local values (serverTimestamp resolves on server)
    return { ...newUser, createdAt: new Date(), updatedAt: new Date() };
  }

  // Atualizar nome e foto em logins subsequentes
  await docRef.update({
    name: userInfo.name,
    picture: userInfo.picture || '',
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  return doc.data();
}

/**
 * Busca usuário pelo email
 */
async function buscarUsuario(email) {
  initFirebase();
  const doc = await db.collection('users').doc(email).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

/**
 * Lista todos os usuários (admin only)
 */
async function listarUsuarios() {
  initFirebase();
  const snapshot = await db.collection('users').orderBy('createdAt', 'desc').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Aprova um usuário
 */
async function aprovarUsuario(email) {
  initFirebase();
  await db.collection('users').doc(email).update({
    status: 'aprovado',
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

/**
 * Rejeita um usuário
 */
async function rejeitarUsuario(email) {
  initFirebase();
  await db.collection('users').doc(email).update({
    status: 'rejeitado',
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

/**
 * Altera o role de um usuário (admin/user)
 */
async function definirRole(email, role) {
  initFirebase();
  await db.collection('users').doc(email).update({
    role: role,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}
