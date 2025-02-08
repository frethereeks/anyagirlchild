import { ASSET_URL } from '@/assets'
import PBGalleryContainer from '@/modules/public/pbgallery/PBGalleryContainer'
import PBBreadCrumb from '@/modules/public/pblayout/PBBreadCrumb'
import React from 'react'

export default function GalleryPage() {
  return (
    <main className='flex flex-col gap-4'>
      <PBBreadCrumb image={ASSET_URL["donation_man"]} />
      <PBGalleryContainer />
    </main>
  )
}
