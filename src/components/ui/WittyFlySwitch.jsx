import React from 'react';

/**
 * WittyFlySwitch (Uiverse: csemszepp/witty-fly-56)
 * Neumorphic tactile slider toggle switch.
 */
export default function WittyFlySwitch({
  checked = false,
  onChange,
  width = '5.2rem',
  accentHue = '22deg',
  baseHue = '220deg',
  title = 'Toggle switch',
  className = ''
}) {
  return (
    <div
      className={`witty-fly-switch-container ${className}`}
      style={{
        '--width': width,
        '--accent-hue': accentHue,
        '--hue': baseHue
      }}
      title={title}
    >
      <label className="witty-switch">
        <input
          className="witty-togglesw"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <div className="witty-indicator left" />
        <div className="witty-indicator right" />
        <div className="witty-button" />
      </label>
    </div>
  );
}
