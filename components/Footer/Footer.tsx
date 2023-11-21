import React from "react";
import ThemeButtons from "./ThemeButtons";
import { Button } from "../ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import { githubRepo } from "@/lib/constants";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer
      className="sm:pb-4 border-t 
    bg-zinc-50/[0.5]  dark:bg-zinc-950/[0.7] backdrop-filter backdrop-blur-lg"
    >
      <div className=" max-w-7xl mx-auto py-2 px-1 sm:px-2 md:px-6">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <Link href={githubRepo}>
              <Button
                size={"sm"}
                variant={"link"}
                className=" text-zinc-600 hover:text-zinc-900 dark:text-zinc-400  hover:dark:text-zinc-50"
              >
                <Github className="md:mr-2 h-4 w-4" />
                <p className="hidden md:block">GitHub</p>
              </Button>
            </Link>
            <div className="h-4 w-[1px] bg-zinc-600 dark:bg-zinc-400 mr-2"></div>
            <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              © {year} TicketFlick, Inc.
            </p>
          </div>
          <ThemeButtons />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
