import { initClock } from './clock.js';
import { initQuotes } from './quotes.js';
import { initTodo } from './todo.js';
import { initTabs } from './tabs.js';
import { initShortcuts } from './shortcuts.js';
import { isSafari } from './platform.js';

// Safari build: no ChatGPT button, and a full-width (left-aligned) layout.
if (isSafari) {
    document.documentElement.classList.add('is-safari');
    document.getElementById('ai-btn')?.remove();
}

function applyTheme(mode) {
    document.body.classList.toggle('light-mode', mode === 'light');
}

function applyWallpaper(dataUrl) {
    const bgLayer = document.getElementById('bg-layer');
    if (!bgLayer) return;
    if (dataUrl) {
        bgLayer.style.backgroundImage = `url(${dataUrl})`;
        bgLayer.style.backgroundSize = 'cover';
        bgLayer.style.backgroundPosition = 'center';
        bgLayer.style.backgroundRepeat = 'no-repeat';
    } else {
        bgLayer.style.backgroundImage = 'none';
    }
}

// Opens chatgpt.com in a small popup window next to the button (Chrome only).
function setupAiButton() {
    const aiBtn = document.getElementById('ai-btn');
    if (!aiBtn) return;

    let popupWindowId = null;

    const closePopup = () => {
        if (popupWindowId === null) return;
        chrome.windows.remove(popupWindowId, () => { popupWindowId = null; });
    };

    chrome.windows.onRemoved.addListener((windowId) => {
        if (windowId === popupWindowId) popupWindowId = null;
    });

    aiBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (popupWindowId !== null) return closePopup();

        const width = 400;
        const height = 600;
        const btnRect = aiBtn.getBoundingClientRect();
        const screenX = window.screenX || window.screenLeft;
        const screenY = window.screenY || window.screenTop;

        chrome.windows.create({
            url: 'https://chatgpt.com',
            type: 'popup',
            width,
            height,
            left: Math.round(screenX + btnRect.left - width - 20),
            top: Math.round(screenY + (window.outerHeight - window.innerHeight) + btnRect.bottom - height)
        }, (win) => {
            popupWindowId = win.id;
        });
    });

    aiBtn.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('click', closePopup);
}

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['themeMode', 'wallpaperData'], (res) => {
        applyTheme(res.themeMode);
        if (res.wallpaperData) applyWallpaper(res.wallpaperData);
    });

    // Live-update when Settings changes the theme or wallpaper
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace !== 'local') return;
        if (changes.themeMode) applyTheme(changes.themeMode.newValue);
        if (changes.wallpaperData) applyWallpaper(changes.wallpaperData.newValue);
    });

    initClock();
    initQuotes();
    initTodo();

    // Load the active tab first, then initialize both tabs and shortcuts
    chrome.storage.local.get(['activeTab'], (result) => {
        const active = result.activeTab || 'bookmarks';
        initTabs(active);
        initShortcuts(active);
    });

    setupAiButton();
});
