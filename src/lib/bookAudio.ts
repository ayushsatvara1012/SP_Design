// Book sounds, played from samples in /public/audio.
//
// Web Audio rather than <audio> elements: decoding once into a buffer means every
// play is instant and overlapping flips don't cut each other off, which is exactly
// what a rapid click-through of the book does.
//
// The mute flag doubles as an external store for useSyncExternalStore, which keeps
// the toggle's SSR markup and its hydrated state in agreement.

const SOURCES = {
  // A book being picked up / put down. Used for both, since it is the same motion.
  book: "/audio/book.wav",
  // A single page turning.
  flip: "/audio/page-flip.wav",
} as const;

type SoundName = keyof typeof SOURCES;

const STORAGE_KEY = "sp-designs:sound-muted";

let muted = false;
let context: AudioContext | null = null;
let masterGain: GainNode | null = null;
let loadPromise: Promise<void> | null = null;

const buffers = new Map<SoundName, AudioBuffer>();
const listeners = new Set<() => void>();

// Read the persisted preference once, at import. The module is only pulled in by
// client components, so guard for the server-render pass.
if (typeof window !== "undefined") {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    muted =
      stored !== null
        ? stored === "true"
        : window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    // Private mode or blocked storage: fall back to audible.
    muted = false;
  }
}

export function subscribeMuted(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

export function getMuted() {
  return muted;
}

// Hydration reads this, so it must not touch localStorage.
export function getMutedServerSnapshot() {
  return false;
}

export function setMuted(next: boolean) {
  if (muted === next) return;
  muted = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, String(next));
  } catch {
    // Preference just won't persist; not worth failing the interaction over.
  }
  if (masterGain && context) {
    masterGain.gain.setTargetAtTime(next ? 0 : 1, context.currentTime, 0.01);
  }
  listeners.forEach((l) => l());
}

// Created suspended so the samples can be decoded ahead of any interaction; the
// browser's autoplay policy only cares that we resume from a real gesture.
function ensureContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  if (!context) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;

    context = new Ctor();
    masterGain = context.createGain();
    masterGain.gain.value = muted ? 0 : 1;
    masterGain.connect(context.destination);
  }

  return context;
}

/**
 * Fetch + decode both samples up front, so the first click is not the thing that
 * pays for the download. Safe to call repeatedly. A missing file leaves that sound
 * silent rather than throwing - the UI must not break because an asset is absent.
 */
export function preloadBookAudio() {
  const ctx = ensureContext();
  if (!ctx) return;
  if (loadPromise) return loadPromise;

  loadPromise = Promise.all(
    (Object.keys(SOURCES) as SoundName[]).map(async (name) => {
      try {
        const response = await fetch(SOURCES[name]);
        if (!response.ok) return;
        buffers.set(name, await ctx.decodeAudioData(await response.arrayBuffer()));
      } catch {
        // Not fatal: that sound simply won't play.
      }
    })
  ).then(() => undefined);

  return loadPromise;
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function play(name: SoundName, volume: number) {
  if (muted) return;

  const ctx = ensureContext();
  if (!ctx || !masterGain) return;

  // The call always originates in a click or keypress, which is what makes this
  // resume legal under the autoplay policy.
  if (ctx.state === "suspended") void ctx.resume();

  const buffer = buffers.get(name);
  if (!buffer) {
    void preloadBookAudio();
    return;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  // A hair of pitch and level variation, so repeated flips don't read as the same
  // sample looping - the giveaway that makes short UI sounds grating.
  source.playbackRate.value = rand(0.96, 1.04);

  const gain = ctx.createGain();
  gain.gain.value = volume * rand(0.92, 1.08);

  source.connect(gain).connect(masterGain);
  source.start();
}

// Gains are matched from the samples' measured peaks (book -12.0 dBFS, flip -7.2
// dBFS): left flat, the flip would sit ~4.8 dB hotter than the handling sound, and
// it is the one that fires on every page. Trimming it back puts the two in line and
// leaves the flip a touch under, since it repeats most.
const BOOK_GAIN = 1.0;
const FLIP_GAIN = 0.52;

/** Book picked up off the shelf, or set back down. */
export function playBookHandle() {
  play("book", BOOK_GAIN);
}

/** A single page turning. */
export function playPageFlip() {
  play("flip", FLIP_GAIN);
}
