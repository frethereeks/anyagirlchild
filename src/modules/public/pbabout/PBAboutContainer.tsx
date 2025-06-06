import React from 'react'
import { AboutGallerySection, AboutMainSection, AboutQuoteSection } from './components'
import { HomeGallerySection } from '../pbhome/components'

export default function PBAboutContainer() {
  return (
    <main className='flex flex-col'>
      <AboutMainSection />
      <AboutQuoteSection />
      <AboutGallerySection />
      <HomeGallerySection />
    </main>
  )
}
