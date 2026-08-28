"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const gradientBg =
  "bg-[linear-gradient(45deg,rgb(31,120,255),rgb(65,62,207),rgb(111,47,239))]";

type CoreServiceItem = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  features: string[];
  whatsIncluded: string[];
  deliverables: string[];
  duration: string;
  durationNote?: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  caseStudies?: {
    image: string;
    logo: string;
    logoWidth: number;
    logoHeight: number;
    href: string;
  }[];
};

type AddOnItem = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  tags: string[];
  features: string[];
  description: string;
  whatsIncluded: string[];
  deliverables?: string[];
  cta?: { title: string; subtitle: string; href: string };
};

const CORE_SERVICES: CoreServiceItem[] = [
  {
    id: "product-strategy",
    icon: "/images/services/icons/product-strategy.svg",
    title: "Product Strategy & Consulting",
    subtitle: "Build the right product — before building it fast.",
    tags: ["AI", "MVP", "Roadmap", "Strategy"],
    description:
      "We help shape your idea, validate assumptions, map user journeys, and define the technical architecture. Together, we turn your vision into a clear, actionable roadmap for development.",
    features: [
      "Businesses launching a new digital product.",
      "Founders at idea stage",
      "Teams pivoting",
    ],
    whatsIncluded: [
      "Product strategy & discovery workshop",
      "MVP scope definition",
      "User flows and feature mapping",
      "Cost & timeline planning",
      "Technical architecture for no-code & AI",
      "Market and competitor review",
    ],
    deliverables: [
      "Feature prioritization matrix",
      "User flow diagrams",
      "Technical architecture document",
      "MVP scope document with timeline estimate",
    ],
    duration: "3–7 days",
    image: "/images/services/graphics/product-strategy.png",
    imageWidth: 1021,
    imageHeight: 538,
    caseStudies: [
      {
        image: "/images/services/case-studies/dewie.png",
        logo: "/images/services/case-studies/dewie_logo.png",
        logoWidth: 90,
        logoHeight: 28,
        href: "/case-studies",
      },
      {
        image: "/images/services/case-studies/poesea.png",
        logo: "/images/services/case-studies/poesea_logo.png",
        logoWidth: 118,
        logoHeight: 32,
        href: "/case-studies",
      },
    ],
  },
  {
    id: "ux-ui-design",
    icon: "/images/services/icons/ux-ui-design.svg",
    title: "UX/UI Design & Branding",
    subtitle: "Design that feels effortless for users and powerful for your brand.",
    tags: ["UX", "UI", "Prototypes", "Figma"],
    description:
      "We create intuitive interfaces, high-fidelity prototypes, and visual identities that strengthen your product and improve conversion. Our design is built for no-code platforms — pixel-perfect and component-ready.",
    features: [
      "Products that need a rebrand",
      "New MVPs",
      "Existing apps with poor UX",
    ],
    whatsIncluded: [
      "UX research & wireframes",
      "Micro-animations & design guidelines",
      "UI design systems & high-fidelity screens",
      "Mobile-first, responsive layouts",
      "Brand identity & visual language",
    ],
    deliverables: [
      "Figma file with all screens and components",
      "Design system",
      "Prototype ready for developer handoff",
    ],
    duration: "5–10 days",
    image: "/images/services/graphics/ux-ui-design.png",
    imageWidth: 1024,
    imageHeight: 536,
  },
  {
    id: "no-code-dev",
    icon: "/images/services/icons/no-code-dev.svg",
    title: "No-Code Web & Mobile Development",
    subtitle: "Fast, scalable apps built on Bubble, Webflow, and modern no-code tools.",
    tags: ["App Development", "Automation", "Bubble", "Integrations"],
    description:
      "From MVPs to complex platforms — we build custom no-code solutions with clean logic, responsive design, and seamless integrations. No shortcuts. No black-box code. You own everything.",
    features: [
      "Startups building their first product",
      "businesses replacing manual processes",
      "teams needing a scalable SaaS or marketplace",
    ],
    whatsIncluded: [
      "Web & mobile apps on Bubble",
      "Database architecture & complex workflows",
      "Landing pages & marketing sites",
      "Role-based access, logic, and permissions",
      "Custom API integrations",
      "Pixel-perfect responsive layouts",
      "Payment systems",
      "Notifications",
    ],
    deliverables: [
      "Live, deployed application in your own Bubble account",
      "Launch support",
      "Documented workflows and logic",
    ],
    duration: "2–6 weeks depending on complexity",
    image: "/images/services/graphics/no-code-dev.png",
    imageWidth: 1280,
    imageHeight: 670,
  },
  {
    id: "ai-features",
    icon: "/images/services/icons/ai-features.svg",
    title: "AI Features & Automation",
    subtitle: "Make your product smarter — without writing a line of model code.",
    tags: ["AI", "ChatGPT", "Claude", "Automation", "Embeddings", "Smart Search"],
    description:
      "We integrate AI features directly into your no-code product: from intelligent automation and chatbots to semantic search, recommendation engines, and AI-assisted workflows. We connect your app to OpenAI, Claude, Pinecone, and other modern AI infrastructure — so your product leverages the latest capabilities without months of engineering.",
    features: [
      "Products that want to personalize the user experience",
      "Automate repetitive tasks",
      "Add intelligent decision-making to their workflows",
    ],
    whatsIncluded: [
      "AI chatbots & virtual assistants embedded in your app",
      "LLM integrations: OpenAI GPT, Anthropic Claude, Mistral",
      "Content generation workflows",
      "Semantic / vector search using embeddings",
      "Smart recommendations & personalization logic",
      "AI triage and routing",
      "Document processing & AI-assisted intake forms",
      "Prompt-based automations and scheduled AI tasks",
    ],
    deliverables: [
      "OpenAI API / Anthropic Claude API",
      "Pinecone / Weaviate for vector storage",
      "LangChain-style pipelines",
      "Bubble AI plugin ecosystem",
      "Custom API connectors",
    ],
    duration: "1–3 weeks depending on feature complexity",
    durationNote:
      "AI features are often added as part of a broader development project — or as a standalone add-on to an existing product.",
    image: "/images/services/graphics/ai-features.png",
    imageWidth: 1280,
    imageHeight: 670,
  },
];

