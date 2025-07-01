"use client"
import dynamic from "next/dynamic"
// import DonationChart from '@/modules/shared/BarChart'
// import ApexChart from "react-apexcharts"
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

export default function OverviewGraph() {
  const data = [
    { year: '2021', value: 20, },
    { year: '2022', value: 128, },
    { year: '2023', value: 99, },
    { year: '2024', value: 143, },
    { year: '2025', value: 56, },
  ]

  return (
    <>
      <section className="card p-4 flex flex-col lg:grid lg:grid-cols-2 gap-4 text-text">
        <div className="h-72 py-4 w-full border">
          {/* <Bar {...props} className="border border-danger" /> */}
          <ApexChart
            type='bar'
            series={[{ data: data.map(el => el.value), name: 'Donation' }]}
            options={{
              xaxis: {
                categories: data.map(el => el.year),
                tooltip: {
                  enabled: false,
                },
                title: { text: "Donation Record", style: { color: "#f66", fontFamily: 'var(--grotesk)' } }
              },
              tooltip: {
                onDatasetHover: { highlightDataSeries: true }
              },
              markers: {
                // colors: ['#16a394', '#0d182d', '#f34f7c']
              },
              series: [],
              plotOptions: {
                bar: {
                  horizontal: false,
                  // borderRadius: 5,
                  distributed: true,
                  colors: {
                    // backgroundBarColors: ['#f34f7c', '#0d182d10', '#16a39405']
                  },
                }
              },
              colors: ['#f34f7c', '#0d182d', '#16a394']
            }}
            height={'100%'}
            width={'100%'}
            key={'2923402734'}
          />
        </div>
        <div className="h-72 p-4 w-full border">
          <ApexChart
            type='pie'
            series={data.map(el => el.value)}
            options={{
              labels: data.map(el => el.year),
              chart: { type: "pie" },
              fill: {
                type: "gradient"
              },
              plotOptions: {
                pie: {
                  startAngle: -90,
                  endAngle: 270,
                }
              },
              // colors: ['#16a394', '#0d182d', '#f34f7c']
            }}
            height={'100%'}
            width={'100%'}
            key={'2923402734'}
          />
        </div>
      </section>
      {/* <section className="card p-4 flex flex-col  gap-4 text-text">
        <div className="h-64 md:h-72 w-full border">
          <DonationChart />
        </div>
      </section> */}
      <section className="card p-4 flex flex-col  gap-4 text-text">
        <div className="h-64 md:h-72 w-full border">
          <ApexChart
            type='line'
            series={[{ data: data.map(el => el.value), name: 'Donation' }]}
            options={{
              chart: {
                type: "line",
              },
              xaxis: {
                categories: data.map(el => el.year),
                tooltip: { enabled: true },
                title: { text: "Blog Post Record", style: { color: "#16a394", fontFamily: 'var(--grotesk)', cssClass: "font-grotesk font-bold text-base md:text-lg p-2" } }
              },
              markers: {
                colors: ['#16a394', '#0d182d', '#f34f7c']
              },
              fill: {
                colors: ['#F44336', '#E91E63', '#9C27B0']
              },
              plotOptions: {

              },
              // grid: {
              //   row: {
              //     colors: ['#16a394', '#0d182d', '#f34f7c']
              //   },
              //   column: {
              //     colors: ['#F44336', '#E91E63', '#9C27B0']
              //   }
              // },
              colors: ['#f34f7c', '#0d182d', '#16a394']
            }}
            height={'100%'}
            width={'100%'}
            key={'2923402734'}
          />
        </div>
      </section>
    </>
  )
}
