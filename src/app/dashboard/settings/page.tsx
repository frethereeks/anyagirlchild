import { fetchUserDetails } from '@/app/action'
import { ASSET_URL } from '@/assets'
import { DashBreadCrumb } from '@/modules/dashboard/layout'
import SettingsContainer from '@/modules/dashboard/settings/SettingsContainer'
import { TAdminProps } from '@/types'
import React from 'react'

export default async function AdminSettingsPage() {
  const data = await fetchUserDetails() as unknown as TAdminProps
  data.image = data.image === null ? ASSET_URL["little_child"].src : data.image
  // console.log({data})
  return (
    <>
      <DashBreadCrumb />
      <SettingsContainer data={data} />
    </>
  )
}
