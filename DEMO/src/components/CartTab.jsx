import React from 'react';
import { Gift, Calculator, Star, CalendarDays, Trash2, Minus, Plus } from 'lucide-react';
import { currency, fmtDate } from '../lib/utils';

export default function CartTab({ cart, onUpdateQuantity, onRemoveItem, stores }) {
  const has = cart.items?.length > 0;
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex justify-between items-center mb-3"><h2 className="text-lg font-semibold">Meu carrinho</h2><span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{cart.items?.length||0} itens</span></div>
        {!has ? (
          <p className="text-center text-gray-500 py-10">Carrinho vazio. Use o scanner para adicionar produtos.</p>
        ) : (
          <>
            <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
              {cart.items.map((it) => (
                <div key={it.id} className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{it.name}</p>
                    <p className="text-xs text-gray-500">{it.brand} • {it.volume}{it.volumeUnit} • {it.category}</p>
                    <div className="flex items-center gap-3 mt-1"><span className="text-sm font-bold text-emerald-600">{currency(it.price)}</span><span className="text-xs text-gray-500">Total: {currency(it.price * it.quantity)}</span></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={()=> onUpdateQuantity(it.id, -1)} className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center active:scale-95"><Minus size={16}/></button>
                    <span className="font-bold w-8 text-center">{it.quantity}</span>
                    <button onClick={()=> onUpdateQuantity(it.id, +1)} className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center active:scale-95"><Plus size={16}/></button>
                    <button onClick={()=> onRemoveItem(it.id)} className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center active:scale-95 ml-1 hover:bg-red-100 hover:text-red-600"><Trash2 size={16}/></button>
                  </div>
                </div>
              ))}
            </div>

            {cart.appliedPromotions?.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-2">
                <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2"><Gift size={14}/> Promoções ({cart.appliedPromotions.length})</h4>
                <div className="space-y-2">
                  {cart.appliedPromotions.map((p) => (
                    <div key={p.id} className="flex justify-between items-center bg-white/70 p-2 rounded-lg">
                      <div><p className="text-sm font-medium text-yellow-900">{p.name}</p><p className="text-xs text-yellow-700">{p.explanation}</p></div>
                      <div className="text-right"><p className="font-bold text-emerald-600">- {currency(p.savings)}</p><p className="text-xs text-emerald-700">{((p.savings / (cart.subtotal || 1)) * 100).toFixed(1)}% OFF</p></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {cart.pendingPromotions?.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2"><Gift size={14}/> Promoções próximas</h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                  {cart.pendingPromotions.map((p) => (
                    <li key={p.id}>{p.name} — <span className="italic">{p.hint || 'Condição não satisfeita ainda'}</span></li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2"><Calculator size={14}/> Resumo</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span>Subtotal</span><span className="font-medium">{currency(cart.subtotal || 0)}</span></div>
                {cart.totalSavings > 0 && (<div className="flex justify-between text-sm text-emerald-700"><span>Economia</span><span className="font-bold">- {currency(cart.totalSavings)}</span></div>)}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-blue-700">{currency(cart.total || 0)}</span></div>
              </div>
            </div>
          </>
        )}
      </div>

      {has && (
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h4 className="font-semibold mb-2">Comparar em outras lojas</h4>
          <div className="space-y-1">
            {stores.map((s) => {
              const base = cart.total || 0;
              const estimate = base * s.priceIndex;
              const diff = estimate - base;
              const diffClass = diff > 0 ? 'text-red-600' : diff < 0 ? 'text-emerald-600' : 'text-gray-500';
              return (
                <div key={s.id} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{s.name}</p>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <span>{s.distance}</span><span>•</span>
                      <span className="flex items-center gap-1"><Star size={10} className="text-yellow-500"/>{s.rating}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><CalendarDays size={10}/>{fmtDate(s.lastUpdated)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-blue-600">{currency(estimate)}</p>
                    <p className={`text-xs ${diffClass}`}>{diff < 0 ? '-' : '+'}{currency(Math.abs(diff))}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-gray-500 mt-2">Preços estimados com base no histórico de compras. Considere-os como uma estimativa.</p>
        </div>
      )}
    </div>
  );
}
