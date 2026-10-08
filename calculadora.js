/* ========================================
   Lugh Lighting — Calculadora de Luminárias
   Ordem de cálculo conforme planilha
   ======================================== */

// ---- Product Catalog ----
// Preços = preço NF do fornecedor (com ICMS-SP incluso)
const CATALOGO = {
  'Perfis': [
    { modelo: 'Perfil de Embutir - 2,5 x 1,5', preco: 46.45, ncm: '9405.10.99' },
    { modelo: 'Perfil de Embutir - 2,5 x 1,5', preco: 64.28, ncm: '9405.10.99' },
    { modelo: 'Perfil de Embutir - 2,5 x 1,5', preco: 64.28, ncm: '9405.10.99' },
    { modelo: 'Perfil de Embutir Recuado - 3,7x3,6', preco: 290.8, ncm: '9405.10.99' },
    { modelo: 'Perfil de Sobrepor - 2,0 x 1,5', preco: 45.37, ncm: '9405.10.99' },
    { modelo: 'Perfil de Sobrepor - 2,0 x 1,5', preco: 62.94, ncm: '9405.10.99' },
    { modelo: 'Perfil de Sobrepor - 2,0 x 1,5', preco: 62.94, ncm: '9405.10.99' },
    { modelo: 'Perfil de Embutir - 2,3 x 0,9', preco: 44.65, ncm: '9405.10.99' },
    { modelo: 'Perfil de Embutir - 2,3 x 0,9', preco: 63.02, ncm: '9405.10.99' },
    { modelo: 'Perfil de Embutir - 2,3 x 0,9', preco: 63.02, ncm: '9405.10.99' },
    { modelo: 'Perfil de Sobrepor - 2,0 x 0,9', preco: 46.89, ncm: '9405.10.99' },
    { modelo: 'Perfil de Sobrepor - 2,0 x 0,9', preco: 63.0, ncm: '9405.10.99' },
    { modelo: 'Perfil de Sobrepor - 2,0 x 0,9', preco: 63.0, ncm: '9405.10.99' },
    { modelo: 'Perfil de Sobrepor 45 difuso - 1,6 x 1,6', preco: 55.35, ncm: '9405.10.99' },
    { modelo: 'Perfil de Sobrepor 45 difuso - 1,6 x 1,6', preco: 71.48, ncm: '9405.10.99' },
    { modelo: 'Perfil de Sobrepor 45 difuso - 1,6 x 1,6', preco: 71.48, ncm: '9405.10.99' },
    { modelo: 'Perfil de Sobrepor 45 difuso - 1,6 x 1,6', preco: 83.05, ncm: '9405.10.99' },
    { modelo: 'Perfil Flexível de Silicone Para Fita LED com Difusor Leitoso C 10m', preco: 789.4, ncm: '9405.10.99' },
    { modelo: 'Perfil Flexível de Silicone Para Fita LED com Difusor Leitoso C50m x A1.6cm x L1.6cm (VENDA A METRO)', preco: 58.7, ncm: '9405.10.99' },
    { modelo: 'Perfil Flexível de Silicone Para Fita LED com Difusor Leitoso 50m x A 2cm x L 1cm (VENDA A METRO)', preco: 47.1, ncm: '9405.10.99' },
    { modelo: 'Perfil de Alumínio BR P/ Fita LED com Difusor Leitoso P/ Soprepor/Rodateto C 3m X A 3.5cm X L 3.5cm', preco: 395.41, ncm: '9405.10.99' },
    { modelo: 'Perfil de Sobrepor 45 - 1,9 x 1,9', preco: 66.9, ncm: '9405.10.99' },
    { modelo: 'Perfil de Sobrepor 45 - 1,9 x 1,9', preco: 84.7, ncm: '9405.10.99' },
    { modelo: 'Perfil de Sobrepor 45 - 1,9 x 1,9', preco: 84.7, ncm: '9405.10.99' },
    { modelo: 'Perfil de Embutir - 3,5 x 3,5', preco: 171.9, ncm: '9405.10.99' },
    { modelo: 'Perfil de Embutir - 3,5 x 3,5', preco: 192.8, ncm: '9405.10.99' },
    { modelo: 'Perfil de Embutir - 3,5 x 3,5', preco: 192.8, ncm: '9405.10.99' },
    { modelo: 'Perfil de Sobrepor - 3,5 x 3,5', preco: 178.2, ncm: '9405.10.99' },
    { modelo: 'Perfil de Sobrepor - 3,5 x 3,5', preco: 199.1, ncm: '9405.10.99' },
    { modelo: 'Perfil de Sobrepor - 3,5 x 3,5', preco: 199.1, ncm: '9405.10.99' },
    { modelo: 'Perfil de Alumínio PR Para Fita LED com Difusor Leitoso Sobrepor/ Pendente C 3m X A 5cm X L 3.6cm', preco: 307.6, ncm: '9405.10.99' },
    { modelo: 'Perfil de Sobrepor / Embutir WW - 3,3 x 1,5', preco: 100.2, ncm: '9405.10.99' },
    { modelo: 'Perfil de Sobrepor / Embutir WW - 3,3 x 1,5', preco: 123.2, ncm: '9405.10.99' },
    { modelo: 'Perfil de Sobrepor / Embutir WW - 3,3 x 1,5', preco: 123.2, ncm: '9405.10.99' },
    { modelo: 'Perfil de Embutir NO FRAME - 8,8 x 1,9', preco: 307.3, ncm: '9405.10.99' },
    { modelo: 'Perfil de Embutir NO FRAME - 8,8 x 1,9', preco: 330.3, ncm: '9405.10.99' },
    { modelo: 'Perfil de Embutir Indireto - 11W - 770LM - IRC95 - 2700K - 12V', preco: 273.0, ncm: '9405.10.99' }
  ],
  'Fitas': [
    { modelo: 'Fita Led 5W - 600lm/m - 2700k - 24V - IRC95 - IP20', preco: 109.51, ncm: '9405.40.90' },
    { modelo: 'Fita Led 5W - 450lm/m - 2700k - 12V - IRC95 - IP20', preco: 77.67, ncm: '9405.40.90' },
    { modelo: 'Fita Led 5W COB - 450lm/m - 2700k - 24V - IRC95 - IP20', preco: 202.57, ncm: '9405.40.90' },
    { modelo: 'Fita Led 10W 4.6mm - 950lm/m - 2700k - 24V - IRC90 - IP20', preco: 202.57, ncm: '9405.40.90' },
    { modelo: 'Fita LED SLIM 2835 120LEDS/M 4.6MM 24V 10W/M IP20 2700K IRC>90 950LM/M 5M/Rolo', preco: 104.7, ncm: '9405.40.90' },
    { modelo: 'Fita Led 10W - 950lm/m - 2700k - 24V - IRC90 - IP20', preco: 115.0, ncm: '9405.40.90' },
    { modelo: 'Fita Led 10W - 950lm/m - 2700k - 24V - IRC95 - IP20', preco: 120.75, ncm: '9405.40.90' },
    { modelo: 'Fita Led 14W - 1500lm/m - 2700k - 24V - IRC90 - IP20', preco: 150.5, ncm: '9405.40.90' },
    { modelo: 'Fita Led 14W - 1400lm/m - 2700k - 24V - IRC90 - IP20', preco: 159.16, ncm: '9405.40.90' },
    { modelo: 'Fita Led 16W - 1800lm/m - 2700k - 24V - IRC95 - IP20', preco: 203.59, ncm: '9405.40.90' },
    { modelo: 'Fita Led 16W - 1840lm/m - 2700k - 24V - IRC90 - IP20', preco: 193.9, ncm: '9405.40.90' },
    { modelo: 'Fita Led 16W - 1800lm/m - 2700k - 24V - IRC90 - IP20', preco: 203.59, ncm: '9405.40.90' },
    { modelo: 'Fita LED 2835 176LEDS/M 24V 16W/M IP20 3000K IRC>95 1900LM/M 5M/Rolo', preco: 203.59, ncm: '9405.40.90' },
    { modelo: 'Fita Led 24W - 2800lm/m - 2700k - 24V - IRC95 - IP20', preco: 295.19, ncm: '9405.40.90' },
    { modelo: 'Fita LED PRO 2835 120LEDS/M 24V 5W/M IP20 2700K IRC98 425LM/M 10M/Rolo', preco: 402.4, ncm: '9405.40.90' },
    { modelo: 'Fita Led 40W - 6000lm/m - 2700k - 24V - IRC80 - IP20', preco: 196.8, ncm: '9405.40.90' },
    { modelo: 'Fita Led 5W - 600lm/m - 2700k - 24V - IRC95 - IP20', preco: 39.3, ncm: '9405.40.90' }
  ],
  'Fontes': [
    { modelo: 'Fonte de alimentação Blindada - 35W - 24V - IP67 - BIV', preco: 115.8, ncm: '8504.40.21' },
    { modelo: 'Fonte de alimentação Blindada - 75W - 24V - IP67 - BIV', preco: 182.85, ncm: '8504.40.21' },
    { modelo: 'Fonte de alimentação Blindada - 100W - 24V - IP67 - BIV', preco: 205.0, ncm: '8504.40.21' },
    { modelo: 'Fonte de alimentação Blindada - 150W - 24V - IP67 - BIV', preco: 229.75, ncm: '8504.40.21' },
    { modelo: 'Fonte de alimentação Slim - 36W - 24V - IP20 - BIV', preco: 69.3, ncm: '8504.40.21' },
    { modelo: 'Fonte de alimentação Slim 12V 1,5A 18W IP20', preco: 39.3, ncm: '8504.40.21' },
    { modelo: 'Fonte de alimentação Slim - 60W - 24V - IP20 - BIV', preco: 91.0, ncm: '8504.40.21' },
    { modelo: 'Fonte 100W - 24V - 127V - DIM', preco: 407.92, ncm: '8504.40.21' },
    { modelo: 'Fonte de alimentação Aberta - 35W - 24V - IP20 - BIV', preco: 72.76, ncm: '8504.40.21' },
    { modelo: 'Fonte de alimentação Aberta - 75W - 24V - IP20 - BIV', preco: 97.0, ncm: '8504.40.21' },
    { modelo: 'Fonte de alimentação Aberta - 100W - 24V - IP20 - BIV', preco: 108.0, ncm: '8504.40.21' },
    { modelo: 'Fonte de Alimentação PROU 24V 8,3A 200W IP20 FP 0.95 Bivolt', preco: 275.63, ncm: '8504.40.21' },
    { modelo: 'Fonte de alimentação Aberta - 150W - 24V - IP20 - BIV', preco: 142.26, ncm: '8504.40.21' },
    { modelo: 'Fonte de alimentação Slim Aberta - 100W - 24V - IP20 - BIV', preco: 116.55, ncm: '8504.40.21' },
    { modelo: 'Fonte de alimentação Slim Aberta - 150W - 24V - IP20 - BIV', preco: 152.9, ncm: '8504.40.21' },
    { modelo: 'Fonte de alimentação Dimerizavel TRIAC - 60W - 24V - IP20 - BIV', preco: 310.25, ncm: '8504.40.21' },
    { modelo: 'Fonte de alimentação Dimerizavel TRIAC - 100W - 24V - IP20 - 110V', preco: 407.92, ncm: '8504.40.21' },
    { modelo: 'Fonte de alimentação Dimerizavel TRIAC - 100W - 24V - IP20 - 110V', preco: 407.92, ncm: '8504.40.21' },
    { modelo: 'Fonte de alimentação - 100W - 24V - IP20 - BIV', preco: 611.89, ncm: '8504.40.21' },
    { modelo: 'Fonte 6W - 12V - ON/OFF - BIV', preco: 28.55, ncm: '8504.40.21' },
    { modelo: 'Controladora Dimerizável Com Função Wireless / 9A 108W (12V) & 216W (24V)', preco: 210.1, ncm: '8504.40.21' },
    { modelo: 'Fonte de alimentação - 200W - 24V - IP20 - BIV - PROU', preco: 275.63, ncm: '8504.40.21' },
    { modelo: 'Fonte de alimentação - 350W - 24V - IP20 - BIV', preco: 231.53, ncm: '8504.40.21' },
    { modelo: 'Fonte de alimentação - 500W - 24V - IP20 - BIV', preco: 611.89, ncm: '8504.40.21' },
    { modelo: 'Fonte de alimentação Dimerizavel TRIAC - 150W - 24V - IP20 - 220V', preco: 407.92, ncm: '8504.40.21' },
    { modelo: 'Amplificador de Sinal', preco: 228.4, ncm: '8504.40.21' }
  ],
  'Embutido Solo': [
    { modelo: 'Emb. De Solo - 2,7W - 220LM - 2700K - 11º - IP66 - 12V', preco: 174.95, ncm: '9405.10.99' },
    { modelo: 'Emb. De Solo - 2,7W - 220LM - 2700K - 34º - IP66 - 12V', preco: 174.95, ncm: '9405.10.99' },
    { modelo: 'Emb. De Solo - 2,7W - 220LM - 2700K - 11º - IP66 - BIV', preco: 174.95, ncm: '9405.10.99' },
    { modelo: 'Emb. De Solo - 2,7W - 220LM - 2700K - 34º - IP66 - BIV', preco: 174.95, ncm: '9405.10.99' },
    { modelo: 'Emb. De Solo - 2,7W - 220LM - 2700K - 20X65º - IP66 - 12V', preco: 185.03, ncm: '9405.10.99' },
    { modelo: 'Emb. De Solo - 2,7W - 220LM - 2700K - 20X65º - IP66 - BIV', preco: 185.03, ncm: '9405.10.99' },
    { modelo: 'Emb. De Solo - 7,6W - 660LM - 2700K - 11º - IP66 - 12V', preco: 77.73, ncm: '9405.10.99' },
    { modelo: 'Emb. De Solo - 7,6W - 660LM - 2700K - 11º - IP66 - BIV', preco: 77.73, ncm: '9405.10.99' },
    { modelo: 'Emb. De Solo - 7,6W - 660LM - 2700K - 34º - IP66 - 12V', preco: 77.73, ncm: '9405.10.99' },
    { modelo: 'Emb. De Solo - 7,6W - 660LM - 2700K - 34º - IP66 - BIV', preco: 77.73, ncm: '9405.10.99' },
    { modelo: 'Emb. De Solo - 7,6W - 660LM - 2700K - 20X65º - IP66 - 12V', preco: 77.73, ncm: '9405.10.99' },
    { modelo: 'Emb. De Solo - 7,6W - 660LM - 2700K - 34º - IP66 - BIV', preco: 308.39, ncm: '9405.10.99' },
    { modelo: 'Emb. De Solo - 7,6W - 660LM - 2700K - 20X65º - IP66 - 12V', preco: 77.73, ncm: '9405.10.99' }
  ],
  'Espeto': [
    { modelo: 'Espeto 2,7W - 220LM - 2700k - 11º - IP66 - 12V', preco: 179.41, ncm: '9405.10.99' },
    { modelo: 'Espeto 2,7W - 220LM - 2700k - 11º - IP66 - BIV', preco: 179.41, ncm: '9405.10.99' },
    { modelo: 'Espeto 2,7W - 220LM - 2700k - 34º - IP66 - 12V', preco: 179.41, ncm: '9405.10.99' },
    { modelo: 'Espeto 2,7W - 220LM - 2700k - 34º - IP66 - BIV', preco: 179.41, ncm: '9405.10.99' },
    { modelo: 'Espeto 1,5W - 157LM - 2700k - 11º - IP66 - BIV', preco: 120.4, ncm: '9405.10.99' },
    { modelo: 'Espeto 7,6W - 660LM - 2700k - 34º - IP66 - BIV', preco: 316.69, ncm: '9405.10.99' }
  ],
  'Arandela': [
    { modelo: 'Arandela 2,7W - 220LM - 2700K - 120º - IP66 - 12V', preco: 167.54, ncm: '9405.10.99' },
    { modelo: 'Arandela 2,7W - 220LM - 2700K - 120º - IP66 - BIV', preco: 305.0, ncm: '9405.10.99' },
    { modelo: 'Poste Balizador - 6w - 500LM - 2700K - 90º - IP65 - BIV', preco: 242.0, ncm: '9405.10.99' },
    { modelo: 'Balizador 1W - 80LM - 2700K - 40º - IP65 - BIV', preco: 93.18, ncm: '9405.10.99' },
    { modelo: 'Balizador Mini - 1,5W - 40LM - 3000K - 60º - BIV', preco: 75.78, ncm: '9405.10.99' }
  ],
  'Spot': [
    { modelo: 'Spot 2,7W - 220LM - 2700K - 11º - IP66 - BIV', preco: 167.54, ncm: '9405.10.99' },
    { modelo: 'Spot 2,7W - 220LM - 2700K - 34º - IP66 - BIV', preco: 167.54, ncm: '9405.10.99' },
    { modelo: 'Spot 7,6W - 220LM - 2700K - 11º - IP66 - BIV', preco: 310.93, ncm: '9405.10.99' },
    { modelo: 'Spot 7,6W - 220LM - 2700K - 34º - IP66 - BIV', preco: 310.93, ncm: '9405.10.99' },
    { modelo: 'Spot 2,7W - 220LM - 2700K - 11º - IP66 - BIV', preco: 163.1, ncm: '9405.10.99' },
    { modelo: 'Spot 2,7W - 220LM - 2700K - 34º - IP66 - BIV', preco: 163.1, ncm: '9405.10.99' },
    { modelo: 'Spot 2,7W - 220LM - 2700K - 11º - IP66 - BIV', preco: 153.73, ncm: '9405.10.99' },
    { modelo: 'Spot 2,7W - 220LM - 2700K - 34º - IP66 - BIV', preco: 153.73, ncm: '9405.10.99' },
    { modelo: 'Projetor P/ Tronco - 6W - 315LM - 2700K - 90º - IP65', preco: 224.77, ncm: '9405.10.99' },
    { modelo: 'Projetor P/ Haste - 6W - 315LM - 2700K - 60º - IP65', preco: 236.24, ncm: '9405.10.99' }
  ],
  'Embutidos': [
    { modelo: 'Mini Emb. 2,5W - 74LM - 2700K - 20º - IP20 - BIV', preco: 57.0, ncm: '9405.10.99' },
    { modelo: 'Embutido 1,5W - 64LM - 2700K - 20º - IP20 - BIV', preco: 68.0, ncm: '9405.10.99' },
    { modelo: 'Embutido 1,5W - 64LM - 2700K - 45º - IP20 - BIV', preco: 68.0, ncm: '9405.10.99' },
    { modelo: 'Embutido 3W -165LM - 2700K - 20º - IP20 - BIV', preco: 80.0, ncm: '9405.10.99' },
    { modelo: 'Embutido 3W -164LM - 2700K - 45º - IP20 - BIV', preco: 80.0, ncm: '9405.10.99' },
    { modelo: 'Embutido 6W - 293LM - 2700K - 15º - IP65 - BIV', preco: 137.0, ncm: '9405.10.99' },
    { modelo: 'Embutido 6W - 319LM - 2700K - 36º - IP65 - BIV', preco: 137.0, ncm: '9405.10.99' },
    { modelo: 'Embutido 6W - 340LM - 2700K - 50º - IP65 - BIV', preco: 137.0, ncm: '9405.10.99' },
    { modelo: 'Embutido 6W - 505LM - 2700K - 35º - IP20 - BIV', preco: 114.0, ncm: '9405.10.99' },
    { modelo: 'Embutido NO-FRAME 6W - 411LM - 2700K - 15º - IP20 - BIV', preco: 126.0, ncm: '9405.10.99' },
    { modelo: 'Embutido NO-FRAME 6W - 505LM - 2700K - 35º - IP20 - BIV', preco: 126.0, ncm: '9405.10.99' },
    { modelo: 'Embutido NO-FRAME 6W - 422LM - 2700K - 50º - IP20 - BIV', preco: 126.0, ncm: '9405.10.99' },
    { modelo: 'Embutido 10W - 854LM - 2700K - 15º - IP20 - BIV', preco: 149.0, ncm: '9405.10.99' },
    { modelo: 'Embutido NO-FRAME 10W - 854LM - 2700K - 15º - IP20 - BIV', preco: 161.0, ncm: '9405.10.99' },
    { modelo: 'Embutido NO-FRAME 10W - 724LM - 2700K - 35º - IP20 - BIV', preco: 161.0, ncm: '9405.10.99' },
    { modelo: 'Embutido 20W - 1438LM - 2700K - 15º - IP20 - BIV', preco: 241.0, ncm: '9405.10.99' },
    { modelo: 'Embutido Orientavel 3W - 180LM - 2700K - 12º - IP20 - BIV', preco: 88.62, ncm: '9405.10.99' },
    { modelo: 'Embutido Orientavel 3W - 180LM - 2700K - 34º - IP20 - BIV', preco: 88.62, ncm: '9405.10.99' },
    { modelo: 'Embutido Orientavel 3W - 180LM - 2700K - 48º - IP20 - BIV', preco: 88.62, ncm: '9405.10.99' },
    { modelo: 'Embutido Orientavel 7W - 540LM - 2700K - 34º - IP20 - BIV', preco: 134.88, ncm: '9405.10.99' },
    { modelo: 'Embutido NO-FRAME 3W - 135LM - 2700K - 34º - IP54 - BIV', preco: 135.6, ncm: '9405.10.99' },
    { modelo: 'Embutido 3W - 135LM - 2700K - 36º - IP54 - BIV', preco: 105.2, ncm: '9405.10.99' },
    { modelo: 'Embutido 3W - 180LM - 2700K - 12º - IP20 - BIV', preco: 74.14, ncm: '9405.10.99' },
    { modelo: 'Embutido 7W - 540LM - 2700K - 12º - IP20 - BIV', preco: 115.68, ncm: '9405.10.99' },
    { modelo: 'Embutido Assimetrico - 6W - 456LM - 2700K - IP20 - BIV', preco: 202.27, ncm: '9405.10.99' },
    { modelo: 'Embutido 7W - 540LM - 2700K - 34º - IP20 - BIV', preco: 115.68, ncm: '9405.10.99' },
    { modelo: 'Embutido 7W - 540LM - 2700K - 48º - IP20 - BIV', preco: 115.68, ncm: '9405.10.99' },
    { modelo: 'Embutido Orientavel 7W - 540LM - 2700K - 12º - IP20 - BIV', preco: 134.88, ncm: '9405.10.99' },
    { modelo: 'Embutido Orientavel 7W - 540LM - 2700K - 34º - IP20 - BIV', preco: 134.88, ncm: '9405.10.99' },
    { modelo: 'Embutido Orientavel 7W - 540LM - 2700K - 48º - IP20 - BIV', preco: 134.88, ncm: '9405.10.99' },
    { modelo: 'Embutido 5W - 360LM - 2700K - 34º - IP20 - BIV', preco: 104.7, ncm: '9405.10.99' },
    { modelo: 'Embutido 10W - 720LM - 2700K - 12º - IP20 - BIV', preco: 220.71, ncm: '9405.10.99' },
    { modelo: 'Embutido 10W - 720LM - 2700K - 34º - IP20 - BIV', preco: 220.71, ncm: '9405.10.99' },
    { modelo: 'Embutido 10W - 720LM - 2700K - 48º - IP20 - BIV', preco: 220.71, ncm: '9405.10.99' },
    { modelo: 'Embutido Orientavel 14W - 1080LM - 2700K - 12º - IP20 - BIV', preco: 237.94, ncm: '9405.10.99' },
    { modelo: 'Embutido Orientavel 14W - 1080LM - 2700K -34º - IP20 - BIV', preco: 237.94, ncm: '9405.10.99' },
    { modelo: 'Embutido Orientavel 14W - 1080LM - 2700K -48º - IP20 - BIV', preco: 237.94, ncm: '9405.10.99' },
    { modelo: 'Embutido NO-FRAME 7W - 405LM - 2700K - 12º - IP20 - BIV', preco: 159.41, ncm: '9405.10.99' },
    { modelo: 'Embutido NO-FRAME 7W - 405LM - 2700K - 34º - IP20 - BIV', preco: 159.41, ncm: '9405.10.99' },
    { modelo: 'Embutido NO-FRAME 7W - 405LM - 2700K - 48º - IP20 - BIV', preco: 159.41, ncm: '9405.10.99' },
    { modelo: 'Embutido NO-FRAME 10W - 810LM - 2700K - 12º - IP20 - BIV', preco: 271.03, ncm: '9405.10.99' },
    { modelo: 'Embutido NO-FRAME 10W - 810LM - 2700K - 34º - IP20 - BIV', preco: 271.03, ncm: '9405.10.99' },
    { modelo: 'Embutido NO-FRAME 10W - 810LM - 2700K - 48º - IP20 - BIV', preco: 271.03, ncm: '9405.10.99' },
    { modelo: 'Embutido Wallwasher - 10W - 1305LM - 2700K - IP20 - BIV', preco: 381.66, ncm: '9405.10.99' },
    { modelo: 'Spot mini embutido - 1,5W - 150LM - 2700K - 30º - 12V', preco: 56.37, ncm: '9405.10.99' },
    { modelo: 'Spot semi-embutido - 1,5W - 120LM - 2700K - 30º - 12V', preco: 87.87, ncm: '9405.10.99' },
    { modelo: 'Stella - STL23905PTO/30', preco: 254.37, ncm: '9405.10.99' },
    { modelo: 'W22 - SLED 9084', preco: 154.0, ncm: '9405.10.99' }
  ],
  'Painéis e Plafons': [
    { modelo: 'Painel de Embutir 14W - 1550Lm - 3000K - ON/OFF', preco: 48.36, ncm: '9405.10.99' },
    { modelo: 'Painel de Sobrepor 17W - 1500Lm - 3000K - ON/OFF', preco: 87.87, ncm: '9405.10.99' },
    { modelo: 'Painel de Embutir 20W - 2200Lm - 3000K - ON/OFF', preco: 67.33, ncm: '9405.10.99' },
    { modelo: 'Painel de Embutir S. Recuado 10W - 750Lm - 3000K - ON/OFF', preco: 37.0, ncm: '9405.10.99' },
    { modelo: 'Painel de Embutir S. Recuado 20W - 1600Lm - 3000K - ON/OFF', preco: 79.9, ncm: '9405.10.99' },
    { modelo: 'Painel de Sobrepor - 24W - 1900LM - 3000k - IP20 - BIV', preco: 103.04, ncm: '9405.10.99' },
    { modelo: 'Painel de Sobrepor 17W - 1500lm - IRC80 - 2700k - 120º - BIV', preco: 62.27, ncm: '9405.10.99' }
  ],
  'Acessórios e Diversos': [
    { modelo: 'Acessório Cinta - 50CM', preco: 21.4, ncm: '9405.99.00' },
    { modelo: 'Haste para luminarias - 1,80m', preco: 127.86, ncm: '9405.99.00' },
    { modelo: 'Haste para luminarias - 1,20m', preco: 96.85, ncm: '9405.99.00' }
  ]
};

