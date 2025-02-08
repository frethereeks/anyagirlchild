"use client"
import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { appRoutePaths } from '@/routes/paths'
import { usePathname } from 'next/navigation'

type TPageCrumb = {
    image: StaticImageData | string
    extra?: string
}

export default function PBBreadCrumb({ image, extra }: TPageCrumb) {
    const location = usePathname()
    return (
        <section className="relative py-20 px-4 bg-primary">
            <Image src={image} alt={image.toString()} className='object-cover opacity-70 overlay' fill />
            <div className="container mx-auto relative flex flex-col justify-center items-center gap-4 py-10 text-white bg-background/10 backdrop-blur-sm">
                <h1 style={{ textShadow: "0 0 10px #0005" }} className="text-4xl lg:text-6xl text-center text-white font-extrabold  uppercase max-w-3xl">{location.slice(1)}</h1>
                <div className="flex items-center gap-4">
                    <Link href={appRoutePaths.home} className='text-sm text-background font-bold p-2'>Home</Link>
                    •
                    {
                        extra ?
                            <>
                                <Link href={location} className='text-sm text-background capitalize font-bold p-2'>{location.slice(1)}</Link>
                                •
                                <p className='text-sm text-white/80 font-bold p-2'>{extra}</p>
                            </>
                            :
                            <>
                                <p className='text-sm text-white/80 font-bold p-2 capitalize'>{location.slice(1)}</p>
                            </>
                    }
                </div>
            </div>
        </section>
    )
}
