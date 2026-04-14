import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "ScanYourMeal privacy policy — how we collect, use, retain, and delete your data.",
  alternates: {
    canonical: "https://www.scanyourmeal.app/privacy",
  },
};

const EFFECTIVE = "April 13, 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen">
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

      <div className="fixed top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse-glow z-[-30]"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-24 border-b border-white/5 backdrop-blur-md bg-[#09090b]/80 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            </div>
            <span className="hidden sm:block text-sm font-medium text-zinc-400 group-hover:text-white transition-colors tracking-wide uppercase">
              Back to App
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <img 
              src="/app-logo.png" 
              alt="ScanYourMeal Logo" 
              className="w-14 h-14 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
            />
            <span className="font-bold tracking-tight text-white text-xl md:text-2xl">
              ScanYourMeal
            </span>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
          <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-400">
            Legal Document
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-zinc-500 mb-12 uppercase tracking-widest font-medium">
          Last updated: {EFFECTIVE}
        </p>

        <div className="prose prose-invert prose-zinc max-w-none">
          <p className="text-zinc-400 text-lg font-light leading-relaxed mb-10">
            ScanYourMeal (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;)
            is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, retain, and safeguard your
            information when you use our mobile application and website.
          </p>

          <H2>1. Information We Collect</H2>
          <p className="text-zinc-400 font-light leading-relaxed mb-6">
            The types of personal data we collect while you use ScanYourMeal
            include information you provide to us directly and information
            we collect automatically when you use the app.
          </p>

          <H3>Information You Provide</H3>
          <p className="text-zinc-400 font-light leading-relaxed mb-4">
            When you create an account, log meals, or contact us, we collect
            the following:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-400 font-light mb-8">
            <li>
              <strong className="text-white">Account information:</strong> your email address and
              password.
            </li>
            <li>
              <strong className="text-white">Profile details:</strong> goals, weight, height, age,
              and activity level.
            </li>
            <li>
              <strong className="text-white">Meal photos:</strong> images you take with your camera
              for nutritional analysis.
            </li>
            <li>
              <strong className="text-white">Meal history:</strong> the results of your scans —
              calories, macros, and ingredients.
            </li>
          </ul>

          <H3>Information Collected Automatically</H3>
          <p className="text-zinc-400 font-light leading-relaxed mb-10">
            We may automatically collect certain technical information about
            your device and app usage, including device type, operating
            system version, app version, and anonymized usage statistics.
            This information helps us improve the app and diagnose issues.
          </p>

          <H2>2. How We Use Your Information</H2>
          <p className="text-zinc-400 font-light leading-relaxed mb-4">We use your information for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-400 font-light mb-6">
            <li>To provide AI-powered nutritional analysis of your meals.</li>
            <li>To maintain your personalized meal history and dashboard.</li>
            <li>To calculate goals, streaks, and progress metrics.</li>
            <li>To improve our AI models and overall app experience.</li>
            <li>To respond to your support requests.</li>
          </ul>
          <p className="text-zinc-400 font-light leading-relaxed mb-10">
            We do not use your data for advertising, profiling, or any
            purpose unrelated to providing the service.
          </p>

          <H2>3. How We Share Your Information</H2>
          <p className="text-zinc-400 font-light leading-relaxed mb-4">
            We do not sell, rent, or trade your personal data. We share
            limited information in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-400 font-light mb-6">
            <li>
              <strong className="text-white">AI processing partners:</strong> meal images are sent
              to OpenAI and Google solely for nutritional analysis.
            </li>
            <li>
              <strong className="text-white">Service providers:</strong> Supabase hosts our
              database and handles authentication.
            </li>
            <li>
              <strong className="text-white">Legal requirements:</strong> we may disclose
              information if required by law or valid legal process.
            </li>
          </ul>
          <p className="text-zinc-400 font-light leading-relaxed mb-10">All data is transmitted securely over HTTPS.</p>

          <H2>4. Data Retention</H2>
          <p className="text-zinc-400 font-light leading-relaxed mb-4">
            We retain your personal data — account details, meal history,
            nutritional analysis, settings, and streaks — for as long as
            your account remains active, so you can access your history
            and progress over time.
          </p>
          <p className="text-zinc-400 font-light leading-relaxed mb-4">
            If your account remains inactive for 24 months, we may delete
            the associated data from our active databases.
          </p>
          <p className="text-zinc-400 font-light leading-relaxed mb-10">
            Meal images sent to AI processing partners are used only at the
            moment of analysis and are not retained by us afterwards.
          </p>

          <H2>5. Account and Data Deletion</H2>
          <p className="text-zinc-400 font-light leading-relaxed mb-6">
            You can request the deletion of your account and all associated
            personal data at any time.
          </p>

          <H3>In the App</H3>
          <p className="text-zinc-400 font-light leading-relaxed mb-6">
            Navigate to <strong className="text-white">Settings &gt; Profile &gt; Delete Account</strong>.
            Your account and data are removed immediately upon confirmation.
          </p>

          <H3>By Email</H3>
          <p className="text-zinc-400 font-light leading-relaxed mb-6">
            Send a request from your registered email address to{" "}
            <a href="mailto:support@scanyourmeal.app" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              support@scanyourmeal.app
            </a>{" "}
            with the subject &quot;Account Deletion Request&quot;. We
            process requests within 7 days.
          </p>

          <H3>What Is Deleted</H3>
          <ul className="list-disc pl-6 space-y-2 text-zinc-400 font-light mb-6">
            <li>Your email address and profile details.</li>
            <li>
              Your entire meal history, including nutritional analysis,
              images, and streaks.
            </li>
            <li>All stored settings and preferences.</li>
          </ul>

          <H3>Deletion Timeline</H3>
          <p className="text-zinc-400 font-light leading-relaxed mb-10">
            Once a deletion request is processed, all data is permanently
            removed from our active databases within{" "}
            <strong className="text-white">14 days</strong>. Encrypted backup copies may persist
            for up to <strong className="text-white">30 days</strong> before being completely
            purged, after which no copy of your data remains on our systems.
          </p>

          <H2>6. Your Rights</H2>
          <p className="text-zinc-400 font-light leading-relaxed mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-400 font-light mb-6">
            <li>Access the personal data we hold about you.</li>
            <li>Correct inaccurate or incomplete information.</li>
            <li>Export your meal history on request.</li>
            <li>Delete your account and all associated data (see section 5).</li>
          </ul>
          <p className="text-zinc-400 font-light leading-relaxed mb-10">
            To exercise any of these rights, email{" "}
            <a href="mailto:support@scanyourmeal.app" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              support@scanyourmeal.app
            </a>
            .
          </p>

          <H2>7. Data Security</H2>
          <p className="text-zinc-400 font-light leading-relaxed mb-10">
            We implement industry-standard security measures to protect your
            personal data, including HTTPS encryption in transit and
            encrypted storage at rest via Supabase. While no method of
            transmission over the internet is 100% secure, we continually
            review and improve our security practices.
          </p>

          <H2>8. Children&apos;s Privacy</H2>
          <p className="text-zinc-400 font-light leading-relaxed mb-10">
            ScanYourMeal is not intended for children under the age of 13.
            We do not knowingly collect personal data from children under
            13. If you believe a child has provided us with personal data,
            please contact us and we will delete it promptly.
          </p>

          <H2>9. Third-Party Services</H2>
          <p className="text-zinc-400 font-light leading-relaxed mb-4">
            ScanYourMeal uses the following third-party services to provide
            our service. Each of these providers has their own privacy
            policy governing their use of your data:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-400 font-light mb-10">
            <li>OpenAI and Google (AI-powered meal analysis)</li>
            <li>Supabase (database and authentication)</li>
            <li>Google Sign-In (optional authentication)</li>
          </ul>

          <H2>10. Changes to This Policy</H2>
          <p className="text-zinc-400 font-light leading-relaxed mb-10">
            We may update this Privacy Policy from time to time. When we do,
            we will update the &quot;Last updated&quot; date at the top of
            this page. Material changes will be communicated through the app
            or via email.
          </p>

          <H2>11. Contact Us</H2>
          <p className="text-zinc-400 font-light leading-relaxed mb-10">
            If you have questions about this policy or our data practices,
            please contact us at{" "}
            <a href="mailto:support@scanyourmeal.app" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              support@scanyourmeal.app
            </a>
            .
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 sm:flex-row text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} ScanYourMeal. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <a href="mailto:support@scanyourmeal.app" className="hover:text-white transition-colors">
              Contact Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-semibold text-white mb-3 mt-8 tracking-tight">{children}</h2>;
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-medium text-white mb-2 mt-6">{children}</h3>;
}
