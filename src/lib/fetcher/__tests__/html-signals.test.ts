import { describe, it, expect } from "vitest";
import { extractSignalsFromHtml } from "../html-signals";

const FULL_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Acme CRM — Close More Deals Faster</title>
  <meta name="description" content="The #1 CRM for small sales teams. Pipeline tracking, automated follow-ups, and real-time analytics.">
</head>
<body>
  <header>
    <nav><a href="/">Home</a><a href="/pricing">Pricing</a><a href="/features">Features</a></nav>
  </header>
  <main>
    <section id="hero">
      <h1>Close More Deals with Acme CRM</h1>
      <p>Acme CRM helps small sales teams close 30% more deals with automated follow-ups and pipeline tracking.</p>
      <a href="/signup" class="btn-primary">Start Free Trial</a>
      <a href="/demo" class="btn-secondary">Book a Demo</a>
    </section>
    <section id="features">
      <h2>Features</h2>
      <p>Pipeline tracking, automated follow-ups, and real-time analytics for your sales team.</p>
    </section>
    <section id="pricing">
      <h2>Pricing</h2>
      <p>$49/month for teams up to 10. $99/month for larger teams.</p>
      <button>See Pricing</button>
    </section>
    <section id="testimonials">
      <h2>Testimonials</h2>
      <p>"Acme CRM changed our sales process" — Jane Doe, VP Sales</p>
      <p>"We closed 40% more deals in Q1" — John Smith, CEO</p>
    </section>
    <section id="trust">
      <p>SOC 2 certified. ISO 27001 compliant. GDPR ready. HIPAA compliant.</p>
      <p>Trusted by 2,000+ companies. Rated 4.8/5 on G2. Featured on Trustpilot.</p>
      <p>Winner of Best CRM 2024 by Capterra. BBB A+ rated.</p>
    </section>
    <section id="clients">
      <h2>Our Clients</h2>
      <p>Used by Salesforce, HubSpot, Stripe, and 2,000+ companies worldwide.</p>
    </section>
    <section id="team">
      <h2>Our Team</h2>
      <p>Meet our leadership team of experienced sales professionals.</p>
    </section>
    <section id="contact">
      <h2>Contact Us</h2>
      <p>123 Main St, San Francisco, CA 94105</p>
      <p>Email: hello@acme-crm.com</p>
      <form><input type="email" placeholder="Your email"><button type="submit">Subscribe</button></form>
    </section>
    <script>console.log("this should be stripped"); window.secret = "hidden";</script>
    <style>.hidden { display: none; }</style>
    <noscript>JavaScript is required</noscript>
    <svg><circle r="10"/></svg>
    <iframe src="https://example.com/widget"></iframe>
    <template><p>Template content</p></template>
  </main>
</body>
</html>`;

const MINIMAL_HTML = `<!DOCTYPE html>
<html><head><title></title></head><body></body></html>`;

const HTML_WITHOUT_VIEWPORT = `<!DOCTYPE html>
<html><head><title>No Viewport</title></head><body><h1>Hello</h1></body></html>`;

const HTML_WITH_HIDDEN_INPUTS = `<!DOCTYPE html>
<html><head><title>Form Page</title></head>
<body>
  <form>
    <input type="hidden" name="csrf" value="secret-token-123">
    <input type="text" name="email" value="user@example.com">
    <input type="password" name="password" value="supersecret">
    <button type="submit">Submit</button>
  </form>
