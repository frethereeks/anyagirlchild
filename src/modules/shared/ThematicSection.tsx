"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Modal } from "antd"
import { thematicsData } from '@/data'
import { TThematicProps } from '@/types'
import Link from 'next/link'
import { appRoutePaths } from '@/routes/paths'
import { ASSET_URL } from '@/assets'

export default function ThematicSection({ total }: { total: number }) {
    const [thematic, setThematic] = useState<TThematicProps>(thematicsData[0])
    const [openModal, setOpenModal] = useState<boolean>(false)

    const toggleModal = (index: number) => {
        setOpenModal(true)
        setThematic(thematicsData[index])
    }



    return (
        <>
            <Modal
                open={openModal}
                onCancel={() => setOpenModal(false)}
                footer={null}
            >
                <div className="flex-1 max-w-screen-lg mx-auto ">
                    {
                        <div key={thematic.id} className="flex flex-col gap-6 rounded-md relative group">
                            {/* <div className="relative rounded-md overflow-hidden w-full flex-shrink-0 h-72">
                                <Image src={thematic.image} alt={thematic.title} className='object-cover absolute top-0 left-0 h-full w-full group-hover:z-10' fill />
                            </div> */}
                            <div className="flex-1 relative flex flex-col gap-4 pb-10 px-4">
                                <h3 className="text-xl md:text-2xl font-bold font-grotesk text-secondary">{thematic.title}</h3>
                                <p className="text-sm md:text-base font-normal font-grotesk text-text text-justify leading-loose">{thematic.description}</p>
                                <div className="flex flex-col gap-4 py-4">
                                    <h4 className="text-lg md:text-xl font-bold font-grotesk text-text">Key Activities</h4>
                                    <div className="pl-4">
                                        {
                                            thematic.activities.map(el => (
                                                <p key={el} className="relative before:absolute before:h-3 before:w-3 before:bg-danger before:-left-4 before:top-3 before:translate-y-1/4 p-2 text-sm md:text-base font-normal font-grotesk text-text text-justify">{el}</p>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </Modal>
            <section className="flex flex-col" id='thematics'>
                <aside className="relative py-20 px-4 bg-white">
                    <div className="container mx-auto">
                        <div className="flex flex-col gap-4 py-10 max-w-3xl text-center mx-auto">
                            <h2 className="text-2xl md:text-4xl text-primary/70 font-black font-grotesk">Thematic Focus Areas</h2>
                            <p className="text-sm md:text-base text-text font-normal font-poppins leading-loose">Anya Girlchild Foundation works across <strong>six key thematic areas</strong> to ensure a holistic approach to empowering the girl child. These focus areas reflect our understanding that education alone is not enough—girls need the right <strong>environment, values, skills, and support</strong> to thrive.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,_minmax(250px,_350px))] justify-center gap-4 md:gap-8 py-10">
                            {
                                thematicsData.slice(0, 6).map((el, index) => (
                                    <div onClick={() => toggleModal(index)} key={el.id} className="relative w-full h-28 md:h-40 overflow-hidden
                                     rounded-md">
                                        <Image src={ASSET_URL['anya_girlchild_group']} alt={el.title} className='object-cover absolute top-0 left-0 h-full w-full opacity-80' fill />
                                        <p className="relative w-full h-full p-4 bg-primary/80 text-white text-center text-base md:text-lg font-semibold font-grotesk cursor-pointer grid place-items-center">{el.title}</p>
                                    </div>
                                ))
                            }
                        </div>
                        {
                            total <= 6 &&
                            <div className="flex -translate-y-4">
                                <Link href={`${appRoutePaths.about}#thematics`} className="heading-five font-medium font-grotesk rounded-sm text-center mx-auto text-white text-sm w-max mt-5 px-10 py-2 bg-danger">View All</Link>
                            </div>
                        }
                    </div>
                </aside>
                {
                    total > 6 ?
                        <aside className="relative py-10 px-4 bg-backdrop">
                            <div className="container mx-auto">
                                <div className="flex flex-col gap-4 py-10 max-w-2xl text-center mx-auto">
                                    <h2 className="text-2xl md:text-4xl text-primary/70 font-black font-grotesk">Operational Units and Their Roles</h2>
                                    <p className="text-sm md:text-base text-text font-normal leading-loose">At <strong>Anya Girlchild Foundation,</strong> we maintain a <strong>functional, responsive, and accountable structure</strong> that enables us to deliver on our mission with efficiency and transparency. Our organizational structure is guided by our <strong>Board of Trustees</strong> and driven by a team of dedicated professionals and volunteers who lead specific operational units.</p>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,_minmax(250px,_350px))] justify-center gap-3 sm:gap-6 md:gap-8 py-10">
                                    {
                                        thematicsData.slice(6).map((el, index) => (
                                            <div onClick={() => toggleModal((index+6))} key={el.id} className={`relative w-full ${index === 0 ? 'row-span-2' : 'h-28 md:h-40'}  overflow-hidden rounded-md`}>
                                                {
                                                     
                                                }
                                                <Image src={index === 0 ? ASSET_URL['donation_personnel'] : ASSET_URL['healthcare_nurse']} alt={el.title} className='object-cover absolute top-0 left-0 h-full w-full opacity-80' fill />
                                                <p className="relative w-full h-full p-4 bg-primary/80 text-white text-center text-base md:text-lg font-semibold font-grotesk cursor-pointer grid place-items-center">{el.title}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </aside>
                        :
                        <>
                        </>
                }
            </section>
        </>
    )
}
