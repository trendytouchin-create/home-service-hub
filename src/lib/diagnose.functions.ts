import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const diagnoseProblem = createServerFn({ method: "POST" })
  .inputValidator((input: { problem: string }) =>
    z.object({ problem: z.string().trim().min(10, "Please describe the problem in a bit more detail.").max(1500) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { diagnose } = await import("./diagnose.server");
    try {
      return { ok: true as const, result: await diagnose(data.problem) };
    } catch (err) {
      const status = (err as { statusCode?: number })?.statusCode;
      console.error("diagnose failed", status, err);
      const message =
        status === 429 ? "Our assistant is busy right now. Please try again in a minute."
        : status === 402 || status === 403 ? "The AI assistant is temporarily unavailable. Please call us instead."
        : "We couldn't analyse that right now. Please try again or call us.";
      return { ok: false as const, error: message };
    }
  });
