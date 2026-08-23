# Focus - Productivity Tool

### 🔗 [**Live Demo → deeprockz22.github.io/Notes-App**](https://deeprockz22.github.io/Notes-App/)

A minimalist black and white productivity app with Pomodoro timer, task management, and rich note-taking capabilities. Now available as a **Progressive Web App** for mobile installation!

## ✨ Features

### ⏱️ Pomodoro Timer
- 25-minute work sessions with customizable durations
- Auto transitions between work and breaks  
- Session tracking and statistics
- Audio notifications

### ✅ Task Manager
- Quick task entry (Enter or click)
- One-click completion toggle
- Persistent storage
- Clean hover interactions

### 📝 Rich Notes
- **Formatting:** Bold, Italic, Underline
- **Lists:** Bullets, Numbers, Checklists
- **Organization:** Pin important notes
- **Search:** Real-time filtering
- **Auto-save:** Never lose your work

### 📱 PWA Features (NEW!)
- Install to home screen (iOS & Android)
- Offline functionality
- App-like experience
- Fast loading with caching

---

## 🚀 Usage

### Option 1: Open the Live Site
Go to **https://deeprockz22.github.io/Notes-App/** — nothing to install, works right in the browser.

### Option 2: Install as PWA (Recommended)

Open the [live site](https://deeprockz22.github.io/Notes-App/) and jump straight to **Step 3** below — it is already served over HTTPS, so PWA install works out of the box.

### Option 3: Run It Locally

**Step 1: Serve with HTTPS or localhost**

The PWA requires a secure connection. Use one of these methods:

**A. Using Python (if installed):**
```bash
# Python 3
python -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000
```

**B. Using Node.js (if installed):**
```bash
# Install serve globally (one-time)
npm install -g serve

# Run server
serve
```

**C. Using VS Code:**
Install the "Live Server" extension, then right-click `index.html` > "Open with Live Server"

**Step 2: Open in Browser**
Navigate to `http://localhost:8000` (or the port shown)

**Step 3: Install the App**
- **Desktop (Chrome/Edge):** Click the install icon in the address bar OR click "📱 Install App" button
- **Android:** Tap menu (⋮) > "Install app" or "Add to Home screen"
- **iOS/Safari:** Tap Share (  ) > "Add to Home Screen"

---

## 📂 Project Structure

```
d:/Tried/
├── index.html          # Main HTML structure
├── style.css           # Black & white design system
├── script.js           # Application logic
├── manifest.json       # PWA manifest
├── sw.js              # Service worker (offline support)
├── icon-192.png       # App icon (192x192)
├── icon-512.png       # App icon (512x512)
└── README.md          # This file
```

---

## 🎨 Design Philosophy

**Minimalist Black & White**
- Pure monochrome palette for maximum focus
- High contrast for readability
- Generous whitespace
- Smooth animations and transitions

**No Distractions**
- Clean interface
- Essential features only
- Productivity-first design

---

## 💾 Data Storage

All data is stored locally in your browser's **localStorage**:
- ✅ Persists across sessions
- ✅ Works offline
- ✅ Private (never sent to servers)
- ⚠️ Browser-specific (not synced across devices)
- ⚠️ Clearing browser data will delete all content

---

## 🔧 Technical Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Storage:** LocalStorage API
- **PWA:** Service Workers, Web App Manifest
- **Fonts:** Inter (Google Fonts)
- **No frameworks** - Pure, lightweight code

---

## 📱 Browser Compatibility

### Desktop
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+

### Mobile
- ✅ Chrome Android
- ✅ Safari iOS 13+
- ✅ Samsung Internet

---

## ⌨️ Keyboard Shortcuts

- **Tasks:**  
  - `Enter` - Add new task
  - `Click` - Toggle completion

- **Notes:**  
  - `Ctrl/Cmd + B` - Bold
  - `Ctrl/Cmd + I` - Italic
  - `Ctrl/Cmd + U` - Underline

---

## 🐛 Troubleshooting

**Install button doesn't appear:**
- Make sure you're accessing via `http://localhost` or `https://`
- The `file://` protocol doesn't support PWA installation
- Try a different browser (Chrome/Edge recommended)

**Service worker won't register:**
- PWA features require HTTPS or localhost
- Check browser console for errors
- Clear cache and reload (Ctrl+Shift+R)

**Data disappeared:**
- Check if browser data/cache was cleared
- LocalStorage is browser-specific
- Try checking in the original browser

---

## 🚧 Future Enhancements

Planned features:
- [ ] Cloud sync (optional)
- [ ] Export notes as Markdown
- [ ] Dark mode toggle
- [ ] Themes and customization
- [ ] Categories for tasks
- [ ] Calendar integration

---

## 📄 License

Free to use for personal and commercial projects.

---

## 👨‍💻 Development

Built with ❤️ using vanilla web technologies.

**To modify:**
1. Edit `style.css` for design changes
2. Edit `script.js` for functionality
3. Edit `manifest.json` for PWA settings
4. Update `sw.js` cache version after changes

---

## 🎯 Tips for Best Experience

1. **Install as PWA** for the best mobile experience
2. **Pin important notes** to keep them at the top
3. **Use Pomodoro timer** for focused work sessions
4. **Backup data** by exporting browser data periodically

---

Enjoy your productivity! 🚀
