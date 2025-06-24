"use client"
import React, { useState } from 'react'
// import { data? } from '@/data/data?'
import { DEFAULT_PAGE_SIZE } from '@/constants'
import BlogCard from '@/modules/public/pbblog/components/BlogCard'
import { DeleteModal } from '@/modules/shared'
import { TBlogItemProp } from '@/types'
import { $Enums } from '@prisma/client'

export default function BlogGrid({ data,  }: { data: TBlogItemProp[] | undefined, role: $Enums.Role }) {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  // const [selectedData, setSelectedData] = useState<TBlogItemProp | undefined>(undefined)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  
  // const handleDelete = (key: string) => {
  //   setDeleteModal(!deleteModal)
  //   setSelectedRowKeys([key])
  // }
  const handleClick = (value: number) => {
    console.log({ value })
    setCurrentPage(value)
  }

  return (
    <>
      <DeleteModal key={"8012469234"} openModal={deleteModal} closeModal={setDeleteModal} data={selectedRowKeys} table='blog' resetSelected={() => setSelectedRowKeys([])} />
      <aside className="card p-4 flex flex-col gap-4 text-text min-w-52 overflow-x-scroll">
        <div className="grid grid-cols-2 md:grid-cols-3 md:justify-center auto-rows-fr gap-2 sm:gap-4 lg:gap-6 py-10">
          {
            data?.map(blog => <BlogCard key={blog.id} {...blog} />)
          }
        </div>
        <div className='flex justify-end gap-2'>
          {
            data && data?.length > DEFAULT_PAGE_SIZE &&
            Array.from({ length: Math.ceil((data?.length || 0) / DEFAULT_PAGE_SIZE) }).map((_, val) => (
              <button onClick={() => handleClick(val)} key={val} className={`w-6 h-6 md:w-8 md:h-8 flex justify-center items-center border border-grey text-xs sm:text-sm rounded-md cursor-pointer ${val === currentPage ? 'hover:bg-gray bg-dark hover:text-dark/60 text-backdrop' : 'bg-gray hover:bg-dark text-dark/60 hover:text-backdrop'}`}>{
                val}</button>
            ))
          }
        </div>
      </aside>
    </>
  )
}
