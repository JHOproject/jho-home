"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import en from "@/locales/en.json"
import zhTW from "@/locales/zh-TW.json"

export type Locale = "en" | "zh-TW"

type Dictionary = typeof en

const dictionaries: Record<Locale, Dictionary> = {
    en,
    "zh-TW": zhTW,
}

interface I18nContextType {
    locale: Locale
    switchLocale: (newLocale: Locale) => void
    t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

// Simple helper to get deeply nested properties from an object using a string path (e.g. "hero.title_1")
function getNestedProperty(obj: any, path: string): string {
    const value = path.split('.').reduce((acc, part) => acc && acc[part], obj)
    return typeof value === 'string' ? value : path
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
    // Default to EN for initial render to match Server Component defaults (prevents hydration mismatch)
    const [locale, setLocale] = useState<Locale>("en")
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        // Check if there is an existing cookie
        const cookieMatch = document.cookie.match(/(?:(?:^|.*;\s*)NEXT_LOCALE\s*\=\s*([^;]*).*$)|^.*$/)
        const savedLocale = cookieMatch ? cookieMatch[1] : null

        if (savedLocale === "en" || savedLocale === "zh-TW") {
            setLocale(savedLocale as Locale)
        } else {
            // Check browser language
            const browserLang = navigator.language
            if (browserLang.toLowerCase().includes("zh")) {
                setLocale("zh-TW")
                document.cookie = `NEXT_LOCALE=zh-TW; path=/; max-age=31536000`
            } else {
                setLocale("en")
                document.cookie = `NEXT_LOCALE=en; path=/; max-age=31536000`
            }
        }
    }, [])

    const switchLocale = (newLocale: Locale) => {
        setLocale(newLocale)
        // Update cookie to persist choice
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`
    }

    const t = (key: string) => {
        return getNestedProperty(dictionaries[locale], key)
    }

    // To prevent hydration mismatch flicker from EN to ZH on initial load,
    // we could use 'isMounted'. But since this wraps the whole app, returning null
    // would hurt SEO. Instead, we allow the initial 'en' render and quick swap.
    return (
        <I18nContext.Provider value={{ locale, switchLocale, t }}>
            <div style={{ opacity: isMounted ? 1 : 0, transition: 'opacity 0.2s' }}>
                {children}
            </div>
        </I18nContext.Provider>
    )
}

export function useTranslation() {
    const context = useContext(I18nContext)
    if (context === undefined) {
        throw new Error("useTranslation must be used within an I18nProvider")
    }
    return context
}
