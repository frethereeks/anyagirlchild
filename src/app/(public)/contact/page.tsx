import React from 'react'
import { Metadata } from 'next';
import PBContactContainer from '@/modules/public/pbcontact/PBContactContainer';
import {ContactEmail} from '@/modules/shared/ContactEmail';
import { ASSET_URL } from '@/assets';


export const metadata: Metadata = {
    title: "Anya Girlchild :: Contact",
    description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
    icons: ASSET_URL["anya_girlchild_logo"].src,
    openGraph: {
        type: "website",
        title: "Anya Girlchild :: Contact",
        images: [
            { url: ASSET_URL["anya_girlchild_group"].src, width: 800, height: 600 },
            { url: ASSET_URL["anya_girlchild_group"].src, width: 1800, height: 1600 },
        ],
        siteName: "Anya Girlchild Foundation",
        description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
        locale: 'en_US',
    }
};


export default function ContactPage() {
    return (
        <main className='flex flex-col gap-4 py-10'>
            {/* <PBBreadCrumb image={ASSET_URL["anya_girlchild_group"]} /> */}
            <PBContactContainer />
            <section className='relative container mx-auto py-10 bg-backdrop'>
                <ContactEmail key={"80234"} fullname='Angela Jones' email='angelajones@gmail.com' message='Thanks for taking notice of me and showing interest.' />
            </section>
        </main>
    )
}
