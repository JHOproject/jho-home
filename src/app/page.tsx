import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { HideScrollbarOnHome } from "@/components/hide-scrollbar-on-home"

export default function Home() {
  return (
    <>
      <HideScrollbarOnHome />
      <div className="flex flex-col flex-1 w-full justify-center">
        <Hero />
      </div>
    </>
  )
}
