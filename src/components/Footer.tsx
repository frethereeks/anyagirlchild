import { edimcs_calculator } from '@/assets'
import { footerLinks } from '@/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="pt-20 px-4 flex flex-col relative after-overlay after:bg-slate-900/95">
      <Image src={edimcs_calculator} alt='Edimcs Money Calculator Image' fill={true} className="overlay left-0 top-0 object-cover" />
      <div className="container mx-auto py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 justify-center gap-4 relative z-20">
        {footerLinks.slice(0, 3).map((footer, i) => (
          <aside key={footer.id} className={`flex flex-col gap-3 ${i === 0 ? 'col-span-3 sm:col-span-1' : 'col-span-1 sm:pl-5 sm:ml-7'}`}>
            <h2 className="text-slate-300 font-bold text-base sm:text-xl md:text-2xl">{footer.title}</h2>
            {i === 0 ? <p className="text-xs md:text-sm font-light leading-loose text-slate-400 text-justify">{footer.label}</p> : ""}
            <div className="flex flex-col gap-2 py-2">
              {
                footer?.sublinks?.map(sublink => (
                  <Link href={sublink.url} key={sublink.id} className="text-xs sm:text-sm flex gap-1 items-center text-slate-400 hover:text-slate-200">{sublink.icon} <span>{sublink.title}</span></Link>
                ))
              }
            </div>
          </aside>
        ))}
      </div>
      <div className="container mx-auto pb-4 mb-4 flex justify-center sm:justify-between gap-2 sm:gap-4 flex-wrap relative z-20">
        {/* <div className="py-2"> */}
        <small className="text-slate-400">&copy; Copyright. {new Date().getFullYear()} EDIMCS. All Rights Reserved.</small>
        <div className="flex gap-4 w-max">
          <Link href={"/privacy-policy"} className="text-xs sm:text-sm flex gap-1 items-center text-slate-400 hover:text-slate-200">Privacy Policy</Link>
          <Link href={"/sitemap.xml"} className="text-xs sm:text-sm flex gap-1 items-center text-slate-400 hover:text-slate-200">Sitemap</Link>
        </div>
        {/* </div> */}
      </div>
    </footer>
  )
}
