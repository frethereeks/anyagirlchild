"use client"
import { createDonation } from '@/app/action'
import { ASSET_URL } from '@/assets'
import { config } from '@/config'
import { TDonationProps } from '@/types'
import { Form, Input, InputNumber, App, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
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
  const { notification } = App.useApp();
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
    publicKey: config.PAYSTACK.PUBLIC_KEY,
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
    console.log({reference})
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
      if (error instanceof Error) {
        notification.error({ message: `We encountered an error. ${error?.message}. Please try again.`, key: "123" })
      }
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
          <div className="flex flex-col gap-1 py-4 pb-8">




            {/* 🔒 Safe & Secure: Your information is safe with us. We will never share your details with third parties without your consent. See our [Privacy Policy] for more information.
            💯 Transparency Guaranteed: 100% of your donation goes directly to supporting our programs and projects for the welfare of the girl child.
            📌 Note: Donations made are voluntary and non-refundable.
            Thank you for standing with us to give the girl child a better shot at life.
            For any questions about donations, please contact: */}

            <h4 className="text-text text-3xl md:text-3xl font-semibold font-grotesk">Donate to empower a <span className="font-bold text-secondary">Girl’s Future</span></h4>
            <p className="text-sm md:text-base text-text">Your support—no matter the size—helps us provide education, health support, and life-changing opportunities for girls in vulnerable communities.</p>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="fullname" className="w-full text-sm md:text-base text-text/70 font-medium font-grotesk">Fullname:</label>
            <Form.Item<TDonationData> name="fullname" id="fullname" rules={[{required: true, message: 'Full name is required'}]}>
              <Input type='text' className='text-text/70 capitalize' placeholder='Jonathan Daniel' style={{ background: "transparent" }} />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-1 -mt-3">
            <label htmlFor="email" className="w-full text-sm md:text-base text-text/70 font-medium font-grotesk">Email:</label>
            <Form.Item<TDonationData> name="email" id="email" rules={[{required: true, message: 'Email is required'}, {type: "email", message: 'Please enter a valid email'}]}>
              <Input type='email' className='text-text/70 w-full' placeholder='Emails (send success notification to the sender)' min={1000} style={{ background: "transparent", width: "100%" }} />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-1 -mt-3">
            <label htmlFor="amount" className="w-full text-sm md:text-base text-text/70 font-medium font-grotesk">Amount:</label>
            <div className="flex gap-1">
              <Form.Item<TDonationData> name="currency" id="currency" initialValue={"₦"}>
                <Select
                  id="currency"
                  options={
                    [
                      { id: "x023498zse420", name: "NGN", code: "&#8358;", symbol: "₦" },
                      // { id: "x023498zse421", name: "GBP",  code: "&#163;", symbol: "£" },
                      // { id: "x023498zse422", name: "EUR", code: "&#8364;", symbol: "€" },
                      // { id: "x023498zse423", name: "USD", code: "&#36;", symbol: "$" },
                    ].map(({ id, name, symbol }) => ({
                      label: name,
                      value: symbol,
                      key: id
                    }))
                  }
                  className='bg-white'
                  getPopupContainer={(triggerNode) => triggerNode.parentElement!}
                />
              </Form.Item>
              <Form.Item<TDonationData> name="amount" id="amount" className='flex-1' rules={[{ required: true, message: 'Amount is required' }, { type: "number", message: 'Amount must be a number' }, {min: 1000, message: 'Amount cannot be less than 1,000. Thank you.'}]}>
                <InputNumber type='number' className='text-text/70 w-full' placeholder='Starting from 1000' min={1000} style={{ background: "transparent", width: "100%" }} />
              </Form.Item>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="w-full text-sm md:text-base text-text/70 font-medium font-grotesk">Purpose (Optional but recommended):</label>
            <Form.Item<TDonationData> name="message" id="message" noStyle>
              <TextArea className='' rows={5} placeholder='Not mandatory but if you have a specific purpose you prefer the donation channeled into. Feel free to state it. Thanks.' style={{ background: "transparent" }} />
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


