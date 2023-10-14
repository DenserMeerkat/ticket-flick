"use client";
import { ThemeProvider } from "next-themes";
import "react-multi-carousel/lib/styles.css";
import Footer from "@/components/Footer/Footer";

export default function RootComponet({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider enableSystem defaultTheme="dark" attribute="class">
      {children}
      <Footer />
    </ThemeProvider>
  );
}
