import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const operator = {
  legalName: "Exhibit Connect LLC",
  location: "New Jersey, USA",
  email: "joseph@exhibitconnect.co",
  responseTime: "within one business day",
};

const sites = [
  {
    dir: "boothconnect",
    domain: "boothconnect.co",
    brand: "Booth Connect",
    initials: "BC",
    theme: "booth",
    title: "Booth Connect | Trade Show Booth Meeting Strategy",
    description:
      "Booth Connect helps B2B exhibitors define who matters, coordinate relevant conversations, and prepare their booth team for show week.",
    eyebrow: "Booth strategy for planned B2B conversations",
    hero: "Make the booth worth the trip.",
    lede:
      "Booth Connect helps exhibitors define who matters, coordinate relevant conversations, and prepare the context their team needs before show week begins.",
    primaryCta: "Plan the next show",
    processHeading: "A meeting plan built around the whole show.",
    processIntro:
      "The work starts before the doors open and continues after the floor closes.",
    process: [
      {
        number: "01",
        stage: "Before",
        title: "Shape the meeting plan",
        copy:
          "Define the show objective, priority company types, roles, match categories, exclusions, and the availability of the people attending.",
      },
      {
        number: "02",
        stage: "During",
        title: "Walk in with context",
        copy:
          "Keep confirmed times, locations, contact details, match rationales, and useful talking points together for the booth team.",
      },
      {
        number: "03",
        stage: "After",
        title: "Close the loop",
        copy:
          "Record what happened, assign follow-up, and distinguish the conversations that deserve immediate attention from those that do not.",
      },
    ],
    deliverablesHeading: "What your booth team receives.",
    deliverables: [
      {
        title: "Target map",
        copy:
          "A focused view of the companies, roles, and relationship types approved for the show.",
        label: "Approved audience",
      },
      {
        title: "Show-week calendar",
        copy:
          "Confirmed details organized around real booth availability, including time, location, attendee, and meeting category.",
        label: "Working schedule",
      },
      {
        title: "Meeting briefs",
        copy:
          "Concise context on who the team is meeting, why the connection may be relevant, and a practical opening topic.",
        label: "Prepared context",
      },
      {
        title: "Follow-up scorecard",
        copy:
          "A simple post-show framework for attendance, meeting quality, next-step priority, and ownership.",
        label: "Next actions",
      },
    ],
    scenario: {
      label: "Illustrative workflow — not client results",
      title: "A relationship-led plan for an equipment exhibitor.",
      copy:
        "A regional equipment manufacturer is attending an industry expo to explore distributor and complementary-supplier relationships. Booth Connect defines the approved match categories and exclusions, organizes relevant conversations around the team’s availability, and prepares the calendar context for show week. After the event, the team uses the scorecard to assign follow-up without treating every conversation as equal.",
      fields: [
        ["Exhibitor profile", "Regional equipment manufacturer"],
        ["Show objective", "Distributor and complementary-supplier conversations"],
        ["Priority roles", "Channel, partnerships, and operations leaders"],
        ["Guardrails", "Current customers and direct competitors excluded"],
        ["Match rationale", "Complementary route to the same end market"],
        ["Suggested topic", "Territory needs, service coverage, and partnership fit"],
      ],
    },
    faq: [
      [
        "Who is Booth Connect best suited for?",
        "B2B exhibitors that can name the partner, channel, sourcing, supplier, OEM, or strategic relationships they want to explore—and have someone on the floor who can hold those conversations.",
      ],
      [
        "What makes a meeting relevant?",
        "The company and contact must fit the criteria agreed for the show, a specific time must be confirmed, and there must be a documented commercial reason for the conversation.",
      ],
      [
        "Do you simply try to fill every open calendar slot?",
        "No. The plan starts with approved targets, relationship types, exclusions, and availability. A full calendar is not useful if the meetings lack a clear reason to happen.",
      ],
      [
        "Are results guaranteed?",
        "No. Meeting volume, attendance, revenue, and other business outcomes depend on show fit, timing, audience quality, relevance, and prospect responsiveness.",
      ],
    ],
    closingHeading: "Bring us the show. We’ll help shape the meeting plan.",
    closingCopy:
      "Tell us where you are exhibiting, who you want to meet, and who will be on the floor.",
    about: {
      headline: "A deliberate meeting plan for the people behind the booth.",
      lede:
        "Booth Connect is a trade show meeting support brand operated by Exhibit Connect LLC in New Jersey.",
      sections: [
        [
          "A focused service for B2B exhibitors",
          "Booth Connect supports teams that want more than general booth traffic. We help define commercially relevant relationship types, organize the work before the show, and prepare useful context for the people taking meetings.",
        ],
        [
          "Prepared for show week",
          "Each engagement begins with the event, the team’s goals, approved targets, exclusions, and real availability. The resulting calendar and briefs are designed to help the booth team understand who they are meeting and why the conversation may be worthwhile.",
        ],
        [
          "Clear expectations",
          "Relevant planning improves preparation, but it cannot guarantee a meeting count, attendance, revenue, or another specific outcome. We use direct business communication, respect removal requests, and keep the scope tied to the agreed show and audience.",
        ],
      ],
    },
  },
  {
    dir: "exhibitmeetings",
    domain: "exhibitmeetings.co",
    brand: "Exhibit Meetings",
    initials: "EM",
    theme: "meetings",
    title: "Exhibit Meetings | Managed Trade Show Meeting Operations",
    description:
      "Exhibit Meetings turns clear target criteria and show availability into coordinated outreach, usable schedules, and meeting briefs for B2B exhibitors.",
    eyebrow: "Managed meeting operations for B2B show teams",
    hero: "Qualified trade show meetings, organized before show week.",
    lede:
      "Exhibit Meetings turns clear target criteria and real show availability into coordinated outreach, usable calendar details, and meeting briefs for the team attending.",
    primaryCta: "Discuss your show",
    processHeading: "One operating sequence from intake to handoff.",
    processIntro:
      "Every target, response, time slot, and meeting note stays connected to the reason the conversation belongs on the calendar.",
    process: [
      {
        number: "01",
        stage: "Criteria",
        title: "Set the criteria",
        copy:
          "Confirm the show, desired company types, approved roles, match categories, named targets, exclusions, and attendee availability.",
      },
      {
        number: "02",
        stage: "Research",
        title: "Map the opportunity",
        copy:
          "Research relevant exhibitors and record a clear fit rationale before a company enters the meeting workflow.",
      },
      {
        number: "03",
        stage: "Schedule",
        title: "Coordinate the schedule",
        copy:
          "Manage relevant business communication, responses, available times, confirmations, reschedules, and location details.",
      },
      {
        number: "04",
        stage: "Handoff",
        title: "Brief the team",
        copy:
          "Deliver the working schedule, meeting context, useful discussion prompts, and a post-show review structure.",
      },
    ],
    deliverablesHeading: "A practical command center for show week.",
    deliverables: [
      {
        title: "Campaign brief",
        copy:
          "The approved audience, match categories, exclusions, schedule constraints, and purpose of the campaign in one reference.",
        label: "Brief locked",
      },
      {
        title: "Meeting schedule",
        copy:
          "Confirmed times, attendees, locations, status, and meeting categories organized for the team on the floor.",
        label: "Schedule current",
      },
      {
        title: "Meeting briefs",
        copy:
          "Company context, contact role, documented match rationale, and a suggested discussion point for each confirmed meeting.",
        label: "Context ready",
      },
      {
        title: "Follow-through view",
        copy:
          "Warm but unbooked companies, post-show meeting scores, follow-up priority, and next-step ownership.",
        label: "Follow-up routed",
      },
    ],
    scenario: {
      label: "Illustrative operations view — not client results",
      title: "A clear handoff for a software exhibitor.",
      copy:
        "A B2B software provider is exhibiting at a sector conference to explore partner, integration, and channel relationships. Exhibit Meetings translates the approved criteria and exclusions into a target plan, coordinates interested contacts around the attending team’s schedule, and packages each confirmed conversation with the context needed for show week.",
      fields: [
        ["Exhibitor profile", "B2B software provider"],
        ["Show objective", "Partner, integration, and channel conversations"],
        ["Priority roles", "Partnerships, business development, commercial leaders"],
        ["Availability", "Show Day 1 · morning through mid-afternoon"],
        ["Meeting status", "Confirmed"],
        ["Match rationale", "Complementary offering with potential integration fit"],
      ],
    },
    faq: [
      [
        "How is a qualified meeting defined?",
        "The contact and company must meet the criteria approved for the show, a specific date and time must be confirmed, and the record must include a clear reason the match makes sense.",
      ],
      [
        "What information is needed to begin?",
        "The exact event, audience criteria, priority accounts, exclusions, attendee details, meeting availability, and a concise explanation of why the right company should want the conversation.",
      ],
      [
        "How are schedule changes handled?",
        "Confirmations, reschedules, cancellations, and location details remain part of the meeting record so the final handoff reflects the current plan.",
      ],
      [
        "Are bookings or business outcomes guaranteed?",
        "No. Results depend on the event, audience fit, timing, relevance, availability, and prospect responsiveness.",
      ],
    ],
    closingHeading: "Give show week a working meeting plan.",
    closingCopy:
      "Share the event, your target criteria, and the schedule your team can support.",
    about: {
      headline: "Meeting operations that keep the show team aligned.",
      lede:
        "Exhibit Meetings is a managed trade show meeting support brand operated by Exhibit Connect LLC in New Jersey.",
      sections: [
        [
          "Designed around the event",
          "Every engagement is tied to a specific show and a defined audience. The work begins with the companies, roles, relationship types, exclusions, and schedule that matter to the team attending.",
        ],
        [
          "Structured from criteria to calendar",
          "Exhibit Meetings organizes the operational path from target definition through confirmation and handoff. The goal is a schedule the team can use, supported by clear meeting context and follow-up structure.",
        ],
        [
          "Clear expectations",
          "We distinguish confirmed meetings from general interest and keep the reason for each match visible. Meeting volume, attendance, revenue, and other business outcomes are not guaranteed, and opt-out or removal requests are honored.",
        ],
      ],
    },
  },
  {
    dir: "expobookings",
    domain: "expobookings.co",
    brand: "Expo Bookings",
    initials: "EB",
    theme: "expo",
    title: "Expo Bookings | Practical Trade Show Meeting Support",
    description:
      "Expo Bookings helps B2B exhibitors organize relevant trade show conversations, meeting details, and follow-up materials with a clear process.",
    eyebrow: "Practical meeting support for B2B exhibitors",
    hero: "A calmer calendar before the show begins.",
    lede:
      "Expo Bookings helps you decide who is worth meeting, coordinate relevant conversations, and keep every confirmation and briefing detail in order—without turning show preparation into another project for your team.",
    primaryCta: "Plan your show calendar",
    processHeading: "From show details to a schedule your team can use.",
    processIntro:
      "We keep the work focused, the communication clear, and the calendar grounded in the availability you approve.",
    process: [
      {
        number: "01",
        stage: "Priorities",
        title: "Set the priorities",
        copy:
          "Share the show, available meeting windows, the organizations and roles you want to meet, priority accounts, and any exclusions.",
      },
      {
        number: "02",
        stage: "Fit",
        title: "Curate likely fits",
        copy:
          "Review the show landscape against your criteria and record a practical reason each potential conversation may be useful.",
      },
      {
        number: "03",
        stage: "Care",
        title: "Coordinate with care",
        copy:
          "Use clear, show-specific communication and approved times while honoring opt-out and removal requests.",
      },
      {
        number: "04",
        stage: "Ready",
        title: "Prepare your team",
        copy:
          "Before the show, give the team an organized calendar and concise context for each confirmed conversation.",
      },
    ],
    deliverablesHeading: "Useful materials, without unnecessary complexity.",
    deliverables: [
      {
        title: "Booking timeline",
        copy:
          "A simple view of preparation milestones, approved meeting windows, and handoff dates.",
        label: "Plan at a glance",
      },
      {
        title: "Confirmed calendar",
        copy:
          "Each scheduled conversation includes the time, contact, role, company, location, and agreed match category.",
        label: "Times organized",
      },
      {
        title: "Concise briefs",
        copy:
          "A short company summary, the contact’s role, the reason the match makes sense, and a suggested talking point.",
        label: "Context included",
      },
      {
        title: "Follow-up view",
        copy:
          "Interested but unscheduled organizations plus a post-show scorecard for attendance, meeting quality, and next steps.",
        label: "Next steps visible",
      },
    ],
    scenario: {
      label: "Illustrative show plan — not client results",
      title: "A focused schedule for a founder-led supplier.",
      copy:
        "A founder-led B2B supplier is preparing for an industry expo with limited booth availability. The team wants to meet potential distributors and complementary partners—not rely on general booth traffic. Expo Bookings translates those priorities into clear criteria, coordinates interested contacts into approved times, and prepares the team with a calendar and concise briefs.",
      fields: [
        ["Show goal", "Meet potential distributors and complementary partners"],
        ["Guardrails", "Competitors, current relationships, and blocked times excluded"],
        ["Example rationale", "Distribution fit in a market the exhibitor wants to understand"],
        ["Meeting window", "Day 2 · 10:00 AM–2:30 PM"],
        ["Handoff", "Confirmed times, conversation context, and follow-up view"],
      ],
    },
    faq: [
      [
        "Who is Expo Bookings for?",
        "B2B exhibitors with a clear reason to meet buyers, distributors, suppliers, channel partners, OEM partners, or complementary businesses at a specific show.",
      ],
      [
        "What do you need from our team?",
        "The exact show, meeting goals, preferred company and role types, priority accounts, exclusions, the person taking meetings, and that person’s availability.",
      ],
      [
        "What will we receive before the show?",
        "The standard handoff includes a confirmed meeting calendar and a concise brief for each scheduled conversation. The exact scope is documented separately before work begins.",
      ],
      [
        "Do you guarantee a full calendar?",
        "No. Meeting volume, attendance, and commercial outcomes depend on show fit, timing, audience quality, availability, and prospect response.",
      ],
    ],
    closingHeading: "Bring us the show. We’ll help organize the conversations around it.",
    closingCopy:
      "Tell us the show, your goals, your available schedule, and the kinds of organizations or roles you hope to meet.",
    about: {
      headline: "Trade show meeting support with a human touch.",
      lede:
        "Expo Bookings is a service brand operated by Exhibit Connect LLC. We help B2B exhibitors prepare relevant show conversations while keeping communication, scheduling, and handoff details clear for both sides.",
      sections: [
        [
          "Why we exist",
          "A show calendar can become complicated quickly. Our role is to make the preparation easier to follow: clarify who is worth meeting, organize the available schedule, coordinate genuine interest, and give the booth team useful context before each conversation.",
        ],
        [
          "How we work",
          "We begin with the client’s goals and boundaries. Every potential match should fit an approved company or role category and have a documented reason for the conversation.",
        ],
        [
          "Our standard",
          "We favor relevant, well-documented conversations over raw activity. We do not promise a full calendar or a business outcome. Results depend on fit, timing, participation, and prospect responsiveness.",
        ],
      ],
    },
  },
  {
    dir: "exhibitconnect",
    domain: "exhibitconnect.co",
    brand: "Exhibit Connect",
    initials: "EC",
    theme: "connect",
    title: "Exhibit Connect | Trade Show Meeting Strategy and Coordination",
    description:
      "Exhibit Connect helps B2B exhibitors move from show research and match strategy to coordinated meetings, meeting briefs, and post-show follow-up.",
    eyebrow: "Research-to-report meeting support for B2B exhibitors",
    hero: "Walk into show week knowing who matters—and why.",
    lede:
      "Exhibit Connect turns your show goals into a focused target strategy, coordinated conversations, clear meeting briefs, and an actionable post-show view. We manage the workflow so your team can focus on the conversations themselves.",
    primaryCta: "Build your show plan",
    processHeading: "One connected process, from first brief to final follow-up.",
    processIntro:
      "Each stage builds on agreed goals, target criteria, exclusions, and availability. Weak or unexplained matches do not belong in the plan.",
    process: [
      {
        number: "01",
        stage: "Objective",
        title: "Define the objective",
        copy:
          "Establish the show, meeting goals, approved company and role categories, priority accounts, exclusions, booth team, and available times.",
      },
      {
        number: "02",
        stage: "Research",
        title: "Research the show",
        copy:
          "Review the exhibitor landscape and develop a focused set of organizations that align with the approved brief.",
      },
      {
        number: "03",
        stage: "Rationale",
        title: "Document the match",
        copy:
          "Assign a specific rationale to each potential conversation, such as buyer fit, distribution, sourcing, OEM alignment, or a complementary partnership.",
      },
      {
        number: "04",
        stage: "Confirm",
        title: "Coordinate and confirm",
        copy:
          "Use direct, show-specific communication, manage interested responses and scheduling details, and honor opt-out or removal requests.",
      },
      {
        number: "05",
        stage: "Follow-up",
        title: "Brief, report, and follow through",
        copy:
          "Deliver the confirmed calendar and meeting briefs, then organize warm follow-up opportunities and a post-show scorecard.",
      },
    ],
    deliverablesHeading: "A clear view before, during, and after the show.",
    deliverables: [
      {
        title: "Focused show map",
        copy:
          "A screened view of organizations aligned with the approved meeting strategy and exclusions.",
        label: "Audience mapped",
      },
      {
        title: "Match rationale record",
        copy:
          "A documented reason each selected organization may be worth a conversation.",
        label: "Fit documented",
      },
      {
        title: "Confirmed calendar",
        copy:
          "Scheduled times with the contact, role, company, location, and match category clearly identified.",
        label: "Schedule ready",
      },
      {
        title: "Meeting briefs",
        copy:
          "Concise company context, the contact’s role, the match rationale, and a suggested point to explore.",
        label: "Team briefed",
      },
      {
        title: "Follow-up scorecard",
        copy:
          "A structured place to record attendance, quality, follow-up priority, and the next action after the show.",
        label: "Outcomes routed",
      },
    ],
    scenario: {
      label: "Illustrative workflow — not client results",
      title: "Turning a broad show goal into a usable meeting plan.",
      copy:
        "A B2B component manufacturer is preparing for an industry show and wants conversations with distributors, OEM partners, and complementary suppliers. Direct competitors and existing accounts need to be excluded. Exhibit Connect turns that brief into a screened set of exhibiting companies, records a match rationale for each potential conversation, coordinates interested contacts, and prepares the booth team with confirmed times and concise meeting briefs.",
      fields: [
        ["Objective", "Distribution, OEM, and complementary partnership opportunities"],
        ["Exclusions", "Direct competitors and existing relationships"],
        ["Match rationale", "Complementary product fit with a commercial reason to meet"],
        ["Meeting brief", "Contact context, company summary, rationale, discussion point"],
        ["Post-show view", "Attendance, quality, follow-up priority, and next action"],
      ],
    },
    faq: [
      [
        "What does Exhibit Connect handle?",
        "We support the workflow from meeting-goal definition and show research through match rationale, interested-response coordination, calendar preparation, meeting briefs, and post-show follow-up structure.",
      ],
      [
        "What makes a meeting relevant?",
        "The contact should fit an approved role and match category, the company should align with the show-specific brief, a specific time should be confirmed, and there should be a documented reason the conversation makes sense.",
      ],
      [
        "What does our team need to provide?",
        "The exact show, business objective, target company and role types, priority accounts, exclusions, the person taking meetings, and the schedule available for conversations.",
      ],
      [
        "Does Exhibit Connect guarantee results?",
        "No. We do not guarantee responses, meeting volume, attendance, revenue, partnerships, deliverability, inbox placement, or another specific outcome.",
      ],
    ],
    closingHeading: "Make your next show plan concrete.",
    closingCopy:
      "Share the show, the relationships you want to build, and the schedule your team can support.",
    about: {
      headline: "A more deliberate way to prepare the conversations around a trade show.",
      lede:
        "Exhibit Connect is the primary service brand of Exhibit Connect LLC. We support B2B exhibitors across the meeting workflow—from defining the opportunity and researching the show to coordinating interest, preparing briefs, and organizing post-show follow-up.",
      sections: [
        [
          "Built for fit, not foot traffic",
          "The service is designed for exhibitors with a clear commercial reason to meet specific buyers, distributors, suppliers, channel partners, OEM partners, or complementary businesses.",
        ],
        [
          "One connected workflow",
          "Show research, match rationale, communication, scheduling, meeting context, and post-show review work best as one continuous process. Keeping those stages connected gives the booth team a clearer understanding of who they are meeting and why.",
        ],
        [
          "Accountability without inflated promises",
          "We document why a match belongs, keep confirmations organized, and make the handoff useful. We do not guarantee a particular number of meetings or a commercial outcome.",
        ],
      ],
    },
  },
];

