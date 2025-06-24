"use client"
import { useEffect, useState } from 'react'
import { TbSend2 } from "react-icons/tb";
import { TReplyProps } from '@/types';
import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';

export default function ReplyForm({ handlePostReply, data, commentId }: { handlePostReply: (data: TReplyProps) => Promise<void>, data: TReplyProps | undefined, commentId: string }) {
    const [form] = useForm<TReplyProps>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                commentId: data?.commentId,
                id: data?.id,
                fullname: data?.fullname,
                text: data?.text,
                email: data?.email,
            })
        }
        else {
            form.resetFields()
        }

        return () => {
            // form.resetFields()
        }
        //eslint-disable-next-line
    }, [data])

    const handleSubmit = async (data: TReplyProps) => {
        setLoading(true)
        try{
            await handlePostReply({...data, commentId})
            form.resetFields()
        }
        catch (err) {
            console.log({err})
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <>
            <Form
                form={form}
                onFinish={handleSubmit}
                className="flex flex-col gap-4 rounded-md overflow-hidden bg-white min-h-48"
            >
                <Form.Item<TReplyProps> noStyle name="id" className='scale-100 h-0 w-0 overflow-hidden'>
                    <Input type="hidden" placeholder={"id"} className='scale-100 h-0 w-0' />
                </Form.Item>
                <Form.Item<TReplyProps> noStyle name="commentId" className='scale-100 h-0 w-0 overflow-hidden'>
                    <Input type="hidden" placeholder={"commentId"} value={commentId} className='scale-100 h-0 w-0' />
                </Form.Item>
                <div className="grid md:grid-cols-2 gap-4">
                    <Form.Item<TReplyProps> noStyle name="fullname">
                        <Input type="text" placeholder={"Full Name"} required className='flex flex-col w-full text-justify text-sm text-text border-none rounded-sm outline-none ring-0 p-4 bg-white' />
                    </Form.Item>
                    <Form.Item<TReplyProps> noStyle name="email">
                        <Input type="email" placeholder={"youremail@mail.com"} required className='flex flex-col w-full text-justify text-sm text-text border-none rounded-sm outline-none ring-0 p-4 bg-white' />
                    </Form.Item>
                </div>
                <div className="pb-2 relative">
                    <Form.Item<TReplyProps> noStyle name="text">
                        <TextArea required placeholder='Type a message...' rows={7} className="flex flex-col w-full text-justify text-text border-none rounded-sm outline-none ring-0 min-h-20 h-28 resize-none p-4 bg-white"></TextArea>
                    </Form.Item>
                </div>
                <div className="flex justify-between gap-4 pb-2 -mt-2">
                    <button disabled={loading} type='submit' className="group flex items-center gap-2 text-sm md:text-base text-white bg-primary py-1 px-4 rounded-md w-max">
                        {loading ? <span className='animate-spin border-2 border-white border-r-transparent rounded-full h-5 w-5 grid place-items-center'></span> : <TbSend2 className='text-inherit group-hover:-translate-x-0.5' />}
                        {loading ? 'Processing...' : data ? 'Edit Reply' : 'Create Reply'}
                    </button>
                </div>
            </Form>
        </>
    )
}
