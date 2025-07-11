"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { $Enums } from '@prisma/client'
import { TGalleryProps } from '@/types'
import { Modal } from 'antd'
import { useAppDispatch, useAppSelector } from '@/lib/features/hooks'
import { triggerModal } from '@/lib/features/reducers/siteSlice'

type TPageProps = {
  data: TGalleryProps[] | undefined
  role: $Enums.Role | undefined
}

export default function PBGalleryContainer({ data }: TPageProps) {
  const [selectedData, setSelectedData] = useState<Partial<TGalleryProps>>()
  const site = useAppSelector(state => state.site)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (site.selectedId) {
      setSelectedData(data?.find(el => el.id === site.selectedId))
    }
    // eslint-disable-next-line
  }, [site.selectedId, dispatch])

  const handleImageClick = (data: TGalleryProps) => {
    setSelectedData(data)
    dispatch(triggerModal({ id: data.id, open: true }))
  }

  return (
    <>
      <Modal
        open={site.openModal}
        footer={<></>}
        onCancel={() => dispatch(triggerModal({ id: undefined, open: false }))}
        afterClose={() => setSelectedData(undefined)}
        className='min-w-48 md:min-w-96'
      >
        <div className="flex flex-col gap-2">
          <figure className="relative before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-backdrop h-[500px] w-full">
            <Image src={selectedData?.image ?? ""} alt={selectedData?.title || "anyagirlchild gallery photo"} className="object-contain object-top h-full w-full absolute top-0 left-0" fill priority />
          </figure>
          <h4 className="text-lg md:text-xl text-primary/80 font-bold leading-loose font-grotesk p-4">{selectedData?.title}</h4>
        </div>
      </Modal>

      <section className='flex flex-col gap-4'>
        <div className="bg-backrop py-10 sm:py-20 px-4">
          <div className="container mx-auto flex flex-col gap-6 lg:gap-10">
            <div className="flex-1 flex flex-col justify-center gap-2 md:max-w-xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-secondary font-bold font-grotesk">Our Latest Project Photos</h2>
              <p className="text-sm md:text-base text-text/80 font-normal leading-loose font-poppins">
                Anya Girlchild Foundation is constantly putting itself out there to attend to the needs of the girl child both in Nigeria and beyond</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] auto-rows-[200px] gap-2 md:gap-4">
              {/* <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[100px] md:auto-rows-[200px] gap-2 md:gap-4"> */}
              {
                data?.map((gallery, i) =>
                  i % 4 === 0 ? <div onClick={() => handleImageClick(gallery)} key={gallery.id} className="cursor-pointer relative before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-gradient-to-t before:from-slate-600 before:via-transparent to-transparent flex-1 min-h-40 overflow-hidden rounded-sm md:row-span-1">
                    <Image src={gallery.image} alt={gallery.title || "anyagirlchild gallery photo"} className="object-cover object-top h-full w-full absolute top-0 left-0" fill priority />
                  </div>
                    :
                    <div onClick={() => handleImageClick(gallery)} key={gallery.id} className="cursor-pointer relative before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-gradient-to-t before:from-slate-600 before:via-transparent to-transparent flex-1 min-h-40 overflow-hidden rounded-sm">
                      <Image src={gallery.image} alt={gallery.title || "anyagirlchild gallery photo"} className="object-cover object-top h-full w-full absolute top-0 left-0" fill priority />
                    </div>
                )
              }
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
