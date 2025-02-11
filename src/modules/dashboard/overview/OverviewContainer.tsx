import React from 'react'
import { OverviewAdmins, OverviewBlogs, OverviewDonations, OverviewGallery, OverviewGraph, OverviewSections } from './components'
import Link from 'next/link'
import { appRoutePaths } from '@/routes/paths'
import { LuMessageSquareDot } from 'react-icons/lu'
import { BiMessageDetail } from "react-icons/bi";

export default function OverviewContainer() {

  return (
    <main className='flex flex-col gap-4 w-full'>
      <aside className="card flex justify-between items-center gap-2">
        <div className="flex-1 flex flex-col">
          <h4 className="heading-three font-bold">Hello, Felicity</h4>
          <p className="text-small">Here you can manage your Anyagirlchild Foundation Outlook</p>
        </div>
        <Link href={appRoutePaths.admincontact} className="w-10 h-10 text-danger hover:text-danger text-lg md:text-2xl grid place-items-center rounded-md cursor-pointer">
          <BiMessageDetail />
        </Link>
      </aside>
      <aside className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <OverviewSections />
          <OverviewGraph />
          <OverviewAdmins />
          <OverviewDonations />
        </div>
        <section className="flex flex-col gap-4">
          <OverviewGallery />
          <OverviewBlogs />
        </section>
      </aside>
    </main>
  )
}
