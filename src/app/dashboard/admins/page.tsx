import { fetchAllUsers, verifyUser } from '@/app/action';
import AdminContainer from '@/modules/dashboard/admins/AdminContainer'
import { DashBreadCrumb } from '@/modules/dashboard/layout'
import { TAdminProps } from '@/types';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Anya Girlchild :: Admins",
  description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
};

export default async function AdminPage() {
  const res = await fetchAllUsers()
  const data = res.data as TAdminProps[]
  const user = await verifyUser()
  return (
    <>
      <DashBreadCrumb />
      <AdminContainer data={data} role={user.role} />
    </>
  )
}
