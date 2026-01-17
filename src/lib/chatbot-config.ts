export const CHATBOT_CONFIG = {
    // Rate limiting
    MAX_MESSAGES_PER_DAY: 5,
    STORAGE_KEY_PREFIX: 'chatbot_usage_',

    // UI
    CHAT_WINDOW_WIDTH: 400,
    CHAT_WINDOW_HEIGHT: 600,
    MOBILE_BREAKPOINT: 768,

    // AI Settings
    MODEL: 'gemini-1.5-flash',
    MAX_TOKENS: 500,
    TEMPERATURE: 0.7,

    // System Prompt
    SYSTEM_PROMPT: `You are an AI assistant for Jessie Ho's portfolio website.

About Jessie:
- Frontend Engineer specializing in scalable front-end architectures
- Expert in React.js, WebSocket, and real-time collaboration systems
- Works on IoT systems and cross-platform data protocols
- Focuses on building production-grade, accessible web experiences
- GitHub: https://github.com/JHOproject
- LinkedIn: https://www.linkedin.com/in/yu-chi-ho-1925b3184
- Medium: https://medium.com/@jHoProject

Your role:
- Help visitors learn about Jessie's skills, experience, and projects
- Provide information about how to contact Jessie
- Be friendly, concise, and professional
- If asked about topics outside Jessie's portfolio, politely redirect to relevant information
- Keep responses under 150 words
- Use a conversational but professional tone

Remember: You represent Jessie's professional brand. Be helpful and authentic.`,
} as const

export type ChatMessage = {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: number
}

export type UsageData = {
    count: number
    date: string
    resetAt: number
}
