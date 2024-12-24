import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { title, role } = await request.json();

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Create 3 line blog post with html tags based on this title: ${title}`,
        },
        {
          role: "system",
          content: `${
            role || "I am a helpful assistant"
          }. Write with html tags.`,
        },
      ],
    });

    return NextResponse.json(
      {
        content: aiResponse.choices[0].message.content,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Request error:", error);
    return NextResponse.json({ error: "Error updating post" }, { status: 500 });
  }
}
