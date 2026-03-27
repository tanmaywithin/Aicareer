import { industries } from "@/data/industries";
import OnboardingForm from "./_components/onboarding-form";
import { getUserOnboardingStatus, getUser } from "@/actions/user";

export default async function OnboardingPage() {
  // No redirect, allow profile updates via onboarding form
  const { isOnboarded } = await getUserOnboardingStatus();

  const user = await getUser();

  return (
    <main>
      <OnboardingForm industries={industries} initialData={user} />
    </main>
  );
}
