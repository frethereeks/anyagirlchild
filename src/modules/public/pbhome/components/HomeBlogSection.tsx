import { blogData } from '@/data/blogData'
import React from 'react'
import BlogCard from '../../pbblog/components/BlogCard'

export default function HomeBlogSection() {
    return (
        <section className="relative px-4 py-20 bg-primary">
            <div className="container mx-auto relative flex flex-col gap-4 md:gap-8 justify-center items-center py-10 rounded-md">
                <h4 className="text-2xl md:text-4xl text-background text-center font-bold">Activities and Inspirational Posts</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 md:justify-center auto-rows-fr gap-2 sm:gap-4 lg:gap-6 py-10">
                    {
                        blogData.slice(1, 4).map(blog => <BlogCard key={blog.id} {...blog} />)
                    }
                </div>
            </div>
        </section>
    )
}
