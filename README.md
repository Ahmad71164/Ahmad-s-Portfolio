# Muhammad Ahmad Amir - Full Stack & 3D AI Portfolio

This is a premium, fully-functional, responsive, and animated full-stack developer portfolio website built for **Muhammad Ahmad Amir**. It features a modern dark space aesthetic with glowing violet and cyan highlights, an interactive 3D WebGL avatar that responds to mouse movements, custom GSAP scroll transitions, and a fully functional AI Chatbot assistant loaded with his complete resume details.

---

## 🚀 Key Features

1. **Futuristic 3D Avatar (Three.js & React Three Fiber):**
   - Renders a floating cybernetic bust in the center of the hero section.
   - Smoothly tracks and tilts towards the user's cursor on desktop viewports.
   - Emits dynamic glowing orbital rings and ambient particle effects (Sparkles).
2. **GSAP Scroll Animations:**
   - Responsive section reveals powered by GSAP and ScrollTrigger.
   - Smooth entrance timelines for hero typography and social links.
3. **Full-Stack AI Resume Chatbot (`/api/chat`):**
   - Floating assistant bubble allowing visitors to ask questions about Muhammad.
   - **Offline/Local Mode:** If no API keys are present, the bot utilizes a smart keyword-matching retrieval engine to answer questions about projects, skills, education, and contact details with 100% accuracy.
   - **AI/LLM Mode:** Simply supply a `GEMINI_API_KEY` in the environment variables, and the API route will call Google Gemini 2.5 Flash using a custom system prompt embedded with Muhammad's full resume.
4. **Full-Stack Contact Logging (`/api/contact`):**
   - Validates client-side inputs (Name, Email, Subject, Message) and submits them.
   - Logs submissions in a local datastore file at `src/data/contact-messages.json` (acting as a server-side JSON database log), logging to console, and returning responsive status cards.
5. **SEO & Performance Optimization:**
   - Configured page-level metadata, OpenGraph cards, and Twitter tags.
   - Google Fonts loaded via Next.js Font Optimization (`next/font/google`).
   - Monogram SVG-based brand favicon (`icon.svg`) dynamically handled by Next.js.
6. **Centralized Data Model (`src/utils/resumeData.ts`):**
   - All details (projects, education, work, skills) are stored in a single TypeScript object, making updates incredibly simple.

---

## 📂 Folder Structure

```
.
├── public/
│   └── favicon.ico               # Legacy favicon fallback
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/
│   │   │   │   └── route.ts      # Server API for Chatbot (Gemini + Local)
│   │   │   └── contact/
│   │   │       └── route.ts      # Server API for Contact form logger
│   │   │   globals.css           # Global HSL tokens, resets, keyframe animations
│   │   │   layout.tsx            # Main HTML layout, Font optimization & SEO
│   │   │   page.tsx              # Combined responsive sections page
│   │   │   page.module.css       # Layout styles & footer formatting
│   │   │   icon.svg              # Brand monogram SVG favicon
│   │   ├── components/
│   │   │   ├── Navbar.tsx        # Sticky glassmorphic navigation
│   │   │   ├── Navbar.module.css
│   │   │   ├── Hero.tsx          # Dynamic rotating typing text & 3D loader
│   │   │   ├── Hero.module.css
│   │   │   ├── ThreeAvatar.tsx   # React Three Fiber 3D scene (mouse tracker)
│   │   │   ├── ScrollReveal.tsx  # GSAP ScrollTrigger animation wrapper
│   │   │   ├── About.tsx         # Bio details & timeline layout
│   │   │   ├── About.module.css
│   │   │   ├── Projects.tsx      # Projects filter toggle & cards grid
│   │   │   ├── Projects.module.css
│   │   │   ├── ProjectCard.tsx   # Glassmorphic project cards
│   │   │   ├── ProjectCard.module.css
│   │   │   ├── Skills.tsx        # Skills cards & custom tags
│   │   │   ├── Skills.module.css
│   │   │   ├── Contact.tsx       # Message form with active validation
│   │   │   ├── Contact.module.css
│   │   │   ├── Chatbot.tsx       # Floating AI Chat widget with suggestions
│   │   │   └── Chatbot.module.css
│   │   └── utils/
│   │       └── resumeData.ts     # Single source of truth for resume info
├── package.json
└── README.md                     # Setup guide
```

---

## 🛠️ Local Setup Instructions

Follow these steps to run the project locally on your machine:

### 1. Prerequisite Checks
Ensure you have **Node.js (v18.0.0 or higher)** and **npm** installed:
```bash
node -v
npm -v
```

### 2. Install Project Dependencies
Run the package installation script. (Note: using `--legacy-peer-deps` avoids conflicts during package registration under React 19/Next.js 16):
```bash
npm install --legacy-peer-deps
```

### 3. Setup Environment Variables (Optional)
To enable the advanced Gemini-powered AI chatbot:
1. Create a `.env.local` file in the root directory.
2. Add your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```
*If omitted, the chatbot will automatically run in local mode, using string-keyword matching to return 100% accurate responses from `resumeData.ts` immediately.*

### 4. Start the Local Server
Run the local Next.js development server:
```bash
npm run dev
```
Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the live site.

### 5. Create a Production Build
Compile the site for production build validation:
```bash
npm run build
```

---

## 🚀 Deployment Instructions (Vercel in 3 Steps)

The easiest way to deploy this full-stack Next.js application is using **Vercel**:

1. **Push to GitHub:**
   Initialize a git repository, commit the files, and push them to a private/public GitHub repository.
2. **Import to Vercel:**
   Log into [Vercel](https://vercel.com), click **Add New Project**, and import your repository.
3. **Configure Environment Variables (Optional):**
   Under the project configuration settings on Vercel, navigate to **Environment Variables** and add:
   - `GEMINI_API_KEY` = `your_gemini_api_key`
4. **Deploy:**
   Click **Deploy**. Vercel will build and serve your full-stack site on a fast, global serverless hosting network with optimized caching.
