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
        <article className="container mx-auto max-w-2xl py-12 md:py-20 px-4">
            <Link
                href="/blogs"
                className="group mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
                <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to blogs
            </Link>

            <header className="mb-10 text-center space-y-4">
                <time className="block text-sm text-muted-foreground font-mono">
                    {new Date(post.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </time>
                <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl text-foreground">
                    {post.title}
                </h1>
            </header>

            <div className="prose prose-neutral dark:prose-invert max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight 
                prose-a:font-medium prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-primary 
                prose-code:text-primary prose-code:bg-secondary/50 prose-code:px-1 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
                leading-relaxed">
                <ReactMarkdown>{post.content || ""}</ReactMarkdown>
            </div>
        </article>
    )
}
