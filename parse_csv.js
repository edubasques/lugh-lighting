const fs = require('fs');

const csv = `MARCA,PRODUTO,EKPF100,PEÇA,ACABAMENTO,QUANT,OBS,CUSTO,Margem (%),Custo + margem,Outros Custos ,Preço de Venda
Eklart,Perfis,EKPF11,"Perfil de Embutir - 2,5 x 1,5 ",Aluminio Natural,2 Metros,,46.45,0.4,65.03,0.85,76.505882352941185
,,EKPF11,"Perfil de Embutir - 2,5 x 1,5 ",Branco,2 Metros,,64.28,0.4,89.992,0.85,105.87294117647059
,,EKPF11,"Perfil de Embutir - 2,5 x 1,5 ",Preto,2 Metros,,64.28,0.4,89.992,0.85,105.87294117647059
,,EKPF100,"Perfil de Embutir Recuado - 3,7x3,6",Branco,,,290.8,0.4,407.12,0.85,478.964705882353
,,EKPF12,"Perfil de Sobrepor - 2,0 x 1,5 ",Aluminio Natural,2 Metros,,45.37,0.4,63.518,0.85,74.727058823529418
,,EKPF12,"Perfil de Sobrepor - 2,0 x 1,5 ",Branco,2 Metros,,62.94,0.4,88.116,0.85,103.66588235294118
,,EKPF12,"Perfil de Sobrepor - 2,0 x 1,5 ",Preto,2 Metros,,62.94,0.4,88.116,0.85,103.66588235294118
,,EKPF21,"Perfil de Embutir - 2,3 x 0,9",Aluminio Natural,2 Metros,,44.65,0.4,62.51,0.85,73.54117647058824
,,EKPF21,"Perfil de Embutir - 2,3 x 0,9",Branco,2 Metros,,63.02,0.4,88.228000000000009,0.85,103.79764705882354
,,EKPF21,"Perfil de Embutir - 2,3 x 0,9",Preto,2 Metros,,63.02,0.4,88.228000000000009,0.85,103.79764705882354
,,EKPF22,"Perfil de Sobrepor - 2,0 x 0,9",Aluminio Natural,2 Metros,,46.89,0.4,65.646,0.85,77.230588235294121
,,EKPF22,"Perfil de Sobrepor - 2,0 x 0,9 ",Branco,2 Metros,,63,0.4,88.2,0.85,103.76470588235294
,,EKPF22,"Perfil de Sobrepor - 2,0 x 0,9",Preto,2 Metros,,63,0.4,88.2,0.85,103.76470588235294
,,EKPF32,"Perfil de Sobrepor 45 difuso - 1,6 x 1,6",Aluminio Natural,2 Metros,,55.35,0.4,77.490000000000009,0.85,91.164705882352948
,,EKPF32,"Perfil de Sobrepor 45 difuso - 1,6 x 1,6",Branco,2 Metros,,71.48,0.4,100.072,0.85,117.73176470588236
,,EKPF32,"Perfil de Sobrepor 45 difuso - 1,6 x 1,6",Preto,2 Metros,,71.48,0.4,100.072,0.85,117.73176470588236
,,EKPF32,"Perfil de Sobrepor 45 difuso - 1,6 x 1,6",Aluminio Natural,3 Metros,,83.05,0.4,116.27,0.85,136.78823529411764
,,EKPF86FLEX, Perfil Flexível de Silicone Para Fita LED com Difusor Leitoso C 10m,,,,789.4,0.4,1105.1599999999999,0.85,1300.1882352941175
,,EKPF1616FLEX,Perfil Flexível de Silicone Para Fita LED com Difusor Leitoso C50m x A1.6cm x L1.6cm (VENDA A METRO),,,,58.7,0.4,82.18,0.85,96.682352941176475
,,EKPF1020FLEX,Perfil Flexível de Silicone Para Fita LED com Difusor Leitoso 50m x A 2cm x L 1cm (VENDA A METRO),,,,47.1,0.4,65.94,0.85,77.5764705882353
,,EKPF191,Perfil de Alumínio BR P/ Fita LED com Difusor Leitoso P/ Soprepor/Rodateto C 3m X A 3.5cm X L 3.5cm,,,,395.41,0.4,553.57400000000007,0.85,651.26352941176481
,,EKPF33,"Perfil de Sobrepor 45 - 1,9 x 1,9",Aluminio Natural,2 Metros,,66.9,0.4,93.660000000000011,0.85,110.18823529411766
,,EKPF33,"Perfil de Sobrepor 45 - 1,9 x 1,9",Branco,2 Metros,,84.7,0.4,118.58000000000001,0.85,139.5058823529412
,,EKPF33,"Perfil de Sobrepor 45 - 1,9 x 1,9",Preto,2 Metros,,84.7,0.4,118.58000000000001,0.85,139.5058823529412
,,EKPF57,"Perfil de Embutir - 3,5 x 3,5",Aluminio Natural,2 Metros,,171.9,0.4,240.66000000000003,0.85,283.12941176470594
,,EKPF57,"Perfil de Embutir - 3,5 x 3,5",Branco,2 Metros,,192.8,0.4,269.92,0.85,317.5529411764706
,,EKPF57,"Perfil de Embutir - 3,5 x 3,5",Preto,2 Metros,,192.8,0.4,269.92,0.85,317.5529411764706
,,EKPF61,"Perfil de Sobrepor - 3,5 x 3,5",Aluminio Natural,2 Metros,,178.2,0.4,249.48,0.85,293.50588235294117
,,EKPF61,"Perfil de Sobrepor - 3,5 x 3,5",Branco,2 Metros,,199.1,0.4,278.74,0.85,327.92941176470589
,,EKPF61,"Perfil de Sobrepor - 3,5 x 3,5",Preto,2 Metros,,199.1,0.4,278.74,0.85,327.92941176470589
,,EKPF64,Perfil de Alumínio PR Para Fita LED com Difusor Leitoso Sobrepor/ Pendente C 3m X A 5cm X L 3.6cm,,,,307.6,0.4,430.64000000000004,0.85,506.63529411764711
,,EKPF88,"Perfil de Sobrepor / Embutir WW - 3,3 x 1,5",Aluminio Natural,2 Metros,,100.2,0.4,140.28,0.85,165.03529411764706
,,EKPF88,"Perfil de Sobrepor / Embutir WW - 3,3 x 1,5",Brancp,2 Metros,,123.2,0.4,172.48000000000002,0.85,202.91764705882355
,,EKPF88,"Perfil de Sobrepor / Embutir WW - 3,3 x 1,5",Preto,2 Metros,,123.2,0.4,172.48000000000002,0.85,202.91764705882355
,,EKPF95,"Perfil de Embutir NO FRAME - 8,8 x 1,9",Aluminio Natural,3 Metros,,307.3,0.4,430.22,0.85,506.14117647058828
,,EKPF95,"Perfil de Embutir NO FRAME - 8,8 x 1,9",Branco,3 Metros,,330.3,0.4,462.42,0.85,544.02352941176468
,Fitas,EKF5105958MM,Fita Led 5W - 600lm/m - 2700k - 24V - IRC95 - IP20,,5 Metros,,109.51,0.4,153.31400000000002,0.85,180.36941176470592
,,EKF4148HL95,Fita Led 5W - 450lm/m - 2700k - 12V - IRC95 - IP20,,,,77.67,0.4,108.738,0.85,127.92705882352942
,,EKF5105COB95,Fita Led 5W COB - 450lm/m - 2700k - 24V - IRC95 - IP20,,5 Metros,,202.57,0.4,283.598,0.85,333.644705882353
,,EKF51964MM,Fita Led 10W 4.6mm - 950lm/m - 2700k - 24V - IRC90 - IP20,,5 Metros,,202.57,0.4,283.598,0.85,333.644705882353
,,EKF51964MM,Fita LED SLIM 2835 120LEDS/M 4.6MM 24V 10W/M IP20 2700K IRC>90 950LM/M 5M/Rolo,,,,104.7,0.4,146.58,0.85,172.44705882352943
,,EKF5196HL90,Fita Led 10W - 950lm/m - 2700k - 24V - IRC90 - IP20,,5 Metros,,115,0.4,161,0.85,189.41176470588235
,,EKF5196HL95,Fita Led 10W - 950lm/m - 2700k - 24V - IRC95 - IP20,,5 Metros,,120.75,0.4,169.05,0.85,198.88235294117649
,,EKF5114HL90,Fita Led 14W - 1500lm/m - 2700k - 24V - IRC90 - IP20,,5 Metros,,150.5,0.4,210.7,0.85,247.88235294117646
,,EKF5114HL95,Fita Led 14W - 1400lm/m - 2700k - 24V - IRC90 - IP20,,5 Metros,,159.16,0.4,222.824,0.85,262.14588235294121
,,EKF5116HL95,Fita Led 16W - 1800lm/m - 2700k - 24V - IRC95 - IP20,,,,203.59,0.4,285.026,0.85,335.324705882353
,,EKF5116HL90,Fita Led 16W - 1840lm/m - 2700k - 24V - IRC90 - IP20,,5 Metros,,193.9,0.4,271.46000000000004,0.85,319.364705882353
,,EKF5116HL95,Fita Led 16W - 1800lm/m - 2700k - 24V - IRC90 - IP20,,5 Metros,,203.59,0.4,285.026,0.85,335.324705882353
,,EKF5216HL95,Fita LED 2835 176LEDS/M 24V 16W/M IP20 3000K IRC>95 1900LM/M 5M/Rolo,,,,203.59,0.4,285.026,0.85,335.324705882353
,,EKF5124HL95,Fita Led 24W - 2800lm/m - 2700k - 24V - IRC95 - IP20,,5 Metros,,295.19,0.4,413.266,0.85,486.19529411764711
,,EKF514812010PRO,Fita LED PRO 2835 120LEDS/M 24V 5W/M IP20 2700K IRC98 425LM/M 10M/Rolo,,,,402.4,0.4,563.36,0.85,662.77647058823538
,,EKF51406000,Fita Led 40W - 6000lm/m - 2700k - 24V - IRC80 - IP20,,5 Metros,,196.8,0.4,275.52000000000004,0.85,324.14117647058828
,Fontes,EK-CYX-35-24,Fonte de alimentação Blindada - 35W - 24V - IP67 - BIV,,1 Unid.,,115.8,0.4,162.12,0.85,190.7294117647059
,,EK-CYX-75-24,Fonte de alimentação Blindada - 75W - 24V - IP67 - BIV,,1 Unid.,,182.85,0.4,255.99,0.85,301.16470588235296
,,EK-CYX-100-24,Fonte de alimentação Blindada - 100W - 24V - IP67 - BIV,,1 Unid.,,205,0.4,287,0.85,337.64705882352945
,,EK-CYX-150-24,Fonte de alimentação Blindada - 150W - 24V - IP67 - BIV,,1 Unid.,,229.75,0.4,321.65,0.85,378.41176470588232
,,EK2130036FS,Fonte de alimentação Slim - 36W - 24V - IP20 - BIV,,1 Unid.,,69.3,0.4,97.02,0.85,114.14117647058823
,,EK1115018FS,"Fonte de alimentação Slim 12V 1,5A 18W IP20",,,,39.3,0.4,55.019999999999996,0.85,64.729411764705873
,,EK2115018FS,Fita Led 5W - 600lm/m - 2700k - 24V - IRC95 - IP20,,,,39.3,0.4,55.019999999999996,0.85,64.729411764705873
,,EK2150060FS,Fonte de alimentação Slim - 60W - 24V - IP20 - BIV,,1 Unid.,,91,0.4,127.4,0.85,149.88235294117649
,,EK110024DIMF,Fonte 100W - 24V - 127V - DIM,,,,407.92,0.4,571.088,0.85,671.86823529411765
,,EKA-35FGB-24,Fonte de alimentação Aberta - 35W - 24V - IP20 - BIV,,1 Unid.,,72.76,0.4,101.864,0.85,119.84
,,EKA-75FAM-24,Fonte de alimentação Aberta - 75W - 24V - IP20 - BIV,,1 Unid.,,97,0.4,135.8,0.85,159.76470588235296
,,EKA-100FGC-24,Fonte de alimentação Aberta - 100W - 24V - IP20 - BIV,,1 Unid.,,108,0.4,151.2,0.85,177.88235294117646
,,EKA-200FKD-24P,"Fonte de Alimentação PROU 24V 8,3A 200W IP20 FP 0.95 Bivolt",,,,275.63,0.4,385.882,0.85,453.97882352941178
,,EKA-150FGD-24,Fonte de alimentação Aberta - 150W - 24V - IP20 - BIV,,1 Unid.,,142.26,0.4,199.164,0.85,234.31058823529412
,,EK2183100FS,Fonte de alimentação Slim Aberta - 100W - 24V - IP20 - BIV,,1 Unid.,,116.55,0.4,163.17000000000002,0.85,191.96470588235297
,,EK2162150FS,Fonte de alimentação Slim Aberta - 150W - 24V - IP20 - BIV,,1 Unid.,,152.9,0.4,214.06,0.85,251.83529411764707
,,EK02060DIMF,Fonte de alimentação Dimerizavel TRIAC - 60W - 24V - IP20 - BIV,,1 Unid.,,310.25,0.4,434.35,0.85,511.00000000000006
,,EK02120DIMF ,Fonte de alimentação Dimerizavel TRIAC - 100W - 24V - IP20 - 110V,,1 Unid.,,407.92,0.4,571.088,0.85,671.86823529411765
,,EK110024DIMF,Fonte de alimentação Dimerizavel TRIAC - 100W - 24V - IP20 - 110V,Comprida,1 Unid.,,407.92,0.4,571.088,0.85,671.86823529411765
,,EKA-500FKG-24P,Fonte de alimentação - 100W - 24V - IP20 - BIV,,,,611.89,0.4,856.646,0.85,1007.8188235294117
,,EK110506FM,Fonte 6W - 12V - ON/OFF - BIV,,,,28.55,0.4,39.97,0.85,47.023529411764706
,,EKM1M33A,Controladora Dimerizável Com Função Wireless / 9A 108W (12V) & 216W (24V),,,,210.1,0.4,294.14,0.85,346.04705882352943
,,EKA-200FKD-24P,Fonte de alimentação - 200W - 24V - IP20 - BIV - PROU,,,,275.63,0.4,385.882,0.85,453.97882352941178
,,EKA-350FGF-24,Fonte de alimentação - 350W - 24V - IP20 - BIV,,,,231.53,0.4,324.142,0.85,381.34352941176473
,,EKA-500FKG-24P,Fonte de alimentação - 500W - 24V - IP20 - BIV,,,,611.89,0.4,856.646,0.85,1007.8188235294117
,,EK215024DIMF,Fonte de alimentação Dimerizavel TRIAC - 150W - 24V - IP20 - 220V,Comprida,1 Unid.,,407.92,0.4,571.088,0.85,671.86823529411765
,,EKAMP,Amplificador de Sinal,,,,228.4,0.4,319.76,0.85,376.18823529411765
Directlight,Embutido Solo,DL EB1,"Emb. De Solo - 2,7W - 220LM - 2700K - 11º - IP66 - 12V",Preto ou Marrom,1 Unid.,,174.95,0.4,244.93,0.85,288.15294117647062
,,DL EB1,"Emb. De Solo - 2,7W - 220LM - 2700K - 34º - IP66 - 12V",Preto  ou Marrom,1 Unid.,,174.95,0.4,244.93,0.85,288.15294117647062
,,DL EB1,"Emb. De Solo - 2,7W - 220LM - 2700K - 11º - IP66 - BIV",Preto ou Marrom,1 Unid.,,174.95,0.4,244.93,0.85,288.15294117647062
,,DL EB1,"Emb. De Solo - 2,7W - 220LM - 2700K - 34º - IP66 - BIV",Preto ou Marrom,1 Unid.,,174.95,0.4,244.93,0.85,288.15294117647062
,,DL EB1,"Emb. De Solo - 2,7W - 220LM - 2700K - 20X65º - IP66 - 12V",Preto ou Marrom,1 Unid.,,185.03,0.4,259.04200000000003,0.85,304.75529411764711
,,DL EB1,"Emb. De Solo - 2,7W - 220LM - 2700K - 20X65º - IP66 - BIV",Preto ou Marrom,1 Unid.,,185.03,0.4,259.04200000000003,0.85,304.75529411764711
,,DL EB3,"Emb. De Solo - 7,6W - 660LM - 2700K - 11º - IP66 - 12V",Preto ou Marrom,1 Unid.,,77.73,0.4,108.822,0.85,128.02588235294118
,,DL EB3,"Emb. De Solo - 7,6W - 660LM - 2700K - 11º - IP66 - BIV",Preto ou Marrom,1 Unid.,,77.73,0.4,108.822,0.85,128.02588235294118
,,DL EB3,"Emb. De Solo - 7,6W - 660LM - 2700K - 34º - IP66 - 12V",Preto ou Marrom,1 Unid.,,77.73,0.4,108.822,0.85,128.02588235294118
,,DL EB3,"Emb. De Solo - 7,6W - 660LM - 2700K - 34º - IP66 - BIV",Preto ou Marrom,1 Unid.,,77.73,0.4,108.822,0.85,128.02588235294118
,,DL EB3,"Emb. De Solo - 7,6W - 660LM - 2700K - 20X65º - IP66 - 12V",Preto ou Marrom,1 Unid.,,77.73,0.4,108.822,0.85,128.02588235294118
,,DL EB5,"Emb. De Solo - 7,6W - 660LM - 2700K - 34º - IP66 - BIV",,,,308.39,0.4,431.746,0.85,507.9364705882353
,,DL EB3,"Emb. De Solo - 7,6W - 660LM - 2700K - 20X65º - IP66 - 12V",Preto ou Marrom,1 Unid.,,77.73,0.4,108.822,0.85,128.02588235294118
,Espeto,DL EP1,"Espeto 2,7W - 220LM - 2700k - 11º - IP66 - 12V",Preto ou Marrom,1 Unid.,,179.41,0.4,251.17399999999998,0.85,295.49882352941177
,,DL EP1,"Espeto 2,7W - 220LM - 2700k - 11º - IP66 - BIV",Preto ou Marrom,1 Unid.,,179.41,0.4,251.17399999999998,0.85,295.49882352941177
,,DL EP1,"Espeto 2,7W - 220LM - 2700k - 34º - IP66 - 12V",Preto ou Marrom,1 Unid.,,179.41,0.4,251.17399999999998,0.85,295.49882352941177
,,DL EP1,"Espeto 2,7W - 220LM - 2700k - 34º - IP66 - BIV",Preto ou Marrom,1 Unid.,,179.41,0.4,251.17399999999998,0.85,295.49882352941177
,,DL EP3,"Espeto 1,5W - 157LM - 2700k - 11º - IP66 - BIV",,,,120.4,0.4,168.56,0.85,198.30588235294118
,,DL EP2,"Espeto 7,6W - 660LM - 2700k - 34º - IP66 - BIV",Preto ou Marrom,1 Unid.,,316.69,0.4,443.366,0.85,521.60705882352943
,Arandela,DL AR8,"Arandela 2,7W - 220LM - 2700K - 120º - IP66 - 12V",Preto ou Marrom,1 Unid.,,167.54,0.4,234.55599999999998,0.85,275.94823529411764
,,DL AR8,"Arandela 2,7W - 220LM - 2700K - 120º - IP66 - BIV",Preto ou Marrom,1 Unid.,,305,0.4,427,0.85,502.35294117647061
,Spot,DL SP1,"Spot 2,7W - 220LM - 2700K - 11º - IP66 - BIV","Preto, Marrom ou Bco",1 Unid.,,167.54,0.4,234.55599999999998,0.85,275.94823529411764
,,DL SP1,"Spot 2,7W - 220LM - 2700K - 34º - IP66 - BIV","Preto, Marrom ou Bco",1 Unid.,,167.54,0.4,234.55599999999998,0.85,275.94823529411764
,,DL SP2,"Spot 7,6W - 220LM - 2700K - 11º - IP66 - BIV","Preto, Marrom ou Bco",1 Unid.,,310.93,0.4,435.302,0.85,512.12
,,DL SP2,"Spot 7,6W - 220LM - 2700K - 34º - IP66 - BIV","Preto, Marrom ou Bco",1 Unid.,,310.93,0.4,435.302,0.85,512.12
,,DL TT5,"Spot 2,7W - 220LM - 2700K - 11º - IP66 - BIV",Preto Ou Branco,1 Unid.,,163.1,0.4,228.33999999999997,0.85,268.63529411764705
,,DL TT5,"Spot 2,7W - 220LM - 2700K - 34º - IP66 - BIV",Preto Ou Branco,1 Unid.,,163.1,0.4,228.33999999999997,0.85,268.63529411764705
,,DL TT14,"Spot 2,7W - 220LM - 2700K - 11º - IP66 - BIV",Preto Ou Branco,1 Unid.,,153.73,0.4,215.22199999999998,0.85,253.20235294117646
,,DL TT14,"Spot 2,7W - 220LM - 2700K - 34º - IP66 - BIV",Preto Ou Branco,1 Unid.,,153.73,0.4,215.22199999999998,0.85,253.20235294117646
Misterled,Embutido,SLED1150,"Mini Emb. 2,5W - 74LM - 2700K - 20º - IP20 - BIV",Preto Ou Branco,1 Unid.,,57,0.4,79.8,0.85,93.882352941176464
,,SLED1200,"Embutido 1,5W - 64LM - 2700K - 20º - IP20 - BIV",Branco Com Preto,1 Unid.,,68,0.4,95.2,0.85,112
,,SLED1200,"Embutido 1,5W - 64LM - 2700K - 45º - IP20 - BIV",Branco Com Preto,1 Unid.,,68,0.4,95.2,0.85,112
,,SLED1200,Embutido 3W -165LM - 2700K - 20º - IP20 - BIV,Branco Com Preto,1 Unid.,,80,0.4,112,0.85,131.76470588235296
,,SLED1200,Embutido 3W -164LM - 2700K - 45º - IP20 - BIV,Branco Com Preto,1 Unid.,,80,0.4,112,0.85,131.76470588235296
,,SLED1220,Embutido 6W - 293LM - 2700K - 15º - IP65 - BIV,Branco,1 Unid.,,137,0.4,191.8,0.85,225.64705882352942
,,SLED1220,Embutido 6W - 319LM - 2700K - 36º - IP65 - BIV,Branco,1 Unid.,,137,0.4,191.8,0.85,225.64705882352942
,,SLED1220,Embutido 6W - 340LM - 2700K - 50º - IP65 - BIV,Branco,1 Unid.,,137,0.4,191.8,0.85,225.64705882352942
,,SLED1230,Embutido 6W - 505LM - 2700K - 35º - IP20 - BIV,Bco/Bco ou Bco/Pto,1 Unid.,,114,0.4,159.6,0.85,187.76470588235293
,,SLED1231,Embutido NO-FRAME 6W - 411LM - 2700K - 15º - IP20 - BIV,Bco/Bco ou Bco/Pto,1 Unid.,,126,0.4,176.4,0.85,207.52941176470588
,,SLED1231,Embutido NO-FRAME 6W - 505LM - 2700K - 35º - IP20 - BIV,Bco/Bco ou Bco/Pto,1 Unid.,,126,0.4,176.4,0.85,207.52941176470588
,,SLED1231,Embutido NO-FRAME 6W - 422LM - 2700K - 50º - IP20 - BIV,Bco/Bco ou Bco/Pto,1 Unid.,,126,0.4,176.4,0.85,207.52941176470588
,,SLED1232,Embutido 10W - 854LM - 2700K - 15º - IP20 - BIV,Bco/Bco ou Bco/Pto,1 Unid.,,149,0.4,208.6,0.85,245.41176470588235
,,SLED1233,Embutido NO-FRAME 10W - 854LM - 2700K - 15º - IP20 - BIV,Bco/Bco ou Bco/Pto,1 Unid.,,161,0.4,225.4,0.85,265.1764705882353
,,SLED1233,Embutido NO-FRAME 10W - 724LM - 2700K - 35º - IP20 - BIV,Bco/Bco ou Bco/Pto,1 Unid.,,161,0.4,225.4,0.85,265.1764705882353
,,SLED1234,Embutido 20W - 1438LM - 2700K - 15º - IP20 - BIV,Bco/Bco ou Bco/Pto,1 Unid.,,241,0.4,337.4,0.85,396.94117647058823
,,SLED9068 (R27),Perfil de Embutir Indireto - 11W - 770LM - IRC95 - 2700K - 12V,,,,273,0.4,382.2,0.85,449.64705882352939
Interlight,Embutido,4581.FE.S.,Embutido Orientavel 3W - 180LM - 2700K - 12º - IP20 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,88.62,0.4,124.06800000000001,0.85,145.96235294117648
,,4581.AB.S,Embutido Orientavel 3W - 180LM - 2700K - 34º - IP20 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,88.62,0.4,124.06800000000001,0.85,145.96235294117648
,,4581.MA.S.,Embutido Orientavel 3W - 180LM - 2700K - 48º - IP20 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,88.62,0.4,124.06800000000001,0.85,145.96235294117648
,,4582.AB.S.PM,Embutido Orientavel 7W - 540LM - 2700K - 34º - IP20 - BIV,,,,134.88,0.4,188.832,0.85,222.15529411764706
,,4411.AB.S.IP54,Embutido NO-FRAME 3W - 135LM - 2700K - 34º - IP54 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,135.6,0.4,189.84,0.85,223.34117647058824
,,4481.AB.S.BM.IP54,Embutido 3W - 135LM - 2700K - 36º - IP54 - BIV,,,,105.2,0.4,147.28,0.85,173.27058823529413
,,4991.FE.S.PM,Embutido 3W - 180LM - 2700K - 12º - IP20 - BIV,,,,74.14,0.4,103.796,0.85,122.1129411764706
,,4992.FE.S,Embutido 7W - 540LM - 2700K - 12º - IP20 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,115.68,0.4,161.952,0.85,190.53176470588235
,,4995.AS.S.PM,Embutido Assimetrico - 6W - 456LM - 2700K - IP20 - BIV,,,,202.27,0.4,283.178,0.85,333.15058823529415
,,4992.AB.S,Embutido 7W - 540LM - 2700K - 34º - IP20 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,115.68,0.4,161.952,0.85,190.53176470588235
,,4992.MA.S,Embutido 7W - 540LM - 2700K - 48º - IP20 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,115.68,0.4,161.952,0.85,190.53176470588235
,,4582.FE.S,Embutido Orientavel 7W - 540LM - 2700K - 12º - IP20 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,134.88,0.4,188.832,0.85,222.15529411764706
,,4582.AB.S,Embutido Orientavel 7W - 540LM - 2700K - 34º - IP20 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,134.88,0.4,188.832,0.85,222.15529411764706
,,4582.MA.S,Embutido Orientavel 7W - 540LM - 2700K - 48º - IP20 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,134.88,0.4,188.832,0.85,222.15529411764706
,,4892.AB.S.PM,Embutido 5W - 360LM - 2700K - 34º - IP20 - BIV,,,,104.7,0.4,146.58,0.85,172.44705882352943
,,4894.FE.S,Embutido 10W - 720LM - 2700K - 12º - IP20 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,220.71,0.4,308.994,0.85,363.52235294117651
,,4894.AB.S,Embutido 10W - 720LM - 2700K - 34º - IP20 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,220.71,0.4,308.994,0.85,363.52235294117651
,,4894.MA.S,Embutido 10W - 720LM - 2700K - 48º - IP20 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,220.71,0.4,308.994,0.85,363.52235294117651
,,4583.FE.S,Embutido Orientavel 14W - 1080LM - 2700K - 12º - IP20 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,237.94,0.4,333.116,0.85,391.90117647058821
,,4583.AB.S,Embutido Orientavel 14W - 1080LM - 2700K -34º - IP20 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,237.94,0.4,333.116,0.85,391.90117647058821
,,4583.MA.S,Embutido Orientavel 14W - 1080LM - 2700K -48º - IP20 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,237.94,0.4,333.116,0.85,391.90117647058821
,,4412.FE.S,Embutido NO-FRAME 7W - 405LM - 2700K - 12º - IP20 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,159.41,0.4,223.174,0.85,262.55764705882353
,,4412.AB.S,Embutido NO-FRAME 7W - 405LM - 2700K - 34º - IP20 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,159.41,0.4,223.174,0.85,262.55764705882353
,,4412.MA.S,Embutido NO-FRAME 7W - 405LM - 2700K - 48º - IP20 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,159.41,0.4,223.174,0.85,262.55764705882353
,,4413.FE.S,Embutido NO-FRAME 10W - 810LM - 2700K - 12º - IP20 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,271.03,0.4,379.44199999999995,0.85,446.40235294117645
,,4413.AB.S,Embutido NO-FRAME 10W - 810LM - 2700K - 34º - IP20 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,271.03,0.4,379.44199999999995,0.85,446.40235294117645
,,4413.MA.S,Embutido NO-FRAME 10W - 810LM - 2700K - 48º - IP20 - BIV,"Bco, Bco/Pto, Pto",1 Unid.,,271.03,0.4,379.44199999999995,0.85,446.40235294117645
,,4495.AS.S,Embutido Wallwasher - 10W - 1305LM - 2700K - IP20 - BIV,Branco ou Preto,1 Unid.,,381.66,0.4,534.32400000000007,0.85,628.61647058823542
,,ACS.0144,Acessório Cinta - 50CM,,,,21.4,0.4,29.96,0.85,35.247058823529414
,,7450.S.PM,Poste Balizador - 6w - 500LM - 2700K - 90º - IP65 - BIV,,,,242,0.4,338.8,0.85,398.58823529411768
,,HST-1800,"Haste para luminarias - 1,80m",,,,127.86,0.4,179.00400000000002,0.85,210.59294117647062
,,HST-1200,"Haste para luminarias - 1,20m",,,,96.85,0.4,135.59,0.85,159.51764705882354
,,7400-UA-S,Projetor P/ Tronco - 6W - 315LM - 2700K - 90º - IP65,,,,224.77,0.4,314.678,0.85,370.20941176470586
,,3960C.S.PM,Balizador 1W - 80LM - 2700K - 40º - IP65 - BIV,,,,93.18,0.4,130.452,0.85,153.47294117647058
,,7401-MA-S,Projetor P/ Haste - 6W - 315LM - 2700K - 60º - IP65,,,,236.24,0.4,330.736,0.85,389.10117647058826
,,,Painel de Embutir 14W - 1550Lm - 3000K - ON/OFF,,,,48.36,0.35,65.286,0.85,76.807058823529417
,,,Painel de Sobrepor 17W - 1500Lm - 3000K - ON/OFF,,,,87.87,0.35,118.62450000000001,0.85,139.55823529411765
,,,Painel de Embutir 20W - 2200Lm - 3000K - ON/OFF,,,,67.33,0.35,90.8955,0.85,106.93588235294118
,,,"Spot semi-embutido - 1,5W - 120LM - 2700K - 30º - 12V",,,,87.87,0.35,118.62450000000001,0.85,139.55823529411765
,,,Painel de Embutir S. Recuado 10W - 750Lm - 3000K - ON/OFF,,,,37,0.35,49.95,0.85,58.764705882352949
,,,Painel de Embutir S. Recuado 20W - 1600Lm - 3000K - ON/OFF,,,,79.9,0.35,107.86500000000001,0.85,126.90000000000002
,,,"Spot semi-embutido - 1,5W - 120LM - 2700K - 30º - 12V",,,,87.87,0.35,118.62450000000001,0.85,139.55823529411765
,,,"Spot mini embutido - 1,5W - 150LM - 2700K - 30º - 12V",,,,56.37,0.35,76.099499999999992,0.85,89.528823529411753
,,,"Spot mini embutido - 1,5W - 130LM - 2700K - 30º - 12V",,,,29.19,0.35,39.4065,0.85,46.360588235294124
,,,"Balizador Mini - 1,5W - 40LM - 3000K - 60º - BIV",,,,75.78,0.35,102.303,0.85,120.3564705882353
,,STH21964Q/30,Painel de Sobrepor - 24W - 1900LM - 3000k - IP20 - BIV,,,,103.04,0.35,139.104,0.85,120.3564705882353
,,"Stella
STL25901BR/27","Spot semi-embutido - 1,5W - 120LM - 2700K - 30º - 12V",,,,87.87,0.35,118.62450000000001,0.85,139.55823529411765
,,"Stella
STH20903BR/30",Painel de Sobrepor 17W - 1500lm - IRC80 - 2700k - 120º - BIV,Branco,,,62.27,0.35,84.06450000000001,0.85,98.8994117647059
,,Stella STL23905PTO/30,,,,,254.37,0.35,343.3995,0.85,403.99941176470588
,,W22 SLED 9084,,,,,154,0.35,207.9,0.85,244.58823529411765`;

