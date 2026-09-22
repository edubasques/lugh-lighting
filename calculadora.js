/* ========================================
   Lugh Lighting — Calculadora de Luminárias
   ======================================== */

// ---- Product Catalog ----
const CATALOGO = {
  'Embutida': [
    { modelo: 'Embutida Quadrada 12W', preco: 89.90 },
    { modelo: 'Embutida Redonda 18W', preco: 119.90 },
    { modelo: 'Embutida Quadrada 24W', preco: 149.90 },
  ],
  'Sobrepor': [
    { modelo: 'Plafon Sobrepor 20W', preco: 129.90 },
    { modelo: 'Plafon Sobrepor 30W', preco: 179.90 },
  ],
  'Pendente': [
    { modelo: 'Pendente Cilíndrico', preco: 259.90 },
    { modelo: 'Pendente Industrial', preco: 349.90 },
    { modelo: 'Pendente Decorativo', preco: 449.90 },
  ],
  'Trilho/Spot': [
    { modelo: 'Spot Trilho 7W', preco: 79.90 },
    { modelo: 'Spot Trilho 12W', preco: 109.90 },
    { modelo: 'Trilho 1m + 3 Spots', preco: 389.90 },
  ],
  'Fita LED': [
    { modelo: 'Fita LED 5m 4000K', preco: 89.90 },
    { modelo: 'Fita LED 5m RGB', preco: 139.90 },
    { modelo: 'Fita LED 5m Profissional', preco: 199.90 },
  ],
  'Arandela': [
    { modelo: 'Arandela Efeito 6W', preco: 99.90 },
    { modelo: 'Arandela Facho Duplo 12W', preco: 159.90 },
  ],
};

// ---- State ----
let itensOrcamento = [];

// ---- DOM References ----
const tipoSelect = document.getElementById('tipoLuminaria');
const modeloSelect = document.getElementById('modeloLuminaria');
const quantidadeInput = document.getElementById('quantidade');
const precoInput = document.getElementById('precoUnitario');
const tabelaBody = document.getElementById('tabelaItens');
const totalEl = document.getElementById('totalOrcamento');
const custoM2El = document.getElementById('custoM2');
const custoM2Row = document.getElementById('custoM2Row');
const areaInput = document.getElementById('areaAmbiente');

// ---- Formatting ----
function formatBRL(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// ---- Update Models Dropdown ----
function atualizarModelos() {
  const tipo = tipoSelect.value;
  modeloSelect.innerHTML = '<option value="">Selecione o modelo...</option>';
  precoInput.value = '';

  if (tipo && CATALOGO[tipo]) {
    modeloSelect.disabled = false;
    CATALOGO[tipo].forEach((item) => {
      const opt = document.createElement('option');
      opt.value = item.modelo;
      opt.textContent = item.modelo;
      modeloSelect.appendChild(opt);
    });
  } else {
    modeloSelect.disabled = true;
  }
}

// ---- Update Price ----
function atualizarPreco() {
  const tipo = tipoSelect.value;
  const modelo = modeloSelect.value;

  if (tipo && modelo && CATALOGO[tipo]) {
    const produto = CATALOGO[tipo].find((p) => p.modelo === modelo);
    if (produto) {
      precoInput.value = formatBRL(produto.preco);
      return;
    }
  }
  precoInput.value = '';
}

// ---- Get Selected Product Price ----
function getPrecoSelecionado() {
  const tipo = tipoSelect.value;
  const modelo = modeloSelect.value;
  if (tipo && modelo && CATALOGO[tipo]) {
    const produto = CATALOGO[tipo].find((p) => p.modelo === modelo);
    return produto ? produto.preco : null;
  }
  return null;
}

// ---- Add Item ----
function adicionarItem() {
  const tipo = tipoSelect.value;
  const modelo = modeloSelect.value;
  const quantidade = parseInt(quantidadeInput.value, 10);
  const preco = getPrecoSelecionado();

  // Validation
  if (!tipo) {
    tipoSelect.focus();
    return;
  }
  if (!modelo) {
    modeloSelect.focus();
    return;
  }
  if (!quantidade || quantidade < 1) {
    quantidadeInput.focus();
    return;
  }
  if (preco === null) {
    return;
  }

  itensOrcamento.push({
    tipo,
    modelo,
    quantidade,
    precoUnitario: preco,
    subtotal: preco * quantidade,
  });

  // Reset form
  tipoSelect.value = '';
  modeloSelect.innerHTML = '<option value="">Selecione o modelo...</option>';
  modeloSelect.disabled = true;
  quantidadeInput.value = 1;
  precoInput.value = '';
  tipoSelect.focus();

  renderizarTabela();
  calcularTotal();
  calcularCustoPorM2();
}

// ---- Remove Item ----
function removerItem(index) {
  itensOrcamento.splice(index, 1);
  renderizarTabela();
  calcularTotal();
  calcularCustoPorM2();
}

// ---- Render Table ----
function renderizarTabela() {
  if (itensOrcamento.length === 0) {
    tabelaBody.innerHTML = `
      <tr class="empty-state-row">
        <td colspan="7" class="empty-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.3;margin-bottom:8px"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="2" y1="9" x2="22" y2="9"/></svg>
          <span>Nenhum item adicionado ao orçamento</span>
        </td>
      </tr>`;
    return;
  }

  tabelaBody.innerHTML = itensOrcamento
    .map((item, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${item.tipo}</td>
        <td>${item.modelo}</td>
        <td>${item.quantidade}</td>
        <td>${formatBRL(item.precoUnitario)}</td>
        <td>${formatBRL(item.subtotal)}</td>
        <td><button class="btn-remover" onclick="removerItem(${i})">Remover</button></td>
      </tr>`)
    .join('');
}

// ---- Calculate Total ----
function calcularTotal() {
  const total = itensOrcamento.reduce((acc, item) => acc + item.subtotal, 0);
  totalEl.textContent = formatBRL(total);
  return total;
}

// ---- Calculate Cost per m² ----
function calcularCustoPorM2() {
  const area = parseFloat(areaInput.value);
  const total = itensOrcamento.reduce((acc, item) => acc + item.subtotal, 0);

  if (area > 0 && total > 0) {
    custoM2Row.style.display = 'flex';
    custoM2El.textContent = formatBRL(total / area);
  } else {
    custoM2Row.style.display = 'none';
    custoM2El.textContent = 'R$ 0,00';
  }
}

// ---- Clear Budget ----
function limparOrcamento() {
  itensOrcamento = [];
  renderizarTabela();
  calcularTotal();
  calcularCustoPorM2();
  areaInput.value = '';
}

// ---- Print Budget ----
function imprimirOrcamento() {
  window.print();
}

// ---- Initialize ----
document.addEventListener('DOMContentLoaded', () => {
  // Auth check
  if (typeof checkAuth === 'function') {
    const user = checkAuth();
    if (!user) {
      window.location.href = '/login/';
      return;
    }
    // Display user info
    const userNameEl = document.getElementById('userName');
    const userAvatarEl = document.getElementById('userAvatar');
    if (userNameEl && user.name) {
      userNameEl.textContent = user.name;
    }
    if (userAvatarEl && user.picture) {
      userAvatarEl.src = user.picture;
    }
  }

  // Event listeners
  tipoSelect.addEventListener('change', atualizarModelos);
  modeloSelect.addEventListener('change', atualizarPreco);
  areaInput.addEventListener('input', calcularCustoPorM2);

  // Focus on tipo dropdown
  tipoSelect.focus();
});
