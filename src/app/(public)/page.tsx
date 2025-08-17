export const dynamic = "force-dynamic"
import { ASSET_URL } from '@/assets'
import { config } from '@/config'
import PBHomeContainer from '@/modules/public/pbhome/PBHomeContainer'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  metadataBase: new URL(config.APP_PUBLIC_SITE_URL),
  title: "Anya Girlchild :: Home",
  description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
  icons: ASSET_URL["anya_girlchild_logo"].src,
  openGraph: {
    type: "website",
    title: "Anya Girlchild :: Home",
    images: [
      { url: ASSET_URL["anya_girlchild_logo"].src, width: 800, height: 600 },
      { url: ASSET_URL["anya_girlchild_logo"].src, width: 1800, height: 1600 },
    ],
    siteName: "Anya Girlchild Foundation",
    description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
    locale: 'en_US',
  }
}

export default function HomePage() {
  return (
    <PBHomeContainer />
  )
}
