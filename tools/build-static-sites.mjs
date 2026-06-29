import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

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
    theme: "booth",
    accent: "#b88a24",
    title: "Booth Connect | Trade Show Meeting Coordination",
    description:
      "Booth Connect helps B2B exhibitors turn booth investments into planned, qualified trade show meetings.",
    position: "Booth ROI and meeting strategy for B2B exhibitors.",
    hero: "Make the booth worth the trip.",
    subhero:
      "We help exhibitors prepare a focused meeting plan before the show opens, so booth teams spend less time waiting for traffic and more time in useful conversations.",
    serviceFocus:
      "Booth Connect is built for companies that already invest in trade shows and want a tighter plan for who they meet, when they meet, and how those conversations are followed up.",
    pillars: [
      ["Booth meeting plan", "Define the companies, titles, and relationship types that make a show worth attending."],
      ["Pre-show coordination", "Build a practical calendar of relevant conversations before the booth team arrives."],
      ["Follow-up structure", "Document who engaged, what happened, and which next steps belong after the show."],
    ],
    examples: [
      "An equipment supplier preparing distributor meetings before a regional industry show.",
      "A manufacturer coordinating conversations with complementary exhibitors before a national expo.",
      "A sales team organizing booth coverage around confirmed, commercially relevant appointments.",
    ],
    tone: "Premium, direct, and operations-minded.",
  },
  {
    dir: "exhibitmeetings",
    domain: "exhibitmeetings.co",
    brand: "Exhibit Meetings",
    theme: "meetings",
    accent: "#087f8c",
    title: "Exhibit Meetings | Managed Trade Show Meeting Booking",
    description:
      "Exhibit Meetings plans and coordinates qualified B2B meetings for companies exhibiting at trade shows.",
    position: "Managed meeting operations for show teams.",
    hero: "Qualified trade show meetings, organized before show week.",
    subhero:
      "We help exhibitors identify relevant companies, coordinate outreach, and prepare a clear meeting schedule for their next event.",
    serviceFocus:
      "Exhibit Meetings focuses on the operational side of meeting booking: target criteria, calendar readiness, confirmation details, and a clear handoff to the team attending the show.",
    pillars: [
      ["Target criteria", "Clarify the account types, titles, and meeting reasons that belong in the campaign."],
      ["Scheduling workflow", "Coordinate interested contacts into clean time slots and practical calendar notes."],
      ["Meeting handoff", "Package confirmed details so the team knows who they are meeting and why."],
    ],
    examples: [
      "A software provider preparing partner conversations before an industry conference.",
      "A supplier using a show to meet procurement, operations, and channel contacts.",
      "A small sales team needing a simple meeting workflow before arriving on-site.",
    ],
    tone: "Clear, structured, and service-oriented.",
  },
  {
    dir: "expobookings",
    domain: "expobookings.co",
    brand: "Expo Bookings",
    theme: "expo",
    accent: "#9d5b35",
    title: "Expo Bookings | Practical Trade Show Meeting Support",
    description:
      "Expo Bookings provides practical pre-show booking support for exhibitors that want a more organized calendar.",
    position: "Practical booking support for exhibitors.",
    hero: "A calmer way to book trade show conversations.",
    subhero:
      "We help exhibitors prepare simple, relevant meeting outreach and keep scheduling organized without inflated promises or complicated systems.",
    serviceFocus:
      "Expo Bookings is intentionally straightforward: define the show, identify relevant prospects, coordinate interest, and keep the booking process clear for both sides.",
    pillars: [
      ["Simple show intake", "Understand the show, the exhibitor's goals, and the types of contacts worth meeting."],
      ["Relevant outreach", "Use direct, plain-language outreach focused on why a conversation may be useful."],
      ["Clear confirmations", "Keep confirmed meetings, context, and follow-up notes organized in one place."],
    ],
    examples: [
      "A first-time exhibitor trying to avoid relying only on walk-up booth traffic.",
      "A niche B2B supplier looking for a small number of relevant partner conversations.",
      "A founder-led team preparing a practical schedule before a busy expo week.",
    ],
    tone: "Plainspoken, modest, and transparent.",
  },
  {
    dir: "exhibitconnect",
    domain: "exhibitconnect.co",
    brand: "Exhibit Connect",
    theme: "connect",
    accent: "#1b3a2d",
    title: "Exhibit Connect | Pre-Booked Trade Show Meetings",
    description:
      "Exhibit Connect helps B2B exhibitors prepare qualified trade show meetings, target lists, meeting briefs, and post-show follow-up structure.",
    position: "Primary trade show meeting booking service from Exhibit Connect LLC.",
    hero: "Your trade show, prepared with purpose.",
    subhero:
      "We help exhibitors identify relevant companies, coordinate qualified conversations, and walk into show week with a clearer plan for every meeting.",
    serviceFocus:
      "Exhibit Connect is the main service brand operated by Exhibit Connect LLC. It covers the full workflow: target definition, show list research, outreach coordination, meeting briefs, and post-show reporting.",
    pillars: [
      ["Show research", "Map the exhibitor landscape and identify companies that match the client's goals."],
      ["Meeting coordination", "Coordinate relevant conversations while keeping expectations and opt-outs clear."],
      ["Client-ready deliverables", "Prepare meeting notes, calendar details, warm-response lists, and follow-up scorecards."],
    ],
    examples: [
      "A B2B exhibitor seeking channel partners at a national trade show.",
      "A manufacturer preparing meetings with complementary suppliers and distributors.",
      "A sales team using a show to validate a new market or build strategic relationships.",
    ],
    tone: "Flagship, comprehensive, and transparent.",
  },
];

