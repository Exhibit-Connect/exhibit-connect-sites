const sites = [
  "boothconnect.co",
  "exhibitmeetings.co",
  "expobookings.co",
  "exhibitconnect.co",
];
const routes = ["/", "/about/", "/contact/", "/privacy/", "/terms/"];
const resources = [
  ["/", "text/html"],
  ["/about/", "text/html"],
  ["/contact/", "text/html"],
  ["/privacy/", "text/html"],
  ["/terms/", "text/html"],
  ["/thank-you/", "text/html"],
  ["/robots.txt", "text/plain"],
  ["/sitemap.xml", "xml"],
  ["/assets/site.css", "text/css"],
  ["/assets/favicon.png", "image/png"],
  ["/assets/og.png", "image/png"],
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

async function read(url, { redirect = "follow", binary = false } = {}) {
  try {
    const response = await fetch(url, {
      redirect,
      signal: AbortSignal.timeout(20_000),
      headers: { "user-agent": "ExhibitConnectSiteMonitor/2.0" },
    });
    const type = response.headers.get("content-type") || "";
    const body = binary ? Buffer.from(await response.arrayBuffer()) : await response.text();
    return { response, type, body };
  } catch (error) {
    return { error };
  }
}

function pngSize(buffer) {
  if (buffer.length < 24 || buffer.subarray(1, 4).toString("ascii") !== "PNG") throw new Error("not a PNG file");
  return [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
}

function count(haystack, needle) {
  return haystack.split(needle).length - 1;
}

function checkSiblingLinks(site, file, body) {
  for (const match of body.matchAll(/\b(?:href|src)=["'](https?:\/\/[^"']+)["']/gi)) {
    let target;
    try {
      target = new URL(match[1]);
    } catch {
      continue;
    }
    for (const sibling of sites) {
      if (sibling !== site && (target.hostname === sibling || target.hostname === `www.${sibling}`)) {
        fail(site, `${file} links to sibling domain ${target.hostname}`);
      }
    }
  }
}

function checkIndexablePage(site, route, body) {
  const base = `https://www.${site}`;
  const canonical = `${base}${route}`;
  if (!body.includes(`<link rel="canonical" href="${canonical}">`)) fail(site, `${route} is missing canonical ${canonical}`);
  if (/name="robots"[^>]*noindex/i.test(body)) fail(site, `${route} must be indexable`);
  if (!/"legalName":"Exhibit Connect LLC"/.test(body)) fail(site, `${route} is missing Organization legalName`);
  if (!body.includes(`property="og:image" content="${base}/assets/og.png"`)) fail(site, `${route} has the wrong OG image`);
  if (!body.includes('property="og:image:width" content="1200"') || !body.includes('property="og:image:height" content="630"')) fail(site, `${route} is missing 1200×630 OG dimensions`);
  if (!/property="og:image:alt" content="[^"]+"/.test(body)) fail(site, `${route} is missing OG image alt`);
  if (!body.includes('name="twitter:card" content="summary_large_image"')) fail(site, `${route} has the wrong Twitter card`);
  if (!body.includes(`name="twitter:image" content="${base}/assets/og.png"`)) fail(site, `${route} has the wrong Twitter image`);
  if (!/name="twitter:image:alt" content="[^"]+"/.test(body)) fail(site, `${route} is missing Twitter image alt`);
  const operatorCount = count(body, "Operated by Exhibit Connect LLC");
  if (operatorCount < 1 || operatorCount > 2) fail(site, `${route} has ${operatorCount} operator disclosures; expected 1–2`);
  checkSiblingLinks(site, route, body);
}

for (const site of sites) {
  const base = `https://www.${site}`;
  console.log(`\n${site}`);

  const apex = await read(`https://${site}/`, { redirect: "manual" });
  if (apex.error) {
    fail(site, `apex redirect request failed: ${apex.error.message}`);
  } else if (![301, 302, 307, 308].includes(apex.response.status)) {
    fail(site, `apex returned ${apex.response.status}; expected redirect`);
  } else {
    const location = apex.response.headers.get("location");
    const target = location ? new URL(location, `https://${site}/`).href : "";
    if (target !== `${base}/`) fail(site, `apex redirects to ${target || "nothing"}; expected ${base}/`);
  }

  const bodies = new Map();
  for (const [path, expectedType] of resources) {
    const result = await read(`${base}${path}`, { binary: expectedType === "image/png" });
    if (result.error) {
      fail(site, `${path} request failed: ${result.error.message}`);
      continue;
    }
    if (result.response.status !== 200) fail(site, `${path} returned ${result.response.status}`);
    if (!result.type.toLowerCase().includes(expectedType)) fail(site, `${path} content-type ${result.type} missing ${expectedType}`);
    if (typeof result.body === "string") bodies.set(path, result.body);
    console.log(`  ${result.response.status === 200 ? "ok" : "fail"} ${path}`);
  }

  const homeResult = await read(`${base}/`);
  if (!homeResult.error) {
    const headers = homeResult.response.headers;
    const csp = headers.get("content-security-policy") || "";
    if (!csp.includes("form-action https://formsubmit.co") || !csp.includes("frame-ancestors")) fail(site, "live CSP is missing FormSubmit form-action or frame-ancestors");
    if ((headers.get("x-content-type-options") || "").toLowerCase() !== "nosniff") fail(site, "live response is missing nosniff");
    if (!/^(?:DENY|SAMEORIGIN)$/i.test(headers.get("x-frame-options") || "")) fail(site, "live response is missing X-Frame-Options");
    if (!headers.get("referrer-policy")) fail(site, "live response is missing Referrer-Policy");
    if (!headers.get("permissions-policy")) fail(site, "live response is missing Permissions-Policy");
  }

  for (const route of routes) {
    const body = bodies.get(route);
    if (body) checkIndexablePage(site, route, body);
  }

  const thankYou = bodies.get("/thank-you/") || "";
  if (!/name="robots" content="noindex, follow"/i.test(thankYou)) fail(site, "/thank-you/ must be noindex");

  const contact = bodies.get("/contact/") || "";
  if (!contact.includes('action="https://formsubmit.co/joseph@exhibitconnect.co"')) fail(site, "contact form has the wrong action");
  if (!contact.includes(`name="_next" value="${base}/thank-you/"`)) fail(site, "contact form has the wrong thank-you redirect");
  if (!contact.includes("mailto:joseph@exhibitconnect.co")) fail(site, "contact page is missing the central mailto link");
  if (!/(?:opt-out|removal).*(?:request|contact)|no further contact/is.test(bodies.get("/privacy/") || "")) fail(site, "privacy page is missing opt-out/removal language");
  if (!/No guaranteed outcomes/i.test(bodies.get("/terms/") || "")) fail(site, "terms page is missing no-guarantee language");

  for (const [path, body] of bodies) {
    if (!path.endsWith("/") && path !== "/") continue;
    for (const pattern of forbidden) if (pattern.test(body)) fail(site, `${path} contains forbidden pattern ${pattern}`);
  }

  const robots = bodies.get("/robots.txt") || "";
  if (!robots.includes(`Sitemap: ${base}/sitemap.xml`)) fail(site, "robots.txt has the wrong sitemap directive");
  const sitemap = bodies.get("/sitemap.xml") || "";
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const expected = routes.map((route) => `${base}${route}`);
  if (locations.length !== 5 || new Set(locations).size !== 5 || locations.some((url) => !expected.includes(url)) || expected.some((url) => !locations.includes(url))) {
    fail(site, `sitemap URLs do not exactly match the five approved routes: ${locations.join(", ")}`);
  }

  const ogResult = await read(`${base}/assets/og.png`, { binary: true });
  if (!ogResult.error && ogResult.response.status === 200) {
    try {
      const [width, height] = pngSize(ogResult.body);
      if (width !== 1200 || height !== 630) fail(site, `assets/og.png is ${width}×${height}; expected 1200×630`);
    } catch (error) {
      fail(site, `assets/og.png ${error.message}`);
    }
  }

  const missing = await read(`${base}/__codex-site-check-${Date.now()}/`);
  if (missing.error) {
    fail(site, `404 request failed: ${missing.error.message}`);
  } else {
    if (missing.response.status !== 404) fail(site, `unknown route returned ${missing.response.status}; expected 404`);
    if (!missing.type.includes("text/html")) fail(site, `unknown route content-type ${missing.type}; expected text/html`);
    if (!missing.body.includes(site.split(".")[0].replace("exhibitconnect", "Exhibit Connect")) && !/Page not found/i.test(missing.body)) {
      fail(site, "unknown route did not return the branded 404 page");
    }
    if (!/name="robots" content="noindex, follow"/i.test(missing.body)) fail(site, "404 page must be noindex");
  }
}

if (failures.length) {
  console.error(`\nLive site validation failed with ${failures.length} issue${failures.length === 1 ? "" : "s"}:`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("\nAll live site checks passed.");
}
