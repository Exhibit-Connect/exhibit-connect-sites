const sites = [
  "boothconnect.co",
  "exhibitmeetings.co",
  "expobookings.co",
  "exhibitconnect.co",
];

const paths = [
  ["/", "text/html"],
  ["/about/", "text/html"],
  ["/contact/", "text/html"],
  ["/privacy/", "text/html"],
  ["/terms/", "text/html"],
  ["/robots.txt", "text/plain"],
  ["/sitemap.xml", "application/xml"],
  ["/assets/hero.jpg", "image/jpeg"],
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
];

async function read(url) {
  const res = await fetch(url, { redirect: "follow" });
  const type = res.headers.get("content-type") || "";
  const body = await res.text();
  return { url, res, type, body };
}

function requireMatch(label, body, pattern) {
  if (!pattern.test(body)) {
    throw new Error(`missing ${label}`);
  }
}

for (const site of sites) {
  const base = `https://www.${site}`;
  console.log(`\n${site}`);

  for (const [path, expectedType] of paths) {
    const { res, type } = await read(`${base}${path}`);
    if (res.status !== 200) {
      throw new Error(`${site}${path} returned ${res.status}`);
    }
    if (!type.includes(expectedType)) {
      throw new Error(`${site}${path} content-type ${type} missing ${expectedType}`);
    }
    console.log(`  ok ${path}`);
  }

  const home = await read(`${base}/`);
  requireMatch("canonical", home.body, new RegExp(`<link rel="canonical" href="${base.replaceAll(".", "\\.")}/">`));
  requireMatch("Open Graph image", home.body, new RegExp(`${base.replaceAll(".", "\\.")}/assets/hero\\.jpg`));
  requireMatch("Organization schema legal name", home.body, /"legalName":"Exhibit Connect LLC"/);
  requireMatch("generic image disclaimer", home.body, /Generic trade show planning visual/);
  requireMatch("public location", home.body, /New Jersey, USA/);

  const contact = await read(`${base}/contact/`);
  requireMatch("FormSubmit action", contact.body, /https:\/\/formsubmit\.co\/joseph@exhibitconnect\.co/);
  requireMatch("mailto contact", contact.body, /mailto:joseph@exhibitconnect\.co/);

  const privacy = await read(`${base}/privacy/`);
  requireMatch("opt-out language", privacy.body, /no further contact/i);

  const terms = await read(`${base}/terms/`);
  requireMatch("no guaranteed outcomes", terms.body, /No guaranteed outcomes/);

  const robots = await read(`${base}/robots.txt`);
  requireMatch("sitemap directive", robots.body, new RegExp(`Sitemap: ${base.replaceAll(".", "\\.")}/sitemap\\.xml`));

  const sitemap = await read(`${base}/sitemap.xml`);
  for (const required of ["/", "/about/", "/contact/", "/privacy/", "/terms/"]) {
    requireMatch(`sitemap ${required}`, sitemap.body, new RegExp(`${base.replaceAll(".", "\\.")}${required.replace("/", "\\/")}`));
  }

  for (const pattern of forbidden) {
    if (pattern.test(home.body) || pattern.test(privacy.body) || pattern.test(terms.body)) {
      throw new Error(`${site} contains forbidden claim pattern ${pattern}`);
    }
  }
}

console.log("\nAll live site checks passed.");
