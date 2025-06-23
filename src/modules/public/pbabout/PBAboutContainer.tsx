import React from 'react'
import { AboutCoreSection, AboutGallerySection, AboutMainSection } from './components'
import { QuoteSection } from '@/modules/shared'
import ThematicSection from '@/modules/shared/ThematicSection'

export default function PBAboutContainer() {
  return (
    <main className='flex flex-col'>
      <AboutMainSection key={"z8p06351zsert1"} />
      <AboutCoreSection key={"z8p06351zsert2"} />
      <QuoteSection bgColor='bg-secondary' quote={undefined} key={"902x8036z964"} />
      <ThematicSection total={11} key={"z8p06351zsert6"} />
      <AboutGallerySection />
    </main>
  )
}
