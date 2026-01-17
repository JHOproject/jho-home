import { CHATBOT_CONFIG, UsageData } from './chatbot-config'

const STORAGE_KEY = `${CHATBOT_CONFIG.STORAGE_KEY_PREFIX}v2`

const getResetTime = (): number => {
    return Date.now() + 24 * 60 * 60 * 1000
}

export const getRemainingMessages = (): number => {
    if (typeof window === 'undefined') return CHATBOT_CONFIG.MAX_MESSAGES_PER_DAY

    const stored = localStorage.getItem(STORAGE_KEY)

    if (!stored) {
        return CHATBOT_CONFIG.MAX_MESSAGES_PER_DAY
    }

    try {
        const data: UsageData = JSON.parse(stored)

        // Check if reset time has passed
        if (Date.now() > data.resetAt) {
            localStorage.removeItem(STORAGE_KEY)
            return CHATBOT_CONFIG.MAX_MESSAGES_PER_DAY
        }

        return Math.max(0, CHATBOT_CONFIG.MAX_MESSAGES_PER_DAY - data.count)
    } catch {
        return CHATBOT_CONFIG.MAX_MESSAGES_PER_DAY
    }
}

export const incrementUsage = (): boolean => {
    if (typeof window === 'undefined') return false

    const remaining = getRemainingMessages()
    if (remaining <= 0) return false

    const stored = localStorage.getItem(STORAGE_KEY)

    const data: UsageData = stored
        ? JSON.parse(stored)
        : {
            count: 0,
            date: new Date().toISOString(),
            resetAt: getResetTime(),
        }

    data.count += 1
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))

    return true
}

export const canSendMessage = (): boolean => {
    return getRemainingMessages() > 0
}

export const getResetTimeString = (): string => {
    if (typeof window === 'undefined') return '24 hours'

    const stored = localStorage.getItem(STORAGE_KEY)

    if (!stored) return '24 hours'

    try {
        const data: UsageData = JSON.parse(stored)
        const resetDate = new Date(data.resetAt)
        const now = new Date()

        const diffMs = resetDate.getTime() - now.getTime()

        if (diffMs <= 0) return 'now'

        const hours = Math.floor(diffMs / (1000 * 60 * 60))
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

        if (hours < 1) {
            return `${minutes} minute${minutes !== 1 ? 's' : ''}`
        }

        return `${hours} hour${hours !== 1 ? 's' : ''}`
    } catch {
        return '24 hours'
    }
}
