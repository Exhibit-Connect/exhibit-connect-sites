import { existsSync, readFileSync } from "node:fs";
import { dirname, join, normalize, relative } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const sites = [
  ["boothconnect", "boothconnect.co"],
  ["exhibitmeetings", "exhibitmeetings.co"],
  ["expobookings", "expobookings.co"],
  ["exhibitconnect", "exhibitconnect.co"],
];
const routes = [
  ["/", "index.html"],
  ["/about/", "about/index.html"],
  ["/contact/", "contact/index.html"],
  ["/privacy/", "privacy/index.html"],
  ["/terms/", "terms/index.html"],
];
const requiredFiles = [
  ...routes.map(([, file]) => file),
  "thank-you/index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "vercel.json",
  "assets/site.css",
  "assets/favicon.png",
  "assets/og.png",
];
const forbidden = [
  /2,400\+/i,
  /94%/i,
  /3\.2x/i,
  /785\+/i,
  /47%/i,
  /92%/i,
  /guaranteed inbox/i,
  /guaranteed placement/i,
  /inbox placement guaranteed/i,
  /deliverability guaranteed/i,
  /Generic trade show planning visual/i,
];
const failures = [];

function fail(site, message) {
  failures.push(`${site}: ${message}`);
}

function text(path) {
  return readFileSync(path, "utf8");
}

function count(haystack, needle) {
  return haystack.split(needle).length - 1;
}

function hexToRgb(value) {
  const match = /^#([0-9a-f]{6})$/i.exec(value.trim());
  if (!match) throw new Error(`unsupported color ${value}`);
  const number = Number.parseInt(match[1], 16);
  return [(number >> 16) & 255, (number >> 8) & 255, number & 255];
}

function relativeLuminance(value) {
  return hexToRgb(value)
    .map((channel) => channel / 255)
    .map((channel) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4))
    .reduce((total, channel, index) => total + channel * [0.2126, 0.7152, 0.0722][index], 0);
}

function contrastRatio(foreground, background) {
  const values = [relativeLuminance(foreground), relativeLuminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

function checkHeadingOrder(siteName, file, body) {
  const headings = [...body.matchAll(/<h([1-6])\b/gi)].map((match) => Number(match[1]));
  if (headings.filter((level) => level === 1).length !== 1) {
    fail(siteName, `${file} must contain exactly one h1`);
  }
  for (let index = 1; index < headings.length; index += 1) {
    if (headings[index] > headings[index - 1] + 1) {
      fail(siteName, `${file} skips from h${headings[index - 1]} to h${headings[index]}`);
    }
  }
}

function checkAccessibilityCss(siteName, css) {
  const tokens = Object.fromEntries(
    [...css.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})\s*;/gi)].map((match) => [match[1], match[2]]),
  );
  const textPairs = [
    ["ink", "paper"],
    ["body", "paper"],
    ["muted", "paper"],
    ["accent", "paper"],
    ["white", "accent-strong"],
    ["white", "accent"],
  ];
  for (const [foreground, background] of textPairs) {
    if (!tokens[foreground] || !tokens[background]) {
      fail(siteName, `site.css is missing ${foreground} or ${background} color token`);
      continue;
    }
    const ratio = contrastRatio(tokens[foreground], tokens[background]);
    if (ratio < 4.5) fail(siteName, `site.css ${foreground} on ${background} contrast is ${ratio.toFixed(2)}:1`);
  }
  if (tokens.focus && tokens.paper) {
    const focusRatio = contrastRatio(tokens.focus, tokens.paper);
    if (focusRatio < 3) fail(siteName, `site.css focus indicator contrast is ${focusRatio.toFixed(2)}:1`);
  }
  if (!/\.skip-link:focus\s*\{[^}]*transform:\s*translateY\(0\)/s.test(css)) fail(siteName, "site.css does not reveal the skip link on focus");
  if (!/:focus-visible\s*,|:focus-visible\s*\{/s.test(css)) fail(siteName, "site.css is missing visible keyboard focus styles");
  if (!/\.site-header nav a[^}]*min-height:\s*44px/s.test(css)) fail(siteName, "site.css does not preserve 44px primary navigation targets");
  if (!/@media\s*\(prefers-reduced-motion:\s*reduce\)/.test(css)) fail(siteName, "site.css is missing reduced-motion support");
  if (!/main\s*\{[^}]*overflow:\s*clip/s.test(css)) fail(siteName, "site.css is missing horizontal overflow containment");
}

