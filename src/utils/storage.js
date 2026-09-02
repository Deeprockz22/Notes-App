export const Storage = {
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

  getArray(key) {
    const value = this.get(key, []);
    return Array.isArray(value) ? value : [];
  },

  getNumber(key, defaultValue) {
    const value = Number(this.get(key, defaultValue));
    return Number.isFinite(value) ? value : defaultValue;
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing key:', e);
    }
  },

  clear() {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error clearing storage:', e);
    }
  }
};

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}
