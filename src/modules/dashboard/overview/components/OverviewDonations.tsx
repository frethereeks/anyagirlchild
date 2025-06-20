"use client"
import { Table } from 'antd'
import React from 'react'
import Link from 'next/link'
import { appRoutePaths } from '@/routes/paths'
import { IoChevronForward } from 'react-icons/io5'
import { DONATION_COLUMN } from '@/modules/dashboard/donations/columns'
import { TDonationProps } from '@/types'

export default function OverviewDonations({ donationData }: { donationData: TDonationProps[] }) {
    // console.log({donationData})
    return (
        <aside className="card p-4 flex flex-col gap-4 text-text min-w-52">
            <Table
                key={"82034798a09834"}
                pagination={{
                    hideOnSinglePage: true,
                    // pageSize: 10,
                    showSizeChanger: false,
                    showQuickJumper: false,
                }}
                caption={
                    <div className='flex justify-between items-center gap-4 text-text pb-4'>
                        <h4 className="text-default text-secondary font-bold pl-4 border-l-4 border-secondary">Recent Donations</h4>
                        <Link href={appRoutePaths.admindonations} className='py-1.5 px-4 rounded-md bg-secondary hover:bg-secondary text-white text-xs flex items-center gap-2'>View All <IoChevronForward /></Link>
                    </div>
                }
                scroll={{ x: "max-content" }}
                dataSource={donationData}
                columns={DONATION_COLUMN()}
            />
        </aside>
    )
}
