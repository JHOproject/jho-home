"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

export function Header() {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => { document.body.style.overflow = "unset" }
    }, [isMenuOpen])

    const navItems = [
        { name: "Projects", href: "/projects" },
        { name: "Blogs", href: "/blogs" },
        { name: "Buy me a coffee", href: "https://www.paypal.me/HOYUCHI762", isExternal: true },
    ]

    return (
        <header className="fixed top-0 z-50 w-full glass transition-all duration-300">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity z-50 relative" onClick={() => setIsMenuOpen(false)}>
                        JH.
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-6">
                        {navItems.map((item) => {
                            const isActive = pathname?.startsWith(item.href)

                            if (item.isExternal) {
                                return (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => {
                                            if (typeof window !== 'undefined' && (window as any).gtag) {
                                                (window as any).gtag('event', 'coffee_click', {
                                                    event_name: 'coffee_click',
                                                    placement: 'header'
                                                });
                                            }
                                        }}
                                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {item.name}
                                    </a>
                                )
                            }

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

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 z-50 relative text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                "fixed inset-0 z-40 bg-background pt-24 px-6 md:hidden transition-all duration-300 ease-in-out",
                isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
            )}>
                <nav className="flex flex-col gap-6 text-2xl font-medium">
                    {navItems.map((item) => {
                        const isActive = pathname?.startsWith(item.href)

                        if (item.isExternal) {
                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => {
                                        if (typeof window !== 'undefined' && (window as any).gtag) {
                                            (window as any).gtag('event', 'coffee_click', {
                                                event_name: 'coffee_click',
                                                placement: 'header'
                                            });
                                        }
                                        setIsMenuOpen(false);
                                    }}
                                    className="flex items-center py-2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {item.name}
                                </a>
                            )
                        }

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={cn(
                                    "flex items-center py-2 transition-colors",
                                    isActive
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </header>
    )
}