const html = String.raw;

function escapeJson(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function schema(site) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand,
    legalName: operator.legalName,
    url: `https://www.${site.domain}/`,
    email: operator.email,
    areaServed: "United States",
    address: {
      "@type": "PostalAddress",
      addressRegion: "NJ",
      addressCountry: "US",
    },
  };
}

function head(site, { title, description, path, noindex = false }) {
  const url = `https://www.${site.domain}${path}`;
  const image = `https://www.${site.domain}/assets/og.png`;
  const imageAlt = `${site.brand} — ${site.hero}`;
  return html`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
${noindex ? '  <meta name="robots" content="noindex, follow">\n' : ""}  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${url}">
  <meta property="og:site_name" content="${site.brand}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${imageAlt}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${image}">
  <meta name="twitter:image:alt" content="${imageAlt}">
  <link rel="icon" href="/assets/favicon.png" type="image/png" sizes="64x64">
  <link rel="stylesheet" href="/assets/site.css?v=20260709">
  <script type="application/ld+json">${escapeJson(schema(site))}</script>
</head>`;
}

function brandMark(site) {
  return html`<span class="brand-mark brand-mark--${site.theme}" aria-hidden="true"><span>${site.initials}</span></span>`;
}

function header(site, currentPath) {
  const current = (path) => (currentPath === path ? ' aria-current="page"' : "");
  return html`<a class="skip-link" href="#main-content">Skip to content</a>
<header class="site-header">
  <a class="brand" href="/" aria-label="${site.brand} home">
    ${brandMark(site)}
    <span class="brand-name">${site.brand}</span>
  </a>
  <nav aria-label="Primary navigation">
    <a href="/#process">Process</a>
    <a href="/#deliverables">Deliverables</a>
    <a href="/about/"${current("/about/")}>About</a>
    <a class="nav-contact" href="/contact/"${current("/contact/")}>Contact</a>
  </nav>
</header>`;
}

