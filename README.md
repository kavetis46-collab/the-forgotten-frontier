# 🌌 THE FORGOTTEN FRONTIER
### An Interactive Extraterrestrial Museum & Cinematic Storytelling Experience

> *"They stand in absolute silence—bathed in solar radiation, dusted by ancient storms, watching the blue marble of Earth rise and set across the centuries. They are not scrap. They are humanity’s sacred trail markers across the cosmic dark."*

---

## 🚀 Overview

**THE FORGOTTEN FRONTIER** is a web-based space documentary, interactive museum, and storytelling platform exploring the miraculous machines and equipment left behind by humanity on the Moon and Mars.

Built with **React 19**, **Three.js WebGL**, **Tailwind CSS v4**, and the **Web Audio API**, it delivers an IMAX-style cinematic journey across space.

---

## 🌟 Key Features & Architecture

### 1. The Cosmic Opening (Page 1)
- **Interactive Three.js 3D Celestial System**: Earth, Moon, and Mars rendered together in space with procedural planetary textures, atmospheric rim glow, and an orbiting satellite.
- **Mouse Parallax**: Moving the cursor smoothly pans the deep space camera.
- **Cosmic Telemetry HUD**: Live astronomical coordinates, range vectors, and orbital indicators.

### 2. The Forgotten Frontier Prologue (Page 2)
- Poetic narrative honoring the silent archaeology of human space exploration.
- **Hyperdrive Warp Jump**: Clicking **"BEGIN THE JOURNEY"** triggers a cinematic star-streak warp animation with synthesized thruster audio that propels the viewer into the destination hub.

### 3. Choose Your Destination (Page 3)
- **Split Celestial Selector**:
  - 🌕 **The Moon**: 384,400 km away, airless vacuum, where footprints remain unweathered for millions of years.
  - 🔴 **Mars**: 225,000,000 km away, howling dust storms, ancient riverbeds, and the proving ground for interplanetary life.
- Reveals 6 curated missions (3 Moon, 3 Mars).

### 4. The Six Curated Missions
Every mission features an evocative title and identical 5-part structure:

| Destination | Technical Artifact | Evocative Title | Landing Site |
|-------------|-------------------|-----------------|--------------|
| 🌕 **Moon** | Apollo 11 LM-5 Descent Stage | *"The Part of Eagle That Never Came Home"* | Mare Tranquillitatis (`0.67408° N, 23.47297° E`) |
| 🌕 **Moon** | Apollo 15 Lunar Roving Vehicle | *"The Dune Buggy Parked Forever at Hadley Rille"* | Hadley-Apennine (`26.1322° N, 3.6339° E`) |
| 🌕 **Moon** | Lunar Laser Ranging Retroreflector | *"The Solitary Mirror That Still Talks to Earth"* | Tranquility Base & Fra Mauro (`0.6734° N, 23.4731° E`) |
| 🔴 **Mars** | Opportunity Rover (MER-B) | *"The 15-Year Marathon Runner of Meridiani Planum"* | Perseverance Valley, Endeavour (`2.21° S, 354.41° E`) |
| 🔴 **Mars** | Ingenuity Mars Helicopter | *"The Wright Brothers Moment in Alien Skies"* | Valinor Hills, Jezero Crater (`18.4447° N, 77.4508° E`) |
| 🔴 **Mars** | Viking 1 Lander | *"The Silent Sentinel of Chryse Planitia"* | Chryse Planitia (`22.27° N, 312.05° E`) |

#### For Each Mission:
- **A. The Story**: Narrative storytelling, human drama, and high-resolution NASA photographs with click-to-enlarge lightboxes.
- **B. Mission Timeline**: Interactive infographic timeline covering launch, touchdown, operations, abandonment, and present state.
- **C. Where Is It Now? (Interactive Map)**:
  - **Mode 1: Surface Reconnaissance Satellite Map**: Interactive zoom (1x to 4.5x), drag-to-pan, topographic grid overlay, and clickable landing site hotspots showing astronaut footpaths, craters, and science packages.
  - **Mode 2: 3D Rotatable Globe**: 360° rotatable 3D sphere of the Moon/Mars with a pulsating beacon at the exact latitude/longitude coordinates.
- **D. Surprising Facts**: Aerospace trivia cards covering piano-wire tires, Wright Flyer fabric, laser reflections, and dust devils.
- **E. Mission Quiz**: One-question debrief challenge with instant feedback, educational explanation, celebratory confetti, and an unlockable **Astronaut Badge** saved to the visitor's flight log.

### 5. What Did We Learn? (Final Chapter)
- **Scientific Discoveries**: How lunar seismology proved the Moon's origin, and Opportunity proved Mars' ancient lakes.
- **The Advantages of Leaving Equipment**: Rocket equation mass trade-offs, decades of passive science, and deep-time materials durability testing.
- **Lessons for Artemis & Future Human Missions**: Autonomous helicopter swarms, extraterrestrial recycling (ISRU), and heritage preservation laws (One Small Step Act).
- **Official Flight Log Certificate**: Displays badges mastered (x/6) with a shareable debrief report.
- **Cinematic NASA Tribute**: The iconic Apollo 8 *Earthrise* photograph paired with a moving closing message.

### 6. Synthesized Web Audio API (Zero External Dependencies)
- Real-time procedural audio generator:
  - Deep cosmic sub-bass ambient drone with low-pass filters and LFO modulation.
  - UI telemetry beeps.
  - Hyperspace warp speed whoosh.
  - Quiz victory fanfare.
- Controlled via a top-bar audio toggle with animated frequency bars.

---

## 💻 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in your browser
# http://localhost:5173
```

---

## 🛠️ Tech Stack
- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4
- **3D Graphics:** Three.js
- **Audio:** Web Audio API (Synthesized procedural sound)
- **Icons:** Lucide React
- **Confetti FX:** Canvas-Confetti
- **Typography:** *Cinzel*, *Orbitron*, *Space Grotesk*, and *Inter*
