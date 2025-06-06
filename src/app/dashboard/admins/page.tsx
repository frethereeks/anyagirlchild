import { adminData } from '@/data'
import AdminContainer from '@/modules/dashboard/admins/AdminContainer'
import { DashBreadCrumb } from '@/modules/dashboard/layout'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Anya Girlchild :: Admins",
  description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
};

export default async function AdminPage() {
  return (
    <>
      <DashBreadCrumb />
      <AdminContainer data={adminData} role='ROOT' />
    </>
  )
}
