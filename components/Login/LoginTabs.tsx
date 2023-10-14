"use client";
import LoginForm from "@/components/Login/LoginForm";
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
import { useRouter, useSearchParams } from "next/navigation";

const LoginTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTab = searchParams.get("tab") || "user";

  return (
    <div className="max-w-md mx-auto h-max">
      <Tabs
        value={selectedTab}
        className="max-w-sm"
        onValueChange={(value) => {
          router.push(`?tab=${value}`);
        }}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle>User Login</CardTitle>
              <CardDescription>
                Sign in to your account to access your bookings and preferences.
                New here? You can also register for an account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
              <CardFooter className="mt-8 p-0 flex justify-center">
                <p className="dark:text-gray-400 text-sm">
                  Don&apos;t have an account?
                  <span>
                    <Link
                      href={"/signup"}
                      className={buttonVariants({
                        variant: "link",
                        size: "xs",
                      })}
                    >
                      Sign Up
                    </Link>
                  </span>
                </p>
              </CardFooter>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>
                Access the admin portal to manage movies, theaters, and
                bookings. Please enter your admin credentials to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginTabs;
