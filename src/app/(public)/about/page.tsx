import React from 'react'
import { ASSET_URL } from '@/assets'
import PBBreadCrumb from '@/modules/public/pblayout/PBBreadCrumb'
import PBAboutContainer from '@/modules/public/pbabout/PBAboutContainer'
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Anya Girlchild :: About",
    description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
};


export default function AboutPage() {
    return (
        <main className='flex flex-col gap-4'>
            <PBBreadCrumb image={ASSET_URL["donation_personnel"]} />
            <PBAboutContainer />
        </main>
    )
}
