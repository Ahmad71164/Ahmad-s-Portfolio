# 🌌 Ahmad's Portfolio — Full Stack & AI Developer

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Muhammad%20Ahmad%20Amir-Portfolio-8b5cf6?style=for-the-badge&logo=vercel&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed%20on%20Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

### 🚀 [**View Live Demo →**](https://mahmadamir-portfolio-fgxkoeem2.vercel.app)

*A premium full-stack developer portfolio featuring 3D WebGL visuals, AI-powered chatbot, GSAP animations, and a modern dark space aesthetic.*

</div>

---

## ✨ Features at a Glance

| Feature | Description |
|---|---|
| 🤖 **AI Chatbot** | Gemini 2.5 Flash-powered assistant with full resume context |
| 🌐 **3D Avatar** | Three.js / React Three Fiber interactive WebGL scene |
| ⚡ **GSAP Animations** | Scroll-triggered reveal timelines throughout the page |
| 📬 **Contact Form** | Full-stack Nodemailer email delivery system |
| 🎨 **Custom Cursor** | Animated magnetic cursor with trail effects |
| 🌙 **Dark Space Theme** | Glassmorphism UI with violet & cyan neon accents |
| 📱 **Fully Responsive** | Pixel-perfect across mobile, tablet, and desktop |
| 🔒 **Secure API Routes** | User session validation on all API endpoints |

---

## 🖼️ UI Preview

### Hero Section
> Cinematic full-viewport hero with animated typing text, floating 3D orbital scene, personal headshot, and call-to-action buttons with a **Download CV** feature.

### About Section
> Split-layout bio card with an animated professional timeline showing education and experience milestones with glowing connector lines.

### Projects Section
> Filterable glassmorphic project cards grid with category tabs (All / Web / Mobile / AI / Design), hover lift animations, and tech stack badges.

### Skills Section
> Animated skill category cards with icon grids, shimmer effects, and curated badges for every technology stack.

### Contact Section
> Premium contact form with real-time client-side validation, animated input fields, and full Nodemailer email delivery integration.

### AI Chatbot Widget
> Floating bottom-right chat bubble — powered by Google Gemini 2.5 Flash with a custom system prompt embedding the full resume. Falls back gracefully to a smart local keyword-matching engine.

---

## 🛠️ Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/Next.js%2016-000?logo=nextdotjs)
![React 19](https://img.shields.io/badge/React%2019-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP%203-88CE02?logo=greensock&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000?logo=threedotjs)
![CSS Modules](https://img.shields.io/badge/CSS%20Modules-000?logo=cssmodules)

### Backend / APIs
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-22B573?logo=maildotru&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Gemini%202.5%20Flash-4285F4?logo=google&logoColor=white)

### Deployment & Tools
![Vercel](https://img.shields.io/badge/Vercel-000?logo=vercel)
![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github)

---

## 📂 Project Architecture

```
Ahmad-s-Portfolio/
├── public/
│   ├── profile.jpg           # Personal headshot
│   ├── resume.pdf            # Downloadable CV
│   └── manifest.json         # PWA manifest
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts     # AI Chatbot API (Gemini + local fallback)
│   │   │   └── contact/route.ts  # Contact form (Nodemailer)
│   │   ├── layout.tsx            # Root layout + SEO metadata
│   │   ├── page.tsx              # Main page composition
│   │   └── globals.css           # HSL design tokens + animations
│   ├── components/
│   │   ├── Hero.tsx              # 3D scene + typing animation
│   │   ├── ThreeAvatar.tsx       # React Three Fiber WebGL scene
│   │   ├── Chatbot.tsx           # Floating AI chat widget
│   │   ├── Projects.tsx          # Filterable project cards grid
│   │   ├── Skills.tsx            # Animated skills showcase
│   │   ├── Contact.tsx           # Full-stack contact form
│   │   ├── Navbar.tsx            # Sticky glassmorphic navigation
│   │   └── ...                   # 12+ more components
│   └── utils/
│       └── resumeData.ts         # Single source of truth for all resume data
├── vercel.json               # Vercel deployment configuration
└── package.json
```

---

## 🔐 Security

- All API routes validate session tokens via HttpOnly cookies
- Environment variables (API keys, SMTP credentials) are excluded from the repository
- Input validation on all form fields both client-side and server-side
- Rate-limited AI endpoint with Gemini fallback to local engine

---

## 📬 Contact

**Muhammad Ahmad Amir**  
Software Engineering Student @ FAST-NUCES, Faisalabad  

[![Email](https://img.shields.io/badge/Email-muhammadahmadamir7%40gmail.com-D14836?logo=gmail&logoColor=white)](mailto:muhammadahmadamir7@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?logo=linkedin&logoColor=white)](https://linkedin.com/in/muhammad-ahmad-amir)
[![Portfolio](https://img.shields.io/badge/Live%20Portfolio-View%20Now-8b5cf6?logo=vercel&logoColor=white)](https://mahmadamir-portfolio-fgxkoeem2.vercel.app)

---

<div align="center">

*Built with ❤️ using Next.js 16, React 19, Three.js, GSAP & Google Gemini AI*

</div>
