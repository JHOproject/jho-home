"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Github, Linkedin } from "lucide-react"
import { useState, useEffect } from "react"

const MediumIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="none"
        className={className}
    >
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
)

export function Hero() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <section
            className="relative flex min-h-[90vh] flex-col justify-center px-4 pt-20 overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Spotlight effect - simple radial gradient that follows mouse */}
            {isHovering && (
                <div
                    className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 0, 0, 0.03), transparent 80%)`
                    }}
                />
            )}

            {/* Dark mode spotlight - lighter color */}
            {isHovering && (
                <div
                    className="dark:block hidden fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.02), transparent 80%)`
                    }}
                />
            )}

            {/* Static grid background */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="container mx-auto max-w-4xl relative z-10">
                <div className="animate-fade-in-up space-y-8 flex flex-col items-center text-center">

                    <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-muted">
                        <Image
                            src="https://github.com/JHOproject.png"
                            alt="Jessie Ho"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
                        Software <br className="hidden sm:block" />
                        Engineer.
                    </h1>

                    <p className="max-w-[600px] text-lg text-muted-foreground sm:text-xl md:text-2xl font-light leading-relaxed">
                        I take work seriously while still <span className="bg-yellow-100 dark:bg-yellow-500/20 px-1 rounded-sm text-foreground">enjoying life</span>;<br />
                        I value continuous growth and appreciate the choices I make in each moment.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4 justify-center items-center">
                        <Link
                            href="/projects"
                            className="group inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            View Projects
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <div className="flex items-center gap-4 ml-6">
                            <Link
                                href="https://github.com/JHOproject"
                                target="_blank"
                                className="text-muted-foreground hover:text-foreground transition-colors p-2"
                                aria-label="GitHub"
                            >
                                <Github className="h-6 w-6" />
                            </Link>
                            <Link
                                href="https://www.linkedin.com/in/yu-chi-ho-1925b3184"
                                target="_blank"
                                className="text-muted-foreground hover:text-foreground transition-colors p-2"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-6 w-6" />
                            </Link>
                            <Link
                                href="https://medium.com/@jHoProject"
                                target="_blank"
                                className="text-muted-foreground hover:text-foreground transition-colors p-2"
                                aria-label="Medium"
                            >
                                <MediumIcon className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
