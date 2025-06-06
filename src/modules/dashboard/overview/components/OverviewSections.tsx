import React from 'react'
import OverviewCard from './OverviewCard'
import { LuBriefcaseBusiness, LuTickets } from 'react-icons/lu'
import { GrGallery } from 'react-icons/gr'


export default function OverviewSections({totalDonation, totalGallery, totalBlog} : {totalDonation: number, totalGallery: number, totalBlog: number}) {
    return (
        <section className="grid sm:flex flex-col sm:flex-row flex-wrap gap-4">
            <OverviewCard icon={<LuTickets />} title='Donations' value={totalDonation ?? 0} prefix='&#8358;' />
            <OverviewCard icon={<LuBriefcaseBusiness />} title='Blog Posts' value={totalBlog ?? 0} />
            <OverviewCard icon={<GrGallery />} title='Gallery' value={totalGallery ?? 20} />
        </section>
    )
}
