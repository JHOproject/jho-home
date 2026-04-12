"use client"
import ReactMarkdown from "react-markdown"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { CoffeeDonation } from "@/components/coffee-donation"
import { useTranslation } from "@/components/i18n-provider"
import { Post } from "@/lib/notion"
import rehypeRaw from "rehype-raw"

export function PostView({ postVersions, slug }: { postVersions: Post[], slug: string }) {
    const { t, locale } = useTranslation()

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
                    {t("blogs.back")}
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
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{previewContent}</ReactMarkdown>
                </div>

                <CoffeeDonation />
            </article>
        )
    }

    // Try to find the exact language match, otherwise fallback to the first one available
    let post = postVersions.find(p => p.language === locale) || postVersions[0]

    return (
        <article className="container mx-auto max-w-2xl py-12 md:py-20 px-4">
            <Link
                href="/blogs"
                className="group mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
                <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                {t("blogs.back")}
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
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.content || ""}</ReactMarkdown>
            </div>

            <CoffeeDonation />
        </article>
    )
}
