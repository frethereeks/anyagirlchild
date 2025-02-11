import { contactData } from '@/data'
import ContactContainer from '@/modules/dashboard/contact/ContactContainer'
import { DashBreadCrumb } from '@/modules/dashboard/layout'
import React from 'react'

export default async function AdminContactPage() {
  return (
    <>
      <DashBreadCrumb />
      <ContactContainer data={contactData} role='Root' />
    </>
  )
}
