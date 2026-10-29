<p align="center">
  <img src="tab.png" alt="NN Tab Logo" width="80" />
</p>

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=40&pause=1000&color=007ACC&center=true&vCenter=true&width=1200&lines=Thanks+Sandip+for+developing+the+iOS+version" alt="Animated Text" />
</div>

<h1 align="center">NN Tab</h1>

<p align="center">
  <strong>A sleek, ultra-minimalist New Tab dashboard for Safari (macOS) and Chrome.</strong><br/>
  Crafted with pure vanilla web technologies — zero frameworks, zero bloat, instant load.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Manifest-V3-blue?style=flat-square" alt="Manifest V3" />
  <img src="https://img.shields.io/badge/Version-1.21-green?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=googlechrome&logoColor=white" alt="Chrome Extension" />
  <img src="https://img.shields.io/badge/Safari-Extension-006CFF?style=flat-square&logo=safari&logoColor=white" alt="Safari Extension" />
</p>

---

## ✨ Features

### 🕐 Dynamic Clock & Date
A sleek, real-time digital clock serves as the centerpiece of the left panel, displaying the current time and a fully formatted date (weekday, month, day) — updated every second.

### 💬 Editable Inspirational Quotes
A glassmorphic quote card displays motivational quotes. **Double-click** (or right-click) the quote widget to open an edit modal and set your own custom quote and author — persisted across sessions via local storage.

### 📝 Built-in Todo / Notes Widget
Keep track of your daily tasks directly from the new tab. Add notes with a single click, and double-click a note to edit it, and mark it complete with the check button. All notes are saved locally through `chrome.storage`.

### 🔖 Smart Bookmarks Grid
A highly customizable bookmarking system with:
- **Add, edit, and delete** bookmarks via a sleek glassmorphic modal.
- **Live icon preview** — the modal fetches and displays the favicon in real-time as you type a URL.
- **Manual icon cycling** — don't like the auto-fetched icon? Click **"Next Icon"** to cycle through all available providers until you find the perfect one.
- **Drag-and-drop reordering** — rearrange your bookmarks in any order you prefer, with smooth drag animations.
- **Category assignment** — assign each bookmark to a custom category for organized browsing.
- **Right-click to edit** — right-click any bookmark to open it in the edit modal with all fields pre-populated.

### 🗂️ Custom Category Tabs
Organize your bookmarks into filterable categories:
- **Default categories:** All, Bookmarks, Work, Social.
- **Add custom categories** by clicking the `+` button in the tab bar.
- **Right-click any tab** to rename or delete it.
- **Active tab persistence** — your last selected tab is remembered across sessions.

### 🔮 Universal Favicon Cascade
Most bookmark managers struggle to find good icons for less popular websites. NN Tab features an advanced **9-step Favicon Resolver Cascade** that cycles through multiple high-quality APIs to guarantee a beautiful, pixel-perfect icon for any website.

The fallback chain checks these providers sequentially until a high-res icon is found:

| Priority | Provider | Notes |
|:---:|---|---|
| 1 | **Google Favicon V2** (128px) | Prioritized for popular domains |
| 2 | **Clearbit Logo API** | High-quality company logos |
| 3 | **Unavatar** | Aggregator — checks multiple sources |
| 4 | **FaviconKit** (144px) | Reliable fallback |
| 5 | **DuckDuckGo Favicon API** | Privacy-respecting alternative |
| 6 | **Icon.horse** | Community-maintained service |
| 7 | **Native `apple-touch-icon.png`** | Direct from site root |
| 8 | **Native `apple-touch-icon-precomposed.png`** | Legacy iOS icon |
| 9 | **Native `favicon.ico`** | Classic fallback |

> The order is dynamically adjusted: popular domains (YouTube, GitHub, Netflix, etc.) prioritize Google HD icons first, while lesser-known sites prioritize native root icons for faster resolution.

All fetched icons are resized to 64×64, compressed to WebP (PNG on Safari), and cached as base64 data URIs in `chrome.storage` — so favicons load instantly on every subsequent new tab.

### 🤖 Floating AI Chat Button (Chrome only)
A floating action button in the bottom-right corner launches **ChatGPT** in a dedicated popup window (400×600px) anchored near the button. Click again or click anywhere on the dashboard to dismiss the popup. Built using Chrome's `chrome.windows.create` API.

### 🌑 Nocturnal Minimalism Design
- Pure black (`#000000`) background for AMOLED-friendly, distraction-free aesthetics.
- **Glassmorphic cards** with subtle blur, transparency, and border effects.
- **Inter** font from Google Fonts for clean, modern typography.
- **Material Symbols Outlined** for consistent, sharp iconography.
- Responsive two-column layout (35% / 65%) with CSS Grid and Flexbox.
- Smooth micro-animations and hover transitions throughout.

