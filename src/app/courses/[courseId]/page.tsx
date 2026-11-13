import "@/features/prime-landing/PrimeLandingStyles.module.css";
import { TopNav } from "@/features/prime-landing/components/ui/TopNav";
import { Footer } from "@/features/prime-landing/components/ui/Footer";
import { PublicCourseDetail } from "@/features/courses/components/public-course-detail";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  return (
    <div className="primeLanding min-h-screen pt-16">
      <TopNav />
      <PublicCourseDetail courseId={courseId} />
      <Footer />
    </div>
  );
}
