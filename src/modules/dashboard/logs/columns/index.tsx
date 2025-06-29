"use client"
import moment from "moment"
import { TableColumnsType } from "antd"
import { TLoggerProps } from "@/types"
import { useAppDispatch } from "@/lib/features/hooks"
import { triggerModal } from "@/lib/features/reducers/siteSlice"
import { $Enums } from "@prisma/client"
import { useRouter } from 'next/navigation';
import { updateEntity } from '@/app/action';

export const LOGGER_COLUMN = (): TableColumnsType<TLoggerProps> => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleUpdateContact = async (id: string, status: $Enums.ContactStatus) => {
        try {
            await updateEntity(JSON.stringify([id]), status, "logger")
        } catch (error) {
            console.log('Unable to update log view status', { error })
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
                    title={`User ID: ${val.userId}`}
                    className="flex items-center gap-2 py-1.5 relative"
                >

                    <span className={`h-4 w-4 rounded-full ${val.error ? "bg-red-grad" : "bg-green-grad"} flex-shrink-0 -rotate-12`}></span>
                    <div className="flex-1 flex flex-col">
                        <h4 className="flex-1 text-sm text-text font-semibold leading-none">{val.fullname}</h4>
                    </div>
                </div>
            ),
        },
        {
            key: "Activity",
            title: "Activity",
            render: (_, val) => (
                <p
                    title={val.message}
                    onClick={() => {
                        // Trigger the view message modal
                        dispatch(triggerModal({ id: val.id, open: true }))
                        // Change the status of the message to from "Unread" to "Read" if it is the first time this unread message is being viewed
                        if (val.status === "Unread") {
                            handleUpdateContact(val.id, "Read")
                        }
                    }}
                    className="text-sm text-text truncate line-clamp-1 cursor-pointer font-medium leading-none"
                >{val.message.slice(0, 70)}{val.message.length > 70 ? "..." : ""}</p>
            ),
        },
        {
            key: "Status",
            title: "Status",
            render: (_, val) => (
                <p className={`text-sm capitalize ${val.status === "Read" ? 'text-secondary' : 'text-text'} font-medium`}>{val.status}</p>
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