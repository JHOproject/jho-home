"use client"

import Script from "next/script"

export function GoogleAnalytics() {
    return (
        <>
            <Script
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-GMBD0LV39L"
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-GMBD0LV39L', {
                            page_path: window.location.pathname,
                        });
                    `,
                }}
            />
        </>
    )
}
