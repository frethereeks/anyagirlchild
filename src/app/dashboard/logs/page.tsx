import { fetchLogs, verifyUser } from '@/app/action';
import LogContainer from '@/modules/dashboard/logs/LogContainer'
import { DashBreadCrumb } from '@/modules/dashboard/layout'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Anya Girlchild :: Activity Logs",
  description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
};

export default async function AdminLogsPage() {
  const res = await fetchLogs()
  const user = await verifyUser()
  return (
    <>
      <DashBreadCrumb />
      <LogContainer data={res.data || []} role={user.role} />
    </>
  )
}
