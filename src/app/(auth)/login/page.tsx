"use client";

import { SignInForm } from "@/components/signin-form";
import { SignUpForm } from "@/components/signup-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useState } from "react";

type AuthMode = "signin" | "signup";

const LoginPage = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("signin");

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-md ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {authMode === "signin" ? "Sign In" : "Create Account"}
          </CardTitle>
          <CardDescription className="text-center">
            {authMode === "signin"
              ? "Enter your credentials to access your account"
              : "Fill in your details to create a new account"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex gap-2 mb-6">
            <Button
              type="button"
              variant={authMode === "signin" ? "default" : "outline"}
              className="flex-1 h-10"
              onClick={() => setAuthMode("signin")}
            >
              Sign In
            </Button>
            <Button
              type="button"
              variant={authMode === "signup" ? "default" : "outline"}
              className="flex-1 h-10"
              onClick={() => setAuthMode("signup")}
            >
              Sign Up
            </Button>
          </div>

          {authMode === "signin" && <SignInForm />}

          {authMode === "signup" && <SignUpForm />}

          <div className="mt-4 text-center">
            <span className="text-sm text-muted-foreground block mb-2">
              Or continue with
            </span>
            <Button
              variant="outline"
              className="w-full h-10 flex items-center justify-center gap-2"
              onClick={handleGoogleLogin}
            >
              <Image
                src="/assets/images/google-icon.jpg"
                alt="Google"
                width={20}
                height={20}
                className="object-contain"
              />
              Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
