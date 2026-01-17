import { GoogleGenerativeAI } from '@google/generative-ai'
import { CHATBOT_CONFIG } from '@/lib/chatbot-config'

export async function POST(req: Request) {
    try {
        const { messages } = await req.json()

        // 1. Basic Request Validation
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return Response.json({ error: 'Invalid messages format' }, { status: 400 })
        }

        // 2. Prevent Overly Large Payloads (Security)
        if (messages.length > 10) {
            return Response.json({ error: 'Conversation too long' }, { status: 400 })
        }

        const latestMessage = messages[messages.length - 1].content
        if (latestMessage.length > 500) {
            return Response.json({ error: 'Message too long (max 500 chars)' }, { status: 400 })
        }

        const apiKey = process.env.GEMINI_API_KEY

        if (!apiKey) {
            console.error('CHAT_API: GEMINI_API_KEY is missing!')
            return Response.json({ error: 'API key not configured' }, { status: 500 })
        }

        const genAI = new GoogleGenerativeAI(apiKey)

        // Build conversation history (alternating user/model)
        // Gemini history MUST start with 'user' role.
        // We filter out any leading 'model' messages (like the initial assistant greeting).
        const history = messages.slice(0, -1).map((msg: any) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }],
        }))

        // Find the index of the first 'user' message
        const firstUserIndex = history.findIndex((msg: any) => msg.role === 'user')
        const formattedHistory = firstUserIndex !== -1 ? history.slice(firstUserIndex) : []

        // Verify history structure: it must be alternating. 
        // Our messages are: assistant (init), user (msg1), assistant (reply1), user (msg2)
        // slice(0, -1) -> assistant, user, assistant
        // roles -> model, user, model
        // Last message will be 'user' (the current request)
        // This is perfectly alternating.

        const model = genAI.getGenerativeModel({
            model: CHATBOT_CONFIG.MODEL,
            systemInstruction: CHATBOT_CONFIG.SYSTEM_PROMPT,
        })

        const chat = model.startChat({
            history: formattedHistory,
            generationConfig: {
                maxOutputTokens: CHATBOT_CONFIG.MAX_TOKENS,
                temperature: CHATBOT_CONFIG.TEMPERATURE,
            },
        })

        const userMessage = messages[messages.length - 1].content

        console.log('CHAT_API: Sending message to Gemini...')
        const result = await chat.sendMessage(userMessage)
        const response = await result.response
        const text = response.text()
        console.log('CHAT_API: Successfully received response from Gemini.')

        return Response.json({
            message: text,
            usage: {
                promptTokens: 0,
                completionTokens: 0,
            }
        })

    } catch (error: any) {
        console.error('CHAT_API_DETAILED_ERROR:', {
            message: error.message,
            stack: error.stack,
            cause: error.cause,
        })

        // Specific handling for common Gemini errors
        if (error.message?.includes('403') || error.message?.includes('API_KEY_INVALID')) {
            return Response.json({ error: 'Invalid API Key' }, { status: 403 })
        }

        return Response.json(
            { error: 'Failed to process chat message', details: error.message },
            { status: 500 }
        )
    }
}
