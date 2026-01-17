import { Repo } from "@/lib/github"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Star, Calendar } from "lucide-react"
import Link from "next/link"

export function ProjectCard({ repo }: { repo: Repo }) {
    return (
        <Link href={repo.html_url} target="_blank" className="block h-full group">
            <div className="h-full flex flex-col p-6 rounded-lg bg-secondary/20 hover:bg-secondary/40 transition-colors duration-300">
                <div className="flex justify-between items-start gap-4 mb-4">
                    <h3 className="text-lg font-medium tracking-tight group-hover:text-primary transition-colors">{repo.name}</h3>
                    <div className="flex items-center text-muted-foreground text-xs shrink-0">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        <span>{repo.stargazers_count}</span>
                    </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                    {repo.description || "No description provided."}
                </p>
                <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                    {repo.language && (
                        <span className="font-mono opacity-70">
                            {repo.language}
                        </span>
                    )}
                    <span className="opacity-50">
                        {new Date(repo.updated_at).getFullYear()}
                    </span>
                </div>
            </div>
        </Link>
    )
}
