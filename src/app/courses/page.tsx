import "@/features/prime-landing/PrimeLandingStyles.module.css";
import { TopNav } from "@/features/prime-landing/components/ui/TopNav";
import { Footer } from "@/features/prime-landing/components/ui/Footer";
import { PublishedCourseGroups } from "@/features/courses/components/published-course-groups";

export const metadata = {
  title: "Courses",
  description:
    "Explore published courses and the videos in each learning path.",
};
export default function CoursesPage() {
  return (
    <div className="primeLanding min-h-screen pt-24">
      <TopNav />
      <main>
        <PublishedCourseGroups />
      </main>
      <Footer />
    </div>
  );
}
