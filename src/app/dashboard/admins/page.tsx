import { adminData } from '@/data'
import AdminContainer from '@/modules/dashboard/admins/AdminContainer'
import { DashBreadCrumb } from '@/modules/dashboard/layout'
import React from 'react'

export default async function AdminPage() {
  return (
    <>
      <DashBreadCrumb />
      <AdminContainer data={adminData} role='Root' />
    </>
  )
}
