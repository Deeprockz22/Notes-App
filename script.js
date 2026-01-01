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
// THEME MANAGER
// ===================================
const ThemeManager = {
    currentTheme: null,

    init() {
        // Load saved theme or default to light
        this.currentTheme = Storage.get('theme', 'light');
        this.applyTheme(this.currentTheme);

        // Attach event listeners
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggle());
        document.getElementById('theme-switch-input').addEventListener('change', (e) => {
            this.setTheme(e.target.checked ? 'dark' : 'light');
        });

        // Update toggle button state
        this.updateToggleButton();
    },

    toggle() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    },

    setTheme(theme) {
        this.currentTheme = theme;
        this.applyTheme(theme);
        Storage.set('theme', theme);
        this.updateToggleButton();
    },

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);

        // Update theme switch in settings
        const switchInput = document.getElementById('theme-switch-input');
        if (switchInput) {
            switchInput.checked = theme === 'dark';
        }

        // Update meta theme-color for mobile browsers
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.setAttribute('content', theme === 'dark' ? '#000000' : '#000000');
        }
    },

    updateToggleButton() {
        const toggleBtn = document.getElementById('theme-toggle');
        const icon = toggleBtn.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
        }
    },

    getTheme() {
        return this.currentTheme;
    }
};

// ===================================
// SETTINGS MODAL
// ===================================
const GlobalSettings = {
    init() {
        // Logo button opens settings
        document.getElementById('logo-settings-btn').addEventListener('click', () => this.open());

        // Close button
        document.getElementById('close-global-settings').addEventListener('click', () => this.close());

        // Clear data button
        document.getElementById('clear-data-btn').addEventListener('click', () => this.clearData());

        // Close on background click
        document.getElementById('global-settings-modal').addEventListener('click', (e) => {
            if (e.target.id === 'global-settings-modal') {
                this.close();
            }
        });
    },

    open() {
        document.getElementById('global-settings-modal').classList.remove('hidden');
    },

    close() {
        document.getElementById('global-settings-modal').classList.add('hidden');
    },

    clearData() {
        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            // Clear all app data
            localStorage.clear();

            // Reload the page
            window.location.reload();
        }
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

    visualSettings: {
        style: Storage.get('timerStyle', 'circular'),
        animationIntensity: Storage.get('animationIntensity', 'normal')
    },

    init() {
        this.timeLeft = this.settings.workDuration * 60;
        this.updateDisplay();
        this.updateStats();
        this.attachEvents();
        this.loadSettings();
        this.applyVisualSettings();
    },

    attachEvents() {
        document.getElementById('timer-start').addEventListener('click', () => this.start());
        document.getElementById('timer-pause').addEventListener('click', () => this.pause());
        document.getElementById('timer-reset').addEventListener('click', () => this.reset());
        document.getElementById('settings-toggle').addEventListener('click', () => this.toggleSettings());
        document.getElementById('save-settings').addEventListener('click', () => this.saveSettings());

        // Timer style and animation settings
        document.getElementById('timer-style').addEventListener('change', (e) => {
            this.visualSettings.style = e.target.value;
            Storage.set('timerStyle', e.target.value);
            this.applyVisualSettings();
        });

        document.getElementById('animation-intensity').addEventListener('change', (e) => {
            this.visualSettings.animationIntensity = e.target.value;
            Storage.set('animationIntensity', e.target.value);
            this.applyVisualSettings();
        });

        // Clickable time display for inline editing
        const timeDisplay = document.getElementById('timer-time');
        timeDisplay.addEventListener('click', () => {
            if (!this.isRunning) {
                this.editTime();
            }
        });

        // Double-click timer to enter fullscreen
        timeDisplay.addEventListener('dblclick', () => {
            if (typeof FullscreenTimer !== 'undefined') {
                FullscreenTimer.open();
            }
        });

        // Preset buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (!this.isRunning) {
                    const duration = parseInt(btn.dataset.duration);
                    this.setCustomTime(duration);
                    this.updatePresetButtons(duration);
                }
            });
        });
    },

    applyVisualSettings() {
        const container = document.querySelector('.timer-container');
        const display = document.querySelector('.timer-display');

        container.setAttribute('data-style', this.visualSettings.style);
        display.setAttribute('data-intensity', this.visualSettings.animationIntensity);

        // Set the dropdown values
        document.getElementById('timer-style').value = this.visualSettings.style;
        document.getElementById('animation-intensity').value = this.visualSettings.animationIntensity;
    },

    editTime() {
        const timeDisplay = document.getElementById('timer-time');
        const currentMinutes = Math.floor(this.timeLeft / 60);

        timeDisplay.classList.add('editable');

        const newMinutes = prompt(`Enter new time in minutes (currently ${currentMinutes}m):`, currentMinutes);

        if (newMinutes !== null && !isNaN(newMinutes) && newMinutes > 0) {
            const minutes = parseInt(newMinutes);
            this.setCustomTime(minutes);
            this.updatePresetButtons(minutes);
        }

        timeDisplay.classList.remove('editable');
    },

    setCustomTime(minutes) {
        this.timeLeft = minutes * 60;
        this.updateDisplay();
        this.updateProgress();
    },

    updatePresetButtons(activeDuration) {
        document.querySelectorAll('.preset-btn').forEach(btn => {
            const duration = parseInt(btn.dataset.duration);
            if (duration === activeDuration) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    },

    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        document.getElementById('timer-start').disabled = true;
        document.getElementById('timer-pause').disabled = false;

        // Add running class for animations
        document.querySelector('.timer-display').classList.add('running');

        this.interval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            this.updateProgress();

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

        // Remove running class
        document.querySelector('.timer-display').classList.remove('running');
    },

    reset() {
        this.pause();
        this.timeLeft = this.getCurrentModeDuration() * 60;
        this.updateDisplay();
        this.updateProgress();

        // Remove critical class
        document.querySelector('.timer-display').classList.remove('critical');
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
        this.updateProgress();

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

        // Auto-resize timer for large values
        this.updateTimerSize(timeString);

        // Sync with fullscreen if open
        if (typeof FullscreenTimer !== 'undefined') {
            FullscreenTimer.updateFromMainTimer();
        }
    },

    updateTimerSize(timeString) {
        const timerDisplay = document.querySelector('.timer-display');
        const timerTime = document.getElementById('timer-time');

        // Check if timer is 100+ minutes (6+ characters like "150:00")
        if (timeString.length >= 6) {
            // Large timer - reduce font size
            timerDisplay.classList.add('large-timer');
        } else {
            // Normal timer
            timerDisplay.classList.remove('large-timer');
        }
    },

    updateProgress() {
        const totalTime = this.getCurrentModeDuration() * 60;
        const elapsed = totalTime - this.timeLeft;
        const percentage = (elapsed / totalTime) * 100;

        // Update circular progress
        const circle = document.querySelector('.timer-ring-progress');
        if (circle) {
            const circumference = 2 * Math.PI * 90;
            const offset = circumference * (percentage / 100);
            circle.style.strokeDashoffset = offset;

            // Change color based on remaining time
            circle.classList.remove('low-time', 'critical-time');
            if (this.timeLeft < 300 && this.timeLeft >= 60) { // 1-5 minutes
                circle.classList.add('low-time');
            }
            if (this.timeLeft < 60) { // < 1 minute
                circle.classList.add('critical-time');
            }
        }

        // Update linear progress
        const progressFill = document.querySelector('.timer-progress-fill');
        if (progressFill) {
            progressFill.style.width = `${100 - percentage}%`;

            // Change color based on remaining time
            progressFill.classList.remove('low-time', 'critical-time');
            if (this.timeLeft < 300 && this.timeLeft >= 60) {
                progressFill.classList.add('low-time');
            }
            if (this.timeLeft < 60) {
                progressFill.classList.add('critical-time');
            }
        }

        // Add critical pulsing effect
        const display = document.querySelector('.timer-display');
        if (this.timeLeft < 60 && this.isRunning) {
            display.classList.add('critical');
        } else {
            display.classList.remove('critical');
        }
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
// FULLSCREEN TIMER
// ===================================
const FullscreenTimer = {
    isOpen: false,
    currentQuoteIndex: 0,
    quoteInterval: null,

    // Collection of funny motivational and mocking quotes
    quotes: [
        "Still checking the time? Your work isn't going to finish itself! 🙃",
        "Achievement unlocked: Professional Time-Watcher 🏆",
        "Fun fact: Staring at the clock doesn't make time go faster 🤓",
        "Your future self is judging you right now... 👀",
        "Plot twist: The work gets easier when you actually do it 😱",
        "Checking the time again? Bold strategy! Let's see if it pays off 🎯",
        "This is your friendly reminder that procrastination is still procrastination 💁",
        "The timer hasn't changed much in the last 10 seconds... shocking, I know 🤯",
        "Congrats! You've mastered the art of time-checking. Now try work-doing 🎨",
        "Breaking news: Work still waiting for you to start 📰",
        "If only you focused this hard on your actual task 😏",
        "Time check count: Lost count. Does that concern you? 🤔",
        "Your dedication to clock-watching is truly impressive 👏",
        "Spoiler alert: The timer will hit zero whether you watch it or not ⏰",
        "Remember: Every second of time-checking is a second not working 🧠",
        "You know what's more satisfying than checking time? Finishing early 💪",
        "The clock: Still ticking. Your work: Still waiting. You: Still checking 🔄",
        "Fun game: Try working for 5 minutes without checking. I dare you 🎮",
        "Narrator voice: They checked the time again. Nothing had changed 🎬",
        "Pro tip: Focus mode works better when you're actually focusing 💡",
        "This is a productivity app, not a time-watching app... just FYI 📱",
        "Your brain's notification: Maybe do some work? Just a thought 🧩",
        "The secret to time going faster: Stop watching it 🤫",
        "Believe it or not, the clock will notify you when time's up ⏲️",
        "Achievement progress: Time Watcher 99% | Actual Worker 1% 📊",
        "Rumor has it: People who work actually finish faster 🏃",
        "Your focus level: Questionable. Your time-checking level: Expert 📈",
        "Did you just check because I told you not to? Classic move 😄",
        "The timer isn't going anywhere. Your productivity might be though 🚀",
        "Confession time: I'm designed to help  you focus, not watch time 🤖",
        "Plot armor: Your work still isn't done yet 📚",
        "Here's a wild idea: Trust the timer and focus on your task 🎯",
        "The timer is doing its job perfectly. Question is: Are you? 🤨",
        "Your parallel universe self is probably done by now 🌌",
        "Gentle reminder: This is called a Pomodoro, not a time-staring contest 🍅",
        "If procrastination was a sport, you'd be going pro 🏅",
        "The clock doesn't care about your existential crisis. It just ticks ⚙️",
        "Every time you check, a productive minute cries 😢",
        "Imagine if you worked as hard as you check the time... 💭",
        "Your task isn't going to complete itself through telepathy 🧙",
        "Reality check: You chose fullscreen mode to avoid distractions 🎪",
        "The timer's doing great! How about you? 🌟",
        "One does not simply focus by staring at numbers 🧝",
        "Your move: Check time or do work. Choose wisely ♟️",
        "Time keeps flowing. Your to-do list keeps growing. You keep checking 🌊",
        "Breakthrough discovery: Working is faster than time-watching 🔬",
        "The numbers will change. Your work won't. Unless you... you know... work 🔢"
    ],

    init() {
        // Fullscreen button
        document.getElementById('timer-fullscreen').addEventListener('click', () => this.open());

        // Close button
        document.getElementById('close-fullscreen').addEventListener('click', () => this.close());

        // Fullscreen controls
        document.getElementById('fullscreen-start').addEventListener('click', () => this.startTimer());
        document.getElementById('fullscreen-pause').addEventListener('click', () => this.pauseTimer());

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Close on background click
        document.getElementById('fullscreen-timer').addEventListener('click', (e) => {
            if (e.target.id === 'fullscreen-timer') {
                this.close();
            }
        });
    },

    open() {
        this.isOpen = true;
        const fullscreenEl = document.getElementById('fullscreen-timer');
        fullscreenEl.classList.remove('hidden');

        // Sync timer style FIRST (before other syncs)
        const mainContainer = document.querySelector('.timer-container');
        const currentStyle = mainContainer.getAttribute('data-style') || 'circular';
        const fullscreenContent = document.querySelector('.fullscreen-content');
        fullscreenContent.setAttribute('data-style', currentStyle);

        // Sync animation intensity
        const animationIntensity = Timer.visualSettings?.animationIntensity || 'normal';
        fullscreenTimeEl.setAttribute('data-animation', animationIntensity);

        // Sync with main timer
        this.syncFromMainTimer();

        // Start quote rotation every 5 minutes (300000ms)
        this.showRandomQuote();
        this.quoteInterval = setInterval(() => this.showRandomQuote(), 300000);

        // If timer is running, sync that state
        if (Timer.isRunning) {
            document.getElementById('fullscreen-timer').classList.add('running');
        }
    },

    close() {
        this.isOpen = false;
        document.getElementById('fullscreen-timer').classList.add('hidden');

        // Stop quote rotation
        if (this.quoteInterval) {
            clearInterval(this.quoteInterval);
            this.quoteInterval = null;
        }
    },

    syncFromMainTimer() {
        // Update time display
        const mainTime = document.getElementById('timer-time').textContent;
        const mainLabel = document.getElementById('timer-label').textContent;

        const fullscreenTime = document.getElementById('fullscreen-time');
        fullscreenTime.textContent = mainTime;
        document.getElementById('fullscreen-label').textContent = mainLabel;

        // Auto-resize for large timers (100+ minutes = 6+ characters like "150:00")
        if (mainTime.length >= 6) {
            // 3-digit minute timer
            fullscreenTime.style.fontSize = 'clamp(3rem, 10vw, 7rem)';
        } else {
            // Normal 2-digit timer
            fullscreenTime.style.fontSize = 'clamp(4rem, 12vw, 10rem)';
        }

        // Sync timer style from main timer
        const mainContainer = document.querySelector('.timer-container');
        const currentStyle = mainContainer.getAttribute('data-style') || 'circular';
        const fullscreenContent = document.querySelector('.fullscreen-content');
        fullscreenContent.setAttribute('data-style', currentStyle);

        // Update progress ring
        this.updateProgress();

        // Update button states
        const isRunning = Timer.isRunning;
        document.getElementById('fullscreen-start').disabled = isRunning;
        document.getElementById('fullscreen-pause').disabled = !isRunning;
    },

    updateProgress() {
        const totalTime = Timer.getCurrentModeDuration() * 60;
        const elapsed = totalTime - Timer.timeLeft;
        const percentage = (elapsed / totalTime) * 100;

        // Update circular progress ring
        const circle = document.querySelector('.fullscreen-progress');
        if (circle) {
            const circumference = 2 * Math.PI * 90;
            const offset = circumference - (circumference * (percentage / 100));
            circle.style.strokeDashoffset = offset;

            // Change color based on remaining time
            circle.classList.remove('low-time', 'critical-time');
            if (Timer.timeLeft < 300 && Timer.timeLeft >= 60) {
                circle.classList.add('low-time');
            }
            if (Timer.timeLeft < 60) {
                circle.classList.add('critical-time');
                document.getElementById('fullscreen-timer').classList.add('critical');
            } else {
                document.getElementById('fullscreen-timer').classList.remove('critical');
            }
        }

        // Update linear progress bar
        const progressFill = document.querySelector('.fullscreen-progress-fill');
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;

            // Change color based on remaining time
            progressFill.classList.remove('low-time', 'critical-time');
            if (Timer.timeLeft < 300 && Timer.timeLeft >= 60) {
                progressFill.classList.add('low-time');
            }
            if (Timer.timeLeft < 60) {
                progressFill.classList.add('critical-time');
            }
        }
    },

    showRandomQuote() {
        const quote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        const quoteEl = document.getElementById('fullscreen-quote');

        // Remove emojis from quote
        const cleanQuote = quote.replace(/[\u{1F300}-\u{1F9FF}]/ug, '').trim();

        // Fade out
        quoteEl.classList.remove('visible');

        setTimeout(() => {
            quoteEl.textContent = cleanQuote;

            // Random positions around the timer (avoiding center)
            const positions = [
                { top: '10%', left: '10%' },    // top-left
                { top: '10%', right: '10%' },   // top-right
                { bottom: '20%', left: '10%' },  // bottom-left
                { bottom: '20%', right: '10%' }, // bottom-right
                { top: '40%', left: '5%' },     // middle-left
                { top: '40%', right: '5%' }     // middle-right
            ];

            const randomPos = positions[Math.floor(Math.random() * positions.length)];

            // Reset all position properties
            quoteEl.style.top = 'auto';
            quoteEl.style.bottom = 'auto';
            quoteEl.style.left = 'auto';
            quoteEl.style.right = 'auto';

            // Apply selected position
            Object.keys(randomPos).forEach(key => {
                quoteEl.style[key] = randomPos[key];
            });

            // Fade in
            quoteEl.classList.add('visible');
        }, 1000);
    },

    startTimer() {
        Timer.start();
        this.syncFromMainTimer();
        document.getElementById('fullscreen-timer').classList.add('running');
    },

    pauseTimer() {
        Timer.pause();
        this.syncFromMainTimer();
        document.getElementById('fullscreen-timer').classList.remove('running');
    },

    // Called by main timer to keep fullscreen in sync
    updateFromMainTimer() {
        if (this.isOpen) {
            this.syncFromMainTimer();
        }
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

        // Add to header-right
        document.querySelector('.header-right').appendChild(installBtn);
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
    ThemeManager.init();
    GlobalSettings.init();
    Navigation.init();
    Timer.init();
    Tasks.init();
    Notes.init();
    FullscreenTimer.init();
    PWAInstall.init();

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
});
