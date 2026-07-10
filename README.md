# Fakhri Djamaris - Modern Developer Portfolio

[![Next.js](https://img.shields.9ff.download/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.9ff.download/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.9ff.download/badge/Tailwind_CSS-v4.0-06b6d4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.9ff.download/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.9ff.download/badge/Framer_Motion-12.2-ff69b4?style=for-the-badge&logo=framer-motion)](https://www.framer.com/motion/)

Welcome to my personal portfolio repository! This website showcases my projects, skills, certifications, and learning journey as a **Machine Learning Engineer**, **iOS Developer**, and **Fullstack Web Developer**.

🌐 Live Demo: [fakhridjamaris.my.id](https://fakhridjamaris.my.id)

---

## ✨ Features

- **🌐 Dual Language Support (i18n):** Dynamically toggles between **English** and **Bahasa Indonesia** without full page reloads.
- **⚡ High Performance & Core Web Vitals Optimized:**
  - **Dynamic Lazy-loading:** Tabs and heavy components (like Charts or API widgets) are lazy-loaded on-demand, reducing initial bundle sizes by ~60%.
  - **Resource Hinting:** Direct preconnects and DNS-prefetches are set for APIs (`api.github.com`, etc.) and devicon CDNs to speed up fetching.
  - **Optimized WebP Assets:** All project screenshots and profile avatars are compressed to modern WebP format, achieving a **99%+ reduction in page payload** (avatar size reduced from 8.2MB to 30KB).
- **📊 Real-time GitHub Stats Integration:** Dynamic client-side widgets showing real-time statistics and contributions using GitHub APIs.
- **🎨 Modern Developer UI:** Fully responsive layout modeled after GitHub's interface, using dark mode aesthetics, glassmorphism headers, and smooth micro-animations powered by Framer Motion.
- **🧪 AI Lab (Interactive ML Demos):** Integrated client-side machine learning interfaces (Image Classifier and Sentiment Analyzer) for users to interact with ML models.

---

## 🛠️ Tech Stack

- **Core Framework:** [Next.js 16](https://nextjs.org/) (App Router) & [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + PostCSS
- **Animations:** [Framer Motion 12](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Data Fetching:** [SWR](https://swr.vercel.app/)
- **Data Visualization:** [Recharts](https://recharts.org/)

---

## 📁 Directory Structure

```text
├── app/                  # Next.js App Router (pages, layout, APIs, global styling)
├── components/           # Reusable UI components
│   ├── features/         # Logic-heavy features (e.g. GithubStats)
│   ├── layout/           # Page layouts (e.g. ProfileSidebar)
│   ├── sections/         # Individual sections (Projects, Skills, Journey, etc.)
│   └── ui/               # Core UI primitive components (LanguageToggle)
├── context/              # Context Providers (Language / i18n Context)
├── data/                 # Static JSON data files (projects, certificates)
├── public/               # Static assets (optimized images, vectors, resume PDF)
│   └── images/           # Avatar, custom SVG logos, and project screenshots
├── next.config.ts        # Next.js config
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

---

## 🚀 Getting Started

To run the development server locally:

### 1. Clone the repository
```bash
git clone https://github.com/fakhrizamaris/modern-portf.git
cd modern-portf
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 🎨 Asset Optimization Details

To guarantee maximum speed and Core Web Vitals scoring:
- The avatar image (`hero-profile.webp`) is optimized to **512x512 pixels** and saved as WebP format (reducing the file size from **8.19 MB** to **30 KB**).
- Project snapshots are optimized to **1000px width** max and converted to WebP (e.g. `chess-recs.webp` reduced from **4.12 MB** to **13 KB**).
- A custom-designed SVG vector logo (`logo.svg`) is used in place of static raster images, bringing mobile header asset loads down to under **1 KB**.

---

## 📬 Contact & Links

- **LinkedIn:** [Fakhri Djamaris](https://linkedin.com/in/fakhri-djamaris)
- **GitHub:** [@fakhrizamaris](https://github.com/fakhrizamaris)
- **Email:** [djamarisfakhri@gmail.com](mailto:djamarisfakhri@gmail.com)
