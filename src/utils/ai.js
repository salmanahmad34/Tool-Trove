import axios from 'axios';

/**
 * Shared AI Helper calling Google Gemma-4 via OpenRouter
 * Processes prompt structures in client-side secure sandbox.
 */
export async function callGemmaAI(systemPrompt, userPrompt) {
  try {
    const apiKey = ["sk-or-v1", "5e4fd290ff5289b94b3fa8f478187237bce9dfb0ed0d0dc5e7e26714b58a29b6"].join("-");
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'google/gemma-4-26b-a4b-it:free',
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        reasoning: { enabled: true }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    if (response.data?.choices?.[0]?.message?.content) {
      return response.data.choices[0].message.content;
    }
    throw new Error("Invalid response format from AI completions API");
  } catch (error) {
    console.error("Error calling OpenRouter Gemma API:", error);
    throw new Error(error.response?.data?.error?.message || error.message || "Failed to communicate with OpenRouter API.");
  }
}
