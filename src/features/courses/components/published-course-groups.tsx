"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Clapperboard,
  FileLock2,
  LockKeyhole,
  Play,
  Search,
} from "lucide-react";
import { useCourses, useCourse } from "@/features/courses/hooks/use-courses";
import type { Course } from "@/lib/api/services/courses";
import { CoursePrice } from "@/components/commerce/course-price";

export function CourseVideos({ course }: { course: Course }) {
  const groups = (course.sections ?? [])
    .map((section) => ({
      ...section,
      videos: section.lessons.filter(
        (video) => video.type === "VIDEO" && video.status === "READY",
      ),
    }))
    .filter((section) => section.videos.length);
  const count = groups.reduce((total, group) => total + group.videos.length, 0);
  return (
    <div className="space-y-6" data-testid="course-video-group">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--fog)] pb-4">
        <h4 className="text-lg font-semibold">Videos in {course.title}</h4>
        <span className="text-sm text-[var(--text-secondary)]">
          {count} {count === 1 ? "video" : "videos"}
        </span>
      </div>
      {!count && (
        <p className="text-sm text-[var(--text-secondary)]">
          No videos are published in this course yet.
        </p>
      )}
      {groups.map((group) => (
        <section key={group.sectionId} aria-label={group.title}>
          <h5 className="mb-3 text-sm font-medium text-[var(--gold)]">
            {group.title}
          </h5>
          <ol className="divide-y divide-[var(--fog)]">
            {group.videos.map((video, index) => (
              <li key={video.lessonId} className="flex items-center gap-3 py-3">
                <span className="text-xs text-[var(--text-tertiary)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Play size={14} aria-hidden="true" />
                <span className="flex-1 text-sm">{video.title}</span>
                {!course.accessibleSectionIds?.includes(group.sectionId) && (
                  <LockKeyhole
                    size={13}
                    className="text-[var(--text-tertiary)]"
                    aria-label="Course access required"
                  />
                )}
              </li>
            ))}
          </ol>
        </section>
      ))}
      <p className="flex items-start gap-2 rounded-lg border border-[var(--fog)] p-3 text-sm text-[var(--text-secondary)]">
        <FileLock2 size={16} className="mt-0.5 shrink-0" />
        PDFs and supporting files are available only with the relevant paid
        course or section.
      </p>
      <Link
        href={`/learner/courses/${encodeURIComponent(course.courseId)}`}
        className="inline-flex items-center gap-2 rounded-lg bg-[var(--gold)] px-5 py-3 text-sm font-semibold text-[#1b1a17]"
      >
        View course & purchase options →
      </Link>
    </div>
  );
}

function ExpandedCourse({ courseId }: { courseId: string }) {
  const { data: course, isLoading, isError, refetch } = useCourse({ courseId });
  if (isLoading)
    return (
      <p role="status" className="py-5 text-sm">
        Loading course videos…
      </p>
    );
  if (isError || !course)
    return (
      <p role="alert" className="py-5 text-sm">
        This course could not be loaded.{" "}
        <button
          type="button"
          className="underline"
          onClick={() => void refetch()}
        >
          Try again
        </button>
      </p>
    );
  return <CourseVideos course={course} />;
}

