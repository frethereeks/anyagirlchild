"use client"
import { createUser } from '@/app/action'
import { appRoutePaths } from '@/routes/paths'
import { TAuthProps } from '@/types'
import { Form, Input, notification } from 'antd'
// import { Rule } from 'antd/es/form'
import { useForm } from 'antd/es/form/Form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function PBSignupContainer() {
    const [form] = useForm<TAuthProps>()
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleSubmit = async (data: TAuthProps) => {
        const { password, confPassword } = data
        if (password !== confPassword) {
            notification.error({ message: `Passwords do NOT match`, key: "123" })
            return false;
        }
        setLoading(true)
        try {
            const formData = new FormData()
            Object.entries(data).map(([key, value]) => {
                formData.append(key, value)
            })
            const res = await createUser(formData)
            if (res?.error) {
                notification.error({ message: res?.message, key: "123" })
            }
            else {
                notification.success({ message: res?.message, key: "123" })
                router.replace(appRoutePaths.signin)
            }
        } catch (error) {
            console.log('error', error)
            notification.error({message: "Something went wrong. Please, check your internet connection and try again", key: "123"})
        }
        finally {
            setLoading(false)
        }
    }

    // const validatePass = (): Rule => ({
    //     required: true,
    //     validator: async (_, value: string) => {
    //         if (value === undefined) {
    //             throw new Error("Password cannot be empty")
    //         }
    //         if (/[A-Za-z\d!@#$%^&*()_+={};:'<>,./?]{8,}/.test(value)) {
    //             throw new Error("Password must be a combination of alphabets, at least one number, and a symbol")
    //         }
    //         return true
    //     },
    // })

    return (
        <aside className='flex-1 md:px-20 flex-col gap-8 p-4 py-10 md:py-40'>
            <Form
                form={form}
                onFinish={handleSubmit}
                className='flex flex-col gap-0'
            >
                <div className="flex flex-col gap-1 py-4">
                    <h4 className="text-text text-xl md:text-3xl font-semibold text-nowrap">Welcome to <span className="font-extrabold text-secondary">Anya GirlChild</span></h4>
                    <p className="text-sm md:text-base text-text">Fill out the form to get started.</p>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="firstname" className="w-full text-sm md:text-base text-text/70 font-medium">First Name:</label>
                    <Form.Item<TAuthProps> name="firstname" id="firstname">
                        <Input type='text' className='text-text/70 capitalize' placeholder='Uche' required style={{ background: "transparent" }} />
                    </Form.Item>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="lastname" className="w-full text-sm md:text-base text-text/70 font-medium">Last Name:</label>
                    <Form.Item<TAuthProps> name="lastname" id="lastname">
                        <Input type='text' className='text-text/70 capitalize' placeholder='Daniel' required style={{ background: "transparent" }} />
                    </Form.Item>
                </div>
                <div className="flex flex-col gap-1 -mt-3">
                    <label htmlFor="email" className="w-full text-sm md:text-base text-text/70 font-medium">Email:</label>
                    <Form.Item<TAuthProps> name="email" id="email">
                        <Input type='email' className='text-text/70 lowercase' placeholder='Uchedaniel@email.com' required style={{ background: "transparent" }} />
                    </Form.Item>
                </div>
                <div className="flex flex-col gap-1 -mt-3">
                    <label htmlFor="email" className="w-full text-sm md:text-base text-text/70 font-medium">Password:</label>
                    {/* <Form.Item<TAuthProps> name="password" id="password" rules={[validatePass()]}> */}
                    <Form.Item<TAuthProps> name="password" id="password">
                        <Input type='password' className='text-text/70 border border-background rounded-md' placeholder='********' minLength={8} required style={{ background: "transparent" }} />
                    </Form.Item>
                </div>
                <div className="flex flex-col gap-1 -mt-3">
                    <label htmlFor="email" className="w-full text-sm md:text-base text-text/70 font-medium">Confirm Password:</label>
                    <Form.Item<TAuthProps> name="confPassword" id="confPassword">
                        <Input type='password' className='text-text/70 border border-background rounded-md' placeholder='********' minLength={8} required style={{ background: "transparent" }} />
                    </Form.Item>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <Link href={appRoutePaths.signin} className='flex items-center  gap-1 text-text text-xs sm:text-sm font-medium'>Already have an account? <span className="font-bold text-secondary">Login</span></Link>
                    <button disabled={loading} type='submit' className='button bg-secondary'>{loading ? 'Processing...' : 'Get Started'}</button>
                </div>
                {/* <p className="text-xs md:text-sm text-text text-center pb-4">We&apos;ll get back to you in 1-2 business days</p> */}
            </Form>
        </aside>
    )
}