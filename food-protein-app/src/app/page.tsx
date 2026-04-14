"use client";

import { useEffect, useRef, useState } from "react";
import {
  Scan,
  Menu,
  X,
  ArrowRight,
  Play,
  Zap,
  Settings,
  CheckCircle,
  Camera,
  Brain,
  BarChart3,
  Target,
  HeartPulse,
  History,
  ShieldCheck,
  CreditCard,
  RotateCcw,
  Lock,
  ChevronDown,
  Check,
  Star,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from "lucide-react";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Scroll reveal with IntersectionObserver
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal, .reveal-blur, .reveal-scale").forEach((el) => {
      revealObserver.observe(el);
    });

    // Counters observer
    const counters = document.querySelectorAll<HTMLElement>(".counter[data-target]");
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = parseFloat(el.dataset.target || "0");
            const isDecimal = target % 1 !== 0;
            const duration = 2000;
            const startTime = performance.now();
            function updateCounter(currentTime: number) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = eased * target;
              el.textContent = isDecimal
                ? current.toFixed(1)
                : Math.round(current).toLocaleString();
              if (progress < 1) requestAnimationFrame(updateCounter);
              else
                el.textContent = isDecimal
                  ? target.toFixed(1)
                  : target.toLocaleString();
            }
            requestAnimationFrame(updateCounter);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => counterObserver.observe(c));

    // Nav scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (navRef.current) {
        navRef.current.style.borderBottomColor =
          window.scrollY > 50 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)";
        navRef.current.style.backgroundColor =
          window.scrollY > 50 ? "rgba(9,9,11,0.9)" : "rgba(9,9,11,0.8)";
      }
    };
    handleScroll(); // Set correct state on load
    window.addEventListener("scroll", handleScroll);

    // 3D Tilt Cards
    const tiltCards = document.querySelectorAll<HTMLElement>(".tilt-card");
    const handleMouseMove = (e: MouseEvent, card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      card.style.setProperty("--mouse-x", x + "px");
      card.style.setProperty("--mouse-y", y + "px");
    };
    const handleMouseLeave = (card: HTMLElement) => {
      card.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    };

    tiltCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => handleMouseMove(e, card));
      card.addEventListener("mouseleave", () => handleMouseLeave(card));
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealObserver.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const closeMenu = () => setMenuOpen(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  };

  const handleEmailSubmit = () => {
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address.");
      return;
    }
    showToast("🎉 Check your inbox! Download link sent to " + email);
    setEmail("");
  };

  return (
    <div className="relative">
      <div className="ambient-bg" aria-hidden="true"></div>
      <div className="grid-bg" aria-hidden="true"></div>

      <div className="fixed inset-0 z-[-45]">
        <img
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1920&h=1080&fit=crop&q=60"
          alt=""
          className="w-full h-full object-cover opacity-[0.04] grayscale"
          style={{
            maskImage: "linear-gradient(to bottom, white 20%, transparent 70%)",
            WebkitMaskImage: "linear-gradient(to bottom, white 20%, transparent 70%)",
          }}
        />
      </div>

      {/* 3D Floating orbs at different depths */}
      <div className="fixed top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse-glow z-[-30] orb-1 border-0"></div>
      <div className="fixed bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full z-[-30] orb-2 border-0"></div>
      <div className="fixed top-[40%] left-[-100px] w-[300px] h-[300px] bg-violet-500/5 blur-[80px] rounded-full z-[-30] orb-3 border-0"></div>

      {/* Navigation */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-md bg-[#09090b]/80 transition-all duration-500 ease-in-out ${isScrolled ? "h-16" : "h-24 md:h-28"}`}
        style={{ transform: "translateZ(100px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/app-logo.png" alt="ScanYourMeal Logo" className={`shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-500 ease-in-out ${isScrolled ? "w-9 h-9 rounded-xl" : "w-14 h-14 md:w-16 md:h-16 rounded-2xl"}`} />
            <span className={`font-bold tracking-tight text-white transition-all duration-500 ease-in-out ${isScrolled ? "text-lg md:text-xl" : "text-2xl md:text-3xl"}`}>
              ScanYourMeal
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="nav-link text-[11px] font-medium uppercase tracking-widest text-zinc-400 hover:text-white transition-colors duration-300"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="nav-link text-[11px] font-medium uppercase tracking-widest text-zinc-400 hover:text-white transition-colors duration-300"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="nav-link text-[11px] font-medium uppercase tracking-widest text-zinc-400 hover:text-white transition-colors duration-300"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="nav-link text-[11px] font-medium uppercase tracking-widest text-zinc-400 hover:text-white transition-colors duration-300"
            >
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#pricing"
              className="btn-primary bg-white text-black text-[11px] font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300"
            >
              Get Started
            </a>
          </div>
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-zinc-400 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] bg-[#09090b]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={closeMenu}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        <a
          href="#features"
          onClick={closeMenu}
          className="text-lg font-medium text-zinc-300 hover:text-white transition-colors"
        >
          Features
        </a>
        <a
          href="#how-it-works"
          onClick={closeMenu}
          className="text-lg font-medium text-zinc-300 hover:text-white transition-colors"
        >
          How It Works
        </a>
        <a
          href="#pricing"
          onClick={closeMenu}
          className="text-lg font-medium text-zinc-300 hover:text-white transition-colors"
        >
          Pricing
        </a>
        <a
          href="#faq"
          onClick={closeMenu}
          className="text-lg font-medium text-zinc-300 hover:text-white transition-colors"
        >
          FAQ
        </a>
        <a
          href="#pricing"
          onClick={closeMenu}
          className="mt-4 bg-white text-black text-sm font-semibold px-8 py-3 rounded-full"
        >
          Get Started
        </a>
      </div>

      {/* Hero */}
      <section
        className="min-h-screen flex items-center justify-center pt-32 pb-20 px-4 md:px-6 relative"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        <div className="max-w-7xl mx-auto text-center depth-layer">
          <div
            className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-8"
            style={{ transform: "translateZ(30px)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-400">
              Now with AI-Powered Recognition
            </span>
          </div>

          <h1
            className="animate-fade-in-up text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.1] mb-6"
            style={{ animationDelay: "0.1s", transform: "translateZ(40px)" }}
          >
            <span className="text-gradient">Scan Your Meal,</span>
            <br />
            <span className="text-gradient">Know Your</span>
            <span className="text-white"> Nutrition</span>
          </h1>

          <p
            className="animate-fade-in-up text-base md:text-lg font-light leading-relaxed text-zinc-400 max-w-xl mx-auto mb-10"
            style={{ animationDelay: "0.2s", transform: "translateZ(30px)" }}
          >
            Point your camera at any meal and get instant macros, calories, and
            micronutrient breakdowns powered by advanced AI.
          </p>

          <div
            className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
            style={{ animationDelay: "0.3s", transform: "translateZ(35px)" }}
          >
            <a
              href="#pricing"
              className="btn-primary bg-white text-black text-[11px] md:text-xs font-semibold uppercase tracking-wider px-8 py-3.5 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg shadow-white/10"
            >
              Start Free — 7 Scans
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#how-it-works"
              className="text-[11px] md:text-xs font-medium uppercase tracking-wider text-zinc-400 hover:text-white px-8 py-3.5 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5" />
              Watch Demo
            </a>
          </div>

          <p
            className="animate-fade-in-up text-xs text-zinc-600 mb-16"
            style={{ animationDelay: "0.35s", transform: "translateZ(25px)" }}
          >
            No signup required · Try it instantly
          </p>

          {/* 3D Phone Mockup */}
          <div
            className="animate-fade-in-up relative max-w-sm mx-auto"
            style={{
              animationDelay: "0.5s",
              transform: "translateZ(60px)",
              perspective: "1200px",
            }}
          >
            <div className="absolute inset-0 bg-indigo-500/25 blur-[80px] rounded-full scale-75"></div>
            <div className="phone-mockup relative p-3 animate-float-3d">
              <div className="phone-shadow"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#0f0f12] rounded-b-2xl z-10"></div>
              <div className="relative rounded-[2rem] overflow-hidden aspect-[9/19] bg-[#0c0c0e]">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=850&fit=crop&auto=format&q=80"
                  alt="Acai smoothie bowl being scanned"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20"></div>
                <div className="absolute top-8 left-4 right-4 flex items-center justify-between">
                  <div className="scans-badge px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                    <Zap className="w-3 h-3 text-indigo-400" />
                    <span className="text-[10px] font-medium text-indigo-300">
                      5 of 7 scans left
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10">
                    <Settings className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-48 h-48 border-2 border-indigo-400/60 rounded-2xl">
                  <div className="absolute -top-0.5 -left-0.5 w-6 h-6 border-t-2 border-l-2 border-indigo-400 rounded-tl-xl"></div>
                  <div className="absolute -top-0.5 -right-0.5 w-6 h-6 border-t-2 border-r-2 border-indigo-400 rounded-tr-xl"></div>
                  <div className="absolute -bottom-0.5 -left-0.5 w-6 h-6 border-b-2 border-l-2 border-indigo-400 rounded-bl-xl"></div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 border-b-2 border-r-2 border-indigo-400 rounded-br-xl"></div>
                  <div className="animate-scan absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_15px_rgba(99,102,241,0.8)]"></div>
                </div>
                <div className="absolute bottom-6 left-4 right-4 bg-black/70 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-white">
                      Detected: Acai Berry Bowl
                    </span>
                    <span className="text-[10px] font-medium text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> 96% match
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-white counter">
                        380
                      </div>
                      <div className="text-[9px] text-zinc-500 uppercase tracking-wider">
                        Calories
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-blue-400 counter">
                        12g
                      </div>
                      <div className="text-[9px] text-zinc-500 uppercase tracking-wider">
                        Protein
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-amber-400 counter">
                        52g
                      </div>
                      <div className="text-[9px] text-zinc-500 uppercase tracking-wider">
                        Carbs
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-rose-400 counter">
                        14g
                      </div>
                      <div className="text-[9px] text-zinc-500 uppercase tracking-wider">
                        Fat
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="py-16 px-4 md:px-6 border-y border-white/5"
        style={{ perspective: "800px" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="overflow-hidden mb-12 opacity-40">
            <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
              <span className="text-sm font-semibold tracking-wider text-zinc-500">
                HEALTHLINE
              </span>
              <span className="text-zinc-700">•</span>
              <span className="text-sm font-semibold tracking-wider text-zinc-500">
                MEN&apos;S HEALTH
              </span>
              <span className="text-zinc-700">•</span>
              <span className="text-sm font-semibold tracking-wider text-zinc-500">
                TECHCRUNCH
              </span>
              <span className="text-zinc-700">•</span>
              <span className="text-sm font-semibold tracking-wider text-zinc-500">
                WIRED
              </span>
              <span className="text-zinc-700">•</span>
              <span className="text-sm font-semibold tracking-wider text-zinc-500">
                FORBES
              </span>
              <span className="text-zinc-700">•</span>
              <span className="text-sm font-semibold tracking-wider text-zinc-500">
                THE VERGE
              </span>
              <span className="text-zinc-700">•</span>
              <span className="text-sm font-semibold tracking-wider text-zinc-500">
                PRODUCT HUNT
              </span>
              <span className="text-zinc-700">•</span>
              {/* Duplicated for marquee effect */}
              <span className="text-sm font-semibold tracking-wider text-zinc-500">
                HEALTHLINE
              </span>
              <span className="text-zinc-700">•</span>
              <span className="text-sm font-semibold tracking-wider text-zinc-500">
                MEN&apos;S HEALTH
              </span>
              <span className="text-zinc-700">•</span>
              <span className="text-sm font-semibold tracking-wider text-zinc-500">
                TECHCRUNCH
              </span>
              <span className="text-zinc-700">•</span>
              <span className="text-sm font-semibold tracking-wider text-zinc-500">
                WIRED
              </span>
              <span className="text-zinc-700">•</span>
              <span className="text-sm font-semibold tracking-wider text-zinc-500">
                FORBES
              </span>
              <span className="text-zinc-700">•</span>
              <span className="text-sm font-semibold tracking-wider text-zinc-500">
                THE VERGE
              </span>
              <span className="text-zinc-700">•</span>
              <span className="text-sm font-semibold tracking-wider text-zinc-500">
                PRODUCT HUNT
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 reveal-scale">
            <div className="text-center">
              <div
                className="text-3xl md:text-4xl font-semibold tracking-tighter text-white counter"
                data-target="2.4"
              >
                0
              </div>
              <div className="text-[10px] font-medium uppercase tracking-widest text-zinc-500 mt-1">
                Million Scans
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl md:text-4xl font-semibold tracking-tighter text-white counter"
                data-target="98.7"
              >
                0
              </div>
              <div className="text-[10px] font-medium uppercase tracking-widest text-zinc-500 mt-1">
                % Accuracy
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl md:text-4xl font-semibold tracking-tighter text-white counter"
                data-target="150"
              >
                0
              </div>
              <div className="text-[10px] font-medium uppercase tracking-widest text-zinc-500 mt-1">
                K+ Active Users
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl md:text-4xl font-semibold tracking-tighter text-white counter"
                data-target="4.9"
              >
                0
              </div>
              <div className="text-[10px] font-medium uppercase tracking-widest text-zinc-500 mt-1">
                ★ App Store Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features — 3D Tilt Cards */}
      <section
        id="features"
        className="py-12 md:py-16 px-4 md:px-6"
        style={{ perspective: "1200px" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal-blur">
            <span className="text-[10px] font-medium uppercase tracking-widest text-indigo-400 mb-4 block">
              Features
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gradient mb-4">
              Everything You Need to Eat Smarter
            </h2>
            <p className="text-base font-light leading-relaxed text-zinc-400">
              Advanced computer vision meets nutritional science to give you the
              most detailed meal analysis available.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="glass-card-3d rounded-2xl p-6 md:p-8 relative overflow-hidden reveal-scale delay-100 tilt-card">
              <div className="card-shine" aria-hidden="true"></div>
              <div className="relative z-[2]">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/5">
                  <Camera className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-lg font-medium tracking-tight text-white mb-2">
                  Instant Scan
                </h3>
                <p className="text-sm font-light leading-relaxed text-zinc-400">
                  Point your camera at any meal — cooked, raw, packaged — and get
                  results in under 2 seconds.
                </p>
              </div>
            </div>
            <div className="glass-card-3d rounded-2xl p-6 md:p-8 relative overflow-hidden reveal-scale delay-200 tilt-card">
              <div className="card-shine" aria-hidden="true"></div>
              <div className="relative z-[2]">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5 shadow-lg shadow-blue-500/5">
                  <Brain className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-medium tracking-tight text-white mb-2">
                  AI Recognition
                </h3>
                <p className="text-sm font-light leading-relaxed text-zinc-400">
                  Trained on 1M+ food images. Identifies individual ingredients,
                  cooking methods, and portion sizes.
                </p>
              </div>
            </div>
            <div className="glass-card-3d rounded-2xl p-6 md:p-8 relative overflow-hidden reveal-scale delay-300 tilt-card">
              <div className="card-shine" aria-hidden="true"></div>
              <div className="relative z-[2]">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/5">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-medium tracking-tight text-white mb-2">
                  Full Macro Breakdown
                </h3>
                <p className="text-sm font-light leading-relaxed text-zinc-400">
                  Calories, protein, carbs, fat, fiber, sugar, sodium, and 30+
                  micronutrients per serving.
                </p>
              </div>
            </div>
            <div className="glass-card-3d rounded-2xl p-6 md:p-8 relative overflow-hidden reveal-scale delay-100 tilt-card">
              <div className="card-shine" aria-hidden="true"></div>
              <div className="relative z-[2]">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 shadow-lg shadow-amber-500/5">
                  <Target className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-medium tracking-tight text-white mb-2">
                  Goal Tracking
                </h3>
                <p className="text-sm font-light leading-relaxed text-zinc-400">
                  Set personalized daily targets for calories and macros. Track
                  progress with beautiful charts.
                </p>
              </div>
            </div>
            <div className="glass-card-3d rounded-2xl p-6 md:p-8 relative overflow-hidden reveal-scale delay-200 tilt-card">
              <div className="card-shine" aria-hidden="true"></div>
              <div className="relative z-[2]">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-5 shadow-lg shadow-rose-500/5">
                  <HeartPulse className="w-5 h-5 text-rose-400" />
                </div>
                <h3 className="text-lg font-medium tracking-tight text-white mb-2">
                  Health Insights
                </h3>
                <p className="text-sm font-light leading-relaxed text-zinc-400">
                  Get personalized suggestions based on your dietary preferences,
                  allergies, and health conditions.
                </p>
              </div>
            </div>
            <div className="glass-card-3d rounded-2xl p-6 md:p-8 relative overflow-hidden reveal-scale delay-300 tilt-card">
              <div className="card-shine" aria-hidden="true"></div>
              <div className="relative z-[2]">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-5 shadow-lg shadow-violet-500/5">
                  <History className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-lg font-medium tracking-tight text-white mb-2">
                  Meal History
                </h3>
                <p className="text-sm font-light leading-relaxed text-zinc-400">
                  Every scan is saved automatically. Browse your meal timeline,
                  spot patterns, and improve your diet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — 3D Steps */}
      <section
        id="how-it-works"
        className="py-12 md:py-16 px-4 md:px-6 relative"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div
          className="max-w-7xl mx-auto relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="text-center max-w-2xl mx-auto mb-16 reveal-blur">
            <span className="text-[10px] font-medium uppercase tracking-widest text-indigo-400 mb-4 block">
              How It Works
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gradient mb-4">
              Three Steps to Smarter Eating
            </h2>
            <p className="text-base font-light leading-relaxed text-zinc-400">
              No barcode needed. No manual entry. Just scan and know.
            </p>
          </div>
          <div
            className="grid md:grid-cols-3 gap-8 md:gap-12"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="text-center reveal-scale delay-100 step-3d">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-2xl rotating-border p-[1px]">
                  <div className="w-full h-full rounded-2xl bg-[#09090b]"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-white">1</span>
                </div>
              </div>
              <h3 className="text-lg font-medium tracking-tight text-white mb-2">
                Snap a Photo
              </h3>
              <p className="text-sm font-light leading-relaxed text-zinc-400">
                Open the app and take a photo of your meal. Works with plates,
                bowls, packaged food, or individual ingredients.
              </p>
            </div>
            <div className="text-center reveal-scale delay-200 step-3d">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div
                  className="absolute inset-0 rounded-2xl rotating-border p-[1px]"
                  style={{ animationDelay: "-1.3s" }}
                >
                  <div className="w-full h-full rounded-2xl bg-[#09090b]"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-white">2</span>
                </div>
              </div>
              <h3 className="text-lg font-medium tracking-tight text-white mb-2">
                AI Analyzes
              </h3>
              <p className="text-sm font-light leading-relaxed text-zinc-400">
                Our AI identifies every ingredient, estimates portion sizes, and
                calculates the full nutritional profile in real-time.
              </p>
            </div>
            <div className="text-center reveal-scale delay-300 step-3d">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div
                  className="absolute inset-0 rounded-2xl rotating-border p-[1px]"
                  style={{ animationDelay: "-2.6s" }}
                >
                  <div className="w-full h-full rounded-2xl bg-[#09090b]"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-white">3</span>
                </div>
              </div>
              <h3 className="text-lg font-medium tracking-tight text-white mb-2">
                Get Insights
              </h3>
              <p className="text-sm font-light leading-relaxed text-zinc-400">
                See your full macro breakdown, health score, and personalized
                tips. Log it with one tap to track your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase — 3D Image */}
      <section
        className="py-12 md:py-16 px-4 md:px-6"
        style={{ perspective: "1200px" }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="reveal-blur img-3d-wrap">
              <div className="absolute inset-0 bg-indigo-500/15 blur-[60px] rounded-3xl scale-90"></div>
              <div className="img-3d relative rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="/meal_bowl.png"
                  alt="Grilled Chicken Meal Bowl"
                  className="w-full aspect-[4/3] object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-black/40 to-transparent"></div>
                
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-xl rounded-lg px-3 py-1.5 border border-white/10 flex items-center gap-2 shadow-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-white">Scanned</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-xl rounded-xl p-4 border border-white/10 shadow-2xl">
                  <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
                    <div className="text-white font-medium tracking-tight">Grilled Chicken Bowl</div>
                    <div className="text-indigo-400 font-bold">450 <span className="text-[10px] font-medium text-zinc-400">kcal</span></div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center divide-x divide-white/10">
                    <div>
                      <div className="text-[9px] text-zinc-400 uppercase tracking-widest mb-0.5">Protein</div>
                      <div className="text-sm font-semibold text-white">42<span className="text-[10px] text-zinc-500 font-normal ml-0.5">g</span></div>
                    </div>
                    <div>
                      <div className="text-[9px] text-zinc-400 uppercase tracking-widest mb-0.5">Carbs</div>
                      <div className="text-sm font-semibold text-white">35<span className="text-[10px] text-zinc-500 font-normal ml-0.5">g</span></div>
                    </div>
                    <div>
                      <div className="text-[9px] text-zinc-400 uppercase tracking-widest mb-0.5">Fats</div>
                      <div className="text-sm font-semibold text-white">18<span className="text-[10px] text-zinc-500 font-normal ml-0.5">g</span></div>
                    </div>
                    <div>
                      <div className="text-[9px] text-zinc-400 uppercase tracking-widest mb-0.5">Fibre</div>
                      <div className="text-sm font-semibold text-white">9<span className="text-[10px] text-zinc-500 font-normal ml-0.5">g</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal-blur delay-200">
              <span className="text-[10px] font-medium uppercase tracking-widest text-indigo-400 mb-4 block">
                Smart Dashboard
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gradient mb-6">
                Your Complete Nutritional Picture
              </h2>
              <p className="text-base font-light leading-relaxed text-zinc-400 mb-8">
                Go beyond basic calorie counting. ScanYourMeal gives you a
                holistic view of your nutrition with daily, weekly, and monthly
                analytics.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-indigo-400" />
                  </div>
                  <p className="text-sm font-light text-zinc-300">
                    Track 30+ micronutrients including vitamins, minerals, and
                    amino acids
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-indigo-400" />
                  </div>
                  <p className="text-sm font-light text-zinc-300">
                    Visual trend charts to spot nutritional gaps over time
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-indigo-400" />
                  </div>
                  <p className="text-sm font-light text-zinc-300">
                    Integration with Apple Health, Google Fit, and Fitbit
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-indigo-400" />
                  </div>
                  <p className="text-sm font-light text-zinc-300">
                    Export reports as PDF to share with your nutritionist or
                    doctor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="py-12 md:py-16 px-4 md:px-6 border-t border-white/5"
        style={{ perspective: "1200px" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal-blur">
            <span className="text-[10px] font-medium uppercase tracking-widest text-indigo-400 mb-4 block">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gradient mb-4">
              Loved by Health-Conscious People
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="glass-card-3d rounded-2xl p-6 md:p-8 relative overflow-hidden reveal-scale delay-100 tilt-card">
              <div className="card-shine" aria-hidden="true"></div>
              <div className="relative z-[2]">
                <div className="flex items-center gap-1 mb-4">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                </div>
                <p className="text-sm font-light leading-relaxed text-zinc-300 mb-6">
                  &quot;I lost 15 pounds in 3 months just by being aware of what I
                  was eating. ScanYourMeal made it effortless.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src="/nanobanana.png"
                    alt="Nano Banana"
                    className="w-8 h-8 rounded-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  />
                  <div>
                    <div className="text-xs font-medium text-white">Sarah M.</div>
                    <div className="text-[10px] text-zinc-500">
                      Lost 15 lbs in 3 months
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card-3d rounded-2xl p-6 md:p-8 relative overflow-hidden reveal-scale delay-200 tilt-card">
              <div className="card-shine" aria-hidden="true"></div>
              <div className="relative z-[2]">
                <div className="flex items-center gap-1 mb-4">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                </div>
                <p className="text-sm font-light leading-relaxed text-zinc-300 mb-6">
                  &quot;₹199 for unlimited scans is a steal. I was paying triple
                  for a nutritionist. This app is just as good and available
                  24/7.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format&q=80"
                    alt="Rahul S."
                    className="w-8 h-8 rounded-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  />
                  <div>
                    <div className="text-xs font-medium text-white">Rahul S.</div>
                    <div className="text-[10px] text-zinc-500">
                      Software Developer, Bangalore
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card-3d rounded-2xl p-6 md:p-8 relative overflow-hidden reveal-scale delay-300 tilt-card">
              <div className="card-shine" aria-hidden="true"></div>
              <div className="relative z-[2]">
                <div className="flex items-center gap-1 mb-4">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                </div>
                <p className="text-sm font-light leading-relaxed text-zinc-300 mb-6">
                  &quot;I have celiac disease and this app has been a lifesaver. It
                  flags gluten-containing ingredients I would have missed.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format&q=80"
                    alt="Priya D."
                    className="w-8 h-8 rounded-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  />
                  <div>
                    <div className="text-xs font-medium text-white">Priya D.</div>
                    <div className="text-[10px] text-zinc-500">
                      Managing celiac disease
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing — 3D Cards */}
      <section
        id="pricing"
        className="py-12 md:py-16 px-4 md:px-6 relative"
        style={{ perspective: "1200px" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div
          className="max-w-7xl mx-auto relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="text-center max-w-2xl mx-auto mb-16 reveal-blur">
            <span className="text-[10px] font-medium uppercase tracking-widest text-indigo-400 mb-4 block">
              Pricing
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gradient mb-4">
              Try Free. Go Unlimited for ₹199.
            </h2>
            <p className="text-base font-light leading-relaxed text-zinc-400">
              Start with 7 free scans. Love it? Unlock unlimited for the price of
              a chai per month.
            </p>
          </div>
          <div
            className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Free */}
            <div className="glass-card pricing-3d rounded-2xl p-6 md:p-8 reveal-scale delay-100 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium tracking-tight text-white mb-1">
                    Free
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Try it out, no strings attached
                  </p>
                </div>
                <div className="scans-badge px-3 py-1.5 rounded-full">
                  <span className="text-[10px] font-semibold text-indigo-300">
                    7 Scans
                  </span>
                </div>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-semibold tracking-tighter text-white">
                  ₹0
                </span>
                <span className="text-sm text-zinc-500">forever</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2.5 text-sm font-light text-zinc-300">
                  <Check className="w-4 h-4 text-zinc-500 flex-shrink-0" /> 7 meal scans total
                </li>
                <li className="flex items-center gap-2.5 text-sm font-light text-zinc-300">
                  <Check className="w-4 h-4 text-zinc-500 flex-shrink-0" /> Full macro &amp;
                  calorie breakdown
                </li>
                <li className="flex items-center gap-2.5 text-sm font-light text-zinc-300">
                  <Check className="w-4 h-4 text-zinc-500 flex-shrink-0" /> AI ingredient
                  detection
                </li>
                <li className="flex items-center gap-2.5 text-sm font-light text-zinc-500">
                  <X className="w-4 h-4 text-zinc-700 flex-shrink-0" /> Unlimited scans
                </li>
                <li className="flex items-center gap-2.5 text-sm font-light text-zinc-500">
                  <X className="w-4 h-4 text-zinc-700 flex-shrink-0" /> Goal tracking &amp; history
                </li>
                <li className="flex items-center gap-2.5 text-sm font-light text-zinc-500">
                  <X className="w-4 h-4 text-zinc-700 flex-shrink-0" /> Health app integrations
                </li>
              </ul>
            </div>
            {/* Pro */}
            <div className="pricing-highlight pricing-3d rounded-2xl p-6 md:p-8 reveal-scale delay-200 flex flex-col relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full text-[9px] font-semibold uppercase tracking-widest text-white flex items-center gap-1.5 shadow-lg shadow-indigo-500/30 whitespace-nowrap">
                <Zap className="w-3 h-3" /> Unlimited Everything
              </div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium tracking-tight text-white mb-1">
                    Unlimited
                  </h3>
                  <p className="text-xs text-zinc-500">
                    For serious nutrition tracking
                  </p>
                </div>
                <div className="scans-badge px-3 py-1.5 rounded-full">
                  <span className="text-[10px] font-semibold text-indigo-300">
                    ∞ Scans
                  </span>
                </div>
              </div>
              <div className="mb-2">
                <span className="text-4xl font-semibold tracking-tighter text-white">
                  ₹199
                </span>
                <span className="text-sm text-zinc-500">/month</span>
              </div>
              <p className="text-[10px] text-zinc-600 mb-6">
                That&apos;s less than ₹7 per day. Cheaper than a chai. ☕
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2.5 text-sm font-light text-zinc-300">
                  <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />{" "}
                  <span className="text-white font-normal">Unlimited</span> meal
                  scans
                </li>
                <li className="flex items-center gap-2.5 text-sm font-light text-zinc-300">
                  <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" /> Full macro +
                  micronutrient data
                </li>
                <li className="flex items-center gap-2.5 text-sm font-light text-zinc-300">
                  <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" /> Complete meal history
                </li>
                <li className="flex items-center gap-2.5 text-sm font-light text-zinc-300">
                  <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" /> Daily goal
                  tracking &amp; charts
                </li>
                <li className="flex items-center gap-2.5 text-sm font-light text-zinc-300">
                  <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" /> Allergy &amp;
                  diet alerts
                </li>
                <li className="flex items-center gap-2.5 text-sm font-light text-zinc-300">
                  <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" /> Apple Health
                  &amp; Google Fit sync
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="py-12 md:py-16 px-4 md:px-6 border-t border-white/5"
        style={{ perspective: "800px" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 reveal-blur">
            <span className="text-[10px] font-medium uppercase tracking-widest text-indigo-400 mb-4 block">
              FAQ
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gradient mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3 reveal-scale delay-100">
            {[
              {
                q: "How accurate is the food recognition?",
                a: "Our AI achieves 98.7% accuracy on common dishes, tested across 1M+ food images. For complex multi-ingredient meals, you can manually adjust portions and ingredients to get precise results.",
              },
              {
                q: "What do I get with 7 free scans?",
                a: "All 7 free scans give you the full experience — complete macro breakdown, calorie count, ingredient detection, and micronutrient data. No features are locked or watermarked.",
              },
              {
                q: "Does it work with homemade Indian meals?",
                a: "Yes! Our AI has been trained extensively on Indian cuisine — from dal and sabzi to biryani, dosa, thali, and regional specialties. It recognises Indian cooking methods and spice combinations for accurate portion estimates.",
              },
              {
                q: "Is my food data kept private?",
                a: "Absolutely. All food images are processed on-device and immediately discarded after analysis. We never store your food photos on our servers.",
              },
              {
                q: "Can I cancel my ₹199 subscription anytime?",
                a: "Yes, cancel anytime from your account settings — no hidden charges, no lock-in. Access continues until the end of your billing period, then switches to free with 7 scans.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept UPI (Google Pay, PhonePe, Paytm), all major credit/debit cards (Visa, Mastercard, RuPay), and net banking via Razorpay.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className={`faq-item glass-card rounded-xl cursor-pointer ${
                  openFaq === idx ? "open" : ""
                }`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="flex items-center justify-between p-5">
                  <span className="text-sm font-medium text-white">{faq.q}</span>
                  <ChevronDown className="w-4 h-4 text-zinc-500 faq-chevron flex-shrink-0" />
                </div>
                <div className="faq-answer">
                  <p className="text-sm font-light leading-relaxed text-zinc-400">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-12 md:py-16 px-4 md:px-6 relative"
        style={{ perspective: "1200px" }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full animate-pulse-glow"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative reveal-blur">
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gradient mb-6"
            style={{ transform: "translateZ(20px)" }}
          >
            Stop Guessing.
            <br />
            Start Knowing.
          </h2>
          <p
            className="text-base md:text-lg font-light leading-relaxed text-zinc-400 max-w-xl mx-auto mb-10"
            style={{ transform: "translateZ(10px)" }}
          >
            Join 150,000+ people who&apos;ve transformed their relationship with
            food. Your first 7 scans are free.
          </p>
          <div
            className="max-w-md mx-auto flex gap-3"
            style={{ transform: "translateZ(30px)" }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/[0.05] border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-colors duration-300"
            />
            <button
              onClick={handleEmailSubmit}
              className="btn-primary bg-white text-black text-[11px] font-semibold uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 whitespace-nowrap flex items-center gap-2 shadow-lg shadow-white/10"
            >
              Get the App
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[10px] text-zinc-600 mt-4">
            No credit card required · Available on iOS &amp; Android
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div className="col-span-2 md:col-span-1">
              <a href="/" className="flex items-center gap-2.5 mb-4">
                <img src="/app-logo.png" alt="ScanYourMeal Logo" className="w-8 h-8 rounded-lg shadow-lg" />
                <span className="text-sm font-semibold tracking-tight">
                  ScanYourMeal
                </span>
              </a>
              <p className="text-xs font-light text-zinc-500 leading-relaxed max-w-xs">
                AI-powered nutrition analysis. Know exactly what&apos;s on your plate.
                Made in India.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-medium uppercase tracking-widest text-zinc-500 mb-4">
                Product
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="#features"
                    className="text-xs font-light text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-xs font-light text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-xs font-light text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    Changelog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-medium uppercase tracking-widest text-zinc-500 mb-4">
                Company
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="/"
                    className="text-xs font-light text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-xs font-light text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-xs font-light text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-xs font-light text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-medium uppercase tracking-widest text-zinc-500 mb-4">
                Legal
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="/privacy"
                    className="text-xs font-light text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-xs font-light text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-xs font-light text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] text-zinc-600">
              © 2025 ScanYourMeal. All rights reserved. Made with ❤️ in India
            </p>
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="text-zinc-600 hover:text-white transition-colors duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="/"
                className="text-zinc-600 hover:text-white transition-colors duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="/"
                className="text-zinc-600 hover:text-white transition-colors duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="/"
                className="text-zinc-600 hover:text-white transition-colors duration-300"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast */}
      <div className={`toast ${toastVisible ? "show" : ""}`}>
        <div className="flex items-center gap-3">
          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="text-sm font-light text-white">{toastMessage}</span>
        </div>
      </div>
    </div>
  );
}
