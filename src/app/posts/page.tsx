import Link from "next/link"
import { getPosts } from "@/lib/notion"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

export const metadata = {
    title: "Posts - Jessie Ho",
    description: "Thoughts, tutorials, and insights on software engineering.",
}

export default async function PostsPage() {
    const posts = await getPosts()

    return (
        <div className="container py-8 md:py-12 lg:py-24">
            <div className="flex flex-col gap-4 mb-8">
                <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
                    Posts
                </h1>
                <p className="max-w-[750px] text-lg text-muted-foreground sm:text-l">
                    Writing about technology, design, and my journey as a developer.
                </p>
            </div>

            <div className="grid gap-6">
                {posts.map((post) => (
                    <article key={post.id} className="group relative rounded-lg border p-6 hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold tracking-tight">
                                    <Link href={`/posts/${post.slug}`} className="hover:underline"> {/* Note: detail pages not implemented in MVP scope */}
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="text-muted-foreground">
                                    {post.description}
                                </p>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </time>
                            </div>
                        </div>
                        <Link href={`/posts/${post.slug}`} className="absolute inset-0">
                            <span className="sr-only">View Article</span>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    )
}
