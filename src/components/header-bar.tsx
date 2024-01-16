"use client";

import { cn } from "@/lib/utils";
import { NavItem } from "@/types/nav";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

interface HeaderBarProps {
  items?: NavItem[];
}

export function HeaderBar({ items }: HeaderBarProps) {
  return (
    <div className="flex gap-6 md:gap-10 justify-center items-center p-10">
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}

      <ModeToggle />
    </div>
  );
}
