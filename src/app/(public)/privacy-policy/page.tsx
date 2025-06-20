import { ASSET_URL } from '@/assets'
import PBBreadCrumb from '@/modules/public/pblayout/PBBreadCrumb'
import { appRoutePaths } from '@/routes/paths'
import { Metadata } from 'next';
import Link from 'next/link'

export const metadata: Metadata = {
    title: "Anya Girlchild :: Privacy Policy",
    description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
    icons: ASSET_URL["anya_girlchild_logo"].src,
    openGraph: {
        type: "website",
        title: "Anya Girlchild :: Privacy Policy",
        images: ASSET_URL["anyagirlchild_douvet_gift"].src,
        siteName: "Anya Girlchild Foundation",
        description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
    }
};

export default function PBPrivacyPolicy() {
    return (
        <>
            <PBBreadCrumb image={ASSET_URL["anyagirlchild_douvet_gift"]} />
            <section className="flex flex-col bg-white gap-3 px-5 py-10">
                <div className="container mx-auto flex flex-col gap-3">

                    <h5 className="text-primary text-2xl sm:text-3xl md:text-5xl py-5 font-bold font-grotesk">Privacy Policy</h5>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm pb-5">Effective Date: 18th June, 2025</p>

                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">Anya Girlchild Foundation (“we”, “our”, or “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <Link href={appRoutePaths.home} className='text-secondary font-medium underline'>https://anyagirlchild.com</Link>.</p>

                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">By using this website, you consent to the practices described in this Privacy Policy.</p>
                    <h5 className="text-slate-700 text-md sm:text-lg font-semibold font-grotesk">1. Information We Collect</h5>

                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">We do not collect personal information unless you voluntarily provide it to us. We may collect:</p>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm font-semibold">a) Personal Information You Provide</p>
                    <ul className="list-disc list-inside">
                        <li style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">Contact Form & Donation Form: Name, email address, phone number, and your message.</li>
                        <li style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">Partnership Form: Information you provide in the downloadable PDF form sent via email.</li>
                        <li style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">Blog Comments: Name, email address, and comment/message.</li>
                    </ul>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm font-semibold">b) Automatically Collected Information</p>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">We may automatically collect certain non-personal information such as:</p>
                    <ul className="list-disc list-inside">
                        <li style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">IP address</li>
                        <li style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">Browser type</li>
                        <li style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">Pages visited</li>
                        <li style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">Time spent on the website</li>
                    </ul>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">This information is used for basic website analytics and to improve site functionality.</p>

                    <h5 className="text-slate-700 text-md sm:text-lg font-semibold font-grotesk">2. How We Use Your Information</h5>

                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">We use your information solely for the following purposes:</p>
                    <ul className="list-disc list-inside">
                        <li style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">To respond to your inquiries or partnership requests</li>
                        <li style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">To process donations or correspondence</li>
                        <li style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">To improve and maintain our website and services</li>
                        <li style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">To engage with you regarding our activities or updates (only if you explicitly consent)</li>
                    </ul>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">We do not sell, rent, or share your personal information with third parties for marketing or commercial purposes.</p>

                    <h5 className="text-slate-700 text-md sm:text-lg font-semibold font-grotesk">3. Sharing of Information</h5>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">We may disclose your personal information in the following limited situations:</p>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">To comply with any legal obligations or enforce our rights</p>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">With your explicit consent</p>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">To service providers helping us operate the website (e.g., website hosting), bound by confidentiality obligations</p>

                    <h5 className="text-slate-700 text-md sm:text-lg font-semibold font-grotesk">4. Cookies and Tracking Technologies</h5>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">Our website may use basic cookies to improve user experience. You can control or disable cookies through your browser settings. We do not use cookies for advertising or third-party tracking.</p>

                    <h5 className="text-slate-700 text-md sm:text-lg font-semibold font-grotesk">5. Security of Your Information</h5>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">We take reasonable measures to protect your information but cannot guarantee absolute security. No internet-based system is 100% secure.</p>

                    <h5 className="text-slate-700 text-md sm:text-lg font-semibold font-grotesk">6. External Links</h5>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">Our website may contain links to external sites. We are not responsible for the privacy practices of such websites.</p>

                    <h5 className="text-slate-700 text-md sm:text-lg font-semibold font-grotesk">7. Children’s Privacy</h5>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">We do not knowingly collect or solicit information from anyone under the age of 13. If we become aware that we have inadvertently received personal information from a child, we will delete it.</p>

                    <h5 className="text-slate-700 text-md sm:text-lg font-semibold font-grotesk">8. Your Choices</h5>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">You may choose not to provide personal information; however, this might limit your ability to contact us or engage with certain features of the website.</p>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">If you wish to update or delete any personal information we hold about you, please contact us at:</p>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">📧 Email: <Link href={`mailto:info@anyagirlchild.com`} className='text-secondary underline'>info@anyagirlchild.com</Link>.</p>

                    <h5 className="text-slate-700 text-md sm:text-lg font-semibold font-grotesk">9. Changes to This Privacy Policy</h5>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>

                    <h5 className="text-slate-700 text-md sm:text-lg font-semibold font-grotesk">10. Contact Us</h5>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">For any questions about this Privacy Policy, please contact:</p>
                    <p style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm font-bold">Anya Girlchild Foundation</p>
                    <ul className="list-disc list-inside -translate-y-2">
                        <li style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">📧 Email: <Link href={`mailto:info@anyagirlchild.com`} className='text-secondary underline'>info@anyagirlchild.com</Link>.</li>
                        <li style={{ lineHeight: 1.5 }} className="text-slate-600 leading-loose text-justify text-xs sm:text-sm">🌐 Website: <Link href={appRoutePaths.home} className='text-secondary underline'>https://anyagirlchild.com</Link>.</li>
                    </ul>
                </div>
            </section>
        </>
    )
}
