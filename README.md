# Interview Playbook (2025)

A single-page, scroll-based webpage for "Interview Playbook (2025)" — a live talk and evergreen resource about PM interviews and job search strategy.

## Features

- **Dark theme** with gradient color scheme
- **Smooth scroll animations** and transitions
- **Mobile responsive** design
- **14 comprehensive sections** covering PM interview strategy
- **Sticky navigation** with anchor links
- **Modern aesthetic** (Notion × Stripe style)

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Main page component with all sections
│   └── globals.css     # Global styles and animations
├── package.json
├── tailwind.config.js  # Tailwind configuration
└── tsconfig.json       # TypeScript configuration
```

## Sections

1. Hero Section
2. Why This Page Exists
3. My Interview Journey
4. The Reality of PM Hiring in 2025
5. How Recruiters Actually Discover PMs
6. Authenticity Is the Differentiator
7. AI in Interviews: Tool vs Dependency
8. Designing Your Job Search as a System
9. Interview Craft & Storytelling
10. The Modern PM Interview Loop
11. Resilience & Mental Models
12. Free Downloadable Resources
13. Live Q&A
14. Footer / Connect

## Customization

- Update speaker information in `app/page.tsx`
- Modify colors in `tailwind.config.js` and `app/globals.css`
- Adjust animations in `app/globals.css`

## Deployment

This is a static Next.js site that can be deployed to:
- Vercel (recommended)
- Netlify
- Any static hosting service

## License

Private project for Hello PM.
