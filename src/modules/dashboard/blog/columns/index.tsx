// "use client"
import { useAppDispatch } from "@/lib/features/hooks";
import moment from "moment"
import { TableColumnsType } from "antd"
import Image from "next/image"
import { ASSET_URL } from "@/assets"
import Link from "next/link"
import { appRoutePaths } from "@/routes/paths"
import { AiOutlineMore } from "react-icons/ai";
import { triggerModal } from "@/lib/features/reducers/siteSlice";
import { TBlogItemProp } from "@/types";

export const BLOG_COLUMN = (): TableColumnsType<TBlogItemProp> => {
    const dispatch = useAppDispatch()
    return([
        {
            key: "Title",
            title: "Title",
            render: (_, val) => (
                <div className="flex items-center gap-2 my-2">
                    <div className="relative h-10 w-10 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                        <Image src={val.image ?? ASSET_URL["little_child"]} alt={val.title} className="object-cover object-top" fill />
                    </div>
                    <h4 className="flex-1 text-sm text-text font-semibold">{val.title}</h4>
                </div>
            ),
        },
        // {
        //     key: "Category",
        //     title: "Category",
        //     render: (_, val) => (
        //         <p className="text-sm text-text font-medium">{val.category}</p>
        //     ),
        // },
        {
            key: "Author",
            title: "Author",
            render: (_, val) => (
                <p className="text-sm text-text underline font-medium"><Link href={`${appRoutePaths.adminuser}?id=${val.user?.id}`}>{val.user?.firstname} {val.user?.lastname}</Link></p>
            ),
        },
        {
            key: "Status",
            title: "Status",
            render: (_, val) => (
                <p className={`px-2 text-sm ${val.status === "VISIBLE" ? 'text-secondary' : 'text-danger'} font-medium`}>{val.status.toString()}</p>
            ),
        },
        {
            key: "Date",
            title: "Date",
            render: (_, val) => (
                <p className="text-sm text-text truncate line-clamp-1 font-medium">{moment(val.createdAt).format("DD-MM-YYYY")}</p>
            ),
        },
        {
            key: "Edit",
            title: "Edit",
            render: (_, val) => (
                <span className="text-xs md:text-sm px-2 cursor-pointer mx-auto grid place-items-center" onClick={() => dispatch(triggerModal({ id: val.id, open: true }))}>
                    <AiOutlineMore className="cursor-pointer" />
                </span>
            ),
        },
    ])

}