function footer(site) {
  return html`<footer class="site-footer">
  <div class="footer-brand">
    <a class="brand" href="/" aria-label="${site.brand} home">
      ${brandMark(site)}
      <span class="brand-name">${site.brand}</span>
    </a>
    <p>Operated by Exhibit Connect LLC.</p>
    <p>New Jersey, USA.</p>
  </div>
  <div class="footer-contact">
    <p class="footer-label">Questions or removal requests</p>
    <a href="mailto:${operator.email}">${operator.email}</a>
  </div>
  <nav aria-label="Footer navigation">
    <a href="/about/">About</a>
    <a href="/contact/">Contact</a>
    <a href="/privacy/">Privacy</a>
    <a href="/terms/">Terms</a>
    <a href="/sitemap.xml">Sitemap</a>
  </nav>
</footer>`;
}

function layout(site, meta, body, { currentPath = meta.path, noindex = false } = {}) {
  return html`${head(site, { ...meta, noindex })}
<body class="theme-${site.theme}">
  ${header(site, currentPath)}
  <main id="main-content">
    ${body}
  </main>
  ${footer(site)}
</body>
</html>
`;
}

function heroActions(site, secondaryLabel = "See the process") {
  return html`<div class="hero-actions">
  <a class="button" href="/contact/">${site.primaryCta}</a>
  <a class="text-link" href="#process">${secondaryLabel}<span aria-hidden="true"> ↓</span></a>
</div>`;
}

function processSection(site) {
  return html`<section class="section process-section" id="process" aria-labelledby="process-heading">
  <div class="section-intro">
    <p class="eyebrow">The process</p>
    <h2 id="process-heading">${site.processHeading}</h2>
    <p>${site.processIntro}</p>
  </div>
  <div class="process-grid process-grid--${site.process.length}">
    ${site.process
      .map(
        (item) => html`<article class="process-card">
      <div class="process-meta"><span>${item.number}</span><span>${item.stage}</span></div>
      <h3>${item.title}</h3>
      <p>${item.copy}</p>
    </article>`,
      )
      .join("\n")}
  </div>
</section>`;
}

