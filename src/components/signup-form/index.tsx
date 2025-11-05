"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { signUpSchema, SignUpSchema } from "./signup-schems";

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignUpSchema) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Welcome back, ${values.email}!`);
      form.reset();
    }, 1200);
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-name" className="text-sm font-medium">
              Full Name
            </Label>
            <Input
              id="signup-name"
              type="text"
              placeholder="John Doe"
              disabled={isLoading}
              className="h-10"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-email" className="text-sm font-medium">
              Email Address
            </Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="name@example.com"
              disabled={isLoading}
              className="h-10"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-password" className="text-sm font-medium">
              Password
            </Label>
            <Input
              id="signup-password"
              type="password"
              placeholder="••••••••"
              disabled={isLoading}
              className="h-10"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="signup-confirm-password"
              className="text-sm font-medium"
            >
              Confirm Password
            </Label>
            <Input
              id="signup-confirm-password"
              type="password"
              placeholder="••••••••"
              disabled={isLoading}
              className="h-10"
              {...form.register("confirmPassword")}
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              disabled={isLoading}
              {...form.register("termsAccepted")}
            />
            <Label
              htmlFor="terms"
              className="text-sm font-medium cursor-pointer"
            >
              I accept the{" "}
              <button type="button" className="text-primary hover:underline">
                terms and conditions
              </button>
            </Label>
          </div>
          {form.formState.errors.termsAccepted && (
            <p className="text-sm text-red-500">
              {form.formState.errors.termsAccepted.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 font-semibold"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded-full" />
                <span>Creating account...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
