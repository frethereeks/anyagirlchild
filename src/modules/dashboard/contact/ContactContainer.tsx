"use client"
import React, { useState } from 'react'
import { Modal, Table, TableProps } from 'antd'
import { AiOutlineDelete } from "react-icons/ai";

import { CONTACT_COLUMN } from './columns'

export default function ContactContainer({ data, role }: { data: TContactProps[], role: TAdminRole }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [viewModal, setViewModal] = useState<boolean>(false)
  const [selectedData, setSelectedData] = useState<TContactProps>()

  React.useEffect(() => {
    setSelectedData(data?.find(el => el.id === selectedRowKeys[0]))
    // eslint-disable-next-line
  }, [selectedRowKeys])

  const rowSelection: TableProps<TContactProps>["rowSelection"] = {
    selectedRowKeys,
    type: "checkbox",
    onChange(keys: React.Key[]) {
      if (role === "Admin") {
        return false;
      }
      else setSelectedRowKeys(keys)
    },
  }

  return (
    <>
      <section className='flex flex-col gap-4'>
        <aside className="card flex bg-white justify-between gap-4 p-4 min-w-52 overflow-x-scroll">
          <div className="flex items-center gap-2">
            <h4 className="text-text text-lg md:text-xl font-bold pr-4 text-nowrap">Message List</h4>
          </div>
          <div className="flex gap-2">
            {role !== "Admin" && (
              <>
                {(selectedRowKeys.length > 0) && <button onClick={() => setDeleteModal(!deleteModal)} className="button bg-danger flex items-center gap-2 py-1"><AiOutlineDelete /> Delete</button>}
              </>
            )}
          </div>
        </aside>
        <aside className="card p-2 flex flex-col gap-4 text-text min-w-52 overflow-x-scroll">
          <Table
            key={"82034798a09834"}
            pagination={{
              hideOnSinglePage: true,
              // pageSize: 10,
              showSizeChanger: false,
              showQuickJumper: false,
            }}
            rowSelection={{ ...rowSelection }}
            scroll={{ x: "max-content" }}
            dataSource={data.map(el => ({ ...el, key: el.id }))}
            columns={CONTACT_COLUMN()}
          />
        </aside>
      </section>
    </>
  )
}
