"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loginUser, registerUser } from "@/service/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

/* === Валидация === */
const registerSchema = yup.object({
  username: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
  dateOfBirth: yup.string().required("Birth date is required"),
  gender: yup
    .mixed()
    .oneOf(["male", "female", "other"], "Select a gender")
    .required(),
});

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

export default function Page() {
  const router = useRouter();

  // --- login form
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin, isSubmitting: isLoginSubmitting },
    reset: resetLoginForm,
  } = useForm({ resolver: yupResolver(loginSchema) });

  // --- sign up form
  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    control,
    formState: { errors: errorsSignUp, isSubmitting: isSignUpSubmitting },
    reset: resetSignUpForm,
  } = useForm({ resolver: yupResolver(registerSchema) });

  /* === submit handlers === */
  const onSubmitLogin = async (data) => {
    try {
      const res = await loginUser(data); // <- передаём data
      if (res?.status === "success") {
        toast.success("Logged in");
        router.push("/");
      } else {
        throw new Error(res?.message || "Login failed");
      }
    } catch (e) {
      toast.error("Invalid email or password");
    } finally {
      resetLoginForm();
    }
  };

  const onSubmitRegister = async (data) => {
    try {
      const res = await registerUser(data); // <- передаём data
      if (res?.status === "success") {
        toast.success("User registered");
        router.push("/");
      } else {
        throw new Error(res?.message || "Registration failed");
      }
    } catch (e) {
      toast.error(
        e.message?.includes("exists")
          ? "Email already exists"
          : "Registration error"
      );
    } finally {
      resetSignUpForm();
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md bg-white text-black dark:bg-neutral-900 dark:text-white border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Facebook
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-400">
              Connect with friends and the world around you on Facebook
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-200 dark:bg-neutral-800 rounded-xl mb-4">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:dark:bg-neutral-700 data-[state=active]:dark:text-white rounded-lg"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:dark:bg-neutral-700 data-[state=active]:dark:text-white rounded-lg"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* LOGIN */}
              <TabsContent value="login">
                <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
                  <div className="space-y-4">
                    <Field
                      label="Email"
                      type="email"
                      reg={registerLogin("email")}
                      error={errorsLogin.email?.message}
                    />
                    <Field
                      label="Password"
                      type="password"
                      reg={registerLogin("password")}
                      error={errorsLogin.password?.message}
                    />
                    <Button
                      className="w-full mt-2"
                      type="submit"
                      disabled={isLoginSubmitting}
                    >
                      <LogIn className="mr-2 w-4 h-4" />{" "}
                      {isLoginSubmitting ? "Logging in..." : "Log in"}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              {/* SIGN UP */}
              <TabsContent value="signup">
                <form onSubmit={handleSubmitSignUp(onSubmitRegister)}>
                  <div className="space-y-4">
                    <Field
                      label="Username"
                      type="text"
                      reg={registerSignUp("username")}
                      error={errorsSignUp.username?.message}
                    />
                    <Field
                      label="Email"
                      type="email"
                      reg={registerSignUp("email")}
                      error={errorsSignUp.email?.message}
                    />
                    <Field
                      label="Password"
                      type="password"
                      reg={registerSignUp("password")}
                      error={errorsSignUp.password?.message}
                    />
                    <Field
                      label="Birthdate"
                      type="date"
                      reg={registerSignUp("dateOfBirth")}
                      error={errorsSignUp.dateOfBirth?.message}
                    />

                    {/* Gender via Controller */}
                    <div className="space-y-1">
                      <Label>Gender</Label>
                      <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex justify-between px-2"
                          >
                            {["male", "female", "other"].map((value) => (
                              <div
                                key={value}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem id={value} value={value} />
                                <Label htmlFor={value} className="capitalize">
                                  {value}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        )}
                      />
                      {errorsSignUp.gender && (
                        <p className="text-red-500 text-sm">
                          {errorsSignUp.gender.message}
                        </p>
                      )}
                    </div>

                    <Button
                      className="w-full mt-2"
                      type="submit"
                      disabled={isSignUpSubmitting}
                    >
                      <LogIn className="mr-2 w-4 h-4" />{" "}
                      {isSignUpSubmitting ? "Signing up..." : "Sign Up"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Divider />
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <GoogleIcon /> Sign in with Google
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

/* === Вспомогалки === */
function Field({ label, type, reg, error }) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={`Enter your ${label.toLowerCase()}`}
        {...reg}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

function Divider() {
  return (
    <div className="relative w-full flex items-center">
      <span className="flex-1 border-t border-gray-300 dark:border-neutral-700" />
      <span className="px-2 text-xs text-gray-500 dark:text-gray-400 uppercase">
        or continue with
      </span>
      <span className="flex-1 border-t border-gray-300 dark:border-neutral-700" />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
