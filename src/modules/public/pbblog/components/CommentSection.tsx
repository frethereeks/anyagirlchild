"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Parser from "html-react-parser"
import { notification } from 'antd'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { MdOutlineDelete, MdOutlineModeEditOutline } from 'react-icons/md'
import moment from 'moment'
import CommentForm from './CommentForm'
import { TCommentProps, TBlogItemProp, TReplyProps } from '@/types'
import { createComment, createReply, fetchComments, updateComment } from '@/app/action'
import { useForm } from 'antd/es/form/Form'
import ReplyForm from './ReplyForm'
import { DeleteModal } from '@/modules/shared'

const fetchBlogComments = async (blogId: string) => {
    const res = await fetchComments({ blogId })
    const data = await res?.data as TCommentProps[]
    return { data }
}

let timeManager: NodeJS.Timeout | undefined = undefined
let commentManager: NodeJS.Timeout | undefined = undefined

export default function CommentSection({ blog }: { blog: TBlogItemProp | undefined }) {
    const [loading, setLoading] = useState<boolean>(false)
    const [allComments, setAllComments] = useState<TCommentProps[]>(blog?.comments || [])
    const [selectedData, setSelectedData] = useState<TCommentProps>()
    const [selectedReply, setSelectedReply] = useState<TReplyProps>()
    const commentContainerRef = useRef<HTMLDivElement | null>(null)
    const [activeTab, setActiveTab] = useState<"Comment" | "AllComments">("Comment")
    const router = useRouter()
    const { data } = useSession()
    const [form] = useForm<TCommentProps>()
    const [replyForm] = useForm<TReplyProps>()
    const [editableId, setEditableId] = useState<string | undefined>(undefined)
    const [deletingId, setDeletingId] = useState<React.Key[]>([])
    const [deleteModal, setDeleteModal] = useState<boolean>(false)


    const fetchComment = useCallback(async () => {
        const res = await fetchBlogComments(blog?.id!)
        setAllComments(res.data || [])
    }, [blog?.id])

    useEffect(() => {
        setSelectedData(allComments.find(el => el.id === selectedData?.id!))
    }, [selectedData])

    useEffect(() => {
        clearInterval(commentManager)
        // refetch comment after every 15seconds
        commentManager = setInterval(() => {
            fetchComment()
        }, 15000)

        return () => {
            clearInterval(commentManager)
        };
    }, [fetchComment]);

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
                data.id ? setEditableId(res?.data?.id) : setEditableId(undefined)
                router.refresh()
                form.resetFields()
                setActiveTab("AllComments")
            }
        } catch (error) {
            notification.error({ message: 'Unable to post your comment. Please, check your internet connection and try again', key: "123" })
        }
        finally {
            setLoading(false)
            router.refresh()
        }
    }

    const handleToggleEditing = (commentId: string) => {
        const comment = allComments.find(el => el.id === commentId)
        setSelectedData(comment)
        setActiveTab("Comment")
    }

    const handleToggleEditReply = (commentId: string) => {
        const comment = allComments.find(el => el.id === commentId)
        setSelectedData(comment)
        setActiveTab("Comment")
    }

    const handleCommentDelete = async (id: string) => {
        setDeletingId([id])
        setDeleteModal(true)
    }

    const handlePostReply = async (data: TReplyProps) => {
        setLoading(true)
        notification.info({ message: 'Posting reply...', key: "123" })
        // let res;
        try {
            const { commentId, email, fullname, text } = data
            // const commentId = selectedReply.id
            // if (data.id !== "") {
            // res = await updateReply({ id: data?.id!, text: data?.text, email: data?.email, fullname: data?.fullname })
            // }
            const res = await createReply({ commentId: commentId!, text, email, fullname })
            if (res?.error) notification.error({ message: res?.message, key: "123" })
            else {
                notification.success({ message: res?.message, key: "123" })
                router.refresh()
                replyForm.resetFields()
            }
        } catch (error) {
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
            <aside className="container mx-auto flex flex-col p-4 pt-0 relative">
                <div className="flex py-2 pb-4">
                    <p onClick={() => setActiveTab("Comment")} className={`w-max flex items-center gap-2 p-2 px-4 text-sm text-text font-semibold cursor-pointer relative border-b-2 ${activeTab === "Comment" ? 'border-b-danger' : 'border-b-transparent'}`}>Write a Comment </p>
                    <p onClick={() => setActiveTab("AllComments")} className={`w-max flex items-center gap-2 p-2 px-4 text-sm text-text font-semibold cursor-pointer relative border-b-2 ${activeTab === "Comment" ? 'border-b-transparent' : 'border-b-danger'}`}>All Comments <span className="-mt-1 text-xxsmall text-white bg-danger h-5 w-5 rounded-full grid place-items-center">{allComments.length ?? 0}</span></p>
                </div>
                <div className={`flex-col gap-2 ${activeTab === "AllComments" ? 'flex' : 'hidden'}`}>
                    <div className="flex flex-col gap-3 min-h-0 overflow-y-hidden peer-checked:min-h-full peer-checked:overflow-y-visible">
                        {
                            allComments?.map(item => (
                                <figure key={item.id} className="flex gap-2">
                                    <div className="relative h-6 w-6 md:h-8 md:w-8 rounded-full bg-primary overflow-hidden flex-shrink-0"></div>
                                    <div className="flex-1 flex flex-col gap-4">
                                        <div className="flex-1 flex flex-col gap-1.5">
                                            <div className="flex justify-between gap-4 translate-y-1 pb-2">
                                                <h5 className="text-text text-sm md:text-base font-semibold font-mulish select-none">{item.fullname}</h5>
                                                <p className="text-text/60 text-xs font-mulish select-none">{moment(item.createdAt).fromNow()}</p>
                                            </div>
                                            <p className="group relative after:absolute after:-top-[2px] after:-left-[6px] after:border-[6px] after:border-transparent after:border-t-[#5bbeb4] after:skew-x-[40deg] after:rotate-[40deg] bg-[#5bbeb4] rounded-md p-2 text-white text-sm text-justify flex gap-2">
                                                {
                                                    // If the logged in user is the owner of the comment, give him the option to edit his comment
                                                    // TODO: Make this time-base (i.e. vailable only after x number of minutes)
                                                    // user && +(user?.id) === item.userId &&
                                                    editableId || data?.user.role === "ROOT" ?
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
                                                        <span className="text-danger">•</span>
                                                        <label onClick={() => setSelectedData(undefined)} htmlFor={`reply-${item.id}`} className="w-max text-xs text-text font-semibold cursor-pointer hover:underline">Reply</label>
                                                    </div>
                                                    {/* <p className="text-xs text-primary font-semibold cursor-pointer">Like</p> */}
                                                    {/* <p onClick={() => setOpenModal({ state: true, id: item.id, text: item.text })} className="w-max text-xs text-text font-semibold cursor-pointer hover:underline">Like</p> */}
                                                    {/* </div> */}
                                                    <input type="checkbox" name={`reply`} id={`reply-${item.id}`} className={`peer hidden`} />
                                                    <div className={`w-full relative overflow-hidden max-h-0 peer-checked:overflow-visible peer-checked:max-h-[1000%]`}>
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
                                                            <h5 className="text-text text-sm md:text-base font-semibold font-mulish select-none">{reply.fullname}</h5>
                                                            <p className="text-text/60 text-xs font-medium font-mulish select-none">{moment(reply.createdAt).fromNow()}</p>
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
                <div ref={commentContainerRef} className={`flex-col gap-2 ${activeTab === "Comment" ? 'flex' : 'hidden'}`}>
                    <CommentForm handlePostComment={handlePostComment} data={selectedData} loading={loading}  />
                </div>
            </aside>
        </>
    )
}
