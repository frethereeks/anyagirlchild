"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'

export default function ParralelModal({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    useEffect(() => {
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "escape" || e.key === "Escape" || e.code === "Escape") {
                router.back()
            }
        })
        return () => {
            document.removeEventListener("keydown", () => null)
        }
    }, [router])

    return (
        <section style={{backdropFilter: "blur(10px)", }} className={`w-full min-h-screen h-screen overflow-x-scroll fixed grid place-items-center z-[1000] top-0 left-0 rounded-md pt-10 bg-[#214e6f70] dark:bg-[#072840b0]`}>
            <div onClick={() => router.back()} className="overlay bg-transparent z-[999]"></div>
            <aside style={{backdropFilter: "blur(10px)"}} className="bg-white p-6 mb-10 rounded-lg relative md:w-max max-w-xl py-5 sm:px-4 mx-auto min-h-full w-full md:max-w-2xl translate-y-4 shadow-2xl shadow-[#0007] z-50 flex-col opacity-1">
                <button onClick={() => router.back()} className="cursor-pointer flex justify-center items-center absolute z-40 top-4 right-4 rounded-full h-6 w-6 bg-transparent hover:bg-slate-50"><IoClose className="text-slate-600 text-inherit" /></button>
                <>
                    {children}
                </>
            </aside>
        </section>
    )
}
