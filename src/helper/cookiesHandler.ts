import { cookies } from "next/headers";

const getCookie = (name: string) => {
  const cookieStore = cookies();
  const getUserData = cookieStore.get(name);
  const userData = getUserData ? JSON.parse(getUserData.value) : null;

  return userData;
};

const setCookie = <T>(name: string, value: T, maxAge: number = 1800) => {
  cookies().set({
    name: name,
    value: JSON.stringify(value),
    maxAge: maxAge,
    httpOnly: true,
    sameSite: "strict", // prevent cross-site requests
  });
};

const deleteCookie = (name: string) => {
  cookies().delete(name);
};

export { getCookie, setCookie, deleteCookie };
