// "use client"
import moment from "moment"
import { TableColumnsType } from "antd"
import Image from "next/image"
import { ASSET_URL } from "@/assets"
import Link from "next/link"
import { appRoutePaths } from "@/routes/paths"
import { TBlogProps } from "@/data/blogData"

export const BLOG_COLUMN = (): TableColumnsType<TBlogProps> => ([
    {
        key: "Title",
        title: "Title",
        render: (_, val) => (
            <div className="flex items-center gap-2">
                <div className="relative h-10 w-10 rounded-md overflow-hidden bg-green-grad flex-shrink-0">
                    <Image src={val.image ?? ASSET_URL["little_child"]} alt={val.title} className="object-cover object-top" fill />
                </div>
                <h4 className="flex-1 text-sm text-text font-semibold">{val.title}</h4>
            </div>
        ),
    },
    {
        key: "Category",
        title: "Category",
        render: (_, val) => (
            <p className="text-sm text-text font-medium">{val.category}</p>
        ),
    },
    {
        key: "Author",
        title: "Author",
        render: (_, val) => (
            <p className="text-sm text-text underline font-medium"><Link href={`${appRoutePaths.adminadmin}?id=${val.author?.id}`}>{val.author?.firstname} {val.author?.lastname}</Link></p>
        ),
    },
    {
        key: "Status",
        title: "Status",
        render: (_, val) => (
            <p className={`text-sm ${val.status === "Active" ? 'text-secondary' : val.status === "Disabled" ? 'text-danger' : 'text-text'} font-medium`}>{val.status}</p>
        ),
    },
    /* {
        key: "Last Seen",
        title: "Last Seen",
        render: (_, val) => (
            <p className="text-sm text-text truncate line-clamp-1 font-medium">{moment(val.createdAt).format("DD-MM-YYYY")}</p>
        ),
    }, */
    {
        key: "Date",
        title: "Date",
        render: (_, val) => (
            <p className="text-sm text-text truncate line-clamp-1 font-medium">{moment(val.createdAt).format("DD-MM-YYYY")}</p>
        ),
    },
])

