import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const deepseek = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { content, locale } = await request.json();

    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { error: "DeepSeek API key not configured" },
        { status: 500 }
      );
    }

    const prompt =
      locale === "zh"
        ? `请用简洁的中文总结以下文章的主要内容（不超过150字）：\n\n${content}`
        : `Please provide a concise summary of the following article (max 150 words):\n\n${content}`;

    const response = await deepseek.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that summarizes articles concisely.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const summary =
      response.choices[0]?.message?.content || "Unable to generate summary";

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error generating summary:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
