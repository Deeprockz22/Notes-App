import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  FileText,
  Pin,
  Tag,
  Sparkles,
  Folder,
  Trash2,
  Lock,
  Layers,
  RotateCcw
} from 'lucide-react';
import NoteCard from './NoteCard';
import NoteEditorModal from './NoteEditorModal';
import FolderSidebar from './FolderSidebar';
import NoteLockModal from '../security/NoteLockModal';
import FocusCompanion from '../companion/FocusCompanion';
import MagnetButton from '../react-bits/MagnetButton';
import DecryptedText from '../react-bits/DecryptedText';

export default function NotesHub({
  notes = [],
  saveNote,
  deleteNote,
  restoreNote,
  togglePin,
  customFolders = [],
  addCustomFolder,
  theme = 'dark',
  companionType = 'dino',
  onOpenPicker
}) {
  const [currentFolder, setCurrentFolder] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  // Active note in editor
  const [activeNote, setActiveNote] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Unlock prompt modal for password protected notes
  const [unlockingNote, setUnlockingNote] = useState(null);

  // Extract all smart #hashtags across all non-deleted notes
  const availableTags = useMemo(() => {
    const tags = new Set();
    notes.forEach((n) => {
      if (n.trash) return;
      const combined = `${n.title || ''} ${n.content || ''}`;
      const matches = combined.match(/#[a-zA-Z0-9_\-]+/g);
      if (matches) {
        matches.forEach((t) => tags.add(t));
      }
    });
    return Array.from(tags);
  }, [notes]);

  // Compute note counts per folder
  const notesCountByFolder = useMemo(() => {
    const counts = { all: 0, quick: 0, work: 0, personal: 0, ideas: 0, archive: 0, trash: 0 };
    customFolders.forEach((f) => (counts[f.id] = 0));

    notes.forEach((n) => {
      if (n.trash) {
        counts.trash = (counts.trash || 0) + 1;
      } else {
        counts.all = (counts.all || 0) + 1;
        const folderKey = n.folder || 'quick';
        counts[folderKey] = (counts[folderKey] || 0) + 1;
      }
    });

    return counts;
  }, [notes, customFolders]);

  const handleCreateNew = () => {
    setActiveNote({
      folder: currentFolder === 'trash' || currentFolder === 'all' ? 'quick' : currentFolder
    });
    setIsEditorOpen(true);
  };

  const handleOpenNote = (note) => {
    if (note.pin) {
      setUnlockingNote(note);
    } else {
      setActiveNote(note);
      setIsEditorOpen(true);
    }
  };

  const handleUnlockSuccess = () => {
    if (unlockingNote) {
      setActiveNote(unlockingNote);
      setIsEditorOpen(true);
      setUnlockingNote(null);
    }
  };

  const handleExportNote = (note) => {
    const title = note.title || 'Untitled';
    const content = note.content
      ? note.content
          .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n')
          .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n')
          .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
          .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
          .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
          .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
          .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
          .replace(/<br\s*[\/]?>/gi, '\n')
          .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
          .replace(/<[^>]+>/g, '')
      : '';

    const markdownText = `# ${title}\n\n*Folder: ${note.folder || 'General'}*\n\n${content}`;
    const blob = new Blob([markdownText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter notes based on folder, search query, and hashtag
  const filteredNotes = notes.filter((n) => {
    const isTrash = Boolean(n.trash);

    if (currentFolder === 'trash') {
      if (!isTrash) return false;
    } else {
      if (isTrash) return false;
      if (currentFolder !== 'all' && (n.folder || 'quick') !== currentFolder) return false;
    }

    if (selectedTag) {
      const combined = `${n.title || ''} ${n.content || ''}`;
      if (!combined.includes(selectedTag)) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = (n.title || '').toLowerCase().includes(q);
      const matchContent = (n.content || '').toLowerCase().includes(q);
      return matchTitle || matchContent;
    }

    return true;
  });

  const pinnedNotes = filteredNotes.filter((n) => n.pinned && !n.trash);
  const otherNotes = filteredNotes.filter((n) => !n.pinned || n.trash);

  return (
    <div className="notes-hub-layout">
      {/* Apple Notes Folder Navigation Sidebar */}
      <FolderSidebar
        currentFolder={currentFolder}
        setCurrentFolder={(folder) => {
          setCurrentFolder(folder);
          setSelectedTag(null);
        }}
        customFolders={customFolders}
        onAddFolder={addCustomFolder}
        notesCountByFolder={notesCountByFolder}
      />

      {/* Main Notes Content Area */}
      <div className="notes-main-area">
        {/* Cognitive Offloading Companion Banner */}
        <div className="notes-companion-banner">
          <FocusCompanion
            context="notes"
            theme={theme}
            state="idle"
            companionType={companionType}
            onOpenPicker={onOpenPicker}
          />
        </div>

        {/* View Header */}
        <div className="view-header">
          <div>
            <h2 className="view-title">
              <DecryptedText
                text={currentFolder === 'trash' ? 'Recently Deleted' : 'Apple Notes Hub'}
                speed={30}
                maxIterations={8}
              />
            </h2>
            <p className="view-subtitle">
              {currentFolder === 'trash'
                ? 'Items in trash can be restored or permanently removed'
                : 'Your mind is for creating ideas, not holding them. Offload your thoughts!'}
            </p>
          </div>

          {currentFolder !== 'trash' && (
            <MagnetButton className="btn-action primary new-note-btn" onClick={handleCreateNew}>
              <Plus size={18} />
              <span>New Note</span>
            </MagnetButton>
          )}
        </div>

        {/* Search & Smart Tags Bar */}
        <div className="notes-controls-row">
          <div className="search-bar-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, contents, or #tag..."
              className="notes-search-input"
            />
          </div>

          {availableTags.length > 0 && currentFolder !== 'trash' && (
            <div className="smart-tags-row">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  className={`smart-tag-pill ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                >
                  <Tag size={11} />
                  <span>{tag}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pinned Notes Section */}
        {pinnedNotes.length > 0 && (
          <div className="notes-group-section">
            <div className="group-label">
              <Pin size={14} className="fill-current text-white" />
              <span>PINNED</span>
            </div>
            <div className="notes-grid">
              {pinnedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onOpen={handleOpenNote}
                  onPin={togglePin}
                  onDelete={deleteNote}
                  onRestore={restoreNote}
                  onExport={handleExportNote}
                  isTrashView={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular Notes Section */}
        {otherNotes.length > 0 && (
          <div className="notes-group-section">
            {pinnedNotes.length > 0 && (
              <div className="group-label">
                <span>NOTES</span>
              </div>
            )}
            <div className="notes-grid">
              {otherNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onOpen={handleOpenNote}
                  onPin={togglePin}
                  onDelete={deleteNote}
                  onRestore={restoreNote}
                  onExport={handleExportNote}
                  isTrashView={currentFolder === 'trash'}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredNotes.length === 0 && (
          <div className="empty-state-card">
            <FileText size={36} className="empty-icon" />
            <h3 className="empty-title">
              {currentFolder === 'trash' ? 'Trash is Empty' : 'No notes in this folder'}
            </h3>
            <p className="empty-desc">
              {currentFolder === 'trash'
                ? 'Deleted notes will appear here.'
                : 'Click "+ New Note" above or sketch an idea to start writing.'}
            </p>
          </div>
        )}
      </div>

      {/* Rich Editor Modal */}
      <NoteEditorModal
        note={activeNote}
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setActiveNote(null);
        }}
        onSave={saveNote}
        onDelete={deleteNote}
        onExport={handleExportNote}
      />

      {/* Unlock Password Modal */}
      <NoteLockModal
        isOpen={Boolean(unlockingNote)}
        mode="unlock"
        correctPin={unlockingNote?.pin || ''}
        onClose={() => setUnlockingNote(null)}
        onSuccess={handleUnlockSuccess}
      />
    </div>
  );
}
