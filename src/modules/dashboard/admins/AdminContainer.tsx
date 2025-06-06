"use client"
import React, { useRef, useState } from 'react'
import { AddAdmin } from './components'
import { Modal, notification, Table, TableProps } from 'antd'
import { ADMIN_COLUMN } from './columns'
// import { BiSolidPencil } from 'react-icons/bi'
import { AiOutlineDelete } from "react-icons/ai";
import { TAdminProps } from '@/types'
import { $Enums } from '@prisma/client'
import { GrUserAdmin } from 'react-icons/gr'
import { DeleteModal, UpdateStatus } from '@/modules/shared'
import { useAppDispatch, useAppSelector } from '@/lib/features/hooks'
import { triggerModal } from '@/lib/features/reducers/siteSlice'
import { useRouter } from 'next/navigation'


export default function AdminContainer({ data, role }: { data: TAdminProps[], role: $Enums.Role }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [uploadModal, setUploadModal] = useState<boolean>(false)
  const [selectedData, setSelectedData] = useState<TAdminProps | undefined>(undefined)
  const site = useAppSelector(state => state.site)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const statusRef = useRef<HTMLSelectElement | null>(null)
  const router = useRouter()


  React.useEffect(() => {
    if (site.selectedId) {
      setSelectedData(data?.find(el => el.id === site.selectedId))
    }
    // eslint-disable-next-line
  }, [site.selectedId, dispatch])

  React.useEffect(() => {
    setSelectedData(data?.find(el => el.id === selectedRowKeys[0]))
    // eslint-disable-next-line
  }, [selectedRowKeys])

  const rowSelection: TableProps<TAdminProps>["rowSelection"] = {
    selectedRowKeys,
    type: "checkbox",
    onChange(keys: React.Key[]) {
      if (role === "USER") {
        return false;
      }
      else setSelectedRowKeys(keys)
    },
    getCheckboxProps: (record: TAdminProps) => ({
      disabled: record.role === "ROOT",
      name: record.role
    })
  }

  return (
    <>
      <DeleteModal key={"8012469234"} openModal={deleteModal} closeModal={setDeleteModal} data={selectedRowKeys} table='user' resetSelected={() => setSelectedRowKeys([])} />
      <Modal
        // style={{ zIndex: 1040, position: "relative" }}
        open={site.openModal}
        onCancel={() => dispatch(triggerModal({ id: undefined, open: false }))}
        afterClose={() => setSelectedData(undefined)}
        footer={null}
      >
        <AddAdmin data={selectedData} closeModal={setUploadModal} />
      </Modal>
      <section className='flex flex-col gap-4'>
        <aside className="card flex bg-white justify-between gap-4 p-4 min-w-52 overflow-x-scroll">
          <div className="flex justify-between items-center gap-2">
            <h4 className="text-text text-lg md:text-xl font-bold pr-4 text-nowrap">Admin List</h4>
            {<button onClick={() => dispatch(triggerModal({ id: undefined, open: true }))} className="button bg-secondary py-1 flex items-center gap-2"><GrUserAdmin /> New Admin</button>}
          </div>
        </aside>
        <aside className="card p-2 flex flex-col gap-4 text-text min-w-52 overflow-x-scroll overflow-y-visible">
          <div className="flex items-end gap-2">
            {/* { role !== "ROOT" && ((selectedRowKeys.length > 0) && <button onClick={() => setDeleteModal(!deleteModal)} className="button py-2 px-4 bg-danger flex items-center gap-2"><AiOutlineDelete /> Delete All</button>)} */}
            {(selectedRowKeys.length > 0) && <button onClick={() => setDeleteModal(!deleteModal)} className="button rounded-sm py-2 px-4 bg-danger flex items-center gap-2"><AiOutlineDelete /> Delete All</button>}
            <UpdateStatus key={"80234609234"} data={selectedRowKeys} table='user' />
          </div>
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
