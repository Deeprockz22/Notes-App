import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  CheckSquare,
  Code,
  Quote,
  Trash2,
  Download,
  Save,
  PenTool,
  Table,
  Lock,
  Unlock,
  Image as ImageIcon,
  Folder,
  BarChart2
} from 'lucide-react';
import MagnetButton from '../react-bits/MagnetButton';
import SketchCanvasModal from '../canvas/SketchCanvasModal';
import NoteLockModal from '../security/NoteLockModal';
import { Sanitizer } from '../../utils/sanitize';

export default function NoteEditorModal({
  note,
  isOpen,
  onClose,
  onSave,
  onDelete,
  onExport,
  folders = ['quick', 'work', 'personal', 'ideas', 'archive']
}) {
  const [title, setTitle] = useState('');
  const [folder, setFolder] = useState('quick');
  const [isPinned, setIsPinned] = useState(false);
  const [pin, setPin] = useState(null);

  // Modals for Sketch and Lock
  const [isSketchOpen, setIsSketchOpen] = useState(false);
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  const [lockMode, setLockMode] = useState('set'); // 'set' | 'remove'

  // Intelligence stats
  const [stats, setStats] = useState({ words: 0, chars: 0, readingTime: 1 });

  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setFolder(note.folder || 'quick');
      setIsPinned(note.pinned || false);
      setPin(note.pin || null);
      if (editorRef.current) {
        editorRef.current.innerHTML = note.content || '';
      }
    } else {
      setTitle('');
      setFolder('quick');
      setIsPinned(false);
      setPin(null);
      if (editorRef.current) {
        editorRef.current.innerHTML = '';
      }
    }
    updateStats();
  }, [note, isOpen]);

  const updateStats = () => {
    if (!editorRef.current) return;
    const text = editorRef.current.innerText || '';
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    setStats({ words, chars, readingTime });
  };

  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      updateStats();
    }
  };

  const insertChecklist = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    const checkHtml = '<div class="checklist-row"><input type="checkbox" /> <span>&nbsp;</span></div>';
    const fragment = range.createContextualFragment(checkHtml);
    range.insertNode(fragment);
    if (editorRef.current) {
      editorRef.current.focus();
      updateStats();
    }
  };

  const insertTable = () => {
    const tableHtml = `
      <table class="note-table">
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Item 1</td>
            <td>Data 2</td>
            <td>Data 3</td>
          </tr>
          <tr>
            <td>Item 2</td>
            <td>Data 4</td>
            <td>Data 5</td>
          </tr>
        </tbody>
      </table>
      <p><br/></p>
    `;
    executeCommand('insertHTML', tableHtml);
  };

  const handleEmbedDrawing = (dataUrl) => {
    const imgHtml = `<p><img src="${dataUrl}" class="embedded-drawing" alt="Drawing" /><br/></p>`;
    executeCommand('insertHTML', imgHtml);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      const imgHtml = `<p><img src="${dataUrl}" class="embedded-image" alt="${file.name}" /><br/></p>`;
      executeCommand('insertHTML', imgHtml);
    };
    reader.readAsDataURL(file);
  };

  const handleClose = () => {
    const currentHtml = editorRef.current ? Sanitizer.clean(editorRef.current.innerHTML) : '';
    if (title.trim() || currentHtml.trim()) {
      onSave({
        id: note?.id,
        title: title.trim() || 'Untitled Note',
        content: currentHtml,
        folder,
        pinned: isPinned,
        pin,
        updatedAt: new Date().toISOString()
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={handleClose}>
        <div className="modal-card note-modal-card" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="modal-header">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note Title..."
              className="note-title-modal-input"
              autoFocus
            />

            <div className="modal-header-actions">
              <div className="folder-select-wrapper">
                <Folder size={14} className="folder-icon-select" />
                <select
                  value={folder}
                  onChange={(e) => setFolder(e.target.value)}
                  className="note-folder-select"
                >
                  <option value="quick">Quick Notes</option>
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="ideas">Ideas</option>
                  <option value="archive">Archive</option>
                </select>
              </div>

              <button
                type="button"
                className={`icon-btn ${pin ? 'locked-active' : ''}`}
                onClick={() => {
                  setLockMode(pin ? 'remove' : 'set');
                  setIsLockModalOpen(true);
                }}
                title={pin ? 'Protected with PIN (Click to remove)' : 'Lock note with 4-digit PIN'}
              >
                {pin ? <Lock size={16} color="#eab308" /> : <Unlock size={16} />}
              </button>

              <button
                className="icon-btn close-modal-btn"
                onClick={handleClose}
                title="Save & Close (Esc)"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Formatting & Media Toolbar */}
          <div className="editor-toolbar">
            <button
              type="button"
              className="toolbar-btn"
              onClick={() => executeCommand('bold')}
              title="Bold (Ctrl+B)"
            >
              <Bold size={15} />
            </button>
            <button
              type="button"
              className="toolbar-btn"
              onClick={() => executeCommand('italic')}
              title="Italic (Ctrl+I)"
            >
              <Italic size={15} />
            </button>
            <button
              type="button"
              className="toolbar-btn"
              onClick={() => executeCommand('underline')}
              title="Underline (Ctrl+U)"
            >
              <Underline size={15} />
            </button>
            <button
              type="button"
              className="toolbar-btn"
              onClick={() => executeCommand('strikeThrough')}
              title="Strikethrough"
            >
              <Strikethrough size={15} />
            </button>

            <span className="toolbar-separator" />

            <button
              type="button"
              className="toolbar-btn"
              onClick={() => executeCommand('insertUnorderedList')}
              title="Bullet List"
            >
              <List size={15} />
            </button>
            <button
              type="button"
              className="toolbar-btn"
              onClick={() => executeCommand('insertOrderedList')}
              title="Numbered List"
            >
              <ListOrdered size={15} />
            </button>
            <button
              type="button"
              className="toolbar-btn"
              onClick={insertChecklist}
              title="Checklist Item"
            >
              <CheckSquare size={15} />
            </button>

            <span className="toolbar-separator" />

            {/* Whiteboard Drawing Canvas Button */}
            <button
              type="button"
              className="toolbar-btn media-tool-btn"
              onClick={() => setIsSketchOpen(true)}
              title="Draw / Sketch on Canvas"
            >
              <PenTool size={15} />
              <span className="tool-label">Sketch</span>
            </button>

            {/* Table Button */}
            <button
              type="button"
              className="toolbar-btn media-tool-btn"
              onClick={insertTable}
              title="Insert Table"
            >
              <Table size={15} />
              <span className="tool-label">Table</span>
            </button>

            {/* Image Attachment Button */}
            <button
              type="button"
              className="toolbar-btn media-tool-btn"
              onClick={() => fileInputRef.current?.click()}
              title="Attach Image"
            >
              <ImageIcon size={15} />
              <span className="tool-label">Image</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </button>

            <span className="toolbar-separator" />

            <button
              type="button"
              className="toolbar-btn"
              onClick={() => executeCommand('formatBlock', '<blockquote>')}
              title="Quote"
            >
              <Quote size={15} />
            </button>
            <button
              type="button"
              className="toolbar-btn"
              onClick={() => executeCommand('formatBlock', '<pre>')}
              title="Code Block"
            >
              <Code size={15} />
            </button>
          </div>

          {/* Cognitive Science Offload Reminder */}
          <div className="editor-cognitive-bar">
            <span className="cognitive-badge">🧠 Brain Fact:</span>
            <span className="cognitive-text">Your mind is for <strong>creating</strong> ideas, not holding them. Dump everything out!</span>
          </div>

          {/* Rich Content Area */}
          <div
            ref={editorRef}
            className="rich-note-editor"
            contentEditable="true"
            data-placeholder="Start typing your thoughts, sketch ideas, or organize your notes..."
            onInput={updateStats}
            onKeyUp={updateStats}
            suppressContentEditableWarning
          />

          {/* Modal Footer with Live Intelligence Stats */}
          <div className="modal-footer">
            <div className="footer-left">
              <div className="note-live-stats">
                <BarChart2 size={13} />
                <span>{stats.words} words</span>
                <span className="stat-dot">•</span>
                <span>{stats.chars} chars</span>
                <span className="stat-dot">•</span>
                <span>{stats.readingTime} min read</span>
              </div>
            </div>

            <div className="footer-right">
              {note?.id && (
                <button
                  type="button"
                  className="footer-btn delete"
                  onClick={() => {
                    onDelete(note.id);
                    onClose();
                  }}
                  title="Delete this note"
                >
                  <Trash2 size={15} />
                </button>
              )}

              <MagnetButton
                className="btn-action primary modal-save-btn"
                onClick={handleClose}
              >
                <Save size={16} />
                <span>Done</span>
              </MagnetButton>
            </div>
          </div>
        </div>
      </div>

      {/* Sketchpad Whiteboard Modal */}
      <SketchCanvasModal
        isOpen={isSketchOpen}
        onClose={() => setIsSketchOpen(false)}
        onEmbedDrawing={handleEmbedDrawing}
      />

      {/* PIN Security Modal */}
      <NoteLockModal
        isOpen={isLockModalOpen}
        mode={lockMode}
        correctPin={pin}
        onClose={() => setIsLockModalOpen(false)}
        onSuccess={(newPin) => {
          if (lockMode === 'set') {
            setPin(newPin);
          } else if (lockMode === 'remove') {
            setPin(null);
          }
        }}
      />
    </>
  );
}
