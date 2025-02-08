import { NavLinkProps } from '@/types'
import { FaBriefcase, FaIdCard, FaPiggyBank } from 'react-icons/fa'
import { FaSackDollar } from 'react-icons/fa6'
import { MdAccountBalanceWallet, MdAttachMoney } from 'react-icons/md'
import {  IoClipboardOutline, IoMailUnreadOutline, IoNewspaperOutline, IoPeopleOutline, IoReceiptOutline } from 'react-icons/io5'



export const navLinks : NavLinkProps[] = [
    {
        id: 282340,
        title: 'Dashboard',
        // background: 'bg-blue-100',
        element: <span className='border border-slate-500 bg-blue-100 text-blue-500 text-sm sm:text-base h-6 w-6 rounded-full flex justify-center items-center'><IoNewspaperOutline className='text-inherit ' /></span>,
        link: '/dashboard',
        icon: <IoNewspaperOutline className='text-inherit ' />
    },
    {
        id: 282341,
        title: 'Members',
        // background: 'bg-purple-100',
        element: <span className='border border-slate-500 bg-purple-100 text-purple-500 text-sm sm:text-base h-6 w-6 rounded-full flex justify-center items-center'><IoPeopleOutline className='text-inherit ' /></span>,
        link: '/dashboard/members',
        icon: <IoPeopleOutline className='text-inherit ' />
    },
    // {
    //     id: 282347,
    //     title: 'Deposit',
    //     // background: 'bg-slate-200',
    //     element: <span className='border border-slate-500 bg-slate-200 text-slate-500 text-sm sm:text-base h-6 w-6 rounded-full flex justify-center items-center'><IoMailUnreadOutline className='text-inherit ' /></span>,
    //     link: '/dashboard/deposits',
    //     icon: <MdAccountBalanceWallet className='text-inherit ' />
    // },
    {
        id: 282348,
        title: 'Withdrawal',
        // background: 'bg-slate-200',
        element: <span className='border border-slate-500 bg-slate-200 text-slate-500 text-sm sm:text-base h-6 w-6 rounded-full flex justify-center items-center'><IoMailUnreadOutline className='text-inherit ' /></span>,
        link: '/dashboard/withdrawals',
        icon: <MdAttachMoney className='text-inherit ' />
    },
    {
        id: 282344,
        title: 'Savings',
        // background: 'bg-sky-100',
        element: <span className='border border-sky-500 bg-sky-100 text-sky-500 text-sm sm:text-base h-6 w-6 rounded-full flex justify-center items-center'><IoReceiptOutline className='text-inherit ' /></span>,
        link: '/dashboard/savings',
        icon: <FaPiggyBank className='text-inherit ' />
        // icon: <IoReceiptOutline className='text-inherit ' />
    },
    {
        id: 282346,
        title: 'Loans',
        // background: 'bg-slate-200',
        element: <span className='border border-slate-500 bg-slate-200 text-slate-500 text-sm sm:text-base h-6 w-6 rounded-full flex justify-center items-center'><IoMailUnreadOutline className='text-inherit ' /></span>,
        link: '/dashboard/loans',
        icon: <FaSackDollar className='text-inherit ' />
    },
    {
        id: 282349,
        title: 'Money Pool',
        // background: 'bg-indigo-200',
        element: <span className='border border-slate-500 bg-indigo-200 text-indigo-500 text-sm sm:text-base h-6 w-6 rounded-full flex justify-center items-center'><IoClipboardOutline className='text-inherit ' /></span>,
        link: '/dashboard/money-pool',
        icon: <IoClipboardOutline className='text-inherit ' />
    },
]