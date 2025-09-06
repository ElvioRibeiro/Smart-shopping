import React from 'react';
import { Camera, QrCode, Star, XCircle, Eye } from 'lucide-react';
import { currency } from '../lib/utils';
export default function ScanTab({ isScanning, scanResult, confidence, isOnline, onScan, onAdd, onClear, scanHistory }){
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Camera size={20} className="text-blue-600"/> Scanner inteligente</h2>
          {!isOnline && <span className="text-xs text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">Offline</span>}
        </div>
        <div className="relative bg-gray-900 rounded-xl overflow-hidden mb-4" style={{ aspectRatio: '4/3' }}>
          <div className="absolute inset-0 flex items-center justify-center text-white">
            {isScanning ? (
              <div className="text-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto mb-2"></div><p>Analisando produto…</p><p className="text-xs text-gray-300">{isOnline ? 'IA na nuvem' : 'Processo local'}</p></div>
            ) : (<div className="text-gray-300 text-center"><Camera size={42} className="mx-auto mb-1"/><p>Aponte para o EAN / etiqueta</p></div>)}
          </div>
          <div className="absolute inset-0 border-2 border-dashed border-white/40 m-6 rounded-lg" />
          {confidence>0 && (
            <div className="absolute top-3 right-3 bg-black/70 text-white px-2.5 py-1 rounded-full text-xs flex items-center gap-1">
              <Star size={12} className={confidence>0.8 ? 'text-green-400' : confidence>0.6 ? 'text-yellow-300' : 'text-red-400'} />
              {Math.round(confidence*100)}%
            </div>
          )}
        </div>
        <button disabled={isScanning} onClick={onScan} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50">
          <QrCode size={18}/> {isScanning ? 'Escaneando…' : 'Escanear produto'}
        </button>
      </div>
      {scanResult && (
        <div className={`bg-white rounded-2xl p-5 shadow-sm ${scanResult.error ? 'border-l-4 border-red-500' : 'border-l-4 border-emerald-500'}`}>
          {scanResult.error ? (
            <div>
              <div className="flex items-center gap-2 mb-2"><XCircle className="text-red-500"/><h3 className="font-semibold text-red-700">Erro no scan</h3></div>
              <p className="text-red-700 text-sm mb-3">{scanResult.message}</p>
              <button onClick={onClear} className="w-full bg-red-100 text-red-700 py-2.5 rounded-xl">Tentar novamente</button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-lg p-3 mb-3">
                <div><p className="font-bold text-gray-800">{scanResult.name}</p><p className="text-xs text-gray-600">EAN {scanResult.ean} • {scanResult.brand}</p></div>
                <div className="text-right"><p className="text-2xl font-bold text-emerald-600">{currency(scanResult.price)}</p><p className="text-xs text-gray-600">{scanResult.volume}{scanResult.volumeUnit} • {scanResult.category}</p></div>
              </div>
              <div className="text-xs text-gray-600 bg-blue-50 rounded px-2 py-1 inline-flex items-center gap-1"><Eye size={12}/> Preço por {scanResult.volumeUnit==='L'?'litro':'kg'}: <span className="font-medium">{currency(scanResult.price / parseFloat(scanResult.volume||'1'))}</span></div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <button onClick={onClear} className="bg-gray-100 text-gray-700 py-2.5 rounded-xl">Cancelar</button>
                <button onClick={()=> onAdd(scanResult)} className="bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl font-semibold">Adicionar</button>
              </div>
            </div>
          )}
        </div>
      )}
      {scanHistory?.length>0 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h4 className="font-semibold mb-3">Produtos Recentes</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {scanHistory.slice(0,5).map((item, idx)=> (
              <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer" onClick={()=> onAdd(item)}>
                <div className="min-w-0"><p className="text-sm font-medium truncate">{item.name}</p><p className="text-xs text-gray-500">{item.brand} • {item.volume}{item.volumeUnit}</p></div>
                <div className="text-right ml-2"><p className="text-sm font-semibold text-emerald-600">{currency(item.price)}</p><button className="text-xs text-blue-600">+ Adicionar</button></div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
        <h4 className="font-semibold text-blue-900 mb-2">Dicas para Scanner Perfeito</h4>
        <ul className="text-sm text-blue-800 space-y-1 list-disc pl-5">
          <li>Mantenha distância de 15–20cm do produto</li>
          <li>Evite reflexos e sombras na embalagem</li>
          <li>Foque no código de barras quando disponível</li>
        </ul>
      </div>
    </div>
  );
}
