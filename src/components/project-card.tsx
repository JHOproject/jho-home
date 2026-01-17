import { Repo } from "@/lib/github"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Star, Calendar } from "lucide-react"
import Link from "next/link"

export function ProjectCard({ repo }: { repo: Repo }) {
    return (
        <Link href={repo.html_url} target="_blank" className="block h-full group">
            <Card className="h-full flex flex-col hover:border-primary/50 transition-colors duration-300">
                <CardHeader>
                    <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-1">{repo.name}</CardTitle>
                        <div className="flex items-center text-muted-foreground transition-colors group-hover:text-foreground">
                            <Star className="h-4 w-4 mr-1 fill-current" />
                            <span className="text-xs">{repo.stargazers_count}</span>
                        </div>
                    </div>
                    <CardDescription className="line-clamp-2 mt-2 leading-relaxed">
                        {repo.description || "No description provided."}
                    </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                            {repo.language && (
                                <Badge variant="secondary" className="font-mono font-normal">
                                    {repo.language}
                                </Badge>
                            )}
                        </div>
                        <div className="flex items-center gap-1 opacity-70">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(repo.updated_at).getFullYear()}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
