import Navigation from "@/components/layout/Navigation";
import { IWithChildrenProps } from "@/types/baseTypes";
import React from "react";

const layout = ({ children }: IWithChildrenProps) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default layout;
