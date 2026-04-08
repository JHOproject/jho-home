import { notFound } from "next/navigation"
import { getPosts, getPostBySlug, getPostVersionsBySlug } from "@/lib/notion"
import { PostView } from "./post-view"

interface PostPageProps {
    params: Promise<{
        slug: string
    }>
}

export const dynamicParams = false

export async function generateStaticParams() {
    try {
        const posts = await getPosts() // gets default or all

        if (!posts || posts.length === 0) {
            console.warn("No posts found. Using placeholder.")
            return [{ slug: 'style-preview' }]
        }

        // Deduplicate slugs so statically generated paths don't conflict
        const uniqueSlugs = Array.from(new Set(posts.map(p => p.slug)))
        return uniqueSlugs.map((slug) => ({ slug }))
    } catch (error) {
        console.error("Error in generateStaticParams:", error)
        return [{ slug: 'style-preview' }]
    }
}

export async function generateMetadata({ params }: PostPageProps) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (slug === 'style-preview') {
        return {
            title: "Style Preview",
            description: "A preview of the blog post styling.",
        }
    }

    if (!post) {
        return {
            title: "Post Not Found",
        }
    }

    return {
        // Warning: This title will be statically generated using the first post found (e.g. English)
        title: post.title,
        description: post.description,
    }
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params

    if (slug === 'style-preview') {
        return <PostView postVersions={[]} slug={slug} />
    }

    const postVersions = await getPostVersionsBySlug(slug)

    if (!postVersions || postVersions.length === 0) {
        notFound()
    }

    return <PostView postVersions={postVersions} slug={slug} />
}
