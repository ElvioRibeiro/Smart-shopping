import React from 'react';
import { ShoppingCart, Wifi, WifiOff, MapPin } from 'lucide-react';
export default function Header({ isOnline }){
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-b-3xl shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2"><ShoppingCart size={22}/> Smart Shopping</h1>
          <p className="text-blue-100 text-sm">Acompanhe, economize e confira sua compra</p>
        </div>
        <div className="text-right text-xs">
          <div className="flex items-center gap-1 justify-end">{isOnline ? (<><Wifi size={14} className="text-emerald-300"/><span className="text-emerald-200">Online</span></>) : (<><WifiOff size={14} className="text-red-300"/><span className="text-red-200">Offline</span></>)}
          </div>
          <div className="flex items-center gap-1 justify-end mt-1"><MapPin size={14} className="text-blue-200"/><span className="text-blue-100">Extra Hiper</span></div>
        </div>
      </div>
    </div>
  );
}
