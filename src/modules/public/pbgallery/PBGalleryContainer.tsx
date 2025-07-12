"use client"
import { TGalleryProps } from '@/types'
import { GalleryImageViewer } from '@/modules/shared'

type TPageProps = {
  data: TGalleryProps[] | undefined
}

export default function PBGalleryContainer({ data }: TPageProps) {

  return (
    <>
      <section className='flex flex-col gap-4'>
        <div className="bg-backrop py-10 sm:py-20 px-4">
          <div className="container mx-auto flex flex-col gap-6 lg:gap-10">
            <div className="flex-1 flex flex-col justify-center gap-2 md:max-w-xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-secondary font-bold font-grotesk">Our Latest Project Photos</h2>
              <p className="text-sm md:text-base text-text/80 font-normal leading-loose font-poppins">
                Anya Girlchild Foundation is constantly putting itself out there to attend to the needs of the girl child both in Nigeria and beyond</p>
            </div>
            <GalleryImageViewer data={data}  />
          </div>
        </div>
      </section>
    </>
  )
}
