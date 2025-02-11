"use client"
import { ASSET_URL } from '@/assets'
import { AppSlider } from '@/modules/shared'
import { appRoutePaths } from '@/routes/paths'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function OverviewGallery() {
    const data = [ASSET_URL["adult_intervention"], ASSET_URL["alms_donation"], ASSET_URL["donation_man"], ASSET_URL["donation_vanunload"], ASSET_URL["little_child"]]
    return (
        <section className="card p-4 flex flex-col gap-4 text-text">
            <aside className='flex flex-col gap-4'>
                <div className='flex justify-between items-center gap-4 text-text pb-4'>
                    <h4 className="text-default font-bold pl-4 border-l-4 border-secondary">Recent Images</h4>
                    <Link href={appRoutePaths.admingallery} className='opacity-70 text-xs'>See All</Link>
                </div>
                <div className="grid grid-cols-2 auto-rows-[200px] md:auto-rows-[300px] gap-2 md:gap-4">
                    <div
                        className="relative md:hidden before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-gradient-to-t before:from-slate-600 before:via-transparent to-transparent flex-1 min-h-40 overflow-hidden rounded-sm md:row-span-2">
                        <Image src={ASSET_URL["donation_personnel"]} alt="donation_personnel" className="object-cover object-left h-full w-full relative" fill />
                    </div>
                    <div
                        className="relative before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-gradient-to-t before:from-slate-600 before:via-transparent to-transparent flex-1 min-h-40 overflow-hidden rounded-sm md:col-span-2">
                        <Image src={ASSET_URL["group_donation"]} alt="group_donation" className="object-cover object-center h-full w-full relative" fill />
                    </div>
                    {/* <div
                        className="relative before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-gradient-to-t before:from-slate-600 before:via-transparent to-transparent flex-1 min-h-40 overflow-hidden rounded-sm">
                        <Image src={ASSET_URL["hungry_man"]} alt="hungry_man" className="object-cover object-center h-full w-full relative" fill />
                    </div>
                    <div
                        className="relative before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-gradient-to-t before:from-slate-600 before:via-transparent to-transparent flex-1 min-h-40 overflow-hidden rounded-sm">
                        <Image src={ASSET_URL["alms_donation"]} alt="alms_donation" className="object-cover object-center h-full w-full relative" fill />
                    </div> */}
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
                        items={data.map(image => (
                            <figure className='relative py-20'>
                                <Image src={image.src} alt={image.src} className='overlay object-cover' fill />
                            </figure>
                        ))}
                    />
                </div>
            </aside>
        </section>
    )
}
