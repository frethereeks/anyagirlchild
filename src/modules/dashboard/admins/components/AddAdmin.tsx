import { createUser } from '@/app/action'
import { fileUpload } from '@/lib'
import { useAppDispatch } from '@/lib/features/hooks'
import { triggerModal } from '@/lib/features/reducers/siteSlice'
import { TAdminProps } from '@/types'
import { $Enums } from '@prisma/client'
import { Form, Input, notification, Select } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { GrCamera, GrUserAdmin } from 'react-icons/gr'

type TPageProps = {
    data: TAdminProps | undefined
}

export default function AddAdmin({ data }: TPageProps) {
    const [form] = Form.useForm<TAdminProps>()
    const [loading, setLoading] = useState<boolean>(false)
    const imageRef = useRef<HTMLInputElement | null>(null)
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
                firstname: data?.firstname,
                lastname: data?.lastname,
                email: data?.email,
                // createdAt: data?.createdAt,
                image: "",
                status: data.status,
            })
            setImage((prev) => ({ ...prev, value: data?.image ?? "" }))
            // if (categoryRef.current) categoryRef.current.value = data?.categoryId
        }
        else {
            form.resetFields()
            if (imageRef.current) imageRef.current.value = ""
        }

        return () => {
            setImage(prev => ({ ...prev, value: "" }))
            form.resetFields()
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
    }

    // const handleCancelImage = async () => {
    //     setImage({ name: "", value: "" })
    //     imageRef.current?.removeAttribute("files")
    // }

    const handleSubmit = async (values: TAdminProps) => {
        notification.info({ message: `Please wait while your request is being processed...`, key: "123" })
        setLoading(true)
        let res;
        try {
            const formData = new FormData()
            Object.entries(values).map(([key, value]) => {
                formData.append(key, value as string)
            })
            formData.append("image", imageRef.current?.files![0] as Blob)
            // formData.append("oldImage", data?.image as string)
            // if (values.id) {
            //     res = await updateMenu(formData)
            // }
            // else {
            res = await createUser(formData)
            // }
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
                <h4 className="text-sm md:text-lg font-bold text-text text-center p-4 border-b-4 border-secondary py-2 mb-4 px-8 w-max mx-auto">Make New Admin</h4>
                <div className="flex flex-col gap-1">
                    <Form.Item<TAdminProps> name="image" noStyle>
                        <label htmlFor='image' className="relative flex-shrink-0 grid place-items-center mx-auto">
                            <input ref={imageRef} type="file" onChange={handleFileUpload} name="image" id="image" accept='image/jpeg, image/png' className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer z-20" />
                            <div className="relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-sm overflow-hidden grid place-items-center mx-auto bg-primary/20 border border-primary/20 text-primary text-2xl md:text-4xl">
                                {data?.image === "" && image.value === "" ?
                                    <GrCamera className='text-white' />
                                    :
                                    <Image src={image?.value} alt={"Preview Image"} className="object-cover object-top" fill />
                                }
                            </div>
                            <h4 className="w-full text-xs pt-2 text-text font-semibold flex justify-center items-center gap-2"><span className="text-xs">({image.name})</span></h4>
                        </label>
                    </Form.Item>
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="text-sm text-text font-semibold">First Name:</h4>
                    <div className="flex-1 flex flex-col md:flex-row gap-2">
                        <Form.Item<TAdminProps> name="firstname" noStyle className='flex-1'>
                            <Input style={{ background: "transparent" }} type='text' placeholder={`John`} id='firstname' required className='border border-background bg-white rounded-sm p-3' />
                        </Form.Item>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="text-sm text-text font-semibold">Last Name:</h4>
                    <div className="flex-1 flex flex-col md:flex-row gap-2">
                        <Form.Item<TAdminProps> name="lastname" noStyle className='flex-1'>
                            <Input style={{ background: "transparent" }} type='text' placeholder={`Okoro`} id='lastname' required className='border border-background bg-white rounded-sm p-3' />
                        </Form.Item>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="text-sm text-text font-semibold">Email:</h4>
                    <div className="flex-1 flex flex-col md:flex-row gap-2">
                        <Form.Item<TAdminProps> name="email" noStyle className='flex-1'>
                            <Input style={{ background: "transparent" }} type='email' placeholder={`johnokoro@anyagirlchild.com`} id='email' required className='border border-background bg-white rounded-sm p-3' />
                        </Form.Item>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="text-sm text-text font-semibold">Password: {data && <span className="text-xs">(Encourage the user to change upon logging in)</span>}</h4>
                    <div className="flex-1 flex flex-col md:flex-row gap-2">
                        <Form.Item<TAdminProps> name="password" noStyle className='flex-1'>
                            <Input style={{ background: "transparent" }} type='password' placeholder={`******`} minLength={6} required id='password' className='border border-background bg-white rounded-sm p-3' />
                        </Form.Item>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="text-sm text-text font-semibold">Role:</h4>
                    <div className="flex-1 flex flex-col md:flex-row gap-2">
                        <Form.Item<TAdminProps> name="role" noStyle className='flex-1 w-full' initialValue={"ADMIN"}>
                            {/* <Select
                                options={Object.entries($Enums.Role).map(([_, value]) => ({
                                    label: value,
                                    value
                                }))}
                                className='w-full'
                            /> */}
                            <Select
                                id="role"
                                options={
                                    Object.entries($Enums.Role).map(([key, value]) => ({
                                        label: value,
                                        value,
                                        key
                                    }))
                                }
                                className='bg-white w-full'
                                getPopupContainer={(triggerNode) => triggerNode.parentElement!}
                            />
                            {/* <select
                                ref={roleRef}
                                id='role'
                                style={{ border: "1px solid #888", color: "#aaa", padding: ".51rem" }}
                                className='relative z-40 bg-background rounded-md w-full cursor-pointer'
                                onChange={(e) => {
                                    form.setFieldValue("role", e.target.value as unknown as $Enums.Role)
                                }}
                                required
                            >
                                <optgroup label='User Right'>

                                    {
                                        Object.entries($Enums.Role).reverse().map(([key, value]) => value === "ROOT" ? null : <option key={key} className='relative capitalize bg-background text-xs md:text-sm' value={value}>{value} ({value === "ADMIN" ? 'can create, edit and delete' : 'can only preview'})</option>)
                                    }
                                </optgroup>
                            </select> */}
                        </Form.Item>
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button disabled={loading} className="button bg-danger font-semibold flex items-center gap-2">
                        {loading ? <span className='animate-spin border-2 border-white border-r-transparent rounded-full h-5 w-5 grid place-items-center'></span> : <GrUserAdmin />}
                        {loading ? 'Processing...' : data ? 'Edit Account' : 'Create Account'}
                    </button>
                </div>
            </Form>
        </>
    )
}
