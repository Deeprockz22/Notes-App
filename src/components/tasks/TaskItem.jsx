import React, { useState } from 'react';
import { Check, Trash2, Edit2, CheckCircle2, Circle } from 'lucide-react';
import SpotlightCard from '../react-bits/SpotlightCard';
import confetti from 'canvas-confetti';

const PRIORITY_COLORS = {
  high: { label: 'High', class: 'badge-high' },
  medium: { label: 'Medium', class: 'badge-medium' },
  low: { label: 'Low', class: 'badge-low' }
};

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleToggle = (e) => {
    e.stopPropagation();
    if (!task.completed) {
      // Trigger tiny celebratory confetti burst
      try {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { x, y },
          colors: ['#ffffff', '#a1a1aa', '#71717a']
        });
      } catch (err) {
        // Fallback gracefully
      }
    }
    onToggle(task.id);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (editTitle.trim()) {
      onEdit(task.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  return (
    <SpotlightCard
      className={`task-item-card ${task.completed ? 'completed' : ''}`}
      spotlightColor="rgba(255, 255, 255, 0.08)"
    >
      <div className="task-item-content">
        <button
          className={`task-checkbox ${task.completed ? 'checked' : ''}`}
          onClick={handleToggle}
          aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
        >
          {task.completed ? (
            <CheckCircle2 size={20} className="check-icon-active" />
          ) : (
            <Circle size={20} className="check-icon-empty" />
          )}
        </button>

        <div className="task-main">
          {isEditing ? (
            <form onSubmit={handleSaveEdit} className="task-edit-form">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                autoFocus
                onBlur={handleSaveEdit}
                className="task-edit-input"
              />
            </form>
          ) : (
            <span
              className="task-text"
              onDoubleClick={() => setIsEditing(true)}
              title="Double click to edit"
            >
              {task.title}
            </span>
          )}

          <div className="task-badges">
            {task.priority && PRIORITY_COLORS[task.priority] && (
              <span className={`priority-badge ${PRIORITY_COLORS[task.priority].class}`}>
                {PRIORITY_COLORS[task.priority].label}
              </span>
            )}
            {task.category && (
              <span className="category-badge">{task.category}</span>
            )}
          </div>
        </div>

        <div className="task-actions">
          <button
            className="task-action-btn edit-btn"
            onClick={() => setIsEditing(!isEditing)}
            title="Edit task"
            aria-label="Edit task"
          >
            <Edit2 size={15} />
          </button>
          <button
            className="task-action-btn delete-btn"
            onClick={() => onDelete(task.id)}
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </SpotlightCard>
  );
}
