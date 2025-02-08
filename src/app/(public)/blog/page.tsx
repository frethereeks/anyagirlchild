import React from 'react'
import { ASSET_URL } from '@/assets'
import PBBreadCrumb from '@/modules/public/pblayout/PBBreadCrumb'
import PBBlogContainer from '@/modules/public/pbblog/PBBlogContainer'

export default function BlogPage() {
  return (
    <main className='flex flex-col gap-4'>
      <PBBreadCrumb image={ASSET_URL["little_child"]} />
      <PBBlogContainer />
    </main>
  )
}
