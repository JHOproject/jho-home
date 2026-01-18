export default function PrivacyPage() {
    return (
        <div className="container mx-auto max-w-2xl py-20 px-6 mt-12">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

            <section className="space-y-6 text-muted-foreground">
                <p>
                    This website uses <strong>Google Analytics 4 (GA4)</strong> to analyze traffic and improve user experience.
                    GA4 uses cookies to collect data such as page views and interaction events.
                </p>

                <h2 className="text-xl font-semibold text-foreground">Data Collection</h2>
                <p>
                    The information collected is anonymous and used solely for statistical purposes.
                    We do NOT collect personally identifiable information (PII) through these tools.
                </p>

                <h2 className="text-xl font-semibold text-foreground">How to Opt-Out</h2>
                <p>
                    You can prevent your data from being used by Google Analytics by:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Adjusting your browser settings to decline cookies.</li>
                    <li>Using the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics Opt-out Browser Add-on</a>.</li>
                    <li>Utilizing "Do Not Track" features in your web browser.</li>
                </ul>

                <p className="pt-4 text-xs">
                    Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
            </section>
        </div>
    )
}
