import { blogData } from '@/data';
import PBBlogSingleContainer from '@/modules/public/pbblog/pbblogsingle/PBBlogSingleContainer';
import React from 'react'

type TPageParams = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  // const res = await getPageMenu();
  // if (res?.data?.menu) {
  //   return res.data.menu.map(el => ({ slug: el.slug }));
  // }
  return [];
}

export async function generateMetadata({ params: { slug } }: TPageParams) {
  // const res = await getSinglePageMenu({ slug })
  // return {
  //   title: `${res?.data?.menu?.name}'s Details`,
  //   description: res?.data?.menu?.description,
  // }
}

export default async function SingleBlogPage({ params: { slug } }: TPageParams) {
  console.log('slug', slug)
  const data = await blogData.find(blog => blog.slug === slug)
  return (
    <PBBlogSingleContainer data={data} role="Root" />
  )
}
