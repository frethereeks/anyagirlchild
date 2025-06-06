import { fetchGalleryImages, fetchUser } from '@/app/action';
import GalleryContainer from '@/modules/dashboard/gallery/GalleryContainer'
import { DashBreadCrumb } from '@/modules/dashboard/layout'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Anya Girlchild :: Gallery",
    description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
};

export default async function AdminGalleryPage() {
    const user = await fetchUser()
    const res = await fetchGalleryImages()
    return (
        <>
            <DashBreadCrumb />
            <GalleryContainer data={res.data} role={user.role} key={"9234806234"} />
        </>
    )
}
