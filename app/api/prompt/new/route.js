import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export  const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();
console.log(userId, prompt, tag);
  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (err) {
    return new Response("failed to create a new route", { status: 500 });
  }
};
