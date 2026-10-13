# BOLD — Black Outreach Leadership Directive

> **“Empowering Black Students. Opening Doors. Building Futures.”**

A professional, modern, visually compelling, and fully responsive digital platform built for **BOLD (Black Outreach Leadership Directive)**—a student-led community initiative dedicated to increasing and enabling Black student success at the post-secondary level.

---

## 🚀 Quick Start (Run Locally)

You can view the website immediately in any web browser without installing Node.js, npm, or any external dependencies!

### Option 1: Using Python's Built-in Server (Recommended)
From this project directory, run:
```bash
python3 -m http.server 8080
```
Then open your browser to **[http://localhost:8080](http://localhost:8080)**.

### Option 2: Open Directly
Double-click `index.html` to open it in Chrome, Safari, Firefox, or Edge.

---

## 📁 Project Structure

```
bold-directive/
├── index.html                 # Flagship homepage (All 15 sections + interactive modals)
├── about.html                 # Dedicated About Us page (Mission, Story, Vision, Values, Leadership)
├── programs.html              # Dedicated Programs & searchable Post-Secondary Resource Hub
├── events.html                # Dedicated Events page (Upcoming vs Past archives, RSVP modal)
├── get-involved.html          # Dedicated Volunteer recruitment & functional application form
├── donate.html                # Dedicated Donate & Support page (CAD amounts, monthly switch, legal notice)
├── partnerships.html          # Dedicated Institutional & School Partnerships page
├── contact.html               # Dedicated Contact page (Inquiry routing & directory)
├── css/
│   └── style.css              # Master design system (Tokens, glassmorphism, gold/charcoal theme, WCAG AA)
├── js/
│   ├── data.js                # Central content data store (Non-technical editing of metrics, events, team)
│   ├── app.js                 # Master client logic (Search, filters, modals, form validation, storage)
│   └── admin.js               # Launch Readiness & Admin Assistant (Checklist, placeholder highlighter, export)
├── docs/
│   └── LAUNCH_CHECKLIST.md    # Pre-publication verification checklist & backend connection guide
└── assets/                    # Graphic assets and SVG marks
```

---

## 🎨 Brand Identity & Design System

- **Primary Dark Canvas:** Deep charcoal & obsidian (`#0A0B0E`, `#12141A`, `#1A1D24`)
- **Brand Amber & Warm Gold:** Optimism, excellence & opportunity (`#F59E0B`, `#D97706`, `#FBBF24`, `#FFFBEB`)
- **Crisp Neutral & Cream:** Maximum readability & text contrast (`#FFFFFF`, `#FAF9F5`, `#CBD5E1`)
- **Typography:** Bold sans-serif display typography with tight letter tracking for headings, paired with high-legibility body copy.
- **Imagery:** Authentic high-resolution photography highlighting Black students studying, mentoring, and speaking in campus environments (zero tokenism).

---

## ⚙️ Interactive Features

1. **Post-Secondary Resource Hub:** Real-time search and 8-category filter buttons for verified university, college, scholarship, and student association resources.
2. **Events Hub & Free RSVP:** Toggle between Upcoming and Past events with detailed modals and working RSVP registration form.
3. **Volunteer Recruitment CRM:** 5 defined volunteer/leadership roles with status badges, requirements, and a multi-step application form with local CRM storage.
4. **Donation Calculator & Supporter Pledge:** Canadian Dollar (CAD) amounts ($25, $50, $100, $250, custom), monthly sustainer toggle, and transparent nonprofit disclosures.
5. **Launch Readiness & Admin Assistant:** A floating control pill (`⚙️ Launch Readiness`) that opens a side drawer featuring:
   - 12-point interactive Launch Checklist with live progress bar
   - **"Highlight Placeholders" toggle** that highlights all unverified content on the site
   - **Form Submissions Inspector & Data Exporter** allowing one-click JSON export of all collected forms
   - Downloadable Markdown Audit Report

---

## 📋 Launch Verification Checklist

Before publishing to your official domain (`boldinitiative.ca`), review `docs/LAUNCH_CHECKLIST.md` to finalize:
- Official vector logo asset
- Active forwarding for organizational email addresses
- Audited 2025–2026 student participant metrics
- Executive leadership biographies and headshots
- Payment gateway credentials (Stripe / PayPal)

---

## 📄 License & Community Stewardship

Created for **BOLD — Black Outreach Leadership Directive**. Designed in Ontario, Canada.
