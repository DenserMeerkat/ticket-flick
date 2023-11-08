"use client";
import React, { useState, useContext } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/lib/login_utils";
import { AppStateContext } from "../utils/AppStateContext";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email required." })
    .email("This is not a valid email."),
  password: z.string().min(8, { message: "Minimum 8 characters." }),
});

const LoginForm = (props: any) => {
  const router = useRouter();
  const isAdminForm = props.isAdminForm ?? false;
  const state = useContext(AppStateContext);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
    var user;
    if (isAdminForm) {
      user = await loginUser(data.email, data.password, state!.admins);
    } else {
      user = await loginUser(data.email, data.password, state!.users);
    }
    console.log(user);
    if (user) {
      state!.setActiveUser(user);

      if (isAdminForm) {
        state!.setIsAdmin(true);
        console.log(state!.admins);
      } else {
        state!.setIsAdmin(false);
        console.log(state!.users);
      }
      toast({
        title: "Login Success",
        description: (
          <p className="mt-2 text-lg font-medium w-[340px] rounded-md bg-slate-950 p-1 pl-0">
            {`Welcome ${user.name}`}
          </p>
        ),
      });
      router.replace("/");
    } else {
      toast({
        title: "Login Failed",
        description: (
          <p className="mt-2 text-lg font-medium w-[340px] rounded-md bg-slate-950 p-1 pl-0">
            {`Incorrect Credentials`}
          </p>
        ),
      });
    }
  }

  function togglePasswordVisibility() {
    setShowPassword((prev: boolean) => !prev);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="youremail@example.com"
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                    {showPassword ? (
                      <EyeOff
                        className="h-4 w-4"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <Eye
                        className="h-4 w-4"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="p-1"></div>
        <Button type="submit" size={"sm"} className="w-full max-w-xl">
          <p className="min-w-full max-w-lg">Submit</p>
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