const sharedNav = (site) => `
<header class="site-header">
  <a class="brand" href="/" aria-label="${site.brand} home">
    <span class="brand-mark" aria-hidden="true"></span>
    <span>${site.brand}</span>
  </a>
  <nav aria-label="Primary navigation">
    <a href="/about/">About</a>
    <a href="/contact/">Contact</a>
    <a href="/privacy/">Privacy</a>
    <a href="/terms/">Terms</a>
  </nav>
</header>`;

const footer = (site) => `
<footer class="site-footer">
  <div>
    <strong>${site.brand}</strong>
    <p>${site.position}</p>
    <p>Operated by ${operator.legalName}. ${operator.location}.</p>
  </div>
  <nav aria-label="Footer navigation">
    <a href="/about/">About</a>
    <a href="/contact/">Contact</a>
    <a href="/privacy/">Privacy</a>
    <a href="/terms/">Terms</a>
    <a href="/sitemap.xml">Sitemap</a>
  </nav>
</footer>`;

const head = (site, pageTitle, description, path = "/") => {
  const url = `https://www.${site.domain}${path}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${pageTitle}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${pageTitle}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="${site.brand}">
<meta property="og:image" content="https://www.${site.domain}/assets/hero.jpg">
<meta name="twitter:card" content="summary">
<meta name="twitter:image" content="https://www.${site.domain}/assets/hero.jpg">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/site.css">
<script type="application/ld+json">${JSON.stringify(schema(site))}</script>
</head>`;
};

const schema = (site) => ({
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
});

const layout = (site, title, description, path, body) => `${head(site, title, description, path)}
<body class="${site.theme}" style="--accent:${site.accent}">
${sharedNav(site)}
<main>
${body}
</main>
${footer(site)}
</body>
</html>
`;

