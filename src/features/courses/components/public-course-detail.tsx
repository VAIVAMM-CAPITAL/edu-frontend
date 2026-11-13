"use client";
import Link from "next/link";
import { useCourse } from "@/features/courses/hooks/use-courses";
import { CourseVideos } from "./published-course-groups";

export function PublicCourseDetail({ courseId }: { courseId: string }) {
  const { data: course, isLoading, isError, refetch } = useCourse({ courseId });
  return (
    <main className="mx-auto max-w-4xl px-6 py-28">
      <Link href="/courses" className="text-sm text-[var(--gold)]">
        ← All courses
      </Link>
      {isLoading ? (
        <p role="status" className="mt-8">
          Loading course…
        </p>
      ) : isError || !course ? (
        <div role="alert" className="mt-8">
          <p>This course is unavailable.</p>
          <button className="mt-3 underline" onClick={() => void refetch()}>
            Try again
          </button>
        </div>
      ) : (
        <>
          <p className="mt-8 text-xs uppercase tracking-widest text-[var(--gold)]">
            {course.category?.name ?? "Phantom Academy"} · Course
          </p>
          <h1 className="display mt-4 text-4xl md:text-6xl">{course.title}</h1>
          <p className="mb-8 mt-5 text-[var(--text-secondary)]">
            Choose this course to follow its published videos. PDFs are included
            only with the relevant paid purchase.
          </p>
          <CourseVideos course={course} />
        </>
      )}
    </main>
  );
}