function deliverablesSection(site) {
  return html`<section class="section deliverables-section" id="deliverables" aria-labelledby="deliverables-heading">
  <div class="section-intro section-intro--split">
    <div>
      <p class="eyebrow">What you receive</p>
      <h2 id="deliverables-heading">${site.deliverablesHeading}</h2>
    </div>
    <p>Every item is organized around the approved show, audience, exclusions, and schedule—not generic activity.</p>
  </div>
  <div class="deliverables-grid">
    ${site.deliverables
      .map(
        (item, index) => html`<article class="deliverable-card deliverable-card--${index + 1}">
      <span class="status-chip">${item.label}</span>
      <h3>${item.title}</h3>
      <p>${item.copy}</p>
    </article>`,
      )
      .join("\n")}
  </div>
</section>`;
}

function scenarioSection(site) {
  return html`<section class="section scenario-section" aria-labelledby="scenario-heading">
  <div class="scenario-copy">
    <p class="eyebrow">${site.scenario.label}</p>
    <h2 id="scenario-heading">${site.scenario.title}</h2>
    <p>${site.scenario.copy}</p>
    <p class="fine-print">This anonymized example illustrates the service process. It is not a client identity, testimonial, performance claim, or guaranteed outcome.</p>
  </div>
  <div class="brief-board" role="img" aria-label="Illustrative anonymized show planning brief">
    <div class="brief-board__header">
      <span>Show brief</span>
      <span class="status-dot">Illustrative</span>
    </div>
    <dl>
      ${site.scenario.fields
        .map(([term, detail]) => html`<div><dt>${term}</dt><dd>${detail}</dd></div>`)
        .join("\n")}
    </dl>
  </div>
</section>`;
}

function faqSection(site) {
  return html`<section class="section faq-section" id="faq" aria-labelledby="faq-heading">
  <div class="section-intro">
    <p class="eyebrow">Common questions</p>
    <h2 id="faq-heading">Clear answers before the first brief.</h2>
  </div>
  <div class="faq-list">
    ${site.faq
      .map(
        ([question, answer], index) => html`<details${index === 0 ? " open" : ""}>
      <summary>${question}</summary>
      <p>${answer}</p>
    </details>`,
      )
      .join("\n")}
    <details>
      <summary>How are opt-out and removal requests handled?</summary>
      <p>Requests are honored. Email <a href="mailto:${operator.email}">${operator.email}</a> with the address that received the message so the request can be processed accurately.</p>
    </details>
  </div>
</section>`;
}

function closingSection(site) {
  return html`<section class="section closing-section" aria-labelledby="closing-heading">
  <div>
    <p class="eyebrow">Planning an upcoming show?</p>
    <h2 id="closing-heading">${site.closingHeading}</h2>
    <p>${site.closingCopy} We normally respond ${operator.responseTime}.</p>
  </div>
  <div class="closing-actions">
    <a class="button button--light" href="/contact/">Discuss your next show</a>
    <a href="mailto:${operator.email}">${operator.email}</a>
  </div>
</section>`;
}

function boothHero(site) {
  return html`<section class="hero hero--booth">
  <div class="hero-copy">
    <p class="eyebrow">${site.eyebrow}</p>
    <h1>${site.hero}</h1>
    <p class="lede">${site.lede}</p>
    ${heroActions(site)}
    <p class="hero-note">Clear criteria <span>·</span> Useful context <span>·</span> Organized follow-up</p>
  </div>
  <div class="booth-plan" role="img" aria-label="Illustrative modular booth meeting plan">
    <div class="booth-plan__top"><span>BOOTH PLAN</span><span>SHOW 214</span></div>
    <div class="booth-grid">
      <span class="booth-grid__wall"></span><span class="booth-grid__wall"></span><span class="booth-grid__wall"></span>
      <div class="booth-grid__table"><span>MEET</span></div>
      <div class="booth-grid__station">A</div><div class="booth-grid__station">B</div>
    </div>
    <div class="booth-plan__brief">
      <span>Before</span><strong>Priority relationships</strong>
      <span>During</span><strong>Prepared conversations</strong>
      <span>After</span><strong>Owned next steps</strong>
    </div>
  </div>
</section>`;
}

function meetingsHero(site) {
  return html`<section class="hero hero--meetings">
  <div class="hero-copy">
    <p class="eyebrow">${site.eyebrow}</p>
    <h1>${site.hero}</h1>
    <p class="lede">${site.lede}</p>
    ${heroActions(site, "View the workflow")}
    <p class="hero-note">Documented fit <span>·</span> Current status <span>·</span> Clear handoff</p>
  </div>
  <div class="operations-board" role="img" aria-label="Illustrative meeting operations board">
    <div class="operations-board__header"><span>SHOW OPERATIONS</span><span class="live-pill">READY</span></div>
    <div class="operations-board__stats">
      <div><span>Brief</span><strong>Approved</strong></div>
      <div><span>Schedule</span><strong>Current</strong></div>
      <div><span>Team</span><strong>Prepared</strong></div>
    </div>
    <div class="schedule-row"><time>9:30</time><div><strong>Channel conversation</strong><span>Partner fit · Booth meeting</span></div><b>01</b></div>
    <div class="schedule-row"><time>11:00</time><div><strong>Integration discussion</strong><span>Product alignment · Meeting room</span></div><b>02</b></div>
    <div class="schedule-row"><time>1:45</time><div><strong>Commercial introduction</strong><span>Named account · Booth meeting</span></div><b>03</b></div>
  </div>
</section>`;
}

function expoHero(site) {
  return html`<section class="hero hero--expo">
  <div class="hero-copy">
    <p class="eyebrow">${site.eyebrow}</p>
    <h1>${site.hero}</h1>
    <p class="lede">${site.lede}</p>
    ${heroActions(site)}
    <p class="hero-note">Clear criteria <span>·</span> Respectful communication <span>·</span> Organized handoff</p>
  </div>
  <div class="booking-card" role="img" aria-label="Illustrative expo booking timeline">
    <div class="booking-card__header"><span>SHOW WEEK</span><strong>Calendar ready</strong></div>
    <ol class="booking-timeline">
      <li><span>01</span><div><strong>Priorities set</strong><small>Goals, roles, guardrails</small></div></li>
      <li><span>02</span><div><strong>Likely fits curated</strong><small>Reason to meet recorded</small></div></li>
      <li><span>03</span><div><strong>Times coordinated</strong><small>Approved windows only</small></div></li>
      <li><span>04</span><div><strong>Team prepared</strong><small>Calendar and briefs</small></div></li>
    </ol>
  </div>
</section>`;
}

function connectHero(site) {
  return html`<section class="hero hero--connect">
  <div class="hero-copy">
    <p class="eyebrow">${site.eyebrow}</p>
    <h1>${site.hero}</h1>
    <p class="lede">${site.lede}</p>
    ${heroActions(site, "Explore the workflow")}
    <p class="hero-note">Documented fit <span>·</span> Clear coordination <span>·</span> Useful handoff</p>
  </div>
  <div class="workflow-map" role="img" aria-label="Illustrative research-to-report workflow">
    <div class="workflow-map__center"><span>EC</span><strong>Show plan</strong></div>
    <div class="workflow-node workflow-node--1"><b>01</b><span>Objective</span></div>
    <div class="workflow-node workflow-node--2"><b>02</b><span>Research</span></div>
    <div class="workflow-node workflow-node--3"><b>03</b><span>Rationale</span></div>
    <div class="workflow-node workflow-node--4"><b>04</b><span>Confirm</span></div>
    <div class="workflow-node workflow-node--5"><b>05</b><span>Follow-up</span></div>
  </div>
</section>`;
}

function home(site) {
  const heroes = {
    booth: boothHero,
    meetings: meetingsHero,
    expo: expoHero,
    connect: connectHero,
  };
  const hero = heroes[site.theme](site);
  const body =
    site.theme === "meetings"
      ? html`${hero}${deliverablesSection(site)}${processSection(site)}${scenarioSection(site)}${faqSection(site)}${closingSection(site)}`
      : site.theme === "expo"
        ? html`${hero}${processSection(site)}${scenarioSection(site)}${deliverablesSection(site)}${faqSection(site)}${closingSection(site)}`
        : html`${hero}${processSection(site)}${deliverablesSection(site)}${scenarioSection(site)}${faqSection(site)}${closingSection(site)}`;
  return layout(
    site,
    { title: site.title, description: site.description, path: "/" },
    body,
    { currentPath: "/" },
  );
}

