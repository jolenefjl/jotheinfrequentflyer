"use client";

import { useEffect, useState } from "react";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function CurrentDate() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    setLabel(formatDate(new Date()));
  }, []);

  return <span className="mono">{label || "Today"}</span>;
}
