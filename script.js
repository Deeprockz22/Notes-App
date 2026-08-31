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

    // Corrupt or hand-edited storage should not take the whole app down at init
    getArray(key) {
        const value = this.get(key, []);
        return Array.isArray(value) ? value : [];
    },

    getNumber(key, defaultValue) {
        const value = Number(this.get(key, defaultValue));
        return Number.isFinite(value) ? value : defaultValue;
    },

    remove(key) {
        localStorage.removeItem(key);
    }
};

function uid() {
    return Date.now() * 1000 + Math.floor(Math.random() * 1000);
}

// ===================================
// WATER LEVEL
// ===================================
// An idle timer reads as a full tank, so the top of the band is just past 100%
// - only far enough to clip the wave crests above the rim. Keep it tight: every
// point above 100% is time at the start of a session where the surface is out
// of sight and the tank looks frozen. At 102% the surface drops into view
// within the first ~2% of the session.
const WATER_LEVEL_MIN = 0;
const WATER_LEVEL_MAX = 102;

function waterLevelPercent(timeLeft, totalTime) {
    if (!Number.isFinite(timeLeft) || !Number.isFinite(totalTime) || totalTime <= 0) {
        return WATER_LEVEL_MAX;
    }

    const remaining = Math.min(1, Math.max(0, timeLeft / totalTime));
    // Use square for physically realistic draining:
    // water drains faster when high, slower when low (Torricelli's law)
    const eased = Math.pow(remaining, 2);
    return WATER_LEVEL_MIN + eased * (WATER_LEVEL_MAX - WATER_LEVEL_MIN);
}

// ===================================
// HTML SANITIZER
// ===================================
// Note content round-trips through innerHTML, so anything pasted into the
// editor is re-injected on every open. DOMParser builds an inert document,
// so nothing runs while we strip it.
const Sanitizer = {
    FORBIDDEN_TAGS: new Set([
        'SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'LINK', 'META', 'BASE', 'FORM'
    ]),

    URL_ATTRS: new Set(['href', 'src', 'xlink:href', 'action', 'formaction']),

    clean(html) {
        const doc = new DOMParser().parseFromString(String(html || ''), 'text/html');

        doc.body.querySelectorAll('*').forEach(el => {
            if (this.FORBIDDEN_TAGS.has(el.tagName)) {
                el.remove();
                return;
            }

            Array.from(el.attributes).forEach(attr => {
                const name = attr.name.toLowerCase();
                // Strip whitespace/control chars so "java\tscript:" cannot slip through
                const value = attr.value.replace(/[\s\u0000-\u001f]/g, '').toLowerCase();

                if (name.startsWith('on')) {
                    el.removeAttribute(attr.name);
                } else if (this.URL_ATTRS.has(name) && value.startsWith('javascript:')) {
                    el.removeAttribute(attr.name);
                }
            });
        });

        return doc.body.innerHTML;
    }
};

