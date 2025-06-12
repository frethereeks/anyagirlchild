"use client"
import { createDonation } from '@/app/action'
import { ASSET_URL } from '@/assets'
import { config } from '@/config'
import { TDonationProps } from '@/types'
import { Form, Input, InputNumber, notification } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { usePaystackPayment } from 'react-paystack';
import { PaystackProps } from 'react-paystack/dist/types'

type TDonationData = Pick<TDonationProps, "id" | "fullname" | "email" | "amount" | "currency" | "message" | "reference" | "status">

type TReferenceProps = {
  reference: string;
  trans: string;
  status: string;
  message: string;
  transaction: string;
  trxref: string;
  redirecturl: string;
}

export default function PBDonationContainer() {
  const [form] = useForm<TDonationData>()
  const [loading, setLoading] = useState<boolean>(false)
  const currencyRef = useRef<HTMLSelectElement | null>(null)
  const router = useRouter()
  const [inputs, setInputs] = useState<TDonationData>({ id: "", fullname: "", email: "", amount: 0, currency: "", message: "", reference: "", status: "success" })
  const inputRef = useRef(inputs)

  // useEffect(() => {
  //   inputRef.current = inputs
  // }, [inputs])

  const configData: PaystackProps = {
    reference: 'AGCF' + (new Date()).getTime().toString(),
    email: inputs?.email || "",
    currency: "USD",
    amount: +(inputs?.amount || 0) * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: config.NEXT_PUBLIC_PAYSTACK_PKEY,
    label: `A donation from ${inputs?.fullname || ""} worth ${inputs?.currency || ""}${inputs?.amount || 0}`,
    metadata: {
      custom_fields: [
        { display_name: "Anyagirlchild Foundation", value: 0, variable_name: "AnyaGirlChild NGO" }
      ]
    }
  };

  // const initializePayment = usePaystackPayment(configData);
  const initializePayment = usePaystackPayment(configData);

  const onSuccess = async (reference: TReferenceProps) => {
    setLoading(true)
    notification.info({ message: `Please wait while your request is being processed...`, key: "123" })
    const updatedInputs = { ...inputRef.current, reference: reference.reference, status: reference.status } as TDonationData

    const formData = new FormData()
    Object.entries(updatedInputs!).map(([key, value]) => {
      formData.append(key, value as string)
    })

    try {
      const res = await createDonation(formData)
      console.log({ message: res.message })
      if (res?.error) notification.error({ message: res?.message, key: "123" })
      else {
        notification.success({ message: res?.message, key: "123" })
        router.refresh()
        form.resetFields()
      }
    } catch (error) {
      notification.error({ message: `Something went wrong. Please check your internet connection and try again.`, key: "123" })
    } finally {
      setLoading(false)
    }
  };

  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    notification.error({ message: "Payment has been cancelled", key: "123" })
    setLoading(false)
  }

  const handleSubmit = async (values: TDonationData) => {

    try {
      const newInputs = { ...values, currency: currencyRef?.current?.value as string }
      setInputs(newInputs)
      inputRef.current = newInputs;

      initializePayment({
        onSuccess, onClose, config: {
          ...newInputs,
          channels: ["card", "qr", "bank_transfer"],
          currency: newInputs.currency,
          amount: newInputs.amount * 100,
          firstname: values.fullname.split(" ")[0],
          lastname: values.fullname.split(" ")[1],
          phone: "081660xxxxx",
          label: "Anyagirlchild Foundation",
        }
      })
    } catch (error) {
      console.log({ error })
      notification.error({ message: `Something went wrong. Please check your internet connection and try again.`, key: "123" })
    }
  }

  // <main className='flex flex-col md:flex-row gap-4 lg:gap-8 md:h-full'>
  //   <section className="container mx-auto flex flex-col lg:flex-row gap-4 md:h-full">
  //     <aside className="p-4 flex-1 hidden lg:flex flex-col gap-8 w-full lg:max-w-[40rem] py-40 relative bg-primary">
  //       <Image src={ASSET_URL["group_donation"]} alt='group_donation' className='object-cover object-top opacity-45' fill />
  //     </aside>
  //     {/* <PBDonationContainer /> */}
  //   </section>
  // </main>

  return (
    <>
      <aside className='flex-1 md:px-20 flex-col gap-8 p-4 py-10 md:py-40'>
        <Form
          form={form}
          onFinish={handleSubmit}
          className='flex flex-col gap-0'
        >
          <div className="flex flex-col gap-1 py-4">
            <h4 className="text-text text-3xl md:text-3xl font-semibold">Any giver is a <span className="font-extrabold text-secondary">Saver!</span></h4>
            <p className="text-sm md:text-base text-text">Thank you for this act of kindness and generosity.</p>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="fullname" className="w-full text-sm md:text-base text-text/70 font-medium">Fullname:</label>
            <Form.Item<TDonationData> name="fullname" id="fullname">
              <Input type='text' className='text-text/70 capitalize' placeholder='Jonathan Daniel' required style={{ background: "transparent" }} />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-1 -mt-3">
            <label htmlFor="email" className="w-full text-sm md:text-base text-text/70 font-medium">Email:</label>
            <Form.Item<TDonationData> name="email" id="email">
              <Input type='email' className='text-text/70 w-full' placeholder='Emails (send success notification to the sender)' min={1000} required style={{ background: "transparent", width: "100%" }} />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-1 -mt-3">
            <label htmlFor="amount" className="w-full text-sm md:text-base text-text/70 font-medium">Amount:</label>
            <div className="flex gap-1">
              <Form.Item<TDonationData> name="currency" id="currency">
                <select ref={currencyRef} name="status" id="status" className="border border-text/50 rounded-md text-xs text-text w-max py-2 px-4 bg-white">
                  {
                    [
                      { id: "x023498zse420", name: "NGN", code: "&#8358;", symbol: "₦" },
                      // { id: "x023498zse421", name: "GBP",  code: "&#163;", symbol: "£" },
                      // { id: "x023498zse422", name: "EUR", code: "&#8364;", symbol: "€" },
                      { id: "x023498zse423", name: "USD", code: "&#36;", symbol: "$" },
                    ].map(({ id, name, symbol }) => (
                      <option key={id} value={name} className="text-sm md:text-lg text-text font-semibold bg-white px-4">{symbol}</option>
                    ))
                  }
                </select>
              </Form.Item>
              <Form.Item<TDonationData> name="amount" id="amount" className='flex-1'>
                <InputNumber type='number' className='text-text/70 w-full' placeholder='Starting from 1000' min={100} required style={{ background: "transparent", width: "100%" }} />
              </Form.Item>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="w-full text-sm md:text-base text-text/70 font-medium">Purpose (Optional):</label>
            <Form.Item<TDonationData> name="message" id="message" noStyle>
              <TextArea className='' rows={5} placeholder='Not mandatory but if you have a specific purpose you prefer the donation channeled into. Feel free to state it. Thanks.' required style={{ background: "transparent" }} />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-4 pt-4">
            <button disabled={loading} type='submit' className='button bg-secondary'>{loading ? 'Processing...' : 'Donate'}</button>
          </div>
          <div className="flex flex-col gap-1 p-2 pt-4">
            <p className="text-xs md:text-sm text-text text-center">Secure with</p>
            <div className="flex items-center justify-center gap-2">
              <div className="relative h-6 w-[40px]">
                <Image src={ASSET_URL['payment_key'].src} alt="payment_key" className="w-full" fill />
              </div>
              <div className="relative h-6 w-[40px]">
                <Image src={ASSET_URL['payment_master_card'].src} alt="payment_master_card" className="w-full" fill />
              </div>
              <div className="relative h-6 w-[50px]">
                <Image src={ASSET_URL['payment_secure'].src} alt="payment_secure" className="w-full" fill />
              </div>
            </div>
          </div>
        </Form>
      </aside>
    </>
  )
}


