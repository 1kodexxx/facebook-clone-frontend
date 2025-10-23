"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

/* === Валидация === */
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password required"),
});

const signupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password required"),
});

const FacebookPage = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");

  /* === Форма входа === */
  const {
    register: loginRegister,
    handleSubmit: handleLogin,
    formState: { errors: loginErrors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  /* === Форма регистрации === */
  const {
    register: signupRegister,
    handleSubmit: handleSignup,
    formState: { errors: signupErrors },
  } = useForm({ resolver: yupResolver(signupSchema) });

  const onLoginSubmit = (data) => {
    console.log("Login data:", data);

    // Фейковая проверка (можешь заменить на fetch / axios)
    if (data.email === "test@gmail.com" && data.password === "123456") {
      setLoginError("");
      setTimeout(() => router.push("/profile"), 800);
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const onSignupSubmit = (data) => {
    console.log("Signup data:", data);
    alert("Account created successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 dark:from-blue-950 dark:to-purple-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="w-full max-w-md bg-white/85 dark:bg-neutral-900/90 backdrop-blur-lg shadow-2xl border border-white/40 dark:border-neutral-700">
          <CardHeader className="py-8 text-center space-y-2">
            <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">
              Facebook
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Connect with friends and the world around you.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 dark:bg-neutral-800 rounded-md p-1">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600 dark:data-[state=active]:text-white rounded-md transition-all"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white dark:data-[state=active]:bg-green-600 dark:data-[state=active]:text-white rounded-md transition-all"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* === LOGIN FORM === */}
              <TabsContent value="login">
                <form
                  onSubmit={handleLogin(onLoginSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="loginEmail"
                      className="text-gray-800 dark:text-gray-200"
                    >
                      Email
                    </Label>
                    <Input
                      id="loginEmail"
                      type="email"
                      placeholder="Enter your email"
                      {...loginRegister("email")}
                      className={`bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 border ${
                        loginErrors.email
                          ? "border-red-500"
                          : "border-gray-300 dark:border-neutral-700"
                      }`}
                    />
                    {loginErrors.email && (
                      <p className="text-sm text-red-500">
                        {loginErrors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="loginPassword"
                      className="text-gray-800 dark:text-gray-200"
                    >
                      Password
                    </Label>
                    <Input
                      id="loginPassword"
                      type="password"
                      placeholder="Enter your password"
                      {...loginRegister("password")}
                      className={`bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 border ${
                        loginErrors.password
                          ? "border-red-500"
                          : "border-gray-300 dark:border-neutral-700"
                      }`}
                    />
                    {loginErrors.password && (
                      <p className="text-sm text-red-500">
                        {loginErrors.password.message}
                      </p>
                    )}
                  </div>

                  {/* === Ошибка логина === */}
                  {loginError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-center text-red-500 font-medium"
                    >
                      {loginError}
                    </motion.p>
                  )}

                  <Button
                    type="submit"
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition"
                  >
                    Log In
                  </Button>
                </form>
              </TabsContent>

              {/* === SIGNUP FORM === */}
              <TabsContent value="signup">
                <form
                  onSubmit={handleSignup(onSignupSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="signupName"
                      className="text-gray-800 dark:text-gray-200"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="signupName"
                      type="text"
                      placeholder="Enter your full name"
                      {...signupRegister("name")}
                      className={`bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 border ${
                        signupErrors.name
                          ? "border-red-500"
                          : "border-gray-300 dark:border-neutral-700"
                      }`}
                    />
                    {signupErrors.name && (
                      <p className="text-sm text-red-500">
                        {signupErrors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="signupEmail"
                      className="text-gray-800 dark:text-gray-200"
                    >
                      Email
                    </Label>
                    <Input
                      id="signupEmail"
                      type="email"
                      placeholder="Enter your email"
                      {...signupRegister("email")}
                      className={`bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 border ${
                        signupErrors.email
                          ? "border-red-500"
                          : "border-gray-300 dark:border-neutral-700"
                      }`}
                    />
                    {signupErrors.email && (
                      <p className="text-sm text-red-500">
                        {signupErrors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="signupPassword"
                      className="text-gray-800 dark:text-gray-200"
                    >
                      Password
                    </Label>
                    <Input
                      id="signupPassword"
                      type="password"
                      placeholder="Create a password"
                      {...signupRegister("password")}
                      className={`bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 border ${
                        signupErrors.password
                          ? "border-red-500"
                          : "border-gray-300 dark:border-neutral-700"
                      }`}
                    />
                    {signupErrors.password && (
                      <p className="text-sm text-red-500">
                        {signupErrors.password.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md hover:shadow-lg transition"
                  >
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default FacebookPage;
