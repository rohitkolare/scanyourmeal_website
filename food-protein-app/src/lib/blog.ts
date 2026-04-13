export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  keywords: string[];
  content: { type: "h2" | "p" | "ul"; text?: string; items?: string[] }[];
};

export const posts: BlogPost[] = [
  {
    slug: "how-to-track-macros-by-scanning-food",
    title: "How to Track Macros by Scanning Food: The 2026 Guide",
    description:
      "Learn how AI food scanners work, why scanning meals is faster than manual logging, and how to track protein, carbs, and fat from a single photo.",
    date: "2026-04-12",
    readingTime: "6 min read",
    keywords: [
      "scan food for macros",
      "AI food tracker",
      "macro tracking app",
      "photo calorie counter",
    ],
    content: [
      {
        type: "p",
        text: "Manually logging every meal is the #1 reason people quit macro tracking. AI meal scanning fixes that — point your camera at a plate and you get calories, protein, carbs, and fat in seconds. Here's how it actually works and how to get the most accurate results.",
      },
      { type: "h2", text: "How AI meal scanning works" },
      {
        type: "p",
        text: "An AI food tracker like ScanYourMeal uses computer vision to identify each food item on your plate, estimate its portion size, and look up the macro profile in a nutrition database. A confidence score tells you how sure the model is, and you can correct anything in one tap.",
      },
      { type: "h2", text: "Why scanning beats manual logging" },
      {
        type: "ul",
        items: [
          "Logging a meal takes ~3 seconds instead of 2 minutes.",
          "No searching through 14 versions of \"chicken breast\" in a database.",
          "Portion estimation is automatic — no kitchen scale required for most meals.",
          "You're far more likely to log every meal, which is what actually drives results.",
        ],
      },
      { type: "h2", text: "Tips for accurate scans" },
      {
        type: "ul",
        items: [
          "Take the photo from above, with the whole plate in frame.",
          "Use natural lighting when possible.",
          "Separate components on the plate so the AI can identify each one.",
          "Confirm portion sizes for calorie-dense foods like oils and nuts.",
        ],
      },
      { type: "h2", text: "Get started" },
      {
        type: "p",
        text: "ScanYourMeal is the AI nutrition tracker built around scanning. Download the app and try logging your next meal in a single photo.",
      },
    ],
  },
  {
    slug: "best-ai-nutrition-tracker-2026",
    title: "The Best AI Nutrition Tracker in 2026 (and What to Look For)",
    description:
      "What makes a great AI nutrition tracker? We break down the features that matter — accuracy, speed, macro tracking, and protein goals.",
    date: "2026-04-12",
    readingTime: "5 min read",
    keywords: [
      "AI nutrition tracker",
      "best calorie tracker app",
      "AI calorie counter",
      "protein tracker app",
    ],
    content: [
      {
        type: "p",
        text: "AI nutrition trackers have replaced manual food logging for millions of people. But not all of them are built the same. Here's what to look for when choosing one.",
      },
      { type: "h2", text: "1. Accuracy you can trust" },
      {
        type: "p",
        text: "A good AI calorie counter doesn't just identify food — it estimates portion sizes and surfaces a confidence score so you know when to double-check. Accuracy compounds: if every meal is off by 10%, your weekly total is off by hundreds of calories.",
      },
      { type: "h2", text: "2. Speed" },
      {
        type: "p",
        text: "If logging a meal takes more than 10 seconds, you'll stop doing it. The best apps get you from camera to logged meal in a single tap.",
      },
      { type: "h2", text: "3. Real macro tracking" },
      {
        type: "p",
        text: "Calories alone don't tell the full story. A great tracker breaks down protein, carbs, and fat for every meal and ties them to a daily target — especially protein, which most people under-eat.",
      },
      { type: "h2", text: "4. Goal alignment" },
      {
        type: "p",
        text: "Look for an app that adapts to your goal, whether that's hitting a protein target, losing fat, or building muscle. ScanYourMeal is built around protein and macro goals from day one.",
      },
    ],
  },
  {
    slug: "how-much-protein-do-you-need",
    title: "How Much Protein Do You Actually Need? (Science-Backed)",
    description:
      "A simple, science-backed guide to daily protein intake — and how to use a protein tracker to actually hit your target.",
    date: "2026-04-12",
    readingTime: "4 min read",
    keywords: [
      "protein tracker",
      "how much protein per day",
      "protein goals",
      "macro tracking",
    ],
    content: [
      {
        type: "p",
        text: "Most people under-eat protein. The mainstream RDA (0.8g/kg) is the bare minimum to avoid deficiency — not what you need to build muscle, recover, or stay full.",
      },
      { type: "h2", text: "The numbers that actually matter" },
      {
        type: "ul",
        items: [
          "Sedentary adult: ~0.8–1.0g per kg of bodyweight",
          "Active adult / fat loss: ~1.6–2.2g per kg",
          "Muscle building: ~1.8–2.2g per kg",
          "Older adults: ~1.2–1.6g per kg to preserve muscle mass",
        ],
      },
      { type: "h2", text: "Why hitting your target is hard" },
      {
        type: "p",
        text: "Knowing the number is easy. Hitting it every single day is the hard part. Protein is spread across meals, hidden in sauces, and easy to misjudge by eye. A protein tracker that scans meals removes the guesswork.",
      },
      { type: "h2", text: "Use a scanner, not a spreadsheet" },
      {
        type: "p",
        text: "ScanYourMeal logs the protein in every meal from a single photo and shows your daily total in real time. Set your target once and stop guessing.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
