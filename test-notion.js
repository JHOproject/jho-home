const { Client } = require("@notionhq/client")

console.log("Notion Client Version Check...")

const notion = new Client({
    auth: "secret_123", // Dummy secret
})

try {
    console.log("Databases keys:", Object.keys(notion.databases))
    console.log("Has query?", !!notion.databases.query)
    // Check prototype
    console.log("Proto keys:", Object.getOwnPropertyNames(Object.getPrototypeOf(notion.databases)))
} catch (e) {
    console.error(e)
}
