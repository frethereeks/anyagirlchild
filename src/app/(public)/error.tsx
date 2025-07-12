"use client"
import { appRoutePaths } from '@/routes/paths'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { FaChevronLeft } from 'react-icons/fa6'
import { IoSadOutline } from 'react-icons/io5'

export default function Error({ error }: { error: Error, reset: () => void }) {

    useEffect(() => {
        console.log('error', error)

    }, [error])

    return (
        <main className='grid place-items-center min-h-screen bg-white text-secondary p-4'>
            <div className="w-full max-w-3xl mx-auto flex flex-col gap-4 md:gap-8">
                <div className="flex flex-col justify-center gap-4 md:gap-8">
                    {/* <IoNotificationsCircleOutline className="text-5xl md:text-8xl text-secondary flex-shrink-0" /> */}
                    <IoSadOutline className="text-7xl text-primary/60 flex-shrink-0 mx-auto" />
                    <h2 className="text-primary/60 text-3xl md:text-5xl text-center font-bold font-grotesk">Hmmm. Something went wrong here...</h2>
                </div>
                <div className="text-center -translate-y-2">
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-xs sm:text-sm">The page you requested looks like it has been removed or does not exist.</p>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-xs sm:text-sm">Wait! It could also caused by a spelling error in the page name (if you typed the address).</p>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-xs sm:text-sm">If you are sure it is not any of these is not these reasons <Link href={appRoutePaths.contact} className='text-secondary underline'>contact us</Link>.</p>
                </div>
                {/* <button onClick={() => reset()} className='button bg-secondary'>Reset Error Boundary</button> */}
                <button className="flex justify-center items-center gap-2 w-max mx-auto rounded-md bg-transparent hover:bg-backdrop py-2 px-4">
                    <FaChevronLeft className="text-secondary text-xs md:text-sm" />
                    <Link href={appRoutePaths.home} className='text-sm md:text-base text-secondary text-center'>Back to Home Page</Link>
                </button>
            </div>
        </main>
    )
}
