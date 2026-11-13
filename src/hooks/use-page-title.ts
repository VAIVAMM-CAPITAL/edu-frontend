import { useEffect } from "react";
export function usePageTitle(title: string, subtitle?: string) {
    useEffect(() => {
        const fullTitle = subtitle ? `${title} | ${subtitle}` : title;
        document.title = `${fullTitle} | Phantom King`;
        return () => {
            document.title = "Phantom King";
        };
    }, [title, subtitle]);
}
