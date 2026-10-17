import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { CalendarDays, CheckCircle2, Clock, Phone, Wrench } from "lucide-react";
import { getBooking } from "@/lib/booking.functions";

const bookingQuery = (id: string) =>
  queryOptions({ queryKey: ["booking", id], queryFn: () => getBooking({ data: { id } }) });

export const Route = createFileRoute("/booking/$id")({
  head: () => ({
    meta: [
      { title: "Booking Confirmed — FixHome" },
      { name: "description", content: "Your FixHome technician visit is booked." },
      { property: "og:title", content: "Booking Confirmed — FixHome" },
      { property: "og:description", content: "Your FixHome technician visit is booked." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: async ({ context, params }) => {
    if (!/^[0-9a-f-]{36}$/i.test(params.id)) throw notFound();
    const b = await context.queryClient.ensureQueryData(bookingQuery(params.id));
    if (!b) throw notFound();
  },
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center px-5 text-center">
      <div><h1 className="text-2xl font-bold">Booking not found</h1>
        <Link to="/" className="tap mt-6 inline-flex h-12 items-center rounded-2xl bg-primary px-6 font-bold text-primary-foreground">Back home</Link></div>
    </div>
  ),
  component: Confirmation,
});

function Confirmation() {
  const { id } = Route.useParams();
  const { data: b } = useSuspenseQuery(bookingQuery(id));
  if (!b) return null;
  const date = new Date(b.preferred_date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const ref = b.id.slice(0, 8).toUpperCase();
  return (
    <main className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
          <h1 className="mt-4 text-3xl font-extrabold">You're booked, {b.name.split(" ")[0]}!</h1>
          <p className="mt-2 text-muted-foreground">Booking reference <b className="text-foreground">#{ref}</b></p>
        </div>
        <div className="mt-8 rounded-3xl bg-ink p-6 text-ink-foreground shadow-soft">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">Technician arrival</p>
          <div className="mt-4 flex items-center gap-3"><CalendarDays className="h-6 w-6 shrink-0 text-accent" /><span className="text-lg font-bold">{date}</span></div>
          <div className="mt-3 flex items-center gap-3"><Clock className="h-6 w-6 shrink-0 text-accent" /><span className="text-lg font-bold">{b.time_slot}</span></div>
          <div className="mt-3 flex items-center gap-3"><Wrench className="h-6 w-6 shrink-0 text-accent" /><span className="text-lg font-bold">{b.service}</span></div>
        </div>
        <p className="mt-5 text-center text-sm text-muted-foreground">Our team will call to confirm your technician before the visit.</p>
        <div className="mt-6 flex flex-col gap-3">
          <a href="tel:+919876543210" className="tap flex h-14 items-center justify-center gap-2 rounded-2xl bg-accent font-bold text-accent-foreground"><Phone className="h-5 w-5" /> Call us</a>
          <Link to="/" className="tap flex h-14 items-center justify-center rounded-2xl border-2 border-primary font-bold text-primary">Back to home</Link>
        </div>
      </div>
    </main>
  );
}
