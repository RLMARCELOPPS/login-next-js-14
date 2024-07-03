import { getCookie, setCookie } from "@/helper/cookiesHandler";
import { cookies } from "next/headers";

const generateAttempt = () => {
  setCookie("login_attempt", 0);
};

const getAttempt = () => {
  const loginAttempt = getCookie("login_attempt");

  return loginAttempt;
};

const updateAttempt = () => {
  const attemptCount = getAttempt();
  setCookie("login_attempt", attemptCount + 1);
};

export { generateAttempt, getAttempt, updateAttempt };
