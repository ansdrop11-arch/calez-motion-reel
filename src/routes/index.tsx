import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import reel from "@/assets/reel.mp4.asset.json";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "calez — Motion Designer | Reels & Projects" },
      { name: "description", content: "Showreel, selected motion design projects and collaboration inquiries for calez." },
      { property: "og:title", content: "calez — Motion Designer" },
      { property: "og:description", content: "Showreel, selected projects and collaboration inquiries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const projects = [
  { img: p1, title: "Liquid Chrome", client: "Nova Audio", year: "2026", tags: "3D · Product launch", desc: "A 30s launch film for a flagship headphone, built from simulated chrome fluids." },
  { img: p2, title: "Loud Type", client: "Pulse Festival", year: "2025", tags: "Kinetic type · Identity", desc: "Festival identity system with 40+ animated typographic assets for stage and social." },
  { img: p3, title: "Bubble Logic", client: "Fizz Labs", year: "2025", tags: "Simulation · Social", desc: "Iridescent particle loops for a beverage campaign across 12 markets." },
];

const reels = [
  { label: "Showreel 2026", src: reel.url, poster: p1 },
  { label: "Type Reel", src: reel.url, poster: p2 },
];

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  company: z.string().trim().max(120).optional(),
  project_type: z.string().min(1).max(60),
  budget: z.string().max(60).optional(),
  message: z.string().trim().min(1, "Tell me about your project").max(2000),
});

function Index() {
  return (
    <main className="min-h-screen bg-background font-sans text-foreground">
      <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between border-b border-border bg-background/70 px-6 py-4 backdrop-blur">
        <a href="#top" className="font-display text-lg font-extrabold">calez<span className="text-primary">.</span></a>
        <nav className="flex gap-6 text-sm text-muted-foreground">
          <a href="#reels" className="hover:text-foreground">Reels</a>
          <a href="#work" className="hover:text-foreground">Work</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </nav>
      </header>

      <section id="top" className="relative flex min-h-screen items-end overflow-hidden px-6 pb-16 pt-32">
        <video src={reel.url} poster={p1} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="relative max-w-6xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-primary">Motion designer · 3D · Type</p>
          <h1 className="font-display text-6xl font-extrabold leading-[0.9] md:text-9xl">
            Things that <span className="text-outline">move</span> people.
          </h1>
          <a href="#contact" className="mt-10 inline-block rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground transition hover:scale-105">
            Start a collaboration →
          </a>
        </div>
      </section>

      <div className="overflow-hidden border-y border-border bg-primary py-4 text-primary-foreground">
        <div className="marquee flex w-max gap-12 font-display text-2xl font-extrabold uppercase">
          {Array.from({ length: 2 }).flatMap((_, i) =>
            ["Brand films", "Product launches", "Kinetic type", "Title sequences", "3D loops", "Social"].map((t) => (
              <span key={t + i}>{t} ✦</span>
            )),
          )}
        </div>
      </div>

      <section id="reels" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="mb-10 font-display text-4xl font-extrabold">Reels</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {reels.map((r) => (
            <figure key={r.label} className="overflow-hidden rounded-lg border border-border bg-card">
              <video src={r.src} poster={r.poster} controls preload="none" playsInline className="aspect-video w-full object-cover" />
              <figcaption className="flex justify-between px-4 py-3 text-sm">
                <span>{r.label}</span><span className="text-muted-foreground">0:06</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="work" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="mb-10 font-display text-4xl font-extrabold">Selected work</h2>
        <div className="space-y-20">
          {projects.map((p, i) => (
            <article key={p.title} className={`grid items-center gap-8 md:grid-cols-5 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className="group overflow-hidden rounded-lg md:col-span-3">
                <img src={p.img} alt={p.title} loading="lazy" width={1280} height={720} className="w-full transition duration-700 group-hover:scale-105" />
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-primary">{p.tags}</p>
                <h3 className="mt-2 font-display text-3xl font-extrabold">{p.title}</h3>
                <p className="mt-1 text-muted-foreground">{p.client} · {p.year}</p>
                <p className="mt-4 leading-relaxed">{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="border-t border-border px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-5xl font-extrabold leading-tight">Let's make something <span className="text-primary">move.</span></h2>
            <p className="mt-6 max-w-sm text-muted-foreground">Tell me about your brand film, launch, or identity project. I'll get back to you personally.</p>
          </div>
          <InquiryForm />
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted-foreground">© 2026 calez</footer>
    </main>
  );
}

const field = "w-full rounded-md border border-input bg-card px-4 py-3 outline-none focus:border-primary";

function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = schema.safeParse(fd);
    if (!parsed.success) return setError(parsed.error.issues[0]?.message ?? "Please check the form");
    setError(null);
    setStatus("sending");
    const { error: dbErr } = await supabase.from("collaboration_inquiries").insert({
      ...parsed.data,
      company: parsed.data.company || null,
      budget: parsed.data.budget || null,
    });
    if (dbErr) {
      setStatus("idle");
      return setError("Something went wrong. Please try again.");
    }
    setStatus("done");
  }

  if (status === "done")
    return (
      <div className="flex items-center rounded-lg border border-primary p-10">
        <p className="font-display text-2xl font-extrabold">Thanks — your inquiry is in. Talk soon.</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" placeholder="Name" maxLength={100} className={field} />
        <input name="email" type="email" placeholder="Email" maxLength={255} className={field} />
      </div>
      <input name="company" placeholder="Company / brand (optional)" maxLength={120} className={field} />
      <div className="grid gap-4 sm:grid-cols-2">
        <select name="project_type" className={field} defaultValue="Brand film">
          {["Brand film", "Product launch", "Title sequence", "Social content", "Other"].map((o) => <option key={o}>{o}</option>)}
        </select>
        <select name="budget" className={field} defaultValue="">
          <option value="">Budget (optional)</option>
          {["< $5k", "$5k – $15k", "$15k – $40k", "$40k+"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
      <textarea name="message" rows={5} placeholder="Project details, timeline…" maxLength={2000} className={field} />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <button disabled={status === "sending"} className="w-full rounded-full bg-primary py-4 font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50">
        {status === "sending" ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
