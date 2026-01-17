import { CHATBOT_CONFIG, UsageData } from './chatbot-config'

const getStorageKey = () => {
    const today = new Date().toISOString().split('T')[0]
    return `${CHATBOT_CONFIG.STORAGE_KEY_PREFIX}${today}`
}

const getNextMidnight = (): number => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    return tomorrow.getTime()
}

export const getRemainingMessages = (): number => {
    if (typeof window === 'undefined') return CHATBOT_CONFIG.MAX_MESSAGES_PER_DAY

    const key = getStorageKey()
    const stored = localStorage.getItem(key)

    if (!stored) {
        return CHATBOT_CONFIG.MAX_MESSAGES_PER_DAY
    }

    try {
        const data: UsageData = JSON.parse(stored)

        // Check if reset time has passed
        if (Date.now() > data.resetAt) {
            localStorage.removeItem(key)
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

    const key = getStorageKey()
    const stored = localStorage.getItem(key)

    const data: UsageData = stored
        ? JSON.parse(stored)
        : {
            count: 0,
            date: new Date().toISOString().split('T')[0],
            resetAt: getNextMidnight(),
        }

    data.count += 1
    localStorage.setItem(key, JSON.stringify(data))

    return true
}

export const canSendMessage = (): boolean => {
    return getRemainingMessages() > 0
}

export const getResetTimeString = (): string => {
    if (typeof window === 'undefined') return 'tomorrow'

    const key = getStorageKey()
    const stored = localStorage.getItem(key)

    if (!stored) return 'tomorrow'

    try {
        const data: UsageData = JSON.parse(stored)
        const resetDate = new Date(data.resetAt)
        const now = new Date()

        const hours = Math.floor((resetDate.getTime() - now.getTime()) / (1000 * 60 * 60))

        if (hours < 1) {
            const minutes = Math.floor((resetDate.getTime() - now.getTime()) / (1000 * 60))
            return `${minutes} minute${minutes !== 1 ? 's' : ''}`
        }

        return `${hours} hour${hours !== 1 ? 's' : ''}`
    } catch {
        return 'tomorrow'
    }
}
