"use client"
import { Form, Modal } from "antd"
import { useRouter } from "next/navigation"
import React, { useRef, useState } from "react"

type TPageProps = {
  data: TAdminProps | undefined
  // role: TAdminRole
  closeModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddAdmin({ closeModal, data }: TPageProps) {
  const [form] = Form.useForm<TAdminProps>()
  const [loading, setLoading] = useState<boolean>(false)
  const categoryRef = useRef<HTMLSelectElement | null>(null)
  const router = useRouter()

  return (
    <>
      <Modal >

      </Modal>
      {/* <button className='py-1.5 px-4 rounded-md bg-primary hover:bg-primary text-white opacity-70 text-xs flex items-center gap-2'>Create Admin</button> */}
    </>
  )
}
