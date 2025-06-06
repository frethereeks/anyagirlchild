"use client"
import React, { useState } from 'react'
import BlogCard from './components/BlogCard'
import { DEFAULT_PAGE_SIZE } from '@/constants'
import { TBlogItemProp } from '@/types'

export default function PBBlogContainer({data}: {data: TBlogItemProp[] | undefined}) {
  const [currentPage, setCurrentPage] = useState<number>(0)
  return (
    <main className='flex flex-col gap-4'>
      <section className="py-10 md:py-20 px-4 relative bg-backdrop">
        <div className="container mx-auto flex flex-col gap-8 lg:gap-12">
          <div className="flex-1 flex flex-col justify-center gap-2 md:max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl text-secondary font-bold font-mulish">Activities and Inspirational Posts
            </h2>
            <p className="text-sm md:text-base text-text font-normal leading-loose font-sans">Immerse yourself in
              inspiration and expert insights with our blog section, offering a deep dive into trends and tips
              for elevating your living spaces</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:justify-center auto-rows-fr gap-2 sm:gap-4 lg:gap-6 py-10">
            {
              data?.map(blog => <BlogCard key={blog.id} {...blog} />)
            }
          </div>
          <div className='flex justify-end gap-2'>
            {
              data?.length &&
              data?.length > DEFAULT_PAGE_SIZE && 
              Array.from({ length: Math.ceil((data?.length || 0) / DEFAULT_PAGE_SIZE) }).map((_, val) => (
                <button key={val} className={`w-6 h-6 md:w-8 md:h-8 flex justify-center items-center border border-grey text-xs sm:text-sm rounded-md cursor-pointer ${val === currentPage ? 'hover:bg-gray bg-dark hover:text-dark/60 text-backdrop' : 'bg-gray hover:bg-dark text-dark/60 hover:text-backdrop'}`}>{
                val}</button>
              ))
            }
          </div>
        </div>
        {/* <div className="container mx-auto p-4 flex justify-center items-center gap-2">
          <button
            className="w-5 h-5 md:w-7 md:h-7 flex justify-center items-center border border-grey bg-gray hover:bg-dark text-dark/60 hover:text-backdrop text-xs sm:text-sm rounded-md cursor-pointer">
            <Icon name="ion:chevron-back" size="15" />
          </button>
        <button
          className="w-5 h-5 md:w-7 md:h-7 flex justify-center items-center border border-grey bg-gray hover:bg-dark text-dark/60 hover:text-backdrop text-xs sm:text-sm rounded-md cursor-pointer">
          <Icon name="ion:chevron-forward" size="15" />
        </button>

      </div> */}
      </section>
    </main>
  )
}
