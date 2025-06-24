"use client"
import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import { DEFAULT_PAGE_SIZE } from '@/constants'
import AddGallery from './components/AddGallery';
import { TGalleryProps } from '@/types';
import { triggerModal } from '@/lib/features/reducers/siteSlice';
import { useAppDispatch, useAppSelector } from '@/lib/features/hooks';
import { $Enums } from '@prisma/client';
import Image from 'next/image';
import { AiOutlineDelete } from 'react-icons/ai';
import { DeleteModal, UpdateStatus } from '@/modules/shared';
// import { FiGrid } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa6';
import { GrGallery } from 'react-icons/gr';

type TPageProps = {
    data: TGalleryProps[] | undefined
    role: $Enums.Role
}

export default function GalleryContainer({ data, role }: TPageProps) {
    const [currentPage, setCurrentPage] = useState<number>(0)
    // const [viewType, setViewType] = useState<"grid" | "list">("grid")
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [selectedData, setSelectedData] = useState<TGalleryProps | undefined>(undefined)
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const site = useAppSelector(state => state.site)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (site.selectedId) {
            setSelectedData(data?.find(el => el.id === site.selectedId))
        }
        // eslint-disable-next-line
    }, [site.selectedId, dispatch])

    useEffect(() => {
        if (!deleteModal) {
            setSelectedRowKeys([])
        }
    }, [deleteModal])

    const handleDelete = (key: string) => {
        setDeleteModal(!deleteModal)
        setSelectedRowKeys([key])
    }

    const handleClick = (val: number) => {
        setCurrentPage(val)
    }



    return (
        <>
            <DeleteModal key={"8012469234"} openModal={deleteModal} closeModal={setDeleteModal} data={selectedRowKeys} table='gallery' resetSelected={() => setSelectedRowKeys([])} />
            <Modal
                open={site.openModal}
                footer={<></>}
                onCancel={() => dispatch(triggerModal({ id: undefined, open: false }))}
                afterClose={() => setSelectedData(undefined)}
                className='min-w-48 md:min-w-96'
            >
                <AddGallery key={"i2304897q234"} data={selectedData} />
            </Modal>
            <main className='relative flex flex-col gap-4'>
                <aside className="card p-2 sm:p-4 flex justify-between items-center gap-4">
                    <h4 className="text-default text-text font-bold">Gallery Images</h4>
                    <button onClick={() => dispatch(triggerModal({ id: undefined, open: true }))} className='py-1.5 px-4 rounded-md bg-danger hover:bg-danger text-white text-xs flex items-center gap-2'><GrGallery /> Add Image</button>
                </aside>
                <aside className="card p-2 sm:p-4 flex flex-col gap-4 text-text min-w-52 overflow-x-scroll">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-2">
                        {(selectedRowKeys.length > 0) &&
                            <div className="flex flex-col select-none">
                                <p className="text-text text-xs">Delete selection</p>
                                <button onClick={() => setDeleteModal(!deleteModal)} className="button py-1 px-4 bg-danger flex items-center gap-1 w-max"><AiOutlineDelete /> Delete All</button>
                            </div>
                        }
                        <UpdateStatus key="902384" data={selectedRowKeys} table='gallery' statusType={$Enums.ViewStatus} />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] lg:grid-cols-6 auto-rows-fr md:justify-center gap-2 sm:gap-4 lg:gap-6 py-4">
                        {
                            data?.map(el => ({ ...el, key: el.id }))?.map(gallery =>
                                <figure key={gallery.id} className="relative">
                                    <div className="group relative border-2 border-text/50 rounded-md overflow-hidden h-32 md:h-40 cursor-pointer">
                                        {
                                            role !== "USER" &&
                                            <div className={`absolute top-0  ${selectedRowKeys.find(el => el === gallery.key) ? 'md:top-0' : ' md:-top-full md:group-hover:top-0'} text-white left-0 w-full p-2 bg-primary/40 flex justify-between gap-2 z-10`}>
                                                <button onClick={() => setSelectedRowKeys(prev => [...prev, gallery.key])} className={`cursor-pointer rounded-md w-6 h-6 grid place-items-center border border-text/50 ${selectedRowKeys.find(el => el === gallery.key) ? 'bg-secondary' : 'bg-backdrop'} text-white`}>
                                                    <FaCheck />
                                                </button>
                                                <button onClick={() => handleDelete(gallery.key)} className="cursor-pointer rounded-md w-6 h-6 grid place-items-center bg-danger text-white">
                                                    <AiOutlineDelete />
                                                </button>
                                            </div>
                                        }
                                        <Image onClick={() => {
                                            setSelectedData(gallery)
                                            dispatch(triggerModal({ id: gallery.id, open: true }))
                                        }} src={gallery.image!} alt={gallery.image || gallery.title} className='object-cover object-top' fill />
                                    </div>
                                    <p className="text-xs md:text-xs text-text text-left font-medium">{gallery.title}</p>
                                </figure>
                            )
                        }
                    </div>
                    <div className='flex justify-end gap-2'>
                        {
                            data && data?.length > DEFAULT_PAGE_SIZE &&
                            Array.from({ length: Math.ceil((data?.length || 0) / DEFAULT_PAGE_SIZE) }).map((_, val) => (
                                <button onClick={() => handleClick(val)} key={val} className={`w-6 h-6 md:w-8 md:h-8 flex justify-center items-center border border-grey text-xs sm:text-sm rounded-md cursor-pointer ${val === currentPage ? 'hover:bg-gray bg-dark hover:text-dark/60 text-backdrop' : 'bg-gray hover:bg-dark text-dark/60 hover:text-backdrop'}`}>{
                                    val}</button>
                            ))
                        }
                    </div>
                </aside>
            </main>
        </>
    )
}
