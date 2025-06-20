import { ASSET_URL } from '@/assets'
import PBGalleryContainer from '@/modules/public/pbgallery/PBGalleryContainer'
import PBBreadCrumb from '@/modules/public/pblayout/PBBreadCrumb'
import React from 'react'
import { Metadata } from 'next';
import { fetchGalleryImages } from '@/app/action';
import { authOptions } from '@/lib';
import { getServerSession } from 'next-auth';


export const metadata: Metadata = {
  title: "Anya Girlchild :: Partner",
  description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
  icons: ASSET_URL["anya_girlchild_logo"].src,
  openGraph: {
    type: "website",
    title: "Anya Girlchild :: Partner",
    images: ASSET_URL["little_child"].src,
    siteName: "Anya Girlchild Foundation",
    description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
  }
};


export default async function GalleryPage() {
  const res = await fetchGalleryImages()
  const session = await getServerSession(authOptions)

  return (
    <main className='flex flex-col gap-4'>
      <PBBreadCrumb image={ASSET_URL["little_child"]} />
      <PBGalleryContainer data={res.data} role={session?.user?.role} />
    </main>
  )
}
