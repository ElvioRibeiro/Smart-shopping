export function applyPromotion(items, promo){
  const cartTotal = items.reduce((s,i)=>s+i.price*i.quantity,0);
  switch(promo.type){
    case 'buy_x_get_y':{
      const list = items.filter(i=>promo.conditions.productIds?.includes(i.id));
      if(!list.length) return 0;
      const qty = list.reduce((s,i)=>s+i.quantity,0);
      const sets = Math.floor(qty / promo.conditions.minQuantity);
      const free = (promo.maxApplications ?? Infinity) > 0 ? Math.min(sets * promo.benefit.getQuantity, promo.maxApplications) : sets * promo.benefit.getQuantity;
      const unit = list[0].price;
      return free * unit;
    }
    case 'second_unit_discount':{
      const list = items.filter(i=>promo.conditions.categories?.includes(i.category) && i.quantity>=2);
      return list.reduce((sav,i)=>sav + Math.floor(i.quantity/2)*i.price*(promo.benefit.percentageOff/100),0);
    }
    case 'percentage_discount':{
      const has = items.some(i=>promo.conditions.categories?.includes(i.category));
      if(!has) return 0;
      if(cartTotal < (promo.conditions.minCartValue||0)) return 0;
      return cartTotal * (promo.benefit.percentageOff/100);
    }
    default: return 0;
  }
}
export function explainPromotion(p){ switch(p.type){ case 'buy_x_get_y': return `Compre ${p.benefit.buyQuantity}, ganhe ${p.benefit.getQuantity}`; case 'second_unit_discount': return `${p.benefit.percentageOff}% na 2ª unidade`; case 'percentage_discount': return `${p.benefit.percentageOff}% em ${p.conditions.categories?.join(', ')}`; default: return p.name; } }
export function nextActivationHint(items, promo){
  const cartTotal = items.reduce((s,i)=>s+i.price*i.quantity,0);
  if(promo.type==='buy_x_get_y'){ const qty=items.filter(i=>promo.conditions.productIds?.includes(i.id)).reduce((s,i)=>s+i.quantity,0); const need=Math.max(0,promo.conditions.minQuantity-qty); return need>0?`Faltam ${need} un. para ativar`:''; }
  if(promo.type==='second_unit_discount'){ const qty=items.filter(i=>promo.conditions.categories?.includes(i.category)).reduce((s,i)=>s+i.quantity,0); const need=Math.max(0,2-qty); return need>0?`Faltam ${need} un. no total da categoria`:''; }
  if(promo.type==='percentage_discount'){ const has=items.some(i=>promo.conditions.categories?.includes(i.category)); if(!has) return 'Adicione 1 item elegível'; const need=Math.max(0,(promo.conditions.minCartValue||0)-cartTotal); return need>0?`Faltam R$ ${need.toFixed(2)} para atingir o mínimo`:''; }
  return '';
}
export function computePromotions(items, promos){
  const applied=[], pending=[];
  for(const p of promos){
    const savings = applyPromotion(items, p);
    const explanation = explainPromotion(p);
    if(savings>0) applied.push({ ...p, savings, explanation });
    else pending.push({ ...p, savings:0, explanation, hint: nextActivationHint(items, p) });
  }
  const totalSavings = applied.reduce((s,p)=>s+p.savings,0);
  applied.sort((a,b)=>a.priority-b.priority);
  return { applied, pending, totalSavings };
}
