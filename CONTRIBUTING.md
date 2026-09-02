# Contributing to Phocus ⚡

First off, thank you for considering contributing to **Phocus**! 🎉 It's people like you that make open source such an incredible place to learn, inspire, and create.

Whether you are fixing a bug, adding a new ambient soundscape, proposing a hilarious animal dialogue, or designing a brand-new theme, all contributions are warmly welcomed!

---

## 🧭 Table of Contents

- [Ways to Contribute](#ways-to-contribute)
- [Local Development Setup](#local-development-setup)
- [Project Architecture](#project-architecture)
- [How to Submit a Contribution](#how-to-submit-a-contribution)
- [Contribution Ideas (Good First Issues)](#contribution-ideas-good-first-issues)
- [Code Style & Standards](#code-style--standards)

---

## 💡 Ways to Contribute

You don't need to be a senior engineer to contribute. Here are some fun ways to help:

1. 🐾 **Animal Universe Banter**: Add witty, lighthearted conversation scripts between animals in `src/utils/companionConversations.js`.
2. 🎧 **Ambient Audio**: Craft procedural Web Audio ambient generators (e.g. campfire crackle, ocean waves, cafe chatter) in `src/utils/audioEngine.js`.
3. 🎨 **Themes & Shaders**: Design new aesthetic themes or custom WebGL backgrounds.
4. 🐛 **Bug Fixes**: Help resolve issues or improve cross-device responsiveness.
5. 📖 **Documentation**: Enhance guides, fix typos, or share workflow tips.

---

## 🛠️ Local Development Setup

Setting up Phocus takes less than 2 minutes:

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm or yarn

### Steps

1. **Fork the repository** on GitHub by clicking the **Fork** button at the top right of [Deeprockz22/Notes-App](https://github.com/Deeprockz22/Notes-App).

2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Notes-App.git
   cd Notes-App
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the local dev server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser. Live reloading is enabled!

5. **Verify production build before submitting**:
   ```bash
   npm run build
   ```

---

## 🏗️ Project Architecture

```
Notes-App/
├── src/
│   ├── components/
│   │   ├── timer/               # Pomodoro timer, Zen mode, Animal Universe
│   │   ├── notes/               # Brain dump notes, Whiteboard canvas, PIN lock
│   │   ├── brand/               # Brand logos and iconography
│   │   ├── react-bits/          # Animated UI components & WebGL shaders
│   │   └── ui/                  # Reusable UI primitives
│   ├── utils/
│   │   ├── companionConversations.js  # All animal characters & 20 conversation sagas
│   │   ├── trendingTopicsService.js   # Live daily trending headlines fetcher
│   │   ├── audioEngine.js             # Web Audio procedural sound synthesizer
│   │   └── storage.js                 # LocalStorage persistence helpers
│   ├── App.jsx                  # Main application container & theme state
│   ├── index.css                # Global design tokens, themes & layout styles
│   └── main.jsx                 # Application entry point
├── public/                      # Icons, manifest, audio assets
└── vite.config.js               # Vite configuration
```

---

## 🚀 How to Submit a Contribution

1. **Create a new branch** for your feature or fix:
   ```bash
   git checkout -b feat/add-capybara-companion
   ```

2. **Make your changes** and test them thoroughly in your browser.

3. **Commit your changes** using clean, descriptive commit messages:
   ```bash
   git commit -m "feat(universe): add Capybara and Red Panda animal companions"
   ```

4. **Push to your fork**:
   ```bash
   git push origin feat/add-capybara-companion
   ```

5. **Open a Pull Request (PR)**:
   - Go to the original [Deeprockz22/Notes-App](https://github.com/Deeprockz22/Notes-App) repository on GitHub.
   - You'll see a banner prompting you to create a Pull Request from your branch.
   - Describe what you added or fixed, and include a screenshot or GIF if relevant!

---

## 🌟 Contribution Ideas (Good First Issues)

Looking for inspiration? Here are great starting points:
- [ ] Add a new animal companion (e.g. Capybara 🦫, Red Panda 🦊, Sloth 🦥)
- [ ] Write a new funny dialogue topic (e.g. Alien tourists visiting Earth, Coffee addiction, Time travel paradoxes)
- [ ] Add a new procedural soundscape (e.g. Campfire embers, Forest birds, Wind chimes)
- [ ] Add custom keyboard shortcuts for quick note capture
- [ ] Improve mobile touch gestures for whiteboard drawing

---

## 📜 Code of Conduct

Please review our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a respectful, welcoming, and harassment-free experience for everyone.

Thank you for helping make Phocus awesome! ✨
