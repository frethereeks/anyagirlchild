"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { TGalleryProps } from '@/types'
import { Modal } from 'antd'
import { useAppDispatch, useAppSelector } from '@/lib/features/hooks'
import { triggerModal } from '@/lib/features/reducers/siteSlice'

type TPageProps = {
    data: TGalleryProps[] | undefined
}

export default function GalleryImageViewer({ data }: TPageProps) {
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
                        <Image src={selectedData?.image ?? ""} alt={selectedData?.title || "anyagirlchild gallery photo"} className="object-cover object-top h-1/2 w-full absolute top-1/2 left-0" fill />
                    </figure>
                    <h4 className="text-lg md:text-xl text-primary/80 font-bold leading-loose font-grotesk p-4">{selectedData?.title}</h4>
                </div>
            </Modal>
            <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] auto-rows-[200px] gap-2 md:gap-4">
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

        </>
    )
}
