"use client";

import { useSyncExternalStore } from "react";
import {
  getMuted,
  getMutedServerSnapshot,
  setMuted,
  subscribeMuted,
} from "@/lib/bookAudio";

const SpeakerOnIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M11 5 6 9H2v6h4l5 4V5z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
    <path d="M18.5 5.5a9 9 0 0 1 0 13" />
  </svg>
);

const SpeakerOffIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M11 5 6 9H2v6h4l5 4V5z" />
    <path d="m22 9-6 6" />
    <path d="m16 9 6 6" />
  </svg>
);

export default function SoundToggle() {
  const muted = useSyncExternalStore(
    subscribeMuted,
    getMuted,
    getMutedServerSnapshot
  );

  return (
    <button
      type="button"
      onClick={() => setMuted(!muted)}
      aria-pressed={muted}
      aria-label={muted ? "Unmute book sounds" : "Mute book sounds"}
      title={muted ? "Unmute book sounds" : "Mute book sounds"}
      className="fixed bottom-6 right-6 z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/80 text-ink/60 shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-ink"
    >
      {muted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
    </button>
  );
}
