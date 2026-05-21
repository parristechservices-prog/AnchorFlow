import React, {useState, useEffect} from 'react'
import BottomNav from './components/BottomNav'
import Home from './components/Home'
import AnchorFlow from './components/AnchorFlow'
import TrailFlow from './components/TrailFlow'

const todayKey = new Date().toISOString().slice(0,10)

export default function App(){
  const [view, setView] = useState('home')
  const [data, setData] = useState({}) // keyed by date

  useEffect(()=>{
    // keep in-memory only as prototype
  },[])

  const todays = data[todayKey] || {anchor: null, trail: null}

  function updateToday(part, value){
    setData(prev=>({
      ...prev,
      [todayKey]: {
        ... (prev[todayKey]||{}),
        [part]: Object.assign({}, (prev[todayKey]||{})[part]||{}, value)
      }
    }))
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow container mx-auto px-4 pt-6 pb-24">
        {view==='home' && <Home today={todays} onOpen={(v)=>setView(v)} />}
        {view==='anchor' && <AnchorFlow today={todays.anchor} onUpdate={(v)=>updateToday('anchor',v)} onDone={()=>setView('home')} />}
        {view==='trail' && <TrailFlow today={todays.trail} onUpdate={(v)=>updateToday('trail',v)} onDone={()=>setView('home')} />}
      </div>

      <BottomNav current={view} onChange={setView} />
    </div>
  )
}
