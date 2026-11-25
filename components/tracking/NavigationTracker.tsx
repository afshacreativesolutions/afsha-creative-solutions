"use client";

import { useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/tracker";

function TrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);
  const previousUrl = useRef("");

  useEffect(() => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";

    // Ignore duplicate hits on same exact URL
    if (previousUrl.current === currentUrl && !isFirstRender.current) {
      return;
    }
    previousUrl.current = currentUrl;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Track session start
      trackEvent("session_start", {
        landingPage: currentUrl,
      });
    }

    // Track page view
    trackEvent("page_view", {
      path: pathname,
      search: searchParams?.toString() || "",
    });
  }, [pathname, searchParams]);

  return null;
}

export default function NavigationTracker() {
  return (
    <Suspense fallback={null}>
      <TrackerInner />
    </Suspense>
  );
}
