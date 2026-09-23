/* ========================================
   Lugh Lighting — Calculadora de Luminárias
   ======================================== */

// ---- Alíquotas de Impostos (SP → MG) ----
const IMPOSTOS = {
  ICMS_INTERESTADUAL: 0.12,  // 12% já incluso no preço NF do fornecedor SP
  ICMS_INTERNO_MG: 0.18,     // 18% alíquota interna MG
  DIFAL: 0.06,               // 18% - 12% = 6%
  PIS: 0.0165,               // 1,65%
  COFINS: 0.076,             // 7,6%
  IPI: 0.05,                 // 5% padrão (varia por NCM, pode ser ajustado por produto)
};

// ---- Product Catalog ----
// Preços = preço NF do fornecedor (com ICMS-SP incluso)
// ipi = alíquota IPI específica do produto (se diferente do padrão)
const CATALOGO = {
  'Embutida': [
    { modelo: 'Embutida Quadrada 12W', preco: 89.90, ncm: '9405.10.99', ipi: 0.05 },
    { modelo: 'Embutida Redonda 18W', preco: 119.90, ncm: '9405.10.99', ipi: 0.05 },
    { modelo: 'Embutida Quadrada 24W', preco: 149.90, ncm: '9405.10.99', ipi: 0.05 },
  ],
  'Sobrepor': [
    { modelo: 'Plafon Sobrepor 20W', preco: 129.90, ncm: '9405.10.99', ipi: 0.05 },
    { modelo: 'Plafon Sobrepor 30W', preco: 179.90, ncm: '9405.10.99', ipi: 0.05 },
  ],
  'Pendente': [
    { modelo: 'Pendente Cilíndrico', preco: 259.90, ncm: '9405.10.99', ipi: 0.05 },
    { modelo: 'Pendente Industrial', preco: 349.90, ncm: '9405.10.99', ipi: 0.05 },
    { modelo: 'Pendente Decorativo', preco: 449.90, ncm: '9405.10.99', ipi: 0.05 },
  ],
  'Trilho/Spot': [
    { modelo: 'Spot Trilho 7W', preco: 79.90, ncm: '9405.10.99', ipi: 0.05 },
    { modelo: 'Spot Trilho 12W', preco: 109.90, ncm: '9405.10.99', ipi: 0.05 },
    { modelo: 'Trilho 1m + 3 Spots', preco: 389.90, ncm: '9405.10.99', ipi: 0.05 },
  ],
  'Fita LED': [
    { modelo: 'Fita LED 5m 4000K', preco: 89.90, ncm: '9405.40.90', ipi: 0.05 },
    { modelo: 'Fita LED 5m RGB', preco: 139.90, ncm: '9405.40.90', ipi: 0.05 },
    { modelo: 'Fita LED 5m Profissional', preco: 199.90, ncm: '9405.40.90', ipi: 0.05 },
  ],
  'Arandela': [
    { modelo: 'Arandela Efeito 6W', preco: 99.90, ncm: '9405.10.99', ipi: 0.05 },
    { modelo: 'Arandela Facho Duplo 12W', preco: 159.90, ncm: '9405.10.99', ipi: 0.05 },
  ],
};

// ---- State ----
let itensOrcamento = [];

