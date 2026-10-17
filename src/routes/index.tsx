import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Phone, Menu, X, Snowflake, Droplets, Zap, ChevronDown, Clock, ShieldCheck,
  BadgeIndianRupee, ThumbsUp, MapPin, Navigation, Star, Facebook, Instagram,
  Twitter, Youtube, CheckCircle2, ArrowRight,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import baAc from "@/assets/ba-ac.jpg";
import baPlumbing from "@/assets/ba-plumbing.jpg";
import baElectrical from "@/assets/ba-electrical.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FixHome — AC Repair, Plumbing & Electrical at Your Doorstep" },
      { name: "description", content: "Fast, certified AC repair, plumbing and electrical services. 24/7 availability, upfront pricing. Book in 60 seconds." },
      { property: "og:title", content: "FixHome — Reliable Home Services at Your Doorstep" },
      { property: "og:description", content: "Certified AC, plumbing and electrical experts. 24/7, upfront pricing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PHONE = "+919876543210";
const PHONE_LABEL = "+91 98765 43210";
const MAPS = "https://www.google.com/maps/search/?api=1&query=Home+Services+Mumbai";

const NAV = [
  ["Services", "#services"], ["Why Us", "#why"], ["Areas", "#areas"],
  ["Our Work", "#work"], ["FAQ", "#faq"], ["Contact", "#contact"],
] as const;

const SERVICES = [
  { icon: Snowflake, title: "AC Repair", price: "₹399", short: "Servicing, gas refill, installation & repair for all brands.", more: "Split, window and cassette ACs. Deep jet-wash cleaning, gas top-up with leak test, PCB repair, installation and uninstallation. 30-day service warranty." },
  { icon: Droplets, title: "Plumbing", price: "₹199", short: "Leaks, blockages, taps, tanks & fittings fixed fast.", more: "Tap and mixer replacement, drain unclogging, toilet repair, water tank cleaning, pipeline leakage and full bathroom fitting. Genuine parts only." },
  { icon: Zap, title: "Electrical", price: "₹149", short: "Wiring, switches, fans, lights & safety checks.", more: "Fan and light installation, MCB and DB repair, inverter setup, full-home rewiring and earthing safety audits by licensed electricians." },
];

const WHY = [
  { icon: Clock, title: "24/7 Available", text: "Emergency help any hour" },
  { icon: ShieldCheck, title: "Certified Experts", text: "Verified & trained pros" },
  { icon: BadgeIndianRupee, title: "Upfront Pricing", text: "No hidden charges" },
  { icon: ThumbsUp, title: "Service Warranty", text: "30-day guarantee" },
];

const AREAS: Record<string, string[]> = {
  "Mumbai West": ["Andheri", "Bandra", "Juhu", "Goregaon", "Malad"],
  "Mumbai Central": ["Dadar", "Worli", "Parel", "Lower Parel"],
  "Thane & Navi Mumbai": ["Thane West", "Vashi", "Nerul", "Kharghar"],
};

const WORK = [
  { img: baAc, title: "AC deep cleaning", tag: "AC Repair" },
  { img: baPlumbing, title: "Sink pipe replacement", tag: "Plumbing" },
  { img: baElectrical, title: "Panel rewiring", tag: "Electrical" },
];

const FAQS = [
  ["How fast can a technician arrive?", "Usually within 60–90 minutes in our service areas. Emergency calls are prioritised 24/7."],
  ["Are your prices fixed?", "Yes. You get an upfront quote before any work starts. Spare parts are billed at MRP."],
  ["Do you offer a warranty?", "Every job comes with a 30-day service warranty. If the issue returns, we fix it free."],
  ["How do I pay?", "Pay after the job via UPI, card or cash. You receive a digital invoice instantly."],
  ["Are technicians verified?", "All professionals are background-checked, certified and trained in-house."],
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

function Index() {
  useReveal();
  const [menu, setMenu] = useState(false);
  useEffect(() => { document.body.style.overflow = menu ? "hidden" : ""; }, [menu]);

  return (
    <div className="min-h-screen pb-24 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <a href="#top" className="flex min-w-0 items-center gap-2 tap">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"><Zap className="h-5 w-5" /></span>
            <span className="truncate font-display text-lg font-extrabold">FixHome</span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map(([l, h]) => (
              <a key={h} href={h} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">{l}</a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <a href={`tel:${PHONE}`} aria-label="Call us" className="tap inline-flex h-11 items-center gap-2 rounded-full bg-accent px-4 text-sm font-bold text-accent-foreground">
              <Phone className="h-4 w-4" /><span className="hidden sm:inline">{PHONE_LABEL}</span><span className="sm:hidden">Call</span>
            </a>
            <button onClick={() => setMenu(true)} aria-label="Open menu" className="tap grid h-11 w-11 place-items-center rounded-full bg-muted md:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-50 md:hidden ${menu ? "" : "pointer-events-none"}`} aria-hidden={!menu}>
        <div onClick={() => setMenu(false)} className={`absolute inset-0 bg-ink/50 transition-opacity ${menu ? "opacity-100" : "opacity-0"}`} />
        <div className={`absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col bg-background p-5 shadow-soft transition-transform duration-300 ${menu ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-extrabold">Menu</span>
            <button onClick={() => setMenu(false)} aria-label="Close menu" className="tap grid h-11 w-11 place-items-center rounded-full bg-muted"><X className="h-5 w-5" /></button>
          </div>
          <nav className="mt-6 flex flex-col gap-1">
            {NAV.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setMenu(false)} className="tap flex min-h-14 items-center justify-between rounded-xl px-4 text-lg font-semibold active:bg-muted">
                {l}<ArrowRight className="h-5 w-5 text-muted-foreground" />
              </a>
            ))}
          </nav>
          <a href="#contact" onClick={() => setMenu(false)} className="tap mt-auto flex h-14 items-center justify-center rounded-2xl bg-primary font-bold text-primary-foreground shadow-cta">Book Now</a>
        </div>
      </div>

      <main id="top">
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <img src={hero} alt="Technician repairing an air conditioner" width={1024} height={1280} fetchPriority="high" decoding="async" className="absolute inset-0 -z-10 h-full w-full object-cover object-top" />
          <div className="absolute inset-0 -z-10 bg-hero-overlay" />
          <div className="mx-auto flex min-h-[86svh] max-w-3xl flex-col items-center justify-end px-5 pb-10 pt-24 text-center text-ink-foreground md:min-h-[80vh] md:justify-center">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-background/15 px-3 py-1.5 text-xs font-semibold backdrop-blur">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" /> 4.9 rated · 12,000+ homes served
            </span>
            <h1 className="text-[2.1rem] font-extrabold leading-[1.1] sm:text-5xl md:text-6xl">Reliable Home Services at Your Doorstep</h1>
            <p className="mt-4 max-w-md text-base opacity-90 sm:text-lg">AC repair, plumbing & electrical — certified pros in 60 minutes.</p>
            <div className="mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <a href="#contact" className="tap flex h-16 flex-1 items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-cta">Book Now <ArrowRight className="h-5 w-5" /></a>
              <a href={`tel:${PHONE}`} className="tap flex h-16 flex-1 items-center justify-center gap-2 rounded-2xl bg-background/15 text-lg font-semibold backdrop-blur"><Phone className="h-5 w-5" /> Call Now</a>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-6xl py-14">
          <Heading kicker="What we do" title="Our Services" />
          <div className="no-scrollbar snap-row mt-6 flex gap-4 overflow-x-auto px-5 pb-4 md:grid md:grid-cols-3 md:overflow-visible">
            {SERVICES.map((s) => <ServiceCard key={s.title} {...s} />)}
          </div>
          <p className="px-5 text-center text-xs text-muted-foreground md:hidden">Swipe to see more →</p>
        </section>

        {/* Why */}
        <section id="why" className="bg-ink py-14 text-ink-foreground">
          <div className="mx-auto max-w-6xl px-5">
            <Heading kicker="Why choose us" title="Trusted by thousands" invert />
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {WHY.map(({ icon: I, title, text }) => (
                <div key={title} className="reveal rounded-2xl bg-background/5 p-4 ring-1 ring-background/10">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground"><I className="h-6 w-6" /></span>
                  <h3 className="mt-3 text-base font-bold">{title}</h3>
                  <p className="mt-1 text-sm opacity-70">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas */}
        <section id="areas" className="mx-auto max-w-3xl px-5 py-14">
          <Heading kicker="Where we work" title="Service Areas" />
          <Areas />
          <a href={MAPS} target="_blank" rel="noopener noreferrer" className="tap mt-5 flex h-14 items-center justify-center gap-2 rounded-2xl border-2 border-primary font-bold text-primary">
            <Navigation className="h-5 w-5" /> Open in Google Maps
          </a>
        </section>

        {/* Work */}
        <section id="work" className="mx-auto max-w-6xl py-14">
          <Heading kicker="Proof of work" title="Before & After" />
          <Gallery />
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-xl px-5 py-14">
          <Heading kicker="Book a visit" title="Get a Free Quote" />
          <ContactForm />
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-5 py-14">
          <Heading kicker="Questions" title="FAQ" />
          <Faq />
        </section>
      </main>

      <Footer />

      {/* Sticky bottom bar (mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 p-3 backdrop-blur-md md:hidden" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
        <div className="flex gap-3">
          <a href={`tel:${PHONE}`} className="tap flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-accent font-bold text-accent-foreground"><Phone className="h-5 w-5" /> Tap to Call</a>
          <a href="#contact" className="tap flex h-14 flex-1 items-center justify-center rounded-2xl bg-primary font-bold text-primary-foreground shadow-cta">Book Now</a>
        </div>
      </div>
    </div>
  );
}

function Heading({ kicker, title, invert }: { kicker: string; title: string; invert?: boolean }) {
  return (
    <div className="reveal px-5 text-center md:px-0">
      <p className={`text-xs font-bold uppercase tracking-widest ${invert ? "text-accent" : "text-primary"}`}>{kicker}</p>
      <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">{title}</h2>
    </div>
  );
}

function ServiceCard({ icon: I, title, price, short, more }: (typeof SERVICES)[number]) {
  const [open, setOpen] = useState(false);
  return (
    <article className="w-[82%] shrink-0 snap-center rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border md:w-auto">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-secondary text-primary"><I className="h-8 w-8" /></span>
      <div className="mt-4 flex items-baseline justify-between gap-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <span className="text-sm text-muted-foreground">from <b className="text-foreground">{price}</b></span>
      </div>
      <p className="mt-2 text-muted-foreground">{short}</p>
      <div className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <p className="overflow-hidden text-sm text-muted-foreground"><span className="block pt-2">{more}</span></p>
      </div>
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="tap mt-3 inline-flex min-h-11 items-center gap-1 font-semibold text-primary">
        {open ? "Show less" : "Read more"} <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <a href="#contact" className="tap mt-2 flex h-12 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground">Book {title}</a>
    </article>
  );
}

function Areas() {
  const [open, setOpen] = useState<string | null>(Object.keys(AREAS)[0]);
  return (
    <div className="mt-6 divide-y overflow-hidden rounded-2xl bg-card ring-1 ring-border">
      {Object.entries(AREAS).map(([zone, list]) => {
        const o = open === zone;
        return (
          <div key={zone}>
            <button onClick={() => setOpen(o ? null : zone)} aria-expanded={o} className="tap flex min-h-14 w-full items-center gap-3 px-4 text-left font-semibold active:bg-muted">
              <MapPin className="h-5 w-5 shrink-0 text-primary" /><span className="flex-1">{zone}</span>
              <ChevronDown className={`h-5 w-5 transition-transform ${o ? "rotate-180" : ""}`} />
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ${o ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <div className="flex flex-wrap gap-2 px-4 pb-4">
                  {list.map((a) => <span key={a} className="rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground">{a}</span>)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const onScroll = () => {
    const el = ref.current; if (!el) return;
    setIdx(Math.round(el.scrollLeft / el.clientWidth));
  };
  const go = (i: number) => ref.current?.scrollTo({ left: i * ref.current.clientWidth, behavior: "smooth" });
  return (
    <div className="mt-6">
      <div ref={ref} onScroll={onScroll} className="no-scrollbar snap-row flex overflow-x-auto">
        {WORK.map((w) => (
          <figure key={w.title} className="w-full shrink-0 snap-center px-5">
            <div className="relative overflow-hidden rounded-3xl shadow-soft">
              <img src={w.img} alt={`Before and after: ${w.title}`} loading="lazy" decoding="async" width={1024} height={768} className="aspect-[4/3] w-full object-cover" />
              <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-bold">{w.tag}</span>
            </div>
            <figcaption className="mt-3 text-center font-semibold">{w.title}</figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-1">
        {WORK.map((w, i) => (
          <button key={w.title} onClick={() => go(i)} aria-label={`Show ${w.title}`} className="tap grid h-11 w-11 place-items-center">
            <span className={`block h-2.5 rounded-full transition-all ${i === idx ? "w-7 bg-primary" : "w-2.5 bg-border"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  if (sent) return (
    <div className="mt-6 rounded-3xl bg-card p-8 text-center shadow-soft ring-1 ring-border">
      <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
      <h3 className="mt-3 text-xl font-bold">Request received!</h3>
      <p className="mt-1 text-muted-foreground">We'll call you back within 10 minutes.</p>
    </div>
  );
  const input = "h-14 w-full rounded-2xl border-2 border-input bg-card px-4 text-base outline-none transition-colors focus:border-primary";
  return (
    <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm font-semibold">Full name
        <input required name="name" autoComplete="name" placeholder="Your name" className={input} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-semibold">Phone number
        <input required name="phone" type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9+\s-]{10,15}" placeholder="98765 43210" className={input} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-semibold">Service needed
        <select required name="service" defaultValue="" className={input}>
          <option value="" disabled>Choose a service</option>
          {SERVICES.map((s) => <option key={s.title}>{s.title}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-semibold">Pincode
        <input name="pincode" type="text" inputMode="numeric" autoComplete="postal-code" maxLength={6} placeholder="400001" className={input} />
      </label>
      <button type="submit" className="tap mt-2 h-16 rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-cta">Request Callback</button>
    </form>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mt-6 flex flex-col gap-3">
      {FAQS.map(([q, a], i) => {
        const o = open === i;
        return (
          <div key={q} className="rounded-2xl bg-card ring-1 ring-border">
            <button onClick={() => setOpen(o ? null : i)} aria-expanded={o} className="tap flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left font-semibold">
              <span className="flex-1">{q}</span>
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all ${o ? "rotate-180 bg-primary text-primary-foreground" : "bg-muted"}`}><ChevronDown className="h-4 w-4" /></span>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ${o ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <p className="overflow-hidden px-4 text-muted-foreground"><span className="block pb-4">{a}</span></p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Footer() {
  const socials = [[Facebook, "Facebook"], [Instagram, "Instagram"], [Twitter, "Twitter"], [Youtube, "YouTube"]] as const;
  return (
    <footer className="bg-ink px-5 py-12 text-ink-foreground">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <span className="font-display text-2xl font-extrabold">FixHome</span>
        <nav className="grid w-full grid-cols-2 gap-1 sm:flex sm:justify-center">
          {NAV.map(([l, h]) => <a key={h} href={h} className="tap flex min-h-11 items-center justify-center rounded-lg px-3 opacity-80">{l}</a>)}
        </nav>
        <div className="flex gap-3">
          {socials.map(([I, l]) => (
            <a key={l} href="#" aria-label={l} className="tap grid h-12 w-12 place-items-center rounded-full bg-background/10"><I className="h-5 w-5" /></a>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-x-2 text-sm opacity-60">
          <a href="#" className="flex min-h-11 items-center px-2">Privacy Policy</a>
          <a href="#" className="flex min-h-11 items-center px-2">Terms</a>
          <a href="#" className="flex min-h-11 items-center px-2">Refunds</a>
        </div>
        <p className="text-xs opacity-50">© {new Date().getFullYear()} FixHome Services. All rights reserved.</p>
      </div>
    </footer>
  );
}