// Parser super simples pra agrupar
const lines = csv.split('\\n');
let currentMarca = '';
let currentCategoria = 'Diversos';

const categoriesMap = {
  'Perfis': 'Perfis',
  'Fitas': 'Fitas LED',
  'Fontes': 'Fontes e Controladores',
  'Embutido Solo': 'Embutidos de Solo',
  'Espeto': 'Espetos',
  'Arandela': 'Arandelas e Balizadores',
  'Spot': 'Spots e Projetores',
  'Embutido': 'Embutidos'
};

const catalogo = {
  'Perfis': [],
  'Fitas LED': [],
  'Fontes e Controladores': [],
  'Embutidos': [],
  'Embutidos de Solo': [],
  'Spots e Projetores': [],
  'Arandelas e Balizadores': [],
  'Espetos': [],
  'Painéis e Plafons': [],
  'Diversos': []
};

// Start from line 1 to skip header
for (let i = 1; i < lines.length; i++) {
  let line = lines[i].trim();
  if (!line) continue;
  
  // Resolve multiline issues safely by removing quotes for a simpler split 
  // (not a robust CSV parser, but works for this specific input block)
  let inQuote = false;
  let parsed = [];
  let currentWord = '';
  for(let char of line) {
    if(char === '"') inQuote = !inQuote;
    else if(char === ',' && !inQuote) {
      parsed.push(currentWord);
      currentWord = '';
    } else {
      currentWord += char;
    }
  }
  parsed.push(currentWord);

  let [marca, produto, codigo, peca, acabamento, quant, obs, custo] = parsed.map(s => s.replace(/\\n/g, ' ').trim());
  
  if (marca) currentMarca = marca;
  if (produto) {
    currentCategoria = categoriesMap[produto] || 'Diversos';
  }
  
  // Categorization fallbacks based on text
  if (!produto) {
    if (peca.toLowerCase().includes('painel')) currentCategoria = 'Painéis e Plafons';
    else if (peca.toLowerCase().includes('balizador') || peca.toLowerCase().includes('arandela')) currentCategoria = 'Arandelas e Balizadores';
    else if (peca.toLowerCase().includes('spot') || peca.toLowerCase().includes('projetor')) currentCategoria = 'Spots e Projetores';
    else if (peca.toLowerCase().includes('haste') || peca.toLowerCase().includes('amplificador') || peca.toLowerCase().includes('cinta') || peca.toLowerCase().includes('controladora')) currentCategoria = 'Diversos';
    else currentCategoria = 'Embutidos'; // fallback
  }

  if (codigo || peca) {
    let nameParts = [];
    if (currentMarca && !peca.includes(currentMarca)) nameParts.push(currentMarca);
    if (codigo && !peca.includes(codigo)) nameParts.push(codigo);
    if (peca) nameParts.push(peca);
    if (acabamento) nameParts.push(acabamento);
    
    let fullModelName = nameParts.join(' - ');
    
    catalogo[currentCategoria].push({
      modelo: fullModelName,
      preco: parseFloat(custo) || 0,
      ncm: '9405.10.99' // default genérico de iluminação
    });
  }
}

// Clean up empty categories
for(let cat in catalogo) {
  if (catalogo[cat].length === 0) delete catalogo[cat];
}

fs.writeFileSync('c:\\\\Users\\\\User\\\\Desktop\\\\teste antigravity google\\\\lugh-lighting\\\\catalogo_novo.json', JSON.stringify(catalogo, null, 2));
