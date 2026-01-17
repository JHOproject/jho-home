import { Hero } from "@/components/hero"
import { About } from "@/components/about"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
    </div>
  )
}