const ADD_ONS: AddOnItem[] = [
  {
    id: "template-customization",
    icon: "/images/services/icons/template-customization.svg",
    title: "Template Customization",
    subtitle: "Turn any Bubble or Webflow template into a fully branded, high-performing product.",
    tags: ["Branding-Ready", "Fast Turnaround", "Responsive", "Bubble", "Webflow"],
    description:
      "Whether you're starting from a marketplace template or one of our own, we adapt it to fit your business — updating structure, design, logic, and integrations so it looks custom-built and works seamlessly.",
    features: ["Founders who want a fast start without starting from zero"],
    whatsIncluded: [
      "Full template review & improvement plan",
      "Responsive optimization for all devices",
      "Custom branding",
      "API connections & third-party integrations",
      "Content updates & layout restructuring",
      "Performance and SEO enhancements",
      "Workflow adjustments and new business logic",
      "Launch support",
    ],
    cta: {
      title: "Explore Templates",
      subtitle: "Add powerful features to your template in seconds.",
      href: "/templates",
    },
  },
  {
    id: "plugin-development",
    icon: "/images/services/icons/plugin-development.svg",
    title: "Plugin Development",
    subtitle: "Extend the power of Bubble with custom functionality.",
    tags: ["Reusable", "Secure", "Performance Optimized", "Docs Included"],
    description:
      "When standard no-code features aren't enough, we develop custom plugins and integrations tailored to your app's unique needs — without unnecessary complexity or technical debt.",
    features: ["Products that have outgrown standard Bubble functionality and need custom logic"],
    whatsIncluded: [
      "Custom Bubble plugins",
      "Reusable elements & shared components",
      "Third-party service integrations",
      "Performance-optimized plugin code",
      "Authentication and connection modules",
      "Full documentation for your team",
      "Installation & deployment support",
    ],
    cta: {
      title: "Explore Plugins",
      subtitle: "Add powerful features to your template in seconds.",
      href: "/templates",
    },
  },
  {
    id: "qa-audit",
    icon: "/images/services/icons/qa-audit.svg",
    title: "QA & Audit",
    subtitle: "Make your app stable, fast, and scalable.",
    tags: ["Audit & QA", "Bubble", "Performance", "Security", "Webflow"],
    description:
      "We analyze your existing Bubble product, identify bottlenecks and hidden issues, and deliver a clear, prioritized plan for improvements. Whether pre-launch or post-launch, a QA audit prevents costly problems down the line.",
    features: [
      "Products about to launch",
      "Apps that have grown complex over time",
      "Teams inheriting someone else's build",
    ],
    whatsIncluded: [
      "Full functional testing across user roles and flows",
      "Prioritized fixes & improvement recommendations report",
      "Logic & workflow review",
      "Security and privacy rule review",
      "Database structure audit",
      "Performance diagnostics",
      "Installation & deployment support",
      "Responsiveness & cross-device UI check",
    ],
  },
  {
    id: "ongoing-support",
    icon: "/images/services/icons/ongoing-support.svg",
    title: "Ongoing Support & Feature Development",
    subtitle: "We keep your product growing — even after launch.",
    tags: ["Support & Maintenance", "Feature Dev", "Retainer", "Roadmap"],
    description:
      "From small changes to major new features, we provide reliable ongoing development and support so you never feel stuck after go-live. No need to onboard a new team from scratch.",
    features: ["Launched products that need a trusted technical partner for the long term"],
    whatsIncluded: [
      "Monthly maintenance plans and bug fixing",
      "API integration updates",
      "App enhancements & new feature development",
      "Priority support response",
      "Workflow and UI improvements",
      "Roadmap planning and backlog management",
      "Content and data updates",
    ],
    deliverables: ["Monthly retainer", "Project-based sprints", "On-demand / hourly support"],
  },
];

