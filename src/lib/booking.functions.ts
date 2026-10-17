import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { TIME_SLOTS } from "./booking";

const bookingSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(/^[0-9+\s-]{10,15}$/),
  email: z.string().trim().email().max(160),
  service: z.enum(["AC Repair", "Plumbing", "Electrical"]),
  pincode: z.string().trim().max(10).optional().default(""),
  notes: z.string().trim().max(1500).optional().default(""),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlot: z.enum(TIME_SLOTS),
});

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    const today = new Date().toISOString().slice(0, 10);
    if (data.preferredDate < today) return { ok: false as const, error: "Please pick today or a future date." };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("booking_requests")
      .insert({
        name: data.name, phone: data.phone, email: data.email, service: data.service,
        pincode: data.pincode || null, notes: data.notes || null,
        preferred_date: data.preferredDate, time_slot: data.timeSlot,
      })
      .select("id")
      .single();
    if (error || !row) {
      console.error("booking insert failed", error);
      return { ok: false as const, error: "We couldn't save your booking. Please try again or call us." };
    }
    return { ok: true as const, id: row.id };
  });

export const getBooking = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("booking_requests")
      .select("id, name, service, preferred_date, time_slot, created_at")
      .eq("id", data.id)
      .maybeSingle();
    return row;
  });
