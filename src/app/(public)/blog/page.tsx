import React from 'react'
import { ASSET_URL } from '@/assets'
import PBBreadCrumb from '@/modules/public/pblayout/PBBreadCrumb'
import PBBlogContainer from '@/modules/public/pbblog/PBBlogContainer'
import { Metadata } from 'next';
import { fetchBlogPosts } from '@/app/action';
import { TBlogItemProp } from '@/types';


export const metadata: Metadata = {
  title: "Anya Girlchild :: Blog",
  description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
};


export default async function BlogPage() {
  const res = await fetchBlogPosts() 
  const data = res.data as TBlogItemProp[]
  return (
    <main className='flex flex-col gap-4'>
      <PBBreadCrumb image={ASSET_URL["little_child"]} />
      <PBBlogContainer data={data} />
    </main>
  )
}
