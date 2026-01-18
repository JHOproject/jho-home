import Link from "next/link"

export function Footer() {
    return (
        <footer className="border-t border-border">
            <div className="container mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Jessie Ho. All rights reserved.
                    </p>
                    <nav className="flex gap-6">
                        <Link
                            href="/privacy"
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Privacy Policy
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    )
}
