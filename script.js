// ===================================
// STORAGE MODULE
// ===================================
const Storage = {
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Error reading from storage:', e);
            return defaultValue;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error writing to storage:', e);
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    }
};

// ===================================
// NAVIGATION MODULE
// ===================================
const Navigation = {
    init() {
        const navTabs = document.querySelectorAll('.nav-tab');
        navTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                this.switchTab(targetTab);
            });
        });

        // Load last active tab
        const lastTab = Storage.get('activeTab', 'timer');
        this.switchTab(lastTab);
    },

    switchTab(tabName) {
        // Update nav buttons
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        // Update sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.toggle('active', section.id === `${tabName}-section`);
        });

        // Save active tab
        Storage.set('activeTab', tabName);
    }
};

// ===================================
// TIMER MODULE
// ===================================
const Timer = {
    timeLeft: 25 * 60, // in seconds
    isRunning: false,
    interval: null,
    currentMode: 'work', // 'work', 'short-break', 'long-break'
    sessionsCompleted: Storage.get('sessionsCompleted', 0),
    totalFocusTime: Storage.get('totalFocusTime', 0), // in minutes

    settings: {
        workDuration: Storage.get('workDuration', 25),
        breakDuration: Storage.get('breakDuration', 5),
        longBreakDuration: Storage.get('longBreakDuration', 15),
        sessionsBeforeLong: Storage.get('sessionsBeforeLong', 4)
    },

    init() {
        this.timeLeft = this.settings.workDuration * 60;
        this.updateDisplay();
        this.updateStats();
        this.attachEvents();
        this.loadSettings();
    },

    attachEvents() {
        document.getElementById('timer-start').addEventListener('click', () => this.start());
        document.getElementById('timer-pause').addEventListener('click', () => this.pause());
        document.getElementById('timer-reset').addEventListener('click', () => this.reset());
        document.getElementById('settings-toggle').addEventListener('click', () => this.toggleSettings());
        document.getElementById('save-settings').addEventListener('click', () => this.saveSettings());
    },

    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        document.getElementById('timer-start').disabled = true;
        document.getElementById('timer-pause').disabled = false;

        this.interval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();

            if (this.timeLeft <= 0) {
                this.complete();
            }
        }, 1000);
    },

    pause() {
        this.isRunning = false;
        clearInterval(this.interval);
        document.getElementById('timer-start').disabled = false;
        document.getElementById('timer-pause').disabled = true;
    },

    reset() {
        this.pause();
        this.timeLeft = this.getCurrentModeDuration() * 60;
        this.updateDisplay();
    },

    complete() {
        this.pause();
        this.playSound();

        if (this.currentMode === 'work') {
            this.sessionsCompleted++;
            this.totalFocusTime += this.settings.workDuration;
            Storage.set('sessionsCompleted', this.sessionsCompleted);
            Storage.set('totalFocusTime', this.totalFocusTime);
            this.updateStats();

            // Determine next mode
            if (this.sessionsCompleted % this.settings.sessionsBeforeLong === 0) {
                this.currentMode = 'long-break';
            } else {
                this.currentMode = 'short-break';
            }
        } else {
            this.currentMode = 'work';
        }

        this.timeLeft = this.getCurrentModeDuration() * 60;
        this.updateDisplay();

        // Show notification
        this.showNotification();
    },

    getCurrentModeDuration() {
        switch (this.currentMode) {
            case 'work': return this.settings.workDuration;
            case 'short-break': return this.settings.breakDuration;
            case 'long-break': return this.settings.longBreakDuration;
        }
    },

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        document.getElementById('timer-time').textContent = timeString;

        const labels = {
            'work': 'Work Session',
            'short-break': 'Short Break',
            'long-break': 'Long Break'
        };
        document.getElementById('timer-label').textContent = labels[this.currentMode];

        // Update page title
        document.title = `${timeString} - Focus`;
    },

    updateStats() {
        document.getElementById('sessions-completed').textContent = this.sessionsCompleted;

        const hours = Math.floor(this.totalFocusTime / 60);
        const minutes = this.totalFocusTime % 60;
        let timeString = '';
        if (hours > 0) {
            timeString = `${hours}h ${minutes}m`;
        } else {
            timeString = `${minutes}m`;
        }
        document.getElementById('total-focus-time').textContent = timeString;
    },

    playSound() {
        const sound = document.getElementById('timer-sound');
        sound.play().catch(e => console.log('Could not play sound:', e));
    },

    showNotification() {
        if ('Notification' in window && Notification.permission === 'granted') {
            const message = this.currentMode === 'work' ? 'Time to focus!' : 'Take a break!';
            new Notification('Focus Timer', { body: message });
        }
    },

    toggleSettings() {
        const panel = document.getElementById('settings-panel');
        panel.classList.toggle('hidden');
    },

    loadSettings() {
        document.getElementById('work-duration').value = this.settings.workDuration;
        document.getElementById('break-duration').value = this.settings.breakDuration;
        document.getElementById('long-break-duration').value = this.settings.longBreakDuration;
        document.getElementById('sessions-before-long').value = this.settings.sessionsBeforeLong;
    },

    saveSettings() {
        this.settings.workDuration = parseInt(document.getElementById('work-duration').value);
        this.settings.breakDuration = parseInt(document.getElementById('break-duration').value);
        this.settings.longBreakDuration = parseInt(document.getElementById('long-break-duration').value);
        this.settings.sessionsBeforeLong = parseInt(document.getElementById('sessions-before-long').value);

        Storage.set('workDuration', this.settings.workDuration);
        Storage.set('breakDuration', this.settings.breakDuration);
        Storage.set('longBreakDuration', this.settings.longBreakDuration);
        Storage.set('sessionsBeforeLong', this.settings.sessionsBeforeLong);

        this.reset();
        this.toggleSettings();
    }
};

