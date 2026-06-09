import React, {useState} from 'react'

const terrains = ['Clear path', 'Steady climb', 'Rocky ground', 'Foggy', 'Rest stop']

export default function TrailFlow({today, onUpdate, onDone}){
  const current = today || {}
  const [terrain, setTerrain] = useState(current.terrain || '')
  const [learned, setLearned] = useState(current.learned || '')
  const [nextStep, setNextStep] = useState(current.nextStep || '')

  function saveTrail(){
    onUpdate({terrain, learned, nextStep, updatedAt: new Date().toISOString()})
    onDone()
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Trail</h2>
          <p className="mt-1 text-sm text-gray-600">Notice the ground you covered and choose the next small marker.</p>
        </div>
        <button onClick={onDone} className="text-sm text-gray-500">Done</button>
      </div>

      <section className="rounded-xl bg-white p-5 shadow">
        <label className="text-sm font-medium">How did today feel?</label>
        <div className="mt-3 flex flex-wrap gap-2">
          {terrains.map(option=>(
            <button
              key={option}
              type="button"
              onClick={()=>setTerrain(option)}
              className={`rounded-full border px-3 py-2 text-sm ${terrain===option ? 'border-burnt bg-orange-50 text-burnt' : 'bg-white text-gray-600'}`}
            >
              {option}
            </button>
          ))}
        </div>

        <label className="mt-5 block text-sm font-medium" htmlFor="trail-learned">What did you learn or notice?</label>
        <textarea id="trail-learned" rows={3} value={learned} onChange={event=>setLearned(event.target.value)} className="mt-2 w-full rounded-lg border p-3" />

        <label className="mt-5 block text-sm font-medium" htmlFor="trail-next">What is the next small step?</label>
        <input id="trail-next" value={nextStep} onChange={event=>setNextStep(event.target.value)} className="mt-2 w-full rounded-lg border p-3" />

        <div className="mt-5 flex justify-end">
          <button onClick={saveTrail} disabled={!terrain} className="rounded-lg bg-burnt px-4 py-2 text-white disabled:opacity-40">Save Trail</button>
        </div>
      </section>
    </div>
  )
}
