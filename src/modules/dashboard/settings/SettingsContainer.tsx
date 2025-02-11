"use client"

import React from 'react'
import { ASSET_URL } from '@/assets'
import Image from 'next/image'
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function SettingsContainer() {
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
    <section className='flex flex-col lg:flex-row gap-4'>
      <aside className="card flex flex-col gap-8 w-full lg:max-w-[20rem] py-10">
        <div className="flex flex-col items-center py-4">
          <div className="relative h-[10rem] w-[10rem] rounded-full mx-auto bg-dark-grad flex-shrink-0">
            <Image src={data?.image || ASSET_URL["little_child"]} alt={data.firstname} className="object-cover object-top h-[10rem] w-[10rem] rounded-full" fill />
            <div className="absolute z-20 h-6 w-6 rounded-full grid place-items-center bg-white text-blue-500 bottom-4 right-2 text-xl">
              <RiVerifiedBadgeFill />
            </div>
          </div>
          <h4 className="flex-1 text-base pt-4 text-dark-text font-semibold">{data.firstname} {data.lastname}</h4>
          <p className="flex-1 text-xs text-text opacity-80 font-medium">{data.email}</p>
        </div>
      </aside>
      <aside className="card flex-1 flex flex-col gap-8">
        <h4 className="text-default font-bold pl-4 border-l-4 border-secondary">Basic Info</h4>
        <div className="flex flex-col lg:flex-row gap-4 p-4">
          <h4 className="w-[10rem] text-base pt-4 text-text font-semibold">Profile Picture:</h4>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative h-20 w-20 rounded-md overflow-hidden bg-dark-grad flex-shrink-0">
              <Image src={data?.image || ASSET_URL["little_child"]} alt={data.firstname} className="object-cover object-top" fill />
            </div>
            <div className="flex-1 flex gap-4">
              <button className="button bg-secondary">Upload</button>
              <button className="button bg-transparent text-danger border">Delete</button>
            </div>
          </div>
        </div>
      </aside>

    </section>
  )
}
