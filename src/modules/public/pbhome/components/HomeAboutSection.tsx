import React from 'react'
import { ASSET_URL } from '@/assets'
import { appRoutePaths } from '@/routes/paths'
import Image from 'next/image'
import Link from 'next/link'
import { FaCaretRight } from 'react-icons/fa6'

export default function HomeAboutSection() {
    return (
        <section className="relative px-4 py-20 bg-white">
            <div className="container mx-auto relative grid md:grid-cols-2 gap-4 md:gap-8 justify-center items-center py-10 rounded-md">
                <div className="flex-1 min-h-80">
                    <div className="max-w-lg py-40 ml-auto overflow-hidden relative rounded-md flex flex-col gap-4">
                        <Image src={ASSET_URL['little_child']} alt='little_child' className='object-cover object-top overlay' fill />
                    </div>
                </div>
                <div className="flex-1 py-5 relative rounded-md">
                    <div className="max-w-lg flex flex-col gap-4">
                        <h4 className="text-2xl md:text-4xl text-dark-text font-bold font-mulish">Welcome to <span className="text-secondary">Anya Girlchild</span> Foundation</h4>
                        <p className="text-small text-text text-justify leading-loose">Our approach involves not only education but also moral development, career mentorship, and self-care, ensuring that these girls grow into well-rounded, empowered individuals who can lead and inspire change in their communities.</p>
                        <Link href={appRoutePaths.about} className="flex items-center gap-2 bg-danger text-sm text-center text-white w-max px-4 py-2">Learn More <FaCaretRight /></Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
