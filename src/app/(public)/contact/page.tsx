import React from 'react'
import { Metadata } from 'next';
import PBContactContainer from '@/modules/public/pbcontact/PBContactContainer';


export const metadata: Metadata = {
    title: "Anya Girlchild :: Contact",
    description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
};


export default function ContactPage() {
    return (
        <main className='flex flex-col gap-4 py-10'>
            {/* <PBBreadCrumb image={ASSET_URL["donation_vanunload"]} /> */}
            <PBContactContainer />
        </main>
    )
}
