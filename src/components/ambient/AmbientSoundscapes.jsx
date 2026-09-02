import React, { useState } from 'react';
import { CloudRain, Radio, Waves, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { ambientSoundscapes } from '../../utils/ambientAudio';

export default function AmbientSoundscapes() {
  const [activeSound, setActiveSound] = useState(null); // null | 'rain' | 'whitenoise' | 'alphabeats'
  const [volume, setVolume] = useState(35);

  const toggleSound = (type) => {
    if (activeSound === type) {
      ambientSoundscapes.stop();
      setActiveSound(null);
    } else {
      if (type === 'rain') ambientSoundscapes.playRain();
      if (type === 'whitenoise') ambientSoundscapes.playWhiteNoise();
      if (type === 'alphabeats') ambientSoundscapes.playAlphaBeats();
      setActiveSound(type);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setVolume(val);
    ambientSoundscapes.setVolume(val / 100);
  };

  return (
    <div className="ambient-soundscape-bar">
      <div className="ambient-label">
        <Sparkles size={14} className="ambient-icon" />
        <span>Focus Soundscapes:</span>
      </div>

      <div className="ambient-buttons-group">
        <button
          className={`ambient-btn ${activeSound === 'rain' ? 'active' : ''}`}
          onClick={() => toggleSound('rain')}
          title="Zen Rain Soundscape"
        >
          <CloudRain size={14} />
          <span>Zen Rain</span>
        </button>

        <button
          className={`ambient-btn ${activeSound === 'whitenoise' ? 'active' : ''}`}
          onClick={() => toggleSound('whitenoise')}
          title="Deep White/Brown Noise"
        >
          <Radio size={14} />
          <span>Deep Noise</span>
        </button>

        <button
          className={`ambient-btn ${activeSound === 'alphabeats' ? 'active' : ''}`}
          onClick={() => toggleSound('alphabeats')}
          title="10Hz Binaural Alpha Waves for Flow State"
        >
          <Waves size={14} />
          <span>Alpha Beats</span>
        </button>
      </div>

      {activeSound && (
        <div className="ambient-volume-slider-wrapper">
          <Volume2 size={13} className="vol-icon" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="ambient-vol-slider"
            title={`Volume: ${volume}%`}
          />
        </div>
      )}
    </div>
  );
}
