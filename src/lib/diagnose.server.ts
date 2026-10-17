import { createOpenAI } from "@ai-sdk/openai";
import { Output, streamText } from "ai";
import { diagnosisSchema, type Diagnosis } from "./diagnosis";

const INSTRUCTIONS = `You are a dispatcher for FixHome, a home services company offering only AC Repair, Plumbing and Electrical.
Given a homeowner's problem description, pick the best service (use "Not sure" only if none fit), set urgency
(Emergency = safety risk like sparks, burning smell, flooding, gas; Soon = affects daily use; Routine = maintenance).
likelyIssue: one short sentence on the probable cause. safetyTip: one short practical sentence for until the technician arrives.
bookingSummary: a concise 2-3 sentence note written for the technician summarising the problem, symptoms and anything to bring.
Never give prices. Keep everything plain and friendly.`;

export async function diagnose(problem: string): Promise<Diagnosis> {
  const apiKey = process.env['LOVABLE_API_KEY'];
  if (!apiKey) throw new Error("AI is not configured.");
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    instructions: INSTRUCTIONS,
    messages: [{ role: "user", content: problem }],
    output: Output.object({ schema: diagnosisSchema }),
    maxRetries: 0,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });
  return await result.output;
}