const home = (site) =>
  layout(
    site,
    site.title,
    site.description,
    "/",
    `
<section class="hero">
  <p class="eyebrow">${site.position}</p>
  <h1>${site.hero}</h1>
  <p class="lede">${site.subhero}</p>
  <div class="hero-actions">
    <a class="button" href="/contact/">Contact ${site.brand}</a>
    <a class="text-link" href="/about/">Learn how we work</a>
  </div>
  <figure class="hero-visual">
    <img src="/assets/hero.jpg" alt="Prepared trade show meeting area for ${site.brand}" loading="eager">
    <figcaption>Generic trade show planning visual. Not a client portfolio photo or performance claim.</figcaption>
  </figure>
</section>
<section class="band">
  <div class="section-heading">
    <p class="eyebrow">What we do</p>
    <h2>Trade show meeting support with clear boundaries.</h2>
  </div>
  <p class="wide-copy">${site.serviceFocus}</p>
</section>
<section class="grid-section" aria-labelledby="service-pillars">
  <div class="section-heading">
    <p class="eyebrow">Service focus</p>
    <h2 id="service-pillars">Where we help</h2>
  </div>
  <div class="card-grid">
    ${site.pillars.map(([title, copy]) => `<article class="card"><h3>${title}</h3><p>${copy}</p></article>`).join("\n    ")}
  </div>
</section>
<section class="proof-section">
  <div>
    <p class="eyebrow">Example use cases</p>
    <h2>Anonymized examples, not inflated claims.</h2>
    <p>These examples describe the type of work we support. They are intentionally anonymized and should not be read as named client endorsements.</p>
  </div>
  <ul class="check-list">
    ${site.examples.map((item) => `<li>${item}</li>`).join("\n    ")}
  </ul>
</section>
<section class="policy-note">
  <h2>Outreach and contact policy</h2>
  <p>We use direct, relevant business communication and honor opt-out or removal requests. Website inquiries are used to respond to the inquiry and manage the business relationship.</p>
  <a class="button secondary" href="/privacy/">Read privacy details</a>
</section>`
  );

const about = (site) =>
  layout(
    site,
    `About ${site.brand} | ${operator.legalName}`,
    `${site.brand} is operated by ${operator.legalName} and supports B2B exhibitors with trade show meeting preparation.`,
    "/about/",
    `
<section class="page-hero">
  <p class="eyebrow">About</p>
  <h1>${site.brand} is a trade show meeting support brand operated by ${operator.legalName}.</h1>
  <p class="lede">${site.tone}</p>
</section>
<section class="content-two">
  <div>
    <h2>Company identity</h2>
    <p>${site.brand} is operated by ${operator.legalName}, based in ${operator.location}. The service supports B2B exhibitors that want a more deliberate approach to meetings before, during, and after trade shows.</p>
    <p>We focus on practical coordination: target definition, show research, outreach organization, meeting context, and follow-up structure.</p>
  </div>
  <div>
    <h2>How we work</h2>
    <p>We avoid guaranteed placement claims, inflated performance promises, or fake proof. Outcomes depend on show fit, timing, audience quality, offer relevance, and prospect responsiveness.</p>
    <p>When a prospect asks not to be contacted, that request should be honored and reflected in future outreach handling.</p>
  </div>
</section>
<section class="band">
  <h2>Service area</h2>
  <p class="wide-copy">The company is based in ${operator.location} and supports exhibitors participating in trade shows across the United States.</p>
</section>`
  );

const contact = (site) =>
  layout(
    site,
    `Contact ${site.brand}`,
    `Contact ${site.brand} for trade show meeting coordination and service questions.`,
    "/contact/",
    `
<section class="page-hero">
  <p class="eyebrow">Contact</p>
  <h1>Talk with us about your next trade show.</h1>
  <p class="lede">Share the show, your goals, and the type of companies or contacts you want to meet. We normally respond ${operator.responseTime}.</p>
</section>
<section class="contact-layout">
  <form class="contact-form" action="https://formsubmit.co/${operator.email}" method="POST">
    <input type="hidden" name="_subject" value="New inquiry from ${site.brand}">
    <input type="text" name="_honey" class="honeypot" tabindex="-1" autocomplete="off">
    <input type="hidden" name="_captcha" value="false">
    <label>Name <input name="name" type="text" autocomplete="name" required></label>
    <label>Company <input name="company" type="text" autocomplete="organization"></label>
    <label>Email <input name="email" type="email" autocomplete="email" required></label>
    <label>Upcoming show <input name="show" type="text" placeholder="Example: Pack Expo, NRF, IMTS"></label>
    <label>Message <textarea name="message" rows="6" required></textarea></label>
    <button class="button" type="submit">Send inquiry</button>
  </form>
  <aside class="contact-card">
    <h2>Direct contact</h2>
    <p>Email <a href="mailto:${operator.email}">${operator.email}</a></p>
    <p>${operator.legalName}<br>${operator.location}</p>
    <p class="small">If you are contacting us about an outreach message or removal request, include the email address that received the message so we can process the request accurately.</p>
  </aside>
</section>`
  );

