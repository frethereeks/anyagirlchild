import { fetchDonations, fetchUser } from '@/app/action';
import { donationData } from '@/data'
import DonationsContainer from '@/modules/dashboard/donations/DonationsContainer'
import { DashBreadCrumb } from '@/modules/dashboard/layout'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Anya Girlchild :: Donations",
  description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
};

export default async function AdminDonationsPage() {
  const user = await fetchUser()
  const res = await fetchDonations()

  return (
    <>
      <DashBreadCrumb />
      <DonationsContainer data={res.data || []} role={user.role} />
    </>
  )
}
