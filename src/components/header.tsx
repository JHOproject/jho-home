"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

export function Header() {
    const pathname = usePathname()
    const navItems = [
        { name: "Projects", href: "/projects" },
        { name: "Blogs", href: "/blog" },
    ]

    return (
        <header className="fixed top-0 z-50 w-full glass transition-all duration-300">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
                        JH.
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        {navItems.map((item) => {
                            const isActive = pathname?.startsWith(item.href)
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors",
                                        isActive
                                            ? "text-foreground font-semibold"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}
