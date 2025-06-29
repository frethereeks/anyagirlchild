"use client"
import React, { useState } from 'react'
import { Flex, Layout, notification } from 'antd'
import Link from 'next/link'
import { LuChartNoAxesGantt } from 'react-icons/lu'
import { GrLogout } from "react-icons/gr";
import Footer from './Footer'
import { sideBarLinks } from '@/data/sideBarLinks'
import { appRoutePaths } from '@/routes/paths'
import { redirect, usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const { Content, Header, Sider } = Layout

export default function DashLayout({ children, image }: { children: React.ReactNode, image: React.ReactNode }) {
    const [openSideBar, setOpenSidebar] = useState<boolean>(true)
    const pathname = usePathname()
    const [loading, setLoading]= useState<boolean>(false)

    const siderStyle: React.CSSProperties = {
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: 'thin',
        scrollbarGutter: 'stable',
    };

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault()
        setLoading(true)
        try{
            notification.info({message: 'Trying to log you out...', key: "123"})
            await signOut({ callbackUrl: appRoutePaths.signin })
            redirect(appRoutePaths.home)
        }
        catch (error) {
            if (error instanceof Error) {
                notification.error({message: `Unable to perform the logout operation due to ${error.message}`, key: "123"})
            }
            else notification.error({message: 'Unable to perform the logout operation. Please, check your network and try again', key: "123"})
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <main className='flex flex-col bg-danger'>
            <Layout hasSider={openSideBar}>
                <Header
                    style={{
                        position: 'fixed',
                        top: 0,
                        padding: 0,
                        margin: 0,
                        zIndex: 100,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <div className="bg-white flex justify-between items-center gap-8 w-full pl-3 lg:pl-4 py-4">
                        <div className="flex lg:justify-center items-center flex-shrink-0 relative -mt-2">
                            <Link href={appRoutePaths.home} className='text-danger hover:text-danger text-lg md:text-xl -tracking-[.15rem] font-black font-grotesk leading-none uppercase'>Anyagirlchild <span className='bg-secondary text-white grid place-items-center text-xs w-max text-center tracking-[.22rem] lg:tracking-[.3rem] uppercase -my-1 lg:-my-1 pl-1.5 md:pl-2.5'>FOUNDATION</span></Link>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link href={appRoutePaths.adminsettings}>{image}</Link>
                            <button onClick={() => setOpenSidebar(prev => !prev)} className={`group py-2 px-2 bg-secondary hover:bg-secondary/80 text-white text-lg rounded-md ml-auto mx-4`}>
                                <LuChartNoAxesGantt className={`${openSideBar ? 'scale-100' : '-scale-100'}`} />
                            </button>
                        </div>
                    </div>
                </Header>
                <Layout style={{ marginInlineStart: openSideBar ? 0 : 200 }}>
                    <Sider
                        breakpoint={"xs"}
                        collapsible
                        trigger={null}
                        collapsedWidth={0}
                        theme={"light"}
                        collapsed={openSideBar}
                        style={siderStyle}
                        className='flex flex-col pt-20'
                    >

                        <div className='sticky top-0 left-0 h-[90vh] p-4 bg-white flex-1 flex flex-col justify-between gap-10 pb-8'>
                            <div className="flex-1 flex flex-col">
                                {
                                    sideBarLinks.map(el => (
                                        <Link key={el.id} href={el.link} className={`button ${pathname.includes(el.link) ? "text-danger bg-danger/10" : "bg-white text-text/80"} flex justify-start items-center gap-2 py-2`}>
                                            <span className="w-6 text-base">{el.icon}</span>
                                            <p className='text-sm'>{el.title}</p>
                                        </Link>
                                    ))
                                }
                            </div>
                            <button disabled={loading} onClick={handleLogout} className={`button bg-danger text-white text-sm flex items-center gap-2 py-1.5`}>
                            {loading ? <span className='animate-spin border-2 border-white border-r-transparent rounded-full h-5 w-5 grid place-items-center'></span> : <span className="w-6 text-base"><GrLogout /></span>}
                                <p className='text-sm'>Logout</p>
                            </button>
                        </div>
                    </Sider>
                    <Flex vertical className='w-full bg-[#f9f9f9]' style={{ paddingTop: 20 }}>
                        <Content style={{
                            margin: '14px 4px',
                            minHeight: 280,
                        }} className='bg-[#f9f9f9] rounded-lg py-4 px-2 mr-8 pt-14'>{children}</Content>
                    <Footer />
                    </Flex>
                </Layout>
            </Layout>
        </main>
    )
}
