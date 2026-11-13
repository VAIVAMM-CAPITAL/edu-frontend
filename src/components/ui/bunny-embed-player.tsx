"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const BUNNY_ORIGIN = "https://iframe.mediadelivery.net";

type PlayerMessage = { context?: string; event?: string; value?: { seconds?: number; duration?: number } };

/**
 * Bunny Stream player for a signed, expiring embed URL from the API.
 * Uses Bunny's player.js messaging to report progress and resume from the
 * last position; only messages from Bunny's own iframe are accepted.
 */
export function BunnyEmbedPlayer({
    src,
    title,
    className,
    initialPosition = 0,
    onTimeUpdate,
}: {
    src: string;
    title: string;
    className?: string;
    initialPosition?: number;
    onTimeUpdate?: (currentTime: number, duration: number) => void;
}) {
    const frame = useRef<HTMLIFrameElement>(null);
    const latest = useRef({ initialPosition, onTimeUpdate });
    latest.current = { initialPosition, onTimeUpdate };

    useEffect(() => {
        let resumed = false;
        const send = (method: string, value?: unknown) =>
            frame.current?.contentWindow?.postMessage(
                JSON.stringify({ context: "player.js", version: "0.0.11", method, value, listener: method === "addEventListener" ? "pk-progress" : undefined }),
                BUNNY_ORIGIN,
            );
        const onMessage = (event: MessageEvent) => {
            if (event.origin !== BUNNY_ORIGIN || event.source !== frame.current?.contentWindow) return;
            let data: PlayerMessage;
            try {
                data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
            } catch {
                return;
            }
            if (data?.context !== "player.js") return;
            if (data.event === "ready") {
                send("addEventListener", "timeupdate");
                if (!resumed && latest.current.initialPosition > 5) {
                    resumed = true;
                    send("setCurrentTime", latest.current.initialPosition);
                }
            } else if (data.event === "timeupdate" && data.value?.seconds !== undefined) {
                latest.current.onTimeUpdate?.(data.value.seconds, data.value.duration ?? 0);
            }
        };
        window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage);
    }, [src]);

    return (
        <div className={cn("relative aspect-video w-full overflow-hidden bg-black", className)}>
            <iframe
                ref={frame}
                src={src}
                title={title}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
            />
        </div>
    );
}
