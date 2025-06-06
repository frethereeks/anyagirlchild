"use client"
import moment from "moment"
import { TableColumnsType } from "antd"
import { TContactProps } from "@/types"
import { useAppDispatch } from "@/lib/features/hooks"
import { triggerModal } from "@/lib/features/reducers/siteSlice"
import { $Enums } from "@prisma/client"
import { useRouter } from 'next/navigation';
import { updateEntity } from '@/app/action';

export const CONTACT_COLUMN = (): TableColumnsType<TContactProps> => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleUpdateContact = async (id: string, status: $Enums.ContactStatus) => {
        try {
            await updateEntity(JSON.stringify([id]), status, "contact")
        } catch (error) {
            console.log({ error })
        }
        finally {
            router.refresh()
        }
    }
    return ([
        {
            key: "Message Details",
            title: "Message Details",
            render: (_, val) => (
                <div
                    title={val.message}
                    onClick={() => {
                        // Trigger the view message modal
                        dispatch(triggerModal({ id: val.id, open: true }))
                        // Change the status of the message to from "UNREAD" to "READ" if it is the first time this unread message is being viewed
                        if (val.status === "UNREAD") {
                            handleUpdateContact(val.id, "READ")
                        }
                    }}
                    className="flex items-center gap-2 cursor-pointer py-1.5 relative"
                >
                    <div className={`h-8 w-8 rounded-full ${val.status === "READ" ? "bg-green-grad" : "bg-dark-grad"}  text-white text-xl grid place-items-center flex-shrink-0 -rotate-12`}>
                        {/* <FaRegCircleUser /> */}
                        <p className="text-lg font-black -tracking-[0.25rem]">{val.fullname.split(" ")[0][0]} {val.fullname.split(" ")[1][0]}</p>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <h4 className="flex-1 text-sm text-text font-semibold leading-none">{val.fullname}</h4>
                        <p className="text-sm text-text truncate line-clamp-1 font-medium leading-none">{val.message.slice(0, 70)}{val.message.length > 70 ? "..." : ""}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "Email",
            title: "Email",
            render: (_, val) => (
                <p className="text-sm text-text font-medium">{val.email.toLocaleString()}</p>
            ),
        },
        {
            key: "Status",
            title: "Status",
            render: (_, val) => (
                <p className={`text-sm capitalize ${val.status === "READ" ? 'text-secondary' : 'text-text'} font-medium`}>{val.status}</p>
            ),
        },
        {
            key: "Date",
            title: "Date",
            render: (_, val) => (
                <p className="text-sm text-text truncate line-clamp-1 font-medium">{moment(val.createdAt).fromNow()}</p>
            ),
        }
    ])
}