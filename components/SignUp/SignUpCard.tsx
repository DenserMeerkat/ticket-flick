import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

const SignUpCard = () => {
  return (
    <Card className="max-w-sm h-max">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>
          Join us today and start booking your favorite movies hassle-free.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
        <CardFooter className="mt-8 p-0 flex justify-center">
          <p className="dark:text-gray-400 text-sm">
            Already have an account?
            <span>
              <Link
                href={"/login"}
                className={buttonVariants({
                  variant: "link",
                  size: "xs",
                })}
              >
                Login
              </Link>
            </span>
          </p>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
