import { ASSET_URL } from '@/assets'
import Image from 'next/image'
import React from 'react'

export default function HomeHeroSection() {
    return (
        <section className="relative py-20 px-4 bg-primary">
            <Image src={ASSET_URL['donation_vanunload']} alt='donation_vanunload' className='object-cover opacity-70 overlay' fill />
            <div className="container mx-auto relative flex flex-col justify-center items-center gap-2 py-10 backdrop-blur-sm">
                <h3 className="heading-four text-center text-white w-max px-4 py-2 bg-danger">Her Future, Our Priority</h3>
                <h1 style={{ textShadow: "0 0 10px #0005" }} className="text-4xl lg:text-6xl text-center text-white font-extrabold max-w-3xl">We are committed to a better life for the girl child</h1>
                <p className="text-sm md:text-base text-center backdrop-blur-sm text-white max-w-xl px-4 py-2 ">A community of dedicated group of voluntary aid workers super-charging a vibrant community that is all about giving the girl child a shot at a better life.</p>
            </div>
        </section>
    )
}
