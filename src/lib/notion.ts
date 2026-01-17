import { Client } from "@notionhq/client"

export interface Post {
    id: string
    title: string
    slug: string
    date: string
    description: string
}

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

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

                return {
                    id: page.id,
                    title,
                    slug,
                    date,
                    description,
                }
            })
            .filter((post): post is Post => post !== null)

        return posts
    } catch (error) {
        console.error("Error fetching posts from Notion:", error)
        return []
    }
}
