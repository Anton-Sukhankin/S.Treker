const FALLBACK_ICON_PATHS = {
        'arrow-down': '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
        'arrow-down-a-z': '<path d="M11 5H6l5 7H6"/><path d="M15 5v14"/><path d="m19 15-4 4-4-4"/>',
        'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
        'arrow-up': '<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>',
        'arrow-up-z-a': '<path d="M11 5H6l5 7H6"/><path d="M15 19V5"/><path d="m11 9 4-4 4 4"/>',
        'book': '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/>',
        'calendar': '<path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/>',
        'check': '<path d="m20 6-11 11-5-5"/>',
        'chevron-down': '<path d="m6 9 6 6 6-6"/>',
        'chevron-left': '<path d="m15 18-6-6 6-6"/>',
        'chevron-right': '<path d="m9 18 6-6-6-6"/>',
        'copy': '<rect x="9" y="9" width="13" height="13" rx="2"/><rect x="2" y="2" width="13" height="13" rx="2"/>',
        'download': '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
        'edit-2': '<path d="M17 3a2.8 2.8 0 0 1 4 4L8 20l-5 1 1-5Z"/>',
        'eye': '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
        'file-check': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/>',
        'file-plus': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',
        'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h6"/>',
        'folder': '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
        'folder-minus': '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M9 13h6"/>',
        'folder-plus': '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M12 10v6"/><path d="M9 13h6"/>',
        'folder-tree': '<path d="M3 5a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v3H3Z"/><path d="M3 10v7a2 2 0 0 0 2 2h5"/><path d="M13 15h8"/><path d="M13 19h8"/><path d="M13 11h8"/>',
        'grip-vertical': '<circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/>',
        'inbox': '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="m5.5 5 13 0 3.5 7v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6Z"/>',
        'layers': '<path d="m12 2 9 5-9 5-9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
        'layout-grid': '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
        'link': '<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/>',
        'more-vertical': '<circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>',
        'pin': '<path d="m15 4 5 5-4 4v5l-2 2-4-4-4 4-2-2 4-4H3L1 12l5-5Z"/>',
        'plus': '<path d="M12 5v14"/><path d="M5 12h14"/>',
        'plus-circle': '<circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/>',
        'refresh-cw': '<path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/><path d="M3 12A9 9 0 0 1 18 5.3L21 8"/><path d="M21 3v5h-5"/>',
        'rotate-ccw': '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
        'save': '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/>',
        'search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
        'settings': '<circle cx="12" cy="12" r="3"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="m4.9 4.9 2.1 2.1"/><path d="m17 17 2.1 2.1"/><path d="M2 12h3"/><path d="M19 12h3"/><path d="m4.9 19.1 2.1-2.1"/><path d="m17 7 2.1-2.1"/>',
        'trash-2': '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>',
        'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
    };

export function renderFallbackIcons() {
        document.querySelectorAll('[data-lucide]').forEach(icon => {
            const name = icon.getAttribute('data-lucide');
            if (icon.dataset.esmIconRendered === name) return;
            const paths = FALLBACK_ICON_PATHS[name] || '<circle cx="12" cy="12" r="8"/>';
            icon.innerHTML = `<svg class="esm-fallback-icon" viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
            icon.dataset.esmIconRendered = name;
        });
    }

    if (!window.lucide || typeof window.lucide.createIcons !== 'function') {
        window.lucide = { createIcons: renderFallbackIcons, __esmFallback: true };
    }
