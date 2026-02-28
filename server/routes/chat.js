const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message bhejo bhai' });
  }

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + process.env.GEMINI_API_KEY,
      {
        contents: [
          {
            parts: [{ text: message }]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Updated parsing (safety ke liye check add kiya)
    const candidates = response.data.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error('No candidates returned from Gemini');
    }

    const aiReply = candidates[0].content.parts[0].text || 'Kuch samajh nahi aaya :(';

    res.json({ reply: aiReply });
  } catch (error) {
    console.error('Gemini Error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'AI se connection issue, model ya key check karo' });
  }
});

module.exports = router;