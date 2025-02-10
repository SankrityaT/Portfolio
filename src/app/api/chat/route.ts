import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { RESUME_CONTEXT, AI_SYSTEM_PROMPT } from '@/config/resume-context';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received request body:', JSON.stringify(body, null, 2));

    // Check if body has messages property
    if (!body.messages) {
      console.error('No messages property in request body:', body);
      return NextResponse.json(
        { error: 'Request must include messages array' },
        { status: 400 }
      );
    }

    const { messages } = body;

    // Ensure messages is an array
    if (!Array.isArray(messages)) {
      console.error('Messages is not an array:', messages);
      return NextResponse.json(
        { error: 'Messages must be an array' },
        { status: 400 }
      );
    }

    // Validate message format
    const isValidMessage = (msg: any) => 
      msg && 
      typeof msg === 'object' && 
      (msg.role === 'user' || msg.role === 'assistant') && 
      typeof msg.content === 'string';

    if (!messages.every(isValidMessage)) {
      console.error('Invalid message format in array:', messages);
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      );
    }

    // Log the messages array
    console.log('Processing messages:', JSON.stringify(messages, null, 2));

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: AI_SYSTEM_PROMPT
        },
        {
          role: "system",
          content: `Here's the detailed information about Sankritya: ${RESUME_CONTEXT}`
        },
        ...messages
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 1,
      stream: false,
    });

    console.log('API Response:', JSON.stringify(completion.choices[0].message, null, 2));
    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error('Error details:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process your request' },
      { status: 500 }
    );
  }
}
