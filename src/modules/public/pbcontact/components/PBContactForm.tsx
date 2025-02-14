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
      onFinish={(values) => {
        handleSubmit(values)
      }}
      className='flex flex-col gap-4'
    >
      <Form.Item<TContactProps> name="fullname" noStyle>
        <Input type='text' className='capitalize' placeholder='Full Name e.g. Uche Daniel' required style={{ background: "transparent"}} />
      </Form.Item>
      <Form.Item<TContactProps> name="email" noStyle>
        <Input type='email' className='lowercase' placeholder='Email e.g. Uchedaniel@email.com' required style={{ background: "transparent"}} />
      </Form.Item>
      <Form.Item<TContactProps> name="message" noStyle>
        <TextArea className='lowercase' rows={5} placeholder='Full Name e.g. Uche Daniel' required style={{ background: "transparent"}} />
      </Form.Item>
      <button disabled={loading} type='submit' className='button bg-secondary'>{loading ? 'Processing...' : 'Send Message'}</button>
    </Form>
  )
}
