"use client";

import { axiosPost } from "@/lib/api/client";
import type { PaymentResponse } from "./types";

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

type RazorpayResult = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
type RazorpayInstance = { open: () => void; on: (event: string, handler: (response: { error?: { description?: string } }) => void) => void };
declare global {
    interface Window {
        Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
    }
}

let scriptPromise: Promise<void> | null = null;
function loadRazorpay(): Promise<void> {
    if (window.Razorpay) return Promise.resolve();
    scriptPromise ??= new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = RAZORPAY_SCRIPT;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => {
            scriptPromise = null;
            reject(new Error("Could not load the payment window. Check your connection and try again."));
        };
        document.body.appendChild(script);
    });
    return scriptPromise;
}

/**
 * Sends the buyer to pay. Stripe (US, UK, UAE) redirects to Stripe Checkout;
 * Razorpay (India) opens Razorpay Checkout on the page and, once paid, has
 * the server verify the signed result before the success page loads.
 * Resolves "cancelled" if the buyer closes the Razorpay window.
 */
export async function continueToPayment(payment: PaymentResponse): Promise<"redirected" | "cancelled"> {
    if (payment.gateway !== "RAZORPAY") {
        if (!payment.checkoutUrl) throw new Error("The payment page is not available. Please try again.");
        window.location.assign(payment.checkoutUrl);
        return "redirected";
    }
    const order = payment.razorpay;
    if (!order) throw new Error("The payment could not be started. Please try again.");
    await loadRazorpay();
    if (!window.Razorpay) throw new Error("Could not load the payment window. Please try again.");

    return new Promise((resolve, reject) => {
        const checkout = new window.Razorpay!({
            key: order.keyId,
            order_id: order.orderId,
            amount: order.amount,
            currency: order.currency,
            name: order.name,
            description: order.description,
            prefill: order.prefill,
            theme: { color: "#c9a253" },
            handler: async (result: RazorpayResult) => {
                try {
                    await axiosPost("payments/razorpay/verify", {
                        razorpayOrderId: result.razorpay_order_id,
                        razorpayPaymentId: result.razorpay_payment_id,
                        razorpaySignature: result.razorpay_signature,
                    });
                } catch {
                    // Paid but not yet confirmed here: the success page re-checks with Razorpay,
                    // and Razorpay's webhook grants access even if this page is closed.
                }
                const ids = (payment.paymentIds ?? [payment.paymentId]).join(",");
                window.location.assign(`/learner/payment/success?paymentIds=${encodeURIComponent(ids)}`);
                resolve("redirected");
            },
            modal: { ondismiss: () => resolve("cancelled"), confirm_close: true },
        });
        // A failed attempt keeps the window open so the buyer can retry with another method.
        checkout.on("payment.failed", () => undefined);
        try {
            checkout.open();
        } catch (error) {
            reject(error instanceof Error ? error : new Error("The payment window could not open."));
        }
    });
}
