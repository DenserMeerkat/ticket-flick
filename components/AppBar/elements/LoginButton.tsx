import { User } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const LoginButton = () => {
  return (
    <Link href={"/login"} className={buttonVariants({ variant: "outline" })}>
      <User className="md:mr-2 h-4 w-4" />
      <p className="hidden md:inline pr-1">Login</p>
    </Link>
  );
};

export default LoginButton;
