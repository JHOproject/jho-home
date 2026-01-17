import { getRepos } from "@/lib/github"
import { ProjectCard } from "@/components/project-card"

export const revalidate = 3600 // Revalidate every hour

export default async function ProjectsPage() {
    const repos = await getRepos()

    return (
        <div className="container mx-auto px-4 py-32 max-w-6xl">
            <div className="mb-16 space-y-4 animate-fade-in-up">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Projects</h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                    A collection of open source repositories and experiments.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-up [animation-delay:200ms]">
                {repos.map((repo) => (
                    <ProjectCard key={repo.id} repo={repo} />
                ))}
            </div>
        </div>
    )
}
