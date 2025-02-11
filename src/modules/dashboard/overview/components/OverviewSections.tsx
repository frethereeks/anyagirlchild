import React from 'react'
import OverviewCard from './OverviewCard'
import { LuBriefcaseBusiness, LuTickets } from 'react-icons/lu'
import { GrGallery } from 'react-icons/gr'


export default function OverviewSections() {
    return (
        <section className="grid sm:flex flex-col sm:flex-row flex-wrap gap-4">
            <OverviewCard icon={<LuTickets />} title='Donations' value={30000} prefix='&#8358;' />
            <OverviewCard icon={<LuBriefcaseBusiness />} title='Blog Posts' value={8} />
            <OverviewCard icon={<GrGallery />} title='Gallery' value={20} />
        </section>
    )
}
