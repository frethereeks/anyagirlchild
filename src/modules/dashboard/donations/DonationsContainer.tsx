"use client"
import React, { useState } from 'react'
import { Modal, Table, TableProps } from 'antd'
// import { BiSolidPencil } from 'react-icons/bi'
import { AiOutlineDelete } from "react-icons/ai";
import { DONATION_COLUMN } from './columns'
import { TDonationProps } from '@/types';
import { $Enums } from '@prisma/client';
import { DeleteModal } from '@/modules/shared';
import { triggerModal } from '@/lib/features/reducers/siteSlice';
import { useAppDispatch, useAppSelector } from '@/lib/features/hooks';
import { LuTickets } from 'react-icons/lu';
import moment from 'moment';


export default function DonationsContainer({ data, role }: { data: TDonationProps[], role: $Enums.Role }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [selectedData, setSelectedData] = useState<TDonationProps>()
  const site = useAppSelector(state => state.site)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    // eslint-disable-next-line
    setSelectedData(data?.find(el => el.id === selectedRowKeys[0]))
  }, [selectedRowKeys, site])

  // This is to populate the selectedData value when the view donation button is clicked
  React.useEffect(() => {
    // eslint-disable-next-line
    setSelectedData(data?.find(el => el.id === site.selectedId))
    console.log({ selectedData, selectedId: site.selectedId })
  }, [site.selectedId])

  const rowSelection: TableProps<TDonationProps>["rowSelection"] = {
    selectedRowKeys,
    type: "checkbox",
    onChange(keys: React.Key[]) {
      if (role === "USER") {
        return false;
      }
      else setSelectedRowKeys(keys)
      setSelectedRowKeys(keys)
    }
  }

  return (
    <>
      <DeleteModal key={"8012469234"} openModal={deleteModal} closeModal={setDeleteModal} data={selectedRowKeys} table='donation' resetSelected={() => setSelectedRowKeys([])} />
      <Modal
        open={site.openModal}
        onCancel={() => dispatch(triggerModal({ id: undefined, open: false }))}
        afterClose={() => setSelectedData(undefined)}
        footer={null}
      >
        {selectedData && (
          <div className="flex flex-col gap-2">
            <div className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 grid place-items-center mx-auto rounded-md ${selectedData.status === "SUCCESSFUL" ? 'bg-green-grad' : selectedData.status! === "FAILED" ? "bg-red-grad" : "bg-dark-grad"}  text-white text-2xl md:text-4xl`}><LuTickets /></div>
            <div className="flex flex-col justify-center">
              <h3 className="heading-three text-primary/70 text-center pt-4">{selectedData.fullname}</h3>
              <span className='w-full text-center text-text font-normal'>{selectedData.message}</span>
            </div>
            <div className="flex flex-col text-text divide-y divide-slate-200 py-4">
              {/* <div className="flex justify-between p-2 text-sm">Currency: <span className={`text-right font-semibold ${selectedData.currency === "N" ? "line-through" : ""}`}>{selectedData.currency}</span></div> */}
              <div className="flex justify-between p-2 text-sm">Amount: <p className="text-right font-semibold"><span className={`text-right font-semibold ${selectedData.currency === "N" ? "line-through" : ""}`}>{selectedData.currency}</span>{selectedData.amount.toLocaleString()}</p></div>
              <div className="flex justify-between p-2 text-sm">Email: <span className="text-right font-semibold">{selectedData.email}</span></div>
              <div className={`flex justify-between items-center px-2 text-sm ${selectedData.status === "SUCCESSFUL" ? 'text-secondary' : selectedData.status === "FAILED" ? 'text-danger' : 'text-text'}`}>Status: <span className={`text-right text-xs font-semibold px-4 py-1 my-1 w-max rounded-md ${selectedData.status === "SUCCESSFUL" ? 'bg-secondary/10' : selectedData.status === "FAILED" ? 'bg-danger/10' : 'bg-text/10'}`}>{selectedData.status}</span></div>
              <div className="flex justify-between p-2 text-sm">Date: <span className="text-right font-semibold">{moment(selectedData.createdAt).format("DD-MM-YYYY")}</span></div>
              {/* <div className="flex gap-2 p-2 text-sm">Purpose: <span className='text-justify font-semibold'>{selectedData.message}</span></div> */}
            </div>
            {/* <p className="text-xsmall text-text text-center font-mulish font-medium pb-4">Are you sure you want to proceed with this? This action is not reversible</p>
            <div className="w-full flex justify-center gap-4 md:gap-10">
              <button onClick={() => dispatch(triggerModal({ id: undefined, open: false }))} className="button px-6 md:px-8 bg-background/90 hover:bg-background border border-text/20 text-primary">Close</button>
            </div> */}
          </div>
        )}
      </Modal>
      <section className='flex flex-col gap-4'>
        <aside className="card flex bg-white justify-between gap-4 p-4 min-w-52 overflow-x-scroll">
          <div className="flex items-center gap-2">
            <h4 className="text-text text-lg md:text-xl font-bold pr-4 text-nowrap">All Donations</h4>
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
            columns={DONATION_COLUMN()}
          />
        </aside>
      </section>
    </>
  )
}
