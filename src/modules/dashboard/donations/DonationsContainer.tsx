"use client"

import { Table } from 'antd'
import React from 'react'
import { DONATION_COLUMN } from './columns'
import { DashBreadCrumb } from '../layout'

export default function DonationsContainer() {

  const data: TDonationProps[] = [
    {
      id: "8299170asdvaiu20",
      fullname: "Angela Monroe",
      amount: 300000,
      purpose: "Help the girl child get a better education",
      status: "success",
      createdAt: new Date("12/01/2024"),
      updatedAt: new Date("12/01/2024"),
    },
    {
      id: "8299170asdvaiu21",
      fullname: "Faith Ugochi",
      amount: 20000,
      purpose: "Never let her suffer like the child of my neighbor did. Help the girl child get a better education",
      status: "pending",
      createdAt: new Date("01/30/2025"),
      updatedAt: new Date("01/30/2025"),
    },
    {
      id: "8299170asdvaiu22",
      fullname: "Adaobi Anderson",
      amount: 142500,
      purpose: "God bless everyone behind this initiative. Please, keep it up and never let her suffer like the child of my neighbor did. Help the girl child get a better education",
      status: "failed",
      createdAt: new Date("02/02/2025"),
      updatedAt: new Date("02/02/2025"),
    },
  ]

  return (
    <>
      <DashBreadCrumb />
      <aside className="card p-4 flex flex-col gap-4 text-text min-w-52 overflow-x-scroll">
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
              <h4 className="text-default text-primary font-bold pl-4 border-l-4 border-primary">All Donations</h4>
              {/* <Link href={appRoutePaths.adminblogs} className='py-1.5 px-4 rounded-md bg-primary hover:bg-primary text-white opacity-70 text-xs flex items-center gap-2'>View All <IoChevronForward /></Link> */}
            </div>
          }
          scroll={{ x: "max-content" }}
          dataSource={data}
          columns={DONATION_COLUMN()}
        />
      </aside>
    </>
  )
}

