"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Brain, Activity, ArrowRight } from "lucide-react";
import { FoodScanner } from "@/components/FoodScanner";
import { NutritionVisualization } from "@/components/NutritionVisualization";

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

  const nutritionData = [
    { name: "Protein", amount: 28, unit: "g", dailyValue: 56, color: "#10b981", status: 'good' as const },
    { name: "Carbs", amount: 45, unit: "g", dailyValue: 60, color: "#8b5cf6", status: 'moderate' as const },
    { name: "Fat", amount: 12, unit: "g", dailyValue: 35, color: "#3b82f6", status: 'good' as const },
    { name: "Fiber", amount: 8, unit: "g", dailyValue: 80, color: "#10b981", status: 'good' as const },
    { name: "Sodium", amount: 320, unit: "mg", dailyValue: 14, color: "#10b981", status: 'good' as const },
    { name: "Sugar", amount: 12, unit: "g", dailyValue: 24, color: "#f59e0b", status: 'moderate' as const },
    { name: "Calories", amount: 380, unit: "kcal", dailyValue: 19, color: "#8b5cf6", status: 'moderate' as const },
    { name: "Iron", amount: 3.2, unit: "mg", dailyValue: 18, color: "#10b981", status: 'good' as const },
    { name: "Calcium", amount: 120, unit: "mg", dailyValue: 12, color: "#3b82f6", status: 'moderate' as const }
  ];

  const socialLinks = [
    { label: "Twitter", href: "https://x.com/scanyourmeal" },
    { label: "Instagram", href: "https://instagram.com/scanyourmeal" },
    { label: "LinkedIn", href: "https://linkedin.com/company/scanyourmeal" },
  ];

  return (
    <main className="relative min-h-screen bg-[#000000] text-white selection:bg-[#18A0FB] selection:text-white overflow-x-hidden">
      {/* Figma Canvas Background */}
      <div className="fixed inset-0 bg-canvas pointer-events-none opacity-40" />
      <div className="fixed inset-0 mesh-gradient opacity-60" />

      {/* Decorative Blobs */}
      <div className="floating-blob w-[600px] h-[600px] bg-purple-500/20 top-[-5%] left-[-10%] [animation-delay:-2s] parallax-fast blur-3xl" />
      <div className="floating-blob w-[500px] h-[500px] bg-emerald-500/20 top-[40%] right-[-5%] [animation-delay:-5s] parallax-medium blur-3xl" />
      <div className="floating-blob w-[700px] h-[700px] bg-blue-500/20 top-[80%] left-[20%] [animation-delay:-8s] parallax-slow blur-3xl" />

      {/* Scroll Progress Bar */}
      <div className="scroll-line !bg-gradient-to-r from-purple-500 to-emerald-500" />

      {/* 1) PREMIUM STICKY NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'scrolled py-4 opacity-100' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo Placeholder to reserve space */}
          <div className="w-[200px] h-10" />

          <div className={`hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-widest text-white/60 transition-opacity duration-700 ${scrolled ? 'opacity-100 delay-300' : 'opacity-0'}`}>
            <a href="#features" className="hover:text-purple-400 transition-colors relative group pointer-events-auto">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-emerald-400 transition-all group-hover:w-full" />
            </a>
            <a href="#how-it-works" className="hover:text-purple-400 transition-colors relative group pointer-events-auto">
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-emerald-400 transition-all group-hover:w-full" />
            </a>
            <a href="#download" className="hover:text-purple-400 transition-colors relative group pointer-events-auto">
              Download
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-emerald-400 transition-all group-hover:w-full" />
            </a>
          </div>
          <div className={`transition-all duration-700 ${scrolled ? 'opacity-100 scale-100 delay-500' : 'opacity-0 scale-90 pointer-events-none'}`}>
            <a href="#download" className="px-8 py-3 text-sm bg-gradient-to-r from-purple-600 to-emerald-600 text-white font-bold rounded-full shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all pointer-events-auto">
              Download App
            </a>
          </div>
        </div>
      </nav>

      {/* DYNAMIC BRANDING OVERLAY */}
      <div
        className={`fixed z-[60] transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) pointer-events-none
          ${scrolled
            ? 'top-5 left-6 md:left-10 scale-[0.7] md:scale-[0.55] translate-x-0'
            : 'top-[12%] left-1/2 -translate-x-1/2 scale-100'
          }`}
      >
        <span className={`font-heading font-black tracking-tighter transition-all duration-1000 ${scrolled ? 'text-4xl' : 'text-5xl sm:text-6xl md:text-[10vw]'} leading-none text-center block w-full whitespace-nowrap`}>
          Scan<span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">YourMeal</span>
        </span>
      </div>

      {/* 2) HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(16, 185, 129, 0.1) 50%, rgba(59, 130, 246, 0.15) 100%)",
                "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(16, 185, 129, 0.15) 100%)",
                "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(16, 185, 129, 0.1) 50%, rgba(59, 130, 246, 0.15) 100%)"
              ]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-emerald-900/20" />
          <Image
            src="/hero.png"
            alt="Person scanning food"
            fill
            className="object-cover opacity-20 scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <motion.h1 
              className="text-7xl md:text-9xl font-black mb-8 leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">
                Scan Your Food
              </span>
              <br />
              <span className="text-white/95">Transform Your Health</span>
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-2xl md:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            AI-powered nutrition analysis in seconds. Know exactly what&apos;s on your plate with 98% accuracy.
          </motion.p>
          
          <motion.div 
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: Camera, text: "Instant Scan", color: "from-purple-500 to-purple-600" },
                { icon: Brain, text: "AI Analysis", color: "from-emerald-500 to-emerald-600" },
                { icon: Activity, text: "Health Insights", color: "from-blue-500 to-blue-600" }
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  className={`flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${item.color} bg-opacity-10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.15 }}
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                  }}
                >
                  <item.icon className="w-6 h-6 text-white" />
                  <span className="text-white font-semibold text-lg">{item.text}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
              <motion.a
                href="#features"
                className="group relative px-16 py-6 bg-gradient-to-r from-purple-600 to-emerald-600 text-white font-bold rounded-full text-xl shadow-2xl hover:shadow-purple-500/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Scanning Now
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.a>
              
              <motion.a
                href="#how-it-works"
                className="px-16 py-6 bg-transparent border-2 border-white/40 hover:border-white/70 text-white font-bold rounded-full text-xl transition-all hover:bg-white/10 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }} />
      </section>

      {/* 3) INTERACTIVE SCANNER DEMO */}
      <section id="features" className="w-full py-32 bg-gradient-to-b from-transparent via-purple-950/20 to-emerald-950/20 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl font-bold text-white mb-6">
            Try the <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">AI Scanner</span>
          </h2>
          <p className="text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Experience the future of nutrition tracking with our interactive demo
          </p>
        </motion.div>
        
        <div className="flex justify-center px-6">
          <FoodScanner />
        </div>
      </section>

      {/* 4) NUTRITION VISUALIZATION */}
      <section id="how-it-works" className="w-full py-32 bg-gradient-to-b from-emerald-950/20 to-purple-950/20 relative">
        <NutritionVisualization nutrients={nutritionData} />
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
                <p className="text-white/70 italic font-light leading-relaxed">&quot;{quote}&quot;</p>
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
            Download ScanYourMeal and take control of your metabolic health with the world&apos;s most advanced AI.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-8">
            <a
              href="mailto:hello@scanyourmeal.app?subject=ScanYourMeal%20Early%20Access"
              className="btn-premium px-12 py-6 text-xl shadow-[0_0_40px_rgba(0,245,255,0.3)]"
            >
              Download Now
            </a>
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
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/40 hover:text-[#00F5FF] transition-colors text-sm font-bold uppercase tracking-widest"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-white/20">Product</span>
                <ul className="space-y-2 text-sm text-white/50">
                  <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#how-it-works" className="hover:text-white transition-colors">Methods</a></li>
                  <li><a href="#download" className="hover:text-white transition-colors">Get the App</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-white/20">Legal</span>
                <ul className="space-y-2 text-sm text-white/50">
                  <li><a href="mailto:legal@scanyourmeal.app?subject=Privacy%20Policy%20Request" className="hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="mailto:legal@scanyourmeal.app?subject=Terms%20of%20Service%20Request" className="hover:text-white transition-colors">Terms</a></li>
                  <li><a href="mailto:legal@scanyourmeal.app?subject=Cookie%20Policy%20Request" className="hover:text-white transition-colors">Cookies</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-white/20">Support</span>
                <ul className="space-y-2 text-sm text-white/50">
                  <li><a href="mailto:hello@scanyourmeal.app" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="mailto:support@scanyourmeal.app?subject=Help%20Center" className="hover:text-white transition-colors">Help Center</a></li>
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
