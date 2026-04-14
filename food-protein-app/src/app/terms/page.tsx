import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "ScanYourMeal terms of service — rules and guidelines for using our application.",
  alternates: {
    canonical: "https://www.scanyourmeal.app/terms",
  },
};

const EFFECTIVE = "April 13, 2026";

export default function TermsOfServicePage() {
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

      <div className="fixed top-[20%] left-[-10%] w-[800px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full animate-pulse-glow z-[-30]"></div>

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
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
          <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-400">
            Legal Document
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
          Terms of Service
        </h1>
        <p className="text-sm text-zinc-500 mb-12 uppercase tracking-widest font-medium">
          Last updated: {EFFECTIVE}
        </p>

        <div className="prose prose-invert prose-zinc max-w-none">
          <p className="text-zinc-400 text-lg font-light leading-relaxed mb-10">
            Welcome to ScanYourMeal. These Terms of Service (&quot;Terms&quot;)
            govern your access to and use of the ScanYourMeal mobile application,
            website, and any related services (collectively, the
            &quot;Service&quot;).
          </p>
          <p className="text-zinc-400 font-light leading-relaxed mb-10">
            By downloading, accessing, or using the Service, you agree to be bound
            by these Terms. If you do not agree to these Terms, please do not use
            the Service.
          </p>

          <H2>1. Use of the Service</H2>
          <p className="text-zinc-400 font-light leading-relaxed mb-4">
            ScanYourMeal provides an AI-powered nutritional analysis tool designed
            to help users estimate the nutritional content of their meals.
          </p>
          <p className="text-zinc-400 font-light leading-relaxed mb-10">
            <strong className="text-white">Not Medical Advice:</strong> The Service is provided for
            informational purposes only. It is not intended to be a substitute for
            professional medical advice, diagnosis, or treatment. You should always
            seek the advice of a qualified healthcare provider regarding any
            medical condition or dietary restrictions.
          </p>

          <H2>2. User Accounts</H2>
          <p className="text-zinc-400 font-light leading-relaxed mb-4">
            To use certain features of the Service, you may be required to create
            an account. You are responsible for maintaining the confidentiality of
            your account credentials and for all activities that occur under your
            account.
          </p>
          <p className="text-zinc-400 font-light leading-relaxed mb-10">
            You agree to provide accurate, current, and complete information during
            the registration process and to update such information to keep it
            accurate, current, and complete.
          </p>

          <H2>3. Acceptable Use</H2>
          <p className="text-zinc-400 font-light leading-relaxed mb-4">You agree not to use the Service to:</p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-400 font-light mb-10">
            <li>Violate any applicable local, state, national, or international law.</li>
            <li>Infringe upon the rights of any third party.</li>
            <li>Transmit any malicious code, viruses, or harmful data.</li>
            <li>Attempt to gain unauthorized access to our systems or networks.</li>
            <li>Reverse engineer, decompile, or disassemble any aspect of the Service.</li>
          </ul>

          <H2>4. Intellectual Property</H2>
          <p className="text-zinc-400 font-light leading-relaxed mb-10">
            The Service and its original content, features, and functionality
            (including but not limited to the AI algorithms, software, design,
            text, and graphics) are and will remain the exclusive property of
            ScanYourMeal and its licensors.
          </p>

          <H2>5. Subscriptions and Payments</H2>
          <p className="text-zinc-400 font-light leading-relaxed mb-10">
            Certain premium features of ScanYourMeal may require a subscription.
            By subscribing, you agree to pay all applicable fees and taxes. We
            reserve the right to modify our pricing at any time. Any changes will
            be communicated to you in advance.
          </p>

          <H2>6. Termination</H2>
          <p className="text-zinc-400 font-light leading-relaxed mb-4">
            We may terminate or suspend your account and access to the Service
            immediately, without prior notice or liability, for any reason whatsoever,
            including without limitation if you breach the Terms.
          </p>
          <p className="text-zinc-400 font-light leading-relaxed mb-10">
            Upon termination, your right to use the Service will immediately cease.
            If you wish to terminate your account, you may simply discontinue using
            the Service or request account deletion via the app settings.
          </p>

          <H2>7. Limitation of Liability</H2>
          <p className="text-zinc-400 font-light leading-relaxed mb-10">
            To the maximum extent permitted by applicable law, in no event shall
            ScanYourMeal, nor its directors, employees, partners, agents, suppliers,
            or affiliates, be liable for any indirect, incidental, special,
            consequential or punitive damages, including without limitation, loss of
            profits, data, use, goodwill, or other intangible losses, resulting from
            your access to or use of or inability to access or use the Service.
          </p>

          <H2>8. Changes to Terms</H2>
          <p className="text-zinc-400 font-light leading-relaxed mb-10">
            We reserve the right, at our sole discretion, to modify or replace these
            Terms at any time. If a revision is material, we will try to provide at
            least 30 days&apos; notice prior to any new terms taking effect. By
            continuing to access or use our Service after those revisions become
            effective, you agree to be bound by the revised terms.
          </p>

          <H2>9. Contact Us</H2>
          <p className="text-zinc-400 font-light leading-relaxed mb-10">
            If you have any questions about these Terms, please contact us at{" "}
            <a href="mailto:support@scanyourmeal.app" className="text-blue-400 hover:text-blue-300 transition-colors">
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
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
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
