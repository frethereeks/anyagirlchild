import { donationData } from '@/data'
import DonationsContainer from '@/modules/dashboard/donations/DonationsContainer'
import { DashBreadCrumb } from '@/modules/dashboard/layout'
import React from 'react'

export default async function AdminDonationsPage() {
  return (
    <>
      <DashBreadCrumb />
      <DonationsContainer data={donationData} role='Root' />
    </>
  )
}
