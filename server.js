const express = require('express'); const { OpenAI } = require('openai'); require('dotenv').config();

const app = express(); app.use(express.json()); app.use(express.static('.'));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/generate-note', async (req, res) => { const data = req.body;

const prompt = `
    As an ABA Therapist, write a professional session note based on these data points:
    
    Goals Addressed:
    ${data.goals.filter(g => g.status === 'worked').map(g => `- ${g.goal}: ${g.outcome}`).join('\n')}
    
    Engagement: ${data.engagement}
    Prompting: ${data.prompting}
    
    The note must follow insurance-appropriate language (objective, clinical, third-person).
    Format:
    1. Session Summary
    2. Progress on Goals
    3. Client Response/Affect
    4. Plan for next session.
`;

try {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "system", content: "You are a clinical ABA supervisor." }, { role: "user", content: prompt }]
    });
    res.json({ note: completion.choices[0].message.content });
} catch (err) {
    res.status(500).json({ error: err.message });
}


});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));