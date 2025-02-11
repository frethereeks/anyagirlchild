"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { appRoutePaths } from '@/routes/paths'
import { IoCaretForward } from 'react-icons/io5'
export default function DashBreadCrumb() {
    const location = usePathname()

    return (
        <section className='flex items-center gap-4 p-4 pt-0'>
            <Link href={appRoutePaths.admindashboard} className='text-xs text-text font-semibold'>Dashboard</Link>
            <IoCaretForward />
            <p className='text-xs text-text opacity-80 capitalize'>{location.split("/").slice(-1)}</p>
        </section>
    )
}
