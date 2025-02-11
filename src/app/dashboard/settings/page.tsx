import { DashBreadCrumb } from '@/modules/dashboard/layout'
import SettingsContainer from '@/modules/dashboard/settings/SettingsContainer'
import React from 'react'

export default function AdminSettingsPage() {
  return (
    <>
      <DashBreadCrumb />
      <SettingsContainer />
    </>
  )
}
