import type { Metadata } from "next";
import { Mulish, Inter } from "next/font/google"
import "../globals.css";
import { Toaster } from "react-hot-toast"
import DashThemeProvider from "@/provider/ThemeProvider";
import { AntdRegistry } from '@ant-design/nextjs-registry'
import {DashLayout, DashImage} from "@/modules/dashboard/layout";

const inter = Inter({ subsets: ["latin"], variable: "--inter", weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], fallback: ["cursive"] });
const mulish = Mulish({ weight: ["200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"], variable: "--mulish", fallback: ["Helvetica", "Arial", "sans-serif"] });

export const metadata: Metadata = {
    title: "Anya Girlchild :: Overview",
    description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <body className={`${mulish.variable} ${inter.variable} antialiased font-mulish relative`}>
                <AntdRegistry>
                    <DashThemeProvider>
                        <Toaster />
                        <DashLayout image={<DashImage />}>
                            <div className="font-mulish min-h-[80vh]"> {children} </div>
                        </DashLayout>
                    </DashThemeProvider>
                </AntdRegistry>
            </body>
        </html>
    );
}
