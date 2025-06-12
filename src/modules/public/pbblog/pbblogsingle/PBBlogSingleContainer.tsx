"use client"

import { ASSET_URL } from '@/assets';
import moment from 'moment';
import Image from 'next/image';
import React from 'react'
import BlogCard from '../components/BlogCard';
import CommentSection from '../components/CommentSection';
import { TBlogItemProp } from '@/types';
import { RiCalendar2Line } from 'react-icons/ri';
import parser from 'html-react-parser';
import DOMPurify from 'dompurify';

type TPageProps = {
  data: TBlogItemProp | undefined
  relatedPosts: TBlogItemProp[]
}

export default function PBBlogSingleContainer({ data, relatedPosts }: TPageProps) {
  
  return (
    <main className='flex flex-col xl:flex-row gap-4 lg:gap-8 bg-white py-10'>
      <section className="relative flex-1">
        <aside className="container mx-auto flex flex-col justify-end items-center px-4 pt-64 relative">
          <div className="h-4/5 w-full absolute top-0 left-0">
            <Image src={data?.image ?? ASSET_URL["anya_girlchild_logo"]} alt={data?.title!} className=' object-cover object-top' fill />
          </div>
          <div className="relative card shadow-text/40 flex flex-col gap-2 w-full max-w-3xl flex-shrink-0 p-4 md:p-6 translate-y-10">
            <h4 className="text-xl md:text-2xl text-secondary font-bold">{data?.title}</h4>
            {/* <p className="text-small leading-loose" dangerouslySetInnerHTML={{ __html: data?.text.slice(0, 300)! }}></p> */}
            <div className="flex flex-wrap items-center mt-2 pt-4 border-t border-t-slate-200">
              <div className="flex-1 flex items-center gap-2 md:gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full relative overflow-hidden flex-shrink-0">
                  <Image src={data?.user?.image ?? ASSET_URL["anya_girlchild_logo"]} alt={data?.user?.firstname!} className='object-cover object-top' fill />
                  {/* <Image src={ASSET_URL["anya_girlchild_logo"]} alt={data?.user?.firstname!} className='object-cover object-top' fill /> */}
                </div>
                <div className="flex flex-col">
                  <h5 className="text-xs md:text-base text-text font-semibold">{data?.user?.firstname} {data?.user?.lastname}</h5>
                  <p className="text-xsmall">Author</p>
                </div>
              </div>
              <div className="md:flex-1 flex flex-col md:flex-row justify-end items-center gap-1 lg:gap-4">
                {/* <Link href={`${appRoutePaths.blog}/?category=${data?.category}`} className='button rounded-sm bg-danger/10 text-small text-danger py-1 px-4 md:px-4'>{data?.category}</Link> */}
                <div className="h-6 w-6 grid place-items-center rounded-md bg-danger/90 text-white text-lg md:text-base">
                  <RiCalendar2Line />
                </div>
                <p className="text-xsmall opacity-80">{moment(data?.createdAt).fromNow()}</p>
              </div>
            </div>
          </div>
        </aside>
        <aside className="container mx-auto flex flex-col justify-end items-center p-4 relative">
          <article className="flex flex-col gap-4 py-10">
            {/* <div className="text-small text-text leading-loose flex flex-col gap-4" dangerouslySetInnerHTML={{ __html: `<div>${data?.text!}</div>` }}></div> */}
            <div className="text-small text-text leading-loose flex flex-col gap-4">{parser(DOMPurify.sanitize((data?.text as unknown as string)))}</div>
          </article>
        </aside>
        <CommentSection key={"802346912"} blog={data} />
      </section>
      <aside className='w-full xl:max-w-lg px-4 grid grid-cols-2 md:grid-cols-3 xl:flex xl:flex-col gap-4 h-max max-h-max sticky top-0 right-0'>
        {
          relatedPosts.filter(item => item.id !== data?.id).slice(0, 3).map(blog => (
            <BlogCard key={blog.id} {...blog} />
          ))
        }
      </aside>
    </main>
  )
}
