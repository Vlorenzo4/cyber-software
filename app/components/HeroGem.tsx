export default function HeroGem() {
  return (
    <div
      aria-hidden="true"
      className="animate-float-gem pointer-events-none absolute right-[6vw] top-1/2 z-[5] hidden -translate-y-1/2 lg:block"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(63,216,232,0.22) 0%, rgba(244,228,0,0.14) 45%, transparent 72%)",
          width: "420px",
          height: "420px",
          left: "-90px",
          top: "-70px",
        }}
      />
      <svg
        width="240"
        height="280"
        viewBox="0 0 240 280"
        className="animate-spin-gem"
      >
        <defs>
          <linearGradient id="gemCyanTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3FD8E8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="gemYellowTop" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F4E400" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="gemCyanBottom" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#0A0A0A" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#3FD8E8" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="gemYellowBottom" x1="1" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#0A0A0A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F4E400" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* facetas superiores */}
        <polygon points="120,10 30,105 120,105" fill="url(#gemCyanTop)" />
        <polygon points="120,10 210,105 120,105" fill="url(#gemYellowTop)" />

        {/* faceta de brillo superior */}
        <polygon
          points="120,10 75,58 120,105"
          fill="#ECECEC"
          fillOpacity="0.18"
        />

        {/* facetas inferiores */}
        <polygon points="30,105 120,105 120,270" fill="url(#gemCyanBottom)" />
        <polygon points="210,105 120,105 120,270" fill="url(#gemYellowBottom)" />

        {/* líneas de faceta */}
        <g stroke="#ECECEC" strokeOpacity="0.3" strokeWidth="1.5" fill="none">
          <polyline points="120,10 30,105 120,270 210,105 120,10" />
          <line x1="30" y1="105" x2="210" y2="105" />
          <line x1="120" y1="10" x2="120" y2="270" />
        </g>
      </svg>
    </div>
  );
}
