"use client"
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import { usePathname } from "next/navigation";
import { LinkCardProps } from '@/types';
import { FaCaretDown } from 'react-icons/fa';


const LinkCard = ({title, url, sublinks, fixed} : LinkCardProps) => {
    const location = usePathname();
    const [activeLink, setActiveLink] = useState<boolean>(false);
    const [dropdown, setDropdown] = useState<boolean>(false);
    useEffect(() => {
        location === url ? setActiveLink(true) : setActiveLink(false);
        return () => {
            setActiveLink(false);
        } 
    },[location, url, title]);
    if(sublinks?.length! > 0){
        return (
            <li className={`relative group`}>
                <div className={`relative flex items-center w-full cursor-pointer hover:bg-primary hover:text-slate-100 md:hover:text-slate-700 md:hover:bg-transparent`} onClick={() => setDropdown(true)}>
                    <Link href={url} className={`overflow-hidden relative md:w-max hover:before:transiton-all before:md:duration-300 before:md:absolute before:md:bottom-0 before:md:h-[2px] before:md:-rounded[2rem] before:md:bg-red-500 before:md:w-0 before:md:-translate-x-1/2   ${activeLink ? 'text-slate-700 md:before:left-1/2 md:before:w-[30%]' : 'hover:md:before:left-1/2 hover:md:before:w-[30%] text-slate-50 border-b-white'} ${fixed ? 'text-slate-700' : 'text-slate-700 border-b-white'} md:bg-transparent py-2 px-5 md:px-4 hover:bg-primary hover:text-slate-100 md:hover:text-slate-700 md:hover:bg-transparent text-sm`}>{title}</Link>
                    <FaCaretDown className={`group-hover:text-white md:group-hover:text-slate-700 relative z-50 p-1 text-[.86rem] cursor-pointer text-slate-600 mt-1 -mx-2`} size={20} />
                </div>
                <ul onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)} className={`transition-all duration-300 relative md:absolute z-[888] overflow-hidden top-full left-0 border-0  w-full md:min-w-[15rem] md:max-w-[25rem] md:shadow-md ${dropdown ? 'border-primary/20 max-h-max' : 'max-h-0'} hover:max-h-max flex-col bg-white`}>
                {/* <ul className={`transition-all duration-300 relative md:absolute z-[888] top-full left-0 border-[5px] border-t-2 w-full md:min-w-[15rem] md:w-max md:shadow-md group-hover:border-primary/20  group-hover:max-h-[1000%] border-t-transparent flex-col bg-white`}> */}
                {sublinks?.map(({id,url,title}) => (
                    <li key={id} className={`relative`}>
                        <Link href={url} key={id} className={`overflow-hidden block w-full hover:before:transiton-all before:md:duration-300 before:md:absolute before:md:bottom-0 before:md:h-[2px] before:md:-rounded[2rem] before:md:bg-red-500 before:md:w-0 md:bg-white text-slate-700 hover:bg-primary hover:text-white py-2 px-5 md:px-4 text-sm`}>{title}</Link>
                    </li>
                ))}
                </ul>
            </li>
        )
    }
    return (<Link href={url} className={`overflow-hidden relative hover:bg-primary hover:text-slate-100 md:hover:text-slate-700 md:hover:bg-transparent w-full md:w-max hover:before:transiton-all before:md:duration-300 before:md:absolute before:md:bottom-0 before:md:h-[2px] before:md:-rounded[2rem] before:md:bg-red-500 before:md:w-0 before:md:-translate-x-1/2   ${activeLink ? 'text-slate-700 md:before:left-1/2 md:before:w-[30%]' : 'hover:md:before:left-1/2 hover:md:before:w-[30%] text-slate-50 border-b-white'} bg-white ${fixed ? 'text-slate-700' : 'text-slate-700 border-b-white'} md:bg-transparent py-2 px-5 md:px-4 hover:text-slate-700 text-sm`}>{title}</Link>)
}

export default LinkCard