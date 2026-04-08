import { getPosts } from "@/lib/notion"
import { BlogsView } from "./blogs-view"

export const revalidate = 3600 // Revalidate every hour

export default async function PostsPage() {
    const posts = await getPosts()

    return <BlogsView posts={posts} />
}
