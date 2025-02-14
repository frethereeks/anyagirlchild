import GalleryContainer from '@/modules/dashboard/gallery/GalleryContainer'
import { DashBreadCrumb } from '@/modules/dashboard/layout'
import React from 'react'

export default function AdminGalleryPage() {
    return (
        <>
            <DashBreadCrumb />
            <GalleryContainer />
        </>
    )
}
