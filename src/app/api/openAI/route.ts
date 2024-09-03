import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });
    return NextResponse.json(response?.choices[0]?.message);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
