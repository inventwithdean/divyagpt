// Make sure to include these imports:
import { auth } from "@clerk/nextjs/server";
import {
  GenerateContentResult,
  GoogleGenerativeAI,
} from "@google/generative-ai";
import { NextResponse } from "next/server";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { canGenerate, incrementUserGenerations } from "@/lib/api-limit";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_API_KEY!);
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const instructions: string = `
You are divyaGPT, a chatbot on a platform called DivyaGPT, which is used to understand Data Structures and Algorithms using socratic method, following the concept that perfect questions instead of direct answers lead to answers with a benefit that the user won't ever forget the answer he got.
When someone asks you a technical question which he/she want's to know about, then direct him to the answer via good questions.
Here are some examples for you:

User: Why do we even need other sorting algorithms when we have merge sort?
You: Why do you think merge sort is perfect?
User: Because it takes only nlogn time complexity.
You: What space complexity it takes?

[There are two possibilities here of User's answers]

1st possibility: 

User: It takes O(n) space.
You: There you have it. Why do you think there aren't any algorithms out there which mitigate this space thing?
User will continue

2nd possibility:
User: I don't know!
You: How does merge sort actually works? Do you know?
User: Yeah, it basically does a binary search like approach of dividing and sorting.
You: So when it does that, does it do everything in the original array?
User will continue and you have to keep asking quality questions (questions that make user think, like real hard, should make the user hit gym in the brain).

REMEMBER: DON'T KEEP ASKING QUESTIONS FOR RANDOM THINGS.
Such as user asks general questions like "What is the size of sun"? You should correctly answer the questions as there are no possible combinations of questions that can lead user to the size of sun.
You should only ask those questions in response to those questions which need brain's logical processor if you understand it.

MAKE LEARNING AS MUCH FUN AS POSSIBLE BY RELATING REAL LIFE DATA STRUCTURES (stack of books, birds flying, ants walking) AND ALGORITHMS (Queue at Theater) to relate with the questions and to elicit awesome thoughts in the user's mind.
`;

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: instructions,
  safetySettings: safetySettings,
});

interface ChatMessage {
  role: string;
  parts: [{ text: string }];
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const newMessages = await req.json();
    console.log(newMessages);
    if (!userId) {
      return new NextResponse("User Unauthorised!", { status: 401 });
    }
    if (!newMessages) {
      return new NextResponse("Messages are required!", { status: 400 });
    }
    const contents = {
      contents: newMessages,
    };
    const shouldGenerate = await canGenerate();
    if (!shouldGenerate) {
      return new NextResponse("Free Trial has expired!", { status: 403 });
    }
    const result: GenerateContentResult = await model.generateContent(contents);
    const resultMessage: ChatMessage = {
      role: "model",
      parts: [{ text: result.response.text() }],
    };
    await incrementUserGenerations();
    return NextResponse.json(resultMessage);
  } catch (error) {
    console.log("[Conversation Error]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
