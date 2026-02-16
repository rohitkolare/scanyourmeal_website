export default function Home() {
  const delayClasses = ["delay-1", "delay-2", "delay-3"];
  const stats = [
    { value: "2.6M+", label: "meals analyzed" },
    { value: "96.2%", label: "protein estimation accuracy" },
    { value: "4.9/5", label: "average user satisfaction" },
  ];

  const features = [
    {
      title: "AI Meal Scan",
      detail:
        "Take one photo and get a macro-aware breakdown in seconds, with protein highlighted first.",
    },
    {
      title: "Goal-First Tracking",
      detail:
        "Your daily plan adapts to your body goals and coaching style, so hitting targets feels effortless.",
    },
    {
      title: "Precision Insights",
      detail:
        "See trends by meal, day, and week with smart recommendations designed around your protein gaps.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="bg-orb bg-orb-one" />
      <div className="bg-orb bg-orb-two" />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-10 md:px-10 md:py-14">
        <header className="slide-up flex items-center justify-between rounded-full border border-white/50 bg-white/70 px-5 py-3 backdrop-blur-lg">
          <span className="font-heading text-xl font-bold tracking-tight text-slate-900">
            ScanYourMeal
          </span>
          <a className="pill" href="#cta">
            Get Early Access
          </a>
        </header>

        <section className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-7">
            <p className="slide-up chip">Protein Intelligence, Simplified</p>
            <h1 className="slide-up delay-1 font-heading text-5xl leading-[1.02] tracking-tight text-slate-950 md:text-7xl">
              Scan meals.
              <br />
              Hit protein goals.
              <br />
              Build a stronger body.
            </h1>
            <p className="slide-up delay-2 max-w-xl text-lg text-slate-700">
              The premium nutrition companion for high performers. ScanYourMeal
              turns your plate into precision data and gives you exact protein
              guidance in real time.
            </p>
            <div className="slide-up delay-3 flex flex-wrap items-center gap-4">
              <a className="btn-primary" href="#cta">
                Start Free on iOS & Android
              </a>
              <a className="btn-ghost" href="#features">
                Explore Features
              </a>
            </div>
          </div>

          <div className="slide-up delay-2 card-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Performance Snapshot
            </p>
            <div className="mt-6 grid gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-baseline justify-between border-b border-slate-200/80 pb-3"
                >
                  <span className="font-heading text-4xl font-extrabold text-slate-900">
                    {stat.value}
                  </span>
                  <span className="text-sm text-slate-600">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="features"
          className="grid gap-5 rounded-[2rem] border border-white/60 bg-white/80 p-5 shadow-[0_25px_50px_rgba(15,23,42,0.1)] backdrop-blur-xl md:grid-cols-3 md:p-8"
        >
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={`slide-up ${delayClasses[index]} rounded-3xl bg-white/75 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]`}
            >
              <h2 className="font-heading text-2xl font-bold text-slate-900">
                {feature.title}
              </h2>
              <p className="mt-3 text-slate-700">{feature.detail}</p>
            </article>
          ))}
        </section>

        <section id="cta" className="slide-up delay-3 cta-shell">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100/80">
            Launch Offer
          </p>
          <h3 className="mt-3 font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">
            Upgrade your nutrition strategy in 60 seconds.
          </h3>
          <p className="mt-4 max-w-2xl text-cyan-100">
            Join the first cohort to unlock premium tracking, AI meal
            interpretation, and personalized protein roadmaps built for your
            goals.
          </p>
          <a
            className="btn-white mt-8 inline-flex"
            href="mailto:hello@scanyourmeal.app"
          >
            Reserve My Spot
          </a>
        </section>
      </main>
    </div>
  );
}