// ===================================
// TASKS MODULE
// ===================================
const Tasks = {
    tasks: Storage.get('tasks', []),

    init() {
        this.render();
        this.attachEvents();
    },

    attachEvents() {
        document.getElementById('add-task-btn').addEventListener('click', () => this.addTask());
        document.getElementById('task-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
    },

    addTask() {
        const input = document.getElementById('task-input');
        const text = input.value.trim();

        if (!text) return;

        const task = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.save();
        this.render();
        input.value = '';
    },

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.save();
            this.render();
        }
    },

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.save();
        this.render();
    },

    save() {
        Storage.set('tasks', this.tasks);
    },

    render() {
        const container = document.getElementById('tasks-list');
        const emptyState = document.getElementById('tasks-empty');

        if (this.tasks.length === 0) {
            container.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }

        emptyState.classList.add('hidden');
        container.innerHTML = this.tasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="task-checkbox"></div>
                <div class="task-text">${this.escapeHtml(task.text)}</div>
                <button class="task-delete" data-id="${task.id}">×</button>
            </div>
        `).join('');

        // Attach event listeners
        container.querySelectorAll('.task-item').forEach(item => {
            const id = parseInt(item.dataset.id);
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('task-delete')) {
                    this.toggleTask(id);
                }
            });
        });

        container.querySelectorAll('.task-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                this.deleteTask(id);
            });
        });
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// ===================================
// NOTES MODULE
// ===================================
const Notes = {
    notes: Storage.get('notes', []),
    currentNote: null,
    autoSaveTimeout: null,

    init() {
        this.render();
        this.attachEvents();
    },

    attachEvents() {
        document.getElementById('new-note-btn').addEventListener('click', () => this.createNote());
        document.getElementById('close-note-editor').addEventListener('click', () => this.closeEditor());
        document.getElementById('delete-note-btn').addEventListener('click', () => this.deleteCurrentNote());
        document.getElementById('notes-search').addEventListener('input', (e) => this.search(e.target.value));

        // Editor events
        document.getElementById('note-title').addEventListener('input', () => this.scheduleAutoSave());
        document.getElementById('note-content').addEventListener('input', () => this.scheduleAutoSave());

        // Toolbar events
        document.querySelectorAll('.toolbar-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const command = btn.dataset.command;
                this.execCommand(command);
            });
        });

        // Close modal on background click
        document.getElementById('note-editor-modal').addEventListener('click', (e) => {
            if (e.target.id === 'note-editor-modal') {
                this.closeEditor();
            }
        });
    },

    createNote() {
        const note = {
            id: Date.now(),
            title: '',
            content: '',
            pinned: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.notes.push(note);
        this.openEditor(note);
    },

    openEditor(note) {
        this.currentNote = note;

        document.getElementById('note-title').value = note.title;
        document.getElementById('note-content').innerHTML = note.content;
        this.updateTimestamp();

        document.getElementById('note-editor-modal').classList.remove('hidden');
        document.getElementById('note-title').focus();
    },

    closeEditor() {
        if (this.currentNote) {
            this.saveCurrentNote();

            // Delete if empty
            if (!this.currentNote.title && !this.currentNote.content) {
                this.notes = this.notes.filter(n => n.id !== this.currentNote.id);
            }
        }

        document.getElementById('note-editor-modal').classList.add('hidden');
        this.currentNote = null;
        this.save();
        this.render();
    },

    saveCurrentNote() {
        if (!this.currentNote) return;

        this.currentNote.title = document.getElementById('note-title').value.trim() || 'Untitled';
        this.currentNote.content = document.getElementById('note-content').innerHTML;
        this.currentNote.updatedAt = new Date().toISOString();

        this.updateTimestamp();
    },

    scheduleAutoSave() {
        clearTimeout(this.autoSaveTimeout);
        this.autoSaveTimeout = setTimeout(() => {
            this.saveCurrentNote();
            this.save();
        }, 1000);
    },

    deleteCurrentNote() {
        if (!this.currentNote) return;

        if (confirm('Delete this note?')) {
            this.notes = this.notes.filter(n => n.id !== this.currentNote.id);
            this.closeEditor();
        }
    },

    togglePin(id) {
        const note = this.notes.find(n => n.id === id);
        if (note) {
            note.pinned = !note.pinned;
            this.save();
            this.render();
        }
    },

    search(query) {
        const lowerQuery = query.toLowerCase();
        const cards = document.querySelectorAll('.note-card');

        cards.forEach(card => {
            const id = parseInt(card.dataset.id);
            const note = this.notes.find(n => n.id === id);

            if (!note) return;

            const matchesSearch =
                note.title.toLowerCase().includes(lowerQuery) ||
                this.getTextContent(note.content).toLowerCase().includes(lowerQuery);

            card.style.display = matchesSearch ? 'flex' : 'none';
        });
    },

    execCommand(command) {
        if (command === 'checklist') {
            this.insertChecklist();
        } else {
            document.execCommand(command, false, null);
        }
        document.getElementById('note-content').focus();
    },

    insertChecklist() {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.style.marginRight = '8px';

        const text = document.createTextNode(' Checklist item');
        const br = document.createElement('br');

        range.deleteContents();
        range.insertNode(br);
        range.insertNode(text);
        range.insertNode(checkbox);

        // Move cursor after the text
        range.setStartAfter(text);
        range.setEndAfter(text);
        selection.removeAllRanges();
        selection.addRange(range);
    },

    save() {
        Storage.set('notes', this.notes);
    },

    render() {
        const container = document.getElementById('notes-list');
        const emptyState = document.getElementById('notes-empty');

        // Sort: pinned first, then by updated date
        const sortedNotes = [...this.notes].sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });

        if (sortedNotes.length === 0) {
            container.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }

        emptyState.classList.add('hidden');
        container.innerHTML = sortedNotes.map(note => {
            const preview = this.getTextContent(note.content).substring(0, 150);
            const formattedDate = this.formatDate(note.updatedAt);

            return `
                <div class="note-card ${note.pinned ? 'pinned' : ''}" data-id="${note.id}">
                    <div class="note-card-header">
                        <div class="note-card-title">${this.escapeHtml(note.title || 'Untitled')}</div>
                        <button class="note-pin" data-id="${note.id}">${note.pinned ? '📌' : '📍'}</button>
                    </div>
                    <div class="note-card-preview">${this.escapeHtml(preview)}</div>
                    <div class="note-card-meta">Last edited ${formattedDate}</div>
                </div>
            `;
        }).join('');

        // Attach event listeners
        container.querySelectorAll('.note-card').forEach(card => {
            const id = parseInt(card.dataset.id);
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('note-pin')) {
                    const note = this.notes.find(n => n.id === id);
                    if (note) this.openEditor(note);
                }
            });
        });

        container.querySelectorAll('.note-pin').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                this.togglePin(id);
            });
        });
    },

    getTextContent(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;

        return date.toLocaleDateString();
    },

    updateTimestamp() {
        if (!this.currentNote) return;
        const formatted = this.formatDate(this.currentNote.updatedAt);
        document.getElementById('note-timestamp').textContent = `Last edited ${formatted}`;
    }
};

// ===================================
// PWA INSTALLATION
// ===================================
const PWAInstall = {
    deferredPrompt: null,

    init() {
        // Listen for the beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later
            this.deferredPrompt = e;
            // Show install button
            this.showInstallPrompt();
        });

        // Listen for successful installation
        window.addEventListener('appinstalled', () => {
            console.log('PWA installed successfully');
            this.deferredPrompt = null;
            this.hideInstallPrompt();
        });
    },

    showInstallPrompt() {
        // Create install button if it doesn't exist
        if (document.getElementById('pwa-install-btn')) return;

        const installBtn = document.createElement('button');
        installBtn.id = 'pwa-install-btn';
        installBtn.className = 'btn btn-primary pwa-install-btn';
        installBtn.innerHTML = '📱 Install App';
        installBtn.addEventListener('click', () => this.promptInstall());

        // Add to header
        document.querySelector('.app-header').appendChild(installBtn);
    },

    hideInstallPrompt() {
        const btn = document.getElementById('pwa-install-btn');
        if (btn) btn.remove();
    },

    async promptInstall() {
        if (!this.deferredPrompt) return;

        // Show the install prompt
        this.deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log(`User response to install prompt: ${outcome}`);

        // Clear the deferred prompt
        this.deferredPrompt = null;
        this.hideInstallPrompt();
    }
};

// ===================================
// APP INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
    Timer.init();
    Tasks.init();
    Notes.init();
    PWAInstall.init();

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
});
