import { useContext, useState } from "react";
import { LogOut, User } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AppStateContext } from "@/components/utils/AppStateContext";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const state = useContext(AppStateContext);
  function logout() {
    setDialogOpen(false);
    state!.setActiveUser(undefined);
    toast({
      title: "Logout Successful",
      description: (
        <p className="mt-2 text-lg font-medium w-[340px] rounded-md p-1 pl-0">
          {`We're sad to see you go...`}
        </p>
      ),
    });
  }
  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button onClick={() => setDialogOpen(true)} variant={"outline"}>
          <LogOut className="md:mr-2 h-4 w-4" />
          <p className="hidden md:inline pr-1">Logout</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will securely log you out. Confirming will end your
            session, ensuring the protection of your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button variant={"destructive"} onClick={logout}>
            <LogOut className="h-4 w-4 mr-3" />
            Logout
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { LogoutButton, LoginButton };