function about(site) {
  const cards = site.about.sections
    .map(
      ([title, copy], index) => html`<article class="about-card">
    <span class="about-number">0${index + 1}</span>
    <h2>${title}</h2>
    <p>${copy}</p>
  </article>`,
    )
    .join("\n");
  const body = html`<section class="page-hero">
  <p class="eyebrow">About ${site.brand}</p>
  <h1>${site.about.headline}</h1>
  <p class="lede">${site.about.lede}</p>
</section>
<section class="section about-grid" aria-label="How ${site.brand} works">
  ${cards}
</section>
<section class="section identity-panel">
  <div>
    <p class="eyebrow">Company identity</p>
    <h2>A focused service, with one accountable operator.</h2>
  </div>
  <div>
    <p>${site.brand} is operated by ${operator.legalName}, based in ${operator.location}. Business communication should be relevant to the show and easy to decline. Opt-out and removal requests are honored.</p>
    <p>Submitting an inquiry does not create a client relationship. Any paid work requires a separate written agreement defining scope, timing, deliverables, and commercial terms.</p>
    <a class="text-link" href="/contact/">Contact ${site.brand}<span aria-hidden="true"> →</span></a>
  </div>
</section>`;
  return layout(site, {
    title: `About ${site.brand} | Exhibit Connect LLC`,
    description: `Learn how ${site.brand} provides practical trade show meeting support for B2B exhibitors.`,
    path: "/about/",
  }, body);
}

function contact(site) {
  const next = `https://www.${site.domain}/thank-you/`;
  const body = html`<section class="page-hero page-hero--contact">
  <p class="eyebrow">Contact ${site.brand}</p>
  <h1>Start with the show, the goal, and the people attending.</h1>
  <p class="lede">Share what your team is preparing for. We normally respond ${operator.responseTime} to discuss fit, boundaries, and next steps.</p>
</section>
<section class="section contact-layout">
  <form class="contact-form" action="https://formsubmit.co/${operator.email}" method="POST">
    <input type="hidden" name="_subject" value="New inquiry from ${site.brand}">
    <input type="hidden" name="_next" value="${next}">
    <input type="hidden" name="_captcha" value="false">
    <input type="text" name="_honey" class="honeypot" tabindex="-1" autocomplete="off" aria-hidden="true">
    <div class="form-row">
      <label>Name <input name="name" type="text" autocomplete="name" required></label>
      <label>Company <input name="company" type="text" autocomplete="organization"></label>
    </div>
    <label>Email <input name="email" type="email" autocomplete="email" required></label>
    <label>Upcoming show <input name="show" type="text" placeholder="Show name and dates"></label>
    <label>Meeting goal <input name="goal" type="text" placeholder="Who would make the show more useful?"></label>
    <label>Message <textarea name="message" rows="6" required></textarea></label>
    <button class="button" type="submit">Send inquiry</button>
    <p class="form-note">Your information is used to respond to this inquiry and manage the business relationship. Read the <a href="/privacy/">Privacy Policy</a>.</p>
  </form>
  <aside class="contact-card">
    <p class="eyebrow">Direct contact</p>
    <h2>Prefer email?</h2>
    <a class="contact-email" href="mailto:${operator.email}">${operator.email}</a>
    <dl>
      <div><dt>Operator</dt><dd>${operator.legalName}</dd></div>
      <div><dt>Location</dt><dd>${operator.location}</dd></div>
      <div><dt>Response</dt><dd>Normally ${operator.responseTime}</dd></div>
    </dl>
    <p class="fine-print">For an outreach removal request, include the address that received the message so the request can be processed accurately.</p>
  </aside>
</section>`;
  return layout(site, {
    title: `Contact ${site.brand}`,
    description: `Contact ${site.brand} about trade show meeting preparation and coordination.`,
    path: "/contact/",
  }, body);
}

function privacy(site) {
  const body = html`<section class="page-hero page-hero--legal">
  <p class="eyebrow">Privacy Policy</p>
  <h1>How we handle inquiry and business contact information.</h1>
  <p class="lede">Last updated July 9, 2026.</p>
</section>
<section class="section legal-copy">
  <h2>Who operates this site</h2>
  <p>${site.brand} is operated by ${operator.legalName}, based in ${operator.location}. Contact us at <a href="mailto:${operator.email}">${operator.email}</a>.</p>
  <h2>Information we collect</h2>
  <p>When you submit a form or email us, we receive the information you provide, such as your name, company, email address, show details, meeting goals, and message content. Our hosting provider may also process standard request and security logs needed to serve and protect the site.</p>
  <h2>How we use information</h2>
  <p>We use inquiry information to respond, evaluate service fit, coordinate requested business communication, maintain necessary records, and honor opt-out or removal requests.</p>
  <h2>Service providers</h2>
  <p>Vercel hosts this website. FormSubmit processes website form submissions, and Google Workspace receives and stores business email. These providers process information as needed to operate the site and communication workflow.</p>
  <h2>Cookies and analytics</h2>
  <p>This site does not use advertising trackers, analytics scripts, or a user-account system. We do not set application cookies. Hosting and security providers may use essential technical mechanisms or logs to operate their services.</p>
  <h2>Outreach and opt-out requests</h2>
  <p>If you received a business outreach message and want no further contact, email <a href="mailto:${operator.email}">${operator.email}</a> with the address that received the message. We will use that information to process the request and reflect it in future outreach handling.</p>
  <h2>Retention and your choices</h2>
  <p>We retain business inquiry, communication, and suppression records for as long as reasonably needed for service, compliance, dispute resolution, and opt-out handling. You may request access, correction, or deletion by contacting us. Some records may be retained where needed for legitimate business, legal, or suppression-list purposes.</p>
</section>`;
  return layout(site, {
    title: `Privacy Policy | ${site.brand}`,
    description: `Privacy Policy for ${site.brand}, operated by ${operator.legalName}.`,
    path: "/privacy/",
  }, body);
}

function terms(site) {
  const body = html`<section class="page-hero page-hero--legal">
  <p class="eyebrow">Terms</p>
  <h1>Website terms and service inquiry conditions.</h1>
  <p class="lede">Last updated July 9, 2026.</p>
</section>
<section class="section legal-copy">
  <h2>Site operator</h2>
  <p>${site.brand} is operated by ${operator.legalName}, based in ${operator.location}. Contact: <a href="mailto:${operator.email}">${operator.email}</a>.</p>
  <h2>Website use</h2>
  <p>You may use this website to learn about our trade show meeting support services and contact us about potential work. Do not misuse the site, submit false information, or interfere with its operation.</p>
  <h2>No guaranteed outcomes</h2>
  <p>Website content describes our service approach and illustrative workflows. We do not guarantee responses, meeting volume, attendance, revenue, partnerships, deliverability, inbox placement, search ranking, or another specific business result.</p>
  <h2>Service discussions</h2>
  <p>Submitting a form or emailing us does not create a client relationship. Any paid work requires a separate written agreement defining scope, timing, deliverables, responsibilities, and commercial terms.</p>
  <h2>Content accuracy</h2>
  <p>We aim to keep this site accurate and current, but service information may change. Illustrative examples are not named client engagements, testimonials, or performance claims.</p>
  <h2>Limitation</h2>
  <p>To the extent permitted by law, this website is provided as-is and ${operator.legalName} is not liable for indirect or consequential damages arising from website use.</p>
</section>`;
  return layout(site, {
    title: `Terms | ${site.brand}`,
    description: `Website terms for ${site.brand}, operated by ${operator.legalName}.`,
    path: "/terms/",
  }, body);
}

function thankYou(site) {
  const body = html`<section class="page-hero response-page">
  <div class="response-mark" aria-hidden="true">✓</div>
  <p class="eyebrow">Inquiry received</p>
  <h1>Thank you. Your show details are on their way.</h1>
  <p class="lede">We normally respond ${operator.responseTime}. If the matter is time-sensitive, email <a href="mailto:${operator.email}">${operator.email}</a>.</p>
  <div class="hero-actions">
    <a class="button" href="/">Return home</a>
    <a class="text-link" href="/about/">How ${site.brand} works<span aria-hidden="true"> →</span></a>
  </div>
</section>`;
  return layout(
    site,
    {
      title: `Thank You | ${site.brand}`,
      description: `Your ${site.brand} inquiry was received.`,
      path: "/thank-you/",
    },
    body,
    { currentPath: "", noindex: true },
  );
}

