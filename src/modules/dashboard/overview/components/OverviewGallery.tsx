"use client"
import { AppSlider } from '@/modules/shared'
import { appRoutePaths } from '@/routes/paths'
import { TGalleryProps } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function OverviewGallery({ galleryData }: { galleryData: TGalleryProps[] }) {
    return (
        <section className="card p-4 flex flex-col gap-4 text-text">
            <aside className='flex flex-col gap-4'>
                <div className='flex justify-between items-center gap-4 text-text pb-4'>
                    <h4 className="text-default font-bold pl-4 border-l-4 border-danger">Recent Images</h4>
                    <Link href={appRoutePaths.admingallery} className='py-1.5 px-4 rounded-md bg-danger opacity-70 text-xs'>See All</Link>
                </div>
                <div className="grid grid-cols-2 auto-rows-[200px] md:auto-rows-[300px] gap-2 md:gap-4">
                    {
                        galleryData?.slice(0, 2)?.map((el, i) => (
                            i === 0 ?
                                <div key={el.id}
                                    className="relative md:hidden before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-gradient-to-t before:from-slate-600 before:via-transparent to-transparent flex-1 min-h-40 overflow-hidden rounded-sm md:row-span-2">
                                    <Image src={el.image} alt={el.title} className="object-cover object-left h-full w-full relative" fill />
                                </div>
                                :
                                <div key={el.id}
                                    className="relative before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-gradient-to-t before:from-slate-600 before:via-transparent to-transparent flex-1 min-h-40 overflow-hidden rounded-sm md:col-span-2">
                                    <Image src={el.image} alt={el.title} className="object-cover object-center h-full w-full relative" fill />
                                </div>

                        ))
                    }
                </div>
                <div className="hidden sm:block">
                    <AppSlider
                        key={"8230adf92834"}
                        slidesPerView={1}
                        breakpoints={{
                            360: { slidesPerView: 1, spaceBetween: 10 },
                            650: { slidesPerView: 2, spaceBetween: 20 },
                            // 1042: { slidesPerView: 3, spaceBetween: 30 },
                        }}
                        items={galleryData.map(el => (
                            <figure key={el.id} className='relative py-20'>
                                <Image src={el.image} alt={el.title} className='overlay object-cover' fill />
                            </figure>
                        )) || []}
                    />
                </div>
            </aside>
        </section>
    )
}
