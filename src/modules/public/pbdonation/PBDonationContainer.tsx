import React from 'react'
import { ASSET_URL } from '@/assets'
import Image from 'next/image'

export default function PBDonationContainer() {
  return (
    <main className='flex flex-col'>
      <section className="relative flex flex-col justify-center py-20 px-4">
        <div className="absolute w-3/4 right-0 h-full">
          <Image src={ASSET_URL['wallet']} alt='' className='object-cover object-center' fill />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col justify-center items-center bg-white shadow-lg shadow-text/50 px-4 py-8 md:px-8 md:py-14 w-full max-w-xl">
            <h2 className="text-2xl md:text-4xl text-center text-sky-700 font-inter font-black">I-LEAP PROJECT ARTISAN NOMINATION FORM</h2>
            <h2 className="text-lg text-center text-text font-medium italic">(For Use by Developers & Contractors)</h2>
            {/* <h2 className="text-lg font-medium text-blue-800 italic">(For Use by Developers & Contractors)</h2> */}
            <div className="flex flex-col gap-2 mt-4"></div>
            <p className="text-sm md:text-base text-text"></p>
          </div>
        </div>
      </section>
    </main >
  )
}
