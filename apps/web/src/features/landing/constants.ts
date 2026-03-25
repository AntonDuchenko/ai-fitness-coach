import type { LucideIcon } from "lucide-react";
import {
  ChartNoAxesCombined,
  CircleCheckBig,
  Clock,
  Dumbbell,
  HelpCircle,
  Star,
  Timer,
  TrendingUp,
  Wallet,
  FileX,
} from "lucide-react";

export const navItems = ["Features", "How It Works", "Pricing"];

export const heroStats = [
  { value: "84K+", label: "Workouts Logged", icon: Dumbbell },
  { value: "2.9M", label: "Minutes Trained", icon: Timer },
  { value: "99.2%", label: "Goal Success Rate", icon: TrendingUp },
  { value: "4.96★", label: "App Store Rating", icon: Star },
] satisfies { value: string; label: string; icon: LucideIcon }[];

export const heroAvatars = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCw-xtUbSEStP88ricbpGxNFkE0_RozOMI_5UKLEAiK3hZacD5tss8UIiDOKl8aIvkSki48CK6ru8I5nIBagCwzFbSef5doUSSH0CLxpW7_nrya28x8mG8hNpD06WibmxatNHHV9qwJIP8c_kLhS04fUyIk8MEI_BOTGj9YzmW_AwnE6luPZYgoF7rTXTYvxIhskHQlx-N9Be_rV2r4uYeJiqovlAc9nAu3RT8LP0Fuh77Y1sYjtJGRVgIa4CL5uuU5lzFAqNbtI7M",
    alt: "Portrait of a confident woman smiling in athletic wear",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDn5mQ3mQQOBYnxytysekGcgx6IgV7ZQw_O3040K3SE8uHWlOpNSqrukGahgwCL32TgXvwmH5hMwmqRmFyrD0lOYKfGPgn-Uh2fTV_SIaggNpbdTXEMZoSXsYhTTqo1XahuHR7v1kay-gCfbc9c6h3lj43RsKvGrzA8_oUEATGuTpwlqCXZTkgsg_BmxXszuBdikzui7v7QfdUPMivgLOahSIAWeClVuVFE14vJHnpjvS5Jvf_jswaanob-N8XUqf5-Zutw1r4q4Rs",
    alt: "Close-up of a smiling young man in a gym setting",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlmPkuHJh5rtpzfl2V5z0yrBQpIephtKZmvSfI3rtUQoyKouS2qXMG_UG5lzLeOKx1k-SD6GYXQZtvkngoEpLRLaunsSw1lAJrzROQn50iJP7lMAC1NzE0w2BHwCYaSShp8qp2iHlCdANbvX1exxxTip2q5ClhEw0IgMNccMw9ibl0TK34zEjWcG-bnc0rupbT78-AhA0SbajcivQI2rlJ8ef6DSJ6UkcG7EXct3j6KHjPATWgPKAUDkx7dzpziZSGgrBrQthe8UM",
    alt: "Portrait of a focused athletic man",
  },
];

export const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDS_ATE8j1rd9kPdgSGvgpyb_nm62VQLxu5dYrWfQWJ4Ww0ITl8V_pn5mxujU3fv1w5QJQoJmT7mY8R68i1glsY10L5oJoeYClhKfrNGrlommQTT5iL1nJkAXMpaeRgeERLPjvCSryFjjqj7JAzIauaz3jZ4HHvHYc1TbO4HQ3LT28MoMZ4RU3ppj0Fzo4SKoi0HHuKFRxFVZaDM0mlX_pjlsPxH7JUu4EO4U_CCgiIFDlENNUNwuCKRZYoqE2UuymWyljlRluhtH8";

