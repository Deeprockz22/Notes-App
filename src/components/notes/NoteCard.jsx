import React from 'react';
import {
  Pin,
  Trash2,
  Download,
  Tag,
  Lock,
  RotateCcw,
  Folder,
  Image as ImageIcon
} from 'lucide-react';
import SpotlightCard from '../react-bits/SpotlightCard';

export default function NoteCard({
  note,
  onOpen,
  onPin,
  onDelete,
  onRestore,
  onExport,
  isTrashView = false
}) {
  const isLocked = Boolean(note.pin);

  // Extract drawing / image thumbnail if present
  const hasImage = note.content && note.content.includes('<img');

  const plainSnippet = note.content
    ? note.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    : 'No additional content...';

  const formattedDate = note.updatedAt
    ? new Date(note.updatedAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : '';

  return (
    <SpotlightCard
      className={`note-card ${note.pinned ? 'pinned' : ''} ${isLocked ? 'locked' : ''}`}
      onClick={() => onOpen(note)}
      spotlightColor="rgba(255, 255, 255, 0.09)"
    >
      <div className="note-card-inner">
        {/* Header */}
        <div className="note-card-header">
          <div className="note-title-wrapper">
            {isLocked && <Lock size={14} className="note-lock-badge" />}
            <h3 className="note-card-title">{note.title || 'Untitled Note'}</h3>
          </div>

          {!isTrashView && (
            <button
              className={`pin-btn ${note.pinned ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onPin(note.id);
              }}
              title={note.pinned ? 'Unpin Note' : 'Pin Note'}
              aria-label={note.pinned ? 'Unpin Note' : 'Pin Note'}
            >
              <Pin size={15} className={note.pinned ? 'fill-current' : ''} />
            </button>
          )}
        </div>

        {/* Content Snippet or Lock Blur */}
        {isLocked ? (
          <div className="locked-note-placeholder">
            <Lock size={22} className="lock-blur-icon" />
            <span>Password Protected</span>
          </div>
        ) : (
          <p className="note-card-snippet">{plainSnippet}</p>
        )}

        {/* Footer */}
        <div className="note-card-footer">
          <div className="note-footer-meta">
            {note.folder && note.folder !== 'all' && (
              <span className="note-folder-tag">
                <Folder size={11} />
                <span>{note.folder}</span>
              </span>
            )}
            {hasImage && !isLocked && (
              <span className="note-has-image-indicator" title="Contains Drawing / Image">
                <ImageIcon size={11} />
              </span>
            )}
            <span className="note-date">{formattedDate}</span>
          </div>

          <div className="note-footer-actions">
            {isTrashView ? (
              <>
                <button
                  className="note-icon-action restore"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRestore(note.id);
                  }}
                  title="Restore Note"
                  aria-label="Restore Note"
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  className="note-icon-action delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(note.id, true); // permanent
                  }}
                  title="Delete Forever"
                  aria-label="Delete Forever"
                >
                  <Trash2 size={14} />
                </button>
              </>
            ) : (
              <>
                <button
                  className="note-icon-action"
                  onClick={(e) => {
                    e.stopPropagation();
                    onExport(note);
                  }}
                  title="Export as Markdown (.md)"
                  aria-label="Export Markdown"
                >
                  <Download size={14} />
                </button>
                <button
                  className="note-icon-action delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(note.id, false); // soft delete to trash
                  }}
                  title="Move to Trash"
                  aria-label="Move to Trash"
                >
                  <Trash2 size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
