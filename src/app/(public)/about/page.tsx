import React from 'react'
import { ASSET_URL } from '@/assets'
import PBBreadCrumb from '@/modules/public/pblayout/PBBreadCrumb'
import PBAboutContainer from '@/modules/public/pbabout/PBAboutContainer'

export default function AboutPage() {
    return (
        <main className='flex flex-col gap-4'>
            <PBBreadCrumb image={ASSET_URL["donation_personnel"]} />
            <PBAboutContainer />
        </main>
    )
}
