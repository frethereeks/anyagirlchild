"use client"
import { ChangeEvent, useEffect, useState } from 'react'
import { TbSend2 } from "react-icons/tb";
import { TCommentProps } from '@/types';
import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { FaCheck } from 'react-icons/fa6';

export default function CommentForm({ loading, handlePostComment, data }: { loading: boolean, handlePostComment: (data: TCommentProps) => Promise<void>, data: TCommentProps | undefined }) {
    const [form] = useForm<TCommentProps>()

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                id: data?.id,
                fullname: data?.fullname,
                text: data?.text,
                email: data?.email,
            })
        }
        else {
            // Reset the Form 
            form.resetFields()
            // Check if the user has previously checked "remember me", extract the values from localStorage and populate the form with their fullname and email
            if (typeof window !== null) {
                const previousData = localStorage.getItem("anyagirlchild_formdata")
                if (previousData) {
                    const details = JSON.parse(previousData!)
                    form.setFieldsValue({
                        fullname: details?.fullname ?? "",
                        email: details?.email ?? ""
                    })
                }
            }
        }
    }, [data])

    const handleRemember = async (e: ChangeEvent<HTMLInputElement>) => {
        console.log({ remember: e.target.value })
        if (e.target.value === "on") {

        }
    }

    return (
        <>
            <Form
                form={form}
                onFinish={handlePostComment}
                className="flex flex-col gap-4 rounded-md overflow-hidden bg-white min-h-48"
            >
                <Form.Item<TCommentProps> noStyle name="id">
                    <Input type="hidden" placeholder={"id"} className='scale-100' />
                </Form.Item>
                <div className="grid md:grid-cols-2 gap-4">
                    <Form.Item<TCommentProps> noStyle name="fullname">
                        <Input type="text" placeholder={"Full Name"} required className='flex flex-col w-full text-justify text-sm text-text border-none rounded-sm outline-none ring-0 p-4 bg-white' />
                    </Form.Item>
                    <Form.Item<TCommentProps> noStyle name="email">
                        <Input type="email" placeholder={"youremail@mail.com"} required className='flex flex-col w-full text-justify text-sm text-text border-none rounded-sm outline-none ring-0 p-4 bg-white' />
                    </Form.Item>
                </div>
                <div className="pb-2 relative flex flex-col gap-2">
                    <Form.Item<TCommentProps> noStyle name="text">
                        <TextArea required placeholder='Type a message...' rows={7} className="flex flex-col w-full text-justify text-text border-none rounded-sm outline-none ring-0 min-h-20 h-28 resize-none p-4 bg-white"></TextArea>
                    </Form.Item>
                    <label htmlFor='remember' className="relative -translate-y-0 flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="remember" id="remember" className="hiddena peer" onChange={handleRemember} />
                        <div className="h-4 w-4 grid place-items-center rounded-sm border border-text/20 bg-white hover:bg-backdrop peer-checked:bg-secondary hover:peer-checked:bg-secondary cursor-pointer flex-shrink-0"> <FaCheck className='text-[.65rem] text-white' />
                        </div>
                        <p className="flex-1 text-text text-xs font-grotestk">Save my email and password in this browser for future comments</p>
                    </label>
                </div>
                <div className="flex justify-between gap-4 py-2 -mt-2">
                    <button disabled={loading} type='submit' className="group flex items-center gap-2 text-sm md:text-base text-white font-grotesk bg-primary py-1.5 px-4 rounded-md w-max">
                        {loading ? <span className='animate-spin border-2 border-white border-r-transparent rounded-full h-5 w-5 grid place-items-center'></span> : <TbSend2 className='text-inherit group-hover:-translate-x-0.5' />}
                        {loading ? 'Processing...' : data ? 'Edit Comment' : 'Post Comment'}
                    </button>
                </div>
            </Form>
        </>
    )
}
