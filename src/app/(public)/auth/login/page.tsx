import { Metadata } from 'next';
import React from 'react'
import { ASSET_URL } from '@/assets'
import { PBLoginContainer } from '@/modules/public/pbauth'
import Image from 'next/image'
import { config } from '@/config';


export const metadata: Metadata = {
  metadataBase: new URL(config.APP_PUBLIC_SITE_URL),
  title: "Anya Girlchild :: Login",
  description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
  icons: ASSET_URL["anya_girlchild_logo"].src,
  openGraph: {
    type: "website",
    title: "Anya Girlchild :: Login",
    images: [
      { url: ASSET_URL["anyagirlchild_outreach"].src, width: 800, height: 600 },
      { url: ASSET_URL["anyagirlchild_outreach"].src, width: 1800, height: 1600 },
    ],
    siteName: "Anya Girlchild Foundation",
    description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
    locale: 'en_US',
  }
};

type TPageProps = {
  params: Record<string, string | string[] | undefined>;
  searchParams: {
    view?: string | string[];
  };
};

export default function PBLoginPage({ searchParams }: TPageProps) {
  const view = searchParams?.view ?? null;

  return (
    <main className='flex flex-col md:flex-row gap-4 lg:gap-8 md:h-full'>
      <section className="container mx-auto flex flex-col lg:flex-row gap-4 md:h-full">
        <aside className="p-4 flex-1 hidden lg:flex flex-col gap-8 w-full lg:max-w-[40rem] py-40 relative bg-primary">
          <Image src={ASSET_URL["anyagirlchild_outreach"]} alt='anyagirlchild_outreach' className='object-cover object-top opacity-85' fill />
        </aside>
        <PBLoginContainer viewReset={view ? true : false} />
      </section>
    </main>
  )
}
