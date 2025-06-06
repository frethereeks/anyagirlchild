"use client"
import moment from "moment"
import { TableColumnsType, Tooltip } from "antd"
import { LuTickets } from "react-icons/lu"
import { useAppDispatch } from "@/lib/features/hooks";
// import { AiOutlineMore } from "react-icons/ai";
import { triggerModal } from "@/lib/features/reducers/siteSlice";
import { TDonationProps } from "@/types";

export const DONATION_COLUMN = (): TableColumnsType<TDonationProps> => {
    const dispatch = useAppDispatch()
    return ([
        {
            key: "Full Name",
            title: "Full Name",
            render: (_, val) => (
                <div className="flex items-center gap-2 py-2">
                    <div className={`h-8 w-8 rounded-md ${val.status === "SUCCESSFUL" ? 'bg-green-grad' : val.status === "FAILED" ? "bg-red-grad" : "bg-dark-grad"}  text-white text-xl grid place-items-center flex-shrink-0`}>
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
                <p className="text-sm text-text font-medium">{val.currency}{val.amount.toLocaleString()}</p>
            ),
        },
        {
            key: "Status",
            title: "Status",
            render: (_, val) => (
                <p className={`text-sm capitalize ${val.status === "SUCCESSFUL" ? 'text-secondary' : val.status === "FAILED" ? 'text-danger line-through' : 'text-text'} font-medium`}>{val.status}</p>
            ),
        },
        {
            key: "Purpose",
            title: "Purpose",
            render: (_, val) => (
                <Tooltip
                    key={val.id}
                    trigger={["hover", "focus"]}
                    title={val.message}
                    placement="bottomLeft"
                >
                    <p onClick={() => dispatch(triggerModal({ id: val.id, open: true }))} className={`text-sm text-text truncate line-clamp-1 ${val.visiblity === "UNREAD" ? 'font-bold' : val.visiblity === "READ" ? 'font-medium' : 'font-medium'}`} title={val.message}>{val.message.slice(0, 40)}{val.message.length > 40 ? "..." : ""}</p>
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
        {
            key: "View",
            title: "View",
            render: (_, val) => (
                <span className="text-xs md:text-sm px-2 cursor-pointer mx-auto" onClick={() => dispatch(triggerModal({ id: val.id, open: true }))}>
                    {/* <AiOutlineMore className="cursor-pointer" /> */}
                    <button className="text-xs text-text underline">View</button>
                </span>
            ),
        },
    ])
}
