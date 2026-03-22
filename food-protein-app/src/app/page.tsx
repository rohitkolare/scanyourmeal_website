import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain, Camera, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";

const appStoreUrl = "mailto:hello@scanyourmeal.app?subject=ScanYourMeal%20iOS%20Access";
const playStoreUrl = "mailto:hello@scanyourmeal.app?subject=ScanYourMeal%20Android%20Access";

const featureCards = [
  {
    icon: Camera,
    title: "Snap & Detect",
    description: "Point your camera and identify foods instantly with portion-aware AI recognition.",
  },
  {
    icon: Brain,
    title: "Intelligent Insights",
    description: "Get macro and micro breakdowns with context that helps you make better choices.",
  },
  {
    icon: TrendingUp,
    title: "Progress That Sticks",
    description: "Track consistency, protein goals, and calorie trends with a clean, motivating dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Built for Trust",
    description: "Reliable nutrition estimates and transparent analysis designed for daily decision-making.",
  },
];

const steps = [
  {
    title: "Capture",
    subtitle: "Take a photo of your meal",
    image: "/vision.png",
  },
  {
    title: "Analyze",
    subtitle: "AI scans ingredients and portions",
    image: "/analysis.png",
  },
  {
    title: "Act",
    subtitle: "Use clear nutrition guidance instantly",
    image: "/breakdown.png",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#161616]">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(174,196,255,0.35),transparent_40%),radial-gradient(circle_at_85%_25%,rgba(236,255,203,0.45),transparent_35%),linear-gradient(to_bottom,#ffffff,#f7f7f4_45%,#f2f3f6)]" />

      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="text-2xl font-black tracking-tight">
            Scan<span className="text-[#4e8bff]">YourMeal</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <Link href="/" className="hover:text-[#4e8bff] transition-colors">Home</Link>
            <a href="#features" className="hover:text-[#4e8bff] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#4e8bff] transition-colors">How it works</a>
            <a href="#download" className="hover:text-[#4e8bff] transition-colors">Download</a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={appStoreUrl}
              className="rounded-xl bg-[#161616] px-4 py-2 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              App Store
            </a>
            <a
              href={playStoreUrl}
              className="rounded-xl bg-[#161616] px-4 py-2 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Google Play
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-7xl gap-16 px-5 pb-20 pt-12 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-16">
        <div>
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            <div className="flex -space-x-2">
              <Image src="/gallery-1.png" alt="User meal" width={28} height={28} className="h-7 w-7 rounded-full border border-white object-cover" />
              <Image src="/gallery-2.png" alt="User meal" width={28} height={28} className="h-7 w-7 rounded-full border border-white object-cover" />
              <Image src="/gallery-3.png" alt="User meal" width={28} height={28} className="h-7 w-7 rounded-full border border-white object-cover" />
            </div>
            Loved by high-performers with 4.9 rating
          </div>

          <h1 className="text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
            Meet ScanYourMeal.
            <br />
            Track your nutrition
            <br />
            with one photo.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-black/65 md:text-2xl">
            Your premium AI nutrition companion for calorie awareness, protein goals, and smarter daily decisions.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={appStoreUrl}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#111111] px-6 py-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(17,17,17,0.25)] transition-transform hover:-translate-y-0.5"
            >
              Download on the App Store <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={playStoreUrl}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#111111] px-6 py-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(17,17,17,0.25)] transition-transform hover:-translate-y-0.5"
            >
              Get it on Google Play <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="relative mx-auto h-[530px] w-full max-w-[520px]">
          <div className="absolute right-6 top-8 h-[470px] w-[235px] rotate-[9deg] overflow-hidden rounded-[38px] border border-black/15 bg-white p-2 shadow-[0_30px_60px_rgba(0,0,0,0.22)]">
            <div className="relative h-full w-full overflow-hidden rounded-[30px]">
              <Image
                src="/analysis.png"
                alt="Nutrition analysis screen"
                width={220}
                height={450}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>

          <div className="absolute left-8 top-16 h-[470px] w-[235px] -rotate-[7deg] overflow-hidden rounded-[38px] border border-black/15 bg-white p-2 shadow-[0_30px_60px_rgba(0,0,0,0.22)]">
            <div className="relative h-full w-full overflow-hidden rounded-[30px]">
              <Image
                src="/hero.png"
                alt="Food scanner screen"
                width={220}
                height={450}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>

          <div className="absolute right-0 top-[160px] rounded-2xl border border-black/10 bg-white/90 px-4 py-2 text-sm font-semibold shadow-lg">
            <span className="text-[#2f7f4f]">Protein</span> 32g
          </div>
          <div className="absolute left-0 top-[260px] rounded-2xl border border-black/10 bg-white/90 px-4 py-2 text-sm font-semibold shadow-lg">
            <span className="text-[#4e8bff]">Calories</span> 615
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-7xl px-5 pb-8 md:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((feature) => (
            <article
              key={feature.title}
              className="rounded-3xl border border-black/8 bg-white/85 p-6 shadow-[0_16px_35px_rgba(0,0,0,0.06)] backdrop-blur-sm"
            >
              <feature.icon className="mb-4 h-6 w-6 text-[#4e8bff]" />
              <h3 className="text-xl font-bold tracking-tight">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/60">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto w-full max-w-7xl px-5 py-20 md:px-8">
        <div className="mb-10 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-black/55">
          <Sparkles className="h-4 w-4" />
          How It Works
        </div>
        <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
          Three simple steps to complete nutritional clarity.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-3xl border border-black/8 bg-white p-5 shadow-[0_18px_38px_rgba(0,0,0,0.08)]">
              <div className="mb-4 text-xs font-bold tracking-[0.25em] text-black/50">0{index + 1}</div>
              <div className="relative mb-5 aspect-[9/12] overflow-hidden rounded-2xl border border-black/10">
                <Image src={step.image} alt={step.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-black/60">{step.subtitle}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="download" className="mx-auto w-full max-w-7xl px-5 pb-24 md:px-8">
        <div className="rounded-[2rem] border border-black/10 bg-[#0f0f11] px-8 py-14 text-white shadow-[0_30px_70px_rgba(0,0,0,0.25)] md:px-14">
          <h2 className="text-4xl font-black tracking-tight md:text-6xl">Ready to scan smarter?</h2>
          <p className="mt-5 max-w-2xl text-lg text-white/70">
            Join ScanYourMeal and make high-confidence nutrition decisions in seconds.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={appStoreUrl} className="rounded-2xl bg-white px-6 py-4 text-sm font-bold text-black transition-transform hover:-translate-y-0.5">
              Download on App Store
            </a>
            <a href={playStoreUrl} className="rounded-2xl border border-white/25 bg-white/10 px-6 py-4 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">
              Get it on Google Play
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 bg-white/70">
        <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-4 px-5 py-8 text-sm text-black/60 md:flex-row md:items-center md:px-8">
          <p>© 2026 ScanYourMeal. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="mailto:hello@scanyourmeal.app" className="hover:text-black">Contact</a>
            <a href="mailto:legal@scanyourmeal.app?subject=Privacy%20Policy" className="hover:text-black">Privacy</a>
            <a href="mailto:legal@scanyourmeal.app?subject=Terms%20of%20Service" className="hover:text-black">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
