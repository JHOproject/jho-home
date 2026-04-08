"use client"
import { useTranslation } from "./i18n-provider"

export function About() {
    const { t } = useTranslation()

    return (
        <section className="container py-8 md:py-12 lg:py-24 border-t border-border/40">
            <div className="mx-auto flex max-w-[58rem] flex-col items-start gap-4 text-center md:items-center">
                <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
                    {t("about.title")}
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    {t("about.description")}
                </p>
            </div>
        </section>
    )
}
