import React from 'react'
import { HomeAboutSection, HomeBlogSection, HomeGallerySection, HomeHeroSection, HomeQuoteSection, HomeThematicSection } from './components'

export default function PBHomeContainer() {
  return (
    <main className='flex flex-col'>
      <HomeHeroSection />
      <HomeAboutSection />
      <HomeQuoteSection />
      <HomeThematicSection />
      <HomeGallerySection />
      <HomeBlogSection />
    </main>
  )
}
