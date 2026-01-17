"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
    const pathname = usePathname()

    const routes = [
        { href: "/", label: "Home" },
        { href: "/projects", label: "Projects" },
        { href: "/posts", label: "Posts" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-8">
                <div className="flex items-center gap-6">
                    <Link href="/" className="mr-6 flex items-center space-x-2 font-bold">
                        JHO
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "transition-colors hover:text-foreground/80",
                                    pathname === route.href ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                {route.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}
