import {
  ArrowRight,
  Bell,
  Gauge,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const notifyUrl = "mailto:hello@scanyourmeal.app?subject=Notify%20Me%20When%20ScanYourMeal%20Launches";
const contactUrl = "mailto:hello@scanyourmeal.app";

const launchPillars = [
  {
    icon: Layers3,
    title: "Product Surface",
    description: "A cleaner, faster interface with stronger decision support.",
  },
  {
    icon: Gauge,
    title: "Performance Layer",
    description: "Sharper scan reliability and more consistent nutrition signals.",
  },
  {
    icon: ShieldCheck,
    title: "Trust Layer",
    description: "Higher confidence outputs with transparent quality markers.",
  },
];

export default function Home() {
  return (
    <main className="mono-site-bg relative min-h-screen overflow-hidden text-white">
      <div className="mono-vignette pointer-events-none absolute inset-0 -z-20" />
      <div className="mono-grid pointer-events-none absolute inset-0 -z-10 opacity-60" />

      <section className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-14 px-6 py-14 md:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-zinc-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">
            <Sparkles className="h-4 w-4 text-zinc-400" />
            ScanYourMeal
          </div>

          <h1 className="mt-6 font-heading text-5xl font-bold tracking-tight text-white md:text-7xl">Coming Soon</h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300 md:text-xl">
            A premium new ScanYourMeal experience is in the works. We are rebuilding the product surface with a sharper,
            professional-grade design and faster nutrition intelligence.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={notifyUrl}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-black transition-transform hover:-translate-y-0.5"
            >
              <Bell className="h-4 w-4" />
              Notify Me
            </a>
            <a
              href={contactUrl}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/25 bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-900"
            >
              Contact Team <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 space-y-3">
            {launchPillars.map((pillar) => (
              <article key={pillar.title} className="rounded-2xl border border-white/12 bg-zinc-950/70 p-4">
                <div className="flex items-start gap-3">
                  <pillar.icon className="mt-0.5 h-5 w-5 shrink-0 text-zinc-300" />
                  <div>
                    <h2 className="text-sm font-semibold text-white">{pillar.title}</h2>
                    <p className="mt-1 text-sm text-zinc-400">{pillar.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mono-coming-stage relative mx-auto h-[520px] w-full max-w-[760px]">
          <div className="mono-floating-badge mono-floating-badge-a absolute left-2 top-10 z-20 hidden rounded-xl border border-white/20 bg-black/90 px-4 py-2 text-xs font-semibold text-zinc-200 shadow-[0_22px_40px_rgba(0,0,0,0.6)] md:block">
            Interface Rebuild
          </div>

          <div className="mono-floating-badge mono-floating-badge-b absolute bottom-14 right-0 z-20 hidden rounded-xl border border-white/20 bg-black/90 px-4 py-2 text-xs font-semibold text-zinc-200 shadow-[0_22px_40px_rgba(0,0,0,0.6)] md:block">
            Launching Soon
          </div>

          <div className="mono-plane mono-plane-back" />
          <div className="mono-plane mono-plane-mid" />

          <section className="mono-coming-card relative overflow-hidden rounded-[2rem] border border-white/15 bg-black p-5 md:p-6">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(255,255,255,0.09),transparent_40%),radial-gradient(circle_at_86%_78%,rgba(255,255,255,0.06),transparent_46%)]" />

            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">Preview</p>
                  <h2 className="text-lg font-bold text-white">Next Release Console</h2>
                </div>
                <span className="rounded-full border border-white/20 bg-zinc-950 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-200">
                  Private Build
                </span>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <article className="rounded-xl border border-white/10 bg-zinc-950 p-4">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-zinc-500">Architecture</p>
                  <p className="mt-2 text-sm font-semibold text-white">Dashboard-first product surface</p>
                </article>
                <article className="rounded-xl border border-white/10 bg-zinc-950 p-4">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-zinc-500">Status</p>
                  <p className="mt-2 text-sm font-semibold text-white">Final polish and rollout prep</p>
                </article>
              </div>

              <article className="mt-3 rounded-xl border border-white/10 bg-zinc-950 p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-zinc-500">Launch Modules</p>

                <div className="mt-3 space-y-3">
                  <div>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-zinc-300">Scanning Experience</span>
                      <span className="text-zinc-500">In progress</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-800">
                      <div className="h-full w-[82%] rounded-full bg-white" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-zinc-300">Nutrition Engine</span>
                      <span className="text-zinc-500">Calibrating</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-800">
                      <div className="h-full w-[76%] rounded-full bg-zinc-300" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-zinc-300">Dashboard UI</span>
                      <span className="text-zinc-500">Reviewing</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-800">
                      <div className="h-full w-[91%] rounded-full bg-zinc-100" />
                    </div>
                  </div>
                </div>
              </article>

              <article className="mt-3 rounded-xl border border-white/10 bg-zinc-950 p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-zinc-500">Release Note</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  This is a temporary holding page while we complete the final 3D dashboard and platform rollout.
                </p>
              </article>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
