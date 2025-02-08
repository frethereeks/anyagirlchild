import React from 'react'
import Image from 'next/image'
import { ASSET_URL } from '@/assets'
import Link from 'next/link'
import { SOCIAL_LINKS } from '@/constants'
import { IoLogoFacebook, IoLogoInstagram, IoLogoWhatsapp, IoLogoYoutube } from 'react-icons/io5'
import { appRoutePaths } from '@/routes/paths'

export default function PBFooter() {
  return (
    <footer className='relative bg-primary pt-10 pb-4 px-4'>
      <Image src={ASSET_URL['group_donation']} alt='group_donation' className='object-cover object-top' fill />
      <div className="overlay bg-primary z-10 shadow-none opacity-70 backdrop-blur-sm"></div>
      <div className="container mx-auto relative z-20 grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 py-10 rounded-md text-white">
        <h2 className="text-white text-2xl font-bold text-center md:text-left">Foot</h2>
        <aside className="flex flex-col sm:justify-center gap-4">
          <h4 className='heading-three'>Quick Links</h4>
          <div className="flex flex-col text-base md:text-base opacity-90">
            <Link href={appRoutePaths.home} className="leading-loose">Home</Link>
            <Link href={appRoutePaths.about} className="leading-loose">About</Link>
            <Link href={appRoutePaths.gallery} className="leading-loose">Gallery</Link>
            <Link href={appRoutePaths.blog} className="leading-loose">Blog</Link>
            <Link href={appRoutePaths.contact} className="leading-loose">Contact</Link>
          </div>
        </aside>
      </div>
      <div className="container mx-auto relative z-20 flex gap-4 md:gap-8 justify-between items-center py-4 rounded-md">
        <p className="text-white text-sm text-center md:text-left">Copyright &copy; {new Date().getFullYear()}. <Link href={appRoutePaths.home} className='text-background font-bold'>Anyagirlchild.</Link> All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          <Link href={SOCIAL_LINKS.facebook} className='text-white hover:text-background/80'><IoLogoFacebook /></Link>
          <Link href={SOCIAL_LINKS.instagram} className='text-white hover:text-background/80'><IoLogoInstagram /></Link>
          <Link href={SOCIAL_LINKS.whatsapp} className='text-white hover:text-background/80'><IoLogoWhatsapp /></Link>
          <Link href={SOCIAL_LINKS.youtube} className='text-white hover:text-background/80'><IoLogoYoutube /></Link>
        </div>
      </div>
    </footer>
  )
}
