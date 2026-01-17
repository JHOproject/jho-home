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

            <div className="space-y-2 animate-fade-in-up [animation-delay:200ms]">
                {posts.map((post) => (
                    <Link
                        href={`/posts/${post.slug}`}
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
        </div>
    )
}
