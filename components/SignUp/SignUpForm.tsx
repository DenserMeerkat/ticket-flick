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
import { AppStateContext } from "../utils/AppStateContext";
import { User } from "@/types/userType";
import { generateUUID } from "@/lib/login_utils";
import hashPotato from "@/lib/hashPassword";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z.string().nonempty("Name required"),
    email: z
      .string()
      .min(1, { message: "Email required." })
      .email("This is not a valid email."),
    password: z.string().min(8, { message: "Minimum 8 characters." }),
    confirm: z.string().min(8, { message: "Minimum 8 characters." }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const LoginForm = () => {
  const router = useRouter();
  const state = useContext(AppStateContext);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
    const currentUsers = state!.users;
    const exists = currentUsers.find((user) => user.email === data.email);
    if (exists) {
      toast({
        title: "User already Exists!",
      });
    } else {
      const hashedPassword: string = await hashPotato.hashPassword(
        data.password
      );
      const user: User = {
        id: generateUUID(),
        name: data.name,
        email: data.email,
        password: hashedPassword,
      };
      state!.setUsers((prevUsers: User[]) => {
        return [...prevUsers, user];
      });
      toast({
        title: "Account Created Successfully!",
      });
      router.replace(`/login?tab=user`);
    }
    console.log(state!.users);
  }

  function togglePasswordVisibility() {
    setShowPassword((prev: boolean) => !prev);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="youremail@example.com" {...field} />
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
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type={"password"} placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="p-2"></div>
        <Button type="submit" size={"sm"} className="w-full max-w-xl">
          <p className="min-w-full max-w-lg">Submit</p>
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