// ===================================
// THEME MANAGER
// ===================================
const ThemeManager = {
    currentTheme: null,
    currentMode: null,

    init() {
        this.currentTheme = Storage.get('theme', 'light');
        this.currentMode = Storage.get('themeMode', 'classic');

        this.applyTheme(this.currentTheme);
        this.applyMode(this.currentMode);

        document.getElementById('theme-toggle').addEventListener('click', () => this.toggle());
        document.getElementById('theme-switch-input').addEventListener('change', (e) => {
            this.setTheme(e.target.checked ? 'dark' : 'light');
        });

        const modeSelects = [
            document.getElementById('theme-mode-select'),
            document.getElementById('header-mode-select')
        ];
        modeSelects.forEach(select => {
            if (select) {
                select.value = this.currentMode;
                select.addEventListener('change', (e) => this.setMode(e.target.value));
            }
        });

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

    setMode(mode) {
        this.currentMode = mode;
        this.applyMode(mode);
        Storage.set('themeMode', mode);
        if (typeof PsychologyEngine !== 'undefined') {
            PsychologyEngine.playDopamineSound('pop');
        }
    },

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const switchInput = document.getElementById('theme-switch-input');
        if (switchInput) switchInput.checked = theme === 'dark';

        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
        }
    },

    applyMode(mode) {
        document.documentElement.setAttribute('data-mode', mode);
        const modeSelect1 = document.getElementById('theme-mode-select');
        const modeSelect2 = document.getElementById('header-mode-select');
        if (modeSelect1) modeSelect1.value = mode;
        if (modeSelect2) modeSelect2.value = mode;
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
        const navTabs = Array.from(document.querySelectorAll('.nav-tab'));

        navTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                this.switchTab(targetTab);
            });
        });

        // Arrow-key navigation, as the tablist role implies
        document.querySelector('.nav-tabs').addEventListener('keydown', (e) => {
            const currentIndex = navTabs.indexOf(document.activeElement);
            if (currentIndex === -1) return;

            const offsets = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
            let nextIndex = null;

            if (e.key in offsets) {
                nextIndex = (currentIndex + offsets[e.key] + navTabs.length) % navTabs.length;
            } else if (e.key === 'Home') {
                nextIndex = 0;
            } else if (e.key === 'End') {
                nextIndex = navTabs.length - 1;
            }

            if (nextIndex === null) return;

            e.preventDefault();
            navTabs[nextIndex].focus();
            this.switchTab(navTabs[nextIndex].dataset.tab);
        });

        // Load last active tab, ignoring anything that no longer exists
        const lastTab = Storage.get('activeTab', 'timer');
        const isKnown = navTabs.some(tab => tab.dataset.tab === lastTab);
        this.switchTab(isKnown ? lastTab : 'timer');
    },

    switchTab(tabName) {
        // Update nav buttons
        document.querySelectorAll('.nav-tab').forEach(tab => {
            const isActive = tab.dataset.tab === tabName;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
            // Roving tabindex: one stop for the whole tablist
            tab.tabIndex = isActive ? 0 : -1;
        });

        // Update sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.toggle('active', section.id === `${tabName}-section`);
        });

        // Save active tab
        Storage.set('activeTab', tabName);

        // Mini timer only shows when the big one is off-screen
        if (typeof MiniTimer !== 'undefined') {
            MiniTimer.sync();
        }
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
    sessionsCompleted: Storage.getNumber('sessionsCompleted', 0),
    totalFocusSeconds: Storage.getNumber('totalFocusTimeSeconds', Storage.getNumber('totalFocusTime', 0) * 60),
    endAt: null,

    settings: {
        workDuration: Storage.getNumber('workDuration', 25),
        breakDuration: Storage.getNumber('breakDuration', 5),
        longBreakDuration: Storage.getNumber('longBreakDuration', 15),
        sessionsBeforeLong: Storage.getNumber('sessionsBeforeLong', 4)
    },

    visualSettings: {
        style: Storage.get('timerStyle', 'circular'),
        animationIntensity: Storage.get('animationIntensity', 'normal')
    },

    init() {
        this.timeLeft = this.settings.workDuration * 60;
        this.updateDisplay();
        this.updateStats();
        this.updateProgress();
        this.updatePresetButtons(this.getCurrentModeDuration());
        this.attachEvents();
        this.loadSettings();
        this.applyVisualSettings();
    },

    // Focus time accrues in memory between ticks; flush it whenever the page
    // may be going away so a refresh or tab close cannot swallow the session.
    persistStats() {
        Storage.set('sessionsCompleted', this.sessionsCompleted);
        Storage.set('totalFocusTimeSeconds', this.totalFocusSeconds);
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

        // Flush accumulated focus time before the page can disappear
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') this.persistStats();
        });
        window.addEventListener('pagehide', () => this.persistStats());
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

        if (newMinutes !== null && newMinutes.trim() !== '') {
            const minutes = parseInt(newMinutes, 10);
            if (Number.isFinite(minutes) && minutes > 0) {
                const clamped = Math.min(999, minutes);
                this.setCustomTime(clamped);
                this.updatePresetButtons(clamped);
            }
        }

        timeDisplay.classList.remove('editable');
    },

    setCustomTime(minutes) {
        this.timeLeft = minutes * 60;
        // Write back to whichever mode is active — storing a break length in
        // workDuration left updateProgress() dividing by the wrong total.
        this.setCurrentModeDuration(minutes);
        this.loadSettings();
        this.updateDisplay();
        this.updateProgress();
    },

    setCurrentModeDuration(minutes) {
        switch (this.currentMode) {
            case 'work':
                this.settings.workDuration = minutes;
                Storage.set('workDuration', minutes);
                break;
            case 'short-break':
                this.settings.breakDuration = minutes;
                Storage.set('breakDuration', minutes);
                break;
            case 'long-break':
                this.settings.longBreakDuration = minutes;
                Storage.set('longBreakDuration', minutes);
                break;
        }
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

        // Asking on load gets ignored (and penalised) without a user gesture
        this.ensureNotificationPermission();

        this.isRunning = true;
        document.getElementById('timer-start').disabled = true;
        document.getElementById('timer-pause').disabled = false;

        // Add running class for animations
        document.querySelector('.timer-display').classList.add('running');

        // First lap of the session starts from twelve o'clock
        if (typeof DinoRun !== 'undefined') {
            DinoRun.restart();
        }

        if (typeof FocusMusic !== 'undefined') {
            FocusMusic.start();
        }

        this.endAt = Date.now() + this.timeLeft * 1000;
        this.interval = setInterval(() => {
            const remaining = Math.max(0, Math.round((this.endAt - Date.now()) / 1000));
            const elapsedDelta = this.timeLeft - remaining;

            if (elapsedDelta > 0 && this.currentMode === 'work') {
                this.totalFocusSeconds += elapsedDelta;
                this.updateStats();
            }

            if (remaining !== this.timeLeft) {
                this.timeLeft = remaining;
                this.updateDisplay();
                this.updateProgress();
            }

            if (this.timeLeft <= 0) {
                this.complete();
            }
        }, 250);
    },

    pause() {
        this.isRunning = false;
        clearInterval(this.interval);
        if (typeof FocusMusic !== 'undefined') {
            FocusMusic.stop();
        }
        this.persistStats();
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
        this.updatePresetButtons(this.getCurrentModeDuration());

        // Remove critical class
        document.querySelector('.timer-display').classList.remove('critical');
    },

    complete() {
        this.pause();
        this.playSound();

        if (this.currentMode === 'work') {
            this.sessionsCompleted++;
            this.persistStats();
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
        this.updatePresetButtons(this.getCurrentModeDuration());

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

        // Keep the cross-tab mini timer in step
        if (typeof MiniTimer !== 'undefined') {
            MiniTimer.sync();
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

        // Update water level (drains as time passes)
        const water = document.getElementById('main-water');
        if (water) {
            water.style.height = `${waterLevelPercent(this.timeLeft, totalTime)}%`;
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

        const totalMinutes = Math.floor(this.totalFocusSeconds / 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
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

    ensureNotificationPermission() {
        if (!('Notification' in window) || Notification.permission !== 'default') return;
        try {
            Notification.requestPermission();
        } catch (e) {
            console.log('Could not request notification permission:', e);
        }
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

    // Reads one numeric setting, honouring the input's own min/max and falling
    // back to the current value — a blank field used to produce NaN:NaN.
    readSetting(id, fallback) {
        const input = document.getElementById(id);
        const min = Number(input.min) || 1;
        const max = Number(input.max) || Number.MAX_SAFE_INTEGER;
        const parsed = parseInt(input.value, 10);
        const value = Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback;

        input.value = value;
        return value;
    },

    saveSettings() {
        this.settings.workDuration = this.readSetting('work-duration', this.settings.workDuration);
        this.settings.breakDuration = this.readSetting('break-duration', this.settings.breakDuration);
        this.settings.longBreakDuration = this.readSetting('long-break-duration', this.settings.longBreakDuration);
        this.settings.sessionsBeforeLong = this.readSetting('sessions-before-long', this.settings.sessionsBeforeLong);

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
    tasks: Storage.getArray('tasks'),

    init() {
        this.attachEvents();
        this.render();
    },

    attachEvents() {
        document.getElementById('add-task-btn').addEventListener('click', () => this.addTask());
        document.getElementById('task-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Delegated so rows keep working across re-renders, and so activating
        // the checkbox by keyboard toggles exactly once instead of twice.
        document.getElementById('tasks-list').addEventListener('click', (e) => {
            const item = e.target.closest('.task-item');
            if (!item) return;

            const id = Number(item.dataset.id);
            const action = e.target.closest('[data-action]');

            if (action && action.dataset.action === 'delete') {
                this.deleteTask(id);
            } else {
                this.toggleTask(id);
            }
        });
    },

    addTask() {
        const input = document.getElementById('task-input');
        const text = input.value.trim();

        if (!text) return;

        const task = {
            id: uid(),
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
            if (task.completed && typeof PsychologyEngine !== 'undefined') {
                PsychologyEngine.playDopamineSound('chime');
                PsychologyEngine.triggerConfetti();
                PsychologyEngine.registerActivity();
                if (typeof CompanionEngine !== 'undefined') {
                    CompanionEngine.speakRandom('taskComplete');
                }
            }
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
        container.innerHTML = this.tasks.map(task => {
            const label = this.escapeAttr(task.text);
            return `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}" role="listitem">
                <button type="button" class="task-checkbox" data-action="toggle"
                    role="checkbox" aria-checked="${task.completed ? 'true' : 'false'}"
                    aria-label="${task.completed ? 'Mark as not done' : 'Mark as done'}: ${label}"></button>
                <span class="task-text">${this.escapeHtml(task.text)}</span>
                <button type="button" class="task-delete" data-action="delete"
                    aria-label="Delete task: ${label}">×</button>
            </div>
        `;
        }).join('');
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // escapeHtml leaves quotes intact, which would break out of an attribute
    escapeAttr(text) {
        return this.escapeHtml(text).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
};

// ===================================
// PSYCHOLOGY & SOUND SYNTH ENGINE
// ===================================
const PsychologyEngine = {
    audioCtx: null,
    streakCount: Storage.getNumber('productivityStreak', 0),
    lastActiveDate: Storage.get('lastActiveDate', null),

    init() {
        this.updateStreak();
    },

    ensureAudio() {
        if (!this.audioCtx) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (AC) this.audioCtx = new AC();
        }
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
    },

    playDopamineSound(type = 'pop') {
        try {
            this.ensureAudio();
            if (!this.audioCtx) return;
            const t = this.audioCtx.currentTime;

            if (type === 'pop') {
                const osc = this.audioCtx.createOscillator();
                const gain = this.audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, t);
                osc.frequency.exponentialRampToValueAtTime(1200, t + 0.08);
                gain.gain.setValueAtTime(0.15, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
                osc.connect(gain);
                gain.connect(this.audioCtx.destination);
                osc.start(t);
                osc.stop(t + 0.09);
            } else if (type === 'chime') {
                const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
                freqs.forEach((f, idx) => {
                    const osc = this.audioCtx.createOscillator();
                    const gain = this.audioCtx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(f, t + idx * 0.06);
                    gain.gain.setValueAtTime(0.1, t + idx * 0.06);
                    gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.06 + 0.3);
                    osc.connect(gain);
                    gain.connect(this.audioCtx.destination);
                    osc.start(t + idx * 0.06);
                    osc.stop(t + idx * 0.06 + 0.32);
                });
            } else if (type === 'typewriter') {
                const osc = this.audioCtx.createOscillator();
                const gain = this.audioCtx.createGain();
                const randomPitch = 800 + Math.random() * 400;
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(randomPitch, t);
                gain.gain.setValueAtTime(0.03, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
                osc.connect(gain);
                gain.connect(this.audioCtx.destination);
                osc.start(t);
                osc.stop(t + 0.035);
            }
        } catch (e) {
            console.log('Audio synth error:', e);
        }
    },

    triggerConfetti() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '99999';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = Array.from({ length: 50 }).map(() => ({
            x: canvas.width / 2 + (Math.random() - 0.5) * 200,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.8) * 14,
            size: Math.random() * 8 + 4,
            color: `hsl(${Math.random() * 360}, 90%, 60%)`,
            rotation: Math.random() * 360,
            vRot: (Math.random() - 0.5) * 10
        }));

        let startTime = Date.now();
        function render() {
            const elapsed = Date.now() - startTime;
            if (elapsed > 1800) {
                canvas.remove();
                return;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.4; // gravity
                p.rotation += p.vRot;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();
            });
            requestAnimationFrame(render);
        }
        render();
    },

    registerActivity() {
        const today = new Date().toDateString();
        if (this.lastActiveDate !== today) {
            const yesterday = new Date(Date.now() - 86400000).toDateString();
            if (this.lastActiveDate === yesterday) {
                this.streakCount++;
            } else if (!this.lastActiveDate) {
                this.streakCount = 1;
            } else {
                this.streakCount = 1;
            }
            this.lastActiveDate = today;
            Storage.set('productivityStreak', this.streakCount);
            Storage.set('lastActiveDate', this.lastActiveDate);
            this.updateStreak();
        }
    },

    updateStreak() {
        const countEl = document.getElementById('streak-count');
        if (countEl) countEl.textContent = this.streakCount;
    }
};

// ===================================
// CRAZY COMPANIONS ENGINE
// ===================================
const CompanionEngine = {
    avatars: ['👾', '👺', '🦕', '🐱', '🦉', '⚡', '🛸', '🧠'],
    currentAvatarIdx: 0,
    phrases: {
        welcome: [
            "Hey human! Let me stimulate your focus pathways today! 🚀",
            "According to color theory, high contrast enhances cognitive focus! 🎨",
            "Zeigarnik Effect alert: Unfinished tasks create mental tension! Finish them! 💡",
            "Dopamine Goblin is hungry... Feed me task completions! 🤤⚡"
        ],
        taskComplete: [
            "BOOM! Dopamine rush delivered straight to your nucleus accumbens! 🧠💥",
            "YES! Another task bites the dust! You're unstoppable! 🔥",
            "Productivity levels critical! Keep going super-human! 🚀",
            "Scientific fact: Completing tasks lowers cortisol levels. Relax and conquer! 🧬"
        ],
        noteSave: [
            "Ideas saved! Your brain thanks you for the external memory dump 📝✨",
            "Archived into the digital neural network! Genius note detected 💡",
            "Apple Notes precision achieved! Pure elegance 🍏"
        ]
    },

    init() {
        const avatarEl = document.getElementById('companion-avatar');
        if (avatarEl) {
            avatarEl.addEventListener('click', () => {
                this.cycleAvatar();
                this.speakRandom('welcome');
                PsychologyEngine.playDopamineSound('pop');
            });
        }
    },

    cycleAvatar() {
        this.currentAvatarIdx = (this.currentAvatarIdx + 1) % this.avatars.length;
        const avatarEl = document.getElementById('companion-avatar');
        if (avatarEl) avatarEl.textContent = this.avatars[this.currentAvatarIdx];
    },

    speak(text) {
        const bubbleEl = document.getElementById('companion-bubble');
        if (!bubbleEl) return;
        bubbleEl.textContent = text;
        bubbleEl.classList.add('show-talking');
        setTimeout(() => bubbleEl.classList.remove('show-talking'), 4000);
    },

    speakRandom(category) {
        const list = this.phrases[category] || this.phrases.welcome;
        const text = list[Math.floor(Math.random() * list.length)];
        this.speak(text);
    }
};

// ===================================
// SKETCH CANVAS TOOL
// ===================================
const SketchPad = {
    canvas: null,
    ctx: null,
    isDrawing: false,
    color: '#000000',
    size: 4,
    tool: 'pen',

    init() {
        this.canvas = document.getElementById('sketch-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');

        document.getElementById('sketch-canvas-btn').addEventListener('click', () => this.open());
        document.getElementById('close-sketch-modal').addEventListener('click', () => this.close());
        document.getElementById('clear-canvas-btn').addEventListener('click', () => this.clear());
        document.getElementById('save-canvas-btn').addEventListener('click', () => this.saveToNote());

        const colorPicker = document.getElementById('sketch-color');
        const sizePicker = document.getElementById('sketch-size');
        const toolPen = document.getElementById('tool-pen');
        const toolEraser = document.getElementById('tool-eraser');

        colorPicker.addEventListener('change', (e) => this.color = e.target.value);
        sizePicker.addEventListener('change', (e) => this.size = parseInt(e.target.value));

        toolPen.addEventListener('click', () => {
            this.tool = 'pen';
            toolPen.classList.add('active');
            toolEraser.classList.remove('active');
        });
        toolEraser.addEventListener('click', () => {
            this.tool = 'eraser';
            toolEraser.classList.add('active');
            toolPen.classList.remove('active');
        });

        // Drawing events
        this.canvas.addEventListener('mousedown', (e) => this.start(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stop());
        this.canvas.addEventListener('mouseleave', () => this.stop());

        // Touch events
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX, clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        });
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX, clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        });
        this.canvas.addEventListener('touchend', () => this.stop());
    },

    open() {
        document.getElementById('sketch-modal').classList.remove('hidden');
        this.clear();
    },

    close() {
        document.getElementById('sketch-modal').classList.add('hidden');
    },

    clear() {
        if (!this.ctx) return;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },

    getPos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    },

    start(e) {
        this.isDrawing = true;
        const pos = this.getPos(e);
        this.ctx.beginPath();
        this.ctx.moveTo(pos.x, pos.y);
    },

    draw(e) {
        if (!this.isDrawing) return;
        const pos = this.getPos(e);
        this.ctx.lineWidth = this.size;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        if (this.tool === 'pen') {
            this.ctx.strokeStyle = this.color;
        } else {
            this.ctx.strokeStyle = '#ffffff';
        }

        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.stroke();
    },

    stop() {
        if (this.isDrawing) {
            this.ctx.closePath();
            this.isDrawing = false;
        }
    },

    saveToNote() {
        const dataUrl = this.canvas.toDataURL('image/png');
        const img = `<img src="${dataUrl}" class="sketch-img" alt="Sketch" style="max-width:100%; border-radius:8px; margin: 10px 0;" />`;
        Notes.insertHTMLAtCaret(img);
        this.close();
        PsychologyEngine.playDopamineSound('chime');
    }
};

// ===================================
// PASSCODE SYSTEM
// ===================================
const PasscodeModal = {
    pendingNote: null,
    storedPasscode: Storage.get('appPasscode', '1234'),

    init() {
        document.getElementById('close-passcode-modal').addEventListener('click', () => this.close());
        document.getElementById('passcode-submit-btn').addEventListener('click', () => this.submit());

        const inputs = Array.from(document.querySelectorAll('.pass-digit'));
        inputs.forEach((input, idx) => {
            input.addEventListener('input', () => {
                if (input.value && idx < inputs.length - 1) {
                    inputs[idx + 1].focus();
                }
            });
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !input.value && idx > 0) {
                    inputs[idx - 1].focus();
                }
            });
        });
    },

    open(note) {
        this.pendingNote = note;
        document.querySelectorAll('.pass-digit').forEach(i => i.value = '');
        document.getElementById('passcode-error').classList.add('hidden');
        document.getElementById('passcode-modal').classList.remove('hidden');
        document.getElementById('pass-1').focus();
    },

    close() {
        document.getElementById('passcode-modal').classList.add('hidden');
        this.pendingNote = null;
    },

    submit() {
        const digits = Array.from(document.querySelectorAll('.pass-digit')).map(i => i.value).join('');
        if (digits === this.storedPasscode) {
            this.close();
            if (this.pendingNote) {
                Notes.openEditorUnlocked(this.pendingNote);
            }
        } else {
            document.getElementById('passcode-error').classList.remove('hidden');
            PsychologyEngine.playDopamineSound('pop');
        }
    }
};

