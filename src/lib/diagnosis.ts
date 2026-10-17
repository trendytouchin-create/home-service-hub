import { z } from "zod";

export const diagnosisSchema = z.object({
  service: z.enum(["AC Repair", "Plumbing", "Electrical", "Not sure"]),
  urgency: z.enum(["Emergency", "Soon", "Routine"]),
  likelyIssue: z.string(),
  safetyTip: z.string(),
  bookingSummary: z.string(),
});
export type Diagnosis = z.infer<typeof diagnosisSchema>;
