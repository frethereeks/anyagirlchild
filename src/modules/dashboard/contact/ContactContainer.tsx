"use client"
import React, { useState } from 'react'
import { Modal, Table, TableProps } from 'antd'
import { AiOutlineDelete } from "react-icons/ai";
import { CONTACT_COLUMN } from './columns'
import { TContactProps } from '@/types';
import { $Enums } from '@prisma/client';
import { triggerModal } from '@/lib/features/reducers/siteSlice';
import { useAppDispatch, useAppSelector } from '@/lib/features/hooks';
import moment from 'moment';
import { DeleteModal } from '@/modules/shared';

export default function ContactContainer({ data, role }: { data: TContactProps[], role: $Enums.Role }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [selectedData, setSelectedData] = useState<TContactProps>()
  const site = useAppSelector(state => state.site)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    setSelectedData(data?.find(el => el.id === selectedRowKeys[0]))
    // eslint-disable-next-line
  }, [selectedRowKeys])

  // This is to populate the selectedData value when the view donation button is clicked
  React.useEffect(() => {
    setSelectedData(data?.find(el => el.id === site.selectedId))
    // eslint-disable-next-line
  }, [site.selectedId])

  const rowSelection: TableProps<TContactProps>["rowSelection"] = {
    selectedRowKeys,
    type: "checkbox",
    onChange(keys: React.Key[]) {
      if (role === "USER") {
        return false;
      }
      else setSelectedRowKeys(keys)
    },
  }

  return (
    <>
      <DeleteModal key={"8012469234"} openModal={deleteModal} closeModal={setDeleteModal} data={selectedRowKeys} table='contact' resetSelected={() => setSelectedRowKeys([])} />
      <Modal
        open={site.openModal}
        onCancel={() => dispatch(triggerModal({ id: undefined, open: false }))}
        afterClose={() => setSelectedData(undefined)}
        footer={null}
      >
        {selectedData && (
          <div className="flex flex-col gap-2 pt-6">
            {/* <div className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 grid place-items-center mx-auto rounded-md ${selectedData.status === "READ" ? 'bg-green-grad' : "bg-dark-grad"}  text-white text-2xl md:text-4xl`}><LuMessageSquareDot /></div> */}
            {/* <div className="flex flex-col justify-center">
              <h3 className="heading-three text-primary/70 text-center">{selectedData.fullname}</h3>
              </div> */}
            <div className="flex flex-col text-text divide-y divide-slate-200 pb-4">
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex justify-between items-end gap-4 translate-y-1">
                  <div className="flex-1 flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full flex-shrink-0 text-2xl text-white bg-dark-grad grid place-items-center -rotate-12">
                      <p className="text-3xl font-black -tracking-[0.25rem]">{selectedData?.fullname.split(" ")[0][0]} {selectedData?.fullname.split(" ")[1][0]}</p>
                    </div>
                    <div className="flex-1 flex flex-col pb-1">
                      <h5 className="leading-none text-text text-sm md:text-base font-semibold font-grotesk select-none">{selectedData.fullname}</h5>
                      <a href={`mailto:${selectedData.email}`} className='w-full underline leading-none text-text text-xs font-normal'>{selectedData.email}</a>
                    </div>
                  </div>
                  <p className="text-text/60 text-xs font-medium font-grotesk select-none">{moment(selectedData.createdAt).fromNow()}</p>
                </div>
                <p className="relative bg-white rounded-md py-2 text-text/80 text-sm text-justify">
                  {selectedData.message}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <section className='flex flex-col gap-4'>
        <aside className="card flex bg-white justify-between gap-4 p-4 min-w-52 overflow-x-scroll">
          <div className="flex items-center gap-2">
            <h4 className="text-text text-lg md:text-xl font-bold pr-4 text-nowrap">Message List</h4>
          </div>
          <div className="flex gap-2">
            {role !== "ADMIN" && (
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
