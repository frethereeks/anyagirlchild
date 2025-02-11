import React from 'react'

type TOverviewCardProps = {
    icon: React.ReactNode,
    title: string,
    value: number
    prefix?: string
}

export default function OverviewCard({ icon, title, value, prefix } : TOverviewCardProps) {
  return (
      <aside className='card min-h-14 md:min-h-20 flex-1 flex justify-between items-center gap-4 shadow-lg shadow-background'>
          <div className="flex-1 flex items-center gap-2">
              <div className="grid place-items-center text-2xl text-secondary bg-secondary/15 h-10 w-10 rounded-md flex-shrink-0" >{icon}</div>
              <h4 className="text-small font-bold">{title}</h4>
          </div>
          <h4 className="font-mulish text-sm md:text-lg text-text font-bold md:font-black">{prefix}{value.toLocaleString()}</h4>
      </aside>
  )
}
