import React from 'react'
import { HomeAboutSection, HomeBlogSection, HomeGallerySection, HomeHeroSection } from './components'
import { QuoteSection } from '@/modules/shared'
import ThematicSection from '@/modules/shared/ThematicSection'

export default function PBHomeContainer() {
  return (
    <main className='flex flex-col'>
      <HomeHeroSection />
      <HomeAboutSection />
      <QuoteSection bgColor='bg-danger' quote={undefined} key={"902x8036z964"} />
      <ThematicSection total={6} />
      <HomeGallerySection />
      <HomeBlogSection />
    </main>
  )
}
