"use client";

import { useState } from "react";
import { Download, FileText, LockKeyhole, Loader2 } from "lucide-react";
import { apiClient } from "@/lib/api/client";
import type { LessonInCourse } from "@/lib/api/services/courses";

export function PaidCourseResources({ lesson }: { lesson: LessonInCourse }) {
  const [busy, setBusy] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  if (!lesson.resources?.length) return null;
  async function download(index: number, label: string) {
    setBusy(index);
    setError(null);
    try {
      const response = await apiClient.get(
        `/lessons/${encodeURIComponent(lesson.lessonId)}/resources/${index}/download`,
        { responseType: "blob" },
      );
      const url = URL.createObjectURL(response.data);
      const anchor = document.createElement("a");
      anchor.href = url;
      const name = /filename\*=UTF-8''([^;]+)/i.exec(
        response.headers["content-disposition"] ?? "",
      )?.[1];
      anchor.download = name ? decodeURIComponent(name) : label;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setError(
        "This file could not be downloaded. A current paid purchase for this course or section is required.",
      );
    } finally {
      setBusy(null);
    }
  }
  return (
    <section
      className="rounded-xl border border-border p-5"
      aria-label="Purchased course PDFs and resources"
    >
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <FileText size={18} />
        Course PDFs & resources
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Included with the relevant paid course or section. Free video previews
        do not include document access.
      </p>
      <ul className="mt-4 grid gap-3">
        {lesson.resources.map((resource, index) => (
          <li
            key={`${lesson.lessonId}-${index}`}
            className="flex items-center justify-between gap-4 rounded-lg bg-muted/30 p-3"
          >
            <span className="text-sm">{resource.label}</span>
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm font-medium disabled:opacity-60"
              disabled={(resource.locked ?? !resource.url) || busy !== null}
              onClick={() =>
                void download(resource.resourceIndex ?? index, resource.label)
              }
            >
              {busy === index ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (resource.locked ?? !resource.url) ? (
                <LockKeyhole size={15} />
              ) : (
                <Download size={15} />
              )}
              {(resource.locked ?? !resource.url)
                ? "Purchase required"
                : "Download"}
            </button>
          </li>
        ))}
      </ul>
      {error && (
        <p role="alert" className="mt-3 text-sm text-destructive">
          {error}
        </p>
      )}
    </section>
  );
}