const privacy = (site) =>
  layout(
    site,
    `Privacy Policy | ${site.brand}`,
    `Privacy Policy for ${site.brand}, operated by ${operator.legalName}.`,
    "/privacy/",
    `
<section class="page-hero legal">
  <p class="eyebrow">Privacy Policy</p>
  <h1>How we handle contact and inquiry information.</h1>
  <p class="lede">Last updated June 29, 2026. This page is a practical business policy and should be reviewed by legal counsel if formal legal advice is needed.</p>
</section>
<section class="legal-copy">
  <h2>Who operates this site</h2>
  <p>${site.brand} is operated by ${operator.legalName}, based in ${operator.location}. You can contact us at <a href="mailto:${operator.email}">${operator.email}</a>.</p>
  <h2>Information we collect</h2>
  <p>When you submit a form or email us, we may collect your name, company, email address, show details, message content, and related business contact information.</p>
  <h2>How we use information</h2>
  <p>We use inquiry information to respond, evaluate fit for our services, coordinate requested business communication, maintain records, and honor opt-out or removal requests.</p>
  <h2>Service providers</h2>
  <p>This site may use hosting, email, form, analytics, or security providers such as Vercel, Google Workspace, and FormSubmit. These providers process information as needed to operate the site and business communication.</p>
  <h2>Outreach and opt-out requests</h2>
  <p>If you received a business outreach message and want no further contact, email <a href="mailto:${operator.email}">${operator.email}</a> with the address that received the message. We will use that information to process the request.</p>
  <h2>Retention</h2>
  <p>We keep business inquiry and communication records for as long as reasonably needed for service, compliance, dispute resolution, and opt-out handling.</p>
  <h2>Your choices</h2>
  <p>You may request access, correction, or deletion of your inquiry information by contacting us. Some records may be retained where needed for legitimate business, legal, or suppression-list purposes.</p>
</section>`
  );

const terms = (site) =>
  layout(
    site,
    `Terms | ${site.brand}`,
    `Terms of use for ${site.brand}, operated by ${operator.legalName}.`,
    "/terms/",
    `
<section class="page-hero legal">
  <p class="eyebrow">Terms</p>
  <h1>Website terms and service inquiry conditions.</h1>
  <p class="lede">Last updated June 29, 2026. These terms are practical website terms and should be reviewed by legal counsel if formal legal advice is needed.</p>
</section>
<section class="legal-copy">
  <h2>Site operator</h2>
  <p>${site.brand} is operated by ${operator.legalName}, based in ${operator.location}. Contact: <a href="mailto:${operator.email}">${operator.email}</a>.</p>
  <h2>Website use</h2>
  <p>You may use this website to learn about our trade show meeting support services and contact us about potential work. Do not misuse the site, submit false information, or interfere with site operation.</p>
  <h2>No guaranteed outcomes</h2>
  <p>Website content describes our services and process. It does not guarantee meeting volume, revenue, deliverability, search ranking, inbox placement, or any specific business result.</p>
  <h2>Service discussions</h2>
  <p>Submitting a form or emailing us does not create a client relationship. Any paid work requires separate written agreement, scope, timing, and commercial terms.</p>
  <h2>Content accuracy</h2>
  <p>We aim to keep this site accurate and current, but information may change. If you notice an issue, contact us so we can review it.</p>
  <h2>Limitation</h2>
  <p>To the extent permitted by law, this website is provided as-is and ${operator.legalName} is not liable for indirect or consequential damages arising from website use.</p>
</section>`
  );

