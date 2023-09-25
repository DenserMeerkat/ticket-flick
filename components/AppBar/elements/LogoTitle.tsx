import React from "react";
import { Clapperboard } from "lucide-react";
import Link from "next/link";
import { appName } from "@/lib/constants";

const LogoTitle = () => {
  return (
    <Link href={"/"} className="cursor-pointer flex gap-2 items-center">
      <Clapperboard className="h-8 w-8 p-1.5" />
      <p className="font-bold dark:font-semibold tracking-wider">{appName}</p>
    </Link>
  );
};

export default LogoTitle;