### 🔒 Privacy-First & Offline-Ready
All your bookmarks, categories, todos, quotes, and settings are stored **locally on your device** via the browser's extension storage. No accounts. No cloud sync. No telemetry. Your data never leaves your machine.

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| **HTML5** | Semantic, accessible markup structure |
| **CSS3** | Vanilla CSS with custom properties, glassmorphism, Grid & Flexbox layouts |
| **JavaScript (ES6+)** | Modular architecture with ES modules, async/await, drag-and-drop API |
| **Chrome Extension API** | Manifest V3, `chrome.storage`, `chrome.windows`, Service Worker (`background.js`) for CORS-bypassed image fetching |
| **Google Fonts** | Inter (300/400/500/700) + Material Symbols Outlined |

---

## 🚀 Installation

### Safari (macOS)

Safari extensions ship inside a small macOS app, so you build it once with Xcode.

1. Clone the repo and build:
   ```bash
   git clone https://github.com/sandip617/Safari-New_Tab_Extension.git
   cd Safari-New_Tab_Extension
   ./scripts/build-safari.sh
   ```
   The app is written to `safari-app/build/Build/Products/Release/NN Tab.app`, signed with your Apple Development certificate.
   Set your own team with `TEAM_ID=XXXXXXXXXX ./scripts/build-safari.sh` (find it in Xcode → Settings → Accounts).
2. Open `NN Tab.app` once, then Safari → Settings → Extensions → enable **NN Tab**.
3. Safari → Settings → General → **New tabs open with** → NN Tab.
4. Click the NN Tab toolbar button → **Allow on all websites** (needed to fetch bookmark icons).

After changing code, run the build script again and reopen Safari.

Safari differences: no ChatGPT button, full-width layout, and Settings opens in a tab instead of a popup.

### Chrome

1. Clone or download this repo.
2. Open `chrome://extensions/` and turn on **Developer mode**.
3. Click **Load unpacked** and select the repo folder (the one with `manifest.json`).
4. Open a new tab.

---

## 📂 Project Structure

```text
├── css/
│   ├── variables.css       # Design tokens — colors, spacing, radii, fonts
│   ├── base.css            # Global resets and body styles
│   ├── layout.css          # Two-column layout
│   └── components.css      # Cards, modals, widgets, buttons, inputs
├── js/
│   ├── main.js             # Entry point — theme, wallpaper, initializes modules
│   ├── background.js       # Background worker — CORS-free icon fetching, toolbar button
│   ├── platform.js         # Safari detection and image encoding helper
│   ├── backup.js           # Settings page — theme, wallpaper, backup/restore, site access
│   ├── clock.js            # Clock and date widget
│   ├── quotes.js           # Editable quote widget
│   ├── shortcuts.js        # Bookmarks, drag-and-drop, favicon cascade
│   ├── tabs.js             # Category tabs
│   ├── todo.js             # Todo / notes list
│   └── toast.js            # Toast notifications
├── scripts/
│   └── build-safari.sh     # Builds dist/safari and the Safari app
├── safari-app/             # Xcode project (macOS app that hosts the Safari extension)
├── index.html              # New tab dashboard
├── backup.html             # Settings page
├── manifest.json           # Manifest V3 (Chrome; the Safari manifest is generated from it)
└── tab.png                 # Extension icon
```

---

## ⌨️ Usage Tips

| Action | How |
|---|---|
| Add a bookmark | Click the **"+"** tile in the shortcuts grid |
| Edit / delete a bookmark | **Right-click** any bookmark tile |
| Cycle bookmark icon | Click **"Next Icon"** in the bookmark modal |
| Reorder bookmarks | **Drag and drop** bookmark tiles |
| Add a category | Click the **"+"** button in the tab bar |
| Rename / delete a category | **Right-click** the category tab |
| Edit the quote | **Double-click** or right-click the quote card |
| Edit a note | **Double-click** the note text |
| Theme, wallpaper, backup | Click the NN Tab toolbar button |
| Open ChatGPT (Chrome) | Click the **floating AI button** (bottom-right) |
| Dismiss ChatGPT | Click anywhere on the dashboard or the AI button again |

---

## 🤝 Contributing

Contributions are always welcome! Feel free to open an [issue](https://github.com/sandip617/Safari-New_Tab_Extension/issues) or submit a Pull Request if you have ideas for new features or improvements.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