const notFound = (site) =>
  layout(
    site,
    `Page Not Found | ${site.brand}`,
    `The requested page was not found on ${site.brand}.`,
    "/404.html",
    `
<section class="page-hero">
  <p class="eyebrow">404</p>
  <h1>That page is not available.</h1>
  <p class="lede">Use the links below to return to the main site or contact us directly.</p>
  <div class="hero-actions">
    <a class="button" href="/">Return home</a>
    <a class="text-link" href="/contact/">Contact us</a>
  </div>
</section>`
  );

const css = (site) => `:root {
  color-scheme: light;
  --accent: ${site.accent};
  --ink: #17201d;
  --body: #3d4743;
  --muted: #6d7973;
  --line: #dde5df;
  --paper: #fbfaf7;
  --white: #ffffff;
  --soft: #f1f5f1;
  --shadow: 0 18px 50px rgba(23, 32, 29, 0.08);
}

body.booth {
  --paper: #f8f5ee;
  --soft: #eee7d8;
  --ink: #1f1d18;
  --body: #474036;
}
body.meetings {
  --paper: #f7fbfc;
  --soft: #eaf4f6;
  --ink: #10242a;
  --body: #334b52;
}
body.expo {
  --paper: #fbf6ee;
  --soft: #f2eadf;
  --ink: #251d16;
  --body: #51463d;
}
body.connect {
  --paper: #f7f8f3;
  --soft: #e9eee6;
  --ink: #102018;
  --body: #35443d;
}

* { box-sizing: border-box; }
html { font-size: 16px; scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: var(--paper);
  color: var(--body);
  line-height: 1.65;
}
a { color: var(--accent); }
a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--accent) 35%, white);
  outline-offset: 3px;
}
.site-header, .site-footer {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
}
.site-header {
  padding: 22px 0;
  border-bottom: 1px solid var(--line);
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--ink);
  font-weight: 750;
  letter-spacing: 0;
}
.brand-mark {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: var(--accent);
  box-shadow: inset 0 0 0 6px rgba(255,255,255,0.25);
}
body.booth .brand-mark { border-radius: 50%; }
body.meetings .brand-mark { border-radius: 8px 8px 2px 8px; }
body.expo .brand-mark { border-radius: 50% 6px 50% 6px; }
body.connect .brand-mark { transform: rotate(45deg) scale(0.82); }
.site-header nav, .site-footer nav {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.site-header nav a, .site-footer nav a {
  color: var(--body);
  text-decoration: none;
  font-size: 0.95rem;
}
.site-header nav a:hover, .site-footer nav a:hover { color: var(--accent); }
main { min-height: 70vh; }
.hero, .page-hero, .band, .grid-section, .proof-section, .policy-note, .content-two, .contact-layout, .legal-copy {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
}
.hero {
  min-height: 68vh;
  display: grid;
  align-content: center;
  padding: 76px 0 64px;
}
.hero-visual {
  margin: 52px 0 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--soft);
  box-shadow: var(--shadow);
}
.hero-visual img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
.hero-visual figcaption {
  padding: 10px 14px;
  color: var(--muted);
  font-size: 0.84rem;
  background: rgba(255,255,255,0.86);
}
.page-hero {
  padding: 72px 0 36px;
}
.eyebrow {
  margin: 0 0 14px;
  color: var(--accent);
  font-weight: 750;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
h1, h2, h3, p { overflow-wrap: anywhere; }
h1, h2, h3 {
  color: var(--ink);
  line-height: 1.08;
  letter-spacing: 0;
}
body.booth h1, body.booth h2,
body.expo h1, body.expo h2,
body.connect h1, body.connect h2 {
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 500;
}
body.meetings h1, body.meetings h2 {
  font-weight: 800;
}
h1 {
  max-width: 860px;
  margin: 0;
  font-size: clamp(2.5rem, 8vw, 5.5rem);
}
.page-hero h1 { font-size: clamp(2.2rem, 6vw, 4.4rem); }
h2 { font-size: clamp(1.7rem, 4vw, 2.8rem); margin: 0 0 18px; }
h3 { font-size: 1.2rem; margin: 0 0 10px; }
.lede {
  max-width: 720px;
  margin: 22px 0 0;
  font-size: clamp(1.05rem, 2vw, 1.28rem);
  color: var(--body);
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  align-items: center;
  margin-top: 32px;
}
.button {
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 8px;
  background: var(--accent);
  color: #fff;
  padding: 0 18px;
  font-weight: 750;
  text-decoration: none;
  cursor: pointer;
}
.button.secondary {
  background: var(--ink);
}
.text-link {
  color: var(--ink);
  font-weight: 700;
  text-decoration: none;
}
.band, .grid-section, .proof-section, .policy-note, .content-two, .contact-layout, .legal-copy {
  padding: 56px 0;
  border-top: 1px solid var(--line);
}
.section-heading {
  display: grid;
  grid-template-columns: minmax(180px, 0.35fr) 1fr;
  gap: 28px;
  align-items: start;
  margin-bottom: 28px;
}
.wide-copy {
  max-width: 820px;
  font-size: 1.12rem;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.card, .contact-card {
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 24px;
  box-shadow: var(--shadow);
}
body.meetings .card { border-top: 4px solid var(--accent); }
body.expo .card { background: #fffdf8; }
body.booth .card { background: #151515; color: #e8e0d1; border-color: #2b2923; }
body.booth .card h3 { color: #f8f2e6; }
body.connect .card { border-left: 4px solid var(--accent); }
.proof-section, .content-two, .contact-layout {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 42px;
}
.check-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.check-list li {
  padding: 16px 0 16px 34px;
  border-bottom: 1px solid var(--line);
  position: relative;
}
.check-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 25px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--accent);
}
.policy-note {
  margin-bottom: 40px;
  padding: 36px;
  background: var(--soft);
  border: 1px solid var(--line);
  border-radius: 8px;
}
.contact-form {
  display: grid;
  gap: 16px;
}
label {
  display: grid;
  gap: 7px;
  color: var(--ink);
  font-weight: 700;
}
input, textarea {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 12px 13px;
  font: inherit;
  color: var(--ink);
  background: #fff;
}
.honeypot { display: none; }
.small { font-size: 0.92rem; color: var(--muted); }
.legal-copy {
  max-width: 860px;
}
.legal-copy h2 {
  margin-top: 34px;
  font-size: 1.55rem;
}
.site-footer {
  padding: 34px 0 46px;
  border-top: 1px solid var(--line);
  align-items: flex-start;
}
.site-footer p { margin: 6px 0 0; color: var(--muted); }
@media (max-width: 800px) {
  .site-header, .site-footer, .proof-section, .content-two, .contact-layout, .section-heading {
    display: grid;
    grid-template-columns: 1fr;
  }
  .card-grid { grid-template-columns: 1fr; }
  .hero { min-height: auto; padding-top: 54px; }
  .site-header nav, .site-footer nav { gap: 12px; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
`;

