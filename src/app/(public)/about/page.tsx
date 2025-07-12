import React from 'react'
import { ASSET_URL } from '@/assets'
import PBBreadCrumb from '@/modules/public/pblayout/PBBreadCrumb'
import PBAboutContainer from '@/modules/public/pbabout/PBAboutContainer'
import { Metadata } from 'next';
import { config } from '@/config';


export const metadata: Metadata = {
    metadataBase: new URL(config.APP_PUBLIC_SITE_URL),
    title: "Anya Girlchild :: About",
    description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
    icons: ASSET_URL["anya_girlchild_logo"].src,
    openGraph: {
        type: "website",
        title: "Anya Girlchild :: About",
        images: [
            { url: ASSET_URL["anya_girlchild_group"].src, width: 800, height: 600 },
            { url: ASSET_URL["anya_girlchild_group"].src, width: 1800, height: 1600 },
        ],
        siteName: "Anya Girlchild Foundation",
        description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
        locale: 'en_US',
    }
};


export default function AboutPage() {
    return (
        <main className='flex flex-col gap-4'>
            <PBBreadCrumb image={ASSET_URL["anya_girlchild_group"]} />
            <PBAboutContainer />
        </main>
    )
}
