import { ArrowBigLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const HomeButton = () => {
  return (
    <Link href={"/"} className={buttonVariants({ variant: "outline" })}>
      <ArrowBigLeft className="md:mr-2 h-4 w-4" />
      <p className="hidden md:inline pr-1">Back</p>
    </Link>
  );
};

export default HomeButton;
