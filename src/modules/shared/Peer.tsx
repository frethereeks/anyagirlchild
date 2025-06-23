import React from 'react'
import { AiOutlineMore } from 'react-icons/ai'

export default function Peer({ id = Date.now().toString(), children }: { id: string | number, children: React.ReactNode | React.ReactNode[] }) {
    const [active, setActive] = React.useState<boolean>(false)
    console.log('id', id)
    return (
        <>
            <div onClick={() => setActive(!active)} className={`${active ? "fixed" : "hidden" } top-0 left-0 w-full h-full z-40 bg-slate-50 opacity-5`}></div>
            <div onClick={() => setActive(!active)} className="grid place-items-center h-8 w-8 rounded-full bg-transparent hover:bg-black/5 text-text text-center font-bold cursor-pointer relative">
                <AiOutlineMore />
            </div>
            <div onClick={() => setActive(!active)} className={`${active ? "relative" : "sticky" } z-[999] -translate-y-4`}>
                <div className={`${active ? "flex" : "hidden" } flex-col divide-y divide-slate-200 bg-white shadow-md rounded-md p-2 absolute -bottom-6 right-2 w-max z-[999]`}>
                    {children}
                </div>
            </div>
            {/* <label htmlFor={`peer-${id}`} className={`peer-checked/${id}:fixed hidden top-0 left-0 w-full h-full z-40 bg-slate-500`}></label>
            <label onClick={() => setActive(!active)} htmlFor={`peer-${id}`} className="grid place-items-center h-10 w-10 rounded-full bg-transparent hover:bg-slate-300 text-text text-center font-bold cursor-pointer relative">
                <AiOutlineMore />
            </label>
            <input type="checkbox" name="peer" id={`peer-${id}`} className="peer " />
            <div className="peer-checked:relative hidden peer-checked:flex">
                <div className="hidden peer-checked:flex flex-col divide-y divide-slate-200 bg-white shadow-md rounded-md p-2 absolute top-1/2 right-2 w-max z-50">
                    {children}
                </div>
            </div> */}
        </>
    )
}
