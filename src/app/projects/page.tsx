import { getRepos } from "@/lib/github"
import { ProjectCard } from "@/components/project-card"

export const metadata = {
    title: "Projects - Jessie Ho",
    description: "Recent open source projects and contributions.",
}

// Since this is static export, this runs at build time.
export default async function ProjectsPage() {
    const repos = await getRepos()

    return (
        <div className="container py-8 md:py-12 lg:py-24">
            <div className="flex flex-col gap-4 mb-8">
                <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
                    Projects
                </h1>
                <p className="max-w-[750px] text-lg text-muted-foreground sm:text-l">
                    Here are my latest 6 repositories from GitHub.
                </p>
            </div>

            {repos.length === 0 ? (
                <p className="text-muted-foreground">Unable to fetch projects at this time.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {repos.map((repo) => (
                        <ProjectCard key={repo.id} repo={repo} />
                    ))}
                </div>
            )}
        </div>
    )
}
