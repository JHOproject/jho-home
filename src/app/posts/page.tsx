import { getPosts } from "@/lib/notion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export const revalidate = 3600 // Revalidate every hour

export default async function PostsPage() {
    const posts = await getPosts()

    return (
        <div className="container mx-auto px-4 py-32 max-w-4xl">
            <div className="mb-16 space-y-4 animate-fade-in-up">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Writing</h1>
                <p className="text-xl text-muted-foreground">
                    Thoughts on software engineering, design, and building products.
                </p>
            </div>

            <div className="space-y-6 animate-fade-in-up [animation-delay:200ms]">
                {posts.map((post) => (
                    <Link href={`/posts/${post.slug}`} key={post.id} className="block group">
                        <article className="flex flex-col sm:flex-row gap-4 sm:items-baseline justify-between rounded-xl border bg-card p-6 shadow-sm transition-all hover:bg-accent/50 hover:border-accent-foreground/20">
                            <div className="space-y-2">
                                <h2 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-muted-foreground leading-relaxed max-w-xl">
                                    {post.description}
                                </p>
                            </div>

                            <div className="flex items-center gap-4 shrink-0 text-sm text-muted-foreground">
                                <time className="font-mono text-xs">
                                    {new Date(post.date).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </time>
                                <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    )
}
