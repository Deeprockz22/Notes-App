import React from 'react';
import { Zap, Trophy, Award } from 'lucide-react';
import { getRank } from '../../utils/phrases';

export default function StreakBadge({ xp = 0, sessions = 0 }) {
  const currentRank = getRank(xp);
  const nextXp = currentRank.maxXp;
  const currentLevelMin = currentRank.minXp;
  const progressPercent = Math.min(100, Math.max(0, ((xp - currentLevelMin) / (nextXp - currentLevelMin)) * 100));

  return (
    <div className="streak-badge-container" title={`Current Rank: ${currentRank.title} (${xp} XP)`}>
      <div className="streak-rank-pill">
        <Zap size={14} className="xp-lightning-icon" fill="currentColor" />
        <span className="rank-level-tag">Lv.{currentRank.level}</span>
        <span className="rank-name">{currentRank.title}</span>
        <span className="xp-number">{xp} XP</span>
      </div>

      <div className="xp-progress-track">
        <div className="xp-progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>
    </div>
  );
}
