import { ASSET_URL } from '@/assets'
import { fetchUserViaToken } from '@/lib/fetchUserViaToken'
import { PBVerifyContainer } from '@/modules/public/pbauth'
import { appRoutePaths } from '@/routes/paths'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoCaretBack } from 'react-icons/io5'

export const metadata: Metadata = {
    title: "Anya Girlchild :: Verify & Reset",
    description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
    icons: ASSET_URL["anya_girlchild_logo"].src,
    openGraph: {
        type: "website",
        title: "Anya Girlchild :: Verify & Reset",
        images: [
            { url: ASSET_URL["group_donation"].src, width: 800, height: 600 },
            { url: ASSET_URL["group_donation"].src, width: 1800, height: 1600 },
        ],
        siteName: "Anya Girlchild Foundation",
        description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
        locale: 'en_US',
    }
};

type TVerifyPageProps = {
    params: Record<string, string | string[] | undefined>;
    searchParams: {
        email?: string;
        token?: string;
    };
};

export default async function PBVerifyPage({ searchParams: { email, token } }: TVerifyPageProps) {
    const data = await fetchUserViaToken(email, token);

    if (!data) {
        return (
            <main className='flex flex-col md:flex-row gap-4 lg:gap-8 md:h-full'>
                <section className="container mx-auto flex flex-col lg:flex-row gap-4 md:h-full">
                    <aside className="p-4 flex-1 hidden lg:flex flex-col gap-8 w-full lg:max-w-[40rem] py-40 relative bg-primary">
                        <Image src={ASSET_URL["back_to_school"]} alt='back_to_school' className='object-cover object-top opacity-85' fill />
                    </aside>
                    <aside className='flex-1 md:px-20 flex flex-col gap-8 py-10 md:py-40'>
                        <div
                            className='flex flex-col gap-4 p-4'
                        >
                            <div className="flex flex-col gap-1 py-4">
                                <h4 className="text-text text-xl md:text-3xl font-bold text-nowrap">Invalid Token or Email Detected!</h4>
                                <p style={{ lineHeight: 1.8 }} className="text-sm md:text-base text-text leading-loose">
                                    Oh no! It looks like your email and token are no longer valid. <Link href={`${appRoutePaths.signin}?view=reset`} className='inline px-2 text-secondary text-nowrap font-medium border-b-[1.5px] border-dotted border-slate-400'>Click here</Link> to request a new password reset.
                                </p>
                            </div>
                            <div className="flex justify-between gap-4">
                                <Link href={appRoutePaths.signin} className='button text-secondary text-left flex items-center pl-0 gap-1.5'><IoCaretBack /> Back to sign in</Link>
                            </div>
                            {/* <p className="text-xs md:text-sm text-text text-center pb-4">We&apos;ll get back to you in 1-2 business days</p> */}
                        </div>
                    </aside>
                </section>
            </main>
        )
    }
    // else {
    return (
        <main className='flex flex-col md:flex-row gap-4 lg:gap-8 md:h-full'>
            <section className="container mx-auto flex flex-col lg:flex-row gap-4 md:h-full">
                <aside className="p-4 flex-1 hidden lg:flex flex-col gap-8 w-full lg:max-w-[40rem] py-40 relative bg-primary">
                    <Image src={ASSET_URL["back_to_school"]} alt='back_to_school' className='object-cover object-top opacity-85' fill />
                </aside>
                <PBVerifyContainer data={data} />
            </section>
        </main>
    )
    // }
}
