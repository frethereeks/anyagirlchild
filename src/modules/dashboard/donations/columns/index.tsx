"use client"
import moment from "moment"
import { TableColumnsType, Tooltip } from "antd"
import { LuTickets } from "react-icons/lu"

export const DONATION_COLUMN = (): TableColumnsType<TDonationProps> => ([
    {
        key: "Full Name",
        title: "Full Name",
        render: (_, val) => (
            <div className="flex items-center gap-2">
                <div className={`h-8 w-8 rounded-md ${val.status === "success" ? 'bg-purple-grad' : val.status === "failed" ? "bg-red-grad" : "bg-dark-grad"}  text-white text-xl grid place-items-center flex-shrink-0`}>
                    <LuTickets />
                </div>
                <h4 className="flex-1 text-sm text-text font-semibold">{val.fullname}</h4>
            </div>
        ),
    },
    {
        key: "Amount",
        title: "Amount",
        render: (_, val) => (
            <p className="text-sm text-text font-medium">&#8358;{val.amount.toLocaleString()}</p>
        ),
    },
    {
        key: "Status",
        title: "Status",
        render: (_, val) => (
            <p className={`text-sm capitalize ${val.status === "success" ? 'text-secondary' : val.status === "failed" ? 'text-danger' : 'text-text'} font-medium`}>{val.status}</p>
        ),
    },
    {
        key: "Purpose",
        title: "Purpose",
        render: (_, val) => (
            <Tooltip
                key={val.id}
                // trigger={["hover", "focus"]}
                title={val.purpose}
                placement="bottomLeft"
            >
                <p className="text-sm text-text truncate line-clamp-1 font-medium">{val.purpose.slice(0, 40)}{val.purpose.length > 40 ? "..." : ""}</p>
            </Tooltip>
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