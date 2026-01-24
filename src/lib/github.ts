export interface Repo {
    id: number
    name: string
    description: string | null
    html_url: string
    stargazers_count: number
    language: string | null
    updated_at: string
}

const FEATURED_REPOS = [
    "apple-music-controller",
    "Shozzle",
    "html-project-kerry"
]

export async function getRepos(): Promise<Repo[]> {
    try {
        const res = await fetch(
            "https://api.github.com/users/JHOproject/repos?sort=updated&per_page=100&direction=desc",
            {
                next: { revalidate: 3600 },
                headers: {
                    Accept: "application/vnd.github.v3+json",
                },
            }
        )

        if (!res.ok) {
            console.error("Failed to fetch repos", res.status, res.statusText)
            return []
        }

        const allRepos: Repo[] = await res.json()

        // Filter for specific featured repositories
        const featuredRepos = allRepos.filter(repo =>
            FEATURED_REPOS.includes(repo.name)
        )

        // Sort them according to the order in FEATURED_REPOS
        return featuredRepos.sort((a, b) => {
            return FEATURED_REPOS.indexOf(a.name) - FEATURED_REPOS.indexOf(b.name)
        })
    } catch (error) {
        console.error("Error fetching repos:", error)
        return []
    }
}
