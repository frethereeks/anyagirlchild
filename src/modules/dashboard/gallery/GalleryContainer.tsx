"use client"

import React, { useRef, useState } from 'react'
import { ASSET_URL } from '@/assets'
import Image from 'next/image'
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useForm } from 'antd/es/form/Form';
import { Form, Input } from 'antd';

type TAdminSecurityProps = {
    password: string
    newpassword: string
    confirmpassword: string
}

export default function GalleryContainer() {
    const [activeForm, setActiveForm] = useState<"info" | "security" | "candidates">("info")
    const [form] = useForm<TAdminProps>()
    const [passForm] = useForm<TAdminSecurityProps>()
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const dialogRef = useRef<HTMLDialogElement | null>()
    const [candidates, setCandidates] = useState<any[]>([])

    const data: TAdminProps = {
        id: "829zxc92941020a82",
        firstname: "Felicity",
        lastname: "Anyanwu",
        email: "felicity.ananyanwu@anyagirlchild.com",
        role: "Root",
        image: "",
        status: "Active",
        password: "123456",
        address: "35 Asheik Jarma, Jabi. Abuja, Nigeria",
        lastLogin: new Date("2/11/2025"),
        createdAt: new Date("1/25/2025"),
        updatedAt: new Date("2/11/2025"),
    }

    return (
        <section className='flex flex-col lg:flex-row gap-4'>
            <aside className="card flex flex-col gap-8 w-full lg:max-w-[20rem] py-10">
                <div className="hidden lg:flex flex-col items-center py-4">
                    <div className="relative h-[10rem] w-[10rem] lg:w-full rounded-full mx-auto bg-dark-grad flex-shrink-0">
                        <Image src={data?.image || ASSET_URL["little_child"]} alt={data.firstname} className="object-cover object-top h-[10rem] w-[10rem] lg:w-full rounded-full" fill />
                        <div className="absolute z-20 h-6 w-6 rounded-full grid place-items-center bg-white text-blue-500 bottom-4 right-2 text-xl">
                            <RiVerifiedBadgeFill />
                        </div>
                    </div>
                    <h4 className="flex-1 text-base pt-4 text-dark-text font-semibold">{data.firstname} {data.lastname}</h4>
                    <p className="flex-1 text-xs text-text opacity-80 font-medium">{data.email}</p>
                </div>
                <h4 className="text-base lg:text-lg text-text font-semibold pl-4">Account</h4>
                <div className="flex flex-row lg:flex-col -mt-5">
                    <button onClick={() => setActiveForm("info")} className={`text-sm text-center lg:text-left font-medium p-4 py-3 -ml-0 lg:-ml-4 ${activeForm === "info" ? 'lg:border-l-4 border-l-0 pl-0 lg:pl-4 border-b-2 lg:border-b-0 border-secondary' : 'lg:border-l-4 lg:border-transparent'} `}>Personal Information</button>
                    <button onClick={() => setActiveForm("security")} className={`text-sm text-center lg:text-left font-medium p-4 py-3 -ml-0 lg:-ml-4 ${activeForm === "security" ? 'lg:border-l-4 border-l-0 pl-0 lg:pl-4 border-b-2 lg:border-b-0 border-secondary' : 'lg:border-l-4 lg:border-transparent'} `}>Login & Security</button>
                </div>
            </aside>
            <aside className='card flex-1 flex flex-col gap-0'>
                {
                    activeForm === "info" ?
                        <Form
                            form={form}
                            className="w-full max-w-xl flex-1 flex flex-col gap-0">
                            <h4 className="text-default font-bold text-text p-4 border-l-4 border-secondary py-2 mb-8">Basic Info</h4>
                            <div className="flex flex-col lg:flex-row gap-4 p-4">
                                <h4 className="w-[10rem] lg:w-full text-base pt-4 text-text font-semibold">Profile Picture:</h4>
                                <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4">
                                    <div className="relative h-20 w-20 rounded-full overflow-hidden bg-dark-grad flex-shrink-0">
                                        <Image src={data?.image || ASSET_URL["little_child"]} alt={data.firstname} className="object-cover object-top" fill />
                                    </div>
                                    <div className="flex-1 flex gap-4">
                                        <button className="button bg-secondary">Upload Photo</button>
                                        <button className="button bg-transparent text-danger border px-6">Delete</button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4">
                                <h4 className="w-[10rem] lg:w-full text-base text-text font-semibold">First Name:</h4>
                                <div className="flex-1 flex flex-col md:flex-row gap-2">
                                    <Form.Item<TAdminProps> name="firstname" noStyle className='flex-1' initialValue={data?.firstname}>
                                        <Input style={{ background: "transparent" }} type='text' placeholder={`First Name e.g. ${data?.firstname}`} required className='border border-background bg-white rounded-sm p-3' />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4">
                                <h4 className="w-[10rem] lg:w-full text-base text-text font-semibold">Last Name:</h4>
                                <div className="flex-1 flex flex-col md:flex-row gap-2">
                                    <Form.Item<TAdminProps> name="lastname" noStyle className='flex-1' initialValue={data?.lastname}>
                                        <Input style={{ background: "transparent" }} type='text' placeholder={`Last Name e.g. ${data?.lastname}`} required className='border border-background bg-white rounded-sm p-3' />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4">
                                <h4 className="w-[10rem] lg:w-full text-base text-text font-semibold">Email:</h4>
                                <div className="flex-1 flex flex-col md:flex-row gap-2">
                                    <Form.Item<TAdminProps> name="email" noStyle className='flex-1' initialValue={data?.email}>
                                        <Input style={{ background: "transparent" }} type='email' placeholder={`Email e.g. ${data?.email}`} required className='border border-background bg-white rounded-sm p-3' />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button className="button bg-secondary font-semibold">Save Changes</button>
                            </div>
                        </Form>
                        :
                        <Form
                            form={passForm}
                            className="w-full max-w-xl flex-1 flex flex-col gap-0">
                            <h4 className="text-default font-semibold text-text p-4 border-l-4 border-secondary py-2 mb-8 flex gap-2 ">Password Update <button className="bg-danger/20 text-danger text-xs font-normal py-0.5 px-2 rounded-sm">Security</button> </h4>
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4">
                                <h4 className="w-[10rem] lg:w-full text-base text-text font-semibold">Current Password:</h4>
                                <div className="flex-1 flex flex-col md:flex-row gap-2">
                                    <Form.Item<TAdminSecurityProps> name="password" noStyle className='flex-1' >
                                        <Input style={{ background: "transparent" }} type='text' placeholder={`Old Password`} required className='border border-background bg-white rounded-sm p-3' />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4">
                                <h4 className="w-[10rem] lg:w-full text-base text-text font-semibold">New Password:</h4>
                                <div className="flex-1 flex flex-col md:flex-row gap-2">
                                    <Form.Item<TAdminSecurityProps> name="newpassword" noStyle className='flex-1'>
                                        <Input style={{ background: "transparent" }} type='password' placeholder={`Use a Strong Password`} required className='border border-background bg-white rounded-sm p-3' />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4">
                                <h4 className="w-[10rem] lg:w-full text-base text-text font-semibold">Confirm Password:</h4>
                                <div className="flex-1 flex flex-col md:flex-row gap-2">
                                    <Form.Item<TAdminSecurityProps> name="confirmpassword" noStyle className='flex-1'>
                                        <Input style={{ background: "transparent" }} type='password' placeholder={`Use a Strong Password`} required className='border border-background bg-white rounded-sm p-3' />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button className="button bg-secondary font-semibold">Update Password</button>
                            </div>
                        </Form>
                }
            </aside>
        </section>
        
    )
}
/*
 <main className='flex flex-col'>
    <section className="relative flex flex-col justify-center py-20 px-4">
        <div className="absolute w-3/4 right-0 h-full">
            <Image src={ASSET_URL['wallet']} alt='' className='object-cover object-center' fill />
        </div>
        <div className="container mx-auto relative z-10">
            <div className="flex flex-col justify-center items-center bg-white shadow-lg shadow-text/50 px-4 py-8 md:px-8 md:py-14 w-full max-w-xl">
                <h2 className="text-2xl md:text-4xl text-center text-sky-700 font-inter font-black">I-LEAP PROJECT ARTISAN NOMINATION FORM</h2>
                <h2 className="text-lg text-center text-text font-medium italic">(For Use by Developers & Contractors)</h2>
                <div className="flex flex-col gap-2 mt-4"></div>
                <p className="text-sm md:text-base text-text"></p>
            </div >
        </div >
    </section >
    <section className="relative flex flex-col justify-center py-20">
        <div className="container mx-auto flex flex-col lg:flex-row gap-4">
            <aside className="card p-4 flex flex-col gap-8 w-full lg:max-w-[20rem] py-10">
                <div className="hidden lg:flex flex-col items-center py-4">
                    <div className="relative h-[8rem] w-[8rem] rounded-full mx-auto bg-dark-grad flex-shrink-0">
                        <Image src={data?.image || ASSET_URL["little_child"]} alt={data.firstname} className="object-cover object-top h-[8rem] w-[8rem] rounded-full" fill />
                        <div className="absolute z-20 h-6 w-6 rounded-full grid place-items-center bg-white text-blue-500 bottom-4 right-0 text-xl">
                            <RiVerifiedBadgeFill />
                        </div>
                    </div>
                    <h4 className="flex-1 text-base pt-4 text-dark-text font-semibold">C-STEMP Limited</h4>
                    <p className="flex-1 text-xs text-text opacity-80 font-medium">support@cstemp.org</p>
                </div>
                <h4 className="text-lg lg:text-2xl text-text font-semibold">Section Guides</h4>
                <div className="flex flex-row flex-wrap lg:flex-col -mt-5">
                    <button onClick={() => setActiveForm("info")} className={`text-sm text-center lg:text-left font-medium p-4 py-3 -ml-0 lg:-ml-4 ${activeForm === "info" ? 'lg:border-l-4 border-l-0 pl-0 lg:pl-4 border-b-2 lg:border-b-0 border-secondary' : 'lg:border-l-4 lg:border-transparent'} `}>General Overview</button>
                    <button onClick={() => setActiveForm("security")} className={`text-sm text-center lg:text-left font-medium p-4 py-3 -ml-0 lg:-ml-4 ${activeForm === "security" ? 'lg:border-l-4 border-l-0 pl-0 lg:pl-4 border-b-2 lg:border-b-0 border-secondary' : 'lg:border-l-4 lg:border-transparent'} `}>Developer/Contractor Info</button>
                    <button onClick={() => setActiveForm("candidates")} className={`text-sm text-center lg:text-left font-medium p-4 py-3 -ml-0 lg:-ml-4 ${activeForm === "candidates" ? 'lg:border-l-4 border-l-0 pl-0 lg:pl-4 border-b-2 lg:border-b-0 border-secondary' : 'lg:border-l-4 lg:border-transparent'} `}>Nominated Artisan Details</button>
                </div>
            </aside>
            <aside className='card p-4 flex-1 flex flex-col gap-4'>
                {
                    activeForm === "info" && (
                        <figure className='flex flex-col gap-4 py-4'>
                            <h2 className="text-2xl font-bold text-sky-700">Program Description</h2>
                            <p style={{ lineHeight: 1.8 }} className="text-sm md:text-base text-text text-justify leading-loose">The I-LEAP PROGRAM is an industry-driven initiative designed to upskill and certify artisans in key construction trades. Sponsored by AUDA-NEPAD and implemented by C-STEMP, the program provides a 6-month blended learning experience, starting with an intensive one-week workshop on modern construction practices, health and safety, quality workmanship, teamwork, and digital skills. Participants will then continue their learning through the E-LIMI e-learning platform, with on-the-job assessments leading to NSQ certification and the CORBON Artisan License.</p>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-2xl font-bold text-sky-700 py-3">Instruction</h4>
                                <p className="flex gap-4 text-sm md:text-base text-text"><span>•</span>	This form should be completed by the Developer/Contractor nominating artisans for participation in the I-LEAP Project.</p>
                                <p className="flex gap-4 text-sm md:text-base text-text"><span>•</span>	Ensure all required fields are filled out accurately.</p>
                                <p className="flex gap-4 text-sm md:text-base text-text"><span>•</span>	Submit the completed form to the designated I-LEAP Project office or email.</p>
                            </div>
                        </figure>)
                }
                {
                    activeForm === "security" && (
                        <figure className='flex flex-col gap-4 py-4 w-full'>
                            <h2 className="text-2xl font-bold text-sky-700 pb-3 border-b border-slate-200">Basic Information</h2>
                            <form action="" className="flex flex-col gap-4 py-4 px-2 md:px-4">
                                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                    <h4 className="w-[10rem] lg:w-full text-base text-text font-semibold">Organization Name:</h4>
                                    <div className="flex-1 flex flex-col md:flex-row gap-2">
                                        <input type='text' placeholder={`Organization Name e.g. C-STEMP Limited`} required className='flex-1 border border-slate-300 bg-white rounded-sm text-base p-3' />
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                    <h4 className="w-[10rem] lg:w-full text-base text-text font-semibold">Contact Person:</h4>
                                    <input type='text' placeholder={`Contact Person e.g. Joana Bishop`} pattern='[A-Z][a-z]\s[A-Z][a-z]+' required className='flex-1 border border-slate-300 bg-white rounded-sm text-base p-3 capitalize' />
                                </div>
                                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                    <h4 className="w-[10rem] lg:w-full text-base text-text font-semibold">Type of Construction Work:</h4>
                                    <input type='text' placeholder={`Construction Type e.g. Plumbing`} required className='flex-1 border border-slate-300 bg-white rounded-sm text-base p-3' />
                                </div>
                                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                    <h4 className="w-[10rem] lg:w-full text-base text-text font-semibold">Designation:</h4>
                                    <input type='text' placeholder={`Designation`} required className='flex-1 border border-slate-300 bg-white rounded-sm text-base p-3' />
                                </div>
                                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                    <h4 className="w-[10rem] lg:w-full text-base text-text font-semibold">Phone Number:</h4>
                                    <div className="flex-1 flex gap-2 relative">
                                        <div className="bg-slate-200 text-slate-500 text-base grid place-items-center px-4">+234</div>
                                        <input type='text' placeholder={`e.g. 7089237612`} pattern='[0-9]${10}' required className='flex-1 border border-slate-300 bg-white rounded-sm text-base p-3' />
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                    <h4 className="w-[10rem] lg:w-full text-base text-text font-semibold">Email:</h4>
                                    <input type='email' placeholder={`someone@email.com`} required className='flex-1 border border-slate-300 bg-white rounded-sm text-base p-3' />
                                </div>
                                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                    <h4 className="w-[10rem] lg:w-full text-base text-text font-semibold">Business Address:</h4>
                                    <input type='text' placeholder={`Address`} required className='flex-1 border border-slate-300 bg-white rounded-sm text-base p-3' />
                                </div>
                                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                    <h4 className="w-[10rem] lg:w-full text-base text-text font-semibold">Type of Construction Work:</h4>
                                    <div className="flex-1 grid grid-cols-2 flex-wrap gap-2 relative">
                                        <label htmlFor="residential" className='cursor-pointer flex items-center gap-3 border border-slate-300 bg-white rounded-sm text-base p-3'>
                                            <input type="radio" name="construction-type" id="residential" /> Residential
                                        </label>
                                        <label htmlFor="commercial" className='cursor-pointer flex items-center gap-3 border border-slate-300 bg-white rounded-sm text-base p-3'>
                                            <input type="radio" name="construction-type" id="commercial" /> Commercial
                                        </label>
                                        <label htmlFor="infrastructure" className='cursor-pointer flex items-center gap-3 border border-slate-300 bg-white rounded-sm text-base p-3'>
                                            <input type="radio" name="construction-type" id="infrastructure" /> Infrastructure
                                        </label>
                                        <label htmlFor="others" className='cursor-pointer flex items-center md:gap-3 flex-wrap border border-slate-300 bg-white rounded-sm text-base p-3'>
                                            Others: <input type="text" name="construction-type" id="others" className='flex-1 border-b border-b-slate-300' />
                                        </label>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4">
                                    <button className="button bg-secondary font-semibold">Save & Next</button>
                                </div>
                            </form>
                        </figure>)
                }
                {
                    activeForm === "candidates" && (
                        <figure className='flex flex-col gap-4 py-4 w-full'>
                            <h2 className="text-2xl font-bold text-sky-700 pb-3 border-b border-slate-200">Enter Candidates Information</h2>
                            <form action="" className="flex flex-col gap-4 py-4 px-2 md:px-4 min-w-[30rem] max-w-[60rem] overflow-x-scroll">
                                <table className='w-full'>
                                    <thead className='border border-slate-300 bg-slate-200'>
                                        <tr>
                                            <th className='p-1 px-4 text-nowrap'>S/N</th>
                                            <th className='p-1 px-4 text-nowrap'>Name of Artisan</th>
                                            <th className='p-1 px-4'><div className="flex flex-col items-center">Trade/Skill <span className='text-xs font-light text-nowrap'>(e.g. Masonry, Plumbing)</span></div></th>
                                            <th className='p-1 px-4'><div className="flex flex-col items-center">Sex <span className='text-xs font-light text-nowrap'>(M/F)</span></div></th>
                                            <th className='p-1 px-4'>Age</th>
                                            <th className='p-1 px-4'>Years of <br /> Experience</th>
                                            <th className='p-1 px-4 text-nowrap'>Phone Number</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-slate-200 text-center'>
                                        <tr>
                                            <td>1</td>
                                            <td><input required type="text" id='fullname1' placeholder="e.g. Sunday Someone" className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input required type="text" id='trade1' placeholder="e.g. Plumbing" className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input required type="text" id='sex1' className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input required type="text" id='age1' className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input required type="text" id='experience1' className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input required type="text" id='phone1' className="flex-1 p-2 border border-slate-200" /></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td><input type="text" id='fullname2' placeholder="e.g. David Someone" className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input type="text" id='trade2' placeholder="e.g. Masonry" className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input type="text" id='sex2' className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input type="text" id='age2' className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input type="text" id='experience2' className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input type="text" id='phone2' className="flex-1 p-2 border border-slate-200" /></td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td><input type="text" id='fullname3' placeholder="e.g. Angela Someone" className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input type="text" id='trade3' placeholder="e.g. Masonry" className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input type="text" id='sex3' className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input type="text" id='age3' className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input type="text" id='experience3' className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input type="text" id='phone3' className="flex-1 p-2 border border-slate-200" /></td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td><input type="text" id='fullname4' placeholder="e.g. Rita Someone" className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input type="text" id='trade4' placeholder="e.g. Plumbing" className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input type="text" id='sex4' className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input type="text" id='age4' className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input type="text" id='experience4' className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input type="text" id='phone4' className="flex-1 p-2 border border-slate-200" /></td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td><input type="text" id='fullname5' placeholder="e.g. Felicia Someone" className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input type="text" id='trade5' placeholder="e.g. Tiling" className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input type="text" id='sex5' className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input type="text" id='age5' className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input type="text" id='experience5' className="flex-1 p-2 border border-slate-200" /></td>
                                            <td><input type="text" id='phone5' className="flex-1 p-2 border border-slate-200" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="flex justify-end gap-4">
                                    <button className="button bg-secondary font-semibold">Save & Preview</button>
                                </div>
                            </form>
                        </figure>)
                }
            </aside>
        </div>
    </section>
</main>
    */