export type PaymentGateway = 'RAZORPAY' | 'STRIPE' | 'STRIPE_US' | 'STRIPE_UAE';
export interface CreatePaymentDto {
    /** Ignored by the API: the gateway follows the buyer's country. */
    gateway?: PaymentGateway;
    itemType: 'COURSE' | 'SECTION';
    courseId?: string;
    sectionId?: string;
    couponCode?: string;
    successUrl?: string;
    cancelUrl?: string;
    metadata?: Record<string, string>;
}
export interface CreateBulkPaymentDto {
    /** Ignored by the API: the gateway follows the buyer's country. */
    gateway?: PaymentGateway;
    cartItemIds: string[];
    couponCode?: string;
    successUrl?: string;
    cancelUrl?: string;
}
/** Order details for Razorpay Checkout (India). */
export interface RazorpayOrder {
    keyId: string;
    orderId: string;
    /** In paise. */
    amount: number;
    currency: string;
    name: string;
    description: string;
    prefill: { email: string; name?: string };
}
export interface PaymentResponse {
    /** STRIPE: redirect to checkoutUrl. RAZORPAY: open Razorpay Checkout with `razorpay`. */
    gateway: 'STRIPE' | 'RAZORPAY';
    paymentId: string;
    paymentIds?: string[];
    checkoutUrl?: string | null;
    sessionId?: string | null;
    razorpay?: RazorpayOrder;
    market?: string;
    currency?: string;
    amount?: string;
}
export interface VerifyPaymentDto {
    paymentId?: string;
    paymentIds?: string[];
    sessionId?: string;
}
export interface VerifyPaymentResponse {
    success: boolean;
    /** PENDING while the gateway has not confirmed the payment yet. */
    status?: 'COMPLETED' | 'PENDING';
    message: string;
    processedCount?: number;
}