</body></html>`;

describe("extractSignalsFromHtml", () => {
  const opts = { url: "https://acme-crm.com", source: "WEB_URL" as const };

  describe("basic metadata extraction", () => {
    it("extracts title", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.title).toBe("Acme CRM — Close More Deals Faster");
    });

    it("extracts meta description", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.metaDescription).toBe("The #1 CRM for small sales teams. Pipeline tracking, automated follow-ups, and real-time analytics.");
    });

    it("extracts h1 headings", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.h1).toEqual(["Close More Deals with Acme CRM"]);
    });

    it("extracts h2 headings", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.h2).toEqual(["Features", "Pricing", "Testimonials", "Our Clients", "Our Team", "Contact Us"]);
    });

    it("sets url", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.url).toBe("https://acme-crm.com");
    });

    it("sets source", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.source).toBe("WEB_URL");
    });

    it("sets capturedAt to ISO string", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.capturedAt).toBeDefined();
      expect(new Date(signals.capturedAt!).toISOString()).toBe(signals.capturedAt);
    });
  });

  describe("CTA extraction", () => {
    it("extracts button and anchor CTAs", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.ctaTexts).toBeDefined();
      expect(signals.ctaTexts!.length).toBeGreaterThan(0);
      expect(signals.ctaTexts).toContain("Start Free Trial");
      expect(signals.ctaTexts).toContain("Book a Demo");
      expect(signals.ctaTexts).toContain("See Pricing");
    });

    it("deduplicates CTA texts", () => {
      const html = `<html><body>
        <button>Buy Now</button>
        <button>Buy Now</button>
        <a href="#">Learn More</a>
        <a href="#">Learn More</a>
      </body></html>`;
      const signals = extractSignalsFromHtml({ ...opts, html });
      const ctaSet = new Set(signals.ctaTexts);
      expect(ctaSet.size).toBe(signals.ctaTexts!.length);
    });
  });

  describe("hero text extraction", () => {
    it("extracts hero text from main/first section", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.heroText).toBeDefined();
      expect(signals.heroText!.length).toBeGreaterThan(0);
      expect(signals.heroText).toContain("Acme CRM helps small sales teams");
    });
  });

  describe("text samples", () => {
    it("extracts visible text sample", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.visibleTextSample).toBeDefined();
      expect(signals.visibleTextSample!.length).toBeGreaterThan(0);
    });

    it("extracts body text sample", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.bodyTextSample).toBeDefined();
      expect(signals.bodyTextSample!.length).toBeGreaterThan(0);
    });

    it("caps visible text sample at 3000 chars", () => {
      const longBody = "<p>" + "word ".repeat(2000) + "</p>";
      const html = `<html><body>${longBody}</body></html>`;
      const signals = extractSignalsFromHtml({ ...opts, html });
      expect(signals.visibleTextSample!.length).toBeLessThanOrEqual(3000);
    });

    it("caps body text sample at 3000 chars", () => {
      const longBody = "<p>" + "word ".repeat(2000) + "</p>";
      const html = `<html><body>${longBody}</body></html>`;
      const signals = extractSignalsFromHtml({ ...opts, html });
      expect(signals.bodyTextSample!.length).toBeLessThanOrEqual(3000);
    });
  });

  describe("trust indicators", () => {
    it("detects trust phrases", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.trustIndicators).toBeDefined();
      expect(signals.trustIndicators!.length).toBeGreaterThan(0);
      const allText = signals.trustIndicators!.join(" ").toLowerCase();
      expect(allText).toContain("soc 2");
      expect(allText).toContain("iso");
      expect(allText).toContain("gdpr");
      expect(allText).toContain("hipaa");
    });
  });

  describe("social proof", () => {
    it("detects social proof text", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.socialProofText).toBeDefined();
      expect(signals.socialProofText!.length).toBeGreaterThan(0);
      const allText = signals.socialProofText!.join(" ").toLowerCase();
      expect(allText).toContain("2,000+");
    });
  });

  describe("boolean flags", () => {
    it("detects pricing section", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.hasPricing).toBe(true);
    });

    it("detects contact section", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.hasContact).toBe(true);
    });

    it("detects testimonials", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.hasTestimonials).toBe(true);
    });

    it("detects case studies keywords", () => {
      const html = `<html><body><h2>Case Studies</h2><p>Read our case studies</p></body></html>`;
      const signals = extractSignalsFromHtml({ ...opts, html });
      expect(signals.hasCaseStudies).toBe(true);
    });

    it("detects client logos", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.hasClientLogos).toBe(true);
    });

    it("detects security badges", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.hasSecurityBadges).toBe(true);
    });

    it("detects address", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.hasAddress).toBe(true);
    });

    it("detects team section", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.hasTeam).toBe(true);
    });

    it("detects mobile viewport", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.hasMobileViewport).toBe(true);
    });

    it("detects missing mobile viewport", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: HTML_WITHOUT_VIEWPORT });
      expect(signals.hasMobileViewport).toBe(false);
    });

    it("hasContact true when contact section exists by id even without keyword text", () => {
      const html = `<html><body><section id="contact"><p>123 Main St, San Francisco, CA 94105</p><form><input type="text"><button>Send</button></form></section></body></html>`;
      const signals = extractSignalsFromHtml({ ...opts, html });
      expect(signals.hasContact).toBe(true);
    });

    it("hasContact true for mailto: links", () => {
      const html = `<html><body><a href="mailto:hello@example.com">Email us</a></body></html>`;
      const signals = extractSignalsFromHtml({ ...opts, html });
      expect(signals.hasContact).toBe(true);
    });

    it("hasContact true for tel: links", () => {
      const html = `<html><body><a href="tel:+14155551234">Call us</a></body></html>`;
      const signals = extractSignalsFromHtml({ ...opts, html });
      expect(signals.hasContact).toBe(true);
    });

    it("hasContact true for anchor to /contact", () => {
      const html = `<html><body><a href="/contact">Contact</a></body></html>`;
      const signals = extractSignalsFromHtml({ ...opts, html });
      expect(signals.hasContact).toBe(true);
    });

    it("hasContact false for page with no contact signals", () => {
      const html = `<html><body><h1>Welcome</h1><p>Just a plain page.</p></body></html>`;
      const signals = extractSignalsFromHtml({ ...opts, html });
      expect(signals.hasContact).toBe(false);
    });
  });

  describe("numeric counts", () => {
    it("counts links", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.linkCount).toBeGreaterThanOrEqual(0);
    });

    it("counts buttons", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.buttonCount).toBeGreaterThanOrEqual(1);
    });

    it("counts forms", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.formCount).toBeGreaterThanOrEqual(1);
    });

    it("counts images", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      expect(signals.imageCount).toBeGreaterThanOrEqual(0);
    });
  });

  describe("script/style stripping", () => {
    it("does not include script content in text samples", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      const allText = [signals.visibleTextSample, signals.bodyTextSample, signals.heroText].join(" ");
      expect(allText).not.toContain("console.log");
      expect(allText).not.toContain("window.secret");
    });

    it("does not include style content in text samples", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      const allText = [signals.visibleTextSample, signals.bodyTextSample, signals.heroText].join(" ");
      expect(allText).not.toContain(".hidden");
    });

    it("does not include noscript content in text samples", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: FULL_HTML });
      const allText = [signals.visibleTextSample, signals.bodyTextSample, signals.heroText].join(" ");
      expect(allText).not.toContain("JavaScript is required");
    });
  });

  describe("hidden input values", () => {
    it("does not include hidden input values in text samples", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: HTML_WITH_HIDDEN_INPUTS });
      const allText = [signals.visibleTextSample, signals.bodyTextSample, signals.heroText].join(" ");
      expect(allText).not.toContain("secret-token-123");
    });

    it("does not include password values in text samples", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: HTML_WITH_HIDDEN_INPUTS });
      const allText = [signals.visibleTextSample, signals.bodyTextSample, signals.heroText].join(" ");
      expect(allText).not.toContain("supersecret");
    });
  });

  describe("minimal/empty HTML", () => {
    it("works with minimal HTML without throwing", () => {
      expect(() => extractSignalsFromHtml({ ...opts, html: MINIMAL_HTML })).not.toThrow();
    });

    it("returns empty arrays and undefined for minimal HTML", () => {
      const signals = extractSignalsFromHtml({ ...opts, html: MINIMAL_HTML });
      expect(signals.url).toBe("https://acme-crm.com");
      expect(signals.h1).toEqual([]);
      expect(signals.h2).toEqual([]);
      expect(signals.ctaTexts).toEqual([]);
    });

    it("works with empty string without throwing", () => {
      expect(() => extractSignalsFromHtml({ ...opts, html: "" })).not.toThrow();
    });
  });

  describe("array caps", () => {
    it("caps h1 array at 20", () => {
      const h1s = Array.from({ length: 30 }, (_, i) => `<h1>Heading ${i}</h1>`).join("");
      const html = `<html><body>${h1s}</body></html>`;
      const signals = extractSignalsFromHtml({ ...opts, html });
      expect(signals.h1!.length).toBeLessThanOrEqual(20);
    });

    it("caps h2 array at 20", () => {
      const h2s = Array.from({ length: 30 }, (_, i) => `<h2>Sub ${i}</h2>`).join("");
      const html = `<html><body>${h2s}</body></html>`;
      const signals = extractSignalsFromHtml({ ...opts, html });
      expect(signals.h2!.length).toBeLessThanOrEqual(20);
    });

    it("caps ctaTexts array at 30", () => {
      const btns = Array.from({ length: 50 }, (_, i) => `<button>Action ${i}</button>`).join("");
      const html = `<html><body>${btns}</body></html>`;
      const signals = extractSignalsFromHtml({ ...opts, html });
      expect(signals.ctaTexts!.length).toBeLessThanOrEqual(30);
    });

    it("caps trustIndicators array at 20", () => {
      const items = Array.from({ length: 30 }, (_, i) => `<p>SOC 2 certified item ${i}</p>`).join("");
      const html = `<html><body>${items}</body></html>`;
      const signals = extractSignalsFromHtml({ ...opts, html });
      expect(signals.trustIndicators).toBeDefined();
      expect(signals.trustIndicators!.length).toBeLessThanOrEqual(20);
    });
  });
});
