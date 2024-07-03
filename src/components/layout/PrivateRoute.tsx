"use client";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IWithChildrenProps } from "@/types/baseTypes";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface IPrivateRouteProps extends IWithChildrenProps {
  isWindowDefined: boolean;
}

const PrivateRoute = ({ children, isWindowDefined }: IPrivateRouteProps) => {
  const [userData] = useLocalStorage("userData");

  const { push } = useRouter();
  useEffect(() => {
    if (isWindowDefined && !userData) {
      sessionStorage.setItem("intendedDestination", "/profile/");
      push("/login");
    } else {
      sessionStorage.setItem("intendedDestination", "/");
    }
  }, [userData, isWindowDefined, push]);

  return <>{children}</>;
};

export default PrivateRoute;
