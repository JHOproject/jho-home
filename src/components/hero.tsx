import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
    return (
        <section className="relative flex min-h-[90vh] flex-col justify-center px-4 pt-20">
            <div className="container mx-auto max-w-5xl">
                <div className="animate-fade-in-up space-y-8">
                    <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">
                        Software <br className="hidden sm:block" />
                        Engineer.
                    </h1>

                    <p className="max-w-[600px] text-lg text-muted-foreground sm:text-xl md:text-2xl font-light leading-relaxed">
                        I build accessible, pixel-perfect, and performant web experiences.
                        Currently crafting digital products with Next.js and Tailwind.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link
                            href="/projects"
                            className="group inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            View Projects
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/posts"
                            className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            Read Blog
                        </Link>
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </section>
    )
}
