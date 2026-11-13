import type { BlogAuthor, BlogPost } from "../types";

const AUTHORS: Record<string, BlogAuthor> = {
  "mock-instructor-1": {
    id: "mock-instructor-1",
    name: "Phantom King Author",
    email: "",
    avatarUrl: undefined,
    bio: "Phantom King contributor.",
    role: "INSTRUCTOR",
  },
  "mock-content-admin": {
    id: "mock-content-admin",
    name: "Phantom King Editorial",
    email: "",
    bio: "The Phantom King editorial desk: market education notes and study guides.",
    role: "CONTENT_ADMIN",
  },
};

export const MOCK_BLOG_AUTHORS = AUTHORS;

const now = () => new Date().toISOString();

/** Offline fallback starts empty; real posts come from the blog API. */
const SEED: BlogPost[] = [];

let store: BlogPost[] = [...SEED];

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ensureUniqueSlug(base: string, ignoreId?: string): string {
  const root = base || `post-${Date.now()}`;
  let candidate = root;
  let n = 1;
  while (store.some((p) => p.slug === candidate && p.id !== ignoreId)) {
    n += 1;
    candidate = `${root}-${n}`;
  }
  return candidate;
}

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export const mockBlogStore = {
  list(): BlogPost[] {
    return clone(store);
  },
  reset(): void {
    store = [...SEED];
  },
  findBySlug(slug: string): BlogPost | undefined {
    const found = store.find((p) => p.slug === slug);
    return found ? clone(found) : undefined;
  },
  findById(id: string): BlogPost | undefined {
    const found = store.find((p) => p.id === id);
    return found ? clone(found) : undefined;
  },
  insert(input: {
    title: string;
    slug?: string;
    excerpt: string;
    content: string;
    coverImageUrl?: string;
    tags?: string[];
    category?: string;
    status?: BlogPost["status"];
    author: BlogAuthor;
  }): BlogPost {
    const slug = ensureUniqueSlug(input.slug ? slugify(input.slug) : slugify(input.title));
    const nowIso = now();
    const post: BlogPost = {
      id: `blog-${Math.random().toString(36).slice(2, 10)}`,
      slug,
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
      coverImageUrl: input.coverImageUrl,
      author: input.author,
      tags: input.tags ?? [],
      category: input.category,
      status: input.status ?? "DRAFT",
      featured: false,
      publishedAt: input.status === "PUBLISHED" ? nowIso : undefined,
      readingTimeMinutes: estimateReadingTime(input.content),
      createdAt: nowIso,
      updatedAt: nowIso,
    };
    store = [post, ...store];
    return clone(post);
  },
  update(id: string, patch: Partial<BlogPost>): BlogPost | undefined {
    const idx = store.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    const existing = store[idx];
    const nextSlug = patch.slug
      ? ensureUniqueSlug(slugify(patch.slug), id)
      : existing.slug;
    const nextContent = patch.content ?? existing.content;
    const becamePublished =
      existing.status !== "PUBLISHED" && patch.status === "PUBLISHED";
    const next: BlogPost = {
      ...existing,
      ...patch,
      slug: nextSlug,
      readingTimeMinutes: estimateReadingTime(nextContent),
      publishedAt: becamePublished ? now() : existing.publishedAt,
      updatedAt: now(),
    };
    store[idx] = next;
    return clone(next);
  },
  remove(id: string): boolean {
    const before = store.length;
    store = store.filter((p) => p.id !== id);
    return store.length < before;
  },
};

export const mockSlugify = slugify;
