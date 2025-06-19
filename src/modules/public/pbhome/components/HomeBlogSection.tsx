import React from 'react'
import BlogCard from '../../pbblog/components/BlogCard'
import { fetchBlogPosts } from '@/app/action'
import { TBlogItemProp } from '@/types'

export default async function HomeBlogSection() {
    const res = await fetchBlogPosts(0, 4)
    const data = res?.data as TBlogItemProp[] || []

    return (
        <section className="relative px-4 py-20 bg-white">
            <div className="container mx-auto relative flex flex-col gap-4 justify-center items-center py-10 rounded-md">
                <h4 className="text-2xl md:text-4xl text-secondary text-center font-bold font-grotesk">Activities and Inspirational Posts</h4>
                <p className="text-center text-small text-slate-500 leading-loose max-w-3xl mx-auto">Our approach involves not only education but also moral development, career mentorship, and self-care, ensuring that these girls grow into well-rounded, empowered individuals who can lead and inspire change in their communities.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 md:justify-center auto-rows-fr gap-2 sm:gap-4 lg:gap-6 py-10">
                    {
                        data?.map(blog => <BlogCard key={blog.id} {...blog} />)
                    }
                </div>
            </div>
        </section>
    )
}