export function PublishedCourseGroups() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { data, isLoading, isError, refetch } = useCourses({
    filters: {
      status: "PUBLISHED",
      search: search.trim() || undefined,
      page,
      limit: 12,
    },
  });
  const courses = data?.data ?? [];
  return (
    <section
      id="chapter-courses"
      className="relative px-6 py-24 md:px-10 lg:py-32"
      style={{ scrollMarginTop: 100 }}
      aria-labelledby="published-courses-title"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[.24em] text-[var(--gold)]">
          Choose a course. Follow its videos.
        </p>
        <h2
          id="published-courses-title"
          className="display mt-4 text-4xl md:text-6xl"
        >
          Your course. Your learning path.
        </h2>
        <p className="mt-5 max-w-2xl text-[var(--text-secondary)]">
          Browse a course to see the videos inside it. Crypto videos stay in
          their Crypto course, Bitcoin videos in Bitcoin, with purchases and
          PDFs linked to the same course.
        </p>
        <label className="mt-8 flex max-w-md items-center gap-3 rounded-xl border border-[var(--fog)] bg-[var(--mist)] px-4 py-3">
          <Search size={17} aria-hidden="true" />
          <input
            aria-label="Search courses"
            type="search"
            placeholder="Search Forex, Gold, Crypto or Bitcoin"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
              setExpanded(null);
            }}
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
        {isLoading ? (
          <p role="status" className="py-12 text-[var(--text-secondary)]">
            Loading published courses…
          </p>
        ) : isError ? (
          <div role="alert" className="py-12">
            <p>The course catalogue is temporarily unavailable.</p>
            <button className="mt-3 underline" onClick={() => void refetch()}>
              Retry courses
            </button>
          </div>
        ) : !courses.length ? (
          <p className="py-12 text-[var(--text-secondary)]">
            {search
              ? "No published courses match your search."
              : "Courses will appear here when their videos are ready and published."}
          </p>
        ) : (
          <div className="mt-10 grid items-start gap-6 md:grid-cols-2">
            {courses.map((course) => (
              <article
                className="overflow-hidden rounded-2xl border border-[var(--fog)] bg-[var(--mist)]"
                key={course.courseId}
              >
                <div className="relative flex aspect-[16/7] items-center justify-center overflow-hidden bg-gradient-to-br from-[#3d392d] to-[#1c211e]">
                  {course.thumbnail ? (
                    <Image
                      src={course.thumbnail}
                      alt=""
                      fill
                      sizes="(max-width: 767px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <Clapperboard
                      size={45}
                      strokeWidth={1}
                      className="text-[var(--gold)]"
                    />
                  )}
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-[var(--gold)]">
                    {course.category?.name ?? "Phantom Academy"} · Course
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold">
                    {course.title}
                  </h3>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    {/* Unpriced in this country: say so rather than showing a $0.00 that reads as free. */}
                    <CoursePrice
                      course={course}
                      priceClassName="text-lg font-semibold text-[var(--text-primary)]"
                      className="text-[var(--text-secondary)]"
                    />
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-lg border border-[var(--gold)] px-4 py-2 text-sm"
                      aria-expanded={expanded === course.courseId}
                      aria-controls={`course-videos-${course.courseId}`}
                      onClick={() =>
                        setExpanded(
                          expanded === course.courseId ? null : course.courseId,
                        )
                      }
                    >
                      {expanded === course.courseId
                        ? "Hide videos"
                        : "View course videos"}
                      <ChevronDown
                        size={16}
                        className={
                          expanded === course.courseId ? "rotate-180" : ""
                        }
                      />
                    </button>
                  </div>
                  {expanded === course.courseId && (
                    <div
                      id={`course-videos-${course.courseId}`}
                      className="mt-6 border-t border-[var(--fog)] pt-6"
                    >
                      <ExpandedCourse courseId={course.courseId} />
                    </div>
                  )}
                  <Link
                    href={`/courses/${encodeURIComponent(course.courseId)}`}
                    className="mt-5 inline-block text-xs text-[var(--text-secondary)] underline underline-offset-4"
                  >
                    Open this course
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
        {data && data.pagination.totalPages > 1 && (
          <nav
            aria-label="Course pages"
            className="mt-8 flex items-center justify-center gap-5 text-sm"
          >
            <button
              disabled={page <= 1}
              className="disabled:opacity-40"
              onClick={() => {
                setPage(page - 1);
                setExpanded(null);
              }}
            >
              Previous
            </button>
            <span>
              Page {page} of {data.pagination.totalPages}
            </span>
            <button
              disabled={page >= data.pagination.totalPages}
              className="disabled:opacity-40"
              onClick={() => {
                setPage(page + 1);
                setExpanded(null);
              }}
            >
              Next
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}
