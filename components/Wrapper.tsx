"use client";
import { ThemeProvider } from "next-themes";
import AppBar from "@/components/AppBar/AppBar";
import "react-multi-carousel/lib/styles.css";

export default function RootComponet({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider enableSystem defaultTheme="dark" attribute="class">
      {children}
    </ThemeProvider>
  );
}
