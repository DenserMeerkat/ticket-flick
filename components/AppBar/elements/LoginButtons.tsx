import { useContext } from "react";
import { User } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AppStateContext } from "@/components/utils/AppStateContext";
import { toast } from "@/components/ui/use-toast";

const LoginButton = () => {
  return (
    <Link
      href={"/login?tab=user"}
      className={buttonVariants({ variant: "outline" })}
    >
      <User className="md:mr-2 h-4 w-4" />
      <p className="hidden md:inline pr-1">Login</p>
    </Link>
  );
};

const LogoutButton = () => {
  const state = useContext(AppStateContext);
  function logout() {
    state!.setActiveUser(undefined);
    toast({
      title: "Logout Successful",
      description: (
        <p className="mt-2 text-lg font-medium w-[340px] rounded-md bg-slate-950 p-1 pl-0">
          {`We're sad to see you go...`}
        </p>
      ),
    });
  }
  return (
    <Button onClick={logout} variant={"outline"}>
      <User className="md:mr-2 h-4 w-4" />
      <p className="hidden md:inline pr-1">Logout</p>
    </Button>
  );
};

export { LogoutButton, LoginButton };
