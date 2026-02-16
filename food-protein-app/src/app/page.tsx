"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.glass-card');
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };

    // Intersection Observer for Scroll Animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach((el) => revealObserver.observe(el));

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      revealElements.forEach((el) => revealObserver.unobserve(el));
    };
  }, []);

  const stats = [
    { value: "1M+", label: "Meals Scanned", color: "var(--figma-blue)" },
    { value: "98%", label: "AI Accuracy", color: "var(--figma-purple)" },
    { value: "50K+", label: "Active Users", color: "var(--figma-green)" },
    { value: "2s", label: "Scan Speed", color: "var(--figma-orange)" },
  ];

  const features = [
    {
      title: "Real-time AI Vision",
      description: "Instant nutrient identification from a single frame with 99.4% accuracy.",
      icon: "⚡"
    },
    {
      title: "Bio-Adaptive Tracking",
      description: "Your nutritional roadmap evolves with your metabolic data in real-time.",
      icon: "📈",
      color: "var(--figma-green)"
    },
    {
      title: "Precision Macros",
      description: "Get granular data on protein quality and amino acid profiles effortlessly.",
      icon: "🔬",
      color: "var(--figma-orange)"
    }
  ];

  const galleryColors = [
    "var(--figma-blue)",
    "var(--figma-purple)",
    "var(--figma-green)",
    "var(--figma-pink)",
  ];

  const foodGallery = [
    { title: "High Protein", src: "/gallery-1.png", gridClass: "bento-item-1" },
    { title: "Healthy Morning", src: "/gallery-2.png", gridClass: "bento-item-2" },
    { title: "Vegan Balance", src: "/gallery-3.png", gridClass: "bento-item-3" },
    { title: "Gourmet Scan", src: "/gallery-4.png", gridClass: "bento-item-4" },
  ];

  return (
    <main className="relative min-h-screen bg-[#000000] text-white selection:bg-[#18A0FB] selection:text-white">
      {/* Figma Canvas Background */}
      <div className="fixed inset-0 bg-canvas pointer-events-none opacity-40" />
      <div className="fixed inset-0 mesh-gradient opacity-60" />

      {/* Decorative Blobs */}
      <div className="floating-blob w-[500px] h-[500px] bg-[#18A0FB] top-[-5%] left-[-10%] [animation-delay:-2s] parallax-fast" />
      <div className="floating-blob w-[400px] h-[400px] bg-[#9747FF] top-[40%] right-[-5%] [animation-delay:-5s] parallax-medium" />
      <div className="floating-blob w-[600px] h-[600px] bg-[#007CF0] top-[80%] left-[20%] [animation-delay:-8s] parallax-slow" />

      {/* Scroll Progress Bar */}
      <div className="scroll-line !bg-[#18A0FB]" />

      {/* 1) PREMIUM STICKY NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'scrolled py-4 opacity-100' : 'bg-transparent py-8 pointer-events-none'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo Placeholder to reserve space */}
          <div className="w-[200px] h-10" />

          <div className={`hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-widest text-white/60 transition-opacity duration-700 ${scrolled ? 'opacity-100 delay-300' : 'opacity-0'}`}>
            <a href="#features" className="hover:text-[#00F5FF] transition-colors relative group pointer-events-auto">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00F5FF] transition-all group-hover:w-full" />
            </a>
            <a href="#how-it-works" className="hover:text-[#00F5FF] transition-colors relative group pointer-events-auto">
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00F5FF] transition-all group-hover:w-full" />
            </a>
            <a href="#download" className="hover:text-[#00F5FF] transition-colors relative group pointer-events-auto">
              Download
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00F5FF] transition-all group-hover:w-full" />
            </a>
          </div>
          <div className={`transition-all duration-700 ${scrolled ? 'opacity-100 scale-100 delay-500' : 'opacity-0 scale-90 pointer-events-none'}`}>
            <a href="#download" className="btn-premium px-8 py-3 text-sm shadow-[0_0_20px_rgba(0,245,255,0.2)] pointer-events-auto">
              Download App
            </a>
          </div>
        </div>
      </nav>

      {/* DYNAMIC BRANDING OVERLAY */}
      <div
        className={`fixed z-[60] transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) pointer-events-none
          ${scrolled
            ? 'top-[22px] left-[calc(50%-min(640px,50vw-1.5rem))] scale-[0.6] md:scale-[0.5] translate-x-0'
            : 'top-[12%] left-1/2 -translate-x-1/2 scale-100'
          }`}
      >
        <span className={`font-heading font-black tracking-tighter transition-all duration-1000 glow-text-colorful ${scrolled ? 'text-4xl' : 'text-7xl md:text-[10vw]'} leading-none text-center block w-full whitespace-nowrap`}>
          Scan<span className="text-[#00F5FF]">YourMeal</span>
        </span>
      </div>

      {/* 2) HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 parallax-slow">
          <Image
            src="/hero.png"
            alt="Person scanning food"
            fill
            className="object-cover opacity-60 scale-110"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-8">
          <h1 className="heading-hero animate-drop-in [animation-delay:200ms] glow-text-colorful">
            Nutritional Intelligence<br /><span className="text-gradient">Redefined.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light animate-slide-up [animation-delay:600ms]">
            The world's first metabolic decoder. Zero friction, elite accuracy, and cinematic insights in every scan.
          </p>
          <div className="flex flex-col items-center gap-6 pt-6 animate-slide-up [animation-delay:800ms]">
            <div className="inline-flex items-center justify-center p-1 rounded-md bg-[#18A0FB]/20 border border-[#18A0FB]/40 mb-2 shadow-[0_0_15px_rgba(24,160,251,0.2)]">
              <div className="w-2 h-2 rounded-sm bg-[#18A0FB] animate-pulse" />
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="px-10 py-4 bg-transparent border border-[#18A0FB]/50 hover:border-[#18A0FB] hover:bg-[#18A0FB]/5 text-[#18A0FB] hover:text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(24,160,251,0.1)] hover:shadow-[0_0_30px_rgba(24,160,251,0.2)] hover:-translate-y-1">
                Start Building Health
              </button>
              <button className="btn-outline px-10 py-4 rounded-lg font-bold">
                View Specs
              </button>
            </div>
          </div>
        </div>

        <div className="cyan-glow top-1/4 -left-1/4" />
        <div className="cyan-glow bottom-1/4 -right-1/4 opacity-10" />
      </section>

      {/* 3) APP EXPERIENCE SHOWCASE */}
      <section id="how-it-works" className="w-full section-padding bg-[#111111] relative overflow-hidden text-white flex flex-col items-center">
        <div className="scanline" />
        <div className="w-full max-w-7xl mx-auto px-6 space-y-24 flex flex-col items-center">
          <div className="w-full text-center space-y-4 reveal">
            <h2 className="heading-section">Experience <span className="text-gradient">Precision</span></h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">Three steps to complete metabolic clarity.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 w-full">
            {[
              { id: "01", title: "Scan Screen", desc: "Just point and capture. Our AI identifies every ingredient in real-time.", icon: "/vision.png" },
              { id: "02", title: "AI Analysis", desc: "Complex neural networks process textures, portions, and nutritional density.", icon: "/analysis.png" },
              { id: "03", title: "Nutrition Breakdown", desc: "A cinematic breakdown of your macros, fiber, and biological impact.", icon: "/breakdown.png" }
            ].map((step, i) => (
              <div key={i} className={`group relative space-y-8 text-center px-4 reveal-scale delay-${(i + 1) * 100} ${i === 1 ? 'parallax-fast' : 'parallax-medium'}`}>
                <div className="relative aspect-[9/19] max-w-[280px] mx-auto rounded-[3.5rem] p-1.5 border border-white/10 bg-[#222]/50 overflow-hidden shadow-2xl animate-float" style={{ animationDelay: `${i * 1.5}s` }}>
                  <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
                  <div className="relative h-full w-full rounded-[3rem] overflow-hidden border border-white/5 bg-black">
                    <Image src={step.icon} alt={step.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity hover-scale" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black to-transparent z-20" />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent z-20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[#00F5FF] font-black text-sm tracking-widest">{step.id}</span>
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                  <p className="text-white/40 font-light leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4) WHY IT MATTERS (Emotional Section) */}
      <section className="w-full relative flex flex-col items-center py-24 md:py-32 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center justify-center">
          <div className="space-y-12 reveal-left">
            <h2 className="heading-section">Stop Guessing.<br /><span className="text-gradient">Start Knowing.</span></h2>
            <div className="space-y-10">
              {[
                { title: "Zero Friction", text: "End the frustration of manual calorie counting" },
                { title: "Real-time Edge", text: "Make smarter food decisions in the moment" },
                { title: "Clean Data", text: "Track your health journey without the friction" },
                { title: "Elite Built", text: "Designed for high-performers and modern lifestyles" }
              ].map((item, i) => (
                <div key={i} className={`flex gap-6 items-start group reveal-left delay-${(i + 1) * 100}`}>
                  <div className="mt-1 w-8 h-8 rounded-lg border border-[#00F5FF]/30 flex-shrink-0 flex items-center justify-center group-hover:border-[#00F5FF] transition-colors">
                    <div className="w-2 h-2 rounded-full bg-[#00F5FF]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#00F5FF]">{item.title}</h4>
                    <p className="text-2xl font-light text-white/80 leading-snug">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-white/10 glass reveal-right delay-200 parallax-medium">
            <Image src="/stats.png" alt="Person checking stats" width={800} height={1000} className="object-cover hover-scale" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-40" />
            <div className="ui-glow" />
          </div>
        </div>
        <div className="cyan-glow -bottom-1/4 -left-1/4 opacity-10" />
      </section>

      {/* 5) FOOD GALLERY SECTION (Bento Grid) */}
      <section className="w-full section-padding bg-[#111111] relative flex flex-col items-center">
        <div className="w-full max-w-7xl mx-auto px-6 space-y-16 flex flex-col items-center">
          <div className="w-full flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8 reveal">
            <div className="space-y-4 flex flex-col items-center md:items-start">
              <div className="inline-block px-3 py-1 bg-[#9747FF]/10 border border-[#9747FF]/20 rounded text-[#9747FF] text-[10px] font-mono uppercase tracking-widest">Component: Gallery_v2.0</div>
              <h2 className="heading-section">A Symphony of <span className="text-gradient">Intelligence</span></h2>
            </div>
            <div className="flex flex-col items-center md:items-end space-y-2">
              <p className="text-white/40 max-w-sm font-mono text-[10px] tracking-tight">./neural_engine/vision_training_set.json</p>
              <div className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] text-white/30 uppercase tracking-widest font-black">AI_CORE: ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="bento-grid w-full">
            {foodGallery.map((food, i) => (
              <div key={i} className={`bento-item ${food.gridClass} glass-card group reveal-scale delay-${(i + 1) * 100}`}>
                <Image
                  src={food.src}
                  alt={food.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="glass p-5 rounded-2xl backdrop-blur-xl" style={{ borderColor: `${galleryColors[i]}44` }}>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: galleryColors[i] }} />
                        <span className="text-[10px] font-mono uppercase tracking-tighter" style={{ color: galleryColors[i] }}>Metabolic_Scan: 99.4%</span>
                      </div>
                      <span className="text-[8px] text-white/30 font-mono">#{i + 402}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1 tracking-tight">{food.title}</h3>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                      <div className="text-[9px] text-white/40 font-mono">DATA_STREAM: SUCCESS</div>
                      <div className="text-[9px] font-mono" style={{ color: galleryColors[i] }}>{galleryColors[i].replace('var(--figma-', '').toUpperCase().replace(')', '')}_HEX</div>
                    </div>
                  </div>
                </div>
                <div className="scanline opacity-0 group-hover:opacity-40 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6) SOCIAL PROOF + STATS */}
      <section className="w-full section-padding relative flex flex-col items-center">
        <div className="w-full max-w-7xl mx-auto px-6 space-y-20 flex flex-col items-center">
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <div key={i} className={`text-center space-y-2 group cursor-default reveal-scale delay-${(i + 1) * 100}`}>
                <div className="text-5xl md:text-6xl font-black transition-all duration-300 group-hover:scale-110" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs uppercase tracking-[0.4em] text-white/40 font-bold group-hover:text-white/60 transition-colors">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-20">
            {[
              "The most accurate food AI I've ever used. It actually understands portion sizes accurately.",
              "Finally, an app that doesn't make tracking feel like a part-time job. 2 seconds and I'm done.",
              "The interface is gorgeous. It feels like a premium piece of technology, not just another tracker."
            ].map((quote, i) => (
              <div key={i} className={`glass-card p-10 rounded-[40px] space-y-6 reveal-scale delay-${(i + 1) * 150}`}>
                <div className="flex gap-1 text-[#00F5FF]">
                  {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                </div>
                <p className="text-white/70 italic font-light leading-relaxed">"{quote}"</p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#007CF0]" />
                  <div className="text-sm font-bold">Verified User</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7) FINAL CALL TO ACTION */}
      <section id="download" className="w-full section-padding flex flex-col items-center">
        <div className="w-full max-w-5xl mx-auto relative rounded-[60px] overflow-hidden glass p-12 md:p-32 text-center space-y-10 group reveal-scale flex flex-col items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00F5FF]/10 to-[#007CF0]/10 -z-10 group-hover:opacity-100 transition-opacity" />
          <h2 className="heading-section leading-tight">Start Scanning <span className="text-gradient">Smarter</span> Today.</h2>
          <p className="text-xl text-white/50 max-w-xl mx-auto font-light leading-relaxed">
            Download ScanYourMeal and take control of your metabolic health with the world's most advanced AI.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-8">
            <button className="btn-premium px-12 py-6 text-xl shadow-[0_0_40px_rgba(0,245,255,0.3)]">
              Download Now
            </button>
          </div>
          <p className="text-[10px] text-white/20 uppercase tracking-[0.5em]">Join the metabolic revolution</p>
        </div>
      </section>

      {/* 8) FOOTER */}
      <footer className="bg-[#111111] py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="space-y-6">
              <span className="font-heading text-5xl font-black tracking-tighter">Scan<span className="text-[#00F5FF]">YourMeal</span></span>
              <div className="flex gap-6">
                {["Twitter", "Instagram", "LinkedIn"].map((social) => (
                  <a key={social} href="#" className="text-white/40 hover:text-[#00F5FF] transition-colors text-sm font-bold uppercase tracking-widest">{social}</a>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-white/20">Product</span>
                <ul className="space-y-2 text-sm text-white/50">
                  <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Methods</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Science</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-white/20">Legal</span>
                <ul className="space-y-2 text-sm text-white/50">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-white/20">Support</span>
                <ul className="space-y-2 text-sm text-white/50">
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 text-[10px] text-white/20 uppercase tracking-[0.3em] flex flex-col md:flex-row justify-between items-center gap-4">
            <span>© 2026 ScanYourMeal Intelligence. Engineered for performance.</span>
            <div className="flex gap-4 items-center">
              <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
