import React from "react";

export default function WaveBackground({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        {/* Overlapping waves, filling upwards to make the top darker */}
        <path fillOpacity="0.03" d="M0,120 C320,-20 800,220 1440,120 L1440,0 L0,0 Z" />
        <path fillOpacity="0.03" d="M0,250 C380,150 860,350 1440,220 L1440,0 L0,0 Z" />
        <path fillOpacity="0.03" d="M0,380 C440,280 920,480 1440,320 L1440,0 L0,0 Z" />
        <path fillOpacity="0.03" d="M0,510 C500,410 980,610 1440,450 L1440,0 L0,0 Z" />
        <path fillOpacity="0.03" d="M0,640 C560,540 1040,740 1440,590 L1440,0 L0,0 Z" />
        <path fillOpacity="0.03" d="M0,770 C620,670 1100,870 1440,730 L1440,0 L0,0 Z" />
        {/* <path fillOpacity="0.03" d="M0,900 C680,800 1160,1000 1440,870 L1440,0 L0,0 Z" /> */}
      </g>
    </svg>
  );
}
