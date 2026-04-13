import type { Metadata } from "next";

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
    <div
      className="min-h-screen w-full bg-white text-[#333]"
      style={{
        fontFamily:
          "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif",
        lineHeight: 1.6,
      }}
    >
      {/* Top navigation */}
      <header className="border-b border-[#eaeaea] bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <a href="/" className="text-lg font-bold text-[#222]">
            ScanYourMeal
          </a>
          <nav className="flex items-center gap-6 text-sm text-[#555]">
            <a href="/" className="hover:text-[#222]">Home</a>
            <a href="/privacy" className="hover:text-[#222]">Privacy</a>
            <a href="mailto:support@scanyourmeal.app" className="hover:text-[#222]">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <h1 className="text-[3.75em] font-extrabold leading-[1.05] tracking-tight text-[#111]">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-[#888]">
          Last updated: {EFFECTIVE}
        </p>

        <p className="mt-8">
          ScanYourMeal (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;)
          is committed to protecting your privacy. This Privacy Policy
          explains how we collect, use, retain, and safeguard your
          information when you use our mobile application and website.
        </p>

        <H2>1. Information We Collect</H2>
        <p>
          The types of personal data we collect while you use ScanYourMeal
          include information you provide to us directly and information
          we collect automatically when you use the app.
        </p>

        <H3>Information You Provide</H3>
        <p>
          When you create an account, log meals, or contact us, we collect
          the following:
        </p>
        <ul>
          <li>
            <strong>Account information:</strong> your email address and
            password.
          </li>
          <li>
            <strong>Profile details:</strong> goals, weight, height, age,
            and activity level.
          </li>
          <li>
            <strong>Meal photos:</strong> images you take with your camera
            for nutritional analysis.
          </li>
          <li>
            <strong>Meal history:</strong> the results of your scans —
            calories, macros, and ingredients.
          </li>
        </ul>

        <H3>Information Collected Automatically</H3>
        <p>
          We may automatically collect certain technical information about
          your device and app usage, including device type, operating
          system version, app version, and anonymized usage statistics.
          This information helps us improve the app and diagnose issues.
        </p>

        <H2>2. How We Use Your Information</H2>
        <p>We use your information for the following purposes:</p>
        <ul>
          <li>To provide AI-powered nutritional analysis of your meals.</li>
          <li>To maintain your personalized meal history and dashboard.</li>
          <li>To calculate goals, streaks, and progress metrics.</li>
          <li>To improve our AI models and overall app experience.</li>
          <li>To respond to your support requests.</li>
        </ul>
        <p>
          We do not use your data for advertising, profiling, or any
          purpose unrelated to providing the service.
        </p>

        <H2>3. How We Share Your Information</H2>
        <p>
          We do not sell, rent, or trade your personal data. We share
          limited information in the following circumstances:
        </p>
        <ul>
          <li>
            <strong>AI processing partners:</strong> meal images are sent
            to OpenAI and Google solely for nutritional analysis.
          </li>
          <li>
            <strong>Service providers:</strong> Supabase hosts our
            database and handles authentication.
          </li>
          <li>
            <strong>Legal requirements:</strong> we may disclose
            information if required by law or valid legal process.
          </li>
        </ul>
        <p>All data is transmitted securely over HTTPS.</p>

        <H2>4. Data Retention</H2>
        <p>
          We retain your personal data — account details, meal history,
          nutritional analysis, settings, and streaks — for as long as
          your account remains active, so you can access your history
          and progress over time.
        </p>
        <p>
          If your account remains inactive for 24 months, we may delete
          the associated data from our active databases.
        </p>
        <p>
          Meal images sent to AI processing partners are used only at the
          moment of analysis and are not retained by us afterwards.
        </p>

        <H2>5. Account and Data Deletion</H2>
        <p>
          You can request the deletion of your account and all associated
          personal data at any time.
        </p>

        <H3>In the App</H3>
        <p>
          Navigate to <strong>Settings &gt; Profile &gt; Delete Account</strong>.
          Your account and data are removed immediately upon confirmation.
        </p>

        <H3>By Email</H3>
        <p>
          Send a request from your registered email address to{" "}
          <a href="mailto:support@scanyourmeal.app">
            support@scanyourmeal.app
          </a>{" "}
          with the subject &quot;Account Deletion Request&quot;. We
          process requests within 7 days.
        </p>

        <H3>What Is Deleted</H3>
        <ul>
          <li>Your email address and profile details.</li>
          <li>
            Your entire meal history, including nutritional analysis,
            images, and streaks.
          </li>
          <li>All stored settings and preferences.</li>
        </ul>

        <H3>Deletion Timeline</H3>
        <p>
          Once a deletion request is processed, all data is permanently
          removed from our active databases within{" "}
          <strong>14 days</strong>. Encrypted backup copies may persist
          for up to <strong>30 days</strong> before being completely
          purged, after which no copy of your data remains on our systems.
        </p>

        <H2>6. Your Rights</H2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Correct inaccurate or incomplete information.</li>
          <li>Export your meal history on request.</li>
          <li>
            Delete your account and all associated data (see section 5).
          </li>
        </ul>
        <p>
          To exercise any of these rights, email{" "}
          <a href="mailto:support@scanyourmeal.app">
            support@scanyourmeal.app
          </a>
          .
        </p>

        <H2>7. Data Security</H2>
        <p>
          We implement industry-standard security measures to protect your
          personal data, including HTTPS encryption in transit and
          encrypted storage at rest via Supabase. While no method of
          transmission over the internet is 100% secure, we continually
          review and improve our security practices.
        </p>

        <H2>8. Children&apos;s Privacy</H2>
        <p>
          ScanYourMeal is not intended for children under the age of 13.
          We do not knowingly collect personal data from children under
          13. If you believe a child has provided us with personal data,
          please contact us and we will delete it promptly.
        </p>

        <H2>9. Third-Party Services</H2>
        <p>
          ScanYourMeal uses the following third-party services to provide
          our service. Each of these providers has their own privacy
          policy governing their use of your data:
        </p>
        <ul>
          <li>OpenAI and Google (AI-powered meal analysis)</li>
          <li>Supabase (database and authentication)</li>
          <li>Google Sign-In (optional authentication)</li>
        </ul>

        <H2>10. Changes to This Policy</H2>
        <p>
          We may update this Privacy Policy from time to time. When we do,
          we will update the &quot;Last updated&quot; date at the top of
          this page. Material changes will be communicated through the app
          or via email.
        </p>

        <H2>11. Contact Us</H2>
        <p>
          If you have questions about this policy or our data practices,
          please contact us at{" "}
          <a href="mailto:support@scanyourmeal.app">
            support@scanyourmeal.app
          </a>
          .
        </p>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#eaeaea] bg-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-[#888] sm:flex-row">
          <p>© {new Date().getFullYear()} ScanYourMeal</p>
          <div className="flex items-center gap-6">
            <a href="/" className="hover:text-[#222]">Home</a>
            <a href="/privacy" className="hover:text-[#222]">Privacy</a>
            <a href="mailto:support@scanyourmeal.app" className="hover:text-[#222]">
              Contact
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        main h2 { margin-top: 2.8em; font-size: 2.75em; font-weight: 800; color: #111; line-height: 1.15; letter-spacing: -0.02em; }
        main h3 { margin-top: 2em; font-size: 1.75em; font-weight: 700; color: #111; line-height: 1.25; letter-spacing: -0.01em; }
        main p { margin-top: 1em; }
        main ul { margin-top: 1em; padding-left: 40px; list-style: disc; }
        main li { margin-top: 0.5em; }
        main a { color: #1a0dab; text-decoration: underline; }
        main a:hover { color: #d14836; }
      `}</style>
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2>{children}</h2>;
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3>{children}</h3>;
}
