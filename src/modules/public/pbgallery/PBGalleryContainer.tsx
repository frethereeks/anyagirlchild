import React from 'react'
import Image from 'next/image'
import { ASSET_URL } from '@/assets'
import { $Enums } from '@prisma/client'
import { TGalleryProps } from '@/types'

type TPageProps = {
  data: TGalleryProps[] | undefined
  role: $Enums.Role | undefined
}

export default function PBGalleryContainer({ data, role }: TPageProps) {

  return (
    <section className='flex flex-col gap-4'>
      <div className="bg-backrop py-10 sm:py-20 px-4">
        <div className="container mx-auto flex flex-col gap-6 lg:gap-10">
          <div className="flex-1 flex flex-col justify-center gap-2 md:max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-secondary font-bold font-mulish">Our Latest Project Photos</h2>
            <p className="text-sm md:text-base text-text/80 font-normal leading-loose font-sans">
              Anya Girlchild Foundation is constantly putting itself out there to attend to the needs of the girl child both in Nigeria and beyond</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] auto-rows-[200px] gap-2 md:gap-4"> 
          {/* <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[100px] md:auto-rows-[200px] gap-2 md:gap-4"> */}
            {
              data?.map((gallery, i) =>
                i % 4 === 0 ? <div key={gallery.id} className="relative before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-gradient-to-t before:from-slate-600 before:via-transparent to-transparent flex-1 min-h-40 overflow-hidden rounded-sm md:row-span-1">
                  <Image src={gallery.image} alt={gallery.title || "anyagirlchild gallery photo"} className="object-cover object-left h-full w-full relative" fill />
                </div>
                  :
                  <div key={gallery.id} className="relative before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-gradient-to-t before:from-slate-600 before:via-transparent to-transparent flex-1 min-h-40 overflow-hidden rounded-sm">
                    <Image src={gallery.image} alt={gallery.title || "anyagirlchild gallery photo"} className="object-cover object-center h-full w-full relative" fill />
                  </div>
              )
            }
          </div>
          {/* <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] md:auto-rows-[300px] gap-2 md:gap-4">
            <div
              className="relative before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-gradient-to-t before:from-slate-600 before:via-transparent to-transparent flex-1 min-h-40 overflow-hidden rounded-sm md:row-span-2">
              <Image src={ASSET_URL["donation_personnel"]} alt="donation_personnel" className="object-cover object-left h-full w-full relative" fill />
            </div>
            <div
              className="relative before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-gradient-to-t before:from-slate-600 before:via-transparent to-transparent flex-1 min-h-40 overflow-hidden rounded-sm md:col-span-2">
              <Image src={ASSET_URL["group_donation"]} alt="group_donation" className="object-cover object-center h-full w-full relative" fill />
            </div>
            <div
              className="relative before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-gradient-to-t before:from-slate-600 before:via-transparent to-transparent flex-1 min-h-40 overflow-hidden rounded-sm">
              <Image src={ASSET_URL["hungry_man"]} alt="hungry_man" className="object-cover object-center h-full w-full relative" fill />
            </div>
            <div
              className="relative before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-gradient-to-t before:from-slate-600 before:via-transparent to-transparent flex-1 min-h-40 overflow-hidden rounded-sm">
              <Image src={ASSET_URL["alms_donation"]} alt="alms_donation" className="object-cover object-center h-full w-full relative" fill />
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}
