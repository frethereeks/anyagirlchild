import BlogContainer from '@/modules/dashboard/blog/BlogContainer'
import { DashBreadCrumb } from '@/modules/dashboard/layout'
import React from 'react'

export default async function AdminBlogPage() {
  return (
    <>
      <DashBreadCrumb />
      <BlogContainer />
    </>
  )
}
