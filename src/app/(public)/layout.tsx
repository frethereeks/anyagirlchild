import type { Metadata } from "next";
import { Poppins, Space_Grotesk } from 'next/font/google'
import "../globals.css";
import { Analytics } from '@vercel/analytics/next';
// import { AosProvider, Footer, Header } from '@/components'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import ThemeProvider from "@/provider/ThemeProvider";
import { Toaster } from "react-hot-toast";
import PBHeader from "@/modules/public/pblayout/PBHeader";
import PBFooter from "@/modules/public/pblayout/PBFooter";
import { AosProvider } from "@/modules/shared";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--grotesk", weight: ["300", "400", "500", "600", "700"], fallback: ["cursive"] });
const poppins = Poppins({ subsets: ["latin"], variable: "--poppins", weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], fallback: ["cursive"] });

export const metadata: Metadata = {
  title: "Anya Girlchild :: Home",
  description: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${grotesk.variable} ${poppins.variable} antialiased relative`}>
        <AntdRegistry>
          <ThemeProvider>
            <Toaster />
            <AosProvider>
              <PBHeader />
              <div className="font-poppins min-h-[80vh]"> {children} </div>
              <Analytics />
              <PBFooter />
            </AosProvider>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
