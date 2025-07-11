"use client"
import React, { useEffect, useState } from 'react'
import { appRoutePaths } from '@/routes/paths'
import { App, Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import Link from 'next/link'
import { IoCaretBack } from 'react-icons/io5'
import { TAuthProps } from '@/types'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { handleReset } from '@/app/action'
import { GrUserAdmin } from 'react-icons/gr'

export default function PBLoginContainer({ viewReset }: { viewReset: boolean }) {
    const [form] = useForm<TAuthProps>()
    const [resetForm] = useForm<TAuthProps>()
    const [showResetForm, setShowResetForm] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const { status } = useSession()
    const {notification} = App.useApp()

    useEffect(() => {
        if (status === "authenticated") {
            router.refresh()
            router.push(appRoutePaths.admindashboard, { scroll: false })
        }
        //eslint-disable-next-line
    }, [status])

    const handleSubmit = async (data: TAuthProps) => {
        setLoading(true)
        notification.info({ message: `Please wait while we attempt to log you in`, key: "123" })
        try {
            const res = await signIn('credentials', { email: data.email, password: data.password, redirect: false, callbackUrl: appRoutePaths.admindashboard})
            // const res = await signIn('credentials', { email: data.email, password: data.password, redirect: false, callbackUrl: appRoutePaths.admindashboard })
            if (res?.ok) {
                notification.success({ message: `Welcome Back Esteem User.\nYou will be redirected in a few seconds`, key: "123" })
                router.refresh()
            }
            else {
                if (res?.error === "CredentialsSignin") notification.error({ message: "Invalid credentials supplied, please, try again", key: "123" })
                else if (res?.error?.includes("prisma")) {
                    notification.error({ message: 'Sorry, we are currently unable not reach the database. Please, check your network and try again', key: "123" })
                }
                else {
                    notification.error({ message: 'Unable to complete request, please, check your network and try again', key: "123" })
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                notification.error({ message: 'Something went wrong. ' + error.message, key: "123" })
            }
            else {
                notification.error({ message: 'Unable to complete request, please, check your network and try again', key: "123" })
            }
        } finally {
            setLoading(false)
        }
    }


    const handleResetSubmit = async (data: TAuthProps) => {
        notification.info({ message: 'Please wait while we send a reset link to your email', key: "123" })
        setLoading(true)
        try {
            // const email = resetEmailRef?.current?.value as string
            const res = await handleReset(data.email)
            if (res?.error) notification.error({ message: res.message, key: "123" })
            else {
                notification.success({ message: res.message, key: "123" })
                router.refresh()
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log('error', error)
                notification.error({ message: 'Something went wrong. '+ error.message, key: "123" })
            }
            else {
                notification.error({ message: 'Unable to complete request, please, check your network and try again', key: "123" })
            }
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <main className='flex flex-col p-4 py-10 md:py-40'>
            {
                showResetForm || viewReset ?
                    <aside className='flex-1 md:px-20 flex flex-col gap-8'>
                        <Form
                            form={resetForm}
                            onFinish={handleResetSubmit}
                            className='flex flex-col gap-4 p-4'
                        >
                            <div className="flex flex-col gap-1 py-4">
                                <h4 className="text-text text-xl md:text-3xl font-semibold font-grotesk text-nowrap">Forgot your <span className="font-extrabold text-secondary">password</span>?</h4>
                                <p className="text-sm md:text-base text-text">Enter your email and we&apos;ll get you back on track.</p>
                            </div>
                            <div className="flex flex-col gap-1 pt-5">
                                <label htmlFor="reset-email" className="w-full text-sm md:text-base text-text/70 font-medium">Email address:</label>
                                <Form.Item<TAuthProps> name="email" id="reset-email" noStyle>
                                    <Input type='email' className='lowercase' placeholder='Enter your account email here' required style={{ background: "transparent" }} />
                                </Form.Item>
                            </div>
                            <div className="flex justify-between gap-4">
                                <p onClick={() => setShowResetForm(false)} className='button text-secondary text-left flex items-center gap-1.5'><IoCaretBack /> Back to sign in</p>
                                <button disabled={loading} type='submit' className='button bg-secondary'>{loading ? 'Processing...' : 'Reset Password'}</button>
                            </div>
                            {/* <p className="text-xs md:text-sm text-text text-center pb-4">We&apos;ll get back to you in 1-2 business days</p> */}
                        </Form>
                    </aside>
                    :
                    <aside className='flex-1 md:px-20 flex flex-col gap-8'>
                        <Form
                            form={form}
                            onFinish={handleSubmit}
                            className='flex flex-col gap-4 p-4'
                        >
                            <div className="flex flex-col gap-1 py-4">
                                <h4 className="text-text text-xl md:text-3xl font-semibold font-grotesk text-nowrap">Welcome back</h4>
                                <p className="text-sm md:text-base text-text font-grotesk">Login to manage your account.</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="email" className="w-full text-sm md:text-base text-text/70 font-medium">Email address:</label>
                                <Form.Item<TAuthProps> name="email" id="email" noStyle>
                                    <Input type='email' className='lowercase border border-background rounded-md' placeholder='Email e.g. Uchedaniel@email.com' required style={{ background: "transparent" }} />
                                </Form.Item>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between gap-2">
                                    <label htmlFor="password" className="w-full text-sm md:text-base text-text/70 font-medium">Password:</label>
                                    <p onClick={() => setShowResetForm(true)} className='flex gap-2 items-center cursor-pointer text-text text-xs text-nowrap font-medium border-b-[1.5px] border-dotted border-slate-400'>Forgot Password</p>
                                </div>
                                <Form.Item<TAuthProps> name="password" id="password" noStyle>
                                    <Input type='password' className='border border-background rounded-md' placeholder='********' minLength={8} required style={{ background: "transparent" }} />
                                </Form.Item>
                            </div>
                            <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
                                <Link href={appRoutePaths.signup} className='flex items-center gap-1.5 text-text text-xs font-medium'>Don&apos;t have an account? <span className="font-bold text-secondary">Signup</span></Link>
                                <button disabled={loading} type='submit' className='button flex items-center gap-2 w-max bg-secondary'>
                                    {loading ? <span className='animate-spin border-2 border-white border-r-transparent rounded-full h-5 w-5 grid place-items-center'></span> : <GrUserAdmin />}
                                    {loading ? 'Processing...' : 'Login'}
                                </button>
                            </div>
                        </Form>
                    </aside>
            }
        </main>
    )
}