function notFound(site) {
  const body = html`<section class="page-hero response-page">
  <div class="response-mark response-mark--404" aria-hidden="true">404</div>
  <p class="eyebrow">Page not found</p>
  <h1>That page is not part of the show plan.</h1>
  <p class="lede">Return to the main site or contact us directly.</p>
  <div class="hero-actions">
    <a class="button" href="/">Return home</a>
    <a class="text-link" href="/contact/">Contact ${site.brand}<span aria-hidden="true"> →</span></a>
  </div>
</section>`;
  return layout(
    site,
    {
      title: `Page Not Found | ${site.brand}`,
      description: `The requested page was not found on ${site.brand}.`,
      path: "/404.html",
    },
    body,
    { currentPath: "", noindex: true },
  );
}

const palettes = {
  booth: {
    paper: "#f4efe4",
    surface: "#fffaf0",
    ink: "#181713",
    body: "#413d34",
    muted: "#665f52",
    line: "#d4c8b3",
    accent: "#725012",
    accentStrong: "#2a2418",
    accentSoft: "#e5c978",
    focus: "#005fcc",
  },
  meetings: {
    paper: "#f3f7f8",
    surface: "#ffffff",
    ink: "#0b2942",
    body: "#2f4758",
    muted: "#526875",
    line: "#c8d9de",
    accent: "#006d75",
    accentStrong: "#0b2942",
    accentSoft: "#f0672e",
    focus: "#b83800",
  },
  expo: {
    paper: "#f6f0e7",
    surface: "#fffaf4",
    ink: "#173d2c",
    body: "#425449",
    muted: "#617066",
    line: "#d9cbb9",
    accent: "#9f3f29",
    accentStrong: "#173d2c",
    accentSoft: "#d99a78",
    focus: "#004f9e",
  },
  connect: {
    paper: "#f1f4ec",
    surface: "#fbfcf7",
    ink: "#123526",
    body: "#354c40",
    muted: "#5b6c63",
    line: "#cad5ca",
    accent: "#17543b",
    accentStrong: "#0c2d20",
    accentSoft: "#c99a45",
    focus: "#005fcc",
  },
};

