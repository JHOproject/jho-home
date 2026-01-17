import Link from "next/link"
import { Star, GitFork } from "lucide-react"
import { Repo } from "@/lib/github"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Simple Card components if UI library not fully installed, 
// using simple Tailwind for MVP to avoid shadcn setup overhead if I missed steps.
// But I will create simplified versions inline or assume basic markup.

export function ProjectCard({ repo }: { repo: Repo }) {
    return (
        <div className="flex flex-col justify-between rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
                <div className="flex items-center justify-between space-x-2">
                    <h3 className="font-semibold leading-none tracking-tight truncate">
                        <Link href={repo.html_url} target="_blank" className="hover:underline">
                            {repo.name}
                        </Link>
                    </h3>
                    {repo.language && (
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                            {repo.language}
                        </span>
                    )}
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                    {repo.description || "No description provided."}
                </p>
            </div>
            <div className="p-6 pt-0 flex items-center justify-between text-muted-foreground text-sm">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {repo.stargazers_count}
                    </span>
                </div>
                <span className="text-xs">
                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                </span>
            </div>
        </div>
    )
}
