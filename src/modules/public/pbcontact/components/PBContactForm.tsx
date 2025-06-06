"use client"

import { createContact } from '@/app/action'
import { TContactProps } from '@/types'
import { Form, Input, notification } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function PBContactForm() {
  const [form] = useForm<TContactProps>()
  const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

  const handleSubmit = async (data: TContactProps) => {
    setLoading(true)
    notification.info({ message: 'Sending message...', key: "123" })
    try {
      const formData = new FormData()
      Object.entries(data).map(([key, value]) => {
        formData.append(key, value as unknown as string)
      })
      const res = await createContact(formData)
      if (res?.error) {
        notification.error({ message: res?.message, key: "123" })
      }
      else {
        notification.success({ message: res?.message, key: "123" })
        router.refresh()
        form.resetFields()
      }
    } catch (error) {
      notification.error({ message: 'Unable to send message. Please, check your internet connection and try again', key: "123" })
    }
    finally {
      setLoading(false)
      router.refresh()
    }
  }

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      className='flex flex-col gap-4'
    >
      <div className="flex flex-col gap-1 py-4">
        <h4 className="text-secondary text-xl md:text-3xl text-center font-bold">Tell us about yourself</h4>
        <p className="text-sm md:text-base text-text text-center">Whether you have questions or you would just like to say hello, contact us.</p>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="fullname" className="w-full text-sm md:text-base text-text/70 font-medium">Fullname:</label>
        <Form.Item<TContactProps> name="fullname" id="fullname" noStyle>
          <Input type='text' className='capitalize' placeholder='Full Name e.g. Uche Daniel' required style={{ background: "transparent" }} />
        </Form.Item>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="w-full text-sm md:text-base text-text/70 font-medium">Email:</label>
        <Form.Item<TContactProps> name="email" id="email" noStyle>
          <Input type='email' className='lowercase' placeholder='Email e.g. Uchedaniel@email.com' required style={{ background: "transparent" }} />
        </Form.Item>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="w-full text-sm md:text-base text-text/70 font-medium">Message:</label>
        <Form.Item<TContactProps> name="message" id="message" noStyle>
          <TextArea className='' rows={5} placeholder='Message for us' required style={{ background: "transparent" }} />
        </Form.Item>
      </div>
      <button disabled={loading} type='submit' className='button bg-secondary'>{loading ? 'Processing...' : 'Send Message'}</button>
      {/* <p className="text-xs md:text-sm text-text text-center pb-4">We&apos;ll get back to you in 1-2 business days</p> */}
    </Form>
  )
}