function css(site) {
  const color = palettes[site.theme];
  return html`:root {
  color-scheme: light;
  --paper: ${color.paper};
  --surface: ${color.surface};
  --ink: ${color.ink};
  --body: ${color.body};
  --muted: ${color.muted};
  --line: ${color.line};
  --accent: ${color.accent};
  --accent-strong: ${color.accentStrong};
  --accent-soft: ${color.accentSoft};
  --focus: ${color.focus};
  --white: #ffffff;
  --shadow: 0 24px 70px rgba(18, 35, 28, 0.11);
  --radius: 22px;
  --content: 1180px;
}

* { box-sizing: border-box; }
html { font-size: 16px; scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--paper);
  color: var(--body);
  font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.65;
  text-rendering: optimizeLegibility;
}
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(circle at 78% 7%, color-mix(in srgb, var(--accent-soft) 22%, transparent), transparent 31%);
}
a { color: var(--accent); }
a:focus, button:focus, input:focus, textarea:focus, summary:focus,
a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible, summary:focus-visible {
  outline: 3px solid var(--focus);
  outline-offset: 4px;
}
.skip-link {
  position: fixed;
  left: 16px;
  top: 12px;
  z-index: 100;
  transform: translateY(-180%);
  padding: 12px 16px;
  border-radius: 8px;
  background: var(--ink);
  color: white;
  font-weight: 800;
}
.skip-link:focus { transform: translateY(0); }
.site-header, .site-footer, .hero, .section, .page-hero {
  width: min(var(--content), calc(100% - 40px));
  margin-inline: auto;
}
.site-header {
  min-height: 86px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  border-bottom: 1px solid var(--line);
}
.brand {
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--ink);
  font-weight: 850;
  text-decoration: none;
  letter-spacing: -0.02em;
}
.brand-mark {
  width: 42px;
  height: 42px;
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  position: relative;
  overflow: hidden;
  background: var(--accent-strong);
  color: var(--white);
  border: 2px solid color-mix(in srgb, var(--accent-soft) 75%, white);
  font-size: 0.67rem;
  line-height: 1;
  letter-spacing: -0.05em;
}
.brand-mark span { position: relative; z-index: 2; }
.brand-mark--booth { border-radius: 4px; box-shadow: inset -10px 0 var(--accent); }
.brand-mark--meetings { border-radius: 12px 12px 3px 12px; }
.brand-mark--meetings::after { content: ""; position: absolute; width: 18px; height: 6px; right: -1px; top: 7px; background: var(--accent-soft); }
.brand-mark--expo { border-radius: 8px; clip-path: polygon(50% 0, 100% 20%, 100% 88%, 50% 100%, 0 88%, 0 20%); }
.brand-mark--connect { transform: rotate(45deg); border-radius: 8px; }
.brand-mark--connect span { transform: rotate(-45deg); }
.site-header nav, .site-footer nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}
.site-header nav a, .site-footer nav a {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 999px;
  color: var(--body);
  font-size: 0.94rem;
  font-weight: 700;
  text-decoration: none;
}
.site-header nav a:hover, .site-header nav a[aria-current="page"], .site-footer nav a:hover {
  color: var(--ink);
  background: color-mix(in srgb, var(--accent-soft) 20%, transparent);
}
.site-header .nav-contact { margin-left: 6px; color: white; background: var(--accent-strong); }
.site-header .nav-contact:hover, .site-header .nav-contact[aria-current="page"] { color: white; background: var(--accent); }
main { min-height: 68vh; overflow: clip; }
.hero {
  min-height: 710px;
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(380px, 0.98fr);
  gap: clamp(44px, 7vw, 96px);
  align-items: center;
  padding-block: 84px 96px;
}
.hero-copy { position: relative; z-index: 2; }
.eyebrow {
  margin: 0 0 16px;
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 850;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
h1, h2, h3, p { overflow-wrap: anywhere; }
h1, h2, h3 { color: var(--ink); line-height: 1.04; letter-spacing: -0.045em; }
h1 { max-width: 850px; margin: 0; font-size: clamp(3.2rem, 7.6vw, 6.6rem); }
h2 { margin: 0; font-size: clamp(2.25rem, 4.8vw, 4.5rem); }
h3 { margin: 0; font-size: 1.25rem; }
.theme-booth h1, .theme-booth h2, .theme-expo h1, .theme-expo h2 {
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 500;
  letter-spacing: -0.055em;
}
.theme-meetings h1, .theme-meetings h2 { font-weight: 900; letter-spacing: -0.06em; }
.theme-meetings h1 { font-size: clamp(3rem, 5.2vw, 4.8rem); }
.theme-connect h1, .theme-connect h2 { font-family: Georgia, "Times New Roman", serif; font-weight: 600; }
.theme-connect h1 { font-size: clamp(3rem, 5.4vw, 5rem); }
.lede {
  max-width: 700px;
  margin: 26px 0 0;
  color: var(--body);
  font-size: clamp(1.1rem, 2vw, 1.34rem);
  line-height: 1.62;
}
.hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 18px; margin-top: 34px; }
.button {
  min-height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 999px;
  padding: 0 22px;
  background: var(--accent-strong);
  color: var(--white);
  font: inherit;
  font-weight: 850;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 10px 24px color-mix(in srgb, var(--accent-strong) 20%, transparent);
}
.button:hover { background: var(--accent); transform: translateY(-1px); }
.text-link { min-height: 46px; display: inline-flex; align-items: center; color: var(--ink); font-weight: 850; text-decoration: none; }
.text-link:hover { color: var(--accent); }
.text-link span { margin-left: 4px; }
.hero-note { margin: 28px 0 0; color: var(--muted); font-size: 0.92rem; font-weight: 700; }
.hero-note span { padding-inline: 7px; color: var(--accent); }
.booth-plan, .operations-board, .booking-card, .workflow-map {
  min-height: 490px;
  position: relative;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.booth-plan { padding: 24px; background: #171612; color: #f4efe4; transform: rotate(1.2deg); }
.booth-plan__top, .operations-board__header, .booking-card__header {
  display: flex; justify-content: space-between; align-items: center; gap: 20px; font-size: 0.72rem; font-weight: 900; letter-spacing: 0.12em;
}
.booth-grid { height: 275px; display: grid; grid-template-columns: 1fr 1fr 0.7fr; grid-template-rows: 1fr 1fr; gap: 12px; margin-top: 22px; padding: 18px; border: 1px solid #51492f; background-image: linear-gradient(#2d2a20 1px, transparent 1px), linear-gradient(90deg, #2d2a20 1px, transparent 1px); background-size: 24px 24px; }
.booth-grid__wall { border: 4px solid #d3b45a; border-bottom: 0; }
.booth-grid__wall:nth-child(2) { border-color: #f4efe4; }
.booth-grid__wall:nth-child(3) { border-color: #85733f; }
.booth-grid__table { grid-column: 1 / 3; display: grid; place-items: center; margin: 4px 30px; border: 2px solid #d3b45a; border-radius: 50%; color: #d3b45a; font-weight: 900; letter-spacing: 0.16em; }
.booth-grid__station { display: grid; place-items: center; border: 1px solid #85733f; color: #d3b45a; font-weight: 900; }
.booth-plan__brief { display: grid; grid-template-columns: 80px 1fr; gap: 6px 14px; margin-top: 22px; font-size: 0.88rem; }
.booth-plan__brief span { color: #d3b45a; text-transform: uppercase; letter-spacing: 0.08em; }
.operations-board { padding: 26px; background: #0b2942; color: white; }
.live-pill { padding: 7px 12px; border-radius: 999px; background: #f0672e; color: white; }
.operations-board__stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-block: 28px; }
.operations-board__stats div { padding: 16px; border: 1px solid #2a5672; border-radius: 14px; background: #123a55; }
.operations-board__stats span, .operations-board__stats strong { display: block; }
.operations-board__stats span { color: #9bc9d0; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; }
.schedule-row { display: grid; grid-template-columns: 54px 1fr 34px; gap: 14px; align-items: center; padding: 18px 0; border-top: 1px solid #2a5672; }
.schedule-row time { color: #73d3d8; font-weight: 850; }
.schedule-row div span { display: block; color: #abc5d1; font-size: 0.82rem; }
.schedule-row b { width: 30px; height: 30px; display: grid; place-items: center; border-radius: 50%; background: #f0672e; font-size: 0.75rem; }
.booking-card { padding: 28px; background: #fffaf4; transform: rotate(-1deg); }
.booking-card__header { padding-bottom: 22px; border-bottom: 1px solid var(--line); color: var(--accent); }
.booking-card__header strong { color: var(--ink); letter-spacing: 0; text-transform: none; }
.booking-timeline { list-style: none; margin: 28px 0 0; padding: 0; }
.booking-timeline li { min-height: 82px; display: grid; grid-template-columns: 48px 1fr; gap: 18px; align-items: start; position: relative; }
.booking-timeline li::after { content: ""; position: absolute; left: 23px; top: 44px; bottom: -4px; width: 2px; background: var(--line); }
.booking-timeline li:last-child::after { display: none; }
.booking-timeline > li > span { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 50%; background: var(--accent-strong); color: white; font-weight: 900; }
.booking-timeline strong, .booking-timeline small { display: block; }
.booking-timeline small { margin-top: 4px; color: var(--muted); }
.workflow-map { min-height: 520px; background: #0c2d20; overflow: hidden; }
.workflow-map::before, .workflow-map::after { content: ""; position: absolute; inset: 50% auto auto 50%; width: 390px; height: 390px; transform: translate(-50%, -50%); border: 1px solid #38634f; border-radius: 50%; }
.workflow-map::after { width: 260px; height: 260px; border-color: #5f846f; }
.workflow-map__center { position: absolute; inset: 50% auto auto 50%; z-index: 2; transform: translate(-50%, -50%); width: 150px; height: 150px; display: grid; place-items: center; align-content: center; border-radius: 28px; background: #f1f4ec; color: #123526; box-shadow: 0 24px 50px rgba(0,0,0,.28); }
.workflow-map__center span { font: 700 2.3rem Georgia, serif; }
.workflow-map__center strong { font-size: 0.76rem; text-transform: uppercase; letter-spacing: 0.12em; }
.workflow-node { position: absolute; z-index: 2; min-width: 104px; padding: 12px 14px; border: 1px solid #567866; border-radius: 14px; background: #123d2c; color: white; }
.workflow-node b, .workflow-node span { display: block; }
.workflow-node b { color: #d6ae65; font-size: 0.72rem; }
.workflow-node span { font-weight: 800; }
.workflow-node--1 { left: 8%; top: 14%; }.workflow-node--2 { right: 8%; top: 12%; }.workflow-node--3 { right: 4%; bottom: 19%; }.workflow-node--4 { left: 36%; bottom: 6%; }.workflow-node--5 { left: 4%; bottom: 25%; }
.section { padding-block: 100px; border-top: 1px solid var(--line); scroll-margin-top: 24px; }
.section-intro { max-width: 780px; margin-bottom: 48px; }
.section-intro > p:last-child { max-width: 660px; margin: 20px 0 0; font-size: 1.08rem; }
.section-intro--split { max-width: none; display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(260px, .75fr); gap: 70px; align-items: end; }
.section-intro--split > p { margin: 0 0 8px; }
.process-grid { display: grid; gap: 14px; }
.process-grid--3 { grid-template-columns: repeat(3, 1fr); }
.process-grid--4 { grid-template-columns: repeat(4, 1fr); }
.process-grid--5 { grid-template-columns: repeat(5, 1fr); }
.process-card { min-height: 280px; display: flex; flex-direction: column; padding: 24px; border: 1px solid var(--line); border-radius: 18px; background: var(--surface); box-shadow: 0 14px 35px rgba(18,35,28,.06); }
.process-meta { display: flex; justify-content: space-between; gap: 12px; margin-bottom: auto; color: var(--accent); font-size: .72rem; font-weight: 900; text-transform: uppercase; letter-spacing: .1em; }
.process-card h3 { margin-top: 44px; }
.process-card p { margin: 14px 0 0; color: var(--body); }
.theme-booth .process-card:nth-child(2) { background: var(--accent-strong); border-color: var(--accent-strong); }
.theme-booth .process-card:nth-child(2) h3, .theme-booth .process-card:nth-child(2) p { color: white; }
.theme-meetings .process-card { border-top: 5px solid var(--accent); }
.theme-expo .process-card { border-radius: 60px 18px 18px; }
.deliverables-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px; }
.deliverable-card { min-height: 240px; display: flex; flex-direction: column; justify-content: flex-end; padding: 26px; border: 1px solid var(--line); border-radius: 20px; background: var(--surface); }
.deliverable-card--1, .deliverable-card--4 { grid-column: span 7; }
.deliverable-card--2, .deliverable-card--3 { grid-column: span 5; }
.deliverable-card--5 { grid-column: span 12; min-height: 190px; }
.deliverable-card h3 { margin-top: auto; }
.deliverable-card p { max-width: 520px; margin: 12px 0 0; }
.status-chip { align-self: flex-start; margin-bottom: 42px; padding: 7px 11px; border-radius: 999px; background: color-mix(in srgb, var(--accent-soft) 24%, transparent); color: var(--accent); font-size: .7rem; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
.theme-meetings .deliverable-card { background: #0b2942; border-color: #254c65; }
.theme-meetings .deliverable-card h3, .theme-meetings .deliverable-card p { color: white; }
.scenario-section { display: grid; grid-template-columns: .78fr 1.22fr; gap: clamp(48px, 8vw, 110px); align-items: center; }
.scenario-copy > p:not(.eyebrow):not(.fine-print) { margin: 24px 0 0; font-size: 1.08rem; }
.fine-print { margin-top: 24px; color: var(--muted); font-size: .86rem; }
.brief-board { border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); box-shadow: var(--shadow); overflow: hidden; }
.brief-board__header { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 22px 24px; background: var(--accent-strong); color: white; font-size: .78rem; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
.status-dot { padding: 6px 10px; border-radius: 999px; background: var(--accent-soft); color: var(--accent-strong); }
.brief-board dl { margin: 0; }
.brief-board dl div { display: grid; grid-template-columns: minmax(120px, .4fr) 1fr; gap: 20px; padding: 17px 24px; border-top: 1px solid var(--line); }
.brief-board dt { color: var(--muted); font-size: .76rem; font-weight: 850; letter-spacing: .08em; text-transform: uppercase; }
.brief-board dd { margin: 0; color: var(--ink); font-weight: 750; }
.faq-section { display: grid; grid-template-columns: .7fr 1.3fr; gap: clamp(50px, 8vw, 110px); align-items: start; }
.faq-section .section-intro { position: sticky; top: 30px; }
.faq-list details { border-bottom: 1px solid var(--line); }
.faq-list summary { min-height: 68px; display: flex; align-items: center; justify-content: space-between; gap: 20px; cursor: pointer; color: var(--ink); font-size: 1.05rem; font-weight: 850; list-style: none; }
.faq-list summary::-webkit-details-marker { display: none; }
.faq-list summary::after { content: "+"; width: 28px; height: 28px; display: grid; place-items: center; border: 1px solid var(--line); border-radius: 50%; color: var(--accent); }
.faq-list details[open] summary::after { content: "–"; }
.faq-list details p { margin: 0; padding: 0 52px 22px 0; }
.closing-section { width: min(var(--content), calc(100% - 40px)); margin-bottom: 70px; display: grid; grid-template-columns: 1fr auto; gap: 60px; align-items: end; padding: 56px; border: 0; border-radius: 28px; background: var(--accent-strong); color: white; }
.closing-section h2, .closing-section p, .closing-section .eyebrow, .closing-section a { color: white; }
.closing-section p:not(.eyebrow) { max-width: 720px; margin: 20px 0 0; }
.closing-actions { display: grid; gap: 14px; justify-items: start; }
.button--light { background: white; color: var(--accent-strong) !important; }
.page-hero { padding-block: 100px 62px; }
.page-hero h1 { max-width: 1030px; font-size: clamp(3rem, 6vw, 5.5rem); }
.page-hero--contact h1, .page-hero--legal h1 { max-width: 980px; }
.about-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.about-card { min-height: 330px; padding: 28px; border: 1px solid var(--line); border-radius: 20px; background: var(--surface); }
.about-number { display: inline-block; margin-bottom: 70px; color: var(--accent); font-weight: 900; }
.about-card h2 { font-size: clamp(1.7rem, 3vw, 2.5rem); }
.identity-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 70px; }
.identity-panel p { margin-top: 0; }
.contact-layout { display: grid; grid-template-columns: 1.15fr .85fr; gap: 60px; align-items: start; }
.contact-form { display: grid; gap: 18px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
label { display: grid; gap: 8px; color: var(--ink); font-weight: 800; }
input, textarea { width: 100%; border: 1px solid color-mix(in srgb, var(--ink) 32%, var(--line)); border-radius: 12px; padding: 14px 15px; background: var(--surface); color: var(--ink); font: inherit; }
textarea { resize: vertical; }
.honeypot { position: absolute !important; left: -9999px !important; width: 1px !important; height: 1px !important; }
.form-note { margin: 0; color: var(--muted); font-size: .88rem; }
.contact-card { padding: 34px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--accent-strong); color: white; box-shadow: var(--shadow); }
.contact-card h2, .contact-card .eyebrow, .contact-card a { color: white; }
.contact-email { display: inline-block; margin: 10px 0 30px; font-size: clamp(1rem, 2vw, 1.35rem); font-weight: 850; }
.contact-card dl { margin: 0; }
.contact-card dl div { display: grid; grid-template-columns: 88px 1fr; gap: 16px; padding: 14px 0; border-top: 1px solid rgba(255,255,255,.22); }
.contact-card dt { color: color-mix(in srgb, white 70%, var(--accent-soft)); }
.contact-card dd { margin: 0; font-weight: 800; }
.contact-card .fine-print { color: rgba(255,255,255,.78); }
.legal-copy { max-width: 880px; }
.legal-copy h2 { margin-top: 48px; font-size: clamp(1.6rem, 3vw, 2.3rem); }
.legal-copy h2:first-child { margin-top: 0; }
.legal-copy p { font-size: 1.02rem; }
.response-page { min-height: 64vh; display: grid; align-content: center; }
.response-mark { width: 64px; height: 64px; display: grid; place-items: center; margin-bottom: 28px; border-radius: 50%; background: var(--accent-strong); color: white; font-size: 1.8rem; font-weight: 900; }
.response-mark--404 { width: auto; padding-inline: 18px; border-radius: 14px; font-size: 1rem; }
.site-footer { min-height: 220px; display: grid; grid-template-columns: 1fr .8fr auto; gap: 44px; align-items: start; padding-block: 45px 58px; border-top: 1px solid var(--line); }
.footer-brand p { margin: 4px 0 0; color: var(--muted); font-size: .9rem; }
.footer-contact p { margin: 0 0 5px; }
.footer-label { color: var(--muted); font-size: .75rem; font-weight: 850; letter-spacing: .08em; text-transform: uppercase; }
.footer-contact a { min-height: 44px; display: inline-flex; align-items: center; font-weight: 800; }
.site-footer nav { justify-content: flex-end; }

@media (max-width: 1050px) {
  .hero { grid-template-columns: 1fr; min-height: auto; }
  .hero-copy { max-width: 850px; }
  .booth-plan, .operations-board, .booking-card, .workflow-map { width: min(680px, 100%); min-height: 460px; }
  .process-grid--4, .process-grid--5 { grid-template-columns: repeat(2, 1fr); }
  .faq-section, .scenario-section { grid-template-columns: 1fr; }
  .faq-section .section-intro { position: static; }
}

@media (max-width: 800px) {
  .site-header { align-items: flex-start; padding-block: 18px; }
  .site-header, .site-footer, .identity-panel, .contact-layout, .closing-section, .section-intro--split { grid-template-columns: 1fr; }
  .site-header { display: grid; }
  .site-header nav { width: 100%; gap: 2px; }
  .site-header nav a { padding-inline: 9px; }
  .site-header .nav-contact { margin-left: 0; }
  .hero { padding-block: 64px 78px; }
  .process-grid--3, .process-grid--4, .process-grid--5, .about-grid { grid-template-columns: 1fr; }
  .process-card { min-height: 230px; }
  .deliverable-card--1, .deliverable-card--2, .deliverable-card--3, .deliverable-card--4, .deliverable-card--5 { grid-column: span 12; }
  .about-number { margin-bottom: 42px; }
  .closing-section { align-items: start; padding: 38px 28px; }
  .site-footer nav { justify-content: flex-start; }
}

@media (max-width: 520px) {
  .site-header, .site-footer, .hero, .section, .page-hero, .closing-section { width: min(100% - 28px, var(--content)); }
  .brand-name { font-size: .96rem; }
  .hero { gap: 42px; }
  h1 { font-size: clamp(2.8rem, 15vw, 4.5rem); }
  .booth-plan, .operations-board, .booking-card, .workflow-map { min-height: 410px; border-radius: 18px; }
  .booth-plan, .operations-board, .booking-card { padding: 18px; }
  .operations-board__stats { grid-template-columns: 1fr; }
  .operations-board__stats div:nth-child(3) { display: none; }
  .schedule-row { grid-template-columns: 46px 1fr; }
  .schedule-row b { display: none; }
  .workflow-node { min-width: 88px; padding: 9px; font-size: .78rem; }
  .workflow-node--1 { left: 3%; }.workflow-node--2 { right: 3%; }.workflow-node--4 { left: 31%; }
  .form-row { grid-template-columns: 1fr; }
  .brief-board dl div { grid-template-columns: 1fr; gap: 5px; }
  .section { padding-block: 76px; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; transition: none !important; animation: none !important; }
}
`;
}

