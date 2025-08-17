import React from 'react'
import { Html, Body, Head, Heading, Text, Link, Tailwind, Section, Img } from '@react-email/components'
import { THEME_COLOR } from '@/config/theme'
import { config } from '@/config'
import { ASSET_URL } from '@/assets'

export const ContactEmail = ({ fullname, email, message }: {fullname: string, email: string, message: string}) => {
    return (
        <Html lang='en'>
            <Head />
            <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4' }}>
                <Tailwind
                    config={{ theme: { extend: { colors: { primary: THEME_COLOR.primary, secondary: THEME_COLOR.secondary, text: THEME_COLOR.text, background: THEME_COLOR.background } } } }}
                >
                    <Section className="bg-white rounded-lg shadow-lg w-full max-w-4xl my-10 mx-auto">
                        <div className="p-6">
                            <Section className="">
                                <Link href={config.APP_PUBLIC_SITE_URL} className="m-0 p-0 w-max mx-auto">
                                    <Section className="h-12 w-12 relative rounded-sm bg-primary flex-shrink-0 mx-auto">
                                        <Img src={ASSET_URL['anya_girlchild_logo'].src} alt={`${config.APP_NAME} Logo`} className="h-full w-full absolute top-0 left-0 object-cover rounded-sm" />
                                    </Section>
                                    <Section className="m-0 p-0 gap-0 h-max max-h-max w-max mx-auto">
                                        <Heading as='h5' className="text-lg font-bold text-secondary leading-none m-0 p-0">ANYAGIRLCHILD</Heading>
                                        <Text className="text-sm text-pink-50 font-bold tracking-[4.5px] w-max bg-pink-500 px-2 py-1 m-0 leading-none">FOUNDATION</Text>
                                    </Section>
                                </Link>
                                <Text className="flex items-center gap-2 mx-auto w-max">
                                    <Link href={"https://facebook.com"} className="h-6 w-6 rounded-full leading-6 text-center text-white text-sm font-semibold bg-blue-500">F</Link>
                                    <Link href={"https://twitter.com"} className="h-6 w-6 rounded-full leading-6 text-center text-white text-sm font-semibold bg-primary">T</Link>
                                    <Link href={"https://instagram.com"} className="h-6 w-6 rounded-full leading-6 text-center text-white text-sm font-semibold bg-pink-500">I</Link>
                                </Text>
                            </Section>
                            <Section className="my-4">
                                <Heading as='h2' className="text-xl font-bold text-secondary mb-4">Thank you for contacting us!</Heading>
                                <Text className="text-base text-text mb-4">We would love to hear from you! You have received a new contact form submission.</Text>
                                <Text className="text-base text-text mb-4">Here are the details:</Text>
                                <Text className="text-base text-text mb-2"><strong>Full Name:</strong> {fullname}</Text>
                                <Text className="text-base text-text mb-2"><strong>Email:</strong> {email.toString()}</Text>
                                <Text className="text-base text-text mb-4"><strong>Message:</strong> {message}</Text>
                                <Text className="text-base text-text mb-4">We appreciate your interest and will get back to you as soon as possible.</Text>
                                {/* <Text className="text-base text-text mb-4">If you have any further questions or need immediate assistance, please feel free to reach out to us at <Link href={`mailto:${config.NEXT_MAIL.FROM}`} className="underline font-medium text-primary">{config.NEXT_MAIL.FROM}</Link>.</Text>
                                <Text className="text-base text-text mb-4">Thank you for being a part of our community!</Text> */}
                                <Text className="text-base text-text mb-4">Best regards,</Text>
                                <Text className="text-base text-text mb-4">The {config.APP_NAME} Team</Text>
                                <Text className="text-xs text-text mt-8">You received this mail because of an action you performed on <Link href={config.APP_PUBLIC_SITE_URL} className="underline font-medium opacity-70 text-primary">AnyagirlChild Foundation</Link>. If you wish to stop receiving mails from us, please, click <Link href={config.APP_PUBLIC_SITE_URL} className="underline font-medium opacity-70 text-primary">here</Link>.</Text>
                            </Section>
                        </div>
                    </Section>
                </Tailwind>

            </Body>
        </Html>
    )
}

{/* <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
    <Heading as='h1' className='text-primary font-bold' style={{ textAlign: 'center', fontSize: 24, color: THEME_COLOR.secondary }}>Thank you for Contacting Us</Heading>
    <p style={{ color: THEME_COLOR.text }}>We would love to hear from you!</p>
    <p style={{ color: '#555' }}>You have received a new contact form submission.</p>
    <Button href={config.APP_PUBLIC_SITE_URL} style={{ backgroundColor: THEME_COLOR.secondary, color: '#fff', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px' }}>
        View Submission
    </Button>
    <Text style={{ fontSize: 12, lineHeight: 16, color: "#334155", textAlign: 'center', fontWeight: 100, padding: "10px 0 0" }}>You received this mail because you of an action you performed on <Link style={{ textDecoration: 'underline', fontWeight: 700, color: 'inherit' }} href="${appRoutePaths.home}">AnyagirlChild Foundation</Link>. If you wish to stop receiving mails from us, please, click <Link style={{ textDecoration: 'underline', fontWeight: 700, color: 'inherit' }} href={config.APP_PUBLIC_SITE_URL}>here</Link>
    </Text>
</div> */}