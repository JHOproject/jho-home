"use client"

import { useEffect } from "react"

export function HideScrollbarOnHome() {
    useEffect(() => {
        document.documentElement.classList.add("hide-scrollbar")
        document.body.classList.add("hide-scrollbar")
        return () => {
            document.documentElement.classList.remove("hide-scrollbar")
            document.body.classList.remove("hide-scrollbar")
        }
    }, [])

    return null
}
