# 🌍 TravelGuide Pro — Programmatic SEO Travel Platform

<p align="center">
  <b>SEO-Optimized Travel Website built with Next.js</b><br/>
  Dynamic Destination Pages • Programmatic SEO • Structured Data • SSR
</p>

<p align="center">
  <a href="https://seo-travel-site.vercel.app/"><img src="https://img.shields.io/badge/Live-Demo-success?style=for-the-badge&logo=vercel"></a>
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js">
  <img src="https://img.shields.io/badge/SEO-Programmatic-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel">
</p>

---

## 🚀 Live Website

🌐 **Production URL:**
https://seo-travel-site.vercel.app/

---

## ✨ Project Overview

**TravelGuide Pro** is a modern travel discovery platform designed to demonstrate **real-world Programmatic SEO implementation** using Next.js.

The project automatically generates SEO-ready travel destination pages with:

* Dynamic metadata
* Structured schema (JSON-LD)
* SEO-friendly URLs
* Server-side rendering (SSR)
* Dynamic content rendering from APIs/local data

This architecture mimics how large travel platforms scale SEO pages efficiently.

---

## 🧰 Tech Stack

### Frontend

* Next.js (Pages Router)
* React
* Tailwind CSS
* Framer Motion

### SEO & Performance

* Programmatic SEO architecture
* JSON-LD Structured Data
* OpenGraph + Twitter Cards
* Canonical URLs
* Dynamic meta tags

### Data Sources

* Local destination dataset (`destinations.json`)
* Wikipedia API (descriptions & images)
* OpenStreetMap (geo information)

### Deployment

* Vercel (CI/CD via GitHub)

---

## 🌎 Core Features

### 🔎 Dynamic Destination Pages

Route structure:

```
/destinations/[slug]
```

Features:

* Server-side rendered pages (SSR)
* Dynamic SEO metadata
* Structured schema injection
* SEO-friendly slugs

Example:

```
/destinations/munnar
/destinations/paris
```

---

### 📈 Programmatic SEO Implementation

Each page automatically generates:

✔ Dynamic Title Tags
✔ Meta Description
✔ Keywords
✔ OpenGraph Data
✔ Twitter Cards
✔ Canonical URLs
✔ TouristDestination Schema
✔ Breadcrumb Schema

---

### 🧠 Structured Content Sections

Every destination page includes:

* 📌 Keyword Title
* 🌄 Best Places to Visit
* 💰 Average Travel Cost
* 🧭 Destination Overview

---

### 🔍 Smart Search Experience

* Animated search box
* Destination suggestions
* Dynamic routing
* Clean slug generation logic

---

### 🎨 Modern UI / UX

* Glassmorphism design system
* Cinematic dark theme
* Smooth animations
* Fully responsive layout

---

## ⚙️ Architecture (High Level)

```
User Search
     ↓
Next.js API Route
     ↓
Wikipedia + OpenStreetMap APIs
     ↓
SEO Metadata + Schema Generator
     ↓
SSR Destination Page
```

---

## 📂 Project Structure

```
seo-travel-site
│
├── components/
│   ├── DestinationCard.js
│   ├── Footer.js
│   ├── Header.js
│   ├── SearchBox.js
│   └── SEOHead.js
│
├── pages/
│   ├── index.js
│   ├── api/
│   │   └── search.js
│   └── destinations/
│       └── [slug].js
│
├── data/
│   └── destinations.json
│
├── styles/
│   └── globals.css
│
├── utils/
│   └── seo.js
│
└── public/
```

---

## ⚙️ Local Development Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/seo-travel-site.git
cd seo-travel-site
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Run Development Server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🌐 Deployment

Deployed using **Vercel**:

```bash
git push → Auto Deploy
```

Environment Variable (optional):

```
NEXT_PUBLIC_SITE_URL=https://seo-travel-site.vercel.app
```

---

## 📊 SEO Strategy

Keyword research process included:

* Ubersuggest
* Google Autocomplete suggestions
* Travel search intent analysis

Applied across:

* URLs (`/destinations/[slug]`)
* Page titles
* Meta descriptions
* Headings (H1, H2)
* Structured schema
* Internal linking

---

## 🧩 What Makes This Project Strong (Interview Ready)

This project demonstrates:

* Programmatic SEO architecture
* SSR in Next.js
* Dynamic schema generation
* Real API integration
* Scalable page structure
* Modern UI + performance optimization

---

## 📌 Future Improvements

* AI-generated travel summaries
* Automatic image optimization
* Multi-language SEO pages
* Sitemap.xml automation
* Google Search Console integration

---

## 👩‍💻 Author

**Devika CV**

Built as a real-world SEO engineering + modern frontend architecture project.

---

## ⭐ If you like this project

Give it a ⭐ on GitHub — it helps!