export const problemCards = [
  {
    title: "Trainers cost too much",
    description:
      "Quality personal coaching costs $500+/mo, making it inaccessible for most people who want professional guidance.",
    icon: Wallet,
    iconBg: "bg-destructive/20",
    iconColor: "text-destructive",
  },
  {
    title: "Generic programs",
    description:
      "PDF plans don't adapt when you miss a day, get sick, or travel. They are static tools in a dynamic world.",
    icon: FileX,
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
  },
  {
    title: "No answers",
    description:
      "When you're stuck or confused about an exercise at 9 PM, static plans can't talk back or help you correct form.",
    icon: HelpCircle,
    iconBg: "bg-success/20",
    iconColor: "text-success",
  },
];

export const bentoItems = [
  {
    title: "Personalized Workouts",
    description:
      "Dynamic weekly calendars that adjust based on your performance and fatigue levels.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrs4sQmycjRXy_yrVUpX0FCVkvKJIxEXFRrkSSTRXHF-tymSPcOpuf6n-IFJMJtqrQ_Z6gL4-OgHm49WYCE7Vf6R8pxq27if-8HikqtCyLq5Bm2ZCczKgjedPSsfNzD3QGFzpGlcZBR5RYKuMCX9TTgGsF1gesd7-rJ1_krHMnR6u-EQ5mSFjUgIHuKdqYnrNRj7Xvo62nchSGvwGApKbO7CeMy9m48EIyPCbtgZHNLVr641zSS5K_PjjPNAOPshf01wT1xXjd6zs",
    span: "large",
  },
  {
    title: "Custom Nutrition",
    description:
      "Meal plans synced with your training intensity and body composition goals.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB7UjZfa6IwKP9dzZkRtScc5GUeKmGaXrA4CapRlZxbA5n8fGKizLlavWIC-9zChcHkJde1t0nAuEquqKPhj4-VYxAqJXnwrADJOqEqtUF8W0OLLZ36HboQlR3glOR2Q11xGtVNlSueQ3XHxbwlGtjN-o8ZN3qLzXL6znXe8buxzOGUzNAeblP48t9X2h2zifjP-Cbe6gb-Y6ECNX2GGi9YEhey3-z-ICcQFsRA1N78lr98dULnZquUo-C14KjTI3PRhogdF1Qde9M",
    span: "small",
  },
  {
    title: "24/7 AI Coach",
    description:
      "Immediate answers to any question, from form tips to motivation peaks.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNViHkHs-sHmR5G7w-4A6-VD1XXlZTsfOlxRkd3KWPgyVwGfx02hP-optokMv2-CZ2NXOUNQKR5cw1YAvJ8v1L0KEXpx5aYVi1bw5jb401GjeGRpcb6wzKoszsAcuo0Qb5fM0MJsu09-moZn3h8AMmQZsaHD60IBug7NoNX7kiINRgNTrSIBuF7B4S8KwI9C2N5La695tt-YMmh8F36Ppy3G8DoSAPJJqBwLeFM30Grl5oBzDnuc3RB2LkzgZx7D_MgFYRdMOzGHA",
    span: "small",
  },
  {
    title: "Track Progress",
    description:
      "Advanced biometric data visualization that shows exactly how your body is transforming.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCwoV5T_aFFMaLsP9gR9ZakLI90tPtv3oe9YmIIpN8moBenpwje0aecLsnP-b-Ex_a7BsE0Uw-oJxx6Pr9jdCV7JltRv1XcnJKXQWx_e7RYgHW-fbUIAijE0e3p7yRgCEdySqnhPf95Pc6G8GdCZv6zixA-Zu6O1GoOtLdeNRgGyOoKC4rI-ih8g8GsolKMnfwTRbfU5MjF_Onv562tvZdLqIcc7RO6x6mB475RtKUdyhYzg1dixzxBAFYPYa7EoHRByYF4ct6zv2M",
    span: "large",
  },
] satisfies {
  title: string;
  description: string;
  image: string;
  span: "large" | "small";
}[];

export const steps = [
  {
    number: 1,
    title: "Tell Us Your Goals",
    description:
      "Complete a 2-minute assessment of your body type, goals, and available equipment.",
  },
  {
    number: 2,
    title: "AI Creates Your Plan",
    description:
      "ForgeFit builds a hyper-customized workout and nutrition path unique to your needs.",
  },
  {
    number: 3,
    title: "Start Training",
    description:
      "Follow your daily guidance and watch your progress unfold with real-time feedback.",
  },
];

