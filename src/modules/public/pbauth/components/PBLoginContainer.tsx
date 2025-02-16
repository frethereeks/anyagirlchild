"use client"
import React, { useState } from 'react'
import { appRoutePaths } from '@/routes/paths'
import { Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import Link from 'next/link'
import { IoArrowBackOutline, IoCaretBack } from 'react-icons/io5'
import { FaArrowLeft } from 'react-icons/fa6'
import { LuArrowLeft } from 'react-icons/lu'

export default function PBLoginContainer({ viewReset }: { viewReset: boolean}) {
    const [form] = useForm<TAuthProps>()
    const [resetForm] = useForm<TAuthProps>()
    const [showResetForm, setShowResetForm] = useState<boolean>(false)

    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async (data: TAuthProps) => {
        setLoading(true)
        try {
            console.log('data', data)

        } catch (error) {

        }
        finally {
            setLoading(false)
        }
        return false;
    }
   
    const handleResetSubmit = async (data: TAuthProps) => {
        setLoading(true)
        try {
            console.log('data', data)

        } catch (error) {

        }
        finally {
            setLoading(false)
        }
        return false;
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
                                <h4 className="text-text text-xl md:text-3xl font-semibold text-nowrap">Forgot your <span className="font-extrabold text-secondary">password</span>?</h4>
                                <p className="text-sm md:text-base text-text">Enter your email and we'll get you back on track.</p>
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
                                <h4 className="text-text text-xl md:text-3xl font-semibold text-nowrap">Welcome back</h4>
                                <p className="text-sm md:text-base text-text">Login to manage your account.</p>
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
                            <div className="flex flex-col sm:flex-row justify-between gap-4">
                                <Link href={appRoutePaths.signup} className='flex items-center gap-1.5 text-text text-xs sm:text-sm font-medium'>Don't have an account? <span className="font-bold text-secondary">Signup</span></Link>
                                <button disabled={loading} type='submit' className='button bg-secondary'>{loading ? 'Processing...' : 'Get Started'}</button>
                            </div>
                            {/* <p className="text-xs md:text-sm text-text text-center pb-4">We&apos;ll get back to you in 1-2 business days</p> */}
                        </Form>
                    </aside>
            }
        </main>
    )
}
