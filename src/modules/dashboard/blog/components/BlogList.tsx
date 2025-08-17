"use client"
import React, { useState } from 'react'
import { Table, TableProps } from 'antd'
import { BLOG_COLUMN } from '../columns'
import { AiOutlineDelete } from 'react-icons/ai'
import { DeleteModal, UpdateStatus } from '@/modules/shared'
import { TBlogItemProp } from '@/types'
import { $Enums } from '@prisma/client'

export default function BlogList({ data, role }: { data: TBlogItemProp[] | undefined, role: $Enums.Role }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const rowSelection: TableProps<TBlogItemProp>["rowSelection"] = {
    selectedRowKeys,
    type: "checkbox",
    onChange(keys: React.Key[]) {
      if (role === "User") {
        return false;
      }
      else setSelectedRowKeys(keys)
      setSelectedRowKeys(keys)
    }
  }

  return (
    <>
      <DeleteModal key={"8012469234"} openModal={deleteModal} closeModal={setDeleteModal} data={selectedRowKeys} table='blog'  resetSelected={() => setSelectedRowKeys([])} />
      <aside className="card p-2 flex flex-col gap-4 text-text min-w-52 overflow-x-scroll">
        <div className="flex items-end gap-2">
          {(selectedRowKeys.length > 0) &&
            <div className="flex flex-col select-none">
              <p className="text-text text-xs">Delete selection</p>
              <button onClick={() => setDeleteModal(!deleteModal)} className="button py-1 px-4 bg-danger flex items-center gap-1 w-max"><AiOutlineDelete /> Delete {selectedRowKeys.length ? "All" : ""}</button>
            </div>
          }
          <UpdateStatus key="902384" data={selectedRowKeys} table='blog' statusType={$Enums.ViewStatus} />
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
          dataSource={data?.map(el => ({ ...el, key: el.id }))}
          columns={BLOG_COLUMN()}
        />
      </aside>
    </>
  )
}
