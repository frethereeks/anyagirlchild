import AdminContainer from '@/modules/dashboard/admin/AdminContainer'
import { DashBreadCrumb } from '@/modules/dashboard/layout'
import React from 'react'

export default async function AdminPage() {
  return (
    <>
      <DashBreadCrumb />
      <AdminContainer />
    </>
  )
}
