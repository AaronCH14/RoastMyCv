🔥 RoastMyCV

AI-powered CV analyzer that gives you brutally honest, structured feedback.
Paste or upload your CV → Gemini AI roasts it → Get a score, strengths, weaknesses, and actionable tips.

📸 Preview

Upload a PDF or DOCX, or paste your CV text directly — the AI does the rest.

Input	Result
Paste / drag-drop CV	Score (0–100), The Roast, What's Good, What's Weak, Fix It tips
How It Works
User uploads PDF / DOCX  ──►  pdfjs-dist / mammoth extracts text
        │
        ▼
  Text appears in textarea
        │
        ▼
  User clicks "Roast My CV 🔥"
        │
        ▼
  Gemini 2.5 Flash API called directly from browser
  (structured prompt → forces JSON response)
        │
        ▼
  JSON parsed → UI renders result cards
  { score, roast, strengths, weaknesses, tips }
No backend. Everything runs in the browser — file parsing and API calls are done client-side.

Features
File Upload — supports PDF and DOCX
Drag & Drop — drop a file directly onto the textarea (fixed browser open-in-tab bug)
Manual Paste — type or paste CV text directly
Gemini 2.5 Flash — fast thinking model with structured JSON output
Score Card — 0–100 score with animated amber progress bar
The Roast — sharp 2–3 sentence honest takedown
Strengths — what's actually good
Weaknesses — what's dragging it down
Fix It Tips — 2-column actionable improvement cards
Fully Responsive — mobile-first, single column on small screens
Vite + React 18 — instant HMR dev experience
Project Structure
roastmycv/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Sticky top nav — logo + CTA button
│   │   ├── HeroSection.jsx     # H1 headline + subtext
│   │   ├── InputArea.jsx       # Textarea, file upload, drag-drop zone
│   │   ├── LoadingState.jsx    # Amber spinner while API is running
│   │   ├── ResultSection.jsx   # Assembles all result cards
│   │   ├── ScoreCard.jsx       # Big score number + progress bar
│   │   ├── RoastCard.jsx       # The roast text with amber accent bar
│   │   ├── StrengthsCard.jsx   # Green bullet list of strengths
│   │   ├── WeaknessesCard.jsx  # Red bullet list of weaknesses
│   │   ├── FixItCard.jsx       # Amber tint card with 2-col tip grid
│   │   └── Footer.jsx          # Links + copyright
│   ├── hooks/
│   │   ├── useGemini.js        # Gemini API call + JSON parsing logic
│   │   └── useFileParser.js    # PDF (pdfjs-dist) + DOCX (mammoth) parser
│   ├── App.jsx                 # Root — state management + flow control
│   ├── main.jsx                # React entry point
│   └── index.css               # Tailwind directives + custom utilities
├── .env                        # API key (see setup below)
├── .gitignore
├── index.html                  # Google Fonts + Material Symbols CDN
├── tailwind.config.js          # Custom design tokens
├── postcss.config.js
└── vite.config.js

🚀 Setup & Installation
Prerequisites
Node.js ≥ 18
A Google Gemini API key → Get one here
1. Clone the repository
git clone https://github.com/AaronCH14/RoastMyCv.git
cd roastmycv
2. Install dependencies
npm install
3. Configure the API key
The repo includes a .env file with a placeholder key. Replace xxxx with your real key:

# .env
VITE_GEMINI_API_KEY=your_actual_api_key_here
.env is listed in .gitignore — it won't be committed if you add the real key locally.
The repo version only contains the placeholder xxxx as a reference for what variable name to use.

4. Start the development server
npm run dev
Open http://localhost:5173

Available Scripts
Command	Description
npm run dev	Start local development server with HMR
npm run build	Build production bundle to /dist
npm run preview	Preview the production build locally
Tech Stack
Layer	Technology
Framework	React 18 + Vite
Styling	Tailwind CSS 3 (custom design tokens)
AI Engine	Google Gemini 2.5 Flash (gemini-2.5-flash)
PDF Parsing	pdfjs-dist (position-aware, handles multi-column layouts)
DOCX Parsing	mammoth
Icons	Google Material Symbols (CDN)
Font	Inter (Google Fonts CDN)
Gemini API Details
Model: gemini-2.5-flash (thinking model, fast + structured)
Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
Config:
{
  "temperature": 0.2,
  "maxOutputTokens": 8192,
  "thinkingConfig": { "thinkingBudget": 1024 }
}
Why thinkingBudget: 1024? Thinking models allocate tokens for internal reasoning. Capping it ensures the remaining budget is used for the actual JSON output — prevents truncated responses.
The prompt forces the model to return only raw JSON in this structure:

{
  "score": 72,
  "roast": "Your summary reads like a LinkedIn template written by a bot...",
  "strengths": ["Clear formatting", "Strong metrics in recent role", "..."],
  "weaknesses": ["Too many buzzwords", "Skills section is unreadable", "..."],
  "tips": [
    { "title": "Rewrite Summary", "description": "Replace adjectives with achievements..." },
    { "title": "Quantify Older Roles", "description": "Trim bullets on jobs older than 5 years..." }
  ]
}
File Parsing Notes
PDF
Uses pdfjs-dist with position-aware extraction — items are sorted by Y (top→bottom) then X (left→right) coordinates before joining. This correctly handles multi-column PDF layouts that would otherwise produce scrambled text.

DOCX
Uses mammoth to extract raw text (ignores all formatting — just clean readable content).

Supported Formats
Format	MIME Type	Extension
PDF	application/pdf	.pdf
Word (modern)	application/vnd.openxmlformats-officedocument.wordprocessingml.document	.docx
Word (legacy)	application/msword	.doc
Security Notes
The Gemini API key is exposed in the browser bundle (it's a client-side app with no backend).
This is acceptable for personal/demo use — for production, add an API key restriction in Google Cloud Console (limit to your domain only).
Never commit your real API key. Use .env locally; the repo stores only the placeholder.
License
Feel free to fork and build on top of it.

Built with React + Vite + Tailwind CSS + Google Gemini API