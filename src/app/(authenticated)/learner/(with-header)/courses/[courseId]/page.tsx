"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import {
    BookOpen,
    Check,
    CheckCircle2,
    Clock,
    FileText,
    Lock,
    ShoppingCart,
    Smartphone,
    User,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import {
    LearningSurface,
    Panel,
    SectionHeading,
} from "@/components/learning/learning-surface";
import { StatusPill } from "@/components/learning/status-pill";
import { useCourse } from "@/features/courses/hooks/use-courses";
import { useCheckEnrollment } from "@/features/enrollments/hooks/use-enrollments";
import { useCreatePayment } from "@/features/payments/hooks/use-payments";
import { useAddToCart } from "@/features/cart/hooks/use-cart";
import { useAuthStore } from "@/lib/store/auth-store";
import { cn } from "@/lib/utils";
import { CourseHeroBackground } from "@/components/course/course-hero-background";
import { continueToPayment } from "@/features/payments/continue-to-payment";
import { MarketSelector } from "@/components/commerce/market-selector";
import { formatMoney, getMarket, isPurchasable } from "@/lib/market";

function errorMessage(error: unknown, fallback: string) {
    const response = (error as { response?: { data?: { message?: string | string[] } } })?.response?.data?.message;
    if (Array.isArray(response)) return response[0] ?? fallback;
    return response || (error instanceof Error && error.message) || fallback;
}

