# Al Qalam International Cambridge School Website

A modern, professional educational institution website built with React, featuring a dark theme with golden branding colors.

## Features

### Pages Included:
- **Home** - Hero section with 3D animated sphere, stats, features, and CTA
- **About** - School history, mission/vision, timeline, principal message
- **Academics** - O/A Level programs, LMS features, assessment info
- **Robotics** - STEM labs, achievements, courses
- **STREAM** - Integrated learning framework (Science, Technology, Reading, Engineering, Arts, Mathematics)
- **Admissions** - Application process, requirements, online form
- **Gallery** - Photo gallery with categories (Campus, Events, Academics, Sports)
- **Contact** - Contact form, FAQ, social media links
- **Portal** - Student/Parent/Teacher login portals

### Key Components:
- **Navbar** - Responsive navigation with mobile menu
- **AI Chat Widget** - Floating chat assistant for inquiries

### Design Features:
- Dark theme with golden (#d4a017) accent colors
- Glassmorphism effects
- Smooth animations using Framer Motion
- 3D elements with Three.js/React Three Fiber
- Fully responsive design
- Tailwind CSS styling

## Tech Stack
- React 18
- React Router DOM
- Tailwind CSS
- Framer Motion
- Three.js / React Three Fiber
- Lucide Icons

## Getting Started

```bash
cd virtual-school
npm install
npm run dev
```

## Project Structure
```
virtual-school/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── AIChatWidget.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Academics.jsx
│   │   ├── Robotics.jsx
│   │   ├── STREAM.jsx
│   │   ├── Admissions.jsx
│   │   ├── Gallery.jsx
│   │   ├── Contact.jsx
│   │   └── Portal.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```

## Branding
- **School Name**: Al Qalam International Cambridge School
- **Primary Color**: Golden (#d4a017)
- **Theme**: Dark with glassmorphism effects
- **Typography**: Inter (body), Playfair Display (headings)

## Customization
Update the following in respective files:
- Contact information in Contact.jsx
- School address and phone numbers
- Principal name in About.jsx
- Social media links
- Gallery images (currently using Unsplash placeholders)
