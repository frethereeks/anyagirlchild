import { ASSET_URL } from '@/assets'
import { appRoutePaths } from '@/routes/paths'
import { TBlogItemProp } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function LoadingImage({ image, slug, title }: TBlogItemProp) {
    return (
        <Link href={`${appRoutePaths.blog}/${slug}`} className="relative flex-1 flex flex-col gap-2 group min-w-36 max-w-80 w-full transition-all duration-300" >
            <figure className="relative rounded-lg overflow-hidden h-36 sm:h-40 md:h-40 bg-primary">
                {
                    image ?
                        <Image src={image} alt={title} className="absolute left-0 top-0 w-full h-full object-cover group-hover:-rotate-2 group-hover:scale-110 group-hover:grayscale-[50%]" fill /> :
                        <Image src={ASSET_URL["alms_donation"]} alt={title} className="absolute left-0 top-0 w-full h-full object-cover group-hover:-rotate-2 group-hover:scale-110 group-hover:grayscale-[50%]" fill />
                }
            </figure>
            <div className="flex-1 flex flex-col gap-2 px-2">
                {/* <p className="text-[.55rem] sm:text-[.65rem] md:text-[.7rem] text-danger font-normal uppercase tracking-wider">{category}</p> */}
                <h3 className="text-sm sm:text-lg lg:text-xl text-text font-medium mb-5 leading-none truncate line-clamp-2 whitespace-pre-wrap">{title}</h3>
                <button className="w-max mt-auto text-xs sm:text-sm md:text-sm text-text/50 italic font-normal pb-2 tracking-tight relative before:absolute before:left-0 before:bottom-1 before:bg-grey before:w-full before:h-[1.5px] after:absolute after:left-0 after:bottom-1 after:bg-secondary after:w-1/2 group-hover:after:w-full after:h-[1.5px]">
                    Read More</button>
            </div>
        </Link>
    )
}
