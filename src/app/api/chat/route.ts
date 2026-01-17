import { GoogleGenerativeAI } from '@google/generative-ai'
import { CHATBOT_CONFIG } from '@/lib/chatbot-config'

export async function POST(req: Request) {
    try {
        const { messages } = await req.json()
        const apiKey = process.env.GEMINI_API_KEY

        if (!apiKey) {
            console.error('GEN_AI_ERROR: GEMINI_API_KEY is missing in environment variables')
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

        const genAI = new GoogleGenerativeAI(apiKey)

        // Initialize the model with system instructions
        const model = genAI.getGenerativeModel({
            model: CHATBOT_CONFIG.MODEL,
            systemInstruction: CHATBOT_CONFIG.SYSTEM_PROMPT,
            generationConfig: {
                maxOutputTokens: CHATBOT_CONFIG.MAX_TOKENS,
                temperature: CHATBOT_CONFIG.TEMPERATURE,
            },
        })

        // Build conversation history (excluding the new message)
        const history = messages.slice(0, -1).map((msg: any) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }],
        }))

        // Start chat
        const chat = model.startChat({
            history: history,
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