function vercelConfig() {
  return JSON.stringify(
    {
      headers: [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Content-Security-Policy",
              value:
                "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action https://formsubmit.co; img-src 'self' data:; style-src 'self'; script-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self'; upgrade-insecure-requests",
            },
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "X-Frame-Options", value: "DENY" },
            { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
            {
              key: "Permissions-Policy",
              value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
            },
          ],
        },
      ],
    },
    null,
    2,
  ) + "\n";
}

for (const site of sites) {
  const root = site.dir;
  const pages = [
    ["index.html", home(site)],
    ["about/index.html", about(site)],
    ["contact/index.html", contact(site)],
    ["privacy/index.html", privacy(site)],
    ["terms/index.html", terms(site)],
    ["thank-you/index.html", thankYou(site)],
    ["404.html", notFound(site)],
    ["assets/site.css", css(site)],
    [
      "robots.txt",
      `User-agent: *\nAllow: /\nSitemap: https://www.${site.domain}/sitemap.xml\n`,
    ],
    [
      "sitemap.xml",
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${["/", "/about/", "/contact/", "/privacy/", "/terms/"]
        .map((path) => `  <url><loc>https://www.${site.domain}${path}</loc></url>`)
        .join("\n")}\n</urlset>\n`,
    ],
    ["vercel.json", vercelConfig()],
  ];

  for (const [file, content] of pages) {
    const fullPath = join(root, file);
    mkdirSync(dirname(fullPath), { recursive: true });
    writeFileSync(fullPath, content);
  }
}

console.log(`Generated ${sites.length} distinct static sites.`);