function formatDuration(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

export default function CourseDetailPage({
    params,
}: {
    params: Promise<{ courseId: string }>;
}) {
    const { courseId } = use(params);
    const { data: course, isLoading, error } = useCourse({ enabled: true, courseId });
    const createPayment = useCreatePayment();
    const addToCart = useAddToCart();
    const { user } = useAuthStore();
    const router = useRouter();
    const { data: checkData } = useCheckEnrollment({ enabled: !!user, courseId });
    const isAdmin = user?.role === "PLATFORM_ADMIN";
    const isEnrolled = !!checkData?.isEnrolled || isAdmin;

    const handleBuyNow = async () => {
        if (!user) {
            router.push("/login");
            return;
        }
        if (!course || !isPurchasable(course)) return;
        try {
            const payment = await createPayment.mutateAsync({
                itemType: "COURSE",
                courseId: course.courseId,
                successUrl: `${window.location.origin}/learner/payment/success?courseId=${course.courseId}`,
                cancelUrl: `${window.location.origin}/learner/payment/failure`,
            });
            if ((await continueToPayment(payment)) === "cancelled") {
                toast.info("Payment cancelled. You have not been charged.");
            }
        } catch (error) {
            toast.error(errorMessage(error, "We could not start the payment. Please try again."));
        }
    };

    const handleAddToCart = async () => {
        if (!user) {
            router.push("/login");
            return;
        }
        if (!course || !isPurchasable(course)) return;
        try {
            await addToCart.mutateAsync({ itemType: "COURSE", courseId: course.courseId });
            router.push("/learner/cart");
        } catch (error) {
            toast.error(errorMessage(error, "Could not add this module to your cart."));
        }
    };

    if (isLoading) {
        return (
            <LearningSurface>
                <div className="space-y-6">
                    <Skeleton className="aspect-[21/9] w-full rounded-lg" />
                    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-8">
                        <div className="space-y-4">
                            <Skeleton className="h-32 w-full rounded-lg" />
                            <Skeleton className="h-64 w-full rounded-lg" />
                        </div>
                        <Skeleton className="mt-4 h-72 w-full rounded-lg lg:mt-0" />
                    </div>
                </div>
            </LearningSurface>
        );
    }

    if (error || !course) {
        return (
            <LearningSurface>
                <Panel>
                    <EmptyState
                        title="Course not found"
                        description="The course you're looking for doesn't exist or has been removed."
                        icon={<BookOpen className="h-12 w-12" />}
                    />
                </Panel>
            </LearningSurface>
        );
    }

    const totalDuration =
        course.sections?.reduce(
            (acc, section) =>
                acc + (section.lessons?.reduce((sum, l) => sum + (l.duration || 0), 0) || 0),
            0,
        ) || 0;
    const totalLessons = course.sections?.reduce((acc, s) => acc + (s.lessons?.filter((item) => item.type === "VIDEO").length || 0), 0) || 0;
    const onSale = isPurchasable(course);
    const price = onSale ? Number(course.price) : 0;
    const compareAt = course.compareAtPrice ? parseFloat(String(course.compareAtPrice)) : null;
    const showCompareAt = onSale && compareAt !== null && !isNaN(compareAt) && compareAt > price;
    const discount = showCompareAt ? Math.round(((compareAt! - price) / compareAt!) * 100) : null;

    return (
        <LearningSurface
            bleed={<CourseHeroBackground course={course} />}
        >
            {/* Facts about this course, all read from the curriculum itself. */}
            <div className="ls-nums mb-6 flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-[var(--ls-divider)] pb-5 text-sm text-[var(--ls-ink-quiet)]">
                <span>
                    {totalLessons} video{totalLessons === 1 ? "" : "s"}
                </span>
                <span aria-hidden="true">·</span>
                <span>{formatDuration(totalDuration)} total</span>
                {course.category?.name ? (
                    <>
                        <span aria-hidden="true">·</span>
                        <span>{course.category.name}</span>
                    </>
                ) : null}
            </div>

            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-8">
                {/* Enrolment panel. First in the reading order, beside the
                    content from the large breakpoint up. */}
                <aside
                    aria-label="Enrolment"
                    className="mb-6 lg:col-start-2 lg:row-start-1 lg:mb-0 lg:sticky lg:top-6"
                >
                    <Panel className="p-5">
                        <div className="flex flex-wrap items-baseline gap-2">
                            {onSale ? (
                                <span className="ls-nums text-3xl font-semibold text-[var(--ls-ink)]">
                                    {formatMoney(price, course.currency)}
                                </span>
                            ) : (
                                <span className="text-sm text-[var(--ls-ink-quiet)]">
                                    Not available in {getMarket(course.market).name} yet.
                                </span>
                            )}
                            {showCompareAt ? (
                                <>
                                    <span className="ls-nums text-lg text-[var(--ls-ink-quiet)] line-through">
                                        {formatMoney(compareAt!, course.currency)}
                                    </span>
                                    {discount !== null ? (
                                        <StatusPill tone="ok">{discount}% off</StatusPill>
                                    ) : null}
                                </>
                            ) : null}
                        </div>

                        <div className="mt-4 space-y-2.5">
                            {isEnrolled ? (
                                <Button
                                    className="w-full"
                                    size="lg"
                                    onClick={() =>
                                        router.push(`/learner/courses/${courseId}/watch`)
                                    }
                                >
                                    Go to Course
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        className="w-full"
                                        size="lg"
                                        onClick={handleAddToCart}
                                        disabled={!onSale || addToCart.isPending}
                                    >
                                        Add to cart
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        size="lg"
                                        onClick={handleBuyNow}
                                        disabled={!onSale || createPayment.isPending}
                                    >
                                        {createPayment.isPending ? "Processing..." : "Buy now"}
                                    </Button>
                                    <div className="space-y-1 pt-1 text-xs text-[var(--ls-ink-quiet)]">
                                        <span>Prices shown for</span>
                                        <MarketSelector className="w-full [&_select]:w-full" />
                                    </div>
                                </>
                            )}
                        </div>
                    </Panel>
                </aside>

                <div className="space-y-8 lg:col-start-1 lg:row-start-1">
                    {course.learningOutcomes && course.learningOutcomes.length > 0 ? (
                        <section aria-labelledby="outcomes-heading" className="space-y-3">
                            <SectionHeading id="outcomes-heading" title="What you'll learn" />
                            <Panel className="p-5">
                                <ul className="grid gap-2.5 md:grid-cols-2">
                                    {course.learningOutcomes.map((objective, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5">
                                            <CheckCircle2
                                                aria-hidden="true"
                                                className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ls-ok)]"
                                            />
                                            <span className="text-sm text-[var(--ls-ink)]">
                                                {objective}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </Panel>
                        </section>
                    ) : null}

                    <section aria-labelledby="includes-heading" className="space-y-3">
                        <SectionHeading id="includes-heading" title="This course includes" />
                        <Panel className="p-5">
                            <ul className="grid gap-3 md:grid-cols-2">
                                <li className="flex items-center gap-2.5 text-sm text-[var(--ls-ink)]">
                                    <FileText
                                        aria-hidden="true"
                                        className="h-4 w-4 shrink-0 text-[var(--ls-ink-quiet)]"
                                    />
                                    <span className="ls-nums">{totalLessons} videos</span>
                                </li>
                                <li className="flex items-center gap-2.5 text-sm text-[var(--ls-ink)]">
                                    <Smartphone
                                        aria-hidden="true"
                                        className="h-4 w-4 shrink-0 text-[var(--ls-ink-quiet)]"
                                    />
                                    Learn at your own pace
                                </li>
                            </ul>
                        </Panel>
                    </section>

                    <section aria-labelledby="content-heading" className="space-y-3">
                        <SectionHeading
                            id="content-heading"
                            title="Course content"
                            count={`${totalLessons} videos · ${formatDuration(totalDuration)}`}
                        />
                        <Panel className="overflow-hidden">
                            <ol className="divide-y divide-[var(--ls-divider)]">
                                {course.sections?.map((section, idx) => {
                                    const isSectionAccessible =
                                        course.accessibleSectionIds?.includes(section.sectionId);
                                    return (
                                        <li key={section.sectionId} className="p-4 sm:p-5">
                                            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                                                <h3 className="text-sm font-semibold text-[var(--ls-ink)]">
                                                    <span className="ls-nums text-[var(--ls-ink-quiet)]">
                                                        {idx + 1}.
                                                    </span>{" "}
                                                    {section.title}
                                                </h3>
                                                {isSectionAccessible && !isEnrolled ? (
                                                    <StatusPill tone="ok" icon={<Check className="h-3 w-3" />}>
                                                        Owned
                                                    </StatusPill>
                                                ) : null}
                                            </div>

                                            {section.description ? (
                                                <p className="mt-1.5 text-sm text-[var(--ls-ink-quiet)]">
                                                    {section.description}
                                                </p>
                                            ) : null}

                                            <ol className="mt-3 space-y-0.5">
                                                {section.lessons?.map((lesson, lessonIdx) => {
                                                    const locked =
                                                        !isSectionAccessible && !isEnrolled;
                                                    return (
                                                        <li
                                                            key={lesson.lessonId}
                                                            className={cn(
                                                                "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm",
                                                                locked && "opacity-60",
                                                            )}
                                                        >
                                                            <span className="ls-nums w-5 shrink-0 text-xs text-[var(--ls-ink-quiet)]">
                                                                {lessonIdx + 1}
                                                            </span>
                                                            <span className="flex min-w-0 flex-1 items-center gap-2 text-[var(--ls-ink)]">
                                                                {lesson.title}
                                                                {locked ? (
                                                                    <>
                                                                        <Lock
                                                                            aria-hidden="true"
                                                                            className="h-3.5 w-3.5 shrink-0 text-[var(--ls-ink-quiet)]"
                                                                        />
                                                                        <span className="sr-only">
                                                                            — locked
                                                                        </span>
                                                                    </>
                                                                ) : null}
                                                            </span>
                                                            {lesson.duration ? (
                                                                <span className="ls-nums shrink-0 text-xs text-[var(--ls-ink-quiet)]">
                                                                    {formatDuration(
                                                                        lesson.duration,
                                                                    )}
                                                                </span>
                                                            ) : null}
                                                        </li>
                                                    );
                                                })}
                                            </ol>
                                        </li>
                                    );
                                })}
                            </ol>
                        </Panel>
                    </section>

                    {course.instructor ? (
                        <section aria-labelledby="instructor-heading" className="space-y-3">
                            <SectionHeading id="instructor-heading" title="Instructor" />
                            <Panel className="p-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--ls-divider)] bg-[var(--ls-paper-quiet)]">
                                        <User
                                            aria-hidden="true"
                                            className="h-5 w-5 text-[var(--ls-ink-quiet)]"
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-medium text-[var(--ls-ink)]">
                                            {course.instructor.firstName}{" "}
                                            {course.instructor.lastName}
                                        </p>
                                    </div>
                                </div>
                            </Panel>
                        </section>
                    ) : null}
                </div>
            </div>
        </LearningSurface>
    );
}
