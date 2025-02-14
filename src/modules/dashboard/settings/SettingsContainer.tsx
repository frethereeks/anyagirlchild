"use client"

import React, { useState } from 'react'
import { ASSET_URL } from '@/assets'
import Image from 'next/image'
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useForm } from 'antd/es/form/Form';
import { Form, Input } from 'antd';

type TAdminSecurityProps = {
  password: string
  newpassword: string
  confirmpassword: string
}

export default function SettingsContainer() {
  const [activeForm, setActiveForm] = useState<"info" | "security">("info")
  const [form] = useForm<TAdminProps>()
  const [passForm] = useForm<TAdminSecurityProps>()

  const data: TAdminProps = {
    id: "829zxc92941020a82",
    firstname: "Felicity",
    lastname: "Anyanwu",
    email: "felicity.ananyanwu@anyagirlchild.com",
    role: "Root",
    image: "",
    status: "Active",
    password: "123456",
    address: "35 Asheik Jarma, Jabi. Abuja, Nigeria",
    lastLogin: new Date("2/11/2025"),
    createdAt: new Date("1/25/2025"),
    updatedAt: new Date("2/11/2025"),
  }

  return (
    <main className='flex flex-col lg:flex-row gap-4'>
      <aside className="card flex flex-col gap-8 w-full lg:max-w-[20rem] py-10">
        <div className="hidden lg:flex flex-col items-center py-4">
          <div className="relative h-[10rem] w-[10rem] rounded-full mx-auto bg-dark-grad flex-shrink-0">
            <Image src={data?.image || ASSET_URL["little_child"]} alt={data.firstname} className="object-cover object-top h-[10rem] w-[10rem] rounded-full" fill />
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
          form={form}
          className={`w-full max-w-xl flex-1 flex flex-col gap-0 overflow-hidden`}>
          <h4 className="text-sm md:text-lg font-bold text-text p-4 border-l-4 border-secondary py-2 mb-8">Basic Info</h4>
          <div className="flex flex-col lg:flex-row gap-4 p-4">
            <h4 className="w-[10rem] text-base pt-4 text-text font-semibold">Profile Picture:</h4>
            <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative h-20 w-20 rounded-full overflow-hidden bg-dark-grad flex-shrink-0">
                <Image src={data?.image || ASSET_URL["little_child"]} alt={data.firstname} className="object-cover object-top" fill />
              </div>
              <div className="flex-1 flex gap-4">
                <button className="button bg-secondary">Upload Photo</button>
                <button className="button bg-transparent text-danger border px-6">Delete</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4">
            <h4 className="w-[10rem] text-base text-text font-semibold">First Name:</h4>
            <div className="flex-1 flex flex-col md:flex-row gap-2">
              <Form.Item<TAdminProps> name="firstname" noStyle className='flex-1' initialValue={data?.firstname}>
                <Input style={{ background: "transparent" }} type='text' placeholder={`First Name e.g. ${data?.firstname}`} required className='border border-background bg-white rounded-sm p-3' />
              </Form.Item>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4">
            <h4 className="w-[10rem] text-base text-text font-semibold">Last Name:</h4>
            <div className="flex-1 flex flex-col md:flex-row gap-2">
              <Form.Item<TAdminProps> name="lastname" noStyle className='flex-1' initialValue={data?.lastname}>
                <Input style={{ background: "transparent" }} type='text' placeholder={`Last Name e.g. ${data?.lastname}`} required className='border border-background bg-white rounded-sm p-3' />
              </Form.Item>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4">
            <h4 className="w-[10rem] text-base text-text font-semibold">Email:</h4>
            <div className="flex-1 flex flex-col md:flex-row gap-2">
              <Form.Item<TAdminProps> name="email" noStyle className='flex-1' initialValue={data?.email}>
                <Input style={{ background: "transparent" }} type='email' placeholder={`Email e.g. ${data?.email}`} required className='border border-background bg-white rounded-sm p-3' />
              </Form.Item>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button className="button bg-secondary font-semibold">Save Changes</button>
          </div>
        </Form>
        :
        <Form
          form={passForm}
          className={`w-full max-w-xl flex-1 flex flex-col gap-0 overflow-hidden`}>
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
              <Form.Item<TAdminSecurityProps> name="newpassword" noStyle className='flex-1'>
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
            <button className="button bg-secondary font-semibold">Update Password</button>
          </div>
        </Form>
        }
      </aside>
    </main>
  )
}
