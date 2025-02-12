"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { appRoutePaths } from '@/routes/paths'
import { FaList } from "react-icons/fa6";
import { FiGrid } from "react-icons/fi";
import { BlogGrid, BlogList } from './components'
import { GrArticle } from 'react-icons/gr'


export default function BlogContainer() {
  const [viewType, setViewType] = useState<"grid" | "list">("grid")

  return (
    <>
      <section className="flex flex-col gap-4">
        <aside className="card">
          <div className='flex justify-between items-center gap-4 text-text'>
            <div className="flex items-center gap-4">
              <h4 className="text-default text-text font-bold">All Blog Posts</h4>
              <div className="flex gap-2 border rounded-md p-2">
                <figure onClick={() => setViewType("grid")} className={`flex-1 grid place-items-center cursor-pointer text-lg ${viewType === "grid" ? 'text-danger' : 'text-text'}`}>
                  <FiGrid />
                </figure>
                <figure onClick={() => setViewType("list")} className={`flex-1 grid place-items-center cursor-pointer text-lg ${viewType === "list" ? 'text-danger' : 'text-text'}`}>
                  <FaList />
                </figure>
              </div>
            </div>
            <Link href={appRoutePaths.adminblogs} className='py-1.5 px-4 rounded-md bg-danger hover:bg-danger text-white text-xs flex items-center gap-2'><GrArticle /> New Post</Link>
          </div>
        </aside>
        {
          viewType === "grid" ?
            <BlogGrid />
            :
            <BlogList />
        }
      </section>
    </>
  )
}
