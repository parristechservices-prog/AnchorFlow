import React, {useRef, useState, useEffect} from 'react'
import BottomNav from './components/BottomNav'
import Home from './components/Home'
import AnchorFlow from './components/AnchorFlow'
import TrailFlow from './components/TrailFlow'

const todayKey = new Date().toISOString().slice(0,10)
const storageKey = 'anchorflow:days'

function loadDays(){
  try{
    return JSON.parse(localStorage.getItem(storageKey)) || {}
  }catch{
    return {}
  }
}

export default function App(){
  const [view, setView] = useState('home')
  const [data, setData] = useState(loadDays) // keyed by date
  const [status, setStatus] = useState('')
  const restoreInput = useRef(null)

  useEffect(()=>{
    localStorage.setItem(storageKey, JSON.stringify(data))
  },[data])

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

  function downloadBackup(){
    const blob = new Blob([JSON.stringify({app:'AnchorFlow', version:1, exportedAt:new Date().toISOString(), days:data}, null, 2)], {type:'application/json'})
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `anchorflow-backup-${todayKey}.json`
    link.click()
    URL.revokeObjectURL(url)
    setStatus('Backup downloaded.')
  }

  async function restoreBackup(event){
    const file = event.target.files?.[0]
    event.target.value = ''
    if(!file) return
    try{
      const backup = JSON.parse(await file.text())
      if(backup?.app !== 'AnchorFlow' || !backup.days || typeof backup.days !== 'object'){
        throw new Error('That file is not an AnchorFlow backup.')
      }
      setData(backup.days)
      setStatus('Backup restored.')
    }catch(error){
      setStatus(error instanceof Error ? error.message : 'Could not restore backup.')
    }
  }

  function resetToday(){
    if(!window.confirm("Clear today's Anchor and Trail entries?")) return
    setData(prev=>{
      const next = {...prev}
      delete next[todayKey]
      return next
    })
    setStatus("Today's entries cleared.")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow container mx-auto px-4 pt-6 pb-24">
        <div className="mb-5 flex flex-wrap items-center justify-end gap-2">
          <button onClick={downloadBackup} className="rounded-lg border bg-white px-3 py-2 text-xs font-medium">Download backup</button>
          <button onClick={()=>restoreInput.current?.click()} className="rounded-lg border bg-white px-3 py-2 text-xs font-medium">Restore backup</button>
          <button onClick={resetToday} className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-700">Clear today</button>
          <input ref={restoreInput} type="file" accept="application/json" className="hidden" onChange={restoreBackup} />
        </div>
        {status && <p role="status" className="mb-4 text-right text-xs text-teal">{status}</p>}
        {view==='home' && <Home today={todays} onOpen={(v)=>setView(v)} />}
        {view==='anchor' && <AnchorFlow today={todays.anchor} onUpdate={(v)=>updateToday('anchor',v)} onDone={()=>setView('home')} />}
        {view==='trail' && <TrailFlow today={todays.trail} onUpdate={(v)=>updateToday('trail',v)} onDone={()=>setView('home')} />}
      </div>

      <BottomNav current={view} onChange={setView} />
    </div>
  )
}
