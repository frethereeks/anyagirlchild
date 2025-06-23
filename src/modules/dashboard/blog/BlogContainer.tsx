"use client"
import React, { useState } from 'react'
import { FaList } from "react-icons/fa6";
import { FiGrid } from "react-icons/fi";
import { AddBlogForm, BlogGrid, BlogList } from './components'
import { GrArticle } from 'react-icons/gr'
import { Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '@/lib/features/hooks';
import { triggerModal } from '@/lib/features/reducers/siteSlice';
import { $Enums } from '@prisma/client';
import { TBlogItemProp } from '@/types';

type TPageProps = {
  data: TBlogItemProp[] | undefined
  role: $Enums.Role
}

export default function BlogContainer({ data, role }: TPageProps) {
  const [viewType, setViewType] = useState<"grid" | "list">("grid")
  // const [open, setOpen] = useState<boolean>(false)
  const [selectedData, setSelectedData] = useState<TBlogItemProp | undefined>(undefined)
  const site = useAppSelector(state => state.site)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (site.selectedId) {
      setSelectedData(data?.find(el => el.id === site.selectedId))
    }
    // eslint-disable-next-line
  }, [site.selectedId, dispatch])

  return (
    <>
      <Modal
        open={site.openModal}
        footer={<></>}
        onCancel={() => dispatch(triggerModal({ id: undefined, open: false }))}
        afterClose={() => setSelectedData(undefined)}
        style={{ maxWidth: 'none', width: '80vw !important' }}
        className='wide-modal'
        centered
        rootClassName='max-w-none w-[80vw]'
      >
        <AddBlogForm data={selectedData} />
      </Modal>
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
            <button onClick={() => dispatch(triggerModal({ id: undefined, open: true }))} className='py-1.5 px-4 rounded-md bg-danger hover:bg-danger text-white text-xs flex items-center gap-2'><GrArticle /> New Post</button>
          </div>
        </aside>
        {
          viewType === "grid" ?
            <BlogGrid data={data} role={role} />
            :
            <BlogList data={data} role={role} />
        }
      </section>
    </>
  )
}
