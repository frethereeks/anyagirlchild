"use client"
import moment from "moment"
import { TableColumnsType, Tooltip } from "antd"
import { LuMessageSquareDot, LuTickets } from "react-icons/lu"

export const CONTACT_COLUMN = (): TableColumnsType<TContactProps> => ([
    {
        key: "Full Name",
        title: "Full Name",
        render: (_, val) => (
            <Tooltip
                key={val.id}
                title={val.message}
                placement="topLeft"
                trigger={["click"]}
            >
                <div title={val.message} className="flex items-center gap-2 cursor-pointer">
                    <div className={`h-8 w-8 rounded-md ${val.status === "Read" ? "bg-red-grad" : "bg-dark-grad"}  text-white text-xl grid place-items-center flex-shrink-0`}>
                        <LuMessageSquareDot />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <h4 className="flex-1 text-sm text-text font-semibold">{val.fullname}</h4>
                        <p className="text-sm text-text truncate line-clamp-1 font-medium">{val.message.slice(0, 70)}{val.message.length > 70 ? "..." : ""}</p>
                    </div>
                </div>
            </Tooltip>
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
            <p className={`text-sm capitalize ${val.status === "Read" ? 'text-secondary' : 'text-text'} font-medium`}>{val.status}</p>
        ),
    },
    {
        key: "Date",
        title: "Date",
        render: (_, val) => (
            <p className="text-sm text-text truncate line-clamp-1 font-medium">{moment(val.createdAt).fromNow()}</p>
            // <p className="text-sm text-text truncate line-clamp-1 font-medium">{moment(val.createdAt).format("DD-MM-YYYY")}</p>
        ),
    },
]) 