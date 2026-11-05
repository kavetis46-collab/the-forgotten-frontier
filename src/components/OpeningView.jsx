import React from 'react';
import { Sparkles, ArrowRight, Radio, Volume2 } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

/* ============================================================
   HERO SECTION — Cinematic Composition
   - Moon: huge, left side, bleeds off left + bottom → terrain
   - Earth: tiny, distant, upper-centre-right
   - Mars: huge, right side, bleeds off right
   - Animated orbital ellipse ring around title
   - Staggered text reveal animation
   - Bottom lunar surface terrain strip
   - CSS nebula / atmosphere halos
   ============================================================ */

export default function OpeningView({ onBegin, onEnableSound, isAudioMuted }) {
  return (
    <div
      className="relative min-h-screen flex flex-col justify-between p-6 sm:p-12 z-10 select-none pointer-events-auto overflow-hidden"
    >
      {/* ── CSS KEYFRAMES (injected once per render) ─────────────── */}
      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes heroMoonSlide {
          from { opacity: 0; transform: translateY(-36%) translateX(-30px); }
          to   { opacity: 1; transform: translateY(-36%) translateX(0px); }
        }
        @keyframes heroMarsSlide {
          from { opacity: 0; transform: translateY(-42%) translateX(30px); }
          to   { opacity: 1; transform: translateY(-42%) translateX(0px); }
        }
        @keyframes heroMoonFloat {
          0%,100% { transform: translateY(-36%); }
          50%      { transform: translateY(-37.8%); }
        }
        @keyframes heroMarsFloat {
          0%,100% { transform: translateY(-42%); }
          50%      { transform: translateY(-40.4%); }
        }
        @keyframes earthSpin {
          from { background-position: 0% center; }
          to   { background-position: 210% center; }
        }
        @keyframes heroTitleUp {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ringPulse {
          0%,100% { opacity: 0.75; }
          50%      { opacity: 1; }
        }
        @keyframes nodePulse {
          0%,100% { opacity: 0.9; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.25); }
        }
      `}</style>

      {/* ── 1. MOON ──────────────────────────────────────────────── */}
      {/* Main sphere */}
      <div
        className="absolute pointer-events-none"
        style={{
          width:  'clamp(320px, 56vw, 880px)',
          height: 'clamp(320px, 56vw, 880px)',
          left:   'clamp(-220px, -15vw, -100px)',
          top:    '50%',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundImage: "url('/textures/moon.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: '54% 44%',
          boxShadow: 'inset 0 0 70px rgba(2,4,20,0.5), 0 0 55px rgba(150,185,230,0.07)',
          zIndex: 1,
          animation:
            'heroMoonSlide 1.6s cubic-bezier(0.16,1,0.3,1) forwards,' +
            ' heroMoonFloat 15s ease-in-out 1.8s infinite',
          opacity: 0,
        }}
      >
        {/* Terminator — sun from upper-right, left limb in shadow */}
        <div style={{
          position:'absolute', inset:0,
          background:'radial-gradient(circle at 69% 42%, transparent 29%, rgba(2,4,20,0.65) 55%, rgba(2,4,20,0.96) 82%)',
        }}/>
        {/* Specular catch-light on lit limb */}
        <div style={{
          position:'absolute', inset:0,
          background:'radial-gradient(circle at 73% 38%, rgba(255,250,235,0.1) 0%, transparent 35%)',
        }}/>
        {/* Subtle limb-darkening (photometric) */}
        <div style={{
          position:'absolute', inset:0,
          background:'radial-gradient(circle at 50% 50%, transparent 55%, rgba(2,4,20,0.35) 100%)',
        }}/>
      </div>

      {/* Moon outer corona glow */}
      <div className="absolute pointer-events-none" style={{
        width:  'clamp(380px, 64vw, 1000px)',
        height: 'clamp(380px, 64vw, 1000px)',
        left:   'clamp(-270px, -19vw, -150px)',
        top:    '50%',
        transform: 'translateY(-36%)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, transparent 44%, rgba(155,195,240,0.08) 54%, rgba(85,130,205,0.04) 69%, transparent 84%)',
        zIndex: 2,
        animation: 'heroFadeIn 2.4s ease-out 0.5s both',
      }}/>

      {/* ── 2. MARS ──────────────────────────────────────────────── */}
      {/* Main sphere */}
      <div
        className="absolute pointer-events-none"
        style={{
          width:  'clamp(280px, 50vw, 800px)',
          height: 'clamp(280px, 50vw, 800px)',
          right:  'clamp(-210px, -14vw, -90px)',
          top:    '50%',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundImage: "url('/textures/mars.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: '50% 38%',
          boxShadow: 'inset 0 0 60px rgba(2,4,20,0.4), 0 0 55px rgba(210,65,10,0.08)',
          zIndex: 1,
          animation:
            'heroMarsSlide 1.6s cubic-bezier(0.16,1,0.3,1) 0.25s forwards,' +
            ' heroMarsFloat 17s ease-in-out 2.1s infinite',
          opacity: 0,
        }}
      >
        {/* Terminator — same sun direction */}
        <div style={{
          position:'absolute', inset:0,
          background:'radial-gradient(circle at 66% 44%, transparent 30%, rgba(2,4,20,0.6) 56%, rgba(2,4,20,0.92) 84%)',
        }}/>
        {/* Orange atmospheric limb glow on lit side */}
        <div style={{
          position:'absolute', inset:0,
          background:'radial-gradient(circle at 72% 40%, rgba(240,105,25,0.14) 0%, transparent 42%)',
          mixBlendMode:'screen',
        }}/>
        {/* Polar ice cap tint */}
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:'22%',
          background:'radial-gradient(ellipse 55% 65% at 50% 10%, rgba(255,245,232,0.08) 0%, transparent 100%)',
        }}/>
        {/* Limb-darkening */}
        <div style={{
          position:'absolute', inset:0,
          background:'radial-gradient(circle at 50% 50%, transparent 55%, rgba(2,4,20,0.3) 100%)',
        }}/>
      </div>

      {/* Mars outer atmosphere halo */}
      <div className="absolute pointer-events-none" style={{
        width:  'clamp(340px, 58vw, 920px)',
        height: 'clamp(340px, 58vw, 920px)',
        right:  'clamp(-255px, -18vw, -140px)',
        top:    '50%',
        transform: 'translateY(-42%)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, transparent 44%, rgba(220,76,16,0.1) 55%, rgba(170,46,8,0.05) 71%, transparent 86%)',
        zIndex: 2,
        animation: 'heroFadeIn 2.4s ease-out 0.6s both',
      }}/>

      {/* ── 3. EARTH (tiny, distant, upper centre-right) ─────────── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width:  'clamp(48px, 5.8vw, 96px)',
          height: 'clamp(48px, 5.8vw, 96px)',
          left:   '54%',
          top:    '13%',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundImage: "url('/textures/earth.jpg')",
          backgroundSize: '210%',
          backgroundPosition: '0% center',
          boxShadow:
            '0 0 18px 7px rgba(56,189,248,0.24),' +
            ' 0 0 55px 20px rgba(37,99,235,0.1)',
          zIndex: 5,
          animation:
            'heroFadeIn 1.4s ease-out 1.1s both,' +
            ' earthSpin 90s linear 2.5s infinite',
        }}
      >
        {/* Rayleigh atmosphere halo */}
        <div style={{
          position:'absolute', inset:'-22%', borderRadius:'50%',
          background:'radial-gradient(circle, transparent 36%, rgba(56,189,248,0.32) 54%, rgba(37,99,235,0.14) 70%, transparent 85%)',
        }}/>
        {/* Terminator */}
        <div style={{
          position:'absolute', inset:0,
          background:'radial-gradient(circle at 74% 44%, transparent 28%, rgba(2,4,20,0.52) 55%, rgba(2,4,20,0.78) 82%)',
        }}/>
      </div>

      {/* ── 4. ORBITAL RING ──────────────────────────────────────── */}
      {/* Centred absolutely inside the hero; sits between planets */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ display:'flex', alignItems:'center', justifyContent:'center', zIndex:4, top:'-5%' }}
      >
        <svg
          viewBox="0 0 1000 340"
          style={{ width:'88%', maxWidth:'860px', height:'auto', overflow:'visible' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Soft glow filter */}
            <filter id="hGlow" x="-25%" y="-120%" width="150%" height="340%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            {/* Strong node glow */}
            <filter id="hNodeGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="6" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            {/* Gradient — ring fades at edges behind planets */}
            <linearGradient id="ringGradH" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="rgba(56,189,248,0.0)"/>
              <stop offset="12%"  stopColor="rgba(56,189,248,0.6)"/>
              <stop offset="88%"  stopColor="rgba(56,189,248,0.6)"/>
              <stop offset="100%" stopColor="rgba(56,189,248,0.0)"/>
            </linearGradient>
          </defs>

          {/* Back (top) arc — dimmer, reads as far side of orbit */}
          <ellipse cx="500" cy="170" rx="440" ry="56"
            fill="none"
            stroke="url(#ringGradH)"
            strokeWidth="1.2"
            strokeDasharray="7 6"
            opacity="0.5"
            filter="url(#hGlow)"
            style={{ animation:'heroFadeIn 1.8s ease-out 1.3s both, ringPulse 4s ease-in-out 3.5s infinite' }}
          />

          {/* Front (bottom) arc — brighter, reads as near side */}
          <ellipse cx="500" cy="170" rx="440" ry="56"
            fill="none"
            stroke="rgba(56,189,248,0.82)"
            strokeWidth="2"
            strokeDasharray="7 6"
            opacity="0.9"
            filter="url(#hGlow)"
            style={{ animation:'heroFadeIn 1.8s ease-out 1.5s both, ringPulse 4s ease-in-out 3.7s infinite' }}
          />

          {/* Outer glow ellipse (soft blurred duplicate) */}
          <ellipse cx="500" cy="170" rx="440" ry="56"
            fill="none"
            stroke="rgba(56,189,248,0.2)"
            strokeWidth="12"
            filter="url(#hGlow)"
            style={{ animation:'heroFadeIn 2s ease-out 1.2s both' }}
          />

          {/* Node — right end (near Earth) */}
          <circle cx="939" cy="170" r="6" fill="#38bdf8" filter="url(#hNodeGlow)"
            style={{ animation:'heroFadeIn 0.8s ease-out 2.1s both, nodePulse 3s ease-in-out 3s infinite' }}
          />
          <circle cx="939" cy="170" r="16" fill="rgba(56,189,248,0.15)"
            style={{ animation:'heroFadeIn 0.8s ease-out 2.2s both' }}
          />

          {/* Node — left end */}
          <circle cx="61" cy="170" r="4.5" fill="rgba(56,189,248,0.85)" filter="url(#hGlow)"
            style={{ animation:'heroFadeIn 0.8s ease-out 2.3s both, nodePulse 3.5s ease-in-out 3.2s infinite' }}
          />
          <circle cx="61" cy="170" r="12" fill="rgba(56,189,248,0.1)"
            style={{ animation:'heroFadeIn 0.8s ease-out 2.4s both' }}
          />

          {/* Top node — adds depth to the ring */}
          <circle cx="500" cy="114" r="3" fill="rgba(140,220,255,0.75)" filter="url(#hGlow)"
            style={{ animation:'heroFadeIn 0.8s ease-out 2.5s both' }}
          />

          {/* Orbiting spacecraft dot — traverses the ring */}
          <circle r="3" fill="rgba(255,255,255,0.95)" filter="url(#hNodeGlow)">
            <animateMotion
              dur="16s"
              repeatCount="indefinite"
              begin="3s"
              path="M 939,170 A 440,56 0 1,0 61,170 A 440,56 0 1,0 939,170"
            />
          </circle>
          {/* Spacecraft engine-glow trail */}
          <circle r="1.5" fill="rgba(56,189,248,0.6)" filter="url(#hGlow)">
            <animateMotion
              dur="16s"
              repeatCount="indefinite"
              begin="3.18s"
              path="M 939,170 A 440,56 0 1,0 61,170 A 440,56 0 1,0 939,170"
            />
          </circle>
        </svg>
      </div>

      {/* ── 5. BOTTOM LUNAR TERRAIN ──────────────────────────────── */}
      {/* Primary terrain layer — large-scale surface texture */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
        height: '30vh',
        backgroundImage: "url('/textures/moon.jpg')",
        backgroundSize: '280% auto',
        backgroundPosition: 'center 62%',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 15%, rgba(0,0,0,0.6) 42%, black 100%)',
        maskImage:
          'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 15%, rgba(0,0,0,0.6) 42%, black 100%)',
        filter: 'brightness(0.45) contrast(1.22) saturate(0.72)',
        zIndex: 3,
        animation: 'heroFadeIn 2.5s ease-out 1s both',
      }}/>

      {/* Terrain horizon darkening — blends surface into dark space above */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
        height: '16vh',
        background:
          'linear-gradient(to top, rgba(2,4,10,0.95) 0%, rgba(2,4,10,0.4) 55%, transparent 100%)',
        zIndex: 4,
      }}/>

      {/* ── 6. NEBULA / ATMOSPHERE COLOUR WASHES ─────────────────── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background:`
          radial-gradient(ellipse 46% 32% at 12% 56%, rgba(65,38,110,0.14) 0%, transparent 74%),
          radial-gradient(ellipse 42% 28% at 88% 50%, rgba(140,45,8,0.12) 0%, transparent 72%),
          radial-gradient(ellipse 28% 18% at 50% 12%, rgba(10,48,120,0.1)  0%, transparent 70%),
          radial-gradient(ellipse 60% 20% at 50% 95%, rgba(2,4,10,0.6)     0%, transparent 100%)
        `,
        zIndex: 2,
      }}/>

      {/* ── 7. CINEMATIC TOP VIGNETTE ────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background:
          'radial-gradient(ellipse 130% 60% at 50% -10%, transparent 30%, rgba(2,4,10,0.4) 100%)',
        zIndex: 2,
      }}/>

      {/* ════════════════════════════════════════════════════════════
          UI CONTENT — all original text, nav, and buttons unchanged
          ════════════════════════════════════════════════════════════ */}

      {/* Top Telemetry Bar */}
      <div
        className="relative flex items-center justify-between text-xs font-mono text-slate-400"
        style={{ zIndex:10, animation:'heroFadeIn 1s ease-out 0.2s both' }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"/>
          <span className="text-slate-300 font-bold tracking-widest uppercase">
            SOLAR SYSTEM OBSERVATION FEED
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400">
          <span>SECTOR: SOL-3 &amp; SOL-4</span>
          <span>ORBITAL VECTORS: ALIGNED</span>
          <span className="text-cyan-400">STATUS: RECON OPEN</span>
        </div>
      </div>

      {/* Planet Labels + Title Card */}
      <div
        className="relative w-full max-w-6xl mx-auto my-auto pointer-events-none"
        style={{ zIndex:10 }}
      >
        {/* Moon label — left side */}
        <div
          className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 hidden md:block"
          style={{ animation:'heroFadeIn 1s ease-out 1.6s both' }}
        >
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-slate-500/40 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200 animate-pulse"/>
              <span className="text-[11px] font-mono text-slate-100 tracking-widest font-semibold">THE MOON</span>
            </div>
            <span className="text-[9px] font-mono text-slate-500 pl-3 tracking-wider">3 HISTORIC RELICS • 384,400 KM</span>
          </div>
        </div>

        {/* Earth label — small, upper centre */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-20 sm:-top-28 hidden lg:block"
          style={{ animation:'heroFadeIn 1s ease-out 2.2s both' }}
        >
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-cyan-500/25 backdrop-blur-md">
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse"/>
            <span className="text-[9px] font-mono text-cyan-400 tracking-widest">EARTH • HOME WORLD • DISTANT</span>
          </div>
        </div>

        {/* Mars label — right side */}
        <div
          className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 hidden md:block"
          style={{ animation:'heroFadeIn 1s ease-out 1.8s both' }}
        >
          <div className="flex flex-col gap-1.5 items-end">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-rose-500/40 backdrop-blur-md">
              <span className="text-[11px] font-mono text-rose-300 tracking-widest font-semibold">MARS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"/>
            </div>
            <span className="text-[9px] font-mono text-slate-500 pr-3 tracking-wider">3 EXPLORATION SITES • 225M KM</span>
          </div>
        </div>

        {/* ── CENTRE TITLE CARD ─────────────────────────── */}
        <div className="text-center py-12 pointer-events-auto max-w-3xl mx-auto">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-950/65 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-7 backdrop-blur-md"
            style={{ animation:'heroTitleUp 1s cubic-bezier(0.16,1,0.3,1) 0.5s both' }}
          >
            <Sparkles className="w-3.5 h-3.5"/>
            <span>Interactive Extraterrestrial Museum</span>
          </div>

          {/* Main Title */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-black font-cinematic text-white tracking-tight leading-none mb-7"
            style={{
              animation: 'heroTitleUp 1.1s cubic-bezier(0.16,1,0.3,1) 0.7s both',
              textShadow:
                '0 0 80px rgba(56,189,248,0.25),' +
                ' 0 0 160px rgba(56,189,248,0.1),' +
                ' 0 4px 24px rgba(0,0,0,0.9)',
            }}
          >
            THE FORGOTTEN FRONTIER
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed mb-11"
            style={{
              animation: 'heroTitleUp 1s cubic-bezier(0.16,1,0.3,1) 0.95s both',
              textShadow: '0 2px 16px rgba(0,0,0,0.9)',
            }}
          >
            Across the silent seas of the Moon and the red plains of Mars, humanity has left behind its greatest
            monuments. Discover their stories, pinpoint their locations, and uncover what they taught our world.
          </p>

          {/* Action Buttons — unchanged */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ animation:'heroTitleUp 1s cubic-bezier(0.16,1,0.3,1) 1.2s both' }}
          >
            <button
              onClick={() => { spaceAudio.playWarp(); onBegin(); }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono tracking-wider text-sm sm:text-base flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/45 hover:scale-105 active:scale-95 transition-all group"
            >
              <span>ENTER THE COSMOS</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
            </button>

            {isAudioMuted && (
              <button
                onClick={() => { onEnableSound(); }}
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-black/70 hover:bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-300 hover:text-white flex items-center justify-center gap-2 backdrop-blur-md transition-all"
              >
                <Volume2 className="w-4 h-4 text-cyan-400"/>
                <span>Enable Atmospheric Space Audio</span>
              </button>
            )}
          </div>
        </div>

        {/* Orbital relay badge — lower left, subtle */}
        <div
          className="absolute bottom-8 left-1/4 hidden xl:block"
          style={{ animation:'heroFadeIn 1s ease-out 2.4s both' }}
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-amber-500/25 backdrop-blur-md">
            <Radio className="w-3 h-3 text-amber-400 animate-pulse"/>
            <span className="text-[9px] font-mono text-amber-400">ORBITAL RELAY • TELEMETRY ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Bottom HUD Status Bar — unchanged */}
      <div
        className="relative flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 border-t border-slate-800/80 pt-4 gap-2"
        style={{ zIndex:10, animation:'heroFadeIn 1s ease-out 1.8s both' }}
      >
        <div className="flex items-center gap-2">
          <span>COORDINATES: LUNAR REGOLITH &amp; MARTIAN CRATERS</span>
        </div>
        <div className="flex items-center gap-4">
          <span>6 FEATURED ARTIFACTS</span>
          <span>INTERACTIVE CARTOGRAPHY</span>
          <span>NASA ARCHIVE PROJECT</span>
        </div>
      </div>
    </div>
  );
}
