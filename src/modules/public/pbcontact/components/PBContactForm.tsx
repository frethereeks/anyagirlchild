"use client"

import { Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'

export default function PBContactForm() {
  const [form] = useForm<TContactProps>()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (data: TContactProps) => {
    setLoading(true)
    try {
      console.log('data', data)

    } catch (error) {

    }
    finally {
      setLoading(false)
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
