import React from 'react'
import OverviewCard from './OverviewCard'
import { LuBriefcaseBusiness, LuGalleryVertical, LuTickets } from 'react-icons/lu'


export default function OverviewSections() {
    return (
        <section className="grid grid-cols-2 sm:flex flex-col sm:flex-row flex-wrap gap-4">
            <OverviewCard icon={<LuTickets />} title='Donations' value={30000} prefix='&#8358;' />
            <OverviewCard icon={<LuBriefcaseBusiness />} title='Blog Posts' value={8} />
            <OverviewCard icon={<LuGalleryVertical />} title='Gallery' value={20} />
        </section>
    )
}
