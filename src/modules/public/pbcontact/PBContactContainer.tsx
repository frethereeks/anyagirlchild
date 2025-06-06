import React from 'react'
import { ASSET_URL } from '@/assets'
import Image from 'next/image'
import Link from 'next/link'
import { IoLocateOutline } from 'react-icons/io5'
import { LuMessageSquare, LuPhoneCall } from 'react-icons/lu'
import { PBContactForm, PBContactMap } from './components'

export default function PBContactContainer() {
  return (
    <main className='flex flex-col'>
      <section className="relative flex flex-col justify-center py-20 px-4 bg-slate-100">
        <div className="absolute w-3/4 right-0 h-full">
          <Image src={ASSET_URL['donation_vanunload']} alt='' className='object-cover object-center' fill />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col justify-center bg-white shadow-lg shadow-text/50 px-4 py-8 md:px-8 md:py-14 w-full max-w-xl">
            <PBContactForm />
          </div>
        </div>
      </section>
      <section className="relative flex flex-col justify-center py-20 px-4">
        <div className="container mx-auto relative flex flex-col md:flex-row justify-center gap-4">
          <p className="flex-1 leading-loose flex items-center gap-3 text-text">
            <span className="h-10 w-10 rounded-md text-lg md:text-2xl text-white bg-secondary flex-shrink-0 grid place-items-center"><IoLocateOutline /></span> 35 Asheik Jarma, Jabi. Abuja
          </p>
          <Link href={`mailto:info@anyagirlchild.com`} className="flex-1 leading-loose flex items-center gap-3 text-text">
            <span className="h-10 w-10 rounded-md text-lg md:text-2xl text-white bg-secondary flex-shrink-0 grid place-items-center"><LuMessageSquare /></span> info@anyagirlchild.com
          </Link>
          <Link href={`tel:08038859276`} className="flex-1 leading-loose flex items-center gap-3 text-text">
            <span className="h-10 w-10 rounded-md text-lg md:text-2xl text-white bg-secondary flex-shrink-0 grid place-items-center"><LuPhoneCall /></span> 08038859276
          </Link>
        </div>
      </section>
      {/* <PBContactMap /> */}
    </main>
  )
}
