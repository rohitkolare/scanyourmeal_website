"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const stats = [
    { value: "1M+", label: "Meals Scanned" },
    { value: "98%", label: "AI Accuracy" },
    { value: "50K+", label: "Active Users" },
    { value: "2s", label: "Scan Speed" },
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
      icon: "📈"
    },
    {
      title: "Precision Macros",
      description: "Get granular data on protein quality and amino acid profiles effortlessly.",
      icon: "🔬"
    }
  ];

  const foodGallery = [
    { title: "High Protein", src: "/gallery-1.png", gridClass: "bento-item-1" },
    { title: "Healthy Morning", src: "/gallery-2.png", gridClass: "bento-item-2" },
    { title: "Vegan Balance", src: "/gallery-3.png", gridClass: "bento-item-3" },
    { title: "Gourmet Scan", src: "/gallery-4.png", gridClass: "bento-item-4" },
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white selection:bg-[#00F5FF] selection:text-black">
      {/* Scroll Progress Bar */}
      <div className="scroll-line" />

      {/* 1) PREMIUM STICKY NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'scrolled py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="font-heading text-2xl font-black tracking-tighter">Scan<span className="text-[#00F5FF]">YourMeal</span></span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-widest text-white/60">
            <a href="#features" className="hover:text-[#00F5FF] transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00F5FF] transition-all group-hover:w-full" />
            </a>
            <a href="#how-it-works" className="hover:text-[#00F5FF] transition-colors relative group">
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00F5FF] transition-all group-hover:w-full" />
            </a>
            <a href="#download" className="hover:text-[#00F5FF] transition-colors relative group">
              Download
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00F5FF] transition-all group-hover:w-full" />
            </a>
          </div>
          <a href="#download" className="btn-premium px-8 py-3 text-sm shadow-[0_0_20px_rgba(0,245,255,0.2)]">
            Download App
          </a>
        </div>
      </nav>

      {/* 2) HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Person scanning food"
            fill
            className="object-cover opacity-60 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/10 text-[10px] uppercase tracking-[0.3em] font-bold text-[#00F5FF] animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F5FF]"></span>
            </span>
            Precision Intelligence Alpha
          </div>
          <h1 className="heading-hero animate-fade-in [animation-delay:200ms]">
            Your Food.<br /><span className="text-gradient">Decoded</span> in Seconds.
          </h1>
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in [animation-delay:400ms]">
            Scan meals instantly. Get calories, macros, and nutrition insights powered by elite-level AI.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-6 animate-fade-in [animation-delay:600ms]">
            <button className="btn-premium px-10 py-5 text-lg group">
              Get Started
              <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </button>
            <button className="btn-outline px-10 py-5 text-lg">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="cyan-glow top-1/4 -left-1/4" />
        <div className="cyan-glow bottom-1/4 -right-1/4 opacity-10" />
      </section>

      {/* 3) APP EXPERIENCE SHOWCASE */}
      <section id="how-it-works" className="section-padding bg-[#111111] relative overflow-hidden">
        <div className="scanline" />
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-4">
            <h2 className="heading-section">Experience <span className="text-gradient">Precision</span></h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">Three steps to complete metabolic clarity.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { id: "01", title: "Scan Screen", desc: "Just point and capture. Our AI identifies every ingredient in real-time.", icon: "/stats.png" },
              { id: "02", title: "AI Analysis", desc: "Complex neural networks process textures, portions, and nutritional density.", icon: "/stats.png" },
              { id: "03", title: "Nutrition Breakdown", desc: "A cinematic breakdown of your macros, fiber, and biological impact.", icon: "/stats.png" }
            ].map((step, i) => (
              <div key={i} className="group relative space-y-8 text-center px-4">
                <div className="relative aspect-[9/19] max-w-[280px] mx-auto rounded-[3.5rem] p-1.5 border border-white/10 bg-[#222]/50 overflow-hidden shadow-2xl animate-float" style={{ animationDelay: `${i * 1.5}s` }}>
                  <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
                  <div className="relative h-full w-full rounded-[3rem] overflow-hidden border border-white/5 bg-black">
                    <Image src={step.icon} alt={step.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
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
      <section className="relative min-h-screen flex items-center section-padding overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <h2 className="heading-section">Stop Guessing.<br /><span className="text-gradient">Start Knowing.</span></h2>
            <div className="space-y-10">
              {[
                { title: "Zero Friction", text: "End the frustration of manual calorie counting" },
                { title: "Real-time Edge", text: "Make smarter food decisions in the moment" },
                { title: "Clean Data", text: "Track your health journey without the friction" },
                { title: "Elite Built", text: "Designed for high-performers and modern lifestyles" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
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
          <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-white/10 glass">
            <Image src="/stats.png" alt="Person checking stats" width={800} height={1000} className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-40" />
            <div className="ui-glow" />
          </div>
        </div>
        <div className="cyan-glow -bottom-1/4 -left-1/4 opacity-10" />
      </section>

      {/* 5) FOOD GALLERY SECTION (Bento Grid) */}
      <section className="section-padding bg-[#111111] relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
              <span className="text-[#00F5FF] text-xs font-bold uppercase tracking-[0.5em]">The Intelligence gallery</span>
              <h2 className="heading-section">A Symphony of <span className="text-gradient">Intelligence</span></h2>
            </div>
            <p className="text-white/40 max-w-sm mb-2 text-right">From gourmet dining to home cooking, ScanYourMeal understands every plate.</p>
          </div>

          <div className="bento-grid">
            {foodGallery.map((food, i) => (
              <div key={i} className={`bento-item ${food.gridClass} glass-card group`}>
                <Image
                  src={food.src}
                  alt={food.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                  <div className="space-y-2">
                    <span className="text-[#00F5FF] text-[10px] font-black uppercase tracking-[0.3em]">AI Verified</span>
                    <h3 className="text-2xl font-bold">{food.title}</h3>
                    <div className="px-4 py-2 border border-[#00F5FF]/30 rounded-full text-[#00F5FF] text-[10px] font-bold tracking-widest uppercase inline-block backdrop-blur-md">
                      Scan Signature Available
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
      <section className="section-padding relative">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="text-5xl md:text-6xl font-black text-gradient">{stat.value}</div>
                <div className="text-xs uppercase tracking-[0.4em] text-white/40 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-20">
            {[
              "The most accurate food AI I've ever used. It actually understands portion sizes accurately.",
              "Finally, an app that doesn't make tracking feel like a part-time job. 2 seconds and I'm done.",
              "The interface is gorgeous. It feels like a premium piece of technology, not just another tracker."
            ].map((quote, i) => (
              <div key={i} className="glass-card p-10 rounded-[40px] space-y-6">
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
      <section id="download" className="section-padding">
        <div className="max-w-5xl mx-auto relative rounded-[60px] overflow-hidden glass p-12 md:p-32 text-center space-y-10 group">
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
              <span className="font-heading text-3xl font-black tracking-tighter">Scan<span className="text-[#00F5FF]">YourMeal</span></span>
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
    </div>
  );
}