export const testimonials = [
  {
    quote:
      "ForgeFit completely changed how I look at training. The AI actually knows when I'm tired and adjusts my load accordingly.",
    author: "Sarah J.",
    meta: "28 · Marketing Director",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCFm7L4k2Hw4zmznqshsXTOC5o2Sf9H4GijJVY_Z1L468OTyHvv-DNSuTKA0DVLIAgLyTnMUY5BapU-La4zrtiBacq4TL6YHV71VBPRBYHTcBlxQcjQ2mtu-2Whyd16YmmZHvwPwDkDl-LQQI6UUAOnV41jyxwU8iEDIZWbIhM_A9NKFhw9TmJn--IuRgHAAskOvth0Y_JmelUs11blkeDCXU4-PK4ZbHunmy8KuPH_bhoSqqt6zoKq9LUJ5cnm5EJZg0o0vIodbbQ",
  },
  {
    quote:
      "I've lost 20lbs in 3 months. The nutrition planning is a game-changer—it's the first time I've stuck to a diet because it's so flexible.",
    author: "Michael R.",
    meta: "34 · Software Engineer",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpctuJ6MyxcYe2J6bAEnpXcEF0OU42qywpUxFmnZq-QxeBOzCSrs0UL7aVVo9fenYa7qMRJuLhrfctixhE0N1s3lf3fl2MTF1Xn3KlnZ6sGNz3qMyydUy69F1vlcYUgDtz6_qsIfQE-D1uuK6V-ZuHPdrGZvMZ9DL1rCA5eBzbpE3jNmXgCXQ3F_6M2XJbbGGPUXM9ZbsyUnvy2480vQcc-L7fiNMUSBSqh7bqlsWpTE7wo92WIDbWglElX0JQRXhLhnfp_lwSE7s",
  },
  {
    quote:
      "The form check feature is insane. It's like having a coach standing right there with me in my garage gym. Worth every penny.",
    author: "Emily L.",
    meta: "31 · Graphic Designer",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAdmB5j-LJ_c-Db-Y8bJ1Z5XJ8xsMhYjXfgvYhKIvPfCxtkmgZRbMFir9u4XwVZxhMA8SJOVIgz7fNCmJ0YQpHjkYCfw3ARm9i15rObfSCF0f2b7v6uYc-sun2w2DJk_Apo8gDA4o3qlp6DH_AQMhtjCMk-FZ6G4ZN_UUl00_o5ilO4G3vHrWtS4e1fVtolVexDrTS_JmzH_1ewN_3XRpr0DU868V4M-7FsRnOltpwoOovfmDYJx1Wj3ibNBSyTZi3abWr0T0Ae0iE",
  },
];

export const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    suffix: "/month",
    cta: "Get Started",
    featured: false,
    features: [
      "Basic workout plans",
      "Daily activity tracking",
      "Community access",
    ],
  },
  {
    name: "Premium",
    price: "$20",
    suffix: "/month",
    cta: "Go Premium",
    featured: true,
    features: [
      "Everything in Free",
      "AI-Powered Adaptation",
      "Full Nutrition Engine",
      "Form Analysis Camera",
    ],
  },
  {
    name: "Teams",
    price: "$49",
    suffix: "/month",
    cta: "Select Teams",
    featured: false,
    features: [
      "Up to 5 family members",
      "Team leaderboards",
      "Shared progress tracking",
    ],
  },
];

