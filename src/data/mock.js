export const productCatalog=[
  {id:'1',name:'Coca-Cola Original 2L',price:8.99,ean:'7894900011517',volume:'2',volumeUnit:'L',category:'Bebidas',brand:'Coca-Cola',unit:'garrafa'},
  {id:'2',name:'Arroz Tio João Tipo 1 5kg',price:24.9,ean:'7896496920013',volume:'5',volumeUnit:'kg',category:'Grãos',brand:'Tio João',unit:'pacote'},
  {id:'3',name:'Leite Integral Italac 1L',price:4.89,ean:'7891098005458',volume:'1',volumeUnit:'L',category:'Laticínios',brand:'Italac',unit:'caixa'},
  {id:'4',name:'Feijão Carioca Kicaldo 1kg',price:7.49,ean:'7896004000721',volume:'1',volumeUnit:'kg',category:'Grãos',brand:'Kicaldo',unit:'pacote'},
  {id:'7',name:'Macarrão Espaguete Barilla 500g',price:6.79,ean:'8076809513906',volume:'0.5',volumeUnit:'kg',category:'Massas',brand:'Barilla',unit:'pacote'},
  {id:'8',name:'Detergente Ypê Neutro 500ml',price:2.49,ean:'7896098900116',volume:'0.5',volumeUnit:'L',category:'Limpeza',brand:'Ypê',unit:'frasco'},
];
export const availablePromotions=[
  {id:'promo1',name:'Coca-Cola: Leve 3, Pague 2',type:'buy_x_get_y',priority:1,conditions:{productIds:['1'],minQuantity:3},benefit:{buyQuantity:2,getQuantity:1},maxApplications:3},
  {id:'promo2',name:'15% OFF em Grãos',type:'percentage_discount',priority:2,conditions:{categories:['Grãos'],minCartValue:20},benefit:{percentageOff:15}},
  {id:'promo3',name:'Limpeza: 2ª unidade 50%',type:'second_unit_discount',priority:3,conditions:{categories:['Limpeza'],minQuantity:2},benefit:{percentageOff:50}},
];
const now=new Date(); const minus=(d)=>new Date(now.getTime()-d*86400000).toISOString();
export const nearbyStores=[
  {id:'s1',name:'Extra Hiper',distance:'0,8 km',rating:4.2,priceIndex:1.1,lastUpdated:minus(0)},
  {id:'s2',name:'Carrefour',distance:'1,2 km',rating:4.0,priceIndex:0.95,lastUpdated:minus(1)},
  {id:'s3',name:'Atacadão',distance:'2,1 km',rating:4.3,priceIndex:0.85,lastUpdated:minus(3)},
  {id:'s4',name:'Big',distance:'2,8 km',rating:3.9,priceIndex:1.05,lastUpdated:minus(2)},
];
export const userStats={ totalSavings:127.45, itemsScanned:248, averageAccuracy:94.2, favoriteStore:'Atacadão', monthlyGoal:200 };
