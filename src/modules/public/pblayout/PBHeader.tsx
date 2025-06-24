"use client"

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ASSET_URL } from '@/assets';
import { headerLinks } from '@/data';
import { appRoutePaths } from '@/routes/paths';

export default function PBHeader() {

  const [navShow, setNavShow] = useState(false);
  const [fixed, setFixed] = useState(false);
  const location = usePathname();
  const headerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.onscroll = () => {
        if (window.scrollY > 60) {
          setFixed(true)
        }
        else {
          setFixed(false)
        }
      }
    }
    return () => {
      setFixed(false);
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0)
      }
      setNavShow(false);
    }
  }, [])
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0)
    }
    setNavShow(false)
    //eslint-ignore-next-line
  }, [location])

  return (
    <header ref={headerRef} className={`${fixed ? "fixed backdrop-blur-sm" : "sticky"} font-grotesk flex flex-col py-2 px-4 w-full top-0 left-0 z-[990] ${fixed || navShow ? 'bg-white shadow-md shadow-primary/10' : 'bg-transparent'}`}>
      <div className="container w-full mx-auto flex flex-row gap-2 sm:gap-3 items-center sm:justify-between">
        <Link href="/" className="flex items-center py-2 gap-2 font-grotesk">
          <div className="h-7 w-7 flex justify-center items-center rounded-md overflow-hidden relative bg-backdrop flex-shrink-0">
            {/* <IoFileTrayStackedSharp key={82346} className="text-sm text-white" /> */}
            <Image src={ASSET_URL["anya_girlchild_logo"]} alt='AnyaGirlchild Logo' fill={true} className='object-cover flex-shrink-0' />
          </div>
          <div className="flex">
            <h1 className={`${fixed ? 'text-primary' : 'text-primary'} text-xl sm:text-2xl w-max font-bold uppercase tracking-tight flex items-center`}>Anya<p className={`tracking-normal text-danger`}>GirlChild</p></h1>
          </div>
        </Link>
        <nav className={`absolute z-[990] md:static flex-1 flex flex-col md:flex-row md:items-center top-full shadow-md transition-all duration-300 ${navShow ? 'left-0' : 'left-[100vw]'} w-screen md:w-max md:shadow-none bg-white md:bg-transparent mx-0`}>
          <ul className="list-none flex-1 flex flex-col md:flex-row md:items-center md:justify-center gap-0 md:gap-4 px-0">
            {headerLinks.map((item) => (
              <li key={item.id} className={`relative group flex`}>
                <div className={`relative flex items-center w-full cursor-pointer hover:bg-primary hover:text-slate-100 md:hover:text-slate-700 md:hover:bg-transparent`}>
                  <Link href={item.link} className={`flex w-full overflow-hidden relative md:w-max hover:before:transiton-all before:md:duration-300 before:md:absolute before:md:bottom-0 before:md:h-[2px] before:md:-rounded[2rem] before:md:bg-secondary before:md:w-0 before:md:-translate-x-1/2 ${item.link === location ? 'text-slate-700 md:before:left-1/2 md:before:w-[30%]' : 'hover:md:before:left-1/2 hover:md:before:w-[30%] text-slate-700 border-b-white'} ${fixed ? 'text-danger' : 'text-slate-700 border-b-white'} md:bg-transparent py-2 px-5 md:px-4 hover:bg-primary hover:text-slate-100 md:hover:text-slate-700 md:hover:bg-transparent text-sm font-semibold font-grotesk`}>{item.title}</Link>
                  {/* <FaCaretDown className={`group-hover:text-white md:group-hover:text-slate-700 relative z-50 p-1 text-[.86rem] cursor-pointer text-slate-600 mt-1 -mx-2`} size={20} /> */}
                </div>
              </li>
            ))}
          </ul>
          <Link href={appRoutePaths.donation} className="relative flex gap-2 items-center self-center md:rounded-md w-full md:w-max md:ml-auto px-5 md:px-7 py-2 h-max bg-secondary text-white text-sm font-semibold font-grotesk">Donate</Link>
        </nav>
        <aside className="relative z-50 ml-auto w-[4rem] sm:w-max md:w-max flex gap-2 items-center justify-end sm:pr-0">
          <div className="relative md:hidden flex gap-2 items-center md:p-1">
            <div className="relative py-2 px-1 cursor-pointer rounded-sm w-[35px] h-[20px] flex md:hidden items-center" onClick={() => setNavShow(prev => !prev)}>
              <div className={`relative h-[2px] w-full ${navShow ? 'bg-transparent' : 'bg-gray-300 rounded-lg'} ${navShow ? 'before:rotate-[40deg] before:-translate-y-[400%]' : 'before:rotate-0 before:-translate-y-[400%]'} before:transition-all before:duration-300 before:origin-top-left before:h-full before:w-full before:left-0 before:bg-gray-300 rounded-lg before:absolute before:z-10 ${navShow ? 'after:rotate-[-40deg] after:translate-y-[400%]' : 'after:rotate-0 after:translate-y-[400%]'} after:transition-all after:duration-300 after:origin-bottom-left after:h-full after:w-full after:right-0  after:bg-gray-300 rounded-lg after:absolute after:z-10`}></div>
            </div>
          </div>
        </aside>
      </div>
    </header>
  )
}
