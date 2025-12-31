import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getAIOutput(text: string, prompt: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // <-- change from gpt-4
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: `${prompt}\n\n${text}` },
      ],
    });

    return response.choices[0]?.message?.content || "";
  } catch (err: any) {
    console.error("Error calling OpenAI API:", err.response?.data || err.message || err);
    throw err;
  }
}
