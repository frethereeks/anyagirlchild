"use client"

import { ASSET_URL } from '@/assets';
import moment from 'moment';
import Image from 'next/image';
import React from 'react'
// import BlogCard from '../components/BlogCard';
import CommentSection from '../components/CommentSection';
import { Prettify, TBlogItemProp } from '@/types';
import { RiCalendar2Line } from 'react-icons/ri';
import parser from 'html-react-parser';
import DOMPurify from 'dompurify';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';
import { appRoutePaths } from '@/routes/paths';
import { LuSquareArrowRight } from "react-icons/lu";
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

type relatedBlogProps = Pick<TBlogItemProp, "id" | "title" | "slug" | "image"> | null

type TPageProps = {
  data: TBlogItemProp | undefined
  related: {
    previous?: relatedBlogProps
    next?: relatedBlogProps
  }
}

export default function PBBlogSingleContainer({ data, related }: TPageProps) {

  return (
    <main className='flex flex-col gap-4 lg:gap-8 bg-white py-10'>
      <section className="relative flex-1">
        <aside className="container mx-auto flex flex-col justify-end items-center px-4 pt-64 relative">
          <div className="h-4/5 w-full absolute top-0 left-0">
            <Image src={data?.image ?? ASSET_URL["alms_donation"]} alt={data?.title!} className=' object-cover object-top' fill />
          </div>
          <div className="relative card shadow-text/40 flex flex-col gap-2 w-full max-w-3xl flex-shrink-0 p-4 md:p-6 translate-y-10">
            <h4 className="text-xl md:text-2xl text-secondary font-bold font-grotesk">{data?.title}</h4>
            {/* <p className="text-small leading-loose" dangerouslySetInnerHTML={{ __html: data?.text.slice(0, 300)! }}></p> */}
            <div className="flex flex-wrap items-center mt-2 pt-4 border-t border-t-slate-200">
              <div className="flex-1 flex items-center gap-2 md:gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full relative overflow-hidden flex-shrink-0">
                  <Image src={data?.user?.image ?? ASSET_URL["anya_girlchild_logo"]} alt={data?.user?.firstname!} className='object-cover object-top' fill />
                  {/* <Image src={ASSET_URL["anya_girlchild_logo"]} alt={data?.user?.firstname!} className='object-cover object-top' fill /> */}
                </div>
                <div className="flex flex-col">
                  <h5 className="text-xs md:text-base text-text font-semibold font-poppins">{data?.user?.firstname} {data?.user?.lastname}</h5>
                  <p className="text-xsmall font-poppins">Author</p>
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
        <aside className="max-w-screen-lg mx-auto flex flex-col justify-end items-center p-4 relative">
          <article className="flex flex-col gap-10 py-10">
            {/* <div className="text-small text-text leading-loose flex flex-col gap-4" dangerouslySetInnerHTML={{ __html: `<div>${data?.text!}</div>` }}></div> */}
            <div className="text-base md:text-lg text-text leading-loose flex flex-col gap-4 font-poppins" style={{lineHeight: 2}}>{parser(DOMPurify.sanitize((data?.text as unknown as string)))}</div>
            <section className='w-full grid grid-cols-2'>
              <aside className="border border-backdrop rounded-md rounded-tr-none rounded-br-none flex gap-2">
                {
                  related.previous &&
                  <Link href={`${appRoutePaths.blog}/${related?.previous?.slug}`} className='flex-1 flex items-center justify-start gap-2 bg-white hover:bg-backdrop w-max rounded-md rounded-r-0 border border-danger'>
                      <RiArrowLeftSLine className='text-text text-2xl md:text-4xl flex-shrink-0' />
                    <div className="flex-1 flex items-center gap-2 py-2 max-w-sm">
                      <figure className="relative hidden sm:grid h-8 w-8 md:h-14 md:w-14 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={related?.previous?.image!} alt={related?.previous?.title} className='object-cover' fill />
                      </figure>
                      <h4 className="text-small md:text-lg text-text truncate line-clamp-1 leading-loose">{related?.previous?.title}</h4>
                    </div>
                  </Link>
                }
              </aside>
              <aside className="border border-backdrop rounded-md rounded-tl-none rounded-bl-none flex gap-2">
                {
                  related.next &&
                  <Link href={`${appRoutePaths.blog}/${related?.next?.slug}`} className='flex-1 flex items-center justify-end gap-2 bg-white hover:bg-backdrop w-max rounded-md rounded-r-0 border border-danger'>
                    <div className="flex-1 flex items-center gap-2 py-2 max-w-sm">
                      <figure className="relative hidden sm:grid h-8 w-8 md:h-14 md:w-14 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={related?.next?.image!} alt={related?.next?.title} className='object-cover' fill />
                      </figure>
                      <h4 className="text-small md:text-lg text-text truncate line-clamp-1 leading-loose">{related?.next?.title}</h4>
                    </div>
                      <RiArrowRightSLine className='text-text text-2xl md:text-4xl flex-shrink-0' />
                  </Link>
                }
              </aside>
            </section>
          </article>
        </aside>
        <CommentSection key={"802346912"} blog={data} />
      </section>
    </main>
  )
}
