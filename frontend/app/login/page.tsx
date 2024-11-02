"use client";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";

// zod object validation
const profileFormSchema = z.object({
  email: z.string().email().min(2, {
    message: "email must be a valid mail.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function Page() {
  const auth = useAuth();
  async function onSubmit(data: ProfileFormValues) {
    auth?.loginAction(data);
    return;
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <Fragment>
      <div>
        <h1 className="font-bold text-3xl text-center mb-7">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Email" {...field} />
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
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button variant="outline" type="submit">
              Login
            </Button>
          </form>
        </Form>

        <div className="my-10 ml-auto w-fit text-sm">
          Don&apos;t Have Account ?
          <Link href={"/sign-up"} className="text-red-600">
            {" "}
            Sign Up
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
