const fs = require('fs');
const path = require('path');

async function testKey() {
    try {
        const envPath = path.join(__dirname, '..', '.env');
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/GEMINI_API_KEY=(.*)/);

        if (!match) {
            console.error("GEMINI_API_KEY not found in .env");
            return;
        }

        let apiKey = match[1].trim();
        apiKey = apiKey.replace(/^['"]|['"]$/g, '');

        console.log("API Key:", apiKey.substring(0, 5) + "..." + apiKey.substring(apiKey.length - 5));

        // Step 1: List available models
        console.log("\n--- Step 1: Listing available Gemini models ---");
        const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const listRes = await fetch(listUrl);
        const listData = await listRes.json();

        if (!listRes.ok) {
            console.error("API Key INVALID. Status:", listRes.status);
            console.error(JSON.stringify(listData, null, 2));
            return;
        }

        console.log("API Key is VALID!");
        const generativeModels = listData.models.filter(m =>
            m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")
        );
        console.log("\nModels that support generateContent:");
        generativeModels.forEach(m => console.log("  -", m.name));

        // Step 2: Try generating with gemini-1.5-flash
        console.log("\n--- Step 2: Testing gemini-1.5-flash ---");
        const gen15Url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const gen15Res = await fetch(gen15Url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: "Say hello" }] }] })
        });
        const gen15Data = await gen15Res.json();
        if (!gen15Res.ok) {
            console.error("gemini-1.5-flash FAILED. Status:", gen15Res.status);
            console.error("Error:", gen15Data.error?.message || JSON.stringify(gen15Data));
        } else {
            console.log("gemini-1.5-flash WORKS!");
        }

        // Step 3: Try generating with gemini-2.0-flash  
        console.log("\n--- Step 3: Testing gemini-2.0-flash ---");
        const gen20Url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const gen20Res = await fetch(gen20Url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: "Say hello" }] }] })
        });
        const gen20Data = await gen20Res.json();
        if (!gen20Res.ok) {
            console.error("gemini-2.0-flash FAILED. Status:", gen20Res.status);
            console.error("Error:", gen20Data.error?.message || JSON.stringify(gen20Data));
        } else {
            console.log("gemini-2.0-flash WORKS!");
        }

        // Step 4: Try gemini-2.0-flash-lite
        console.log("\n--- Step 4: Testing gemini-2.0-flash-lite ---");
        const genLiteUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`;
        const genLiteRes = await fetch(genLiteUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: "Say hello" }] }] })
        });
        const genLiteData = await genLiteRes.json();
        if (!genLiteRes.ok) {
            console.error("gemini-2.0-flash-lite FAILED. Status:", genLiteRes.status);
            console.error("Error:", genLiteData.error?.message || JSON.stringify(genLiteData));
        } else {
            console.log("gemini-2.0-flash-lite WORKS!");
        }

    } catch (error) {
        console.error("Script error:", error.message);
    }
}

testKey();
