import React from 'react'
import { LuBriefcaseBusiness } from 'react-icons/lu'

export default function CreateMessage() {
  return (
      <aside className='card flex-1 flex justify-between items-center gap-4 shadow-lg shadow-background'>
          <div className="flex-1 flex items-center gap-2">
              <LuBriefcaseBusiness className="text-xl text-secondary flex-shrink-0" />
              <h4 className="text-small font-bold">Blog Posts</h4>
          </div>
          <h4 className="text-small text-dark-text font-bold">20</h4>
      </aside>
  )
}
