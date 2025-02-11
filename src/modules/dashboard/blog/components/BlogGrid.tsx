"use client"
import React, { useState } from 'react'
import { blogData } from '@/data/blogData'
import { DEFAULT_PAGE_SIZE } from '@/constants'
import BlogCard from '@/modules/public/pbblog/components/BlogCard'

export default function BlogGrid() {
  const [currentPage, setCurrentPage] = useState<number>(0)
  
  const handleClick = (val: number) => {
    console.log({val})
  }
  
  return (
    <aside className="card p-4 flex flex-col gap-4 text-text min-w-52 overflow-x-scroll">
      <div className="grid grid-cols-2 md:grid-cols-3 md:justify-center auto-rows-fr gap-2 sm:gap-4 lg:gap-6 py-10">
        {
          blogData.map(blog => <BlogCard key={blog.id} {...blog} />)
        }
      </div>
      <div className='flex justify-end gap-2'>
        {
         blogData.length > DEFAULT_PAGE_SIZE && 
          Array.from({ length: Math.ceil((blogData.length || 0) / DEFAULT_PAGE_SIZE) }).map((_, val) => (
            <button onClick={() => handleClick(val)} key={val} className={`w-6 h-6 md:w-8 md:h-8 flex justify-center items-center border border-grey text-xs sm:text-sm rounded-md cursor-pointer ${val === currentPage ? 'hover:bg-gray bg-dark hover:text-dark/60 text-backdrop' : 'bg-gray hover:bg-dark text-dark/60 hover:text-backdrop'}`}>{
              val}</button>
          ))
        }
      </div>
    </aside>
  )
}
