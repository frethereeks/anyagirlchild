/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client"
import React, { useEffect, useRef, useState } from 'react'
// import parse from 'html-react-parser';
// import DOMPurify from 'dompurify';
import { App } from 'antd'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { MdOutlineDelete, MdOutlineModeEditOutline } from 'react-icons/md'
import moment from 'moment'
import CommentForm from './CommentForm'
import { TCommentProps, TBlogItemProp, TReplyProps } from '@/types'
import { createComment, createReply, updateComment } from '@/app/action'
import { useForm } from 'antd/es/form/Form'
import ReplyForm from './ReplyForm'
import { DeleteModal } from '@/modules/shared'
import useSWR from "swr"
import { fetcher } from '@/lib'
import { IoRefreshCircleOutline } from 'react-icons/io5'

export default function CommentSection({ blog }: { blog: TBlogItemProp | undefined }) {
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedData, setSelectedData] = useState<TCommentProps>()
    const [selectedReply, setSelectedReply] = useState<TReplyProps>()
    const commentContainerRef = useRef<HTMLDivElement | null>(null)
    const [activeTab, setActiveTab] = useState<"Comment" | "AllComments">("Comment")
    const router = useRouter()
    const { data } = useSession()
    const [form] = useForm<TCommentProps>()
    const [replyForm] = useForm<TReplyProps>()
    const [showReply, setShowReply] = useState<string | null>(null)
    const [editableId, setEditableId] = useState<string | undefined>(undefined)
    const [deletingId, setDeletingId] = useState<React.Key[]>([])
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    // const [editableId, setEditableId] = useState<{id: string | undefined, type: "comment" | "reply"}>({id: undefined, type: "comment"})
    const {notification} = App.useApp()

    const { data: blogComments, isLoading, mutate } = useSWR<TCommentProps[]>(`/api/comments?blogId=${blog?.id}`, fetcher, {
        revalidateOnFocus: true,
        refreshInterval: 1000
    })

    useEffect(() => {
        setSelectedData(blogComments?.find(el => el.id === selectedData?.id!))
        setSelectedReply(selectedReply)
        //eslint-disable-next-line
    }, [selectedData])
    
    // const fetchComment = async (blogId: string) => {
    //     try {
    //         const request = await fetch(`${config.APP_PRIMARY_API_BASE_URL}/api/comments?blogId=${blogId}`, {
    //             next: { revalidate: 10 }
    //         })
    //         const res = await request.json() as unknown as { error: boolean, message: string, data: TCommentProps | undefined }
    //         if (res.error) {
    //             notification.error({ message: res?.message, key: "123" })
    //         }
    //         else {
    //             const data = res?.data as TCommentProps[] | undefined
    //             console.log("comments (re)fetched...")
    //             setAllComments(data || [])
    //         }
    //     } catch (error) {
    //         console.log({ error })
    //     }
    // }

    // useEffect(() => {
    //     if(blog?.id) fetchComment(blog.id)
    // }, []);

    const handlePostComment = async (data: TCommentProps) => {
        setLoading(true)
        notification.info({ message: 'Posting comment...', key: "123" })
        try {
            const { email, fullname, text } = data
            // If the commentEditing id is not empty, then invoke the updateComment funciton else, invoke the createComment function
            const res = data.id ? await updateComment({ id: data.id, email, fullname, text }) : await createComment({ blogId: blog?.id!, text, email, fullname })
            if (res?.error) {
                notification.error({ message: res?.message, key: "123" })
            }
            else {
                notification.success({ message: res?.message, key: "123" })
                if (res.data) {
                    console.log("We are here for the new comment...")
                    setEditableId(res?.data?.id)
                    mutate()
                }
                else {
                    console.log("Nope! Not a new comment and therefore cannot be edited by normal users...")
                    setEditableId(undefined)
                    setSelectedData(undefined)
                }
                router.refresh()
                form.resetFields()
                setActiveTab("AllComments")
            }
        } catch (error) {
            console.log('error', error)
            notification.error({ message: 'Unable to post your comment. Please, check your internet connection and try again', key: "123" })
        }
        finally {
            setLoading(false)
            router.refresh()
            mutate()
        }
    }

    const handleToggleEditing = (commentId: string) => {
        const comment = blogComments?.find(el => el.id === commentId)
        setSelectedData(comment)
        setActiveTab("Comment")
    }

    // const handleToggleEditReply = (commentId: string) => {
    //     const comment = blogComments?.find(el => el.id === commentId)
    //     setSelectedData(comment)
    //     setActiveTab("Comment")
    // }

    const handleCommentDelete = async (id: string) => {
        setDeletingId([id])
        setDeleteModal(true)
    }

    const handlePostReply = async (data: TReplyProps) => {
        setLoading(true)
        notification.info({ message: 'Posting reply...', key: "123" })
        try {
            const { commentId, email, fullname, text } = data
            const res = await createReply({ commentId: commentId!, text, email, fullname })
            if (res?.error) notification.error({ message: res?.message, key: "123" })
            else {
                notification.success({ message: res?.message, key: "123" })
                router.refresh()
                mutate()
                replyForm.resetFields()
                setShowReply(null)
            }
        } catch (error) {
            console.log('error', error)
            notification.error({ message: 'Unable to process request. Please, check your internet connection and try again', key: "123" })
        }
        finally {
            setLoading(false)
            router.refresh()
        }
    }



    return (
        <>
            <DeleteModal key={"802348789234"} openModal={deleteModal} closeModal={setDeleteModal} data={deletingId} table='comment' resetSelected={() => setDeletingId([])} />
            <aside className="max-w-screen-lg mx-auto flex flex-col p-4 pt-0 relative">
                <div className="flex py-2 pb-4">
                    <p onClick={() => setActiveTab("Comment")} className={`w-max flex items-center gap-2 p-2 px-4 text-sm text-text font-semibold cursor-pointer relative border-b-2 ${activeTab === "Comment" ? 'border-b-danger' : 'border-b-transparent'}`}>Write a Comment </p>
                    <p onClick={() => { setActiveTab("AllComments")}} className={`w-max flex items-center gap-2 p-2 px-4 text-sm text-text font-semibold cursor-pointer relative border-b-2 ${activeTab === "Comment" ? 'border-b-transparent' : 'border-b-danger'}`}>All Comments <span className="-mt-1 text-xxsmall text-white bg-danger h-5 w-5 rounded-full grid place-items-center">{blogComments?.length ?? 0}</span></p>
                </div>
                <div className={`max-w-screen-md mr-auto flex-col gap-2 ${activeTab === "AllComments" ? 'flex' : 'hidden'}`}>
                    <div className="flex flex-col gap-3 min-h-0 overflow-y-hidden peer-checked:min-h-full peer-checked:overflow-y-visible">
                        {
                            isLoading ? 
                                <div className='flex gap-1'>
                                    <p className="text-sm text-text">Fetching Comments...</p>
                                    <button className='w-max text-xs text-text font-semibold cursor-pointer hover:underline'><IoRefreshCircleOutline /></button>
                                </div>
                                :
                            Array.isArray(blogComments) && blogComments?.map((item) => (
                                <figure key={item.id} className="flex gap-2">
                                    <div className="relative h-6 w-6 md:h-8 md:w-8 rounded-full bg-primary overflow-hidden flex-shrink-0"></div>
                                    <div className="flex-1 flex flex-col gap-4">
                                        <div className="flex-1 flex flex-col gap-1.5">
                                            <div className="flex justify-between gap-4 translate-y-1 pb-2">
                                                <div className="flex flex-wrap gap-2">
                                                    <h5 className="text-text text-sm md:text-base font-semibold font-grotesk">{item.fullname}</h5>
                                                    <h5 className="text-text text-sm md:text-base font-semibold font-grotesk"> • ({item.email})</h5>
                                                </div>
                                                <p className="text-text/60 text-xs font-grotesk select-none">{moment(item.createdAt).fromNow()}</p>
                                            </div>
                                            <p className="group relative after:absolute after:-top-[2px] after:-left-[6px] after:border-[6px] after:border-transparent after:border-t-[#5bbeb4] after:skew-x-[40deg] after:rotate-[40deg] bg-[#5bbeb4] rounded-md p-2 text-white text-sm text-justify flex gap-2">
                                                {
                                                    // If the logged in user is the owner of the comment, give him the option to edit his comment
                                                    // TODO: Make this time-base (i.e. vailable only after x number of minutes)
                                                    // user && +(user?.id) === item.userId &&
                                                    editableId === item.id || data?.user.role === "Owner" ?
                                                        <div className="z-10 absolute -top-4 -right-0 hidden group-hover:flex gap-2">
                                                            <span onClick={() => handleCommentDelete(item.id)} className="flex-shrink-0 cursor-pointer w-6 h-6 grid place-items-center bg-danger text-white text-lg rounded-full border border-danger">
                                                                <MdOutlineDelete />
                                                            </span>
                                                            <span onClick={() => handleToggleEditing(item.id)} className="flex-shrink-0 cursor-pointer w-6 h-6 grid place-items-center bg-white text-secondary text-lg rounded-full border border-secondary">
                                                                <MdOutlineModeEditOutline />
                                                            </span>
                                                        </div>
                                                        : ""

                                                }
                                                {item.text}
                                            </p>
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex flex-wrap gap-2">
                                                    <div className="flex items-center gap-4 pl-2">
                                                        {editableId === item.id || data?.user.role === "Owner" ?
                                                            <p onClick={() => handleToggleEditing(item.id)} className="text-xs text-text font-semibold cursor-pointer">Edit</p> : ""
                                                        }
                                                        <span className="text-danger">•</span>
                                                        <button onClick={() => {
                                                            if (showReply === item.id.toString()) {
                                                                setShowReply(null)
                                                            }
                                                            else setShowReply(`${item.id.toString()}`)
                                                            setSelectedData(undefined)
                                                        }}
                                                            className="w-max text-xs text-text font-semibold cursor-pointer hover:underline" > Reply</button>
                                                    </div>
                                                    {/* <p onClick={() => setOpenModal({ state: true, id: item.id, text: item.text })} className="w-max text-xs text-text font-semibold cursor-pointer hover:underline">Like</p> */}
                                                    {/* </div> */}
                                                    {/* <input type="checkbox" ref={inputRef} name={`reply`} id={`reply-${item.id}`} className={`peer hidden`} /> */}
                                                    <div className={`w-full relative overflow-hidden ${showReply === item.id ? 'overflow-visible max-h-[1000%]' : 'max-h-0'} `}>
                                                        <ReplyForm key={item.id} commentId={item.id} data={selectedReply} handlePostReply={handlePostReply} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            item?.replies?.map(reply => (
                                                <figure key={reply.id} className="flex gap-2 pl-2">
                                                    <div className="relative h-6 w-6 md:h-8 md:w-8 rounded-full bg-primary overflow-hidden flex-shrink-0"></div>
                                                    <div className="flex-1 flex flex-col gap-4">
                                                        <div className="flex justify-between gap-4 translate-y-1">
                                                            <div className="flex flex-wrap gap-2">
                                                                <h5 className="text-text text-sm md:text-base font-semibold font-grotesk">{reply.fullname}</h5>
                                                                <h5 className="text-text text-sm md:text-base font-semibold font-grotesk"> • ({reply.email})</h5>
                                                            </div>
                                                            <p className="text-text/60 text-xs font-medium font-grotesk select-none">{moment(reply.createdAt).fromNow()}</p>
                                                        </div>
                                                        <p className="relative after:absolute after:-top-[2px] after:-left-[6px] after:border-[6px] after:border-transparent after:border-t-backdrop after:skew-x-[40deg] after:rotate-[40deg] border-text/20 bg-backdrop rounded-lg rounded-tl-none p-2 text-text/80 text-sm text-justify">
                                                            {reply.text}
                                                        </p>
                                                    </div>
                                                </figure>
                                            ))
                                        }
                                    </div>
                                </figure>
                            ))
                        }
                    </div>
                </div>
                <div ref={commentContainerRef} className={`max-w-screen-md flex-col gap-2 ${activeTab === "Comment" ? 'flex' : 'hidden'}`}>
                    <CommentForm handlePostComment={handlePostComment} data={selectedData} loading={loading} />
                </div>
            </aside>
        </>
    )
}
