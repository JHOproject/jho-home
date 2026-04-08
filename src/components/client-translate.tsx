"use client"
import { useTranslation } from "./i18n-provider"

export function ClientTranslate({ translationKey }: { translationKey: string }) {
    const { t } = useTranslation()
    return <>{t(translationKey)}</>
}
