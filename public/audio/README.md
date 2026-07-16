# Book audio

Served samples, wired up in `src/lib/bookAudio.ts`:

- `book.wav`       - book picked up / put down. Plays when a book opens, and again
                     when it lands back on the shelf.
- `page-flip.wav`  - a single page turning. Plays on the cover swing, every page
                     turn, and the arrow keys.

Both are shared by all three books; nothing here is per-category.

## These are derived files

The originals live in `assets/audio-src/` (outside `public/`, so they are not
served). Regenerate with:

    # page flip: skip the near-silent 0.6s lead-in so the snap lands on the click,
    # keep the settle that follows, fade the tail
    ffmpeg -ss 0.600 -t 0.90 -i assets/audio-src/book-open.wav \
      -ac 1 -ar 44100 -af "afade=t=out:st=0.86:d=0.04" -y public/audio/page-flip.wav

    # handling: already tight, just fold to mono at a common rate
    ffmpeg -i assets/audio-src/pickupbook1.wav -ac 1 -ar 44100 -y public/audio/book.wav

Note `-ss` goes **before** `-i`. After it, the source timestamps survive, the
`afade` times then refer to the original timeline, and the clip comes out silent.

Kept as WAV rather than MP3: together they are ~110KB, and MP3/AAC encoder padding
would add a few ms of silence in front of sounds that need to land on a click.
If size ever matters more than that, they compress to roughly 15KB.

Playback level is set in `bookAudio.ts` (`BOOK_GAIN` / `FLIP_GAIN`), matched from
each file's measured peak - adjust there rather than re-encoding.

A missing file leaves that sound silent rather than breaking the page.
