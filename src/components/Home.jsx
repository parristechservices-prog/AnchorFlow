import React from 'react'

function Card({title,children,onClick}){
  return (
    <div onClick={onClick} className="bg-white rounded-xl shadow p-4 flex-1 cursor-pointer">
      <div className="text-xs text-gray-500">{title}</div>
      <div className="mt-2 text-sm">{children}</div>
    </div>
  )
}

export default function Home({today,onOpen}){
  const anchor = today.anchor || {}
  const trail = today.trail || {}
  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy">Waypoint</h1>
      <p className="text-sm text-gray-600 mt-1">Professional Growth & Wellbeing Hub</p>

      <div className="mt-6 grid grid-cols-1 gap-4">
        <div className="flex gap-4">
          <Card title="Anchor" onClick={()=>onOpen('anchor')}>
            <div className="flex items-center gap-3">
              <div style={{width:12,height:12,background: anchor.checkinColor||'#e2e8f0',borderRadius:6}}></div>
              <div className="truncate font-medium">{anchor.oneThing || 'No one thing set'}</div>
            </div>
          </Card>
          <Card title="Trail" onClick={()=>onOpen('trail')}>
            <div className="flex items-center gap-3">
              <div className="text-sm">{trail.terrain || '—'}</div>
            </div>
          </Card>
        </div>

        <div className="mt-4 text-xs text-gray-500">Today's snapshot — tap a card to open the module.</div>
      </div>
    </div>
  )
}
