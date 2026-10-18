import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import reel from "@/assets/reel.mp4.asset.json";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import secMotion from "@/assets/sec-motion.jpg";
import secShorts from "@/assets/sec-shorts.jpg";
import secMusic from "@/assets/sec-music.jpg";
import secSongs from "@/assets/sec-songs.jpg";

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

type ShowcaseItem = { title: string; meta: string; poster: string };
type ShowcaseSection = {
  id: string;
  title: string;
  note: string;
  ratio: "16x9" | "9x16";
  items: ShowcaseItem[];
};

const showcases: ShowcaseSection[] = [
  {
    id: "motion",
    title: "Motion Design",
    note: "Landscape films and loops — brand, product and identity work.",
    ratio: "16x9",
    items: [
      { title: "Chrome Bloom", meta: "Nova Audio · 0:24", poster: secMotion },
      { title: "Phase Shift", meta: "Kestrel Labs · 0:18", poster: p1 },
      { title: "Neon Drift", meta: "Pulse Festival · 0:30", poster: secMusic },
      { title: "Soft Machines", meta: "Fizz Labs · 0:12", poster: p3 },
    ],
  },
  {
    id: "shorts",
    title: "Shorts",
    note: "Vertical cuts built for the feed — first-frame hooks, no sound needed.",
    ratio: "9x16",
    items: [
      { title: "Drop Theory", meta: "0:15", poster: secShorts },
      { title: "Hot Take", meta: "0:09", poster: secSongs },
      { title: "Loop Research 04", meta: "0:12", poster: p2 },
      { title: "Scroll Stop", meta: "0:20", poster: secShorts },
      { title: "Type Rush", meta: "0:11", poster: p1 },
      { title: "Night Mode", meta: "0:14", poster: p3 },
    ],
  },
  {
    id: "music",
    title: "Music Videos",
    note: "Full-length films and performance edits for artists and labels.",
    ratio: "16x9",
    items: [
      { title: "Halo — Official Video", meta: "Sable · 3:12", poster: secMusic },
      { title: "Undertow", meta: "Kite String · 2:48", poster: secMotion },
      { title: "Static Bloom", meta: "Marlo Vane · 3:40", poster: p2 },
    ],
  },
  {
    id: "songs",
    title: "Song Snippets",
    note: "Hook-length vertical teasers — lyric, visualiser and countdown cuts.",
    ratio: "9x16",
    items: [
      { title: "Halo — hook", meta: "0:14", poster: secSongs },
      { title: "Undertow — bridge", meta: "0:19", poster: secShorts },
      { title: "Static Bloom — chorus", meta: "0:16", poster: secSongs },
      { title: "Paper Sun — verse", meta: "0:21", poster: p2 },
      { title: "Lowlight — outro", meta: "0:13", poster: secShorts },
    ],
  },
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
        <nav className="no-scrollbar flex max-w-[72vw] gap-5 overflow-x-auto text-sm text-muted-foreground">
          <a href="#reels" className="hover:text-foreground">Reels</a>
          <a href="#motion" className="hover:text-foreground">Motion</a>
          <a href="#shorts" className="hover:text-foreground">Shorts</a>
          <a href="#music" className="hover:text-foreground">Music</a>
          <a href="#songs" className="hover:text-foreground">Songs</a>
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

      {showcases.map((s) => (
        <Showcase key={s.id} s={s} />
      ))}

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

function Showcase({ s }: { s: ShowcaseSection }) {
  const wide = s.ratio === "16x9";
  return (
    <section id={s.id} className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">{wide ? "16:9" : "9:16"}</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold">{s.title}</h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">{s.note}</p>
        </div>

        {wide ? (
          <div className="grid gap-6 md:grid-cols-2">
            {s.items.map((it) => (
              <figure key={it.title} className="overflow-hidden rounded-lg border border-border bg-card">
                <video
                  src={reel.url}
                  poster={it.poster}
                  controls
                  preload="none"
                  playsInline
                  className="aspect-video w-full bg-black object-cover"
                />
                <figcaption className="flex items-baseline justify-between gap-4 px-4 py-3 text-sm">
                  <span className="font-medium">{it.title}</span>
                  <span className="shrink-0 text-muted-foreground">{it.meta}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <ul className="no-scrollbar -mx-6 flex snap-x gap-4 overflow-x-auto px-6 pb-2">
            {s.items.map((it) => (
              <li key={it.title} className="w-[200px] shrink-0 snap-start sm:w-[240px]">
                <figure className="overflow-hidden rounded-lg border border-border bg-card">
                  <video
                    src={reel.url}
                    poster={it.poster}
                    controls
                    preload="none"
                    playsInline
                    className="aspect-[9/16] w-full bg-black object-cover"
                  />
                  <figcaption className="px-4 py-3 text-sm">
                    <span className="block font-medium">{it.title}</span>
                    <span className="text-muted-foreground">{it.meta}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
