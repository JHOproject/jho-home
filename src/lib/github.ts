export interface Repo {
    id: number
    name: string
    description: string | null
    html_url: string
    stargazers_count: number
    language: string | null
    updated_at: string
}

export async function getRepos(): Promise<Repo[]> {
    try {
        const res = await fetch(
            "https://api.github.com/users/JHOproject/repos?sort=updated&per_page=6&direction=desc",
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

        const repos: Repo[] = await res.json()
        // Sort by updated_at just in case API didn't sort perfectly or to ensure consistency
        // API logic: sort=updated direction=desc usually works.
        return repos
    } catch (error) {
        console.error("Error fetching repos:", error)
        return []
    }
}
