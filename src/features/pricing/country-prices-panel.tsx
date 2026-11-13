"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api/client";
import { queryKeys } from "@/lib/query-keys";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MARKETS, formatMoney, getMarket, type MarketCode } from "@/lib/market";

type PriceRow = { market: MarketCode; amount: string; compareAtAmount: string };
type ApiPrice = { market: MarketCode; currency: string; amount: string; compareAtAmount: string | null };

const MONEY = /^\d{1,8}(\.\d{1,2})?$/;

function validate(row: PriceRow): string | null {
    const name = getMarket(row.market).name;
    if (!MONEY.test(row.amount.trim()) || Number(row.amount) <= 0) return `${name}: enter a price greater than 0 (up to 2 decimals).`;
    if (row.compareAtAmount.trim()) {
        if (!MONEY.test(row.compareAtAmount.trim())) return `${name}: the original price must be a number (up to 2 decimals).`;
        if (Number(row.compareAtAmount) < Number(row.amount)) return `${name}: the original price must be at least the price.`;
    }
    return null;
}

function apiError(error: unknown): string {
    const message = (error as { response?: { data?: { message?: string | string[] } } })?.response?.data?.message;
    return (Array.isArray(message) ? message[0] : message) || "Could not save the prices. Please try again.";
}

/**
 * Admin editor for a module's price in each country. Every amount is charged
 * exactly as entered, in that country's currency; nothing is converted.
 */
export function CountryPricesPanel({ courseId }: { courseId: string }) {
    const queryClient = useQueryClient();
    const queryKey = ["course-prices", courseId];
    const { data, isLoading, isError } = useQuery({
        queryKey,
        queryFn: async () => (await apiClient.get<{ prices: ApiPrice[] }>(`/courses/${courseId}/prices`)).data.prices,
    });
    const [rows, setRows] = useState<PriceRow[]>([]);
    const [adding, setAdding] = useState<MarketCode | "">("");

    useEffect(() => {
        if (data) {
            setRows(data.map((price) => ({ market: price.market, amount: price.amount, compareAtAmount: price.compareAtAmount ?? "" })));
        }
    }, [data]);

    const unpriced = useMemo(() => MARKETS.filter((market) => !rows.some((row) => row.market === market.code)), [rows]);
    const dirty = JSON.stringify(rows) !== JSON.stringify((data ?? []).map((price) => ({ market: price.market, amount: price.amount, compareAtAmount: price.compareAtAmount ?? "" })));

    const save = useMutation({
        mutationFn: async (list: PriceRow[]) =>
            (
                await apiClient.put<{ prices: ApiPrice[] }>(`/courses/${courseId}/prices`, {
                    prices: list.map((row) => ({
                        market: row.market,
                        amount: Number(row.amount),
                        compareAtAmount: row.compareAtAmount.trim() ? Number(row.compareAtAmount) : null,
                    })),
                })
            ).data.prices,
        onSuccess: (prices) => {
            queryClient.setQueryData(queryKey, prices);
            // Catalogue pages show the new prices straight away.
            queryClient.invalidateQueries({ queryKey: queryKeys.courses.all() });
            toast.success("Country prices saved");
        },
        onError: (error) => toast.error(apiError(error)),
    });

    const update = (market: MarketCode, field: "amount" | "compareAtAmount", value: string) =>
        setRows((current) => current.map((row) => (row.market === market ? { ...row, [field]: value } : row)));

    const onSave = () => {
        const problem = rows.map(validate).find(Boolean);
        if (problem) {
            toast.error(problem);
            return;
        }
        save.mutate(rows);
    };

    return (
        <div className="space-y-4">
            <p className="text-sm text-[var(--ls-ink-quiet)]">
                Set this module&apos;s price for each country in its own currency. Buyers are charged exactly this
                amount. Countries without a price cannot buy the module. Visitors from other countries see the United
                States price.
            </p>

            {isLoading ? (
                <p className="flex items-center gap-2 text-sm text-[var(--ls-ink-quiet)]">
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading prices…
                </p>
            ) : isError ? (
                <p className="text-sm text-[var(--ls-risk)]">Prices could not be loaded. Refresh the page to try again.</p>
            ) : (
                <>
                    {rows.length === 0 ? (
                        <p className="rounded-md border border-dashed border-[var(--ls-divider)] p-4 text-sm text-[var(--ls-ink-quiet)]">
                            No country prices yet. This module is not on sale anywhere.
                        </p>
                    ) : (
                        <ul className="divide-y divide-[var(--ls-divider)] rounded-md border border-[var(--ls-divider)]">
                            {rows.map((row) => {
                                const market = getMarket(row.market);
                                return (
                                    <li key={row.market} className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end">
                                        <div className="text-sm font-medium text-[var(--ls-ink)]">
                                            <span aria-hidden="true">{market.flag}</span> {market.name}
                                            <span className="block text-xs font-normal text-[var(--ls-ink-quiet)]">
                                                {market.currency} · {market.gateway === "RAZORPAY" ? "Razorpay" : "Stripe"}
                                            </span>
                                        </div>
                                        <label className="space-y-1 text-xs text-[var(--ls-ink-quiet)]">
                                            Price ({market.currency})
                                            <Input
                                                inputMode="decimal"
                                                value={row.amount}
                                                onChange={(event) => update(row.market, "amount", event.target.value)}
                                                aria-label={`${market.name} price in ${market.currency}`}
                                            />
                                        </label>
                                        <label className="space-y-1 text-xs text-[var(--ls-ink-quiet)]">
                                            Original price (optional)
                                            <Input
                                                inputMode="decimal"
                                                value={row.compareAtAmount}
                                                onChange={(event) => update(row.market, "compareAtAmount", event.target.value)}
                                                aria-label={`${market.name} original price in ${market.currency}`}
                                            />
                                        </label>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            aria-label={`Remove ${market.name} price`}
                                            onClick={() => setRows((current) => current.filter((item) => item.market !== row.market))}
                                        >
                                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                                        </Button>
                                        {row.amount && validate(row) === null ? (
                                            <p className="text-xs text-[var(--ls-ink-quiet)] sm:col-span-4">
                                                Buyers in {market.name} pay {formatMoney(row.amount, market.currency)}
                                                {row.compareAtAmount ? ` (shown against ${formatMoney(row.compareAtAmount, market.currency)})` : ""}.
                                            </p>
                                        ) : null}
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    {unpriced.length > 0 ? (
                        <div className="flex flex-wrap items-center gap-2">
                            <label className="sr-only" htmlFor={`add-country-${courseId}`}>
                                Country
                            </label>
                            <select
                                id={`add-country-${courseId}`}
                                value={adding}
                                onChange={(event) => setAdding(event.target.value as MarketCode | "")}
                                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                            >
                                <option value="">Choose a country…</option>
                                {unpriced.map((market) => (
                                    <option key={market.code} value={market.code}>
                                        {market.flag} {market.name} ({market.currency})
                                    </option>
                                ))}
                            </select>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={!adding}
                                onClick={() => {
                                    if (!adding) return;
                                    setRows((current) => [...current, { market: adding, amount: "", compareAtAmount: "" }]);
                                    setAdding("");
                                }}
                            >
                                <Plus className="mr-1 h-4 w-4" aria-hidden="true" /> Add country
                            </Button>
                        </div>
                    ) : null}

                    <div className="flex justify-end">
                        <Button type="button" onClick={onSave} disabled={!dirty || save.isPending}>
                            {save.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                            Save prices
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
