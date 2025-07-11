"use client"
import { generateAllMonths } from "@/lib";
import dynamic from "next/dynamic"
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

type TGraphProps = {
  blogData: {
    month: number;
    total: number;
  }[];
  donationData: {
    month: number;
    total: number;
  }[];
  galleryData: {
    month: number;
    total: number;
  }[];
  userData: {
    total: number;
    type: string;
  }[];
}

export default function OverviewGraph({ userData, blogData, galleryData, donationData }: TGraphProps) {
  // const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const res = {
    blogData: generateAllMonths(blogData ),
    galleryData: generateAllMonths(galleryData ),
    donationData: generateAllMonths(donationData)
  }
  console.log({ userData, blog: res.blogData, gallery: res.galleryData, donations: res.donationData, series: galleryData.map(el => el.total), categories: galleryData.map(el => el.month) })


  // const fullMonthlySaleData: { total: number; month: string; }[] = months?.map((item, i) => i !== 0 && donationData.find(el => (el.month) === (i)) ? ({ month: item, total: donationData.find(el => el.month === i)?.total ?? 0 }) : ({ month: item, total: 0 }))

  return (
    <>
      <section className="card p-4 flex flex-col  gap-4 text-text">
        <div className="h-64 md:h-72 w-full border">
          <ApexChart
            type='line'
            series={[{ data: res.donationData.map(el => el.total), name: 'Sales' }]}
            options={{
              chart: {
                type: "line",
              },
              xaxis: {
                categories: res.donationData?.map(el => el.month),
                tooltip: {
                  enabled: true, formatter(value) {
                    return value = Number(value).toLocaleString()
                  },
                },
                title: { text: `Monthly Donation Record (${new Date().getFullYear()})`, style: { color: "#382a33", fontFamily: 'var(--grotesk)', cssClass: "font-grotesk font-bold text-base md:text-lg p-2" } }
              },
              markers: {
                colors: ['#ee791d', '#0d182d', '#f34f7c']
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
              // colors: ['#f34f7c', '#0d182d', '#16a394']
              colors: ['#382a33', '#ee791d', '#16a394']
            }}
            height={'100%'}
            width={'100%'}
            key={'2923402734'}
          />
        </div>
      </section>
      <section className="card p-4 flex flex-col lg:grid lg:grid-cols-2 gap-4 text-text">
        <div className="h-72 py-4 w-full border">
          {/* <Bar {...props} className="border border-danger" /> */}
          <ApexChart
            type='bar'
            series={[{ data: res.galleryData ? res.galleryData.map(el => el.total) : [], name: 'Gallery' }]}
            options={{
              xaxis: {
                categories: res.galleryData ? res.galleryData.map(el => el.month) : [],
                tooltip: {
                  enabled: false,
                },
                title: { text: "Gallery Upload by Month", style: { color: "#f66", fontFamily: 'var(--grotesk)' } }
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
              colors: ['#382a33', '#ee791d', '#16a394']
            }}
            height={'100%'}
            width={'100%'}
            key={'2923402734'}
          />
        </div>
        <div className="h-72 p-4 w-full border">
          <ApexChart
            type='donut'
            series={userData?.map(el => el.total)}
            options={{
              title: { text: "Admin by Type", style: { color: "#f66", fontFamily: 'var(--grotesk)' } },
              labels: userData?.map(el => el.type),
              chart: { type: "donut" },
              fill: {
                type: "gradient"
              },
              plotOptions: {
                pie: {
                  startAngle: -90,
                  endAngle: 270,
                }
              },
              colors: ['#382a33', '#ee791d', '#16a394']
            }}
            height={'100%'}
            width={'100%'}
            key={'2923402734'}
          />
        </div>
      </section>
      {/* <section className="card p-4 flex flex-col  gap-4 text-text">
        <div className="h-64 md:h-72 w-full border">
          <SalesChart />
        </div>
      </section> */}
    </>
  )
}