// ---- State ----
let itensOrcamento = [];

// ---- Formatting ----
function formatBRL(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// ---- Update Models Dropdown ----
// Cada opção usa como valor "Categoria::indice" (único), pois existem PEÇAs com nome repetido e preços diferentes.
function atualizarModelos() {
  const tipo = document.getElementById('tipoLuminaria').value;
  const modeloSelect = document.getElementById('modeloLuminaria');

  // Todos os campos livres
  modeloSelect.disabled = false;

  // Clear
  modeloSelect.innerHTML = '<option value="">Selecione o modelo...</option>';

  const categorias = tipo && CATALOGO[tipo] ? [tipo] : Object.keys(CATALOGO);
  categorias.forEach((cat) => {
    CATALOGO[cat].forEach((item, idx) => {
      const opt = document.createElement('option');
      opt.value = cat + '::' + idx;
      opt.textContent = item.modelo;
      modeloSelect.appendChild(opt);
    });
  });
  atualizarPreco();
}

// ---- Get Selected Product ----
function getProdutoSelecionado() {
  const valor = document.getElementById('modeloLuminaria').value;
  if (!valor) return null;
  const sep = valor.lastIndexOf('::');
  const cat = valor.slice(0, sep);
  const item = CATALOGO[cat] && CATALOGO[cat][parseInt(valor.slice(sep + 2), 10)];
  return item ? Object.assign({ cat: cat }, item) : null;
}

// ---- Update Unit Price ----
function atualizarPreco() {
  const precoInput = document.getElementById('precoUnitario');
  const produto = getProdutoSelecionado();
  if (precoInput) precoInput.value = produto ? formatBRL(produto.preco) : '';
}

// ---- Add Item ----
function adicionarItem() {
  const tipoSelect = document.getElementById('tipoLuminaria');
  const modeloSelect = document.getElementById('modeloLuminaria');
  const corInput = document.getElementById('corLuminaria');
  const ambienteInput = document.getElementById('ambienteLuminaria');
  const localInput = document.getElementById('localLuminaria');
  const acendimentoInput = document.getElementById('acendimentoLuminaria');
  const quantidadeInput = document.getElementById('quantidade');

  const produto = getProdutoSelecionado();
  const tipo = produto ? produto.cat : tipoSelect.value;
  const cor = corInput.value.trim();
  const ambiente = ambienteInput.value.trim();
  const local = localInput.value.trim();
  const acendimento = acendimentoInput.value.trim();
  const quantidade = parseInt(quantidadeInput.value, 10);

  if (!produto) { modeloSelect.focus(); return; }
  if (!ambiente) { ambienteInput.focus(); return; }
  if (!local) { localInput.focus(); return; }
  if (!quantidade || quantidade < 1) { quantidadeInput.focus(); return; }

  let nomeFinal = produto.modelo;
  if (cor) {
    nomeFinal += ` - Cor/Opção: ${cor}`;
  }

  itensOrcamento.push({
    tipo,
    modelo: nomeFinal,
    ambiente,
    local,
    acendimento,
    ncm: produto.ncm,
    quantidade,
    precoUnitario: produto.preco,
    subtotal: produto.preco * quantidade,
  });

  // Reset form
  tipoSelect.value = '';
  atualizarModelos();
  corInput.value = '';
  ambienteInput.value = '';
  localInput.value = '';
  acendimentoInput.value = '';
  quantidadeInput.value = 1;
  if (document.getElementById('precoUnitario')) document.getElementById('precoUnitario').value = '';
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
        <td colspan="8" class="empty-state">
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
        <td>
          <div style="font-weight: 500; margin-bottom: 2px;">${item.ambiente}</div>
          <div style="font-size: 0.85em; color: #666;">${item.local} ${item.acendimento ? `(Acend: ${item.acendimento})` : ''}</div>
        </td>
        <td>
          <div style="font-weight: 500; margin-bottom: 2px;">${item.tipo}</div>
          <div style="font-size: 0.85em; color: #666;">${item.modelo}</div>
        </td>
        <td>${item.quantidade}</td>
        <td class="col-custo">${formatBRL(item.precoUnitario)}</td>
        <td class="col-venda highlight-text" style="color: var(--accent-gold); font-weight: 500;">—</td>
        <td class="col-total highlight-text" style="color: var(--accent-gold); font-weight: 700;">—</td>
        <td class="col-acoes"><button class="btn-remover" onclick="removerItem(${i})">Remover</button></td>
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
  // VALOR DE VENDA E RATEIO
  // ========================================
  const valorVenda = totalAntesImpostos + valorSimples + valorRT;
  
  // Fator multiplicador para rateio na tabela de itens
  const fatorRateio = valorProdutos > 0 ? (valorVenda / valorProdutos) : 1;

  // Atualizar colunas Venda Unitária e Total Venda na Tabela
  const trs = document.querySelectorAll('#tabelaItens tr:not(.empty-state-row)');
  trs.forEach((tr, i) => {
    const item = itensOrcamento[i];
    if (item) {
      const vendaUnit = item.precoUnitario * fatorRateio;
      const vendaTotal = item.subtotal * fatorRateio;
      const colVenda = tr.querySelector('.col-venda');
      const colTotal = tr.querySelector('.col-total');
      if(colVenda) colVenda.textContent = formatBRL(vendaUnit);
      if(colTotal) colTotal.textContent = formatBRL(vendaTotal);
    }
  });

  // ========================================
  // ATUALIZAR UI DO RESUMO
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
function gerarPdfCliente() {
  document.body.classList.add('print-cliente');
  window.print();
  document.body.classList.remove('print-cliente');
}

function gerarPdfInterno() {
  // Não adiciona a classe print-cliente, então mostra a memória de cálculo e custos
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
    atualizarModelos();

  // Initial calculation
  recalcularTudo();

  // Focus
  document.getElementById('tipoLuminaria').focus();
});
