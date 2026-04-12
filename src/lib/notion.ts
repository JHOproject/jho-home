import { Client } from "@notionhq/client"
import { NotionToMarkdown } from "notion-to-md"

export interface Post {
    id: string
    title: string
    slug: string
    date: string
    description: string
    content?: string // Markdown content
    language?: string
}

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

const n2m = new NotionToMarkdown({ notionClient: notion })

n2m.setCustomTransformer("column_list", async (block) => {
    const { id } = block as any;
    const children = await n2m.pageToMarkdown(id);
    const htmlChildren = n2m.toMarkdownString(children);
    return `<div class="notion-column-list flex flex-col md:flex-row gap-6 w-full my-4">\n${htmlChildren.parent || ""}\n</div>`;
});

n2m.setCustomTransformer("column", async (block) => {
    const { id } = block as any;
    const children = await n2m.pageToMarkdown(id);
    const htmlChildren = n2m.toMarkdownString(children);
    return `<div class="notion-column flex-1 w-full min-w-0">\n${htmlChildren.parent || ""}\n</div>`;
});
export async function getPosts(): Promise<Post[]> {
    if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
        console.warn("Missing NOTION_TOKEN or NOTION_DATABASE_ID")
        return []
    }

    try {
        const response = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID,
            sorts: [
                {
                    property: "Date",
                    direction: "descending",
                },
            ],
            filter: {
                property: "Published",
                checkbox: {
                    equals: true,
                },
            },
        })

        const posts = response.results
            .map((page) => {
                // Simple type guard: check if 'properties' exists on the page object
                if (!("properties" in page)) {
                    return null
                }

                const props = page.properties as any

                const title = props.Name?.title?.[0]?.plain_text || "Untitled"
                const slug = props.Slug?.rich_text?.[0]?.plain_text || page.id
                const date = props.Date?.date?.start || new Date().toISOString()
                const description = props.Description?.rich_text?.[0]?.plain_text || ""
                const language = props.Language?.select?.name

                return {
                    id: page.id,
                    title,
                    slug,
                    date,
                    description,
                    language,
                } as Post
            })
            .filter((post): post is Post => post !== null)

        return posts
    } catch (error) {
        console.error("Error fetching posts from Notion:", error)
        return []
    }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const posts = await getPosts()
    const post = posts.find((p) => p.slug === slug)

    if (!post) {
        return null
    }

    try {
        const mdblocks = await n2m.pageToMarkdown(post.id)
        const mdString = n2m.toMarkdownString(mdblocks)

        return {
            ...post,
            content: mdString.parent,
        }
    } catch (error) {
        console.error("Error fetching post content:", error)
        return null
    }
}

export async function getPostVersionsBySlug(slug: string): Promise<Post[]> {
    const posts = await getPosts()
    const matchingPosts = posts.filter((p) => p.slug === slug)

    if (!matchingPosts || matchingPosts.length === 0) {
        return []
    }

    const versions = await Promise.all(matchingPosts.map(async (post) => {
        try {
            const mdblocks = await n2m.pageToMarkdown(post.id)
            const mdString = n2m.toMarkdownString(mdblocks)

            return {
                ...post,
                content: mdString.parent,
            }
        } catch (error) {
            console.error("Error fetching post content for id", post.id, error)
            return post
        }
    }))

    return versions
}
