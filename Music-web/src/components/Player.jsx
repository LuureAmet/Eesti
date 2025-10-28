import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';

function formatTime(seconds) {
  const totalSeconds = Math.max(0, seconds);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${secs}`;
}

export default function Player({ audioUrl, sections, activeSectionId, onSectionSelect, seekToTime }) {
  const containerRef = useRef(null);
  const waveSurferRef = useRef(null);
  const regionsRef = useRef(null);
  const sectionSelectRef = useRef(onSectionSelect);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    sectionSelectRef.current = onSectionSelect;
  }, [onSectionSelect]);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const regionsPlugin = RegionsPlugin.create();
    regionsRef.current = regionsPlugin;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#94a3b8',
      progressColor: '#3b82f6',
      cursorColor: '#ef4444',
      height: 150,
      normalize: true,
      plugins: [regionsPlugin],
    });

    ws.load(audioUrl);
    waveSurferRef.current = ws;

    const handleReady = () => setIsReady(true);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTime = () => setCurrentTime(ws.getCurrentTime());

    ws.on('ready', handleReady);
    ws.on('play', handlePlay);
    ws.on('pause', handlePause);
    ws.on('audioprocess', handleTime);
    ws.on('seek', handleTime);

    ws.on('region-click', (region, event) => {
      event.stopPropagation();
      ws.play(region.start);
      sectionSelectRef.current?.(region.id);
    });

    const disposeKeyboard = (event) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (event.code === 'Space') {
        event.preventDefault();
        ws.playPause();
      }
      if (event.code === 'ArrowLeft') {
        event.preventDefault();
        ws.setTime(Math.max(0, ws.getCurrentTime() - 5));
      }
      if (event.code === 'ArrowRight') {
        event.preventDefault();
        ws.setTime(Math.min(ws.getDuration(), ws.getCurrentTime() + 5));
      }
    };

    window.addEventListener('keydown', disposeKeyboard);

    return () => {
      window.removeEventListener('keydown', disposeKeyboard);
      ws.destroy();
      regionsRef.current = null;
      waveSurferRef.current = null;
    };
  }, [audioUrl]);

  useEffect(() => {
    const ws = waveSurferRef.current;
    const regionsPlugin = regionsRef.current;
    if (!ws || !regionsPlugin) return;

    // Clear existing regions before adding new ones
    Object.values(regionsPlugin.regions ?? {}).forEach((region) => region.remove());

    sections.forEach((section) => {
      regionsPlugin.addRegion({
        id: section.id,
        start: section.startTime,
        end: section.endTime,
        color: `${section.color}44`,
        drag: false,
        resize: false,
      });
    });
  }, [sections]);

  useEffect(() => {
    const regionsPlugin = regionsRef.current;
    if (!regionsPlugin) return;

    Object.values(regionsPlugin.regions ?? {}).forEach((region) => {
      const sectionColor = sections.find((section) => section.id === region.id)?.color ?? '#93c5fd';
      region.update({ color: `${sectionColor}44` });
      region.element?.classList.remove('ring-2', 'ring-blue-500');
    });

    if (activeSectionId && regionsPlugin.regions?.[activeSectionId]) {
      regionsPlugin.regions[activeSectionId].element?.classList.add('ring-2', 'ring-blue-500');
    }
  }, [sections, activeSectionId]);

  const togglePlay = () => {
    waveSurferRef.current?.playPause();
  };

  const seekTo = (percentage) => {
    const ws = waveSurferRef.current;
    if (!ws || !isReady) return;
    const duration = ws.getDuration();
    ws.setTime(duration * percentage);
  };

  useEffect(() => {
    const ws = waveSurferRef.current;
    if (!ws || seekToTime == null || !isReady) return;
    ws.setTime(seekToTime);
  }, [seekToTime, isReady]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-full bg-blue-600 px-5 py-2 text-white shadow hover:bg-blue-500"
            onClick={togglePlay}
            disabled={!isReady}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <span className="text-sm font-medium text-slate-600">
            {formatTime(currentTime)} / {formatTime(waveSurferRef.current?.getDuration() ?? 0)}
          </span>
        </div>
        <div className="text-xs uppercase tracking-wide text-slate-500">
          Space: Play/Pause · ←/→: Seek 5s
        </div>
      </div>
      <div
        className="relative overflow-hidden rounded-lg border border-slate-200 bg-white"
        onClick={(event) => {
          if (!waveSurferRef.current || !isReady) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          const percentage = (event.clientX - bounds.left) / bounds.width;
          seekTo(percentage);
        }}
      >
        <div ref={containerRef} id="waveform" />
      </div>
    </div>
  );
}
