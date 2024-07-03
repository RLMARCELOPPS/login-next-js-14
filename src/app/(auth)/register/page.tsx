import AuthLayout from "@/components/layout/AuthLayout";
import SwitchAuthPage from "@/components/pages/auth/SwitchAuthPage";
import Header from "@/components/pages/auth/register/Header";
import RegistrationForm from "@/components/pages/auth/register/RegisterForm";
import React from "react";

const RegistrationPage = () => {
  return (
    <AuthLayout>
      <Header />
      <RegistrationForm />
      <SwitchAuthPage
        href="/login"
        linkText="Already have an account?"
        linkTitle="Sign In"
      />
    </AuthLayout>
  );
};

export default RegistrationPage;
