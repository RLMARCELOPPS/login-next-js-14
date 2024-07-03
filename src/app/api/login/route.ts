import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateAttempt, getAttempt, updateAttempt } from "./attemptHandler";
import { deleteCookie } from "@/helper/cookiesHandler";
import { FormValues } from "@/utils/validations/userSchema";
interface IUserData extends FormValues {
  userId: string;
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const cookieStore = cookies();
    const getUserData = cookieStore.get("user_data");
    const userData: IUserData[] = getUserData
      ? JSON.parse(getUserData.value)
      : [];

    if (getAttempt() === null) {
      generateAttempt();
    }

    const currentUser = userData.find(
      (user) => user.username === reqBody.username
    );

    if (getAttempt() >= 3) {
      return NextResponse.json(
        { message: "Error: Account has been disabled" },
        { status: 401 }
      );
    }

    if (!currentUser || currentUser.username !== reqBody.username) {
      updateAttempt();
      return NextResponse.json(
        { message: "User doesn't exist" },
        { status: 404 }
      );
    }

    if (reqBody.password !== currentUser.password) {
      updateAttempt();
      return NextResponse.json(
        { message: "Unauthorized: Password is incorrect" },
        { status: 401 }
      );
    }

    //Reset login attempt
    deleteCookie("login_attempt");
    cookies().set({
      name: `current_user_login`,
      value: JSON.stringify(currentUser),
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      sameSite: "strict", // prevent cross-site requests
    });
    return NextResponse.json(
      {
        message: "User logged in successfully",
        data: {
          userId: currentUser,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
