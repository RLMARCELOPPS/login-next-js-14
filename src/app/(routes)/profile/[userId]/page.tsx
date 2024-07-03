import PrivateRoute from "@/components/layout/PrivateRoute";
import { FormValues } from "@/utils/validations/userSchema";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

const ProfileInformation = dynamic(
  () => import("@/components/pages/profile/ProfileInformation"),
  {
    ssr: false,
  }
);

const fetchUserData = async (userId: string): Promise<FormValues> => {
  try {
    const getUserData = cookies().get("current_user_login");
    const userData = getUserData ? JSON.parse(getUserData.value) : null;
    return userData;
  } catch (error) {
    throw new Error("User data validation failed.");
  }
};

// Incremental Static Regeneration for nextjs 14
export const revalidate = 3600; //revalidate every 1 hour

const ProfilePage = async ({ params }: { params: { userId: string } }) => {
  const getUserData = await fetchUserData(params.userId);
  // Check if window is defined to prevent auto redirect to login page when user is logged in
  const isWindowDefined = typeof window !== "undefined";

  return (
    <PrivateRoute isWindowDefined={isWindowDefined}>
      <ProfileInformation data={getUserData} />
    </PrivateRoute>
  );
};

export default ProfilePage;
