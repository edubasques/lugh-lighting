/**
 * Lugh Lighting — Admin Panel Logic
 * Manages users: list, approve, reject, change roles
 */

let usuariosCarregados = [];
let filtroAtual = 'todos';

// ---- Load and render users ----
async function carregarUsuarios() {
  const tabela = document.getElementById('tabelaUsuarios');
  if (!tabela) return;

  tabela.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:32px;color:#a1a1aa;"><div class="spinner-sm"></div>Carregando usuários...</td></tr>';

  try {
    usuariosCarregados = await listarUsuarios();
    renderizarUsuarios();
  } catch (err) {
    console.error('Erro ao carregar usuários:', err);
    tabela.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:32px;color:#ff6b6b;">Erro ao carregar usuários</td></tr>';
  }
}

function renderizarUsuarios() {
  const tabela = document.getElementById('tabelaUsuarios');
  if (!tabela) return;

  let usuarios = usuariosCarregados;

  // Aplicar filtro
  if (filtroAtual !== 'todos') {
    usuarios = usuarios.filter(u => u.status === filtroAtual);
  }

  // Atualizar contadores
  const total = usuariosCarregados.length;
  const pendentes = usuariosCarregados.filter(u => u.status === 'pendente').length;
  const aprovados = usuariosCarregados.filter(u => u.status === 'aprovado').length;
  const rejeitados = usuariosCarregados.filter(u => u.status === 'rejeitado').length;

  document.getElementById('countTodos').textContent = total;
  document.getElementById('countPendentes').textContent = pendentes;
  document.getElementById('countAprovados').textContent = aprovados;
  document.getElementById('countRejeitados').textContent = rejeitados;

  if (usuarios.length === 0) {
    tabela.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center;padding:48px;color:#a1a1aa;">
          Nenhum usuário encontrado
        </td>
      </tr>`;
    return;
  }

  tabela.innerHTML = usuarios.map(user => {
    const statusBadge = getStatusBadge(user.status);
    const roleBadge = getRoleBadge(user.role);
    const actions = getActions(user);
    const createdAt = user.createdAt ? formatDate(user.createdAt) : '—';

    return `
      <tr>
        <td>
          <div class="user-cell">
            <img src="${user.picture || ''}" alt="" class="user-cell-avatar" onerror="this.style.display='none'">
            <div>
              <div class="user-cell-name">${user.name || '—'}</div>
              <div class="user-cell-email">${user.email}</div>
            </div>
          </div>
        </td>
        <td>${roleBadge}</td>
        <td>${statusBadge}</td>
        <td>${createdAt}</td>
        <td>${actions}</td>
      </tr>`;
  }).join('');
}

function getStatusBadge(status) {
  const badges = {
    'pendente': '<span class="badge badge-pending">⏳ Pendente</span>',
    'aprovado': '<span class="badge badge-approved">✅ Aprovado</span>',
    'rejeitado': '<span class="badge badge-rejected">🚫 Rejeitado</span>',
  };
  return badges[status] || status;
}

function getRoleBadge(role) {
  if (role === 'admin') {
    return '<span class="badge badge-admin">👑 Admin</span>';
  }
  return '<span class="badge badge-user">👤 Usuário</span>';
}

function getActions(user) {
  const currentUser = checkAuth();
  // Não pode alterar a si mesmo
  if (currentUser && currentUser.email === user.email) {
    return '<span style="color:#555;font-size:0.8rem;">Você</span>';
  }

  let buttons = '';

  if (user.status === 'pendente') {
    buttons += `<button class="btn-action btn-approve" onclick="acaoAprovar('${user.email}')">Aprovar</button>`;
    buttons += `<button class="btn-action btn-reject" onclick="acaoRejeitar('${user.email}')">Rejeitar</button>`;
  } else if (user.status === 'aprovado') {
    buttons += `<button class="btn-action btn-reject" onclick="acaoRejeitar('${user.email}')">Revogar</button>`;
  } else if (user.status === 'rejeitado') {
    buttons += `<button class="btn-action btn-approve" onclick="acaoAprovar('${user.email}')">Aprovar</button>`;
  }

  if (user.status === 'aprovado') {
    if (user.role === 'user') {
      buttons += `<button class="btn-action btn-role" onclick="acaoRole('${user.email}', 'admin')">→ Admin</button>`;
    } else {
      buttons += `<button class="btn-action btn-role" onclick="acaoRole('${user.email}', 'user')">→ Usuário</button>`;
    }
  }

  return `<div class="actions-group">${buttons}</div>`;
}

function formatDate(timestamp) {
  if (!timestamp) return '—';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// ---- Actions ----
async function acaoAprovar(email) {
  try {
    await aprovarUsuario(email);
    await carregarUsuarios();
  } catch (err) {
    console.error('Erro ao aprovar:', err);
    alert('Erro ao aprovar usuário');
  }
}

async function acaoRejeitar(email) {
  if (!confirm('Tem certeza que deseja rejeitar/revogar este usuário?')) return;
  try {
    await rejeitarUsuario(email);
    await carregarUsuarios();
  } catch (err) {
    console.error('Erro ao rejeitar:', err);
    alert('Erro ao rejeitar usuário');
  }
}

async function acaoRole(email, role) {
  const label = role === 'admin' ? 'administrador' : 'usuário comum';
  if (!confirm(`Deseja tornar este usuário ${label}?`)) return;
  try {
    await definirRole(email, role);
    await carregarUsuarios();
  } catch (err) {
    console.error('Erro ao alterar role:', err);
    alert('Erro ao alterar permissão');
  }
}

// ---- Filters ----
function setFiltro(filtro) {
  filtroAtual = filtro;
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-filter="${filtro}"]`).classList.add('active');
  renderizarUsuarios();
}
