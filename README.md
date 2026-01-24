# JHO Home

Welcome to **JHO Home**, a modern personal portfolio and blog platform built with Next.js 15. This project serves as a showcase for professional work, blog posts, and interactive features.

## 🚀 Key Features

- **🤖 AI Chatbot**: Integrated with Google Gemini API to provide interactive assistance and answer questions about the site.
- **📝 Notion-Driven Content**: Blog posts and projects are dynamically fetched from Notion, allowing for easy content management without code changes.
- **☕ Donation Support**: "Buy Me a Coffee" integration via PayPal.me to support continued development.
- **🎨 Premium UI/UX**:
  - Built with **Tailwind CSS 4** for a sleek, modern look.
  - Full **Dark/Light Mode** support.
  - Fluid animations and responsive layouts.
- **📊 Analytics**: Google Analytics 4 integration for tracking visitor engagement.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Lucide React](https://lucide.dev/)
- **AI**: [Google Gemini Pro](https://ai.google.dev/) via AI SDK
- **Backend**: [Notion API](https://developers.notion.com/)

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory and add the following keys:

```bash
# Notion API
NOTION_TOKEN=your_notion_integration_token_here
NOTION_DATABASE_ID=your_notion_database_id_here

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Feature Toggles
NEXT_PUBLIC_CHATBOT_ENABLED=true
```

## 🛠 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 License

This project is personal property. Feel free to use it as inspiration for your own portfolio.
