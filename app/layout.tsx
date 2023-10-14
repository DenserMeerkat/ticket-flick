import "./globals.css";
import type { Metadata } from "next";
import RootComponet from "../components/utils/Wrapper";
import { Inter } from "next/font/google";
import { appName } from "@/lib/constants";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: appName,
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <RootComponet>{children}</RootComponet>
      </body>
    </html>
  );
}
