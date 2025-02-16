"use client"
import { Form, Input, InputNumber } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function PBDonationContainer() {
  const [form] = useForm<TDonationProps>()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (data: TDonationProps) => {
    const { fullname, amount, purpose } = data
    setLoading(true)
    toast.loading(`Processing your request. Please wait...`, {id: "123"})
    try {
      console.log('data', { fullname, amount, purpose })
      toast.success(`Your donation of $${amount} was successful`, {id: "123"})
      form.resetFields()
    } catch (error) {

    }
    finally {
      setLoading(false)
    }
    return false;
  }


  return (
    <aside className='flex-1 md:px-20 flex-col gap-8 p-4 py-10 md:py-40'>
      <Form
        form={form}
        onFinish={handleSubmit}
        className='flex flex-col gap-0'
      >
        <div className="flex flex-col gap-1 py-4">
          <h4 className="text-text text-xl md:text-3xl font-semibold">Any giver is a <span className="font-extrabold text-secondary">Saver!</span></h4>
          <p className="text-sm md:text-base text-text">Thank you for this act of kindness and generosity.</p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="fullname" className="w-full text-sm md:text-base text-text/70 font-medium">Fullname:</label>
          <Form.Item<TDonationProps> name="fullname" id="fullname">
            <Input type='text' className='text-text/70 capitalize' placeholder='Jonathan Daniel' required style={{ background: "transparent" }} />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-1 -mt-3">
          <label htmlFor="amount" className="w-full text-sm md:text-base text-text/70 font-medium">Amount:</label>
          <Form.Item<TDonationProps> name="amount" id="amount">
            <InputNumber type='number' className='text-text/70 lowercase' placeholder='Starting from 1000' min={1000} required style={{ background: "transparent" }} />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="message" className="w-full text-sm md:text-base text-text/70 font-medium">Purpose (Optional):</label>
          <Form.Item<TDonationProps> name="purpose" id="purpose" noStyle>
            <TextArea className='' rows={5} placeholder='Not mandatory but if you have a specific purpose you prefer the donation channeled into. Feel free to state it. Thanks.' required style={{ background: "transparent" }} />
          </Form.Item>
        </div>
        <div className="flex flex-col gap-4">
          <button disabled={loading} type='submit' className='button bg-secondary'>{loading ? 'Processing...' : 'Donate'}</button>
        </div>
        {/* <p className="text-xs md:text-sm text-text text-center pb-4">We&apos;ll get back to you in 1-2 business days</p> */}
      </Form>
    </aside>
  )
}