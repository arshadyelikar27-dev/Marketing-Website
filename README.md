# Velora - Cinematic Production Studio

Welcome to the frontend repository for **Velora**, a cinematic production studio specializing in weddings, events, business, and brand promotion.

This project is a high-performance, visually stunning portfolio website featuring 3D elements and smooth scroll animations.

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **3D Graphics:** [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) & [@react-three/drei](https://github.com/pmndrs/drei)
- **Animations:** [GSAP](https://gsap.com/) (GreenSock) & ScrollTrigger
- **Routing:** [@tanstack/react-router](https://tanstack.com/router/latest)

## ✨ Key Features

- **Immersive 3D Hero Section:** A custom 3D camera model that elegantly rotates into view upon loading, built with React Three Fiber.
- **Cinematic Animations:** Premium scroll-triggered animations and text reveal effects powered by GSAP.
- **Screen-Detect Responsiveness:** Uses optimized `window.matchMedia` hooks to conditionally render 3D detail layers (e.g., dynamically adjusting WebGL particles and DPR) to guarantee 60fps performance across desktop, tablet, and mobile devices without lag.
- **Buttery Smooth Scrolling:** Native smooth scrolling implementation perfectly synced with scroll triggers.

## 📦 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate into the directory:
   ```bash
   cd "velora web"
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the local Vite server:
```bash
npm run dev
```

To expose the server to your local network (so you can view it on your phone):
```bash
npm run dev -- --host
```

The site will typically be available at `http://localhost:5173`.

### Building for Production

To create an optimized production build:
```bash
npm run build
```
The compiled files will be located in the `dist` directory.

To preview the production build locally:
```bash
npm run preview
```

## 🎨 Design Philosophy

Velora's digital presence is designed to reflect its brand: premium, atmospheric, and cinematic. We employ a deep color palette (near-black, ivory, warm gold, and muted taupe) combined with a rich `Cormorant Garamond` display font to create a dramatic, documentary-like aesthetic.
