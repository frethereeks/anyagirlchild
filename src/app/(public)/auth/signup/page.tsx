import { ASSET_URL } from '@/assets'
import { PBSignupContainer } from '@/modules/public/pbauth'
import { Metadata } from 'next';
import Image from 'next/image'
import React from 'react'

export const metadata: Metadata = {
    title: "Anya Girlchild :: Signup",
    description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
    icons: ASSET_URL["anya_girlchild_logo"].src,
    openGraph: {
        type: "website",
        title: "Anya Girlchild :: Signup",
        images: [
            { url: ASSET_URL["donation_vanunload"].src, width: 800, height: 600 },
            { url: ASSET_URL["donation_vanunload"].src, width: 1800, height: 1600 },
        ],
        siteName: "Anya Girlchild Foundation",
        description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
        locale: 'en_US',
    }
};

export default function PBSignupPage() {
    return (
        <main className='flex flex-col md:flex-row gap-4 lg:gap-8 md:h-full'>
              <section className="container mx-auto flex flex-col lg:flex-row gap-4 md:h-full">
                <aside className="p-4 flex-1 hidden lg:flex flex-col gap-8 w-full lg:max-w-[40rem] py-40 relative bg-primary">
                  <Image src={ASSET_URL["little_child"]} alt='little_child' className='object-cover object-top opacity-85' fill />
                </aside>
                <PBSignupContainer />
            </section>
        </main>
    )
}
