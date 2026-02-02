import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const deepseek = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { content, targetLocale } = await request.json();

    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { error: "DeepSeek API key not configured" },
        { status: 500 }
      );
    }

    const targetLanguage = targetLocale === "zh" ? "简体中文" : "English";
    const sourceLanguage = targetLocale === "zh" ? "English" : "简体中文";
    
    const systemPrompt = targetLocale === "zh"
      ? "你是一位专业的技术文档翻译专家。请将内容准确翻译成简体中文，保持 Markdown 格式不变，保留代码块原样。翻译要准确、流畅、符合中文表达习惯。"
      : "You are a professional technical document translator. Please translate the content accurately into English, maintain all Markdown formatting, and keep code blocks unchanged. The translation should be accurate, fluent, and natural.";
    
    const userPrompt = targetLocale === "zh"
      ? `请将以下 Markdown 内容从英文翻译成简体中文，保持所有格式和代码块不变：\n\n${content}`
      : `Please translate the following Markdown content from Chinese to English, maintaining all formatting and code blocks:\n\n${content}`;

    const response = await deepseek.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.3,
    });

    const translation =
      response.choices[0]?.message?.content || "Unable to translate";

    return NextResponse.json({ translation });
  } catch (error) {
    console.error("Error translating:", error);
    return NextResponse.json(
      { error: "Failed to translate content" },
      { status: 500 }
    );
  }
}
