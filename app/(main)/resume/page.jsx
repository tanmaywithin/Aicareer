import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/resume-builder";
import { checkOnboarding } from "@/lib/checkOnboarding";

export default async function ResumePage() {
  await checkOnboarding();
  const resume = await getResume();

  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder initialContent={resume?.content} />
    </div>
  );
}
