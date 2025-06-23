"use client"
import React from 'react'
import { ConfigProvider } from 'antd'
import { appThemeConfig } from '@/config/theme'
import { ClientProvider } from './ClientProvider'
import { App as AntdApp } from "antd"

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <ClientProvider>
            <AntdApp>
                <ConfigProvider theme={appThemeConfig}> {children} </ConfigProvider>
            </AntdApp>
        </ClientProvider>
    )
}