const favicon = (site) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${site.accent}"/>
  <path d="M18 22h28v20H18z" fill="none" stroke="white" stroke-width="5" stroke-linejoin="round"/>
  <path d="M24 18h16" stroke="white" stroke-width="5" stroke-linecap="round"/>
</svg>
`;

for (const site of sites) {
  const root = site.dir;
  const pages = [
    ["index.html", home(site)],
    ["about/index.html", about(site)],
    ["contact/index.html", contact(site)],
    ["privacy/index.html", privacy(site)],
    ["terms/index.html", terms(site)],
    ["404.html", notFound(site)],
    ["assets/site.css", css(site)],
    ["assets/favicon.svg", favicon(site)],
    [
      "robots.txt",
      `User-agent: *\nAllow: /\nSitemap: https://www.${site.domain}/sitemap.xml\n`,
    ],
    [
      "sitemap.xml",
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${["/", "/about/", "/contact/", "/privacy/", "/terms/"].map((path) => `  <url><loc>https://www.${site.domain}${path}</loc></url>`).join("\n")}\n</urlset>\n`,
    ],
  ];

  for (const [file, content] of pages) {
    const fullPath = join(root, file);
    mkdirSync(join(fullPath, ".."), { recursive: true });
    writeFileSync(fullPath, content);
  }
}
