"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { SiteLink } from "@/lib/sanity-content";

export function MobileMenu({ items }: { items: SiteLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="mobile-menu">
      <button
        type="button"
        className="iconbtn mobile-menu__button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
      </button>
      {open ? (
        <div className="mobile-menu__panel">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-menu__item"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
