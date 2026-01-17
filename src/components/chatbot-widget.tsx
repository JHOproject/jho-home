"use client"

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2, Mail } from 'lucide-react'
import { ChatMessage, CHATBOT_CONFIG } from '@/lib/chatbot-config'
import { getRemainingMessages, incrementUsage, canSendMessage, getResetTimeString } from '@/lib/rate-limiter'

export function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hi! I'm here to help you learn about Jessie's skills and experience. What would you like to know? ✨",
            timestamp: Date.now(),
        }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [remaining, setRemaining] = useState<number>(CHATBOT_CONFIG.MAX_MESSAGES_PER_DAY)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setRemaining(getRemainingMessages())
    }, [])

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = async () => {
        if (!input.trim() || isLoading || !canSendMessage()) return

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: Date.now(),
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        // Increment usage
        incrementUsage()
        setRemaining(getRemainingMessages())

        try {
            // Include basePath in the fetch URL
            const response = await fetch('/jho-home/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                }),
            })

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await response.text();
                console.error("Non-JSON response received:", text);
                throw new Error("Server returned non-JSON response. Please check if the API route is configured correctly.");
            }

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.details || data.error || 'Failed to get response')
            }

            const assistantMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.message,
                timestamp: Date.now(),
            }

            setMessages(prev => [...prev, assistantMessage])
        } catch (error: any) {
            console.error('Chat error:', error)
            const errorMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `Oops! Error: ${error.message} 😅`,
                timestamp: Date.now(),
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    aria-label="Open chat"
                >
                    <MessageCircle className="h-6 w-6 mx-auto" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 flex flex-col w-[400px] h-[600px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)] bg-background border border-border rounded-lg shadow-2xl overflow-hidden animate-fade-in">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <MessageCircle className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">Ask about Jessie</h3>
                                <p className="text-xs text-muted-foreground">
                                    {remaining > 0
                                        ? `${remaining} chat${remaining !== 1 ? 's' : ''} left today ⚡`
                                        : `Resets in ${getResetTimeString()}`
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <a
                                href="mailto:jessieho1822@gmail.com"
                                className="h-8 w-8 rounded-full hover:bg-muted transition-colors flex items-center justify-center text-muted-foreground hover:text-primary"
                                title="Send Email"
                            >
                                <Mail className="h-4 w-4" />
                            </a>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="h-8 w-8 rounded-full hover:bg-muted transition-colors flex items-center justify-center"
                                aria-label="Close chat"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-lg px-4 py-2 ${message.role === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-foreground'
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-muted rounded-lg px-4 py-2">
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-border">
                        {remaining > 0 ? (
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask me anything..."
                                    disabled={isLoading}
                                    className="flex-1 px-4 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className="h-10 w-10 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                                    aria-label="Send message"
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="text-center py-2">
                                <p className="text-sm text-muted-foreground">
                                    Daily limit reached. Resets in {getResetTimeString()}.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
