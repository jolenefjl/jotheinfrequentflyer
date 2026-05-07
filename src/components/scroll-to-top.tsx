"use client";

import { useEffect } from "react";

export function ScrollToTop({ watch }: { watch: string }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [watch]);

  return null;
}
