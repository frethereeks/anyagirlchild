'use client';

import { useEffect, useState, useTransition } from 'react';
import dynamic from 'next/dynamic';
import { fetchDashboardDataSorted } from '@/app/action'; // Server action → fetch ALL donations for a year

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

type TDonation = { month: number; total: number };

export default function DonationChart() {
    const [allData, setAllData] = useState<TDonation[]>([]);
    const [displayData, setDisplayData] = useState<TDonation[]>([]);
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [month, setMonth] = useState<'All' | number>('All');
    const [isPending, startTransition] = useTransition();

    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const fetchData = (year: number) => {
        startTransition(() => {
            fetchDashboardDataSorted({ year, month: 'All', table: "donation" }).then(res => {
                const data = res.data || []
                setAllData(data); // Save the **entire year's** dataset in memory
                setDisplayData(data); // Initialize the view
            });
        });
    };

    const filterByMonth = (month: 'All' | number) => {
        if (month === 'All') {
            setDisplayData(allData);
        } else {
            const filtered = allData.filter((item) => item.month === month);
            setDisplayData(filtered);
        }
    };

    useEffect(() => {
        fetchData(year);
    }, [year]);

    useEffect(() => {
        filterByMonth(month);
        console.log('isPending', isPending)
        //eslint-disable-next-line
    }, [month, allData]);

    const options = {
        chart: { id: 'donation-chart' },
        xaxis: {
            categories: displayData.map((d) => months[d.month]),
        },
        dataLabels: { enabled: true },
        tooltip: { y: { formatter: (val: number) => `${val} donated` } },
    };

    const series = [
        {
            name: 'Donations',
            data: displayData.map((d) => d.total),
        },
    ];

    return (
        <div className="space-y-4">
            <div className="flex gap-2 mb-4">
                <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value === 'All' ? 'All' : parseInt(e.target.value))}
                    className="border rounded p-1"
                >
                    <option value="All">All Months</option>
                    {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {months[i + 1]}
                        </option>
                    ))}
                </select>

                <select
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    className="border rounded p-1"
                >
                    {Array.from({ length: 5 }, (_, i) => {
                        const y = new Date().getFullYear() - i;
                        return <option key={y} value={y}>{y}</option>;
                    })}
                </select>
            </div>

            <ApexChart options={options} series={series} type="donut" height={350} />
        </div>
    );
}
