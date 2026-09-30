/* ========================================
   Lugh Lighting — Calculadora de Luminárias
   Ordem de cálculo conforme planilha
   ======================================== */

// ---- Product Catalog ----
// Preços = preço NF do fornecedor (com ICMS-SP incluso)
const CATALOGO = {
  'Embutida': [
    { modelo: 'Embutida Quadrada 12W', preco: 89.90, ncm: '9405.10.99' },
    { modelo: 'Embutida Redonda 18W', preco: 119.90, ncm: '9405.10.99' },
    { modelo: 'Embutida Quadrada 24W', preco: 149.90, ncm: '9405.10.99' },
  ],
  'Sobrepor': [
    { modelo: 'Plafon Sobrepor 20W', preco: 129.90, ncm: '9405.10.99' },
    { modelo: 'Plafon Sobrepor 30W', preco: 179.90, ncm: '9405.10.99' },
  ],
  'Pendente': [
    { modelo: 'Pendente Cilíndrico', preco: 259.90, ncm: '9405.10.99' },
    { modelo: 'Pendente Industrial', preco: 349.90, ncm: '9405.10.99' },
    { modelo: 'Pendente Decorativo', preco: 449.90, ncm: '9405.10.99' },
  ],
  'Trilho/Spot': [
    { modelo: 'Spot Trilho 7W', preco: 79.90, ncm: '9405.10.99' },
    { modelo: 'Spot Trilho 12W', preco: 109.90, ncm: '9405.10.99' },
    { modelo: 'Trilho 1m + 3 Spots', preco: 389.90, ncm: '9405.10.99' },
  ],
  'Fita LED': [
    { modelo: 'Fita LED 5m 4000K', preco: 89.90, ncm: '9405.40.90' },
    { modelo: 'Fita LED 5m RGB', preco: 139.90, ncm: '9405.40.90' },
    { modelo: 'Fita LED 5m Profissional', preco: 199.90, ncm: '9405.40.90' },
  ],
  'Arandela': [
    { modelo: 'Arandela Efeito 6W', preco: 99.90, ncm: '9405.10.99' },
    { modelo: 'Arandela Facho Duplo 12W', preco: 159.90, ncm: '9405.10.99' },
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

// =============================================
// RECALCULAR TUDO — Segue a ordem da planilha
// =============================================
function recalcularTudo() {
  // Ler parâmetros
  const percDifal = parseFloat(document.getElementById('percDifal').value) || 0;
  const percIpi = parseFloat(document.getElementById('percIpi').value) || 0;
  const percPis = parseFloat(document.getElementById('percPis').value) || 0;
  const percCofins = parseFloat(document.getElementById('percCofins').value) || 0;
  const freteFabrica = parseFloat(document.getElementById('freteFabrica').value) || 0;
  const moProjetista = parseFloat(document.getElementById('moProjetista').value) || 0;
  const area = parseFloat(document.getElementById('areaAmbiente').value) || 0;
  const freteCliente = parseFloat(document.getElementById('freteCliente').value) || 0;
  const percMargem = parseFloat(document.getElementById('margemLucro').value) || 0;
  const percSimples = parseFloat(document.getElementById('percSimples').value) || 0;
  const percRT = parseFloat(document.getElementById('percRT').value) || 0;

  // ========================================
  // CUSTO PRODUTOS
  // ========================================

  // 1. VALOR PRODUTOS (subtotal dos itens)
  const valorProdutos = itensOrcamento.reduce((acc, item) => acc + item.subtotal, 0);

  // 2. DIFAL (6% a 13%)
  const valorDifal = valorProdutos * (percDifal / 100);

  // 3. IPI (5%)
  const valorIpi = valorProdutos * (percIpi / 100);

  // 4. PIS (1,65%)
  const valorPis = valorProdutos * (percPis / 100);

  // 5. COFINS (7,6%)
  const valorCofins = valorProdutos * (percCofins / 100);

  // 6. FRETE FÁBRICA (valor fixo)
  // já lido acima

  // 7. M.O. PROJETISTA POR M²
  const valorMO = moProjetista * area;

  // 8. TOTAL PRODUTOS COM IMPOSTOS
  const totalProdutosImpostos = valorProdutos + valorDifal + valorIpi + valorPis + valorCofins + freteFabrica + valorMO;

  // ========================================
  // OUTROS CUSTOS E MARGEM
  // ========================================

  // 9. FRETE ENTREGA CLIENTE FINAL (valor fixo)
  // já lido acima

  // 10. MARGEM DE LUCRO (38%)
  const baseMargem = totalProdutosImpostos + freteCliente;
  const valorMargem = baseMargem * (percMargem / 100);

  // 11. TOTAL PRODUTOS PARA VENDA ANTES DOS IMPOSTOS
  const totalAntesImpostos = baseMargem + valorMargem;

  // ========================================
  // IMPOSTOS SOBRE VENDA
  // ========================================

  // 12. IMPOSTO SIMPLES NACIONAL (15%)
  const valorSimples = totalAntesImpostos * (percSimples / 100);

  // 13. RT ARQUITETO (10%)
  const valorRT = totalAntesImpostos * (percRT / 100);

  // ========================================
  // VALOR DE VENDA
  // ========================================
  const valorVenda = totalAntesImpostos + valorSimples + valorRT;

  // ========================================
  // ATUALIZAR UI
  // ========================================

  // Labels dinâmicos
  document.getElementById('difalLabel').textContent = percDifal.toLocaleString('pt-BR');
  document.getElementById('ipiLabel').textContent = percIpi.toLocaleString('pt-BR');
  document.getElementById('pisLabel').textContent = percPis.toLocaleString('pt-BR');
  document.getElementById('cofinsLabel').textContent = percCofins.toLocaleString('pt-BR');
  document.getElementById('margemLabel').textContent = percMargem.toLocaleString('pt-BR');
  document.getElementById('simplesLabel').textContent = percSimples.toLocaleString('pt-BR');
  document.getElementById('rtLabel').textContent = percRT.toLocaleString('pt-BR');

  // Custo Produtos
  document.getElementById('valorProdutos').textContent = formatBRL(valorProdutos);
  document.getElementById('valorDifal').textContent = formatBRL(valorDifal);
  document.getElementById('valorIpi').textContent = formatBRL(valorIpi);
  document.getElementById('valorPis').textContent = formatBRL(valorPis);
  document.getElementById('valorCofins').textContent = formatBRL(valorCofins);
  document.getElementById('valorFreteFabrica').textContent = formatBRL(freteFabrica);
  document.getElementById('valorMO').textContent = formatBRL(valorMO);
  document.getElementById('totalProdutosImpostos').textContent = formatBRL(totalProdutosImpostos);

  // Outros Custos e Margem
  document.getElementById('valorFreteCliente').textContent = formatBRL(freteCliente);
  document.getElementById('valorMargem').textContent = formatBRL(valorMargem);
  document.getElementById('totalAntesImpostos').textContent = formatBRL(totalAntesImpostos);

  // Impostos sobre venda
  document.getElementById('valorSimples').textContent = formatBRL(valorSimples);
  document.getElementById('valorRT').textContent = formatBRL(valorRT);

  // Valor de Venda
  document.getElementById('valorVenda').textContent = formatBRL(valorVenda);

  // Valor por m²
  const custoM2Row = document.getElementById('custoM2Row');
  if (area > 0 && valorVenda > 0) {
    custoM2Row.style.display = 'flex';
    document.getElementById('custoM2').textContent = formatBRL(valorVenda / area);
  } else {
    custoM2Row.style.display = 'none';
  }
}

// ---- Clear Budget ----
function limparOrcamento() {
  itensOrcamento = [];
  renderizarTabela();
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
