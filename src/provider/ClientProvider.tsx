'use client'

import { SessionProvider } from "next-auth/react"

export const ClientProvider = ({ children }: { children?: React.ReactNode }) => {
    return <SessionProvider>{children}</SessionProvider>
}