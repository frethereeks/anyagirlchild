"use client"
import { createGalleryImage, updateGalleryImage } from '@/app/action'
import { fileUpload } from '@/lib'
import { useAppDispatch } from '@/lib/features/hooks'
import { triggerModal } from '@/lib/features/reducers/siteSlice'
import { TGalleryProps } from '@/types'
import { $Enums } from '@prisma/client'
import { Form, notification } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { GrGallery } from 'react-icons/gr'

export default function AddGallery({ data }: { data: TGalleryProps | undefined }) {
    const [form] = Form.useForm<TGalleryProps>()
    const [loading, setLoading] = useState<boolean>(false)
    const [newImage, setNewImage] = useState<boolean>(false)
    const imageRef = useRef<HTMLInputElement | null>(null)
    const statusRef = useRef<HTMLSelectElement | null>(null)
    const [image, setImage] = useState<{ name: string, value: string }>({
        name: "Click to Upload Image",
        value: ""
    })
    const router = useRouter()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                id: data?.id,
                title: data?.title,
                image: "",
                status: data.status,
            })
            setImage((prev) => ({ ...prev, value: data?.image ?? "" }))
            // if (categoryRef.current) categoryRef.current.value = data?.categoryId
            if (statusRef.current) statusRef.current.value = data?.status
        }
        else {
            form.resetFields()
            if (imageRef.current) imageRef.current.files = null
        }

        return () => {
            setImage({ name: "Click to Upload Image", value: "" })
            if (imageRef.current) imageRef.current.files = null
        }
    }, [data, form])

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        const file = e?.target?.files![0]
        setImage((prev) => ({ ...prev, name: file.name }))
        const data = await fileUpload(file) as unknown as string
        form.setFieldValue("image", file)
        setImage(prev => ({ ...prev, value: data }))
        setLoading(false)
        setNewImage(true)
    }

    const handleSubmit = async (values: TGalleryProps) => {
        notification.info({ message: `Please wait while your request is being processed...`, key: "123" })
        setLoading(true)
        console.log({data, values})
        let res;
        try {
            const formData = new FormData()
            formData.append("title", form.getFieldValue("title") ?? "Anyagirlchild Project Image")
            formData.append("status", statusRef.current?.value as string)
            formData.append("newImage", newImage as unknown as string)
            formData.append("image", imageRef.current?.files![0] as Blob)
            if (data?.id || values.id) {
                formData.append("oldImage", data?.image as string)
                formData.append("id", data?.id as string)
                res = await updateGalleryImage(formData)
            }
            else {
                res = await createGalleryImage(formData)
            }
            if (res?.error) notification.error({ message: res?.message, key: "123" })
            else {
                notification.success({ message: res?.message, key: "123" })
                router.refresh()
                form.resetFields()
                dispatch(triggerModal({ id: undefined, open: false }))
            }
        } catch (error) {
            console.log('error', error)
            notification.error({ message: `Something went wrong. Please check your internet connection and try again.`, key: "123" })
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <Form
                form={form}
                onFinish={handleSubmit}
                className={`w-full max-w-xl flex-1 flex flex-col gap-4 overflow-hidden`}
            >
                {/* <h4 className="text-sm md:text-lg font-bold text-text p-4 border-l-4 border-secondary py-2">{data ? "Add" : "Edit"} Gallery Image</h4> */}
                <div className="flex flex-col gap-1">
                    <h4 className="w-full text-base pt-4 text-text font-semibold flex items-center gap-2">Picture: <span className="text-xs">({image.name})</span></h4>
                    <Form.Item<TGalleryProps> name="image" noStyle>
                        <label htmlFor='image' className="relative flex-1 flex flex-col md:flex-row md:items-center gap-4 cursor-pointer min-h-32">
                            <input ref={imageRef} type="file" onChange={handleFileUpload} name="image" id="image" accept='image/jpeg, image/png' className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer z-20" />
                            <div className="flex-1 relative border-2 h-40 md:h-44 w-full rounded-md overflow-hidden bg-text flex-shrink-0 grid place-items-center text-3xl md:text-4xl text-white">
                                {
                                    image.value ?
                                        <Image src={image?.value} alt={image?.name} className="min-h-40 h-full object-cover object-center" fill /> :
                                        <GrGallery />
                                }
                            </div>
                        </label>
                    </Form.Item>
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="w-[10rem] text-sm text-text font-semibold">Description:</h4>
                    <div className="flex-1 flex flex-col md:flex-row gap-2">
                        <Form.Item<TGalleryProps> name="title" noStyle className='flex-1'>
                            <TextArea style={{ background: "transparent" }} name='title' id='title' placeholder={`Description (optional)`} className='border border-background bg-white rounded-sm p-3' />
                        </Form.Item>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="w-[10rem] text-sm text-text font-semibold">Visibility:</h4>
                    <div className="flex-1 flex flex-col md:flex-row gap-2">
                        <Form.Item<TGalleryProps> name="status" noStyle className='flex-1'>
                            <select ref={statusRef} name="status" id="status" className="border border-text/50 rounded-md text-xs text-text w-full py-2 px-4 bg-white">
                                {
                                    Object.entries($Enums.ViewStatus).map(([key, value]) => (
                                        <option key={key} value={value} className="text-xs text-text bg-white px-4">{key}</option>
                                    ))
                                }
                            </select>
                        </Form.Item>
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button disabled={loading} className="button bg-danger font-semibold flex items-center gap-2">
                        {loading ? <span className='animate-spin border-2 border-white border-r-transparent rounded-full h-5 w-5 grid place-items-center'></span> : <GrGallery />}
                        {loading ? 'Processing...' : data ? 'Edit Image' : 'Upload Image'}
                    </button>
                </div>
            </Form>
        </>
    )
}
