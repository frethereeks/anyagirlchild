// "use client"
import { appRoutePaths } from '@/routes/paths'
import { TBlogItemProp } from '@/types'
import { List } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function OverviewBlogs({blogData }: { blogData: TBlogItemProp[] }) {
    return (
        <aside className = "card p-4 flex flex-col gap-4 text-text">
            <List
                key={"89345096345"}
                dataSource={blogData}
                loadMore
                header={
                    <div className='flex justify-between items-center gap-4 text-text pb-4'>
                        <h4 className="text-default font-bold pl-4 border-l-4 border-secondary">Recent Blogs</h4>
                        <Link href={appRoutePaths.adminblogs} className='opacity-70 text-xs'>See All</Link>
                    </div>
                }
                renderItem={(val) => (
                    <Link href={`${appRoutePaths.adminblogs}/${val.slug}`} key={val.id}>
                        <List.Item key={val.id}>
                            <List.Item.Meta
                                className='text-text items-center'
                                avatar={
                                    <figure className='relative py-10 w-20 rounded-md overflow-hidden flex-shrink-0 border'>
                                        <Image src={val.image!} alt={val.title} className='overlay object-cover' fill/>
                                    </figure>
                                }
                                title={<h5 className='font-semibold text-text text-sm' dangerouslySetInnerHTML={{ __html: val.title }}></h5>}
                                description={<p className='block truncate line-clamp-2 text-xs' dangerouslySetInnerHTML={{ __html: val.text.slice(0, 100) }}></p>}
                            />
                        </List.Item>
                    </Link>
                )}
            />
        </aside>
    )
}
