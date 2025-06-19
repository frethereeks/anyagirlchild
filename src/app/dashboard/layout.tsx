import type { Metadata } from "next";
import { Space_Grotesk, Poppins } from "next/font/google"
import "../globals.css";
import DashThemeProvider from "@/provider/ThemeProvider";
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { DashLayout, DashImage } from "@/modules/dashboard/layout";
import StoreProvider from "@/provider/ReduxProvider";

const poppins = Poppins({ subsets: ["latin"], variable: "--poppins", weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], fallback: ["cursive"] });
const grotesk = Space_Grotesk({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"], variable: "--grotesk", fallback: ["Helvetica", "Arial", "sans-serif"] });

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
            <body className={`${grotesk.variable} ${poppins.variable} antialiased font-grotesk relative`}>
                <AntdRegistry>
                    <DashThemeProvider>
                        <StoreProvider>
                            <DashLayout image={<DashImage />}>
                                <div className="font-grotesk min-h-[80vh]"> {children} </div>
                            </DashLayout>
                        </StoreProvider>
                    </DashThemeProvider>
                </AntdRegistry>
            </body>
        </html>
    );
}
