import React from 'react'
import { ASSET_URL } from '@/assets'
import PBBreadCrumb from '@/modules/public/pblayout/PBBreadCrumb'

export default function ContactPage() {
    return (
        <main className='flex flex-col gap-4'>
            <PBBreadCrumb image={ASSET_URL["donation_vanunload"]} />
        </main>
    )
}
