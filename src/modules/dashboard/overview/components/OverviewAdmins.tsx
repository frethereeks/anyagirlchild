// "use client"
import { Table } from 'antd'
import React from 'react'
import { ADMIN_COLUMN } from '../../admins/columns'
import Link from 'next/link'
import { appRoutePaths } from '@/routes/paths'
import { IoChevronForward } from 'react-icons/io5'
import { TAdminProps } from '@/types'

export default function OverviewDonations({ adminData }: { adminData: TAdminProps[] }) {
  return (
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
            <h4 className="text-default text-danger font-bold pl-4 border-l-4 border-danger">Admin Overview</h4>
            <Link href={appRoutePaths.adminadmin} className='py-1.5 px-4 rounded-md bg-danger hover:bg-danger text-white text-xs flex items-center gap-2'>View All <IoChevronForward /></Link>
          </div>
        }
        scroll={{ x: "max-content" }}
        dataSource={adminData}
        columns={ADMIN_COLUMN()}
      />
    </aside>
  )
}
