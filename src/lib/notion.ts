export interface Post {
    id: string
    title: string
    slug: string
    date: string
    description: string
}

export async function getPosts(): Promise<Post[]> {
    // In a real application, we would use the Notion Client SDK here.
    // const notion = new Client({ auth: process.env.NOTION_TOKEN })
    // ... fetch database ...

    // For MVP without credentials, returning mock data.
    const mockPosts: Post[] = [
        {
            id: "1",
            title: "Building a Personal Website with Next.js",
            slug: "building-personal-website",
            date: "2023-10-27",
            description: "How I built this website using Next.js, Tailwind CSS, and GitHub Pages.",
        },
        {
            id: "2",
            title: "The Power of Static Site Generation",
            slug: "power-of-ssg",
            date: "2023-11-15",
            description: "Why static exports are great for personal sites and documentation.",
        },
        {
            id: "3",
            title: "Mastering Tailwind CSS v4",
            slug: "mastering-tailwind-v4",
            date: "2024-01-10",
            description: "Exploring the new features and configuration of Tailwind CSS v4.",
        }
    ]

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return mockPosts
}
