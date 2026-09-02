import React, { useState } from 'react';
import { Lock, Unlock, X, ShieldCheck, KeyRound } from 'lucide-react';
import MagnetButton from '../react-bits/MagnetButton';

export default function NoteLockModal({
  isOpen,
  mode = 'unlock', // 'set' | 'unlock' | 'remove'
  onClose,
  onSuccess,
  correctPin = ''
}) {
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleDigit = (digit) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      setErrorMsg('');

      if (newPin.length === 4) {
        verifyPin(newPin);
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setErrorMsg('');
  };

  const verifyPin = (enteredPin) => {
    if (mode === 'set') {
      onSuccess(enteredPin);
      onClose();
    } else if (mode === 'unlock' || mode === 'remove') {
      if (enteredPin === correctPin) {
        onSuccess();
        onClose();
      } else {
        setErrorMsg('Incorrect PIN. Try again.');
        setPin('');
      }
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card pin-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="pin-header-icon">
            <Lock size={20} className="lock-icon-glow" />
          </div>
          <button className="icon-btn close-modal-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="pin-modal-body">
          <h3 className="pin-title">
            {mode === 'set' ? 'Set 4-Digit Note Passcode' : 'Protected Note'}
          </h3>
          <p className="pin-subtitle">
            {mode === 'set'
              ? 'Enter a 4-digit PIN to lock and encrypt this note'
              : 'Enter your 4-digit PIN to view and edit this note'}
          </p>

          {/* PIN Dots Indicator */}
          <div className="pin-dots-container">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`pin-dot ${pin.length > i ? 'filled' : ''} ${errorMsg ? 'error' : ''}`}
              />
            ))}
          </div>

          {errorMsg && <p className="pin-error-text">{errorMsg}</p>}

          {/* Numeric Keypad */}
          <div className="pin-keypad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                type="button"
                className="keypad-btn"
                onClick={() => handleDigit(num.toString())}
              >
                {num}
              </button>
            ))}
            <button type="button" className="keypad-btn empty" disabled></button>
            <button
              type="button"
              className="keypad-btn"
              onClick={() => handleDigit('0')}
            >
              0
            </button>
            <button
              type="button"
              className="keypad-btn backspace"
              onClick={handleBackspace}
              aria-label="Backspace"
            >
              ⌫
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
