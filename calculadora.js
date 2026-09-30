/* ========================================
   Lugh Lighting — Calculadora de Luminárias
   Ordem de cálculo conforme planilha
   ======================================== */

// ---- Product Catalog ----
// Preços = preço NF do fornecedor (com ICMS-SP incluso)
const CATALOGO = {
  'Perfis': [
    { modelo: 'Eklart - EKPF11 - Perfil de Embutir - 2,5 x 1,5 - Alumínio', preco: 46.45, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF11 - Perfil de Embutir - 2,5 x 1,5 - Branco/Preto', preco: 64.28, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF100 - Perfil de Embutir Recuado - 3,7x3,6 - Branco', preco: 290.80, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF12 - Perfil de Sobrepor - 2,0 x 1,5 - Alumínio', preco: 45.37, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF12 - Perfil de Sobrepor - 2,0 x 1,5 - Branco/Preto', preco: 62.94, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF21 - Perfil de Embutir - 2,3 x 0,9 - Alumínio', preco: 44.65, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF21 - Perfil de Embutir - 2,3 x 0,9 - Branco/Preto', preco: 63.02, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF22 - Perfil de Sobrepor - 2,0 x 0,9 - Alumínio', preco: 46.89, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF22 - Perfil de Sobrepor - 2,0 x 0,9 - Branco/Preto', preco: 63.00, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF32 - Perfil de Sobrepor 45 difuso - 1,6 x 1,6 - Alumínio', preco: 55.35, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF32 - Perfil de Sobrepor 45 difuso - 1,6 x 1,6 - Branco/Preto', preco: 71.48, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF86FLEX - Perfil Flexível de Silicone P/ Fita LED C 10m', preco: 789.40, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF1616FLEX - Perfil Flexível Silicone 1.6x1.6', preco: 58.70, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF1020FLEX - Perfil Flexível Silicone 2x1', preco: 47.10, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF191 - Perfil de Alumínio BR P/ Fita LED Sobrepor', preco: 395.41, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF33 - Perfil de Sobrepor 45 - 1,9 x 1,9 - Alumínio', preco: 66.90, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF33 - Perfil de Sobrepor 45 - 1,9 x 1,9 - Branco/Preto', preco: 84.70, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF57 - Perfil de Embutir - 3,5 x 3,5 - Alumínio', preco: 171.90, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF57 - Perfil de Embutir - 3,5 x 3,5 - Branco/Preto', preco: 192.80, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF61 - Perfil de Sobrepor - 3,5 x 3,5 - Alumínio', preco: 178.20, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF61 - Perfil de Sobrepor - 3,5 x 3,5 - Branco/Preto', preco: 199.10, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF64 - Perfil de Alumínio PR P/ Fita LED Pendente C 3m', preco: 307.60, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF88 - Perfil de Sobrepor/Embutir WW - 3,3 x 1,5 - Alumínio', preco: 100.20, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF88 - Perfil de Sobrepor/Embutir WW - 3,3 x 1,5 - Branco/Preto', preco: 123.20, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF95 - Perfil de Embutir NO FRAME - 8,8 x 1,9 - Alumínio', preco: 307.30, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF95 - Perfil de Embutir NO FRAME - 8,8 x 1,9 - Branco', preco: 330.30, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED9068 - Perfil de Embutir Indireto - 11W 2700K 12V', preco: 273.00, ncm: '9405.10.99' }
  ],
  'Fitas LED': [
    { modelo: 'Eklart - EKF5105958MM - Fita Led 5W 600lm/m 2700k 24V IP20', preco: 109.51, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF4148HL95 - Fita Led 5W 450lm/m 2700k 12V IP20', preco: 77.67, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF5105COB95 - Fita Led COB 5W 450lm/m 2700k 24V IP20', preco: 202.57, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF51964MM - Fita Led 10W 4.6mm 950lm/m 2700k 24V IP20', preco: 202.57, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF51964MM - Fita LED SLIM 10W/M 2700K IP20 5M', preco: 104.70, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF5196HL90 - Fita Led 10W 950lm/m 2700k 24V IRC90', preco: 115.00, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF5196HL95 - Fita Led 10W 950lm/m 2700k 24V IRC95', preco: 120.75, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF5114HL90 - Fita Led 14W 1500lm/m 2700k 24V IRC90', preco: 150.50, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF5114HL95 - Fita Led 14W 1400lm/m 2700k 24V IRC90', preco: 159.16, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF5116HL95 - Fita Led 16W 1800lm/m 2700k 24V IRC95', preco: 203.59, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF5116HL90 - Fita Led 16W 1840lm/m 2700k 24V IRC90', preco: 193.90, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF5216HL95 - Fita LED 176LEDS/M 16W/M 3000K IRC>95', preco: 203.59, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF5124HL95 - Fita Led 24W 2800lm/m 2700k 24V IRC95', preco: 295.19, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF514812010PRO - Fita LED PRO 5W/M 2700K 10M', preco: 402.40, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF51406000 - Fita Led 40W 6000lm/m 2700k 24V IRC80', preco: 196.80, ncm: '9405.40.90' }
  ],
  'Fontes e Controladores': [
    { modelo: 'Eklart - EK-CYX-35-24 - Fonte Blindada 35W 24V IP67', preco: 115.80, ncm: '8504.40.21' },
    { modelo: 'Eklart - EK-CYX-75-24 - Fonte Blindada 75W 24V IP67', preco: 182.85, ncm: '8504.40.21' },
    { modelo: 'Eklart - EK-CYX-100-24 - Fonte Blindada 100W 24V IP67', preco: 205.00, ncm: '8504.40.21' },
    { modelo: 'Eklart - EK-CYX-150-24 - Fonte Blindada 150W 24V IP67', preco: 229.75, ncm: '8504.40.21' },
    { modelo: 'Eklart - EK2130036FS - Fonte Slim 36W 24V IP20', preco: 69.30, ncm: '8504.40.21' },
    { modelo: 'Eklart - EK1115018FS - Fonte Slim 12V 1.5A 18W IP20', preco: 39.30, ncm: '8504.40.21' },
    { modelo: 'Eklart - EK2150060FS - Fonte Slim 60W 24V IP20', preco: 91.00, ncm: '8504.40.21' },
    { modelo: 'Eklart - EK110024DIMF - Fonte 100W 24V 127V DIM', preco: 407.92, ncm: '8504.40.21' },
    { modelo: 'Eklart - EKA-35FGB-24 - Fonte Aberta 35W 24V IP20', preco: 72.76, ncm: '8504.40.21' },
    { modelo: 'Eklart - EKA-75FAM-24 - Fonte Aberta 75W 24V IP20', preco: 97.00, ncm: '8504.40.21' },
    { modelo: 'Eklart - EKA-100FGC-24 - Fonte Aberta 100W 24V IP20', preco: 108.00, ncm: '8504.40.21' },
    { modelo: 'Eklart - EKA-200FKD-24P - Fonte Alimentação PROU 24V 200W IP20', preco: 275.63, ncm: '8504.40.21' },
    { modelo: 'Eklart - EKA-150FGD-24 - Fonte Aberta 150W 24V IP20', preco: 142.26, ncm: '8504.40.21' },
    { modelo: 'Eklart - EK2183100FS - Fonte Slim Aberta 100W 24V IP20', preco: 116.55, ncm: '8504.40.21' },
    { modelo: 'Eklart - EK2162150FS - Fonte Slim Aberta 150W 24V IP20', preco: 152.90, ncm: '8504.40.21' },
    { modelo: 'Eklart - EK02060DIMF - Fonte Dimerizavel TRIAC 60W 24V IP20', preco: 310.25, ncm: '8504.40.21' },
    { modelo: 'Eklart - EK02120DIMF - Fonte Dimerizavel TRIAC 100W 24V 110V', preco: 407.92, ncm: '8504.40.21' },
    { modelo: 'Eklart - EKA-500FKG-24P - Fonte 500W 24V IP20 BIV', preco: 611.89, ncm: '8504.40.21' },
    { modelo: 'Eklart - EKA-350FGF-24 - Fonte 350W 24V IP20 BIV', preco: 231.53, ncm: '8504.40.21' },
    { modelo: 'Eklart - EK110506FM - Fonte 6W 12V ON/OFF BIV', preco: 28.55, ncm: '8504.40.21' },
    { modelo: 'Eklart - EKM1M33A - Controladora Dimerizável Wireless', preco: 210.10, ncm: '8504.40.21' },
    { modelo: 'Eklart - EKAMP - Amplificador de Sinal', preco: 228.40, ncm: '8504.40.21' }
  ],
  'Embutidos de Solo': [
    { modelo: 'Directlight - DL EB1 - Emb. Solo 2,7W 11º/34º BIV/12V', preco: 174.95, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL EB1 - Emb. Solo 2,7W 20X65º BIV/12V', preco: 185.03, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL EB3 - Emb. Solo 7,6W 11º/34º BIV/12V', preco: 77.73, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL EB5 - Emb. Solo 7,6W 34º BIV', preco: 308.39, ncm: '9405.10.99' }
  ],
  'Espetos': [
    { modelo: 'Directlight - DL EP1 - Espeto 2,7W 11º/34º BIV/12V', preco: 179.41, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL EP3 - Espeto 1,5W 11º BIV', preco: 120.40, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL EP2 - Espeto 7,6W 34º BIV', preco: 316.69, ncm: '9405.10.99' }
  ],
  'Arandelas e Balizadores': [
    { modelo: 'Directlight - DL AR8 - Arandela 2,7W 120º 12V', preco: 167.54, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL AR8 - Arandela 2,7W 120º BIV', preco: 305.00, ncm: '9405.10.99' },
    { modelo: 'Interlight - 7450.S.PM - Poste Balizador 6W 90º IP65', preco: 242.00, ncm: '9405.10.99' },
    { modelo: 'Interlight - 3960C.S.PM - Balizador 1W 40º IP65 BIV', preco: 93.18, ncm: '9405.10.99' },
    { modelo: 'Diversos - Balizador Mini 1,5W 60º BIV', preco: 75.78, ncm: '9405.10.99' }
  ],
  'Spots e Projetores': [
    { modelo: 'Directlight - DL SP1 - Spot 2,7W 11º/34º BIV', preco: 167.54, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL SP2 - Spot 7,6W 11º/34º BIV', preco: 310.93, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL TT5 - Spot 2,7W 11º/34º BIV', preco: 163.10, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL TT14 - Spot 2,7W 11º/34º BIV', preco: 153.73, ncm: '9405.10.99' },
    { modelo: 'Interlight - 7400-UA-S - Projetor P/ Tronco 6W 90º IP65', preco: 224.77, ncm: '9405.10.99' },
    { modelo: 'Interlight - 7401-MA-S - Projetor P/ Haste 6W 60º IP65', preco: 236.24, ncm: '9405.10.99' }
  ],
  'Embutidos': [
    { modelo: 'Misterled - SLED1150 - Mini Emb. 2,5W 20º BIV', preco: 57.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1200 - Embutido 1,5W BIV', preco: 68.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1200 - Embutido 3W BIV', preco: 80.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1220 - Embutido 6W IP65', preco: 137.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1230 - Embutido 6W 35º BIV', preco: 114.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1231 - Embutido NO-FRAME 6W BIV', preco: 126.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1232 - Embutido 10W 15º BIV', preco: 149.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1233 - Embutido NO-FRAME 10W BIV', preco: 161.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1234 - Embutido 20W 15º BIV', preco: 241.00, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4581 - Embutido Orientavel 3W BIV', preco: 88.62, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4582 - Embutido Orientavel 7W BIV', preco: 134.88, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4411/4481 - Embutido 3W IP54 BIV', preco: 135.60, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4991 - Embutido 3W 12º BIV', preco: 74.14, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4992 - Embutido 7W BIV', preco: 115.68, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4995.AS.S.PM - Embutido Assimetrico 6W', preco: 202.27, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4894 - Embutido 10W BIV', preco: 220.71, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4583 - Embutido Orientavel 14W BIV', preco: 237.94, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4412.FE.S - Embutido NO-FRAME 7W BIV', preco: 159.41, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4413.FE.S - Embutido NO-FRAME 10W BIV', preco: 271.03, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4495.AS.S - Embutido Wallwasher 10W BIV', preco: 381.66, ncm: '9405.10.99' },
    { modelo: 'Diversos - Spot semi-embutido 1,5W 30º 12V', preco: 87.87, ncm: '9405.10.99' },
    { modelo: 'Diversos - Spot mini embutido 1,5W 12V', preco: 56.37, ncm: '9405.10.99' },
    { modelo: 'Stella - STL25901BR/27 - Spot semi-embutido 1,5W', preco: 87.87, ncm: '9405.10.99' },
    { modelo: 'W22 - SLED 9084', preco: 154.00, ncm: '9405.10.99' }
  ],
  'Painéis e Plafons': [
    { modelo: 'Diversos - Painel de Embutir 14W 3000K', preco: 48.36, ncm: '9405.10.99' },
    { modelo: 'Diversos - Painel de Sobrepor 17W 3000K', preco: 87.87, ncm: '9405.10.99' },
    { modelo: 'Diversos - Painel de Embutir 20W 3000K', preco: 67.33, ncm: '9405.10.99' },
    { modelo: 'Diversos - Painel Embutir S. Recuado 10W', preco: 37.00, ncm: '9405.10.99' },
    { modelo: 'Diversos - Painel Embutir S. Recuado 20W', preco: 79.90, ncm: '9405.10.99' },
    { modelo: 'Diversos - STH21964Q/30 - Painel Sobrepor 24W', preco: 103.04, ncm: '9405.10.99' },
    { modelo: 'Stella - STH20903BR/30 - Painel Sobrepor 17W Branco', preco: 62.27, ncm: '9405.10.99' },
    { modelo: 'Stella - STL23905PTO/30', preco: 254.37, ncm: '9405.10.99' }
  ],
  'Acessórios e Diversos': [
    { modelo: 'Interlight - ACS.0144 - Acessório Cinta 50CM', preco: 21.40, ncm: '9405.99.00' },
    { modelo: 'Interlight - HST-1800 - Haste para luminarias 1,80m', preco: 127.86, ncm: '9405.99.00' },
    { modelo: 'Interlight - HST-1200 - Haste para luminarias 1,20m', preco: 96.85, ncm: '9405.99.00' }
  ]
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
