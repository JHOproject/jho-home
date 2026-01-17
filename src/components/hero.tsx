import Link from "next/link"
import { ArrowRight, Github, Mail } from "lucide-react"

export function Hero() {
    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex max-w-[980px] flex-col items-start gap-2">
                <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
                    Hi, I&apos;m Jessie Ho <br className="hidden sm:inline" />
                    Software Engineer & Creator
                </h1>
                <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
                    I build accessible, pixel-perfect, performant, and responsible web applications.
                    Welcome to my digital garden.
                </p>
            </div>
            <div className="flex gap-4">
                <Link
                    href="/projects"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                    View Projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                    href="https://github.com/JHOproject"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                </Link>
            </div>
        </section>
    )
}
