"use client"
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { updateEntity } from '@/app/action'
import {notification } from 'antd'
import { IDENTIFIED_TABLES } from '@/constants'
import { $Enums } from '@prisma/client'

type TPageProps = {
    data: React.Key[],
    statusType?: typeof $Enums.Status | typeof $Enums.ContactStatus | typeof $Enums.DoneStatus | typeof $Enums.ViewStatus
    table: IDENTIFIED_TABLES
}

export default function UpdateStatus({ data, table, statusType = $Enums.Status }: TPageProps) {
    const [loading, setLoading] = useState<boolean>(false)
    const statusRef = useRef<HTMLSelectElement | null>(null)
    const router = useRouter()

    const handleStatusUpdate = async () => {
        setLoading(true)
        notification.info({ message: `Please wait while your request is being processed...`, key: "8206" })
        try {
            const res = await updateEntity(JSON.stringify(data), statusRef?.current?.value!, table)
          if (res?.error) notification.error({ message: res?.message, key: "8206" })
          else {
            notification.success({ message: res?.message, key: "8206" })
            router.refresh()
          }
        } catch (error) {
          notification.error({ message: `Something went wrong. Due to ${error}`, key: "8206" })
        } finally {
          setLoading(false)
        }
    }
    
    return (
        <>
            <div className="flex flex-col select-none">
                <p className="text-text text-xs">Change Status</p>
                <div className="flex gap-2 w-max">
                    <select ref={statusRef} name="status" id="status" className="border border-text rounded-sm text-xs text-text w-max py-1 px-4 bg-white">
                        {
                            Object.entries(statusType).map(([key, value]) => (
                                <option key={key} value={value} className="text-xs text-text bg-white px-4">{key}</option>
                            ))
                        }
                    </select>
                    <button onClick={handleStatusUpdate} disabled={loading || data.length < 1} className="button rounded-sm disabled:cursor-not-allowed disabled:bg-text py-1 px-6 md:px-8 bg-secondary/90 hover:bg-secondary text-white flex items-center gap-2">
                        {loading ? <><span className='animate-spin border-2 border-white border-r-transparent rounded-full h-5 w-5 grid place-items-center'></span> Updating...</> : "Apply"}
                    </button>
                </div>
            </div>
        </>
    )
}
