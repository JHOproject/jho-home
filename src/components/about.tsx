export function About() {
    return (
        <section className="container py-8 md:py-12 lg:py-24 border-t border-border/40">
            <div className="mx-auto flex max-w-[58rem] flex-col items-start gap-4 text-center md:items-center">
                <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
                    About Me
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    I am a passionate software engineer with a focus on modern web technologies.
                    I love simpler code, cleaner designs, and faster load times.
                    When I&apos;m not coding, I&apos;m likely exploring new tools or contributing to open source.
                </p>
            </div>
        </section>
    )
}
