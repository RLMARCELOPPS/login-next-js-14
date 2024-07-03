import AuthLayout from "@/components/layout/AuthLayout";
import SwitchAuthPage from "@/components/pages/auth/SwitchAuthPage";
import React from "react";
import Header from "@/components/pages/auth/sign-in/Header";
import LoginFormPage from "@/components/pages/auth/sign-in/LoginForm";

const page = () => {
  return (
    <AuthLayout isLogin>
      <Header />
      <LoginFormPage />
      <SwitchAuthPage
        href="/register"
        linkText="Don't have an account?"
        linkTitle="Register"
      />
    </AuthLayout>
  );
};

export default page;
