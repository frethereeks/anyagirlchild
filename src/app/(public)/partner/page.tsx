import { ASSET_URL } from '@/assets'
import PBBreadCrumb from '@/modules/public/pblayout/PBBreadCrumb'
import React from 'react'
import { Metadata } from 'next';
import PBPartnerContainer from '@/modules/public/pbpartner/PBPartnerContainer';


export const metadata: Metadata = {
  title: "Anya Girlchild :: Partner",
  description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
  icons: ASSET_URL["anya_girlchild_logo"].src,
  openGraph: {
    type: "website",
    title: "Anya Girlchild :: Partner",
    images: [
          { url: ASSET_URL["anyagirlchild_outreach"].src, width: 800, height: 600 },
          { url: ASSET_URL["anyagirlchild_outreach"].src, width: 1800, height: 1600 },
        ],
        siteName: "Anya Girlchild Foundation",
        description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
        locale: 'en_US',
  }
};


export default async function PartnerPage() {

  return (
    <main className='flex flex-col gap-4'>
      <PBBreadCrumb image={ASSET_URL["anyagirlchild_outreach"]} />
      <PBPartnerContainer />
    </main>
  )
}
