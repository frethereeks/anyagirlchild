"use client"

import { ASSET_URL } from '@/assets';
import { blogData, TBlogProps } from '@/data/blogData';
import { appRoutePaths } from '@/routes/paths';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import BlogCard from '../components/BlogCard';

type TPageProps = { data: TBlogProps | undefined; role: string | undefined; }

export default function PBBlogSingleContainer({ data, role }: TPageProps) {
  return (
    <main className='flex flex-col xl:flex-row gap-4 lg:gap-8 bg-white py-10'>
      <section className="relative flex-1 px-4">
        <aside className="container mx-auto flex flex-col justify-end items-center px-4 pt-64 relative">
          <div className="h-4/5 w-full absolute top-0 left-0">
            <Image src={data?.image ?? ASSET_URL["wallet"]} alt={data?.title!} className=' object-cover object-top' fill />
          </div>
          <div className="relative card shadow-text/40 flex flex-col gap-2 w-full max-w-3xl flex-shrink-0 p-4 md:p-6">
            <h4 className="text-3xl md:text-4xl text-secondary font-bold">{data?.title}</h4>
            <p className="text-small leading-loose" dangerouslySetInnerHTML={{ __html: data?.text.slice(0, 300)! }}></p>
            <div className="flex flex-wrap items-center mt-4 pt-4 border-t border-t-slate-400/80">
              <div className="flex-1 flex items-center gap-2 md:gap-4">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full relative overflow-hidden flex-shrink-0">
                  {/* <Image src={data?.author?.image ?? ASSET_URL["wallet"]} alt={data?.author?.firstname!} className='object-cover object-top' fill /> */}
                  <Image src={ASSET_URL["wallet"]} alt={data?.author?.firstname!} className='object-cover object-top' fill />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-xs md:text-lg text-text font-semibold">{data?.author?.firstname} {data?.author?.lastname}</h5>
                  <p className="text-xsmall">Author</p>
                </div>
              </div>
              <div className="md:flex-1 flex flex-col md:flex-row justify-end items-center gap-1 lg:gap-4">
                <Link href={`${appRoutePaths.blog}/?category=${data?.category}`} className='button bg-danger/10 text-danger py-1 px-4 md:px-8'>{data?.category}</Link>
                  <p className="text-xsmall opacity-80">{moment(data?.createdAt).fromNow()}</p>
              </div>
            </div>
          </div>
        </aside>
        <aside className="container mx-auto flex flex-col justify-end items-center p-4 relative">
          <article className="flex flex-col gap-4 py-10">
            <div className="text-small text-text leading-loose flex flex-col gap-4" dangerouslySetInnerHTML={{ __html: data?.text! }}></div>
          </article>
        </aside>
      </section>
      <aside className='w-full xl:max-w-lg px-4 flex flex-col gap-4 h-max max-h-max sticky top-0 right-0'>
        {
          blogData.filter(item => item.id !== data?.id).slice(0,3).map(blog => (
            <BlogCard key={blog.id} {...blog} />
          ))
        }
      </aside>
    </main>
  )
}
