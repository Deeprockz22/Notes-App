import React, { useState } from 'react';
import {
  Folder,
  FolderPlus,
  Archive,
  Trash2,
  FileText,
  Briefcase,
  User,
  Lightbulb,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const DEFAULT_FOLDERS = [
  { id: 'all', name: 'All Notes', icon: FileText },
  { id: 'quick', name: 'Quick Notes', icon: Sparkles },
  { id: 'work', name: 'Work', icon: Briefcase },
  { id: 'personal', name: 'Personal', icon: User },
  { id: 'ideas', name: 'Ideas & Drafts', icon: Lightbulb },
  { id: 'archive', name: 'Archive', icon: Archive },
  { id: 'trash', name: 'Recently Deleted', icon: Trash2, isTrash: true }
];

export default function FolderSidebar({
  currentFolder,
  setCurrentFolder,
  customFolders = [],
  onAddFolder,
  notesCountByFolder = {}
}) {
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (newFolderName.trim()) {
      onAddFolder(newFolderName.trim());
      setNewFolderName('');
      setIsCreating(false);
    }
  };

  return (
    <aside className="folder-sidebar" aria-label="Brain Dump Folders">
      <div className="folder-sidebar-header">
        <span className="sidebar-title">Folders</span>
        <button
          className="folder-add-btn"
          onClick={() => setIsCreating(!isCreating)}
          title="New Folder"
        >
          <FolderPlus size={16} />
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreateFolder} className="new-folder-form">
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Folder name..."
            className="new-folder-input"
            autoFocus
          />
          <button type="submit" className="new-folder-submit">
            Add
          </button>
        </form>
      )}

      <div className="folder-list">
        {DEFAULT_FOLDERS.map((folder) => {
          const Icon = folder.icon;
          const count = notesCountByFolder[folder.id] || 0;
          const isActive = currentFolder === folder.id;

          return (
            <button
              key={folder.id}
              className={`folder-item ${isActive ? 'active' : ''} ${folder.isTrash ? 'trash-item' : ''}`}
              onClick={() => setCurrentFolder(folder.id)}
            >
              <div className="folder-item-left">
                <Icon size={16} className="folder-icon" />
                <span className="folder-name">{folder.name}</span>
              </div>
              <span className="folder-count">{count}</span>
            </button>
          );
        })}

        {customFolders.map((custom) => {
          const count = notesCountByFolder[custom.id] || 0;
          const isActive = currentFolder === custom.id;

          return (
            <button
              key={custom.id}
              className={`folder-item ${isActive ? 'active' : ''}`}
              onClick={() => setCurrentFolder(custom.id)}
            >
              <div className="folder-item-left">
                <Folder size={16} className="folder-icon" />
                <span className="folder-name">{custom.name}</span>
              </div>
              <span className="folder-count">{count}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
