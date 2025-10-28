# Music Timeline Comment System

This project prototypes a collaborative audio review surface built with Vite and React. It combines Wavesurfer.js for the waveform player, large timeline comment cards, and a lightweight PHP backend that stores data as JSON files so it can run on shared hosting.

## Getting started

```bash
npm install
npm run dev
```

Place your audio assets in `public/audio/` and update the `AUDIO_URL` constant in `src/App.jsx` to reference the correct file. The included `demo-track.mp3` reference is a placeholder.

## Deploying to shared hosting

1. Build the static frontend: `npm run build`
2. Upload the generated `dist/` directory contents to your hosting root
3. Upload `api/comments.php` to the `api/` directory on the server
4. Ensure `data/` is writable (permissions `755` are usually sufficient)
5. Copy your audio files into `audio/`

Each song stores its comments in `public/data/<song-id>.json`. You can pre-populate sections manually before sharing the link with collaborators.