function pngSize(path) {
  const buffer = readFileSync(path);
  if (buffer.length < 24 || buffer.subarray(1, 4).toString("ascii") !== "PNG") {
    throw new Error("not a PNG file");
  }
  return [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
}

function pageFile(siteRoot, pathname) {
  if (pathname === "/") return join(siteRoot, "index.html");
  if (pathname.endsWith("/")) return join(siteRoot, pathname.slice(1), "index.html");
  return join(siteRoot, pathname.slice(1));
}

function extractUrls(body) {
  const urls = [];
  for (const match of body.matchAll(/\b(?:href|src|poster)=["']([^"']+)["']/gi)) {
    urls.push(match[1]);
  }
  for (const match of body.matchAll(/\bsrcset=["']([^"']+)["']/gi)) {
    for (const candidate of match[1].split(",")) urls.push(candidate.trim().split(/\s+/)[0]);
  }
  return urls;
}

function checkInternalReferences(siteName, domain, siteRoot, file, body) {
  const canonicalMatch = body.match(/<link rel="canonical" href="([^"]+)">/i);
  const base = canonicalMatch?.[1] || `https://www.${domain}/`;
  for (const raw of extractUrls(body)) {
    if (!raw || raw.startsWith("#") || /^(?:mailto|tel|data):/i.test(raw)) continue;
    let resolved;
    try {
      resolved = new URL(raw, base);
    } catch {
      fail(siteName, `${file} has invalid URL ${raw}`);
      continue;
    }
    for (const [, sibling] of sites) {
      if (sibling !== domain && resolved.hostname === sibling.replace(/^www\./, "")) {
        fail(siteName, `${file} links to sibling domain ${resolved.hostname}`);
      }
      if (sibling !== domain && resolved.hostname === `www.${sibling}`) {
        fail(siteName, `${file} links to sibling domain ${resolved.hostname}`);
      }
    }
    if (resolved.hostname !== domain && resolved.hostname !== `www.${domain}`) continue;
    const target = pageFile(siteRoot, resolved.pathname);
    const rel = relative(siteRoot, normalize(target));
    if (rel.startsWith("..")) {
      fail(siteName, `${file} reference escapes the site root: ${raw}`);
      continue;
    }
    if (!existsSync(target)) fail(siteName, `${file} points to missing local target ${resolved.pathname}`);
  }
}

function checkIndexablePage(siteName, domain, route, file, body) {
  const base = `https://www.${domain}`;
  const canonical = `${base}${route}`;
  if (!body.includes(`<link rel="canonical" href="${canonical}">`)) {
    fail(siteName, `${file} is missing canonical ${canonical}`);
  }
  if (/name="robots"[^>]*noindex/i.test(body)) fail(siteName, `${file} must be indexable`);
  if (!/"legalName":"Exhibit Connect LLC"/.test(body)) {
    fail(siteName, `${file} is missing Organization legalName`);
  }
  if (!body.includes(`property="og:image" content="${base}/assets/og.png"`)) {
    fail(siteName, `${file} has the wrong Open Graph image`);
  }
  if (!body.includes('property="og:image:width" content="1200"')) fail(siteName, `${file} is missing OG width`);
  if (!body.includes('property="og:image:height" content="630"')) fail(siteName, `${file} is missing OG height`);
  if (!/property="og:image:alt" content="[^"]+"/.test(body)) fail(siteName, `${file} is missing OG image alt`);
  if (!body.includes('name="twitter:card" content="summary_large_image"')) fail(siteName, `${file} has the wrong Twitter card`);
  if (!body.includes(`name="twitter:image" content="${base}/assets/og.png"`)) fail(siteName, `${file} has the wrong Twitter image`);
  if (!/name="twitter:image:alt" content="[^"]+"/.test(body)) fail(siteName, `${file} is missing Twitter image alt`);
  const operatorCount = count(body, "Operated by Exhibit Connect LLC");
  if (operatorCount < 1 || operatorCount > 2) fail(siteName, `${file} has ${operatorCount} operator disclosures; expected 1–2`);
}