export const faqItems = [
  {
    question: "Is ForgeFit suitable for beginners?",
    answer:
      "Absolutely. ForgeFit starts exactly where you are. Whether you've never touched a weight or you're a seasoned athlete, the AI adjusts the difficulty and provides instructional videos for every movement.",
  },
  {
    question: "How is this different from YouTube workouts?",
    answer:
      "YouTube is static. ForgeFit is dynamic. We track your progressive overload, adjust your rest times based on your heart rate, and change your entire plan if you're too sore or have a busy week.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, there are no long-term contracts. You can cancel with one click in your account settings at any time, no questions asked.",
  },
  {
    question: "Do I need a gym membership?",
    answer:
      "No! ForgeFit creates plans based on your available equipment. Whether you have a full home gym, just dumbbells, or no equipment at all, we build workouts that work for you.",
  },
  {
    question: "Does the AI really check my form?",
    answer:
      "Yes. Our AI coach can analyze your exercise form through your device camera and provide real-time corrections to help prevent injury and maximize results.",
  },
  {
    question: "How accurate is the nutrition planning?",
    answer:
      "Our nutrition engine uses peer-reviewed research and adapts to your training load, body composition goals, and dietary preferences. Plans are recalculated daily based on your activity.",
  },
];

export const ctaAvatars = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuADC8mc7v7_8vQjDVC0pA73Fy-8qs9Ujn0HJ4DT-3IXUZwmXPG-Z-WVmEUUWKQ6Fae59ffygSvm-tNH-0667TS5CRcYAVitY0DL63pZlj2C2cWoKtiDJr3cy-KyzZR2pdSzaC4w3X6PaVIY8cEodXJVQmfJ8Tb_BLttvsUUAtTdmKgf_t-6A57zI9taQqJqKWhbGovZ6voFh-XrrIE-C-wKlG8WZ-CyFWk3AdIHwqnVOM7l00yQu9EGKgREKQkyu5p82LQFiCo5WZw",
    alt: "Portrait of a confident female athlete",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOy9WJgEoaIz4zawz3edB8BsKyGhMLZ5s9cj8nUUh2QKABAXIHtfieMtBW5IUu32GW4wRiUxju0c3_PeNYZydH8km7xEAR736IEg1d_QBMdVFUIUQ0wTNbC0kiW7-zT2YJpUJFT7oUhvov4li8O1BbjjLFJ7scKS96xB-61iaNcadP7eAIqJ8ZHg5atE-I8T7AhcE7y5CH4Y8eU5p6u2oWND5aVui02YUUIe7G19KgHRX2DomT9Mc1aIeYyc3-AD1CYiSgIDUdVIE",
    alt: "Portrait of a smiling male runner",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ-_2_rrOJdOxRlyPLkntBK-XCODJy75KXfRbiunviStq6Edl09SiMnpa0p-a2Fah0sP17Ug0gWpAVlZC9CY0KjqR-hm6NRsjo7WWBkRvWw65-JgZNT1DEkdY9ehCl1EBmP8BTXGKGDsfe0Q3qpKqWmRMu1bvOgWkeOhuX4y67nV2t-jUxxnlPjy15F6IZeKrs93zrwqKItwtvt0mxOrF3FxoNA5uEo1RXsAZ7bHg5VbBwGeVMEQ7rWN_ryC2mPE6mepOGzZnCFDE",
    alt: "Portrait of a woman in fitness gear",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDi38yK1oFZVjbarlakFY13ru8JwoA85b0SazVgcPnaVhy8cwaYzzf8VBa6WJtTyCYDfrj-k7sQv_-q37t1Y8B0nEHJCgE7onjEhKplasP-QKb-FLITH15vhALSpb0s6WsQHBRWxdNZEp9TCJMvFSD8kOj-eRMwoV9StxNMnnjhX19lxPrL8LfwXcAD2mDkcBAgurg9kvCOUaizGYLZitUG_oCINphhYlXA_vBOh5p0DcWN93TkCUuGe-Nh2UavLcjyiTc2_H0y6aI",
    alt: "Portrait of a fit man",
  },
];

export const footerColumns = [
  {
    title: "Product",
    items: ["Features", "Pricing", "Coaching", "Integrations"],
  },
  { title: "Company", items: ["About Us", "Careers", "Press", "Contact"] },
  {
    title: "Legal",
    items: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];
