// "use client"
import moment from "moment"
import { TableColumnsType } from "antd"
import Image from "next/image"
import { ASSET_URL } from "@/assets"
import { TAdminProps } from "@/types"
import { useAppDispatch } from "@/lib/features/hooks"
import { triggerModal } from "@/lib/features/reducers/siteSlice"

export const ADMIN_COLUMN = (): TableColumnsType<TAdminProps> => {
    const dispatch = useAppDispatch()
    return ([
        {
            key: "Full Name",
            title: "Full Name",
            render: (_, val) => (
                <div className="flex items-center gap-2 my-1">
                    <div className="relative h-8 w-8 rounded-md overflow-hidden bg-dark-grad flex-shrink-0">
                        <Image src={val.image || ASSET_URL["little_child"]} alt={val.firstname} className="object-cover object-top" fill />
                    </div>
                    <h4 className="flex-1 text-sm text-text font-semibold">{val.firstname} {val.lastname}</h4>
                </div>
            ),
        },
        {
            key: "Email",
            title: "Email",
            render: (_, val) => (
                <p className="text-sm text-text font-medium">{val.email}</p>
            ),
        },
        {
            key: "Role",
            title: "Role",
            render: (_, val) => (
                <p className={`text-left text-sm ${val.role === "Owner" ? 'text-secondary font-bold' : 'bg-transparent text-text'} py-1 rounded-sm font-medium capitalize`}>{val.role === "Owner" ? "Owner" : val.role}</p>
            ),
        },
        {
            key: "Status",
            title: "Status",
            render: (_, val) => (
                <p className={`text-left text-sm ${val.status === "Active" ? 'text-secondary' : val.status === "Suspended" ? 'text-danger' : 'text-text'} font-medium`}>{val.status}</p>
            ),
        },
        {
            key: "Created At",
            title: "Created At",
            render: (_, val) => (
                <p className="text-sm text-text truncate line-clamp-1 font-medium">{moment(val.createdAt).fromNow()}</p>
            ),
        },
        // {
        //     key: "Date",
        //     title: "Date",
        //     render: (_, val) => (
        //         <p className="text-sm text-text truncate line-clamp-1 font-medium">{moment(val.createdAt).format("DD-MM-YYYY")}</p>
        //     ),
        // },
        // {
        //     key: "Actions",
        //     title: "Actions",
        //     render: (_, val) => (
        //         <label htmlFor={`action-${val.id}`} className="relative w-full">
        //             <span className="peer text-xs md:text-sm px-2 cursor-pointer mx-auto grid place-items-center">
        //                 <AiOutlineMore className="cursor-pointer" />
        //             </span>
        //             <input type="radio" name="action" id={`action-${val.id}`} className="hidden peer" />
        //             <div className="hidden peer-checked:flex flex-col divide-y divide-slate-200 w-max rounded-md shadow-lg p-2 bg-white z-20 absolute top-1/2 right-1">
        //                 <p onClick={() => dispatch(triggerModal({ id: val.id, open: true }))} className="text-text text-xs py-2 px-4">Edit</p>
        //                 <p className="text-text text-xs py-2 px-4">Change Status</p>
        //             </div>
        //         </label>
        //     ),
        // },
        {
            key: "Actions",
            title: "Actions",
            render: (_, val) => (
                <button onClick={() => dispatch(triggerModal({ id: val.id, open: true }))} className="text-text text-xs py-1.5 px-4 bg-white hover:bg-background cursor-pointer">Edit</button>
                //     <p className="text-text text-xs py-1.5 px-4 bg-white hover:bg-background cursor-pointer">Change Status</p>
                // <Peer id={val.id} key={val.id}>
                // </Peer>
                // <Peer id={val.id} key={val.id}>
                //     <button onClick={() => dispatch(triggerModal({ id: val.id, open: true }))} className="text-text text-xs py-1.5 px-4 bg-white hover:bg-background cursor-pointer">Edit</button>
                //     <p className="text-text text-xs py-1.5 px-4 bg-white hover:bg-background cursor-pointer">Change Status</p>
                // </Peer>
                // <label htmlFor={`action-${val.id}`} className="relative w-full">
                //     <span className="peer text-xs md:text-sm px-2 cursor-pointer mx-auto grid place-items-center">
                //         <AiOutlineMore className="cursor-pointer" />
                //     </span>
                //     <input type="radio" name="action" id={`action-${val.id}`} className="hidden peer" />
                //     <div className="hidden peer-checked:flex flex-col divide-y divide-slate-200 w-max rounded-md shadow-lg p-2 bg-white z-20 absolute top-1/2 right-1">
                //     </div>
                // </label>
            ),
        },
    ])
}
