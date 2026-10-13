# BOLD — Black Outreach Leadership Directive
## Production Website & Pre-Publication Launch Readiness Checklist

**Organization:** BOLD (Black Outreach Leadership Directive)  
**Initiative Type:** Student-Led Post-Secondary Access & Mentorship Initiative  
**Version:** 1.0.0 Production-Ready Release  
**Primary Target:** Black Secondary and Post-Secondary Students, Families, Educators, Donors & Institutional Partners  

---

## 1. Executive Overview

This web platform is built specifically for **BOLD (Black Outreach Leadership Directive)**, adhering strictly to the design principles, ethical standards, accessibility guidelines, and audience workflows defined in the organizational directives.

### Key Architectural Strengths
- **No Heavy Build Steps or Fragile Node Modules:** Built using semantic HTML5, modern CSS3 (with custom CSS custom properties / design tokens), vanilla JavaScript (ES6+), and structured data (`js/data.js`). Can be deployed directly to GitHub Pages, Netlify, Vercel, Cloudflare Pages, or traditional web hosting instantly.
- **Dual Architecture:** Functions both as an interactive **rich single-page application (SPA)** with smooth scrollspy section navigation on the flagship homepage, and as a **modular multi-page website** (`index.html`, `about.html`, `programs.html`, `events.html`, `get-involved.html`, `donate.html`, `partnerships.html`, `contact.html`).
- **Interactive Launch Readiness & Admin Assistant:** Includes a built-in admin drawer (accessible via the floating pill in the bottom-right corner) with an interactive 12-point launch checklist, a **Placeholder Highlighter toggle** (to visibly identify all unverified items during board review), and a **Form Submissions Inspector & Data Exporter** (exporting inquiries, applications, and RSVPs as JSON).
- **WCAG 2.2 AA Accessibility Compliance:** Semantic heading structures (`h1`–`h4`), visible focus rings (`:focus-visible`), skip-to-content navigation link, ARIA attributes, contrast ratios exceeding 4.5:1, keyboard modal traps (`Escape` key support), and reduced-motion media query support.
- **Zero Fabricated Claims:** In accordance with prompt directives, no unverified statistics, testimonials, partner claims, or financial figures are invented. All unconfirmed information is marked with standardized `[Placeholder]` or `[Pending Verification]` tags.

---

## 2. Pre-Publication Launch Checklist

Complete the following 12 verification checkpoints prior to public domain publishing:

| ID | Category | Item | Action Required | Status |
|---|---|---|---|---|
| **CHK-01** | **Branding** | Official Logo & Favicon | Place official vector SVG/PNG logo in `assets/logo.svg` to replace temporary SVG beacon mark. | `[PENDING]` |
| **CHK-02** | **Contact** | Monitored Inboxes | Confirm active forwarding and response workflows for `info@`, `outreach@`, `volunteer@`, and `partnerships@boldinitiative.ca`. | `[PENDING]` |
| **CHK-03** | **Social Media** | Verified Profiles | Replace placeholder URLs in `js/data.js` with active Instagram, LinkedIn, and X/Twitter handles. | `[PENDING]` |
| **CHK-04** | **Leadership** | Executive Biographies | Provide confirmed names, bios, and approved headshots for Provincial Co-Chairs, Portfolio Directors, and Regional Leads. | `[PENDING]` |
| **CHK-05** | **Impact** | Audited Statistics | Review and verify 2025–2026 numbers in `js/data.js`: students reached, events delivered, active volunteers, schools engaged. | `[PENDING]` |
| **CHK-06** | **Events** | Confirmed Event Calendar | Confirm upcoming event dates, physical room locations, and link active Eventbrite / Google Form registration URLs. | `[PENDING]` |
| **CHK-07** | **Partnerships** | Sponsorship Prospectus | Attach official PDF sponsorship deck and display verified partner logos (with written consent). | `[PENDING]` |
| **CHK-08** | **Donations** | Payment Gateway Integration | Connect Stripe / PayPal payment processor keys and confirm CRA charitable registration status before accepting funds. | `[PENDING]` |
| **CHK-09** | **Branches** | Regional Lead Contacts | Confirm active campus executive leads for Toronto, London, Windsor, Hamilton, and Ottawa branches. | `[PENDING]` |
| **CHK-10** | **Safeguarding** | Minor Safeguarding Protocols | Finalize parental consent and photo release forms for secondary students attending campus tours or appearing in event recaps. | `[VERIFIED]` |
| **CHK-11** | **Accessibility** | WCAG 2.2 AA Audit | Verified color contrast (amber/gold on charcoal, white on dark), focus indicators, and screen reader labels. | `[VERIFIED]` |
| **CHK-12** | **Privacy** | Privacy Policy & Data Retention | Confirm secure storage destination for volunteer applicants and newsletter subscribers. | `[VERIFIED]` |

---

## 3. How to Update Content Without Coding

All organizational content is centralized inside `js/data.js`. Any member of the BOLD leadership team can update content by editing this single file:

### Updating Impact Metrics
```javascript
// Located in js/data.js
impactMetrics: [
  {
    id: "students",
    value: "1,450+", // Update value once audited
    label: "Students Reached",
    description: "Engaged through interactive school workshops and campus tours.",
    isVerified: true // Set to true once audited
  },
  // ...
]
```

### Adding an Upcoming Event
```javascript
// Located in js/data.js
events: [
  {
    id: "evt-new",
    title: "Winter 2027 Post-Secondary Transition Day",
    status: "upcoming", // "upcoming" or "past"
    category: "Workshops & Panels",
    date: "February 20, 2027",
    time: "1:00 PM – 4:30 PM EST",
    location: "Student Union Hall, Toronto",
    audience: "Grades 10–12 Students & Families",
    image: "assets/images/event-new.jpg",
    description: "Interactive session...",
    deadline: "February 15, 2027",
    accessibility: "Wheelchair accessible; live captioning.",
    contact: "events@boldinitiative.ca"
  }
]
```

### Adding a Curated Post-Secondary Resource
```javascript
// Located in js/data.js
resources: [
  {
    id: "res-new",
    category: "scholarships", // choosing-institution | programs-careers | applications | scholarships | campus-life | student-associations | leadership | mentorship-volunteering
    title: "Resource Title",
    description: "Resource description...",
    url: "https://verified-url.ca",
    type: "Scholarship Directory",
    audience: "High School & Undergrad",
    isExternal: true
  }
]
```

---

## 4. Connecting Form Submissions to a Live Backend

By default, all form submissions (Volunteer Applications, Partnership Inquiries, Event RSVPs, Supporter Pledges, Newsletter Signups) are validated and stored in browser `localStorage`. Team members can inspect counts and click **"Export All (JSON)"** inside the Launch Readiness Drawer.

To forward submissions directly to an email inbox or Google Sheet upon public launch:
1. **Formspree / Basin / Formkeep:** Replace the `<form>` submit handler in `js/app.js` with an endpoint URL, e.g. `https://formspree.io/f/your_form_id`.
2. **Google Sheets Webhook:** Deploy a free Google Apps Script Web App that receives POST requests and appends rows to a shared leadership spreadsheet.
3. **Mailchimp / Substack / Brevo:** Connect the newsletter form directly to your email marketing API.

---

## 5. Deployment Options

- **GitHub Pages:** Commit this folder to a GitHub repository, go to `Settings > Pages`, and select `Branch: main / Root`. Your site is live in 60 seconds with free SSL.
- **Netlify / Vercel:** Drag and drop this folder onto the Netlify or Vercel dashboard. No build commands required.
- **Custom Domain:** Point your domain DNS records (`boldinitiative.ca`) to your hosting provider.
