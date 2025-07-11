import React from 'react'
import { OverviewAdmins, OverviewBlogs, OverviewDonations, OverviewGallery, OverviewGraph, OverviewSections } from './components'
import Link from 'next/link'
import { appRoutePaths } from '@/routes/paths'
import { BiMessageDetail } from "react-icons/bi";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib';
import {fetchDashboardData, fetchDonationStats } from '@/app/action';

export default async function OverviewContainer() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const res = await fetchDashboardData()
  const totalDonation = res?.data?.donationData?.reduce((oldValue, el) => +(el.amount) + oldValue, 0) || 0
  const stat = await fetchDonationStats()

  return (
    <main className='flex flex-col gap-4 w-full'>
      <aside className="card flex justify-between items-center gap-2">
        <div className="flex-1 flex flex-col">
          <h4 className="heading-three font-bold">Hello, {user?.name}</h4>
          <p className="text-small">Here you can manage your Anyagirlchild Foundation Outlook</p>
        </div>
        <Link href={appRoutePaths.admincontact} className="w-10 h-10 text-danger hover:text-danger text-lg md:text-2xl grid place-items-center rounded-md cursor-pointer">
          <BiMessageDetail />
        </Link>
      </aside>
      <aside className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <OverviewSections 
            totalDonation={totalDonation} 
            totalBlog={res?.data?.blogData.length || 0} 
            totalGallery={res?.data?.galleryData.length || 0} 
          />
          <OverviewGraph blogData={stat.data?.blogData} galleryData={stat.data?.galleryData} donationData={stat.data?.donationData} userData={stat.data?.userData}  />
          <OverviewAdmins adminData={res?.data?.adminData || []}/>
          <OverviewDonations donationData={res?.data?.donationData || []} />
        </div>
        <section className="flex flex-col gap-4">
          <OverviewGallery galleryData={res?.data?.galleryData || []} />
          <OverviewBlogs blogData={res?.data?.blogData|| []} />
        </section>
      </aside>
    </main>
  )
}
