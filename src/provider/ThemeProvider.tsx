"use client"
import React from 'react'
import { ConfigProvider } from 'antd'
import { appThemeConfig } from '@/config/theme'
import { ClientProvider } from './ClientProvider'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <ClientProvider>
            <ConfigProvider theme={appThemeConfig}> {children} </ConfigProvider>
        </ClientProvider>
    )
}
