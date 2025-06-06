import React from 'react'
import { Metadata } from 'next';
import BlogContainer from '@/modules/dashboard/blog/BlogContainer'
import { DashBreadCrumb } from '@/modules/dashboard/layout'
import { fetchBlogPosts, fetchUser } from '@/app/action';
import { TBlogItemProp } from '@/types';


export const metadata: Metadata = {
  title: "Anya Girlchild :: Blog Posts",
  description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
};

export default async function AdminBlogPage() {
  const user = await fetchUser()
  const res = await fetchBlogPosts()
  const data = res.data as TBlogItemProp[]

  return (
    <>
      <DashBreadCrumb />
      <BlogContainer data={data || []} role={user.role} />
    </>
  )
}
