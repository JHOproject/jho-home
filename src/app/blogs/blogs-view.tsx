"use client"
import Link from "next/link"
import { Terminal } from "lucide-react"
import { useTranslation } from "@/components/i18n-provider"
import { Post } from "@/lib/notion"

export function BlogsView({ posts }: { posts: Post[] }) {
    const { t, locale } = useTranslation()
    
    const displayPosts = posts.filter(p => {
        if (!p.language) return true
        return p.language === locale
    })

    const isEmpty = !displayPosts || displayPosts.length === 0

    return (
        <div className="container mx-auto px-6 py-32 max-w-4xl min-h-[80vh]">
            <div className="mb-16 space-y-4 animate-fade-in-up">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">{t("blogs.title")}</h1>
                <p className="text-xl text-muted-foreground">
                    {t("blogs.subtitle")}
                </p>
            </div>

            {isEmpty ? (
                <div className="animate-fade-in-up [animation-delay:200ms] flex flex-col items-center justify-center p-12 border border-dashed rounded-lg border-muted-foreground/20 bg-muted/30">
                    <div className="font-mono text-sm space-y-4 max-w-md w-full">
                        <div className="flex gap-2 text-muted-foreground border-b border-muted-foreground/10 pb-2 mb-4">
                            <Terminal size={16} />
                            <span>{t("blogs.terminal_log")}</span>
                        </div>
                        <div className="space-y-1">
                            <p suppressHydrationWarning className="text-green-500">{t("blogs.terminal_fetch")}</p>
                            <p className="text-muted-foreground">{t("blogs.terminal_loading")}</p>
                            <p className="text-yellow-500">{t("blogs.terminal_warn")}</p>
                            <p className="text-muted-foreground">_</p>
                        </div>

                        <div className="pt-8 text-center text-muted-foreground">
                            <p className="italic text-sm">{t("blogs.terminal_italic")}</p>
                            <p className="text-xs pt-2 text-muted-foreground/60">{t("blogs.terminal_small")}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-2 animate-fade-in-up [animation-delay:200ms]">
                    {displayPosts.map((post) => (
                        <Link
                            href={`/blogs/${post.slug}`}
                            key={post.id}
                            className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 rounded-lg px-4 py-4 transition-colors hover:bg-secondary/50"
                        >
                            <div className="shrink-0 w-32 text-sm text-muted-foreground font-mono">
                                {new Date(post.date).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </div>

                            <div className="flex flex-col gap-1">
                                <h2 className="text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-primary">
                                    {post.title}
                                </h2>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    {post.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
