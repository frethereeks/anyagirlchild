"use client"

import React, { useRef, useState } from 'react'
import { ASSET_URL } from '@/assets'
import Image from 'next/image'
import { RiCamera2Line, RiVerifiedBadgeFill } from "react-icons/ri";
import { useForm } from 'antd/es/form/Form';
import { Form, Input, notification } from 'antd';
import { TAdminProps } from '@/types';
import { fileUpload } from '@/lib';
import { updateUser, updateUserImage, uploadEntityImage } from '@/app/action';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

type TAdminSecurityProps = {
  password: string
  newPassword: string
  confirmpassword: string
}

type TProfileProps = Omit<TAdminProps, "image"> & {
  image: File
}

export default function SettingsContainer({ data }: { data: TAdminProps }) {
  const [activeForm, setActiveForm] = useState<"info" | "security">("info")
  const [form] = useForm<TProfileProps>()
  const [passForm] = useForm<TAdminSecurityProps>()
  const [loading, setLoading] = useState<boolean>(false)
  const imageRef = useRef<HTMLInputElement | null>(null)
  const [image, setImage] = useState<{ name: string, value: string }>({
    name: "Click to Upload Image",
    value: data?.image || ""
  })
  const router = useRouter()
  const {update, data: session} = useSession()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    const file = e?.target?.files![0]
    setImage((prev) => ({ ...prev, name: file.name }))
    const data = await fileUpload(file) as unknown as string
    form.setFieldValue("image", file)
    setImage(prev => ({ ...prev, value: data }))
    setLoading(false)
  }

  const handleProfileImageUpload = async () => {
    notification.info({ message: `Please wait while your request is being processed...`, key: "123" })
    setLoading(true)
    // let image = imageRef?.current?.files![0] as unknown as File;
    const formImage = form.getFieldValue("image")
    const formData = new FormData()
    formData.append("image", formImage)
    formData.append("id", data.id)
    formData.append("oldImageName", data.image ?? "")
    
    // console.log({formImage, formData})
    try {
      const res = await updateUserImage(formData)
      if (res?.error) notification.error({ message: res?.message, key: "123" })
      else {
        notification.success({ message: res?.message, key: "123" })
        router.refresh()
        // Update the server session to show real-time session update
        update({
          ...session, 
          user: {
            ...session?.user,
            image: data.image
          }
        })
      }
    } catch (error) {
      console.log('error', error)
      notification.error({ message: `Something went wrong. Please check your internet connection and try again.`, key: "123" })
    } finally {
      setLoading(false)
    }
  }

  const handleInfoSubmit = async (values: TProfileProps) => {
    notification.info({ message: `Please wait while your request is being processed...`, key: "123" })
    setLoading(true)
    try {
      const formData = new FormData()
      Object.entries(values).map(([key, value]) => {
        key === "image" ? formData.append(key, value as File) : formData.append(key, value as string)
      })
      formData.append("newImage", (image.value !== data?.image) as unknown as string)
      formData.append("oldImage", data.image as string)
      const res = await updateUser(formData, "info")
      if (res?.error) notification.error({ message: res?.message, key: "123" })
      else {
        notification.success({ message: res?.message, key: "123" })
        router.refresh()
      }
    } catch (error) {
      console.log('error', error)
      notification.error({ message: `Something went wrong. Please check your internet connection and try again.`, key: "123" })
    } finally {
      setLoading(false)
    }
  }

  const handleSecuritySubmit = async (values: TAdminSecurityProps) => {
    notification.info({ message: `Please wait while your request is being processed...`, key: "123" })
    setLoading(true)
    try {
      const formData = new FormData()
      Object.entries(values).map(([key, value]) => {
        formData.append(key, value as string)
      })
      const res = await updateUser(formData, "security")
      if (res?.error) notification.error({ message: res?.message, key: "123" })
      else {
        notification.success({ message: res?.message, key: "123" })
        router.refresh()
      }
    } catch (error) {
      console.log('error', error)
      notification.error({ message: `Something went wrong. Please check your internet connection and try again.`, key: "123" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='flex flex-col lg:flex-row gap-4'>
      <aside className="card flex flex-col gap-8 w-full lg:max-w-[20rem] py-10">
        <div className="hidden lg:flex flex-col items-center py-4">
          <div className="relative h-[10rem] w-[10rem] rounded-full mx-auto bg-dark-grad flex-shrink-0">
            {image.value && <Image src={image.value} alt={data.firstname} className="object-cover object-top h-[10rem] w-[10rem] rounded-full" fill />}
            <div className="absolute z-20 h-6 w-6 rounded-full grid place-items-center bg-white text-blue-500 bottom-4 right-2 text-xl">
              <RiVerifiedBadgeFill />
            </div>
          </div>
          <h4 className="flex-1 text-base pt-4 text-dark-text font-semibold">{data.firstname} {data.lastname}</h4>
          <p className="flex-1 text-xs text-text opacity-80 font-medium">{data.email}</p>
        </div>
        <h4 className="text-base lg:text-lg text-text font-semibold pl-4">Account</h4>
        <div className="flex flex-row lg:flex-col -mt-5">
          <button onClick={() => setActiveForm("info")} className={`text-sm flex justify-center lg:justify-start font-medium p-4 py-3 -ml-0 lg:-ml-4 ${activeForm === "info" ? 'lg:border-l-4 border-l-0 pl-0 lg:pl-4 border-b-2 lg:border-b-2 border-secondary lg:border-b-transparent' : 'lg:border-l-4 lg:border-transparent'} `}>Personal Information</button>
          <button onClick={() => setActiveForm("security")} className={`text-sm flex justify-center lg:justify-start font-medium p-4 py-3 -ml-0 lg:-ml-4 ${activeForm === "security" ? 'lg:border-l-4 border-l-0 pl-0 lg:pl-4 border-b-2 lg:border-b-2 border-secondary lg:border-b-transparent' : 'lg:border-l-4 lg:border-transparent'} `}>Login & Security</button>
        </div>
      </aside>
      <aside className='card flex-1 flex flex-col gap-0'>
        {
          activeForm === "info" ?
            <Form
              encType='multipart/form-data'
              onFinish={handleInfoSubmit}
              form={form}
              className={`w-full max-w-xl flex-1 flex flex-col gap-0 overflow-hidden`}
            >
              <h4 className="text-sm md:text-lg font-bold text-text p-4 border-l-4 border-secondary py-2 mb-8">Basic Info</h4>
              <div className="flex flex-col lg:flex-row gap-4 p-4">
                <h4 className="w-[10rem] text-base pt-4 text-text font-semibold">Profile Picture:</h4>
                <Form.Item<TProfileProps> noStyle name={"image"}>
                  <div className="flex-1 flex flex-col md:flex-row md:items-center gap-6">
                    <label htmlFor='profileImage' className="relative cursor-pointer h-20 w-20 rounded-full bg-primary flex-shrink-0">
                      <input ref={imageRef} type="file" onChange={handleFileUpload} name="image" id="profileImage" className="hidden opacity-0" />
                      <Image src={image?.value} alt={data.firstname} className="object-cover object-top h-20 w-20 rounded-full" fill />
                      <div className="absolute z-20 h-6 w-6 rounded-full grid place-items-center bg-white text-text bottom-4 -right-2 text-lg">
                        <RiCamera2Line />
                      </div>
                    </label>
                    <div className="flex-1 flex gap-4">
                      <button disabled={loading || image.value === data?.image} type={"button"} onClick={handleProfileImageUpload} className="button disabled:cursor-not-allowed bg-secondary hover:bg-secondary/90">Upload Photo</button>
                      <button disabled={loading || image.value === data?.image} type={"button"} onClick={() => setImage({ name: data?.firstname, value: data?.image! })} className="button disabled:cursor-not-allowed hover:bg-background/50 bg-transparent border border-danger/40 hover:border-text/20 text-danger px-6 font-normal">Delete</button>
                    </div>
                  </div>
                </Form.Item>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4">
                <h4 className="w-[10rem] text-base text-text font-semibold">First Name:</h4>
                <div className="flex-1 flex flex-col md:flex-row gap-2">
                  <Form.Item<TProfileProps> name="firstname" noStyle className='flex-1' initialValue={data?.firstname}>
                    <Input style={{ background: "transparent" }} type='text' placeholder={`First Name e.g. ${data?.firstname}`} required className='border border-background bg-white rounded-sm p-3' />
                  </Form.Item>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4">
                <h4 className="w-[10rem] text-base text-text font-semibold">Last Name:</h4>
                <div className="flex-1 flex flex-col md:flex-row gap-2">
                  <Form.Item<TProfileProps> name="lastname" noStyle className='flex-1' initialValue={data?.lastname}>
                    <Input style={{ background: "transparent" }} type='text' placeholder={`Last Name e.g. ${data?.lastname}`} required className='border border-background bg-white rounded-sm p-3' />
                  </Form.Item>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4">
                <h4 className="w-[10rem] text-base text-text font-semibold">Email:</h4>
                <div className="flex-1 flex flex-col md:flex-row gap-2">
                  <Form.Item<TProfileProps> name="email" noStyle className='flex-1' initialValue={data?.email}>
                    <Input style={{ background: "transparent" }} type='email' placeholder={`Email e.g. ${data?.email}`} required className='border border-background bg-white rounded-sm p-3' />
                  </Form.Item>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button disabled={loading} className="button bg-secondary font-semibold">Save Changes</button>
              </div>
            </Form>
            :
            <Form
              onFinish={handleSecuritySubmit}
              form={passForm}
              className={`w-full max-w-xl flex-1 flex flex-col gap-0 overflow-hidden`}
            >
              <h4 className="text-sm md:text-lg font-semibold text-text p-4 border-l-4 border-secondary py-2 mb-8 flex gap-2 ">Password Update <button className="bg-danger/20 text-danger text-xs font-normal py-0.5 px-2 rounded-sm">Security</button> </h4>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4">
                <h4 className="w-[10rem] text-base text-text font-semibold">Current Password:</h4>
                <div className="flex-1 flex flex-col md:flex-row gap-2">
                  <Form.Item<TAdminSecurityProps> name="password" noStyle className='flex-1' >
                    <Input style={{ background: "transparent" }} type='text' placeholder={`Old Password`} required className='border border-background bg-white rounded-sm p-3' />
                  </Form.Item>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4">
                <h4 className="w-[10rem] text-base text-text font-semibold">New Password:</h4>
                <div className="flex-1 flex flex-col md:flex-row gap-2">
                  <Form.Item<TAdminSecurityProps> name="newPassword" noStyle className='flex-1'>
                    <Input style={{ background: "transparent" }} type='password' placeholder={`Use a Strong Password`} required className='border border-background bg-white rounded-sm p-3' />
                  </Form.Item>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4">
                <h4 className="w-[10rem] text-base text-text font-semibold">Confirm Password:</h4>
                <div className="flex-1 flex flex-col md:flex-row gap-2">
                  <Form.Item<TAdminSecurityProps> name="confirmpassword" noStyle className='flex-1'>
                    <Input style={{ background: "transparent" }} type='password' placeholder={`Use a Strong Password`} required className='border border-background bg-white rounded-sm p-3' />
                  </Form.Item>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button disabled={loading} className="button bg-secondary font-semibold">Update Password</button>
              </div>
            </Form>
        }
      </aside>
    </main>
  )
}
