import React from 'react'
import { ASSET_URL } from '@/assets'
import { appRoutePaths } from '@/routes/paths'
import Image from 'next/image'
import Link from 'next/link'
import { FaCaretRight } from 'react-icons/fa6'

export default function AboutMainSection() {
    return (
        <section className="relative px-4 py-32 bg-white">
            <div className="max-w-5xl mx-auto relative grid md:grid-cols-2 gap-4 md:gap-8 justify-center rounded-md">
                <div className="row-start-2 md:row-start-1 flex-1 h-full">
                    <div className="md:max-w-lg py-40 h-full ml-auto overflow-hidden relative rounded-md flex flex-col gap-4">
                        <Image src={ASSET_URL['little_child']} alt='little_child' className='object-cover object-top overlay' fill />
                    </div>
                </div>
                <div className="flex-1 py-5 relative rounded-md">
                    <div className="md:max-w-lg flex flex-col gap-4">
                        <h4 className="text-2xl md:text-4xl text-dark-text font-bold font-mulish">Welcome to <span className="text-secondary">Anya Girlchild</span> Foundation</h4>
                        <p className="text-small text-text text-justify leading-loose">Our approach involves not only education but also moral development, career mentorship, and self-care, ensuring that these girls grow into well-rounded, empowered individuals who can lead and inspire change in their communities.</p>
                        <p className="text-small text-text text-justify leading-loose">Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential. Growing up, I faced significant hardships that disrupted my early education and exposed me to the realities of instability, societal pressures, and the limitations placed on girls. These challenges sparked a passion within me to help other young girls navigate similar situations, ensuring that no girl is denied the opportunity to rise above her circumstances.</p>
                    </div>
                </div>
                <div className="md:col-span-2 flex flex-col gap-4">
                    <p className="text-small text-text text-justify leading-loose">Girls, especially those from underprivileged backgrounds, are disproportionately affected by factors such as poverty, cultural expectations, early marriage, and lack of access to quality education. These challenges often rob them of their potential and curtail their dreams. The foundation recognizes that the girl child faces unique, time-bound pressures. Puberty, societal expectations of early marriage, and family responsibilities often force girls to give up on their aspirations before they even have a chance to pursue them.</p>
                    <p className="text-small text-text text-justify leading-loose">Anya Girlchild Foundation seeks to intervene by bringing out-of-school girls back into the education system, identify talented girls whose education is threatened by poverty and societal challenges, and provide them with the support they need to overcome these barriers. Our approach involves not only education but also moral development, career mentorship, and self-care, ensuring that these girls grow into well-rounded, empowered individuals who can lead and inspire change in their communities. By addressing the unique challenges faced by girls, we are investing in a more equitable and prosperous society for future generations.</p>
                </div>
            </div>
        </section>
    )
}
