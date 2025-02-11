import type { Metadata } from "next";
import { Inter, Mulish } from 'next/font/google'
import "../globals.css";
// import { AosProvider, Footer, Header } from '@/components'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import ThemeProvider from "@/provider/ThemeProvider";
import { Toaster } from "react-hot-toast";
import PBHeader from "@/modules/public/pblayout/PBHeader";
import PBFooter from "@/modules/public/pblayout/PBFooter";
import { AosProvider } from "@/modules/shared";

const inter = Inter({ subsets: ["latin"], variable: "--inter", weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], fallback: ["cursive"] });
const mulish = Mulish({ weight: ["200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"], variable: "--mulish", fallback: ["Helvetica", "Arial", "sans-serif"] });

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
      <body className={`${mulish.variable} ${inter.variable} antialiased relative`}>
         <AntdRegistry>
          <ThemeProvider>
            <Toaster /> 
            <AosProvider>
              <PBHeader />
              <div className="font-inter min-h-[80vh]"> {children} </div>
              <PBFooter />
            </AosProvider>
           </ThemeProvider>
        </AntdRegistry> 
      </body>
    </html>
  );
}
