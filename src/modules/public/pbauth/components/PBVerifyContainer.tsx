"use client"
import React, { useState } from 'react'
import { appRoutePaths } from '@/routes/paths'
import { Form, Input, notification } from 'antd'
import { useForm } from 'antd/es/form/Form'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa6'
import { TAuthProps } from '@/types'
import { useRouter } from 'next/navigation'
import { handlePasswordReset } from '@/app/action'

type TPageProps = {
  data: {
    id: string;
    fullname: string;
    email: string;
  } | undefined
}

export default function PBVerifyContainer({ data }: TPageProps) {
  const [form] = useForm<TAuthProps>()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()


  const handleSubmit = async (data: TAuthProps) => {
    notification.info({ message: 'Please wait while we send a reset link to your email', key: "123" })
    setLoading(true)
    try {
      // const email = resetEmailRef?.current?.value as string
      const res = await handlePasswordReset({ email: data.email, password: data.password })
      if (res?.error) notification.error({ message: res.message, key: "123" })
      else {
        notification.success({ message: res.message, key: "123" })
        router.refresh()
      }
    } catch (error) {
      notification.error({ message: 'Unable to complete request, please, check your network and try again', key: "123" })
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <main className='flex flex-col p-4'>
      <aside className='flex-1 md:px-20 flex flex-col gap-8 py-10 md:py-40'>
        <Form
          form={form}
          onFinish={handleSubmit}
          className='flex flex-col gap-4 p-4'
        >
          <div className="flex flex-col gap-1 py-4">
            <h4 className="text-text text-lg md:text-xl font-bold text-nowrap">You are almost done, <span className="text-secondary">{data?.fullname}</span></h4>
            <p className="text-sm md:text-base text-text">Enter a new password for your Account.</p>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="w-full text-sm md:text-base text-text/70 font-medium">Password:</label>
            <Form.Item<TAuthProps> name="password" id="password" noStyle>
              <Input type='password' className='border border-background rounded-md' placeholder='********' minLength={8} required style={{ background: "transparent" }} />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confPassword" className="w-full text-sm md:text-base text-text/70 font-medium">Confirm Password:</label>
            <Form.Item<TAuthProps> name="confPassword" id="confPassword" noStyle>
              <Input type='password' className='border border-background rounded-md' placeholder='********' minLength={8} required style={{ background: "transparent" }} />
            </Form.Item>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Link href={appRoutePaths.signin} className='flex items-center  gap-1 text-text text-xs sm:text-sm font-medium'>Think you are here by error? <span className="font-bold text-secondary">Login</span></Link>
            <button disabled={loading} type='submit' className='button py-1.5 px-4 bg-secondary'>{loading ? 'Processing...' : 'Save'}</button>
          </div>
        </Form>
      </aside>
    </main>
  )
}
