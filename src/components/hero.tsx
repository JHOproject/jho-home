import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Github, Linkedin } from "lucide-react"

export function Hero() {
    return (
        <section className="relative flex min-h-[90vh] flex-col justify-center px-4 pt-20">
            <div className="container mx-auto max-w-4xl">
                <div className="animate-fade-in-up space-y-8 flex flex-col items-center text-center">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-muted">
                        <Image
                            src="https://github.com/JHOproject.png"
                            alt="Jessie Ho"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl">
                        Hi, I&apos;m Jessie. <br />
                        I build <span className="bg-yellow-100 dark:bg-yellow-500/20 px-1 rounded-sm">digital products</span> that matter.
                    </h1>

                    <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl md:text-2xl font-light leading-relaxed">
                        I am a <span className="font-medium text-foreground">Software Engineer</span> focused on creating
                        <span className="italic"> accessible</span> and <span className="italic">pixel-perfect</span> web experiences.
                        Currently working with{" "}
                        <Link href="https://nextjs.org" target="_blank" className="font-medium text-foreground underline decoration-muted-foreground/50 underline-offset-4 transition-colors hover:decoration-foreground hover:text-foreground">
                            Next.js
                        </Link>{" "}
                        and{" "}
                        <Link href="https://tailwindcss.com" target="_blank" className="font-medium text-foreground underline decoration-muted-foreground/50 underline-offset-4 transition-colors hover:decoration-foreground hover:text-foreground">
                            Tailwind CSS
                        </Link>.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4 justify-center items-center">
                        <Link
                            href="/projects"
                            className="group inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            View Projects
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <div className="flex items-center gap-4 ml-2">
                            <Link
                                href="https://github.com/JHOproject"
                                target="_blank"
                                className="text-muted-foreground hover:text-foreground transition-colors p-2"
                                aria-label="GitHub"
                            >
                                <Github className="h-6 w-6" />
                            </Link>
                            <Link
                                href="https://linkedin.com/in/jessieho"
                                target="_blank"
                                className="text-muted-foreground hover:text-foreground transition-colors p-2"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </section>
    )
}
