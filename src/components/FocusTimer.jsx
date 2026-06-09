import React, {useEffect, useState} from 'react'

const defaultSeconds = 25 * 60

function formatTime(seconds){
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0')
  const remainder = String(seconds % 60).padStart(2, '0')
  return `${minutes}:${remainder}`
}

export default function FocusTimer({oneThing, onFinish}){
  const [seconds, setSeconds] = useState(defaultSeconds)
  const [running, setRunning] = useState(false)

  useEffect(()=>{
    if(!running) return undefined
    const timer = window.setInterval(()=>{
      setSeconds(current=>{
        if(current <= 1){
          window.clearInterval(timer)
          setRunning(false)
          return 0
        }
        return current - 1
      })
    }, 1000)
    return ()=>window.clearInterval(timer)
  },[running])

  return (
    <section className="mx-auto max-w-md rounded-xl bg-white p-6 text-center shadow">
      <p className="text-sm text-gray-500">Protected focus</p>
      <h3 className="mt-2 text-lg font-semibold">{oneThing || 'Your one thing'}</h3>
      <div className="my-7 font-mono text-5xl font-bold text-navy" aria-live="polite">{formatTime(seconds)}</div>
      <div className="flex flex-wrap justify-center gap-2">
        <button onClick={()=>setRunning(current=>!current)} className="rounded-lg bg-teal px-4 py-2 text-white">{running ? 'Pause' : 'Start'}</button>
        <button onClick={()=>{setRunning(false);setSeconds(defaultSeconds)}} className="rounded-lg border px-4 py-2">Reset</button>
        <button onClick={onFinish} className="rounded-lg border px-4 py-2">Finish focus</button>
      </div>
    </section>
  )
}
