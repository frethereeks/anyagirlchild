import { ASSET_URL } from '@/assets'
import { appRoutePaths } from '@/routes/paths'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HomeGallerySection() {
  return (
    <section className="relative flex flex-col gap-2 sm:gap-4 px-4 py-20 md:py-28 bg-slate-100">
      <h4 className="text-2xl md:text-4xl text-secondary text-center font-bold">Our Works</h4>
      <p className="text-center text-small text-slate-500 leading-loose max-w-3xl mx-auto">Our approach involves not only education but also moral development, career mentorship, and self-care, ensuring that these girls grow into well-rounded, empowered individuals who can lead and inspire change in their communities.</p>
      <div className="container mx-auto relative grid grid-cols-2 gap-2 sm:gap-4 justify-center items-center rounded-md pt-10">
        <div className="border w-full flex-1 rounded-tl-3xl relative overflow-hidden lg:min-h-64 py-20">
          <Image src={ASSET_URL["little_child"]} alt="little_child" className="h-full w-full object-cover object-bottom rounded-sm absolute left-0 top-0" fill />
        </div>
        <div className="border w-full flex-1 rounded-tr-3xl relative overflow-hidden lg:min-h-64 py-20">
          <Image src={ASSET_URL["adult_intervention"]} alt="adult_intervention" className="h-full w-full object-cover object-bottom rounded-sm absolute left-0 top-0" fill />
        </div>
      </div>
      <div className="container mx-auto relative grid grid-cols-3 gap-2 sm:gap-4 justify-center items-center">
        <div className="border w-full flex-1 rounded-md sm:rounded-3xl rounded-br-3xl relative overflow-hidden lg:min-h-64 py-20">
          <Image src={ASSET_URL["donation_man"]} alt="donation_man" className="h-full w-full object-cover object-bottom rounded-sm absolute left-0 top-0" fill />
        </div>
        <div className="border w-full flex-1 rounded-md sm:rounded-3xl rounded-br-3xl relative overflow-hidden lg:min-h-64 py-20">
          <Image src={ASSET_URL["hungry_man"]} alt="hungry_man" className="h-full w-full object-cover object-bottom rounded-sm absolute left-0 top-0" fill />
        </div>
        <div className="border w-full flex-1 rounded-md sm:rounded-3xl rounded-br-3xl relative overflow-hidden lg:min-h-64 py-20">
          <Image src={ASSET_URL["group_donation"]} alt="group_donation" className="h-full w-full object-cover object-bottom rounded-sm absolute left-0 top-0" fill />
        </div>
      </div>
      <div className="container mx-auto relative grid grid-cols-2 md:grid-rows-2 gap-4 justify-center items-center rounded-md">
        <div className="border w-full flex-1 row-span-2 rounded-l-3xl relative overflow-hidden min-h-full">
          <Image src={ASSET_URL["alms_donation"]} alt="alms_donation" className="h-full w-full object-cover object-top rounded-sm absolute left-0 top-0" fill />
        </div>
        <div className="border w-full flex-1 rounded-tr-3xl relative overflow-hidden py-14 md:py-32">
          <Image src={ASSET_URL["donation_vanunload"]} alt="donation_vanunload" className="h-full w-full object-cover object-bottom rounded-sm absolute left-0 top-0" fill />
        </div>
        <div className="border w-full flex-1 rounded-br-3xl relative overflow-hidden py-14 md:py-32">
          <Image src={ASSET_URL["wallet"]} alt="wallet" className="h-full w-full object-cover object-bottom rounded-sm absolute left-0 top-0" fill />
        </div>
      </div>
      <Link href={appRoutePaths.gallery} className="heading-five font-medium rounded-sm text-center mx-auto text-white w-max mt-5 px-10 py-2 bg-danger">See More</Link>
    </section>
  )
}
