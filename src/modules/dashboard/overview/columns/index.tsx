// "use client"
import moment from "moment"
import { TableColumnsType, Tooltip } from "antd"
import Image from "next/image"
import { ASSET_URL } from "@/assets"
import { LuTickets } from "react-icons/lu"

export const ADMIN_COLUMN = (): TableColumnsType<TAdminProps> => ([
    {
        key: "Full Name",
        title: "Full Name",
        render: (_, val) => (
            <div className="flex items-center gap-2">
                <div className="relative h-10 w-10 rounded-sm bg-green-grad flex-shrink-0">
                    <Image src={val.image ?? ASSET_URL["little_child"]} alt={val.firstname} className="object-cover object-top" fill />
                </div>
                <h4 className="flex-1 text-sm text-text font-semibold">{val.firstname} {val.lastname}</h4>
            </div>
        ),
    },
    {
        key: "Email",
        title: "Email",
        render: (_, val) => (
            <p className="text-sm text-text font-medium">&#8358;{val.email}</p>
        ),
    },
    {
        key: "Access",
        title: "Access",
        render: (_, val) => (
            <p className={`text-sm py-1.5 px-3 rounded-sm ${val.role === "Root" ? 'text-sky-500 bg-sky-50' : 'text-dark-text bg-background'} font-medium`}>&#8358;{val.status}</p>
        ),
    },
    {
        key: "Status",
        title: "Status",
        render: (_, val) => (
            <p className={`text-sm ${val.status === "Active" ? 'text-secondary' : val.status === "Disabled" ? 'text-danger' : 'text-text'} font-medium`}>&#8358;{val.status}</p>
        ),
    },
    {
        key: "Last Seen",
        title: "Last Seen",
        render: (_, val) => (
            <p className="text-sm text-text truncate line-clamp-1 font-medium">{moment(val.lastLogin).format("DD-MM-YYYY")}</p>
        ),
    },
    {
        key: "Date",
        title: "Date",
        render: (_, val) => (
            <p className="text-sm text-text truncate line-clamp-1 font-medium">{moment(val.createdAt).format("DD-MM-YYYY")}</p>
        ),
    },
])

