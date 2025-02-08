'use client'

import React from 'react'
import Aos from 'aos'

// export default function AosProvider({ children }: DashLayoutProps) {
export default function AosProvider({ children }: { children: React.ReactNode }) {
    React.useEffect(() => {
        Aos.init({
            duration: 3000,
            once: true
        })
    }, [])
    return (
        <>
            {children}
        </>
    )
}
