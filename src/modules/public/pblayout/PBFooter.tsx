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
    <footer className="flex flex-col">
      <section className="relative bg-slate-100 text-white">
        {/* <Image src={ASSET_URL['donation_personnel']} alt='donation_personnel' className='object-cover object-center opacity-80' fill /> */}
        <div className="relative max-w-screen-lg mx-auto flex flex-col sm:flex-row items-center gap-4 py-10 px-4">
          <div className="flex-1 flex flex-col text-center sm:text-left">
            {/* <h4 className="text-lg md:text-xl font-semibold font-grotesk">Join our global family of advocates, volunteers, and supporters.</h4> */}
            <h4 className="text-xl md:text-2xl text-secondary font-semibold font-grotesk">Be the Change. Start Today.</h4>
            <p className="text-small md:text-lg text-primary/70 leading-loose">Join our global family of advocates, volunteers, and supporters.</p>
          </div>
          <Link href={appRoutePaths.partner} className='bg-danger text-sm md:text-base text-white hover:text-white font-semibold font-grotesk cursor-pointer rounded-md py-2 px-6 md:px-8'>Become a Partner</Link>
        </div>
      </section>
      <section className='relative bg-primary pt-10 pb-4 px-4'>
        <Image src={ASSET_URL['adult_intervention']} alt='adult_intervention' className='object-cover object-top opacity-75' fill />
        <div className="overlay bg-primary z-10 shadow-none opacity-70 backdrop-blur-sm"></div>
        <div className="container mx-auto relative z-20 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 py-10 rounded-md text-white">
          <aside className="flex flex-col sm:justify-center gap-4 w-full col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center py-2 gap-2">
              <div className="w-14 min-h-14 flex justify-center items-center rounded-md overflow-hidden relative bg-backdrop flex-shrink-0">
                {/* <IoFileTrayStackedSharp key={82346} className="text-sm text-white" /> */}
                <Image src={ASSET_URL["anya_girlchild_logo"]} alt='AnyaGirlchild Logo' fill={true} className='object-cover flex-shrink-0' />
              </div>
              <div className="flex flex-col justify-center w-max -translate-y-1">
                <h1 className={`text-white text-3xl sm:text-3xl w-max font-bold font-grotesk uppercase tracking-tight flex items-center`}>Anya<p className={`tracking-normal text-danger`}>GirlChild</p></h1>
                <p className="text-lg text-text text-center font-semibold tracking-[.5rem] leading-none uppercase w-full py-0.5 px-3 whitespace-pre-wrap bg-white">Foundation</p>
              </div>
            </Link>
            <p className="text-sm lg:text-base text-white font-medium py-1.5">Empowering underprivileged girls through education, mentorship, and holistic development.</p>
          </aside>
          <aside className="flex flex-col sm:justify-center gap-4">
            <h4 className='heading-three'>Contact</h4>
            <div className="flex flex-col gap-3 text-base md:text-base opacity-90">
              <Link href={appRoutePaths.contact} className="leading-loose text-white flex items-center gap-3">
                <span className="h-6 w-6 text-lg flex-shrink-0 grid place-items-center"><IoLocateOutline /></span> 35 Asheik Jarma, Jabi. Abuja
              </Link>
              <Link href={`mailto: info@anyagirlchild.com`} className="leading-loose text-white flex items-center gap-3">
                <span className="h-6 w-6 text-lg flex-shrink-0 grid place-items-center"><LuMessageSquare /></span> info@anyagirlchild.com
              </Link>
              <Link href={`tel:08038859276`} className="leading-loose text-white flex items-center gap-3">
                <span className="h-6 w-6 text-lg flex-shrink-0 grid place-items-center"><LuPhoneCall /></span> 08038859276
              </Link>
            </div>
          </aside>
          <aside className="flex flex-col sm:justify-center gap-4 xs:min-w-[10rem]">
            <h4 className='heading-three'>Quick Links</h4>
            <div className="flex flex-col text-base md:text-base opacity-90">
              <Link href={appRoutePaths.about} className="leading-loose text-white">About Us</Link>
              <Link href={appRoutePaths.gallery} className="leading-loose text-white">Gallery</Link>
              <Link href={appRoutePaths.blog} className="leading-loose text-white">Blog</Link>
              {/* <Link href={appRoutePaths.contact} className="leading-loose text-white">Contact</Link> */}
              <Link href={appRoutePaths.privacyPolicy} className="leading-loose text-white">Privacy Policy</Link>
              <Link href={appRoutePaths.termsAndConditions} className="leading-loose text-white">Terms &amp; Conditions</Link>
              <Link href={appRoutePaths.sitemap} className="leading-loose text-white">Sitemap</Link>
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
      </section>
    </footer>
  )
}
