"use client"

import { ASSET_URL } from '@/assets';
import moment from 'moment';
import Image from 'next/image';
import React from 'react'
import CommentSection from '../components/CommentSection';
import { TBlogItemProp } from '@/types';
import parser from 'html-react-parser';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import { appRoutePaths } from '@/routes/paths';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { IoShareOutline } from 'react-icons/io5';
import { RWebShare } from "react-web-share"

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
    <main className='flex flex-col bg-slate-50 pt-10'>
      <aside className="max-w-screen-lg mx-auto flex flex-col justify-end items-center px-4 py-10 relative">
        <div className="relative  flex flex-col gap-2 w-full flex-shrink-0 p-4 md:p-6">
          <h4 className="text-xl md:text-2xl text-primary/70 text-center font-bold font-grotesk">{data?.title}</h4>
          <div className="flex flex-wrap w-full max-w-3xl mx-auto items-center mt-2 py-4 border-y border-y-slate-200">
            <div className="flex-1 flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full relative overflow-hidden flex-shrink-0">
                <Image src={data?.user?.image ?? ASSET_URL["anya_girlchild_logo"]} alt={data?.user?.firstname ?? "Profile Image"} className='object-cover object-top' fill />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <h5 className="text-xs md:text-sm text-secondary font-semibold font-poppins">{data?.user?.firstname} {data?.user?.lastname}</h5>
                  <p className="text-[.6rem] text-secondary bg-secondary/15 py-1 px-1.5 rounded-sm font-grotesk -translate-x-1 w-max">Author</p>
                </div>
                <p className="text-xs text-text font-poppins">{moment(data?.createdAt).fromNow()}</p>
              </div>
            </div>
            <div className="md:flex-1 flex flex-col md:flex-row justify-end items-center gap-1 lg:gap-4">
              <RWebShare
                data={{
                  text: data?.text.slice(0, 100),
                  url: `${appRoutePaths.blog}/${data?.slug}`,
                  title: data?.title,
                }}
              >
                <button className="group flex items-center gap-2 text-sm md:text-base rounded-full p-1 pr-4 bg-white hover:bg-backdrop">
                  <div className="w-8 h-8 md:w-8 md:h-8 rounded-full relative grid place-items-center overflow-hidden flex-shrink-0 bg-backdrop group-hover:bg-text/15 text-text text-lg">
                    <IoShareOutline />
                  </div>
                  <p className="text-xs text-text font-semibold font-grotesk">Share Post</p>
                </button>
              </RWebShare>
            </div>
          </div>
        </div>
      </aside>
      <aside className="container mx-auto flex flex-col justify-end items-center px-4 relative h-[90vh]">
        <div className="h-full w-full absolute top-0 left-0 bg-slate-800">
          <Image src={data?.image ?? ASSET_URL["alms_donation"]} alt={data?.title ?? "image description"} className=' object-cover object-top' fill />
        </div>
      </aside>
      <section className="relative flex-1 bg-white pb-10">
        <aside className="max-w-screen-lg mx-auto flex flex-col justify-end items-center p-4 relative">
          <article className="flex flex-col gap-10 py-10">
            {/* <div className="text-small text-text leading-loose flex flex-col gap-4" dangerouslySetInnerHTML={{ __html: `<div>${data?.text!}</div>` }}></div> */}
            <div className="text-base md:text-lg text-text leading-loose flex flex-col gap-4 font-grotesk" style={{ lineHeight: 2 }}>{parser(DOMPurify.sanitize((data?.text as unknown as string)))}</div>
            <section className='w-full grid grid-cols-2 sm:gap-4 md:gap-6'>
              <aside className="border border-backdrop rounded-md rounded-tr-none rounded-br-none flex gap-2 overflow-hidden">
                {
                  related.previous &&
                  <Link href={`${appRoutePaths.blog}/${related?.previous?.slug}`} className='flex-1 flex items-center justify-start gap-2 bg-white hover:bg-backdrop w-max rounded-r-0 p-2'>
                    <RiArrowLeftSLine className='text-text text-2xl md:text-4xl flex-shrink-0' />
                    <div className="flex-1 flex items-center gap-2 py-2 max-w-sm">
                      <figure className="relative hidden sm:grid h-8 w-8 md:h-14 md:w-14 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={related?.previous?.image as unknown as string} alt={related?.previous?.title} className='object-cover' fill />
                      </figure>
                      <h4 className="flex-1 text-small md:text-base xl:text-lg text-text line-clamp-2 leading-loose">{related?.previous?.title}</h4>
                    </div>
                  </Link>
                }
              </aside>
              <aside className="border border-backdrop rounded-md rounded-tl-none rounded-bl-none flex gap-2 overflow-hidden">
                {
                  related.next &&
                  <Link href={`${appRoutePaths.blog}/${related?.next?.slug}`} className='flex-1 flex items-center justify-end gap-2 bg-white hover:bg-backdrop w-max rounded-r-0 p-2'>
                    <div className="flex-1 flex items-center gap-2 py-2 max-w-sm">
                      <figure className="relative hidden sm:grid h-8 w-8 md:h-14 md:w-14 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={related?.next?.image as unknown as string} alt={related?.next?.title} className='object-cover' fill />
                      </figure>
                      <h4 className="flex-1 text-small md:text-base xl:text-lg text-text line-clamp-2 leading-loose">{related?.next?.title}</h4>
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
