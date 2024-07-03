import BaseButton from "@/components/ui/BaseButton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button, Link } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { deleteCookie } from "@/helper/cookiesHandler";

const Logout = () => {
  const [, setAuthState] = useLocalStorage("isUserLoggedIn");
  const [, setUserData] = useLocalStorage("userData");

  const { push } = useRouter();

  const handleLogout = () => {
    //trigger logout in all opened tabs
    setAuthState(false);
    setUserData("");
    push("/login");
  };

  return (
    <Link style={{ textDecoration: "none" }} onClick={handleLogout}>
      Logout
    </Link>
  );
};

export default Logout;
