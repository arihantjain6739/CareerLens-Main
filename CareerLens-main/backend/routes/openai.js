import express from 'express';
const router = express.Router();

router.post('/generate-questions', async (req, res) => {
  const { topic = 'general programming', difficulty = 'mixed', count = 4 } = req.body || {};
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key not configured on server.' });
  }

  const prompt = `
Generate ${count} interview/test questions about "${topic}" with mixed difficulty. 
Return ONLY valid JSON in the exact format:
{ "questions": [ { "id": 1, "question": "...", "type": "mcq"|"coding", "difficulty": "easy"|"medium"|"hard",
   "options": ["a","b","c","d"], "correctAnswer": 0, 
   "starterCode": "...", "language": "javascript", "testCases": [{"input":"...","output":"..."}] }, ... ] }
Make mcq items include options and correctAnswer (0-based). Make coding items include language and testCases.
  `;

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a JSON generator for interview questions.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 6000
      })
    });

    if (!resp.ok) {
      const txt = await resp.text();
      console.error('OpenAI error', resp.status, txt);
      return res.status(500).json({ error: 'OpenAI request failed', details: txt });
    }

    const data = await resp.json();
    const content = data.choices?.[0]?.message?.content || data.choices?.[0]?.text || '';

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      const match = content.match(/\{[\s\S]*\}$/);
      if (match) parsed = JSON.parse(match[0]);
      else {
        console.error('Failed to parse OpenAI response:', content);
        return res.status(500).json({ error: 'Invalid JSON returned by OpenAI', raw: content });
      }
    }

    if (!parsed || !Array.isArray(parsed.questions)) {
      return res.status(500).json({ error: 'Invalid response shape from OpenAI', raw: parsed });
    }

    return res.json({ questions: parsed.questions });
  } catch (err) {
    console.error('generate-questions error', err);
    return res.status(500).json({ error: 'Server error', details: String(err) });
  }
});

export default router;