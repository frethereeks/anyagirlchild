import React from 'react'
import { ASSET_URL } from '@/assets'
import { appRoutePaths } from '@/routes/paths'
import Image from 'next/image'
import Link from 'next/link'
import { missionVisionData } from '@/data'

export default function HomeAboutSection() {
    return (
        <section className="relative px-4 py-20 bg-white">
            <div className="container mx-auto relative grid md:grid-cols-2 gap-4 md:gap-8 justify-center items-center md:items-stretch py-10 rounded-md">
                <aside className="flex-1 min-h-80 md:min-h-auto">
                    <div className="border py-40 h-full overflow-hidden relative rounded-md flex flex-col gap-4">
                        <Image src={ASSET_URL['hungry_man']} alt='hungry_girl' className='object-cover object-top overlay' fill />
                    </div>
                </aside>
                <aside className="flex-1 py-5 relative rounded-md">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-2xl md:text-4xl text-primary font-bold font-grotesk">Welcome to <span className="text-secondary">Anya Girlchild</span> Foundation</h4>
                        <p className="text-base md:text-lg text-text text-justify leading-loose font-poppins">Our approach involves not only education but also moral development, career mentorship, and self-care, ensuring that these girls grow into well-rounded, empowered individuals who can lead and inspire change in their communities.</p>
                        <p className="text-base md:text-lg text-text text-justify leading-loose font-poppins">Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential. Growing up, I faced significant hardships that disrupted my early education and exposed me to the realities of instability, societal pressures, and the limitations placed on girls. These challenges sparked a passion within me to help other young girls navigate similar situations, ensuring that no girl is denied the opportunity to...<Link href={appRoutePaths.about} className='underline text-inherit font-semibold font-grotesk px-1'>read more</Link></p>
                    </div>
                </aside>
            </div>
            <div className="max-w-screen-lg mx-auto relative flex flex-col md: gap-4 md:gap-8 justify-center items-center pb-10 rounded-md">
                {
                    missionVisionData.map((el, i) => (
                        <div key={el.id} className="flex flex-col md:flex-row gap-8 md:gap-12 mt-10">
                            <div className="flex-shrink-0 py-4 md:py-0 w-24 md:w-36 grid place-items-center bg-backdrop/60 rounded-sm border">
                                <div className={`h-16 w-16 md:h-24 md:w-24 bg-gradient-to-tr ${i === 0 ? 'from-secondary to-secondary/90 -rotate-12 rounded-full' : 'from-danger to-danger/90 rotate-0 rounded-full'} grid place-items-center drop-shadow-2xl shadow-primary`}>
                                    {el.icon}
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-4">
                                <h4 className={`text-xl md:text-2xl ${i === 0 ? 'text-secondary' : 'text-danger'} font-bold font-grotesk`}>{el.title}</h4>
                                <p className="text-base md:text-lg text-justify leading-loose font-poppins text-text">{el.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
