import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

export const checkOnboarding = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect("/onboarding");
  }
};