// ===================================
// APPLE NOTES ENHANCED MODULE
// ===================================
const Notes = {
    notes: Storage.getArray('notes'),
    folders: Storage.getArray('folders', [
        { id: 'all', name: 'All Notes', icon: '📝' },
        { id: 'quick', name: 'Quick Notes', icon: '⚡' },
        { id: 'work', name: 'Work & Projects', icon: '💼' },
        { id: 'personal', name: 'Personal', icon: '👤' },
        { id: 'trash', name: 'Recently Deleted', icon: '🗑️' }
    ]),
    activeFolder: 'all',
    viewMode: Storage.get('notesViewMode', 'grid'), // 'grid' or 'list'
    currentNote: null,
    autoSaveTimeout: null,
    searchQuery: '',

    init() {
        this.attachEvents();
        this.renderFolders();
        this.renderFolderDropdown();
        this.render();
    },

    attachEvents() {
        document.getElementById('new-note-btn').addEventListener('click', () => this.createNote());
        document.getElementById('close-note-editor').addEventListener('click', () => this.closeEditor());
        document.getElementById('delete-note-btn').addEventListener('click', () => this.deleteCurrentNote());
        document.getElementById('notes-search').addEventListener('input', (e) => this.search(e.target.value));

        // Note actions
        document.getElementById('duplicate-note-btn').addEventListener('click', () => this.duplicateCurrentNote());
        document.getElementById('export-note-btn').addEventListener('click', () => this.exportCurrentNoteMarkdown());
        document.getElementById('lock-note-toggle-btn').addEventListener('click', () => this.toggleLockCurrentNote());

        // Heading & folder select
        document.getElementById('heading-select').addEventListener('change', (e) => {
            this.execCommand('formatBlock', `<${e.target.value}>`);
        });

        document.getElementById('note-folder-select').addEventListener('change', (e) => {
            if (this.currentNote) {
                this.currentNote.folderId = e.target.value;
                this.saveCurrentNote();
                this.save();
                this.renderFolders();
            }
        });

        // Folders & View Mode
        document.getElementById('add-folder-btn').addEventListener('click', () => this.addNewFolder());
        document.getElementById('view-gallery-btn').addEventListener('click', () => this.setViewMode('grid'));
        document.getElementById('view-list-btn').addEventListener('click', () => this.setViewMode('list'));
        document.getElementById('toggle-sidebar-btn').addEventListener('click', () => {
            const sidebar = document.getElementById('notes-sidebar');
            sidebar.classList.toggle('hidden');
        });

        // Editor events
        const titleEl = document.getElementById('note-title');
        const contentEl = document.getElementById('note-content');

        titleEl.addEventListener('input', () => {
            this.scheduleAutoSave();
            this.updateMetaAnalytics();
        });

        contentEl.addEventListener('input', () => {
            this.scheduleAutoSave();
            this.updateMetaAnalytics();
            PsychologyEngine.playDopamineSound('typewriter');
        });

        contentEl.addEventListener('change', () => this.scheduleAutoSave());

        // Toolbar events
        document.querySelectorAll('.editor-toolbar .toolbar-btn').forEach(btn => {
            btn.addEventListener('mousedown', (e) => e.preventDefault());
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const command = btn.dataset.command;
                if (command === 'quote') {
                    this.execCommand('formatBlock', '<blockquote>');
                } else if (command === 'code') {
                    this.insertCodeBlock();
                } else if (command === 'table') {
                    this.insertTable();
                } else if (command === 'hiliteColor') {
                    this.execCommand('hiliteColor', '#fef08a'); // Soft yellow highlight
                } else {
                    this.execCommand(command);
                }
            });
        });

        // Close modal on background click
        document.getElementById('note-editor-modal').addEventListener('click', (e) => {
            if (e.target.id === 'note-editor-modal') {
                this.closeEditor();
            }
        });

        // Delegated note card clicks
        document.getElementById('notes-list').addEventListener('click', (e) => {
            const card = e.target.closest('.note-card');
            if (!card) return;

            const id = Number(card.dataset.id);
            const note = this.notes.find(n => n.id === id);
            if (!note) return;

            if (e.target.closest('.note-pin')) {
                this.togglePin(id);
            } else {
                this.openEditor(note);
            }
        });
    },

    setViewMode(mode) {
        this.viewMode = mode;
        Storage.set('notesViewMode', mode);

        document.getElementById('view-gallery-btn').classList.toggle('active', mode === 'grid');
        document.getElementById('view-list-btn').classList.toggle('active', mode === 'list');

        const listEl = document.getElementById('notes-list');
        listEl.classList.toggle('grid-view', mode === 'grid');
        listEl.classList.toggle('list-view', mode === 'list');
    },

    renderFolders() {
        const list = document.getElementById('folder-list');
        if (!list) return;

        list.innerHTML = this.folders.map(f => {
            let count = 0;
            if (f.id === 'all') {
                count = this.notes.filter(n => !n.inTrash).length;
            } else if (f.id === 'trash') {
                count = this.notes.filter(n => n.inTrash).length;
            } else {
                count = this.notes.filter(n => !n.inTrash && n.folderId === f.id).length;
            }

            return `
                <li class="folder-item ${f.id === this.activeFolder ? 'active' : ''}" data-folder="${f.id}">
                    <span>${f.icon} ${this.escapeHtml(f.name)}</span>
                    <span class="folder-count">${count}</span>
                </li>
            `;
        }).join('');

        list.querySelectorAll('.folder-item').forEach(item => {
            item.addEventListener('click', () => {
                this.activeFolder = item.dataset.folder;
                this.renderFolders();
                this.render();
            });
        });
    },

    renderFolderDropdown() {
        const select = document.getElementById('note-folder-select');
        if (!select) return;
        select.innerHTML = this.folders
            .filter(f => f.id !== 'all' && f.id !== 'trash')
            .map(f => `<option value="${f.id}">${this.escapeHtml(f.name)}</option>`)
            .join('');
    },

    addNewFolder() {
        const name = prompt('Enter folder name:');
        if (name && name.trim()) {
            const folder = {
                id: 'folder_' + Date.now(),
                name: name.trim(),
                icon: '📁'
            };
            this.folders.push(folder);
            Storage.set('folders', this.folders);
            this.renderFolders();
            this.renderFolderDropdown();
        }
    },

    createNote() {
        const note = {
            id: uid(),
            title: '',
            content: '',
            pinned: false,
            locked: false,
            inTrash: false,
            folderId: this.activeFolder === 'trash' || this.activeFolder === 'all' ? 'quick' : this.activeFolder,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.notes.push(note);
        this.openEditor(note);
        PsychologyEngine.registerActivity();
    },

    openEditor(note) {
        if (note.locked) {
            PasscodeModal.open(note);
        } else {
            this.openEditorUnlocked(note);
        }
    },

    openEditorUnlocked(note) {
        this.currentNote = note;

        document.getElementById('note-title').value = note.title || '';
        document.getElementById('note-content').innerHTML = Sanitizer.clean(note.content || '');
        document.getElementById('note-folder-select').value = note.folderId || 'quick';
        document.getElementById('lock-note-toggle-btn').textContent = note.locked ? '🔒' : '🔓';

        this.updateTimestamp();
        this.updateMetaAnalytics();

        document.getElementById('note-editor-modal').classList.remove('hidden');
        document.getElementById('note-title').focus();
    },

    closeEditor() {
        if (this.currentNote) {
            this.saveCurrentNote();

            if (!this.currentNote.title && !this.getTextContent(this.currentNote.content).trim()) {
                this.notes = this.notes.filter(n => n.id !== this.currentNote.id);
            }
        }

        document.getElementById('note-editor-modal').classList.add('hidden');
        this.currentNote = null;
        this.save();
        this.renderFolders();
        this.render();
    },

    saveCurrentNote() {
        if (!this.currentNote) return;

        this.syncCheckboxState();

        this.currentNote.title = document.getElementById('note-title').value.trim();
        this.currentNote.content = Sanitizer.clean(document.getElementById('note-content').innerHTML);
        this.currentNote.updatedAt = new Date().toISOString();

        this.updateTimestamp();
    },

    duplicateCurrentNote() {
        if (!this.currentNote) return;
        this.saveCurrentNote();
        const clone = {
            ...this.currentNote,
            id: uid(),
            title: (this.currentNote.title || 'Untitled') + ' (Copy)',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.notes.push(clone);
        this.save();
        this.closeEditor();
        this.openEditor(clone);
        PsychologyEngine.playDopamineSound('chime');
    },

    exportCurrentNoteMarkdown() {
        if (!this.currentNote) return;
        const title = this.currentNote.title || 'Untitled Note';
        const text = this.getTextContent(this.currentNote.content);
        const md = `# ${title}\n\n${text}`;
        const blob = new Blob([md], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.md`;
        a.click();
        URL.revokeObjectURL(url);
    },

    toggleLockCurrentNote() {
        if (!this.currentNote) return;
        this.currentNote.locked = !this.currentNote.locked;
        document.getElementById('lock-note-toggle-btn').textContent = this.currentNote.locked ? '🔒' : '🔓';
        this.saveCurrentNote();
        this.save();
        PsychologyEngine.playDopamineSound('pop');
    },

    syncCheckboxState() {
        document.getElementById('note-content')
            .querySelectorAll('input[type="checkbox"]')
            .forEach(box => {
                if (box.checked) {
                    box.setAttribute('checked', '');
                } else {
                    box.removeAttribute('checked');
                }
            });
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

        if (this.currentNote.inTrash) {
            if (confirm('Permanently delete this note?')) {
                this.notes = this.notes.filter(n => n.id !== this.currentNote.id);
                this.closeEditor();
            }
        } else {
            this.currentNote.inTrash = true;
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
        this.searchQuery = query.toLowerCase();
        this.applyFilter();
    },

    applyFilter() {
        const cards = document.querySelectorAll('.note-card');

        cards.forEach(card => {
            const id = parseInt(card.dataset.id);
            const note = this.notes.find(n => n.id === id);

            if (!note) return;

            const matchesSearch =
                (note.title || '').toLowerCase().includes(this.searchQuery) ||
                this.getTextContent(note.content).toLowerCase().includes(this.searchQuery);

            card.style.display = matchesSearch ? 'flex' : 'none';
        });
    },

    execCommand(command, value = null) {
        const editor = document.getElementById('note-content');
        editor.focus();

        if (command === 'checklist') {
            this.insertChecklist();
        } else {
            const selection = window.getSelection();
            if (selection) {
                const range = this.getEditorRange(editor, selection);
                selection.removeAllRanges();
                selection.addRange(range);
            }

            try {
                document.execCommand(command, false, value);
            } catch (e) {
                console.log('Editor command failed:', command, e);
            }
        }

        this.scheduleAutoSave();
    },

    insertCodeBlock() {
        const editor = document.getElementById('note-content');
        editor.focus();
        const codeHtml = '<pre><code>// Type your code here</code></pre><br>';
        this.insertHTMLAtCaret(codeHtml);
    },

    insertTable() {
        const editor = document.getElementById('note-content');
        editor.focus();
        const tableHtml = `
            <table>
                <thead>
                    <tr><th>Header 1</th><th>Header 2</th></tr>
                </thead>
                <tbody>
                    <tr><td>Item 1</td><td>Item 2</td></tr>
                </tbody>
            </table><br>
        `;
        this.insertHTMLAtCaret(tableHtml);
    },

    insertHTMLAtCaret(html) {
        const editor = document.getElementById('note-content');
        const selection = window.getSelection();
        const range = this.getEditorRange(editor, selection);
        const temp = document.createElement('div');
        temp.innerHTML = html;
        const frag = document.createDocumentFragment();
        let node;
        while ((node = temp.firstChild)) {
            frag.appendChild(node);
        }
        range.deleteContents();
        range.insertNode(frag);
        this.scheduleAutoSave();
    },

    insertChecklist() {
        const editor = document.getElementById('note-content');
        editor.focus();
        requestAnimationFrame(() => this.insertChecklistItem(editor));
    },

    insertChecklistItem(editor) {
        const selection = window.getSelection();
        const range = this.getEditorRange(editor, selection);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.style.marginRight = '8px';

        const text = document.createTextNode(' Checklist item');
        const br = document.createElement('br');

        range.deleteContents();
        range.insertNode(br);
        range.insertNode(text);
        range.insertNode(checkbox);

        range.setStart(text, 1);
        range.setEnd(text, text.length);
        selection.removeAllRanges();
        selection.addRange(range);

        this.scheduleAutoSave();
    },

    getEditorRange(editor, selection) {
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            if (editor.contains(range.commonAncestorContainer)) {
                return range;
            }
        }

        const fallback = document.createRange();
        fallback.selectNodeContents(editor);
        fallback.collapse(false);
        return fallback;
    },

    save() {
        Storage.set('notes', this.notes);
    },

    render() {
        const container = document.getElementById('notes-list');
        const emptyState = document.getElementById('notes-empty');
        const folderTitle = document.getElementById('current-folder-title');

        const folderObj = this.folders.find(f => f.id === this.activeFolder) || { name: 'All Notes' };
        if (folderTitle) folderTitle.textContent = folderObj.name;

        // Filter by folder
        let filteredNotes = this.notes;
        if (this.activeFolder === 'trash') {
            filteredNotes = this.notes.filter(n => n.inTrash);
        } else if (this.activeFolder === 'all') {
            filteredNotes = this.notes.filter(n => !n.inTrash);
        } else {
            filteredNotes = this.notes.filter(n => !n.inTrash && n.folderId === this.activeFolder);
        }

        // Sort: pinned first, then updated date
        const sortedNotes = [...filteredNotes].sort((a, b) => {
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
            const preview = note.locked ? '🔒 Locked Note (Enter passcode to open)' : this.getTextContent(note.content).substring(0, 140);
            const formattedDate = this.formatDate(note.updatedAt);
            const folderName = (this.folders.find(f => f.id === note.folderId) || {}).name || 'Quick';

            return `
                <div class="note-card ${note.pinned ? 'pinned' : ''} ${note.locked ? 'locked' : ''}" data-id="${note.id}">
                    <div class="note-card-header">
                        <div class="note-card-title">${this.escapeHtml(note.title || 'Untitled')}</div>
                        <button type="button" class="note-pin" aria-pressed="${note.pinned ? 'true' : 'false'}"
                            aria-label="${note.pinned ? 'Unpin' : 'Pin'} note">${note.pinned ? '📌' : '📍'}</button>
                    </div>
                    <div class="note-card-preview">${this.escapeHtml(preview)}</div>
                    <div class="note-card-meta">
                        <span>Last edited ${formattedDate}</span>
                        <span class="note-folder-tag">${this.escapeHtml(folderName)}</span>
                    </div>
                </div>
            `;
        }).join('');

        this.applyFilter();
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

    escapeAttr(text) {
        return this.escapeHtml(text).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
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
    },

    updateMetaAnalytics() {
        const content = document.getElementById('note-content');
        const text = content ? (content.textContent || '').trim() : '';
        const words = text ? text.split(/\s+/).length : 0;
        const readTime = Math.max(1, Math.ceil(words / 200));

        const wordEl = document.getElementById('note-word-count');
        const readEl = document.getElementById('note-read-time');

        if (wordEl) wordEl.textContent = `${words} words`;
        if (readEl) readEl.textContent = `${readTime} min read`;
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

        // Close on background click. `.fullscreen-content` covers the overlay
        // edge to edge, so testing only for the overlay itself never matched.
        document.getElementById('fullscreen-timer').addEventListener('click', (e) => {
            if (e.target.id === 'fullscreen-timer' ||
                e.target.classList.contains('fullscreen-content')) {
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
        document.getElementById('fullscreen-time').setAttribute('data-animation', animationIntensity);

        // Sync with main timer
        this.syncFromMainTimer();

        // Start quote rotation every 5 minutes (300000ms)
        this.showRandomQuote();
        this.quoteInterval = setInterval(() => this.showRandomQuote(), 300000);

        // Toggle, not add — the class used to survive a close/pause/reopen and
        // left a paused timer boiling and breathing
        fullscreenEl.classList.toggle('running', Timer.isRunning);
    },

    close() {
        this.isOpen = false;
        document.getElementById('fullscreen-timer').classList.add('hidden');
        document.getElementById('fullscreen-timer').classList.remove('running');

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

        // Update water level (drains as time passes)
        const water = document.getElementById('fullscreen-water');
        if (water) {
            water.style.height = `${waterLevelPercent(Timer.timeLeft, totalTime)}%`;
        }

        document.getElementById('fullscreen-timer').classList.toggle('critical', Timer.timeLeft < 60);

        // Update linear progress bar
        const progressFill = document.querySelector('.fullscreen-progress-fill');
        if (progressFill) {
            progressFill.style.width = `${100 - percentage}%`;

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
            document.getElementById('fullscreen-timer').classList.toggle('running', Timer.isRunning);
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
// HOVER MESSAGES
// ===================================
const HoverMessages = {
    bubble: null,

    texts: {
        start: [
            'Deep work starts now.',
            'Your future self says thanks.',
            'One session. Zero distractions.',
            'The tank is full. Time to drain.',
            'Ready? The clock certainly is.',
            'Small timer, big plans.'
        ],
        pause: [
            'A pause is not a stop.',
            'Stretch. Breathe. Return.',
            'The water will wait for you.',
            'Pausing counts as thinking.',
            'Catch your breath, not a scroll.'
        ]
    },

    init() {
        // No hover capability (touch), no bubble
        if (!window.matchMedia('(hover: hover)').matches) return;

        this.bubble = document.createElement('div');
        this.bubble.className = 'msg-bubble';
        this.bubble.setAttribute('aria-hidden', 'true');
        document.body.appendChild(this.bubble);

        document.querySelectorAll('[data-hover-msg]').forEach(btn => {
            const kind = btn.dataset.hoverMsg;
            if (!this.texts[kind]) return;

            btn.addEventListener('mouseenter', () => this.show(btn, kind));
            btn.addEventListener('mouseleave', () => this.hide());
            btn.addEventListener('focus', () => this.show(btn, kind));
            btn.addEventListener('blur', () => this.hide());
        });
    },

    show(btn, kind) {
        const pool = this.texts[kind];
        this.bubble.textContent = pool[Math.floor(Math.random() * pool.length)];
        this.bubble.classList.add('visible');

        const rect = btn.getBoundingClientRect();
        const half = this.bubble.offsetWidth / 2 + 8;
        const x = Math.min(Math.max(rect.left + rect.width / 2, half), window.innerWidth - half);

        this.bubble.style.left = `${x}px`;
        this.bubble.style.top = `${rect.top - 10}px`;
    },

    hide() {
        if (this.bubble) {
            this.bubble.classList.remove('visible');
        }
    }
};

// ===================================
// FOCUS MUSIC
// ===================================
// Generative lo-fi loop via Web Audio: a slow four-chord pad with a soft
// bass and paper-thin hats. Starts with the timer, fades out on pause —
// no audio files needed.
const FocusMusic = {
    ctx: null,
    master: null,
    noiseBuffer: null,
    loopId: null,
    nextStepTime: 0,
    step: 0,
    playing: false,
    enabled: Storage.get('focusMusicEnabled', true),
    BPM: 76,

    chords: [
        [220.00, 261.63, 329.63, 392.00],
        [174.61, 220.00, 261.63, 349.23],
        [130.81, 196.00, 261.63, 329.63],
        [196.00, 246.94, 293.66, 392.00]
    ],
    roots: [55.00, 43.65, 65.41, 49.00],

    init() {
        const btn = document.getElementById('timer-music');
        btn.addEventListener('click', () => this.toggle());
        this.renderButton();
    },

    toggle() {
        this.enabled = !this.enabled;
        Storage.set('focusMusicEnabled', this.enabled);
        this.renderButton();

        // The toggle is a user gesture, so audio may start here even with
        // the timer idle; pausing the timer still fades it out
        if (!this.enabled) {
            this.stop();
        } else {
            this.start();
        }
    },

    renderButton() {
        const btn = document.getElementById('timer-music');
        btn.textContent = this.enabled ? '🎵' : '🔇';
        btn.setAttribute('aria-pressed', String(this.enabled));
        btn.title = this.enabled ? 'Focus music: on' : 'Focus music: off';
    },

    start() {
        if (!this.enabled || this.playing) return;
        if (!('AudioContext' in window) && !('webkitAudioContext' in window)) return;

        this.ensureContext();

        this.playing = true;
        this.step = 0;
        this.nextStepTime = this.ctx.currentTime + 0.15;

        // Gentle fade-in so starting never clicks
        const now = this.ctx.currentTime;
        this.master.gain.cancelScheduledValues(now);
        this.master.gain.setValueAtTime(this.master.gain.value, now);
        this.master.gain.linearRampToValueAtTime(0.9, now + 1.5);

        // Wide lookahead: background tabs throttle setInterval hard, and the
        // music must survive the timer being moved to another tab
        this.loopId = setInterval(() => this.fillQueue(), 1000);
        this.fillQueue();
    },

    stop() {
        if (!this.playing) return;
        this.playing = false;
        clearInterval(this.loopId);
        this.loopId = null;

        if (this.ctx) {
            const now = this.ctx.currentTime;
            this.master.gain.cancelScheduledValues(now);
            this.master.gain.setValueAtTime(this.master.gain.value, now);
            this.master.gain.linearRampToValueAtTime(0, now + 0.6);
        }
    },

    ensureContext() {
        if (!this.ctx) {
            const AC = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AC();
            this.master = this.ctx.createGain();
            this.master.gain.value = 0;
            this.master.connect(this.ctx.destination);

            const len = Math.floor(this.ctx.sampleRate * 0.08);
            this.noiseBuffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
            const data = this.noiseBuffer.getChannelData(0);
            for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
        }

        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },

    fillQueue() {
        const stepDur = 60 / this.BPM / 2; // eighth-note grid
        while (this.nextStepTime < this.ctx.currentTime + 3) {
            this.scheduleStep(this.step, this.nextStepTime);
            this.step++;
            this.nextStepTime += stepDur;
        }
    },

    scheduleStep(step, t) {
        const barDur = (60 / this.BPM) * 4;
        const bar = Math.floor(step / 8) % 4;
        const s = step % 8;
        const chord = this.chords[bar];

        if (s === 0) {
            chord.forEach((freq, i) => this.pad(freq, t + i * 0.03, barDur));
            this.bass(this.roots[bar], t, 1.4);
        }
        if (s === 4) {
            this.bass(this.roots[bar] * 2, t, 0.9);
        }
        if (s % 2 === 1) {
            this.hat(t, s === 7 ? 0.05 : 0.028);
        }
        if (s === 6 && Math.random() < 0.45) {
            const tones = chord.map(f => f * 2);
            this.pluck(tones[Math.floor(Math.random() * tones.length)], t, 0.5);
        }
    },

    pad(freq, t, dur) {
        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = freq;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 850;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.045, t + 0.9);
        gain.gain.setValueAtTime(0.045, t + dur - 1.2);
        gain.gain.linearRampToValueAtTime(0, t + dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.master);
        osc.start(t);
        osc.stop(t + dur + 0.05);
    },

    bass(freq, t, dur) {
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.09, t + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

        osc.connect(gain);
        gain.connect(this.master);
        osc.start(t);
        osc.stop(t + dur + 0.05);
    },

    hat(t, vol) {
        const src = this.ctx.createBufferSource();
        src.buffer = this.noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 7000;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(vol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

        src.connect(filter);
        filter.connect(gain);
        gain.connect(this.master);
        src.start(t);
    },

    pluck(freq, t, dur) {
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.05, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

        osc.connect(gain);
        gain.connect(this.master);
        osc.start(t);
        osc.stop(t + dur + 0.05);
    }
};

// ===================================
// MINI TIMER
// ===================================
// A pill that follows the user across tabs while a session runs; tapping it
// jumps back to the Timer tab.
const MiniTimer = {
    el: null,
    timeEl: null,
    labelEl: null,

    init() {
        this.el = document.getElementById('mini-timer');
        this.timeEl = document.getElementById('mini-timer-time');
        this.labelEl = document.getElementById('mini-timer-label');

        this.el.addEventListener('click', () => Navigation.switchTab('timer'));

        this.sync();
    },

    sync() {
        if (!this.el) return;

        const timerSection = document.getElementById('timer-section');
        const isActiveTab = timerSection.classList.contains('active');
        const show = Timer.isRunning && !isActiveTab;

        this.el.classList.toggle('hidden', !show);
        if (!show) return;

        const minutes = Math.floor(Timer.timeLeft / 60);
        const seconds = Timer.timeLeft % 60;
        this.timeEl.textContent =
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        this.labelEl.textContent = Timer.currentMode === 'work' ? 'Focus' : 'Break';

        this.el.classList.toggle('critical', Timer.timeLeft < 60);
    }
};

// ===================================
// PIXEL DINO
// ===================================
// A tiny T-Rex jogging laps around the water-tank rim, rendered from pixel
// maps as SVG rects. The orbit, leg cycle and reduced-motion parking all
// live in CSS (see .dino-orbit in style.css) so the run keeps true time on
// the compositor even while script frames are throttled, and simply speeds
// up while a session is running. Script only builds the two frames and
// applies the ?motion=full|reduced override (testing aid).
const DinoRun = {
    track: null,
    sprite: null,

    FRAME_A: [
        '..........########..',
        '..........##.#######',
        '..........##########',
        '..........####......',
        '..........###.......',
        '#.........####......',
        '##........###.......',
        '###......####.......',
        '####....#####...##..',
        '#####..######...#...',
        '##############..#...',
        '.#############..#...',
        '..############..#...',
        '...###########..##..',
        '....##########...#..',
        '.....########....#..',
        '.....####.###.......',
        '.....###..###.......',
        '.....##....##.......',
        '.....###...####.....'
    ],

    FRAME_B: [
        '..........########..',
        '..........##.#######',
        '..........##########',
        '..........####......',
        '..........###.......',
        '#.........####......',
        '##........###.......',
        '###......####.......',
        '####....#####...##..',
        '#####..######...#...',
        '##############..#...',
        '.#############..#...',
        '..############..#...',
        '...###########..##..',
        '....##########...#..',
        '.....########....#..',
        '.....####.####......',
        '.....###...###......',
        '....###....##.......',
        '....####...###......'
    ],

    init() {
        this.track = document.getElementById('dino-track');
        this.sprite = document.getElementById('dino-sprite');
        if (!this.track || !this.sprite) return;

        this.sprite.appendChild(this.buildFrame(this.FRAME_A, 'a'));
        this.sprite.appendChild(this.buildFrame(this.FRAME_B, 'b'));

        const motionOverride = new URLSearchParams(location.search).get('motion');
        if (motionOverride === 'full') {
            this.track.classList.add('motion-full');
        } else if (motionOverride === 'reduced') {
            this.track.classList.add('motion-reduced');
        }
    },

    // Called on timer start: snaps the orbit back to twelve o'clock so every
    // session begins its laps from the top. Toggling the animation off and
    // on (with a reflow between) restarts it from its 0% keyframe.
    restart() {
        if (!this.track) return;
        const orbit = this.track.querySelector('.dino-orbit');
        if (!orbit) return;

        orbit.style.animation = 'none';
        void orbit.offsetWidth;
        orbit.style.animation = '';
    },

    buildFrame(map, suffix) {
        const NS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(NS, 'svg');
        svg.setAttribute('viewBox', '0 0 20 20');
        svg.setAttribute('class', `dino-frame dino-frame-${suffix}`);
        svg.setAttribute('shape-rendering', 'crispEdges');

        map.forEach((row, y) => {
            for (let x = 0; x < row.length; x++) {
                if (row[x] !== '#') continue;
                const rect = document.createElementNS(NS, 'rect');
                rect.setAttribute('x', x);
                rect.setAttribute('y', y);
                rect.setAttribute('width', 1);
                rect.setAttribute('height', 1);
                rect.setAttribute('fill', 'currentColor');
                svg.appendChild(rect);
            }
        });

        return svg;
    }
};

// ===================================
// APP INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    PsychologyEngine.init();
    CompanionEngine.init();
    SketchPad.init();
    PasscodeModal.init();

    ThemeManager.init();
    GlobalSettings.init();
    Navigation.init();
    Timer.init();
    Tasks.init();
    Notes.init();
    FullscreenTimer.init();
    PWAInstall.init();
    HoverMessages.init();
    FocusMusic.init();
    MiniTimer.init();
    DinoRun.init();

    // Notification permission is requested from Timer.start(), where there is
    // a real user gesture behind it
});
