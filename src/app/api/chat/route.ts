import { GoogleGenerativeAI } from '@google/generative-ai'
import { CHATBOT_CONFIG } from '@/lib/chatbot-config'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(req: Request) {
    try {
        const { messages } = await req.json()

        if (!process.env.GEMINI_API_KEY) {
            return Response.json(
                { error: 'API key not configured' },
                { status: 500 }
            )
        }

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return Response.json(
                { error: 'Invalid messages format' },
                { status: 400 }
            )
        }

        // Get the model
        const model = genAI.getGenerativeModel({
            model: CHATBOT_CONFIG.MODEL,
            generationConfig: {
                maxOutputTokens: CHATBOT_CONFIG.MAX_TOKENS,
                temperature: CHATBOT_CONFIG.TEMPERATURE,
            },
        })

        // Build conversation history
        const history = messages.slice(0, -1).map((msg: any) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }],
        }))

        // Start chat with history
        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: CHATBOT_CONFIG.SYSTEM_PROMPT }],
                },
                {
                    role: 'model',
                    parts: [{ text: 'Understood! I\'m ready to help visitors learn about Jessie Ho and answer their questions professionally.' }],
                },
                ...history,
            ],
        })

        // Get the latest user message
        const userMessage = messages[messages.length - 1].content

        // Send message and get response
        const result = await chat.sendMessage(userMessage)
        const response = result.response
        const text = response.text()

        return Response.json({
            message: text,
            usage: {
                promptTokens: 0, // Gemini doesn't expose token counts in the same way
                completionTokens: 0,
            }
        })

    } catch (error) {
        console.error('Chat API error:', error)
        return Response.json(
            { error: 'Failed to process chat message' },
            { status: 500 }
        )
    }
}
