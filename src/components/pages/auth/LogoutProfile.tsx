import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button, Link } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutProfile = () => {
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
    <Button
      variant="contained"
      color="primary"
      style={{ marginTop: "1rem" }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutProfile;
