# Harsha C — Interactive Terminal Portfolio

A production-ready portfolio with tab-based navigation, legendary certificate highlighting, smart skill categorization, and hidden Easter eggs!

## 🚀 Quick Start

1. **Run locally**: `python -m http.server 8000`
2. **Open**: http://localhost:8000
3. **Edit content**: Modify JSON files in `/data/`
4. **Add certificates**: Drop files in `/certificates/`

## ✨ Key Features

### 📑 Tab Navigation
- **HOME**: Quick links and skills overview
- **PROJECTS**: Featured project showcases
- **RESEARCH**: Published papers and presentations
- **CERTIFICATIONS**: All certificates with legendary highlighting

### 🏆 Legendary Certificate System
High-value achievements display with a **golden magical aura**:

**Competition Achievements:**
- Parichay Ideation – Winner & Gold Medallist
- IndiaSkills South Regional – Medallion of Excellence
- Top 20 Young Innovator – IIT Bombay Techfest
- RBI Codeathon – Participant

**Professional Certifications:**
- Google Cybersecurity Professional Certificate (8 courses)
- IBM Cybersecurity Capstone
- Microsoft Cybersecurity Certificate

**Academic Excellence:**
- NPTEL Certifications (Cloud Computing, Data Structures, LLMs)

**Visual effects:**
- Animated golden glow (pulsing shimmer)
- Shimmer overlay (light sweep effect)
- Enhanced hover state (scale + shadow)

### 🎯 Smart Skills System
Skills display with category badges:
- **🏆 Certificate Badge**: Has linked certifications (gold)
- **💻 Project Badge**: Used in real projects (blue)

**Click behavior:**
- Skills with certificates → Opens certificate viewer
- Skills with projects only → Shows project usage info
- Skills with neither → Disabled (non-clickable)

**Project-enabled skills**: JavaScript, React, Node.js, IoT/ESP8266

### 🎮 Easter Eggs
- **Konami Code** (↑↑↓↓←→←→BA): Matrix Rain animation
- **Triple-click Title**: Random secret messages
- **Alt+D**: Developer console info

