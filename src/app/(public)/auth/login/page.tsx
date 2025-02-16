import { ASSET_URL } from '@/assets'
import { PBLoginContainer } from '@/modules/public/pbauth'
import { Metadata } from 'next';
import Image from 'next/image'
import React from 'react'


export const metadata: Metadata = {
  title: "Anya Girlchild :: Login",
  description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
};

type TPageProps = {
  searchParams: {
    view?: string
  }
}

export default function PBLoginPage({ searchParams: { view } }: TPageProps) {
  return (
    <main className='flex flex-col md:flex-row gap-4 lg:gap-8 md:h-full'>
      <section className="container mx-auto flex flex-col lg:flex-row gap-4 md:h-full">
        <aside className="p-4 flex-1 hidden lg:flex flex-col gap-8 w-full lg:max-w-[40rem] py-40 relative bg-primary">
          <Image src={ASSET_URL["donation_man"]} alt='donation_man' className='object-cover object-top opacity-85' fill />
        </aside>
        <PBLoginContainer viewReset={view ? true : false} />
      </section>
    </main>
  )
}
