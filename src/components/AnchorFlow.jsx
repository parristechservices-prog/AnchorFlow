import React, {useState} from 'react'
import FocusTimer from './FocusTimer'

const checkinOptions = [
  {label:'Flooded', color:'#ff4d4d'},
  {label:'Tense', color:'#ff8a66'},
  {label:'Okay', color:'#ffd36b'},
  {label:'Settled', color:'#7bd389'},
  {label:'Grounded', color:'#2bb57b'}
]

export default function AnchorFlow({today,onUpdate,onDone}){
  const [step,setStep] = useState('checkin')
  const [local, setLocal] = useState({})

  function chooseCheckin(i){
    setLocal(l=>({...l,checkin:checkinOptions[i].label, checkinColor:checkinOptions[i].color}))
    setStep('onething')
  }

  function submitAnchor(){
    onUpdate({...local, locked: true})
    setStep('timer')
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Anchor</h2>
        <button onClick={onDone} className="text-sm text-gray-500">Done</button>
      </div>

      {step==='checkin' && (
        <div>
          <div className="text-sm text-gray-600">How's your nervous system right now?</div>
          <div className="mt-4 flex gap-3">
            {checkinOptions.map((o,i)=> (
              <button key={o.label} onClick={()=>chooseCheckin(i)} className="flex-1 py-4 rounded-lg text-sm font-medium" style={{background:o.color+'22'}}>
                <div style={{color:o.color}}>{o.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step==='onething' && (
        <div>
          <div className="text-sm text-gray-600">What's the one thing that matters most today?</div>
          <textarea autoFocus rows={3} className="w-full mt-4 text-lg p-3 rounded-lg" placeholder="The one thing..." onChange={(e)=>setLocal(l=>({...l,oneThing:e.target.value}))}></textarea>
          <div className="mt-4 flex justify-end">
            <button onClick={()=>setStep('protect')} className="px-4 py-2 bg-teal text-white rounded">Next</button>
          </div>
        </div>
      )}

      {step==='protect' && (
        <div>
          <div className="text-sm text-gray-600">What do you need to protect today?</div>
          <input className="w-full mt-4 p-3 rounded-lg" placeholder="e.g. a lunch break, one quiet hour, a walk" onChange={(e)=>setLocal(l=>({...l,protect:e.target.value}))} />
          <div className="mt-4 flex justify-between">
            <button onClick={()=>setStep('onething')} className="px-4 py-2 border rounded">Back</button>
            <button onClick={submitAnchor} className="px-4 py-2 bg-navy text-white rounded">Set Anchor</button>
          </div>
        </div>
      )}

      {step==='timer' && (
        <div>
          <FocusTimer oneThing={local.oneThing} onFinish={()=>setStep('end')} />
        </div>
      )}

      {step==='end' && (
        <div>
          <div className="text-sm text-gray-600">End of day — quick questions</div>
          <div className="mt-3">
            <div className="text-sm">Did you do the one thing?</div>
            <div className="mt-2 flex gap-2">
              <button className="px-3 py-1 rounded bg-green-100">Yes</button>
              <button className="px-3 py-1 rounded bg-yellow-100">Partly</button>
              <button className="px-3 py-1 rounded bg-red-100">No</button>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-sm">What's one thing that went well?</div>
            <input className="w-full mt-2 p-2 rounded" />
          </div>
          <div className="mt-3">
            <div className="text-sm">What do you want to leave here?</div>
            <input className="w-full mt-2 p-2 rounded" />
          </div>
          <div className="mt-4 flex justify-end">
            <button onClick={onDone} className="px-4 py-2 bg-teal text-white rounded">Close day</button>
          </div>
        </div>
      )}
    </div>
  )
}
