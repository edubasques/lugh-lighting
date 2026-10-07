/* ========================================
   Lugh Lighting — Calculadora de Luminárias
   Ordem de cálculo conforme planilha
   ======================================== */

// ---- Product Catalog ----
// Preços = preço NF do fornecedor (com ICMS-SP incluso)
const CATALOGO = {
  'Perfis': [
    { modelo: 'Eklart - EKPF11 - Perfil Embutir 2,5x1,5 - Alumínio (2 Metros)', preco: 46.45, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF11 - Perfil Embutir 2,5x1,5 - Branco (2 Metros)', preco: 64.28, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF11 - Perfil Embutir 2,5x1,5 - Preto (2 Metros)', preco: 64.28, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF100 - Perfil Embutir Recuado 3,7x3,6 - Branco', preco: 290.80, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF12 - Perfil Sobrepor 2,0x1,5 - Alumínio (2 Metros)', preco: 45.37, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF12 - Perfil Sobrepor 2,0x1,5 - Branco (2 Metros)', preco: 62.94, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF12 - Perfil Sobrepor 2,0x1,5 - Preto (2 Metros)', preco: 62.94, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF21 - Perfil Embutir 2,3x0,9 - Alumínio (2 Metros)', preco: 44.65, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF21 - Perfil Embutir 2,3x0,9 - Branco (2 Metros)', preco: 63.02, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF21 - Perfil Embutir 2,3x0,9 - Preto (2 Metros)', preco: 63.02, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF22 - Perfil Sobrepor 2,0x0,9 - Alumínio (2 Metros)', preco: 46.89, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF22 - Perfil Sobrepor 2,0x0,9 - Branco (2 Metros)', preco: 63.00, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF22 - Perfil Sobrepor 2,0x0,9 - Preto (2 Metros)', preco: 63.00, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF32 - Perfil Sobrepor 45 1,6x1,6 - Alumínio (2 Metros)', preco: 55.35, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF32 - Perfil Sobrepor 45 1,6x1,6 - Branco (2 Metros)', preco: 71.48, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF32 - Perfil Sobrepor 45 1,6x1,6 - Preto (2 Metros)', preco: 71.48, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF32 - Perfil Sobrepor 45 1,6x1,6 - Alumínio (3 Metros)', preco: 83.05, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF86FLEX - Perfil Flexível Silicone (Rolo 10m)', preco: 789.40, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF1616FLEX - Perfil Flexível Silicone 1.6x1.6 (Metro)', preco: 58.70, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF1020FLEX - Perfil Flexível Silicone 2x1 (Metro)', preco: 47.10, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF191 - Perfil Alumínio P/ Fita LED (3 Metros)', preco: 395.41, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF33 - Perfil Sobrepor 45 1,9x1,9 - Alumínio (2 Metros)', preco: 66.90, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF33 - Perfil Sobrepor 45 1,9x1,9 - Branco (2 Metros)', preco: 84.70, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF33 - Perfil Sobrepor 45 1,9x1,9 - Preto (2 Metros)', preco: 84.70, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF57 - Perfil Embutir 3,5x3,5 - Alumínio (2 Metros)', preco: 171.90, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF57 - Perfil Embutir 3,5x3,5 - Branco (2 Metros)', preco: 192.80, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF57 - Perfil Embutir 3,5x3,5 - Preto (2 Metros)', preco: 192.80, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF61 - Perfil Sobrepor 3,5x3,5 - Alumínio (2 Metros)', preco: 178.20, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF61 - Perfil Sobrepor 3,5x3,5 - Branco (2 Metros)', preco: 199.10, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF61 - Perfil Sobrepor 3,5x3,5 - Preto (2 Metros)', preco: 199.10, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF64 - Perfil Alumínio P/ Fita LED Pendente (3 Metros)', preco: 307.60, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF88 - Perfil Sobrepor/Embutir 3,3x1,5 - Alumínio (2 Metros)', preco: 100.20, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF88 - Perfil Sobrepor/Embutir 3,3x1,5 - Branco (2 Metros)', preco: 123.20, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF88 - Perfil Sobrepor/Embutir 3,3x1,5 - Preto (2 Metros)', preco: 123.20, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF95 - Perfil Embutir NO FRAME 8,8x1,9 - Alumínio (3 Metros)', preco: 307.30, ncm: '9405.10.99' },
    { modelo: 'Eklart - EKPF95 - Perfil Embutir NO FRAME 8,8x1,9 - Branco (3 Metros)', preco: 330.30, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED9068 - Perfil Embutir Indireto 11W 12V', preco: 273.00, ncm: '9405.10.99' }
  ],
  'Fitas': [
    { modelo: 'Eklart - EKF5105958MM - Fita Led 5W 2700k IP20 (5 Metros)', preco: 109.51, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF4148HL95 - Fita Led 5W 2700k 12V IP20 (5 Metros)', preco: 77.67, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF5105COB95 - Fita Led COB 5W 2700k IP20 (5 Metros)', preco: 202.57, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF51964MM - Fita Led 10W 4.6mm 2700k IP20 (5 Metros)', preco: 202.57, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF51964MM - Fita LED SLIM 10W 2700K IP20 (5 Metros)', preco: 104.70, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF5196HL90 - Fita Led 10W 2700k IRC90 (5 Metros)', preco: 115.00, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF5196HL95 - Fita Led 10W 2700k IRC95 (5 Metros)', preco: 120.75, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF5114HL90 - Fita Led 14W 2700k IRC90 (5 Metros)', preco: 150.50, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF5114HL95 - Fita Led 14W 2700k IRC90 (5 Metros)', preco: 159.16, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF5116HL95 - Fita Led 16W 2700k IRC95 (5 Metros)', preco: 203.59, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF5116HL90 - Fita Led 16W 2700k IRC90 (5 Metros)', preco: 193.90, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF5216HL95 - Fita LED 16W 3000K IRC>95 (5 Metros)', preco: 203.59, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF5124HL95 - Fita Led 24W 2700k IRC95 (5 Metros)', preco: 295.19, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF514812010PRO - Fita LED PRO 5W 2700K (10 Metros)', preco: 402.40, ncm: '9405.40.90' },
    { modelo: 'Eklart - EKF51406000 - Fita Led 40W 2700k IRC80 (5 Metros)', preco: 196.80, ncm: '9405.40.90' }
  ],
  'Fontes': [
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
    { modelo: 'Eklart - EK02060DIMF - Fonte Dimerizavel TRIAC 60W 24V IP20 BIV', preco: 310.25, ncm: '8504.40.21' },
    { modelo: 'Eklart - EK02120DIMF - Fonte Dimerizavel TRIAC 100W 24V 110V', preco: 407.92, ncm: '8504.40.21' },
    { modelo: 'Eklart - EKA-500FKG-24P - Fonte 500W 24V IP20 BIV', preco: 611.89, ncm: '8504.40.21' },
    { modelo: 'Eklart - EKA-350FGF-24 - Fonte 350W 24V IP20 BIV', preco: 231.53, ncm: '8504.40.21' },
    { modelo: 'Eklart - EK110506FM - Fonte 6W 12V ON/OFF BIV', preco: 28.55, ncm: '8504.40.21' },
    { modelo: 'Eklart - EKM1M33A - Controladora Dimerizável Wireless', preco: 210.10, ncm: '8504.40.21' },
    { modelo: 'Eklart - EKAMP - Amplificador de Sinal', preco: 228.40, ncm: '8504.40.21' }
  ],
  'Embutido Solo': [
    { modelo: 'Directlight - DL EB1 - Emb. Solo 2,7W 11º 12V', preco: 174.95, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL EB1 - Emb. Solo 2,7W 34º 12V', preco: 174.95, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL EB1 - Emb. Solo 2,7W 11º BIV', preco: 174.95, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL EB1 - Emb. Solo 2,7W 34º BIV', preco: 174.95, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL EB1 - Emb. Solo 2,7W 20X65º 12V', preco: 185.03, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL EB1 - Emb. Solo 2,7W 20X65º BIV', preco: 185.03, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL EB3 - Emb. Solo 7,6W 11º 12V', preco: 77.73, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL EB3 - Emb. Solo 7,6W 11º BIV', preco: 77.73, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL EB3 - Emb. Solo 7,6W 34º 12V', preco: 77.73, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL EB3 - Emb. Solo 7,6W 34º BIV', preco: 77.73, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL EB3 - Emb. Solo 7,6W 20X65º 12V', preco: 77.73, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL EB5 - Emb. Solo 7,6W 34º BIV', preco: 308.39, ncm: '9405.10.99' }
  ],
  'Espeto': [
    { modelo: 'Directlight - DL EP1 - Espeto 2,7W 11º 12V', preco: 179.41, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL EP1 - Espeto 2,7W 11º BIV', preco: 179.41, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL EP1 - Espeto 2,7W 34º 12V', preco: 179.41, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL EP1 - Espeto 2,7W 34º BIV', preco: 179.41, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL EP3 - Espeto 1,5W 11º BIV', preco: 120.40, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL EP2 - Espeto 7,6W 34º BIV', preco: 316.69, ncm: '9405.10.99' }
  ],
  'Arandela': [
    { modelo: 'Directlight - DL AR8 - Arandela 2,7W 120º 12V', preco: 167.54, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL AR8 - Arandela 2,7W 120º BIV', preco: 305.00, ncm: '9405.10.99' },
    { modelo: 'Interlight - 7450.S.PM - Poste Balizador 6W 90º IP65', preco: 242.00, ncm: '9405.10.99' },
    { modelo: 'Interlight - 3960C.S.PM - Balizador 1W 40º IP65 BIV', preco: 93.18, ncm: '9405.10.99' },
    { modelo: 'Diversos - Balizador Mini 1,5W 60º BIV', preco: 75.78, ncm: '9405.10.99' }
  ],
  'Spot': [
    { modelo: 'Directlight - DL SP1 - Spot 2,7W 11º BIV', preco: 167.54, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL SP1 - Spot 2,7W 34º BIV', preco: 167.54, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL SP2 - Spot 7,6W 11º BIV', preco: 310.93, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL SP2 - Spot 7,6W 34º BIV', preco: 310.93, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL TT5 - Spot 2,7W 11º BIV Preto/Branco', preco: 163.10, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL TT5 - Spot 2,7W 34º BIV Preto/Branco', preco: 163.10, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL TT14 - Spot 2,7W 11º BIV Preto/Branco', preco: 153.73, ncm: '9405.10.99' },
    { modelo: 'Directlight - DL TT14 - Spot 2,7W 34º BIV Preto/Branco', preco: 153.73, ncm: '9405.10.99' },
    { modelo: 'Interlight - 7400-UA-S - Projetor P/ Tronco 6W 90º IP65', preco: 224.77, ncm: '9405.10.99' },
    { modelo: 'Interlight - 7401-MA-S - Projetor P/ Haste 6W 60º IP65', preco: 236.24, ncm: '9405.10.99' }
  ],
  'Embutidos': [
    { modelo: 'Misterled - SLED1150 - Mini Emb. 2,5W 20º BIV', preco: 57.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1200 - Embutido 1,5W 20º BIV', preco: 68.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1200 - Embutido 1,5W 45º BIV', preco: 68.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1200 - Embutido 3W 20º BIV', preco: 80.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1200 - Embutido 3W 45º BIV', preco: 80.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1220 - Embutido 6W 15º IP65', preco: 137.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1220 - Embutido 6W 36º IP65', preco: 137.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1220 - Embutido 6W 50º IP65', preco: 137.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1230 - Embutido 6W 35º BIV', preco: 114.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1231 - Embutido NO-FRAME 6W 15º BIV', preco: 126.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1231 - Embutido NO-FRAME 6W 35º BIV', preco: 126.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1231 - Embutido NO-FRAME 6W 50º BIV', preco: 126.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1232 - Embutido 10W 15º BIV', preco: 149.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1233 - Embutido NO-FRAME 10W 15º BIV', preco: 161.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1233 - Embutido NO-FRAME 10W 35º BIV', preco: 161.00, ncm: '9405.10.99' },
    { modelo: 'Misterled - SLED1234 - Embutido 20W 15º BIV', preco: 241.00, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4581 - Embutido Orientavel 3W 12º BIV', preco: 88.62, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4581 - Embutido Orientavel 3W 34º BIV', preco: 88.62, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4581 - Embutido Orientavel 3W 48º BIV', preco: 88.62, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4582 - Embutido Orientavel 7W 34º BIV', preco: 134.88, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4411/4481 - Embutido 3W 34º/36º IP54 BIV', preco: 135.60, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4991 - Embutido 3W 12º BIV', preco: 74.14, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4992 - Embutido 7W 12º/34º/48º BIV', preco: 115.68, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4995.AS.S.PM - Embutido Assimetrico 6W', preco: 202.27, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4894 - Embutido 10W 12º/34º/48º BIV', preco: 220.71, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4583 - Embutido Orientavel 14W 12º/34º/48º BIV', preco: 237.94, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4412.FE.S - Embutido NO-FRAME 7W 12º/34º/48º BIV', preco: 159.41, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4413.FE.S - Embutido NO-FRAME 10W 12º/34º/48º BIV', preco: 271.03, ncm: '9405.10.99' },
    { modelo: 'Interlight - 4495.AS.S - Embutido Wallwasher 10W BIV', preco: 381.66, ncm: '9405.10.99' },
    { modelo: 'Diversos - Spot semi-embutido 1,5W 30º 12V', preco: 87.87, ncm: '9405.10.99' },
    { modelo: 'Diversos - Spot mini embutido 1,5W 30º 12V', preco: 56.37, ncm: '9405.10.99' },
    { modelo: 'Stella - STL25901BR/27 - Spot semi-embutido 1,5W 30º', preco: 87.87, ncm: '9405.10.99' },
    { modelo: 'W22 - SLED 9084', preco: 154.00, ncm: '9405.10.99' }
  ],
  'Painéis e Plafons': [
    { modelo: 'Diversos - Painel de Embutir 14W 3000K', preco: 48.36, ncm: '9405.10.99' },
    { modelo: 'Diversos - Painel de Sobrepor 17W 3000K', preco: 87.87, ncm: '9405.10.99' },
    { modelo: 'Diversos - Painel de Embutir 20W 3000K', preco: 67.33, ncm: '9405.10.99' },
    { modelo: 'Diversos - Painel Embutir S. Recuado 10W 3000K', preco: 37.00, ncm: '9405.10.99' },
    { modelo: 'Diversos - Painel Embutir S. Recuado 20W 3000K', preco: 79.90, ncm: '9405.10.99' },
    { modelo: 'Diversos - STH21964Q/30 - Painel Sobrepor 24W 3000K', preco: 103.04, ncm: '9405.10.99' },
    { modelo: 'Stella - STH20903BR/30 - Painel Sobrepor 17W Branco 2700K', preco: 62.27, ncm: '9405.10.99' },
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
    const tipo = document.getElementById('tipoLuminaria').value;
    const modeloSelect = document.getElementById('modeloLuminaria');
    
    // Todos os campos livres
    modeloSelect.disabled = false;
    
    // Clear
    modeloSelect.innerHTML = '<option value="">Selecione o modelo...</option>';

    const pecaMap = {"Eklart - EKPF11 - Perfil Embutir 2,5x1,5 - Alumínio (2 Metros)": "Perfil de Embutir - 2,5 x 1,5", "Eklart - EKPF11 - Perfil Embutir 2,5x1,5 - Branco (2 Metros)": "Perfil de Embutir - 2,5 x 1,5", "Eklart - EKPF11 - Perfil Embutir 2,5x1,5 - Preto (2 Metros)": "Perfil de Embutir - 2,5 x 1,5", "Eklart - EKPF100 - Perfil Embutir Recuado 3,7x3,6 - Branco": "Perfil de Embutir Recuado - 3,7x3,6", "Eklart - EKPF12 - Perfil Sobrepor 2,0x1,5 - Alumínio (2 Metros)": "Perfil de Sobrepor - 2,0 x 1,5", "Eklart - EKPF12 - Perfil Sobrepor 2,0x1,5 - Branco (2 Metros)": "Perfil de Sobrepor - 2,0 x 1,5", "Eklart - EKPF12 - Perfil Sobrepor 2,0x1,5 - Preto (2 Metros)": "Perfil de Sobrepor - 2,0 x 1,5", "Eklart - EKPF21 - Perfil Embutir 2,3x0,9 - Alumínio (2 Metros)": "Perfil de Embutir - 2,3 x 0,9", "Eklart - EKPF21 - Perfil Embutir 2,3x0,9 - Branco (2 Metros)": "Perfil de Embutir - 2,3 x 0,9", "Eklart - EKPF21 - Perfil Embutir 2,3x0,9 - Preto (2 Metros)": "Perfil de Embutir - 2,3 x 0,9", "Eklart - EKPF22 - Perfil Sobrepor 2,0x0,9 - Alumínio (2 Metros)": "Perfil de Sobrepor - 2,0 x 0,9", "Eklart - EKPF22 - Perfil Sobrepor 2,0x0,9 - Branco (2 Metros)": "Perfil de Sobrepor - 2,0 x 0,9", "Eklart - EKPF22 - Perfil Sobrepor 2,0x0,9 - Preto (2 Metros)": "Perfil de Sobrepor - 2,0 x 0,9", "Eklart - EKPF32 - Perfil Sobrepor 45 1,6x1,6 - Alumínio (2 Metros)": "Perfil de Sobrepor 45 difuso - 1,6 x 1,6", "Eklart - EKPF32 - Perfil Sobrepor 45 1,6x1,6 - Branco (2 Metros)": "Perfil de Sobrepor 45 difuso - 1,6 x 1,6", "Eklart - EKPF32 - Perfil Sobrepor 45 1,6x1,6 - Preto (2 Metros)": "Perfil de Sobrepor 45 difuso - 1,6 x 1,6", "Eklart - EKPF32 - Perfil Sobrepor 45 1,6x1,6 - Alumínio (3 Metros)": "Perfil de Sobrepor 45 difuso - 1,6 x 1,6", "Eklart - EKPF86FLEX - Perfil Flexível Silicone (Rolo 10m)": "Perfil Flexível de Silicone Para Fita LED com Difusor Leitoso C 10m", "Eklart - EKPF1616FLEX - Perfil Flexível Silicone 1.6x1.6 (Metro)": "Perfil Flexível de Silicone Para Fita LED com Difusor Leitoso C50m x A1.6cm x L1.6cm (VENDA A METRO)", "Eklart - EKPF1020FLEX - Perfil Flexível Silicone 2x1 (Metro)": "Perfil Flexível de Silicone Para Fita LED com Difusor Leitoso 50m x A 2cm x L 1cm (VENDA A METRO)", "Eklart - EKPF191 - Perfil Alumínio P/ Fita LED (3 Metros)": "Perfil de Alumínio BR P/ Fita LED com Difusor Leitoso P/ Soprepor/Rodateto C 3m X A 3.5cm X L 3.5cm", "Eklart - EKPF33 - Perfil Sobrepor 45 1,9x1,9 - Alumínio (2 Metros)": "Perfil de Sobrepor 45 - 1,9 x 1,9", "Eklart - EKPF33 - Perfil Sobrepor 45 1,9x1,9 - Branco (2 Metros)": "Perfil de Sobrepor 45 - 1,9 x 1,9", "Eklart - EKPF33 - Perfil Sobrepor 45 1,9x1,9 - Preto (2 Metros)": "Perfil de Sobrepor 45 - 1,9 x 1,9", "Eklart - EKPF57 - Perfil Embutir 3,5x3,5 - Alumínio (2 Metros)": "Perfil de Embutir - 3,5 x 3,5", "Eklart - EKPF57 - Perfil Embutir 3,5x3,5 - Branco (2 Metros)": "Perfil de Embutir - 3,5 x 3,5", "Eklart - EKPF57 - Perfil Embutir 3,5x3,5 - Preto (2 Metros)": "Perfil de Embutir - 3,5 x 3,5", "Eklart - EKPF61 - Perfil Sobrepor 3,5x3,5 - Alumínio (2 Metros)": "Perfil de Sobrepor - 3,5 x 3,5", "Eklart - EKPF61 - Perfil Sobrepor 3,5x3,5 - Branco (2 Metros)": "Perfil de Sobrepor - 3,5 x 3,5", "Eklart - EKPF61 - Perfil Sobrepor 3,5x3,5 - Preto (2 Metros)": "Perfil de Sobrepor - 3,5 x 3,5", "Eklart - EKPF64 - Perfil Alumínio P/ Fita LED Pendente (3 Metros)": "Perfil de Alumínio PR Para Fita LED com Difusor Leitoso Sobrepor/ Pendente C 3m X A 5cm X L 3.6cm", "Eklart - EKPF88 - Perfil Sobrepor/Embutir 3,3x1,5 - Alumínio (2 Metros)": "Perfil de Sobrepor / Embutir WW - 3,3 x 1,5", "Eklart - EKPF88 - Perfil Sobrepor/Embutir 3,3x1,5 - Branco (2 Metros)": "Perfil de Sobrepor / Embutir WW - 3,3 x 1,5", "Eklart - EKPF88 - Perfil Sobrepor/Embutir 3,3x1,5 - Preto (2 Metros)": "Perfil de Sobrepor / Embutir WW - 3,3 x 1,5", "Eklart - EKPF95 - Perfil Embutir NO FRAME 8,8x1,9 - Alumínio (3 Metros)": "Perfil de Embutir NO FRAME - 8,8 x 1,9", "Eklart - EKPF95 - Perfil Embutir NO FRAME 8,8x1,9 - Branco (3 Metros)": "Perfil de Embutir NO FRAME - 8,8 x 1,9", "Misterled - SLED9068 - Perfil Embutir Indireto 11W 12V": "Fita Led 5W - 600lm/m - 2700k - 24V - IRC95 - IP20", "Eklart - EKF5105958MM - Fita Led 5W 2700k IP20 (5 Metros)": "Fita Led 5W - 450lm/m - 2700k - 12V - IRC95 - IP20", "Eklart - EKF4148HL95 - Fita Led 5W 2700k 12V IP20 (5 Metros)": "Fita Led 5W COB - 450lm/m - 2700k - 24V - IRC95 - IP20", "Eklart - EKF5105COB95 - Fita Led COB 5W 2700k IP20 (5 Metros)": "Fita Led 10W 4.6mm - 950lm/m - 2700k - 24V - IRC90 - IP20", "Eklart - EKF51964MM - Fita Led 10W 4.6mm 2700k IP20 (5 Metros)": "Fita LED SLIM 2835 120LEDS/M 4.6MM 24V 10W/M IP20 2700K IRC>90 950LM/M 5M/Rolo", "Eklart - EKF51964MM - Fita LED SLIM 10W 2700K IP20 (5 Metros)": "Fita Led 10W - 950lm/m - 2700k - 24V - IRC90 - IP20", "Eklart - EKF5196HL90 - Fita Led 10W 2700k IRC90 (5 Metros)": "Fita Led 10W - 950lm/m - 2700k - 24V - IRC95 - IP20", "Eklart - EKF5196HL95 - Fita Led 10W 2700k IRC95 (5 Metros)": "Fita Led 14W - 1500lm/m - 2700k - 24V - IRC90 - IP20", "Eklart - EKF5114HL90 - Fita Led 14W 2700k IRC90 (5 Metros)": "Fita Led 14W - 1400lm/m - 2700k - 24V - IRC90 - IP20", "Eklart - EKF5114HL95 - Fita Led 14W 2700k IRC90 (5 Metros)": "Fita Led 16W - 1800lm/m - 2700k - 24V - IRC95 - IP20", "Eklart - EKF5116HL95 - Fita Led 16W 2700k IRC95 (5 Metros)": "Fita Led 16W - 1840lm/m - 2700k - 24V - IRC90 - IP20", "Eklart - EKF5116HL90 - Fita Led 16W 2700k IRC90 (5 Metros)": "Fita Led 16W - 1800lm/m - 2700k - 24V - IRC90 - IP20", "Eklart - EKF5216HL95 - Fita LED 16W 3000K IRC>95 (5 Metros)": "Fita LED 2835 176LEDS/M 24V 16W/M IP20 3000K IRC>95 1900LM/M 5M/Rolo", "Eklart - EKF5124HL95 - Fita Led 24W 2700k IRC95 (5 Metros)": "Fita Led 24W - 2800lm/m - 2700k - 24V - IRC95 - IP20", "Eklart - EKF514812010PRO - Fita LED PRO 5W 2700K (10 Metros)": "Fita LED PRO 2835 120LEDS/M 24V 5W/M IP20 2700K IRC98 425LM/M 10M/Rolo", "Eklart - EKF51406000 - Fita Led 40W 2700k IRC80 (5 Metros)": "Fita Led 40W - 6000lm/m - 2700k - 24V - IRC80 - IP20", "Eklart - EK-CYX-35-24 - Fonte Blindada 35W 24V IP67": "Fonte de alimentação Blindada - 35W - 24V - IP67 - BIV", "Eklart - EK-CYX-75-24 - Fonte Blindada 75W 24V IP67": "Fonte de alimentação Blindada - 75W - 24V - IP67 - BIV", "Eklart - EK-CYX-100-24 - Fonte Blindada 100W 24V IP67": "Fonte de alimentação Blindada - 100W - 24V - IP67 - BIV", "Eklart - EK-CYX-150-24 - Fonte Blindada 150W 24V IP67": "Fonte de alimentação Blindada - 150W - 24V - IP67 - BIV", "Eklart - EK2130036FS - Fonte Slim 36W 24V IP20": "Fonte de alimentação Slim - 36W - 24V - IP20 - BIV", "Eklart - EK1115018FS - Fonte Slim 12V 1.5A 18W IP20": "Fonte de alimentação Slim 12V 1,5A 18W IP20", "Eklart - EK2150060FS - Fonte Slim 60W 24V IP20": "Fita Led 5W - 600lm/m - 2700k - 24V - IRC95 - IP20", "Eklart - EK110024DIMF - Fonte 100W 24V 127V DIM": "Fonte de alimentação Slim - 60W - 24V - IP20 - BIV", "Eklart - EKA-35FGB-24 - Fonte Aberta 35W 24V IP20": "Fonte 100W - 24V - 127V - DIM", "Eklart - EKA-75FAM-24 - Fonte Aberta 75W 24V IP20": "Fonte de alimentação Aberta - 35W - 24V - IP20 - BIV", "Eklart - EKA-100FGC-24 - Fonte Aberta 100W 24V IP20": "Fonte de alimentação Aberta - 75W - 24V - IP20 - BIV", "Eklart - EKA-200FKD-24P - Fonte Alimentação PROU 24V 200W IP20": "Fonte de alimentação Aberta - 100W - 24V - IP20 - BIV", "Eklart - EKA-150FGD-24 - Fonte Aberta 150W 24V IP20": "Fonte de Alimentação PROU 24V 8,3A 200W IP20 FP 0.95 Bivolt", "Eklart - EK2183100FS - Fonte Slim Aberta 100W 24V IP20": "Fonte de alimentação Aberta - 150W - 24V - IP20 - BIV", "Eklart - EK2162150FS - Fonte Slim Aberta 150W 24V IP20": "Fonte de alimentação Slim Aberta - 100W - 24V - IP20 - BIV", "Eklart - EK02060DIMF - Fonte Dimerizavel TRIAC 60W 24V IP20 BIV": "Fonte de alimentação Slim Aberta - 150W - 24V - IP20 - BIV", "Eklart - EK02120DIMF - Fonte Dimerizavel TRIAC 100W 24V 110V": "Fonte de alimentação Dimerizavel TRIAC - 60W - 24V - IP20 - BIV", "Eklart - EKA-500FKG-24P - Fonte 500W 24V IP20 BIV": "Fonte de alimentação Dimerizavel TRIAC - 100W - 24V - IP20 - 110V", "Eklart - EKA-350FGF-24 - Fonte 350W 24V IP20 BIV": "Fonte de alimentação Dimerizavel TRIAC - 100W - 24V - IP20 - 110V", "Eklart - EK110506FM - Fonte 6W 12V ON/OFF BIV": "Fonte de alimentação - 100W - 24V - IP20 - BIV", "Eklart - EKM1M33A - Controladora Dimerizável Wireless": "Fonte 6W - 12V - ON/OFF - BIV", "Eklart - EKAMP - Amplificador de Sinal": "Controladora Dimerizável Com Função Wireless / 9A 108W (12V) & 216W (24V)", "Directlight - DL EB1 - Emb. Solo 2,7W 11º 12V": "Fonte de alimentação - 200W - 24V - IP20 - BIV - PROU", "Directlight - DL EB1 - Emb. Solo 2,7W 34º 12V": "Fonte de alimentação - 350W - 24V - IP20 - BIV", "Directlight - DL EB1 - Emb. Solo 2,7W 11º BIV": "Fonte de alimentação - 500W - 24V - IP20 - BIV", "Directlight - DL EB1 - Emb. Solo 2,7W 34º BIV": "Fonte de alimentação Dimerizavel TRIAC - 150W - 24V - IP20 - 220V", "Directlight - DL EB1 - Emb. Solo 2,7W 20X65º 12V": "Amplificador de Sinal", "Directlight - DL EB1 - Emb. Solo 2,7W 20X65º BIV": "Emb. De Solo - 2,7W - 220LM - 2700K - 11º - IP66 - 12V", "Directlight - DL EB3 - Emb. Solo 7,6W 11º 12V": "Emb. De Solo - 2,7W - 220LM - 2700K - 34º - IP66 - 12V", "Directlight - DL EB3 - Emb. Solo 7,6W 11º BIV": "Emb. De Solo - 2,7W - 220LM - 2700K - 11º - IP66 - BIV", "Directlight - DL EB3 - Emb. Solo 7,6W 34º 12V": "Emb. De Solo - 2,7W - 220LM - 2700K - 34º - IP66 - BIV", "Directlight - DL EB3 - Emb. Solo 7,6W 34º BIV": "Emb. De Solo - 2,7W - 220LM - 2700K - 20X65º - IP66 - 12V", "Directlight - DL EB3 - Emb. Solo 7,6W 20X65º 12V": "Emb. De Solo - 2,7W - 220LM - 2700K - 20X65º - IP66 - BIV", "Directlight - DL EB5 - Emb. Solo 7,6W 34º BIV": "Emb. De Solo - 7,6W - 660LM - 2700K - 11º - IP66 - 12V", "Directlight - DL EP1 - Espeto 2,7W 11º 12V": "Emb. De Solo - 7,6W - 660LM - 2700K - 11º - IP66 - BIV", "Directlight - DL EP1 - Espeto 2,7W 11º BIV": "Emb. De Solo - 7,6W - 660LM - 2700K - 34º - IP66 - 12V", "Directlight - DL EP1 - Espeto 2,7W 34º 12V": "Emb. De Solo - 7,6W - 660LM - 2700K - 34º - IP66 - BIV", "Directlight - DL EP1 - Espeto 2,7W 34º BIV": "Emb. De Solo - 7,6W - 660LM - 2700K - 20X65º - IP66 - 12V", "Directlight - DL EP3 - Espeto 1,5W 11º BIV": "Emb. De Solo - 7,6W - 660LM - 2700K - 34º - IP66 - BIV", "Directlight - DL EP2 - Espeto 7,6W 34º BIV": "Emb. De Solo - 7,6W - 660LM - 2700K - 20X65º - IP66 - 12V", "Directlight - DL AR8 - Arandela 2,7W 120º 12V": "Espeto 2,7W - 220LM - 2700k - 11º - IP66 - 12V", "Directlight - DL AR8 - Arandela 2,7W 120º BIV": "Espeto 2,7W - 220LM - 2700k - 11º - IP66 - BIV", "Interlight - 7450.S.PM - Poste Balizador 6W 90º IP65": "Espeto 2,7W - 220LM - 2700k - 34º - IP66 - 12V", "Interlight - 3960C.S.PM - Balizador 1W 40º IP65 BIV": "Espeto 2,7W - 220LM - 2700k - 34º - IP66 - BIV", "Diversos - Balizador Mini 1,5W 60º BIV": "Espeto 1,5W - 157LM - 2700k - 11º - IP66 - BIV", "Directlight - DL SP1 - Spot 2,7W 11º BIV": "Espeto 7,6W - 660LM - 2700k - 34º - IP66 - BIV", "Directlight - DL SP1 - Spot 2,7W 34º BIV": "Arandela 2,7W - 220LM - 2700K - 120º - IP66 - 12V", "Directlight - DL SP2 - Spot 7,6W 11º BIV": "Arandela 2,7W - 220LM - 2700K - 120º - IP66 - BIV", "Directlight - DL SP2 - Spot 7,6W 34º BIV": "Spot 2,7W - 220LM - 2700K - 11º - IP66 - BIV", "Directlight - DL TT5 - Spot 2,7W 11º BIV Preto/Branco": "Spot 2,7W - 220LM - 2700K - 34º - IP66 - BIV", "Directlight - DL TT5 - Spot 2,7W 34º BIV Preto/Branco": "Spot 7,6W - 220LM - 2700K - 11º - IP66 - BIV", "Directlight - DL TT14 - Spot 2,7W 11º BIV Preto/Branco": "Spot 7,6W - 220LM - 2700K - 34º - IP66 - BIV", "Directlight - DL TT14 - Spot 2,7W 34º BIV Preto/Branco": "Spot 2,7W - 220LM - 2700K - 11º - IP66 - BIV", "Interlight - 7400-UA-S - Projetor P/ Tronco 6W 90º IP65": "Spot 2,7W - 220LM - 2700K - 34º - IP66 - BIV", "Interlight - 7401-MA-S - Projetor P/ Haste 6W 60º IP65": "Spot 2,7W - 220LM - 2700K - 11º - IP66 - BIV", "Misterled - SLED1150 - Mini Emb. 2,5W 20º BIV": "Spot 2,7W - 220LM - 2700K - 34º - IP66 - BIV", "Misterled - SLED1200 - Embutido 1,5W 20º BIV": "Mini Emb. 2,5W - 74LM - 2700K - 20º - IP20 - BIV", "Misterled - SLED1200 - Embutido 1,5W 45º BIV": "Embutido 1,5W - 64LM - 2700K - 20º - IP20 - BIV", "Misterled - SLED1200 - Embutido 3W 20º BIV": "Embutido 1,5W - 64LM - 2700K - 45º - IP20 - BIV", "Misterled - SLED1200 - Embutido 3W 45º BIV": "Embutido 3W -165LM - 2700K - 20º - IP20 - BIV", "Misterled - SLED1220 - Embutido 6W 15º IP65": "Embutido 3W -164LM - 2700K - 45º - IP20 - BIV", "Misterled - SLED1220 - Embutido 6W 36º IP65": "Embutido 6W - 293LM - 2700K - 15º - IP65 - BIV", "Misterled - SLED1220 - Embutido 6W 50º IP65": "Embutido 6W - 319LM - 2700K - 36º - IP65 - BIV", "Misterled - SLED1230 - Embutido 6W 35º BIV": "Embutido 6W - 340LM - 2700K - 50º - IP65 - BIV", "Misterled - SLED1231 - Embutido NO-FRAME 6W 15º BIV": "Embutido 6W - 505LM - 2700K - 35º - IP20 - BIV", "Misterled - SLED1231 - Embutido NO-FRAME 6W 35º BIV": "Embutido NO-FRAME 6W - 411LM - 2700K - 15º - IP20 - BIV", "Misterled - SLED1231 - Embutido NO-FRAME 6W 50º BIV": "Embutido NO-FRAME 6W - 505LM - 2700K - 35º - IP20 - BIV", "Misterled - SLED1232 - Embutido 10W 15º BIV": "Embutido NO-FRAME 6W - 422LM - 2700K - 50º - IP20 - BIV", "Misterled - SLED1233 - Embutido NO-FRAME 10W 15º BIV": "Embutido 10W - 854LM - 2700K - 15º - IP20 - BIV", "Misterled - SLED1233 - Embutido NO-FRAME 10W 35º BIV": "Embutido NO-FRAME 10W - 854LM - 2700K - 15º - IP20 - BIV", "Misterled - SLED1234 - Embutido 20W 15º BIV": "Embutido NO-FRAME 10W - 724LM - 2700K - 35º - IP20 - BIV", "Interlight - 4581 - Embutido Orientavel 3W 12º BIV": "Embutido 20W - 1438LM - 2700K - 15º - IP20 - BIV", "Interlight - 4581 - Embutido Orientavel 3W 34º BIV": "Perfil de Embutir Indireto - 11W - 770LM - IRC95 - 2700K - 12V", "Interlight - 4581 - Embutido Orientavel 3W 48º BIV": "Embutido Orientavel 3W - 180LM - 2700K - 12º - IP20 - BIV", "Interlight - 4582 - Embutido Orientavel 7W 34º BIV": "Embutido Orientavel 3W - 180LM - 2700K - 34º - IP20 - BIV", "Interlight - 4411/4481 - Embutido 3W 34º/36º IP54 BIV": "Embutido Orientavel 3W - 180LM - 2700K - 48º - IP20 - BIV", "Interlight - 4991 - Embutido 3W 12º BIV": "Embutido Orientavel 7W - 540LM - 2700K - 34º - IP20 - BIV", "Interlight - 4992 - Embutido 7W 12º/34º/48º BIV": "Embutido NO-FRAME 3W - 135LM - 2700K - 34º - IP54 - BIV", "Interlight - 4995.AS.S.PM - Embutido Assimetrico 6W": "Embutido 3W - 135LM - 2700K - 36º - IP54 - BIV", "Interlight - 4894 - Embutido 10W 12º/34º/48º BIV": "Embutido 3W - 180LM - 2700K - 12º - IP20 - BIV", "Interlight - 4583 - Embutido Orientavel 14W 12º/34º/48º BIV": "Embutido 7W - 540LM - 2700K - 12º - IP20 - BIV", "Interlight - 4412.FE.S - Embutido NO-FRAME 7W 12º/34º/48º BIV": "Embutido Assimetrico - 6W - 456LM - 2700K - IP20 - BIV", "Interlight - 4413.FE.S - Embutido NO-FRAME 10W 12º/34º/48º BIV": "Embutido 7W - 540LM - 2700K - 34º - IP20 - BIV", "Interlight - 4495.AS.S - Embutido Wallwasher 10W BIV": "Embutido 7W - 540LM - 2700K - 48º - IP20 - BIV", "Diversos - Spot semi-embutido 1,5W 30º 12V": "Embutido Orientavel 7W - 540LM - 2700K - 12º - IP20 - BIV", "Diversos - Spot mini embutido 1,5W 30º 12V": "Embutido Orientavel 7W - 540LM - 2700K - 34º - IP20 - BIV", "Stella - STL25901BR/27 - Spot semi-embutido 1,5W 30º": "Embutido Orientavel 7W - 540LM - 2700K - 48º - IP20 - BIV", "W22 - SLED 9084": "Embutido 5W - 360LM - 2700K - 34º - IP20 - BIV", "Diversos - Painel de Embutir 14W 3000K": "Embutido 10W - 720LM - 2700K - 12º - IP20 - BIV", "Diversos - Painel de Sobrepor 17W 3000K": "Embutido 10W - 720LM - 2700K - 34º - IP20 - BIV", "Diversos - Painel de Embutir 20W 3000K": "Embutido 10W - 720LM - 2700K - 48º - IP20 - BIV", "Diversos - Painel Embutir S. Recuado 10W 3000K": "Embutido Orientavel 14W - 1080LM - 2700K - 12º - IP20 - BIV", "Diversos - Painel Embutir S. Recuado 20W 3000K": "Embutido Orientavel 14W - 1080LM - 2700K -34º - IP20 - BIV", "Diversos - STH21964Q/30 - Painel Sobrepor 24W 3000K": "Embutido Orientavel 14W - 1080LM - 2700K -48º - IP20 - BIV", "Stella - STH20903BR/30 - Painel Sobrepor 17W Branco 2700K": "Embutido NO-FRAME 7W - 405LM - 2700K - 12º - IP20 - BIV", "Stella - STL23905PTO/30": "Embutido NO-FRAME 7W - 405LM - 2700K - 34º - IP20 - BIV", "Interlight - ACS.0144 - Acessório Cinta 50CM": "Embutido NO-FRAME 7W - 405LM - 2700K - 48º - IP20 - BIV", "Interlight - HST-1800 - Haste para luminarias 1,80m": "Embutido NO-FRAME 10W - 810LM - 2700K - 12º - IP20 - BIV", "Interlight - HST-1200 - Haste para luminarias 1,20m": "Embutido NO-FRAME 10W - 810LM - 2700K - 34º - IP20 - BIV"};

    if (tipo && CATALOGO[tipo]) {
      CATALOGO[tipo].forEach((item) => {
        const opt = document.createElement('option');
        opt.value = item.modelo;
        opt.textContent = pecaMap[item.modelo] || item.modelo;
        modeloSelect.appendChild(opt);
      });
    } else if (!tipo) {
      Object.keys(CATALOGO).forEach(cat => {
        CATALOGO[cat].forEach((item) => {
          const opt = document.createElement('option');
          opt.value = item.modelo;
          opt.textContent = pecaMap[item.modelo] || item.modelo;
          modeloSelect.appendChild(opt);
        });
      });
    }
  }
function atualizarPreco() {
  const tipo = document.getElementById('tipoLuminaria').value;
  const modelo = document.getElementById('modeloLuminaria').value;
  const precoInput = document.getElementById('precoUnitario');

  if (tipo && modelo && CATALOGO[tipo]) {
    const produto = CATALOGO[tipo].find((p) => p.modelo === modelo);
    if (produto) {
      if (precoInput) precoInput.value = formatBRL(produto.preco);
      return;
    }
  }
  if (precoInput) precoInput.value = \'\';
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
  const corInput = document.getElementById('corLuminaria');
  const ambienteInput = document.getElementById('ambienteLuminaria');
  const localInput = document.getElementById('localLuminaria');
  const acendimentoInput = document.getElementById('acendimentoLuminaria');
  const quantidadeInput = document.getElementById('quantidade');

  const tipo = tipoSelect.value;
  const produto = getProdutoSelecionado();
  const cor = corInput.value.trim();
  const ambiente = ambienteInput.value.trim();
  const local = localInput.value.trim();
  const acendimento = acendimentoInput.value.trim();
  const quantidade = parseInt(quantidadeInput.value, 10);

  if (!tipo) { tipoSelect.focus(); return; }
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
  modeloSelect.innerHTML = '<option value="">Selecione o modelo...</option>';
  modeloSelect.disabled = true;
  corInput.value = '';
  ambienteInput.value = '';
  localInput.value = '';
  acendimentoInput.value = '';
  quantidadeInput.value = 1;
  if (document.getElementById(\'precoUnitario\')) document.getElementById(\'precoUnitario\').value = \'\';
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





atualizarModelos();