### 👁️ Eye-Friendly Design
- Soft readable colors (#c9d1d9)
- Proper contrast ratios (WCAG AA compliant)
- Smooth 60fps animations
- Respects `prefers-reduced-motion` accessibility

---

## 📋 Data Management

All content is data-driven from JSON files in `/data/`:

### `/data/links.json`
Quick access links (GitHub, LinkedIn, etc.)

```json
[
  {
    "text": "GitHub",
    "url": "https://github.com/Mr-hars007"
  },
  {
    "text": "LinkedIn",
    "url": "https://linkedin.com/in/username"
  }
]
```

### `/data/projects.json`
Project showcases (supports single or multiple links)

```json
[
  {
    "id": "clustersage",
    "title": "ClusterSage",
    "description": "AI-powered Kubernetes diagnosis and resilience testing for local clusters.",
    "links": [
      { "text": "View Code →", "url": "https://github.com/Mr-hars007/ClusterSage" },
      { "text": "Demo Video →", "url": "https://www.youtube.com/watch?v=epca93qov_0" }
    ]
  },
  {
    "id": "fusionforge",
    "title": "FusionForge",
    "description": "Multi-model AI answer aggregation platform with React and Node.js that compares, ranks, and synthesizes outputs from multiple language models.",
    "link": "https://github.com/Mr-hars007",
    "linkText": "View Code →"
  },
  {
    "id": "smart-alert-box",
    "title": "All-in-One Smart Alert Box",
    "description": "IoT safety device built with ESP8266 capable of sending mobile and email alerts using real-time sensor monitoring.",
    "link": "https://www.youtube.com/watch?v=vM9IUiy8Tuw",
    "linkText": "Demo Video →"
  }
]
```

**Multi-link support:**
```json
{
  "id": "project-id",
  "title": "Project Title",
  "description": "Description...",
  "links": [
    { "text": "Live Demo →", "url": "https://demo.com" },
    { "text": "GitHub →", "url": "https://github.com/user/repo" }
  ]
}
```

### `/data/research.json`
Research papers and publications

```json
[
  {
    "id": "research-id",
    "title": "Research Title",
    "description": "Research abstract...",
    "link": "research-paper.pdf",
    "linkText": "Read Paper →"
  }
]
```

**Link routing:**
- **PDFs/YouTube videos**: Open in popup modal with viewer
- **GitHub/LinkedIn**: Open in new tab directly
- **All others**: Popup preview

### `/data/skills.json`
Technical skills (simple string array)

```json
[
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "C / C++",
  "Linux",
  "Cybersecurity",
  "Docker",
  "Azure",
  "MySQL",
  "Git",
  "IoT / ESP8266"
]
```

### Certificates - Auto-Generated

**Certificates are automatically generated from files in `/certificates/` folder.**

Simply drop certificate files (PDF, JPG, PNG) into `/certificates/` and they'll appear automatically!

**Auto-detection features:**
- **Skill mapping**: Detects skills from filename (cybersecurity, python, java, azure, mysql, linux, docker, etc.)
- **Issuer detection**: Recognizes Google, IBM, Microsoft, NPTEL, Udemy, Parichay, IndiaSkills, RBI, IIT
- **Icon assignment**: Auto-assigns relevant emojis
- **Legendary highlighting**: High-value certs (Google, IBM, Parichay, IndiaSkills, IIT) get golden aura

**Supported formats**: PDF, JPG, JPEG, PNG

**Naming tips** for better auto-detection:
- Include issuer name: `google-cybersecurity.pdf`, `nptel-cloud.pdf`
- Include skill: `python-certification.pdf`, `azure-fundamentals.pdf`
- Use kebab-case: `my-certificate.pdf` (not `My Certificate.pdf`)

---

## 📁 File Structure

```
harsha-c.me/
├── index.html                 # Main portfolio page (all-in-one)
├── README.md                  # This file
├── certificates-index.json    # Auto-generated file list (for GitHub Pages)
├── data/
│   ├── links.json            # Quick access links
│   ├── projects.json         # Project showcases
│   ├── research.json         # Research papers
│   └── skills.json           # Technical skills
└── certificates/             # Certificate files (auto-scanned)
    ├── google-cybersecurity.pdf
    ├── parichay-ideation.jpg
    ├── indiaskills.jpg
    └── ... (all certificate files)
```

**Important:**
- Certificate metadata is **auto-generated** from filenames
- Just add/remove files in `/certificates/` - no JSON editing needed
- `certificates-index.json` is auto-generated for GitHub Pages compatibility

---

## 🎨 Customization

### Change Colors
Edit CSS variables in `index.html`:
```css
body {
  background: #0d1117;      /* Background */
  color: #c9d1d9;           /* Text */
}

/* Primary accent colors */
--accent-blue: #58a6ff;
--accent-cyan: #79c0ff;
--legendary-gold: #ffd700;
```

### Modify Animations
Adjust timing in `@keyframes` sections:
- `fadeInUp`: Fade and slide up effect
- `slideInFromLeft`: Slide from left
- `legendaryAura`: Golden glow pulse
- `legendaryShimmer`: Shimmer sweep effect

### Add New Skills
1. Add skill name to `/data/skills.json`
2. To enable click: Add certificates OR add to `projectSkills` set in `renderSkills()` function
3. Badge appears automatically

### Add New Certificates
1. Drop PDF/JPG/PNG files into `/certificates/` folder
2. Use descriptive filenames with issuer/skill: `google-cybersecurity.pdf`, `nptel-python.pdf`
3. Regenerate index for GitHub Pages: `Get-ChildItem certificates -File | Where-Object Name -ne 'README.md' | Select-Object -ExpandProperty Name | ConvertTo-Json -Compress | Set-Content certificates-index.json`
4. Certificates appear automatically - no JSON editing needed!

---

## 🔧 Technical Details

### Architecture
- **Pure vanilla**: HTML, CSS, JavaScript (no frameworks)
- **Single page**: All content in `index.html`
- **Async data loading**: Fetch API with error handling
- **Modal system**: Certificate viewer with PDF/image support
- **Direct folder scanning**: Auto-discovers certificate files

### Performance
- ✅ 60fps smooth animations
- ✅ RequestAnimationFrame optimization
- ✅ Page visibility detection
- ✅ No memory leaks
- ✅ Lazy modal rendering

### Security
- ✅ XSS protection (HTML sanitization)
- ✅ Safe file path handling
- ✅ URL encoding for paths
- ✅ No eval() or dynamic code execution
- ✅ Content Security Policy ready

### Accessibility
- ✅ WCAG AA color contrast
- ✅ Keyboard navigation (Tab, Enter, Esc)
- ✅ `prefers-reduced-motion` support
- ✅ Semantic HTML structure
- ✅ Mobile-friendly touch targets
- ✅ Clear focus indicators

### Browser Support
- ✅ Chrome/Edge (full support)
- ✅ Firefox (full support)
- ✅ Safari (full support)
- ✅ Mobile browsers (responsive)

---

## 🎮 Easter Eggs Guide

### 1. Matrix Rain
**Trigger**: Konami Code sequence

Steps:
1. Press ↑ ↑ (Up arrow twice)
2. Press ↓ ↓ (Down arrow twice)
3. Press ← → ← → (Left, Right, Left, Right)
4. Press B A (B key, then A key)

**Effect**: Animated matrix-style characters fall with cyan glow!

### 2. Secret Messages
**Trigger**: Triple-click the title "harsha-c.me"

Click the main title **three times rapidly** (within 300ms each).

**Messages:**
- "You found the secret! Keep learning and building amazing things! 🚀"
- "Stay curious. Dive deep. Build more. 🔥"
- "The best code is code that solves real problems. Keep coding! 💻"
- (and more...)

### 3. Developer Info
**Trigger**: Press Alt+D

Opens developer console with portfolio statistics.

---

## 🚀 Production Checklist

### Before Deployment
- [ ] Update all JSON files with your data
- [ ] Add all certificate files to `/certificates/`
- [ ] Test all links (projects, research, social)
- [ ] Verify certificate viewer works for all files
- [ ] Test on mobile devices
- [ ] Check browser console for errors
- [ ] Test keyboard navigation
- [ ] Verify Easter eggs work

### Deployment Options

**GitHub Pages:**
1. Push to GitHub repository
2. Enable Pages in Settings → Pages
3. Select main branch, root folder
4. Access via `https://username.github.io/repo-name`

**Netlify:**
1. Drag and drop folder to Netlify
2. Auto-deploys instantly
3. Custom domain support

**Vercel:**
1. Import GitHub repository
2. Auto-deploy on push
3. Serverless functions support

**Self-hosted:**
1. Upload files to web server
2. Ensure MIME types configured (`.json` → `application/json`)
3. Enable HTTPS

---

## 🐛 Troubleshooting

### Certificates not showing?
1. ✅ Check file exists in `/certificates/` folder
2. ✅ Verify filename in `certifications.json` matches exactly (case-sensitive)
3. ✅ Ensure file uses supported format (PDF, JPG, PNG)
4. ✅ Check browser console for 404 errors
5. ✅ Try hard refresh (Ctrl+Shift+R)

### Skills not clickable?
1. ✅ Verify skill has certificates in `certifications.json` OR is in `projectSkills` set
2. ✅ Check skill names match exactly (case-sensitive comparison)
3. ✅ Ensure `certificatesData` loaded (check console)
4. ✅ Skills without certs/projects are intentionally disabled

### Modal not opening?
1. ✅ Check JavaScript console for errors
2. ✅ Verify modal HTML elements exist (`#certModal`)
3. ✅ Try clicking certificate card directly
4. ✅ Test Escape key to close

### Styling issues?
1. ✅ Clear browser cache (Ctrl+Shift+Delete)
2. ✅ Hard refresh page (Ctrl+Shift+R)
3. ✅ Check CSS not blocked by extensions
4. ✅ Verify `index.html` contains complete CSS

### Data not loading?
1. ✅ Check browser console for fetch errors
2. ✅ Verify JSON files are valid (use JSONLint.com)
3. ✅ Ensure files served with correct MIME types
4. ✅ Check CORS if loading from different domain

---

## 📝 Update Log

### Latest Updates
- ✅ Legendary certificate highlighting with golden aura
- ✅ Smart skills with certificate/project category badges
- ✅ Project-based skill enablement
- ✅ Whoami text priority updated (Backend → Cyber → AI)
- ✅ Multi-certificate modal for skills with multiple certs
- ✅ Popup preview routing for research/videos
- ✅ Certificate grid layout restoration
- ✅ NPTEL LLM certificate added
- ✅ Direct folder scanning (removed certificates-list.json dependency)
- ✅ All certificate filenames normalized to kebab-case

### Portfolio Focus
**Harsha C** — Computer Science Engineering Student  
**Specialization**: Backend Systems, Cybersecurity, AI applications  
**Achievement**: Karnataka Representative, IndiaSkills – Software Application Development

---

## 🤝 Contributing

This portfolio is built with vanilla web technologies for maximum simplicity and portability.

**Tech Stack:**
- HTML5
- CSS3 (with animations)
- JavaScript (ES6+)
- JSON (data storage)

**No dependencies** = No build step, no npm, no complexity!

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript. No frameworks, no bloat. Just pure code.**
