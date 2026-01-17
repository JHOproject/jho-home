import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { getPosts, getPostBySlug } from "@/lib/notion"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface PostPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    const posts = await getPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: PostPageProps) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        return {
            title: "Post Not Found",
        }
    }

    return {
        title: post.title,
        description: post.description,
    }
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    return (
        <article className="container max-w-3xl py-8 md:py-12 lg:py-24">
            <Link
                href="/posts"
                className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Posts
            </Link>

            <div className="space-y-4 text-center mb-10">
                <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl">
                    {post.title}
                </h1>
                <time className="text-muted-foreground block text-sm sm:text-base">
                    {new Date(post.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </time>
            </div>

            <div className="prose prose-gray max-w-none dark:prose-invert prose-headings:scroll-m-20 prose-headings:font-semibold prose-a:font-medium prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-primary">
                <ReactMarkdown>{post.content || ""}</ReactMarkdown>
            </div>
        </article>
    )
}
