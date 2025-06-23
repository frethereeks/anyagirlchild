import { ASSET_URL } from '@/assets'
import Image from 'next/image'
import React from 'react'

export default function AboutCoreSection() {

    const coreData = [
        {
            id: "80q2e6uv10rpz750",
            title: "Back to School Initiative for the Girl Child (BSIG)",
            image: ASSET_URL["group_donation"],
            description: "The Back to School Initiative for the Girl Child (BSIG) is the flagship intervention of Anya Girlchild Foundation, designed to tackle one of the most pressing challenges in underserved communities: educational exclusion among girls. The BSIG program is a restorative, inclusive, and empowering solution that gives girls a second chance at formal education while equipping them with the tools to succeed and remain in school.",
        },
        {
            id: "80q2e6uv10rpz751",
            title: "Moral and Value Orientation for the Girl Child (MAVOG)",
            image: ASSET_URL["anyagirl_3"],
            description: "The MAVOG program is a transformative value-based initiative that aims to instill strong moral character, emotional intelligence, and responsible social behavior in young girls.Recognizing that education without values is incomplete, MAVOG equips girls with the ethics, mindset, and discipline they need to navigate challenges, lead effectively, and live with purpose.",
        },
        {
            id: "80q2e6uv10rpz752",
            title: "Advocacy for Girl Child Education (AGE)",
            image: ASSET_URL["anyagirlchild_addressing"],
            description: "The Advocacy for Girl Child Education (AGE) program is a strategic advocacy and awareness campaign dedicated to breaking down systemic, policy, and cultural barriers that hinder girls' access to education. AGE works at the intersection of policy, public opinion, and grassroots mobilization to champion the rights of every girl to receive quality, safe, and inclusive education.",
        },
    ]


    return (
        <section className="relative px-4 bg-slate-100">
            <div className="container mx-auto relative flex flex-col py-10">
                <div className="container mx-auto">
                    <div className="flex flex-col gap-2 py-10 max-w-3xl text-center mx-auto">
                        <h2 className="text-2xl md:text-4xl text-primary/70 font-bold font-grotesk">Our Core Programmes</h2>
                        <p className="text-sm md:text-base text-text font-normal font-poppins leading-loose">At our core, we exist to perform the following three (3) major roles.</p>
                    </div>
                    <div className="flex flex-col gap-4 md:gap-6">
                        {
                            coreData.map((el) => (
                                <aside key={el.id} className="relative flex flex-col sm:flex-row gap-4 w-full bg-white md:bg-transparent overflow-hidden p-3 md:p-4 rounded-lg shadow-lg shadow-backdrop md:shadow-transparent">
                                    <figure className="relative h-48 md:h-auto w-full md:max-w-md overflow-hidden rounded-md flex-shrink-0 border-2 md:border-8 border-slate-200 md:border-white md:shadow-lg">
                                        <Image src={el.image} alt={el.title} className='object-cover object-top absolute top-0 left-0 h-full w-full opacity-80' fill />
                                    </figure>
                                    <div className="flex-1 flex flex-col justify-center gap-2 md:gap-3 pb-4 md:py-6">
                                        <h4 className="text-xl md:text-2xl text-secondary text-center md:text-justify font-bold font-grotesk">{el.title}</h4>
                                        <p className="relative w-full h-full text-text text-center md:text-justify text-sm sm:text-base md:text-lg leading-loose font-poppins">{el.description}</p>
                                    </div>
                                </aside>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
