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

export const dynamicParams = false

export async function generateStaticParams() {
    try {
        const posts = await getPosts()

        if (!posts || posts.length === 0) {
            console.warn("No posts found. Using placeholder.")
            return [{ slug: 'style-preview' }]
        }

        return posts.map((post) => ({
            slug: post.slug,
        }))
    } catch (error) {
        console.error("Error in generateStaticParams:", error)
        return [{ slug: 'style-preview' }]
    }
}

export async function generateMetadata({ params }: PostPageProps) {
    const { slug } = await params

    if (slug === 'style-preview') {
        return {
            title: "Style Preview",
            description: "A preview of the blog post styling.",
        }
    }

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

    if (slug === 'style-preview') {
        const previewContent = `
# Style Preview

This is a **preview** of the blog styling.

## Code Block Example

\`\`\`javascript
function hello() {
  console.log("Hello, Google Style!");
}
\`\`\`

## Text Contrast

This text should be high contrast and easy to read.
        `
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
                        {new Date().toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                    <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl text-foreground">
                        Style Preview
                    </h1>
                </header>

                <div className="prose dark:prose-invert max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight 
                prose-a:font-medium prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-primary 
                leading-relaxed">
                    <ReactMarkdown>{previewContent}</ReactMarkdown>
                </div>
            </article>
        )
    }

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

            <div className="prose dark:prose-invert max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight 
                prose-a:font-medium prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-primary 
                leading-relaxed">
                <ReactMarkdown>{post.content || ""}</ReactMarkdown>
            </div>
        </article>
    )
}
