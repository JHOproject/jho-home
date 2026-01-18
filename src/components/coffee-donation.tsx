"use client"

import { Coffee } from "lucide-react"

export function CoffeeDonation() {
    const paypalMe = "https://www.paypal.me/HOYUCHI762"

    const amounts = [
        { label: "$3", value: "3" },
        { label: "$5", value: "5" },
        { label: "$10", value: "10" },
    ]

    const handleDonationClick = (amount: string) => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'coffee_click', {
                event_name: 'coffee_click',
                amount: amount,
                placement: 'blog_post'
            });
        }
    }

    return (
        <div className="my-12 p-8 rounded-2xl border border-border bg-muted/30 text-center animate-fade-in">
            <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/5 rounded-full">
                    <Coffee className="h-6 w-6 text-primary" />
                </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Buy me a coffee</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                If you enjoyed this post and found it helpful, consider supporting my work!
            </p>

            <div className="flex flex-wrap justify-center gap-3">
                {amounts.map((item) => (
                    <a
                        key={item.value}
                        href={`${paypalMe}/${item.value}usd`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleDonationClick(item.value)}
                        className="coffee-btn"
                    >
                        {item.label}
                    </a>
                ))}
                <a
                    href={paypalMe}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleDonationClick('custom')}
                    className="coffee-btn"
                >
                    Custom
                </a>
            </div>
        </div>
    )
}
