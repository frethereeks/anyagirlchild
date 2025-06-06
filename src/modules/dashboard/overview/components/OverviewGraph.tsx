"use client"
import React from 'react'
// import { Bar, BarConfig, Pie, Scatter, Histogram } from '@ant-design/plots'

export default function OverviewGraph() {
  const data = [
    { year: '2021', value: 20, },
    { year: '2022', value: 128, },
    { year: '2023', value: 99, },
    { year: '2024', value: 143, },
    { year: '2025', value: 56, },
  ]
  // const config: BarConfig = {
  //   xField: 'value',
  //   yField: 'year',
  //   seriesField: 'year',
  //   // color: ['#1890ff', '#ff4d4f', '#52c41a'],
  //   color: ['#16a394', '#f34f7c', '#52c41a'],
  //   legend: {
  //     position: 'top-right',
  //     itemName: {
  //       style: {
  //         fill: '#666',
  //         fontSize: 12,
  //       }
  //     }
  //   },
  //   animate: {
  //     appear: {
  //       animation: 'path-in',
  //       zoom: 2000
  //     }
  //   },
  //   autoFit: true,
  //   scrollbar: { type: "vertical" },
  //   // slider: {start: 0.1, end: 0.9},
  // }
  // const props = {
  //   data,
  //   ...config
  // }

  return (
    <>
      <section className="card p-4 flex flex-col lg:grid lg:grid-cols-2 gap-4 text-text">
        <div className="h-64 w-full border">
          {/* <Bar {...props} className="border border-danger" /> */}
        </div>
        <div className="h-64 w-full border">
          {/* <Pie {...props} className={'border border-secondary'} /> */}
        </div>
      </section>
      <section className="card p-4 flex flex-col lg:grid lg:grid-cols-2 gap-4 text-text">
        <div className="h-64 w-full border">
          {/* <Scatter {...props} className="border border-danger" /> */}
        </div>
        <div className="h-64 w-full border">
          {/* <Histogram  {...props} className={'border border-secondary'} /> */}
        </div>
      </section>
    </>
  )
}