// ---- Formatting ----
function formatBRL(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// ---- Update Models Dropdown ----
function atualizarModelos() {
  const tipoSelect = document.getElementById('tipoLuminaria');
  const modeloSelect = document.getElementById('modeloLuminaria');
  const precoInput = document.getElementById('precoUnitario');
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
  const tipo = document.getElementById('tipoLuminaria').value;
  const modelo = document.getElementById('modeloLuminaria').value;
  const precoInput = document.getElementById('precoUnitario');

  if (tipo && modelo && CATALOGO[tipo]) {
    const produto = CATALOGO[tipo].find((p) => p.modelo === modelo);
    if (produto) {
      precoInput.value = formatBRL(produto.preco);
      return;
    }
  }
  precoInput.value = '';
}

// ---- Get Selected Product ----
function getProdutoSelecionado() {
  const tipo = document.getElementById('tipoLuminaria').value;
  const modelo = document.getElementById('modeloLuminaria').value;
  if (tipo && modelo && CATALOGO[tipo]) {
    return CATALOGO[tipo].find((p) => p.modelo === modelo) || null;
  }
  return null;
}

// ---- Add Item ----
function adicionarItem() {
  const tipoSelect = document.getElementById('tipoLuminaria');
  const modeloSelect = document.getElementById('modeloLuminaria');
  const quantidadeInput = document.getElementById('quantidade');

  const tipo = tipoSelect.value;
  const produto = getProdutoSelecionado();
  const quantidade = parseInt(quantidadeInput.value, 10);

  if (!tipo) { tipoSelect.focus(); return; }
  if (!produto) { modeloSelect.focus(); return; }
  if (!quantidade || quantidade < 1) { quantidadeInput.focus(); return; }

  itensOrcamento.push({
    tipo,
    modelo: produto.modelo,
    ncm: produto.ncm,
    ipi: produto.ipi || IMPOSTOS.IPI,
    quantidade,
    precoUnitario: produto.preco,
    subtotal: produto.preco * quantidade,
  });

  // Reset form
  tipoSelect.value = '';
  modeloSelect.innerHTML = '<option value="">Selecione o modelo...</option>';
  modeloSelect.disabled = true;
  quantidadeInput.value = 1;
  document.getElementById('precoUnitario').value = '';
  tipoSelect.focus();

  renderizarTabela();
  recalcularTudo();
}

// ---- Remove Item ----
function removerItem(index) {
  itensOrcamento.splice(index, 1);
  renderizarTabela();
  recalcularTudo();
}

// ---- Render Table ----
function renderizarTabela() {
  const tabelaBody = document.getElementById('tabelaItens');

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

// ---- Recalculate Everything ----
function recalcularTudo() {
  const margem = parseFloat(document.getElementById('margemLucro').value) || 0;
  const impostoNFPercent = parseFloat(document.getElementById('impostoNFRevenda').value) || 0;
  const custoRT = parseFloat(document.getElementById('custoRT').value) || 0;
  const custoFrete = parseFloat(document.getElementById('custoFrete').value) || 0;
  const area = parseFloat(document.getElementById('areaAmbiente').value) || 0;

  // Subtotal dos produtos (preço NF fornecedor)
  const subtotalProdutos = itensOrcamento.reduce((acc, item) => acc + item.subtotal, 0);

  // Calcular IPI por item (cada produto pode ter alíquota diferente)
  const totalIPI = itensOrcamento.reduce((acc, item) => {
    return acc + (item.subtotal * (item.ipi || IMPOSTOS.IPI));
  }, 0);

  // Base para os demais impostos
  const baseTributavel = subtotalProdutos;

  // DIFAL = (ICMS_MG - ICMS_INTERESTADUAL) sobre o preço
  const valorDifal = baseTributavel * IMPOSTOS.DIFAL;

  // PIS e COFINS sobre o faturamento (preço de revenda)
  const valorPis = baseTributavel * IMPOSTOS.PIS;
  const valorCofins = baseTributavel * IMPOSTOS.COFINS;

  // Total com impostos de compra
  const totalComImpostos = subtotalProdutos + totalIPI + valorDifal + valorPis + valorCofins;

  // Margem de lucro sobre o total com impostos
  const valorMargem = totalComImpostos * (margem / 100);

  // Preço de venda (base para o imposto da NF de revenda)
  const precoVenda = totalComImpostos + valorMargem;

  // Imposto sobre a NF de revenda emitida pela Lugh (ICMS MG + Simples/LP)
  const valorImpostoNF = precoVenda * (impostoNFPercent / 100);

  // Total final
  const totalFinal = precoVenda + valorImpostoNF + custoRT + custoFrete;

  // Atualizar UI
  document.getElementById('subtotalProdutos').textContent = formatBRL(subtotalProdutos);
  document.getElementById('valorDifal').textContent = formatBRL(valorDifal);
  document.getElementById('valorIpi').textContent = formatBRL(totalIPI);
  document.getElementById('valorPis').textContent = formatBRL(valorPis);
  document.getElementById('valorCofins').textContent = formatBRL(valorCofins);
  document.getElementById('totalComImpostos').textContent = formatBRL(totalComImpostos);

  document.getElementById('margemLabel').textContent = margem;
  document.getElementById('valorMargem').textContent = formatBRL(valorMargem);

  document.getElementById('impostoNFLabel').textContent = impostoNFPercent.toLocaleString('pt-BR');
  document.getElementById('valorImpostoNF').textContent = formatBRL(valorImpostoNF);

  document.getElementById('valorRT').textContent = formatBRL(custoRT);
  document.getElementById('valorFrete').textContent = formatBRL(custoFrete);

  document.getElementById('totalFinal').textContent = formatBRL(totalFinal);

  // Custo por m²
  const custoM2Row = document.getElementById('custoM2Row');
  if (area > 0 && totalFinal > 0) {
    custoM2Row.style.display = 'flex';
    document.getElementById('custoM2').textContent = formatBRL(totalFinal / area);
  } else {
    custoM2Row.style.display = 'none';
  }
}

// ---- Clear Budget ----
function limparOrcamento() {
  itensOrcamento = [];
  renderizarTabela();
  document.getElementById('areaAmbiente').value = '';
  recalcularTudo();
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
  document.getElementById('tipoLuminaria').addEventListener('change', atualizarModelos);
  document.getElementById('modeloLuminaria').addEventListener('change', atualizarPreco);

  // Initial calculation
  recalcularTudo();

  // Focus
  document.getElementById('tipoLuminaria').focus();
});