const HOW_WE_WORK_ITEMS = [
  { id: "how-together", title: "How Services Work Together" },
  { id: "how-dont", title: "What we don't do" },
  { id: "how-trust", title: "Trust & Proof" },
];

const SECTIONS = [
  { id: "core" as const, label: "Core Service", items: CORE_SERVICES },
  { id: "addons" as const, label: "Add-Ons", items: ADD_ONS },
  { id: "how" as const, label: "How We Work", items: HOW_WE_WORK_ITEMS },
];

function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#e9e9e9] px-4 py-1.5 text-sm font-medium text-black">
      {children}
    </span>
  );
}

function FeaturePill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#dde3fb] px-5 py-1.5 text-sm font-medium text-[#2b3b8f]">
      {children}
    </span>
  );
}

function IncludedPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full bg-[#f5f5f5] px-6 py-1.25 text-xs font-medium text-black">
      {children}
    </div>
  );
}

function DeliverableBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 rounded-2xl bg-[#f5f5f5] p-4 text-sm text-black">
      {children}
    </div>
  );
}

function CoreServiceCard({ item }: { item: CoreServiceItem }) {
  return (
    <div
      id={item.id}
      className="flex scroll-mt-8 flex-col gap-8 rounded-[20px] bg-white p-6 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.06)] sm:p-10"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <Image
          src={item.icon}
          alt=""
          width={70}
          height={90}
          className="h-22.5 w-17.5 shrink-0 rounded-sm"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl font-bold text-black">{item.title}</h3>
          <p className="text-lg text-black/70">{item.subtitle}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {item.tags.map((tag) => (
          <TagPill key={tag}>{tag}</TagPill>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-black/80">{item.description}</p>

      <div className="flex flex-col gap-4">
        <p className="text-base font-medium text-black/50">Features</p>
        <div className="flex flex-wrap gap-2.5">
          {item.features.map((f) => (
            <FeaturePill key={f}>{f}</FeaturePill>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold text-black">What&rsquo;s included</p>
        <div className="grid grid-cols-1 gap-y-2 gap-x-5 sm:grid-cols-2">
          {item.whatsIncluded.map((line) => (
            <IncludedPill key={line}>{line}</IncludedPill>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold text-black">Deliverables</p>
        <div className="flex flex-col gap-4 sm:flex-row">
          {item.deliverables.map((line) => (
            <DeliverableBox key={line}>{line}</DeliverableBox>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-black">Typical duration:</p>
          <span className="flex flex-col w-fit items-center gap-2 rounded-[15px] border border-brand-accent px-6 py-3 text-normal font-semibold text-brand-accent">
            → {item.duration}
          {item.durationNote && (
            <p className="max-w-125 text-sm text-black/60">{item.durationNote}</p>
          )}
          </span>
        </div>
        <Image
          src={item.image}
          alt=""
          width={item.imageWidth}
          height={item.imageHeight}
          className="h-auto w-full max-w-125 rounded-2xl"
        />
      </div>

      {item.caseStudies && (
        <div className="flex flex-col gap-4">
          <p className="text-2xl font-bold text-black">Case Studies</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {item.caseStudies.map((cs) => (
              <Link
                key={cs.href + cs.logo}
                href={cs.href}
                className="flex items-center justify-between gap-4 rounded-[20px] bg-[#dde3fb] p-3 pr-6 transition-colors hover:bg-[#cfd7f9]"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={cs.image}
                    alt=""
                    width={64}
                    height={64}
                    className="size-16 shrink-0 rounded-xl object-cover"
                  />
                  <Image
                    src={cs.logo}
                    alt=""
                    width={cs.logoWidth}
                    height={cs.logoHeight}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                {/* <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-black"> */}
                <span className="flex size-9 shrink-0 items-center justify-center">
                  <Image src="/images/services/case-studies/arrow.svg" alt="" width={14} height={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AddOnCard({ item }: { item: AddOnItem }) {
  return (
    <div
      id={item.id}
      className="flex scroll-mt-8 flex-col gap-8 rounded-[20px] bg-white p-6 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.06)] sm:p-10"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="flex h-22.5 w-17.5 shrink-0 items-center justify-center rounded-sm border border-black/10 bg-white p-3">
          <Image src={item.icon} alt="" width={70} height={63} className="h-auto max-h-12 w-full object-contain" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl font-bold text-black">{item.title}</h3>
          <p className="text-lg text-black/70">{item.subtitle}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {item.tags.map((tag) => (
          <TagPill key={tag}>{tag}</TagPill>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-black/80">{item.description}</p>

      <div className="flex flex-col gap-4">
        <p className="text-base font-medium text-black/50">Features</p>
        <div className="flex flex-wrap gap-2.5">
          {item.features.map((f) => (
            <FeaturePill key={f}>{f}</FeaturePill>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold text-black">What&rsquo;s included</p>
        <div className="grid grid-cols-1 gap-y-2 gap-x-5 sm:grid-cols-2">
          {item.whatsIncluded.map((line) => (
            <IncludedPill key={line}>{line}</IncludedPill>
          ))}
        </div>
      </div>

      {item.deliverables && (
        <div className="flex flex-col gap-4">
          <p className="text-2xl font-bold text-black">Deliverables</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            {item.deliverables.map((line) => (
              <DeliverableBox key={line}>{line}</DeliverableBox>
            ))}
          </div>
        </div>
      )}

      {item.cta && (
        <Link
          href={item.cta.href}
          className="flex items-center justify-between gap-4 rounded-[25px] bg-[#dde3fb] p-8 transition-colors hover:bg-[#cfd7f9]"
        >
          <div className="flex flex-col gap-1">
            <p className="text-[25px] font-semibold text-black">{item.cta.title}</p>
            <p className="text-lg text-black/70">{item.cta.subtitle}</p>
          </div>
          <span className="flex size-9 shrink-0 items-center justify-center">
            <Image src="/images/services/arrow_2.svg" alt="" width={19} height={35} />
          </span>
        </Link>
      )}
    </div>
  );
}

function PathCard({
  title,
  flow,
  className = "",
}: {
  title: string;
  flow: string;
  className?: string;
}) {
  return (
    <div className={`rounded-[25px] p-8 ${className}`}>
      <p className="mb-3 flex items-center gap-2 text-xl font-bold text-black">
        <span className="h-6 w-1 rounded-full bg-brand-accent" />
        {title}
      </p>
      <p className="text-base text-black/80">{flow}</p>
    </div>
  );
}

function HowWeWorkTogetherBlock() {
  return (
    <div
      id="how-together"
      className="flex scroll-mt-8 flex-col gap-8 rounded-[20px] bg-white p-6 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.06)] sm:p-10"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="text-3xl font-bold text-black">How Our Services Work Together</h3>
        <p className="max-w-150 text-base text-black/70">
          Most projects combine multiple services. Here are the most common
          paths our clients take:
        </p>
      </div>

      <PathCard
        title="Full Build from scratch"
        flow="Product Strategy → UX/UI Design → No-Code Development → QA & Audit → Ongoing Support"
        className="bg-[#f5f5f5]"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <PathCard
          title="Fast launch with template"
          flow="Template Customization → AI Features (optional) → QA & Audit → Launch"
          className="border border-black/10"
        />
        <PathCard
          title="AI-Enhance an existing product"
          flow="QA & Audit → AI Features & Automation → Ongoing Support"
          className="border border-black/10"
        />
      </div>
      <div className="rounded-[25px] bg-[#dde3fb] p-8">
        <p className="mb-3 flex items-center gap-2 text-xl font-bold text-black">
          <span className="h-6 w-1 rounded-full bg-brand-accent" />
          Design-first
        </p>
        <p className="text-base text-black/80">
          Product Strategy → UX/UI Design → (hand off to in-house team or)
        </p>
        <p className="mt-6 text-center text-lg font-bold text-black">
          No-Code Development
        </p>
        <p className="mt-2 text-center text-base text-black/70">
          Not sure which path fits your situation? We&rsquo;ll help you
          figure it out in a free 30-minute discovery call.
        </p>
      </div>
    </div>
  );
}

function WhatWeDontDoBlock() {
  return (
    <div
      id="how-dont"
      className="flex scroll-mt-8 flex-col items-center gap-6 rounded-[30px] bg-white p-6 text-center shadow-[0px_4px_20px_0px_rgba(0,0,0,0.06)] sm:p-10"
    >
      <h3 className="text-3xl font-bold text-black">What We Don&rsquo;t Do</h3>
      <p className="max-w-150 text-base text-black/70">
        MindForApps specializes in no-code and AI-augmented development.
      </p>
      <div className="w-full text-left">
        <p className="mb-4 text-lg font-bold text-black">We don&rsquo;t do:</p>
        <ul className="flex flex-col gap-4 rounded-[25px] bg-[#f5f5f5] p-8">
          {[
            "Custom-coded backends in Python, Node.js, or similar",
            "Native iOS/Android apps built in Swift or React Native",
            "WordPress or Shopify theme development",
            "SEO content writing or paid ads management",
          ].map((line) => (
            <li key={line} className="flex items-center gap-3 text-base text-black">
              <span className="size-2 shrink-0 rounded-full bg-brand-accent" />
              {line}
            </li>
          ))}
        </ul>
      </div>
      <p className="max-w-175 text-base text-black/70">
        If your project requires something outside our core stack, we&rsquo;ll
        tell you upfront — and can refer you to specialists we trust.
      </p>
    </div>
  );
}

function TrustProofBlock() {
  return (
    <div
      id="how-trust"
      className="flex scroll-mt-8 flex-col items-center gap-6 rounded-[30px] bg-white p-6 text-center shadow-[0px_4px_20px_0px_rgba(0,0,0,0.06)] sm:p-10"
    >
      <h3 className="text-3xl font-bold text-black">Trust & Proof</h3>
      <p className="text-base text-black/70">Why Clients Choose MindForApps</p>

      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl bg-[#dde3fb] p-6 text-left">
          <p className="text-3xl font-bold text-brand-accent">8+</p>
          <p className="text-sm text-black/70">years in no-code development</p>
        </div>
        <div className="rounded-2xl bg-[#dde3fb] p-6 text-left">
          <p className="text-3xl font-bold text-brand-accent">50+</p>
          <p className="text-sm text-black/70">apps launched</p>
        </div>
        <div className="rounded-2xl bg-[#f5f5f5] p-6 text-left">
          <p className="text-base font-semibold text-black">Bubble Certified Developer</p>
        </div>
        <div className="rounded-2xl bg-[#f5f5f5] p-6 text-left">
          <p className="text-base font-semibold text-black">Bubble Silver Tier Agency</p>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-black/15 p-6 text-left">
          <p className="text-2xl font-bold text-brand-accent">5x</p>
          <p className="text-sm text-black/70">faster than traditional development</p>
        </div>
        <div className="rounded-2xl border border-black/15 p-6 text-left">
          <p className="text-2xl font-bold text-brand-accent">4 weeks</p>
          <p className="text-sm text-black/70">Average delivery</p>
        </div>
      </div>

      <p className="mt-4 text-lg font-bold text-black">Trust Callout</p>
      <p className="max-w-175 text-base text-black/70">
        We build in your account — not ours. You own the app, the data, and
        every workflow from day one. No vendor lock-in, ever.
      </p>

      <Link
        href="/case-studies"
        className="flex w-full items-center justify-between gap-4 rounded-[25px] bg-[#dde3fb] p-8 text-left transition-colors hover:bg-[#cfd7f9]"
      >
        <div className="flex flex-col gap-1">
          <p className="text-[25px] font-semibold text-black">Case Studies</p>
          <p className="text-lg text-black/70">
            Real case studies showcasing no-code success stories.
          </p>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center">
          <Image src="/images/services/arrow_2.svg" alt="" width={19} height={35} />
        </span>
      </Link>
    </div>
  );
}

type Section = "core" | "addons" | "how";
type ServicesActiveContextValue = {
  active: Section;
  setActive: (section: Section) => void;
};

const ServicesActiveContext = createContext<ServicesActiveContextValue | null>(null);

function useServicesActive() {
  const ctx = useContext(ServicesActiveContext);
  if (!ctx) {
    throw new Error("useServicesActive must be used within ServicesActiveProvider");
  }
  return ctx;
}

export function ServicesActiveProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<Section>("core");
  return (
    <ServicesActiveContext.Provider value={{ active, setActive }}>
      {children}
    </ServicesActiveContext.Provider>
  );
}

export function ServicesSidebar() {
  const { active, setActive } = useServicesActive();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2 rounded-[20px] bg-white p-3 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]">
        {SECTIONS.map((section) => {
          const isOpen = active === section.id;
          return (
            <div key={section.id}>
              <button
                type="button"
                onClick={() => setActive(section.id)}
                className={`flex h-12.5 w-full items-center rounded-[30px] px-6 text-left text-[18px] font-medium transition-colors ${
                  isOpen
                    ? `${gradientBg} text-white`
                    : `bg-[#d9e1ff] text-black hover:${gradientBg} hover:text-white`
                }`}
              >
                {section.label}
              </button>
              {isOpen && (
                <ul className="flex flex-col text-sm">
                  {section.items.map((item, i) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document
                            .getElementById(item.id)
                            ?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className="block px-6 py-2 text-black transition-colors hover:text-brand-accent"
                      >
                        {item.title}
                      </a>
                      {i < section.items.length - 1 && (
                        <div className="mx-6 border-t border-black/10" />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      <div className={`flex flex-col gap-6 rounded-[30px] ${gradientBg} p-5 text-white`}>
        <p className="text-[23px] leading-[1.3]">
          One Complete
          <br />
          <span className="text-[30px] font-semibold">Solution</span>
          <br />
          for All Your Industry Needs
        </p>
        <Link
          href="/solutions"
          className="flex w-fit items-center gap-3 self-end transition-opacity hover:opacity-80"
        >
          <span className="text-lg font-bold">Explore</span>
          <Image src="/images/services/arrow.svg" alt="" width={50} height={50} />
        </Link>
      </div>
    </div>
  );
}

export function ServicesContent() {
  const { active } = useServicesActive();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const firstItemId = SECTIONS.find((section) => section.id === active)?.items[0]?.id;
    if (firstItemId) {
      document.getElementById(firstItemId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [active]);

  return (
    <div className="flex flex-col gap-8">
      {active === "core" &&
        CORE_SERVICES.map((item) => <CoreServiceCard key={item.id} item={item} />)}
      {active === "addons" &&
        ADD_ONS.map((item) => <AddOnCard key={item.id} item={item} />)}
      {active === "how" && (
        <>
          <HowWeWorkTogetherBlock />
          <WhatWeDontDoBlock />
          <TrustProofBlock />
        </>
      )}
    </div>
  );
}
