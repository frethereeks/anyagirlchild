import { ASSET_URL } from '@/assets'
import PBGalleryContainer from '@/modules/public/pbgallery/PBGalleryContainer'
import PBBreadCrumb from '@/modules/public/pblayout/PBBreadCrumb'
import React from 'react'
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Anya Girlchild :: Gallery",
  description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
};


export default function GalleryPage() {
  return (
    <main className='flex flex-col gap-4'>
      <PBBreadCrumb image={ASSET_URL["donation_man"]} />
      <PBGalleryContainer />
    </main>
  )
}
