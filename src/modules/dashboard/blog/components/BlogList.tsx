"use client"
import React from 'react'
import { Table } from 'antd'
import { BLOG_COLUMN } from '../columns'
import { blogData } from '@/data/blogData'

export default function BlogList() {
  return (
    <aside className="card p-4 flex flex-col gap-4 text-text min-w-52 overflow-x-scroll">
      <Table
        key={"82034798a09834"}
        pagination={{
          hideOnSinglePage: true,
          // pageSize: 10,
          showSizeChanger: false,
          showQuickJumper: false,
        }}
        scroll={{ x: "max-content" }}
        dataSource={blogData}
        columns={BLOG_COLUMN()}
      />
    </aside>
  )
}
