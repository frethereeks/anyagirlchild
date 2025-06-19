import { ASSET_URL } from '@/assets'
import { appRoutePaths } from '@/routes/paths'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function PBTermsAndConditions() {
    return (
        <main className='flex flex-col'>
            <section className="flex flex-col bg-white gap-3 px-5 pb-10">
                <div className="container mx-auto flex flex-col gap-3 font-grotesk">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                        <aside className="relative flex-1 h-60vh md:h-auto gap-4 text-center md:text-left">
                            <Image src={ASSET_URL['donation_man']} alt={'donation_woman'} className='object-cover object-top' fill />
                            <div className="relative bg-primary/50 flex-1 h-full flex flex-col justify-center items-center gap-4 text-center md:text-left p-4">
                            </div>
                        </aside>
                        <aside className="flex-1 flex flex-col gap-4 py-4">
                            <h5 className="text-secondary text-2xl sm:text-3xl md:text-5xl pt-5 font-bold font-grotesk">Terms and Conditions</h5>
                            <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm pb-5">Effective Date: 18th June, 2025</p>
                            <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm ">Welcome to Anya Girlchild Foundation (“we”, “us”, or “our”). By accessing or using our website <Link href={appRoutePaths.home} className='text-secondary font-medium underline'>https://anyagirlchild.com</Link>, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully.</p>
                            <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm ">If you do not agree with any part of these Terms, please do not use our website.</p>
                            <h5 className="text-slate-700 text-md sm:text-lg font-semibold font-grotesk">1. About Us</h5>
                            <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">Anya Girlchild Foundation is a non-governmental, non-profit organization dedicated to providing voluntary aid to empower and improve the welfare of the girl child.</p>

                            <h5 className="text-slate-700 text-md sm:text-lg font-semibold font-grotesk">2. Use of the Website</h5>
                            <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">You agree to use this website only for lawful purposes and in a way that does not infringe on the rights of, restrict, or inhibit anyone else’s use or enjoyment of the site.</p>
                            <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">You must not:</p>
                            <ul className="list-disc list-inside">
                                <li style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">Use this website for any fraudulent, unlawful, or malicious purpose.</li>
                                <li style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">Attempt to gain unauthorized access to any part of the site or disrupt its functioning.</li>
                                <li style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">Submit false or misleading information.</li>
                            </ul>

                            <h5 className="text-slate-700 text-md sm:text-lg font-semibold font-grotesk">3. User Submissions</h5>
                            <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">When you submit information through our contact, donation, or partnership forms, you confirm that:</p>
                            <ul className="list-disc list-inside">
                                <li style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">The information you provide is true, accurate, and complete.</li>
                                <li style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">You have the right to share that information with us.</li>
                            </ul>
                            <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">We may use your submissions to respond to your requests or for purposes outlined in our <Link href={`${appRoutePaths.privacyPolicy}`} className='text-secondary underline'>Privacy Policy.</Link></p>

                            <h5 className="text-slate-700 text-md sm:text-lg font-semibold font-grotesk">4. Donations</h5>
                            <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">Donations made through our website are voluntary and non-refundable unless otherwise stated. We are committed to ensuring that funds received are used solely for the programs and initiatives that benefit the welfare of the girl child.</p>
                            <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">We do not engage in fundraising for personal or commercial gain.</p>
                            <h5 className="text-slate-700 text-md sm:text-lg font-semibold font-grotesk">5. Intellectual Property</h5>
                            <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">All content on this website (including text, images, graphics, and logos) is the property of Anya Girlchild Foundation unless otherwise stated. You may not reproduce, republish, or distribute any part of this website without our prior written permission.</p>
                        </aside>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                        <aside className="flex-1 flex flex-col gap-4 py-4">
                            <h5 className="text-slate-700 text-md sm:text-lg font-semibold font-grotesk">6. Third-Party Links</h5>

                            <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">Our website may contain links to external websites. We are not responsible for the content, accuracy, or practices of any third-party sites. Visiting external links is at your own risk.</p>
                            <h5 className="text-slate-700 text-md sm:text-lg font-semibold font-grotesk">7. Limitation of Liability</h5>

                            <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">While we strive to keep our website accurate and up to date, we make no warranties or guarantees regarding its content or availability. We are not liable for any loss or damage arising from the use of this website.</p>
                            <h5 className="text-slate-700 text-md sm:text-lg font-semibold font-grotesk">8. Privacy</h5>

                            <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">Your use of this website is also governed by our Privacy Policy, which explains how we collect and use your data.</p>
                            <h5 className="text-slate-700 text-md sm:text-lg font-semibold font-grotesk">9. Modifications</h5>

                            <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">We may update or change these Terms and Conditions at any time. Changes will be posted here with the updated effective date. Your continued use of the site constitutes your acceptance of any changes.</p>
                            <h5 className="text-slate-700 text-md sm:text-lg font-semibold font-grotesk">10. Governing Law</h5>

                            <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">These Terms shall be governed by and interpreted in accordance with the laws of [Insert Country], without regard to its conflict of law principles.</p>
                            <h5 className="text-slate-700 text-md sm:text-lg font-semibold font-grotesk">11. Contact Us</h5>

                            <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">For questions about these Terms and Conditions, please contact:</p>
                            <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm font-bold">Anya Girlchild Foundation</p>
                            <ul className="list-disc list-inside -translate-y-2">
                                <li style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">📧 Email: <Link href={`mailto:info@anyagirlchild.com`} className='text-secondary underline'>info@anyagirlchild.com</Link>.</li>
                                <li style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">🌐 Website: <Link href={appRoutePaths.home} className='text-secondary underline'>https://anyagirlchild.com</Link>.</li>
                            </ul>
                        </aside>
                        <aside className="relative flex-1 h-60vh md:h-auto gap-4 text-center md:text-left">
                            <Image src={ASSET_URL['adult_intervention']} alt={'donation_woman'} className='object-cover object-top' fill />
                            <div className="relative bg-primary/50 flex-1 h-full flex flex-col justify-center items-center gap-4 text-center md:text-left p-4">
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    )
}
