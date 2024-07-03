import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCookie } from "@/helper/cookiesHandler";
import { FormValues } from "@/utils/validations/userSchema";

export async function POST(request: NextRequest) {
  const res = await request.json();

  const userData: FormValues[] = getCookie("user_data") || [];

  if (userData.find((user) => user.username === res.username)) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  cookies().set({
    name: `user_data`,
    value: JSON.stringify([...userData, res]),
    maxAge: 60 * 60 * 24,
    httpOnly: true,
    sameSite: "strict", // prevent cross-site requests
  });

  cookies().set({
    name: `current_user_login`,
    value: JSON.stringify(res),
    maxAge: 60 * 60 * 24,
    httpOnly: true,
    sameSite: "strict", // prevent cross-site requests
  });

  // Return a JSON response
  return NextResponse.json({
    status: 200,
    message: "User data saved successfully",
    data: {
      userId: res.userId,
    },
  });
}
