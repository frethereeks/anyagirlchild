"use client"
import React, { useState } from 'react'
import { AddAdmin } from './components'
import { Modal, Table, TableProps } from 'antd'
import { ADMIN_COLUMN } from './columns'
import { BiSolidPencil } from 'react-icons/bi'
import { AiOutlineDelete } from "react-icons/ai";


export default function AdminContainer({ data, role }: { data: TAdminProps[], role: TAdminRole }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [uploadModal, setUploadModal] = useState<boolean>(false)
  const [selectedData, setSelectedData] = useState<TAdminProps>()

  React.useEffect(() => {
    setSelectedData(data?.find(el => el.id === selectedRowKeys[0]))
    // eslint-disable-next-line
  }, [selectedRowKeys])

  const rowSelection: TableProps<TAdminProps>["rowSelection"] = {
    selectedRowKeys,
    type: "checkbox",
    onChange(keys: React.Key[]) {
      if (role === "Admin") {
        return false;
      }
      else setSelectedRowKeys(keys)
    },
    getCheckboxProps: (record: TAdminProps) => ({
      disabled: record.role === "Root",
      name: record.role
    })
  }

  return (
    <>
      <Modal style={{ zIndex: 1040, position: "relative" }} open={uploadModal} afterClose={() => {
        setSelectedRowKeys([])
        setSelectedData(undefined)
      }} onCancel={() => setUploadModal(!uploadModal)} cancelButtonProps={{ style: { width: "93.5%", marginLeft: "0", marginRight: "1rem" } }} okButtonProps={{ style: { display: "none" } }}>
        <AddAdmin data={selectedData} closeModal={setUploadModal} />
      </Modal>
      <section className='flex flex-col gap-4'>
        {/* <aside className='card'>
          <div className='flex justify-between items-center gap-4 text-text'>
            <h4 className="text-default text-primary font-bold">Anya Girlchild Admins</h4>
            {role === "Root" && <button className='py-1.5 px-4 rounded-md bg-primary hover:bg-primary text-white opacity-70 text-xs flex items-center gap-2'>Create Admin</button>}
          </div>
        </aside> */}
        <aside className="card flex bg-white justify-between gap-4 p-4 min-w-52 overflow-x-scroll">
          <div className="flex items-center gap-2">
            <h4 className="text-text text-lg md:text-xl font-bold pr-4 text-nowrap">Admin List</h4>
            {role !== "Admin" && <button onClick={() => setUploadModal(!uploadModal)} className="button bg-secondary py-1">Create Record</button>}
          </div>
          <div className="flex gap-2">
            {role !== "Admin" && (
              <>
                {(selectedRowKeys.length === 1) && <button onClick={() => setUploadModal(!uploadModal)} className="button flex items-center gap-2 py-1"><BiSolidPencil /> Edit</button>}
                {(selectedRowKeys.length > 0) && <button onClick={() => setDeleteModal(!deleteModal)} className="button bg-danger flex items-center gap-2 py-1"><AiOutlineDelete /> Delete Selected</button>}
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
            columns={ADMIN_COLUMN()}
          />
        </aside>
      </section>
    </>
  )
}