for (const [siteName, domain] of sites) {
  const siteRoot = join(repoRoot, siteName);
  for (const file of requiredFiles) {
    if (!existsSync(join(siteRoot, file))) fail(siteName, `missing ${file}`);
  }
  if (failures.some((item) => item.startsWith(`${siteName}: missing`))) continue;

  try {
    const [width, height] = pngSize(join(siteRoot, "assets/og.png"));
    if (width !== 1200 || height !== 630) fail(siteName, `assets/og.png is ${width}×${height}; expected 1200×630`);
  } catch (error) {
    fail(siteName, `assets/og.png ${error.message}`);
  }
  try {
    const [width, height] = pngSize(join(siteRoot, "assets/favicon.png"));
    if (width !== 64 || height !== 64) fail(siteName, `assets/favicon.png is ${width}×${height}; expected 64×64`);
  } catch (error) {
    fail(siteName, `assets/favicon.png ${error.message}`);
  }

  checkAccessibilityCss(siteName, text(join(siteRoot, "assets/site.css")));

  for (const [route, file] of routes) {
    const body = text(join(siteRoot, file));
    checkIndexablePage(siteName, domain, route, file, body);
    checkHeadingOrder(siteName, file, body);
    checkInternalReferences(siteName, domain, siteRoot, file, body);
  }

  for (const file of ["thank-you/index.html", "404.html"]) {
    const body = text(join(siteRoot, file));
    if (!/name="robots" content="noindex, follow"/i.test(body)) fail(siteName, `${file} must be noindex`);
    checkHeadingOrder(siteName, file, body);
    checkInternalReferences(siteName, domain, siteRoot, file, body);
  }

  const contact = text(join(siteRoot, "contact/index.html"));
  if (!contact.includes(`action="https://formsubmit.co/${operatorEmail()}"`)) fail(siteName, "contact form has the wrong action");
  if (!contact.includes(`name="_next" value="https://www.${domain}/thank-you/"`)) fail(siteName, "contact form has the wrong thank-you redirect");
  if (!contact.includes(`mailto:${operatorEmail()}`)) fail(siteName, "contact page is missing the central mailto link");

  const privacy = text(join(siteRoot, "privacy/index.html"));
  if (!/(?:opt-out|removal).*(?:request|contact)|no further contact/is.test(privacy)) fail(siteName, "privacy page is missing opt-out/removal language");
  const terms = text(join(siteRoot, "terms/index.html"));
  if (!/No guaranteed outcomes/i.test(terms)) fail(siteName, "terms page is missing no-guarantee language");

  const htmlFiles = [...routes.map(([, file]) => file), "thank-you/index.html", "404.html"];
  for (const file of htmlFiles) {
    const body = text(join(siteRoot, file));
    for (const pattern of forbidden) if (pattern.test(body)) fail(siteName, `${file} contains forbidden pattern ${pattern}`);
  }

  const robots = text(join(siteRoot, "robots.txt"));
  if (!robots.includes(`Sitemap: https://www.${domain}/sitemap.xml`)) fail(siteName, "robots.txt has the wrong sitemap directive");
  const sitemap = text(join(siteRoot, "sitemap.xml"));
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const expected = routes.map(([route]) => `https://www.${domain}${route}`);
  if (locations.length !== 5 || new Set(locations).size !== 5 || locations.some((url) => !expected.includes(url)) || expected.some((url) => !locations.includes(url))) {
    fail(siteName, `sitemap URLs do not exactly match the five approved routes: ${locations.join(", ")}`);
  }

  let config;
  try {
    config = JSON.parse(text(join(siteRoot, "vercel.json")));
  } catch (error) {
    fail(siteName, `vercel.json is invalid JSON: ${error.message}`);
  }
  const headers = config?.headers?.find((entry) => entry.source === "/(.*)")?.headers || [];
  const headerMap = Object.fromEntries(headers.map(({ key, value }) => [key.toLowerCase(), value]));
  const csp = headerMap["content-security-policy"] || "";
  if (!csp.includes("form-action https://formsubmit.co") || !csp.includes("frame-ancestors")) fail(siteName, "CSP is missing FormSubmit form-action or frame-ancestors");
  if (headerMap["x-content-type-options"] !== "nosniff") fail(siteName, "vercel.json is missing nosniff");
  if (!/^(?:DENY|SAMEORIGIN)$/i.test(headerMap["x-frame-options"] || "")) fail(siteName, "vercel.json is missing frame restriction");
  if (!headerMap["referrer-policy"]) fail(siteName, "vercel.json is missing Referrer-Policy");
  if (!headerMap["permissions-policy"]) fail(siteName, "vercel.json is missing Permissions-Policy");
}

function operatorEmail() {
  return "joseph@exhibitconnect.co";
}

if (failures.length) {
  console.error(`Generated site validation failed with ${failures.length} issue${failures.length === 1 ? "" : "s"}:`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("All generated site checks passed.");
}
