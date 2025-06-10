import { fetchContact, verifyUser } from '@/app/action';
import ContactContainer from '@/modules/dashboard/contact/ContactContainer'
import { DashBreadCrumb } from '@/modules/dashboard/layout'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Anya Girlchild :: Messages",
  description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
};

export default async function AdminContactPage() {
  const res = await fetchContact()
  const user = await verifyUser()
  return (
    <>
      <DashBreadCrumb />
      <ContactContainer data={res.data || []} role={user.role} />
    </>
  )
}
