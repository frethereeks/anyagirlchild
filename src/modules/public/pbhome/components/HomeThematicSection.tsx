"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Modal } from "antd"


type TThematicProps = {
    id: string
    title: string
    image: string
    description: string
    activities: string[]
}

const thematics: TThematicProps[] = [
    {
        id: '6qzxzwe4p0hk840',
        title: 'Education - Access & Retention',
        image: 'https://picsum.photos/200/300',
        description: 'We work to eliminate barriers that prevent girls from starting and staying in school. This includes financial constraints, early marriage, cultural restrictions, and lack of infrastructure.',
        activities: ['Back-to-school drives', 'Scholarships and school supplies', 'Alternative learning pathways', 'School retention monitoring'],
    },
    {
        id: '6qzxzwe4p0hk841',
        title: 'Mentorship & Life Skills Development',
        image: 'https://picsum.photos/200/301',
        description: 'We pair girls with positive role models and equip them with practical skills for personal growth, academic success, and future careers.',
        activities: ['Mentorship circles and pairing', 'Goal setting and decision-making sessions', 'Public speaking, time management, and leadership training',]
    },
    {
        id: '6qzxzwe4p0hk842',
        title: 'Gender Rights and Leadership Empowerment',
        image: 'https://picsum.photos/200/302',
        description: 'We promote gender equality by empowering girls to understand their rights, advocate for themselves, and pursue leadership roles in their communities.',
        activities: ['Gender rights education', 'Girl-led leadership workshops', 'Community advocacy training', "Girls'  in civic and social spaces"]
    },
    {
        id: '6qzxzwe4p0hk843',
        title: 'Engagement & Public Advocacy',
        image: 'https://picsum.photos/200/303',
        description: 'Change begins at the community level. We engage parents, religious leaders, and traditional rulers to address harmful norms and create safe, supportive environments for girls.',
        activities: ['Town hall meetings and dialogues', 'Radio/TV discussions and public campaigns', 'Stakeholder roundtables', 'Family sensitization visits']
    },
    {
        id: '6qzxzwe4p0hk844',
        title: 'Health, Wellness, and Personal Hygiene',
        image: 'https://picsum.photos/200/304',
        description: 'We promote the physical and emotional well-being of girls, ensuring they understand their bodies, manage puberty with confidence, and access basic hygiene resources.',
        activities: ['Menstrual hygiene workshops and kits', 'Mental health awareness and peer support', 'Nutrition, hygiene, and self - care training']
    },
    {
        id: '6qzxzwe4p0hk845',
        title: 'Cultural Transformation',
        image: 'https://picsum.photos/200/305',
        description: 'We foster honest, respectful conversations within communities to challenge outdated beliefs and promote progressive attitudes toward girl- child development.',
        activities: ['Intergenerational dialogue forums', 'Faith - based gender discussions', 'Cultural story-telling and theatre for change', 'Youth-led campaigns against child marriage and discrimination',]
    },
]

export default function HomeThematicSection() {
    const [activeTab, setActiveTab] = useState<number>(0)
    const thematic: TThematicProps = thematics[activeTab]
    const [openModal, setOpenModal] = useState<boolean>(false)

    const toggleModal = (index: number) => {
        setActiveTab(index)
        setOpenModal(true)
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
                            <div className="relative rounded-md overflow-hidden w-full flex-shrink-0 h-72">
                                <Image src={thematic.image} alt={thematic.title} className='object-cover absolute top-0 left-0 h-full w-full group-hover:z-10' fill />
                            </div>
                            <div className="flex-1 relative flex flex-col gap-4 pb-10 px-4">
                                <h3 className="text-xl md:text-2xl font-bold font-grotesk text-secondary">{thematic.title}</h3>
                                <p className="text-sm md:text-base font-normal font-grotesk text-text text-justify leading-loose">{thematic.description}</p>
                                <div className="flex flex-col gap-4 py-4">
                                    <h4 className="text-lg md:text-xl font-bold font-grotesk text-text">Key Activities</h4>
                                    <div className="pl-4">
                                        {
                                            thematic.activities.map(el => (
                                                <p key={el} className="relative before:absolute before:h-3 before:w-3 before:bg-danger before:-left-4 before:top-1/2 before:-translate-y-1/2  p-2 text-sm md:text-base font-normal font-grotesk text-text text-justify">{el}</p>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </Modal>
            <section className="flex flex-col">
                <aside className="relative py-20 px-4 bg-backdrop">
                    <div className="container mx-auto">
                        <div className="flex flex-col gap-4 py-10 max-w-2xl text-center mx-auto">
                            <h2 className="text-2xl md:text-4xl text-primary/70 font-black font-grotesk">THEMATIC FOCUS AREAS</h2>
                            <p className="text-sm md:text-base text-text font-normal leading-loose">Anya Girlchild Foundation works across <strong>six key thematic areas</strong> to ensure a holistic approach to empowering the girl child. These focus areas reflect our understanding that education alone is not enough—girls need the right <strong>environment, values, skills, and support</strong> to thrive.</p>
                        </div>
                        <div className="sticky top-0 left-0 grid md:grid-cols-3 grid-cols-[(auto-fit,_minmax(150px,_250px))] justify-center gap-4 md:gap-8 py-10">
                            {
                                thematics.map((el, index) => (
                                    <div onClick={() => toggleModal(index)} key={el.id} className="relative w-full h-20 md:h-40 overflow-hidden
                                     rounded-md">
                                        <Image src={el.image} alt={el.title} className='object-cover absolute top-0 left-0 h-full w-full opacity-80' fill />
                                        <p className="relative w-full h-full p-4 bg-primary/80 text-white text-center text-base md:text-lg font-semibold font-grotesk cursor-pointer grid place-items-center">{el.title}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </aside>
            </section>
        </>
    )
}
