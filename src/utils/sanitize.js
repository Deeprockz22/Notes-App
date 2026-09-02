export const Sanitizer = {
  FORBIDDEN_TAGS: new Set([
    'SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'LINK', 'META', 'BASE', 'FORM'
  ]),

  URL_ATTRS: new Set(['href', 'src', 'xlink:href', 'action', 'formaction']),

  clean(html) {
    if (typeof window === 'undefined' || !html) return '';
    try {
      const doc = new DOMParser().parseFromString(String(html || ''), 'text/html');

      doc.body.querySelectorAll('*').forEach((el) => {
        if (this.FORBIDDEN_TAGS.has(el.tagName)) {
          el.remove();
          return;
        }

        Array.from(el.attributes).forEach((attr) => {
          const name = attr.name.toLowerCase();
          const value = attr.value.replace(/[\s\u0000-\u001f]/g, '').toLowerCase();

          if (name.startsWith('on')) {
            el.removeAttribute(attr.name);
          } else if (this.URL_ATTRS.has(name) && value.startsWith('javascript:')) {
            el.removeAttribute(attr.name);
          }
        });
      });

      return doc.body.innerHTML;
    } catch (e) {
      console.error('Sanitize error:', e);
      return '';
    }
  }
};
