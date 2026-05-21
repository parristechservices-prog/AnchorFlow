import React from 'react'

export default function BottomNav({current,onChange}){
  return (
    <nav className="fixed bottom-4 left-0 right-0 flex justify-center">
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-md px-4 py-2 flex gap-6">
        <button onClick={()=>onChange('home')} className={`flex flex-col items-center text-sm ${current==='home'?'text-navy font-semibold':'text-gray-500'}`}>
          <div>Home</div>
        </button>
        <button onClick={()=>onChange('anchor')} className={`flex flex-col items-center text-sm ${current==='anchor'?'text-teal font-semibold':'text-gray-500'}`}>
          <div className="text-2xl">⚓</div>
          <div>Anchor</div>
        </button>
        <button onClick={()=>onChange('trail')} className={`flex flex-col items-center text-sm ${current==='trail'?'text-burnt font-semibold':'text-gray-500'}`}>
          <div className="text-2xl">🗺️</div>
          <div>Trail</div>
        </button>
      </div>
    </nav>
  )
}
