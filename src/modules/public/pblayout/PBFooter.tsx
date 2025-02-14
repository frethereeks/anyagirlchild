import React from 'react'
import Image from 'next/image'
import { ASSET_URL } from '@/assets'
import Link from 'next/link'
import { SOCIAL_LINKS } from '@/constants'
import { IoLocateOutline, IoLogoFacebook, IoLogoInstagram, IoLogoWhatsapp, IoLogoYoutube } from 'react-icons/io5'
import { appRoutePaths } from '@/routes/paths'
import { LuMessageSquare, LuPhoneCall } from 'react-icons/lu'

export default function PBFooter() {
  return (
    <footer className='relative bg-primary pt-10 pb-4 px-4'>
      <Image src={ASSET_URL['group_donation']} alt='group_donation' className='object-cover object-top opacity-75' fill />
      <div className="overlay bg-primary z-10 shadow-none opacity-70 backdrop-blur-sm"></div>
      <div className="container mx-auto relative z-20 flex flex-wrap sm:grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 py-10 rounded-md text-white">
        <aside className="flex flex-col sm:justify-center gap-4 w-full col-span-2 md:col-span-1">
          <Link href="/" className="flex py-2 gap-2">
            <div className="w-16 min-h-16 flex justify-center items-center rounded-md overflow-hidden relative bg-primary flex-shrink-0">
              {/* <IoFileTrayStackedSharp key={82346} className="text-sm text-white" /> */}
              <Image src={ASSET_URL["wallet"]} alt='AnyaGirlchild Logo' fill={true} className='object-cover flex-shrink-0' />
            </div>
            <div className="flex flex-col justify-center w-max">
              <h1 className={`text-white text-2xl sm:text-3xl w-max font-extrabold uppercase tracking-tight flex items-center`}>Anya<p className={`tracking-normal text-danger`}>GirlChild</p></h1>
              <p className="text-lg text-text text-center font-semibold tracking-[.5rem] leading-none uppercase w-full py-0.5 px-3 whitespace-pre-wrap bg-white">Foundation</p>
            </div>
          </Link>
          <p className="text-sm lg:text-base text-white font-medium py-1.5">Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.</p>
        </aside>
        <aside className="flex flex-col sm:justify-center gap-4">
          <h4 className='heading-three'>Contact</h4>
          <div className="flex flex-col gap-3 text-base md:text-base opacity-90">
            <Link href={appRoutePaths.contact} className="leading-loose flex items-center gap-3">
              <span className="h-6 w-6 text-lg flex-shrink-0 grid place-items-center"><IoLocateOutline /></span> 35 Asheik Jarma, Jabi. Abuja
            </Link>
            <Link href={`mailto:anyagirlchildfoundation@gmail.com`} className="leading-loose flex items-center gap-3">
              <span className="h-6 w-6 text-lg flex-shrink-0 grid place-items-center"><LuMessageSquare /></span> anyagirlchildfoundation@gmail.com
            </Link>
            <Link href={`tel:08038859276`} className="leading-loose flex items-center gap-3">
              <span className="h-6 w-6 text-lg flex-shrink-0 grid place-items-center"><LuPhoneCall /></span> 08038859276
            </Link>
          </div>
        </aside>
        <aside className="flex flex-col sm:justify-center gap-4 xs:min-w-[10rem]">
          <h4 className='heading-three'>Quick Links</h4>
          <div className="flex flex-col text-base md:text-base opacity-90">
            <Link href={appRoutePaths.about} className="leading-loose">About Us</Link>
            <Link href={appRoutePaths.gallery} className="leading-loose">Gallery</Link>
            <Link href={appRoutePaths.blog} className="leading-loose">Blog</Link>
            {/* <Link href={appRoutePaths.contact} className="leading-loose">Contact</Link> */}
            <Link href={appRoutePaths.contact} className="leading-loose">Privacy Policy</Link>
            <Link href={appRoutePaths.contact} className="leading-loose">Terms &amp; Conditions</Link>
          </div>
        </aside>
      </div>
      <div className="container mx-auto relative z-20 flex flex-col md:flex-row gap-4 md:gap-8 justify-between items-center py-4 rounded-md">
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
