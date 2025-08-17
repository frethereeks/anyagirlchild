export const dynamic = "force-dynamic"
import React from 'react'
import { ASSET_URL } from '@/assets'
import PBBreadCrumb from '@/modules/public/pblayout/PBBreadCrumb'
import PBBlogContainer from '@/modules/public/pbblog/PBBlogContainer'
import { Metadata } from 'next';
import { fetchBlogPosts } from '@/app/action';
import { TBlogItemProp } from '@/types';


export const metadata: Metadata = {
  title: "Anya Girlchild :: Activites and Posts",
  description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
  icons: ASSET_URL["anya_girlchild_logo"].src,
  openGraph: {
    type: "website",
    title: "Anya Girlchild :: Activites and Posts",
    images: [
      { url: ASSET_URL["healthcare_nurse"].src, width: 800, height: 600 },
      { url: ASSET_URL["healthcare_nurse"].src, width: 1800, height: 1600 },
    ],
    siteName: "Anya Girlchild Foundation",
    description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
    locale: 'en_US',
  }
};


export default async function BlogPage() {
  const res = await fetchBlogPosts() 
  const data = res.data as TBlogItemProp[]
  return (
    <main className='flex flex-col gap-4'>
      <PBBreadCrumb image={ASSET_URL["healthcare_nurse"]} />
      <PBBlogContainer data={data} />
    </main>
  )
}
