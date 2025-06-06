import { ASSET_URL } from '@/assets'
import { appRoutePaths } from '@/routes/paths'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function AboutGallerySection() {
  /* 
  anyagirlchild_addressing
anyagirlchild_douvet_gift
anyagirlchild_with_
anyagirlchild_represented
anyagirlchild_award
anyagirlchild_outreach
anyagirlchild_director
anyagirlchild_gift_to_girls
  
  */
  return (
    <section className="relative flex flex-col gap-4 px-4 py-20 md:py-32 bg-background">
      <h4 className="text-2xl md:text-4xl text-secondary text-center font-bold">Our Works</h4>
      <p className="text-center text-small text-slate-500 leading-loose max-w-3xl mx-auto">Our approach involves not only education but also moral development, career mentorship, and self-care, ensuring that these girls grow into well-rounded, empowered individuals who can lead and inspire change in their communities.</p>
      <div className="container mx-auto relative grid md:grid-cols-2 gap-4 justify-center items-center rounded-md pt-10">
        <div className="flex-1 rounded-tl-3xl relative overflow-hidden min-h-64 py-48">
          <Image src={ASSET_URL["anyagirlchild_gift_girls"]} alt="anyagirlchild_gift_girls" className="h-full w-full object-cover object-center rounded-sm absolute left-0 top-0" fill />
        </div>
        <div className="flex-1 rounded-tr-3xl relative overflow-hidden min-h-64 py-48">
          <Image src={ASSET_URL["anyagirlchild_douvet_gift"]} alt="anyagirlchild_douvet_gift" className="h-full w-full object-cover object-top rounded-sm absolute left-0 top-0" fill />
        </div>
      </div>
      <div className="container mx-auto relative grid md:grid-cols-3 gap-4 justify-center items-center rounded-md">
        <div className="flex-1 rounded-3xl rounded-br-3xl relative overflow-hidden min-h-64">
          <Image src={ASSET_URL["anyagirlchild_represented"]} alt="anyagirlchild_represented" className="h-full w-full object-cover object-top rounded-sm absolute left-0 top-0 -scale-x-100" fill />
        </div>
        <div className="flex-1 rounded-3xl rounded-br-3xl relative overflow-hidden min-h-64">
          <Image src={ASSET_URL["anyagirlchild_addressing"]} alt="anyagirlchild_addressing" className="h-full w-full object-cover object-bottom rounded-sm absolute left-0 top-0" fill />
        </div>
        <div className="flex-1 rounded-3xl rounded-br-3xl relative overflow-hidden min-h-64">
          <Image src={ASSET_URL["anyagirlchild_outreach"]} alt="anyagirlchild_outreach" className="h-full w-full object-cover object-top rounded-sm absolute left-0 top-0" fill />
        </div>
      </div>
      <div className="container mx-auto relative grid md:grid-cols-2 md:grid-rows-2 gap-4 justify-center items-center rounded-md">
        <div className="flex-1 md:row-span-2 rounded-l-3xl relative overflow-hidden min-h-full">
          <Image src={ASSET_URL["anyagirlchild_award"]} alt="anyagirlchild_award" className="h-full w-full object-cover object-top rounded-sm absolute left-0 top-0" fill />
        </div>
        <div className="flex-1 rounded-tr-3xl relative overflow-hidden min-h-64">
          <Image src={ASSET_URL["anyagirl_6"]} alt="anyagirl_6" className="h-full w-full object-cover object-center rounded-sm absolute left-0 top-0" fill />
        </div>
        <div className="flex-1 rounded-br-3xl relative overflow-hidden min-h-64">
          <Image src={ASSET_URL["anyagirlchild_with_ngos"]} alt="anyagirlchild_with_ngos" className="h-full w-full object-cover object-top rounded-sm absolute left-0 top-0" fill />
        </div>
      </div>
      <Link href={appRoutePaths.gallery} className="heading-five font-medium rounded-sm text-center mx-auto text-white w-max mt-5 px-10 py-2 bg-danger">See More</Link>
    </section>
  )
}
