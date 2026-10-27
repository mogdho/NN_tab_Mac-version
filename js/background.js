const IS_SAFARI = self.location.protocol === 'safari-web-extension:';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fetchIcon') {
        fetch(request.url, { credentials: 'omit' })
            .then(res => {
                if (!res.ok) throw new Error('Not ok');
                const contentType = res.headers.get('content-type');
                if (contentType && !contentType.startsWith('image/')) throw new Error('Not an image');
                return Promise.all([res.blob(), res.arrayBuffer(), contentType]);
            })
            .then(([blob, buffer, contentType]) => {
                if (blob.size < 50) throw new Error('Too small');

                // Convert ArrayBuffer to Base64 manually since FileReader is not in Service Workers
                let binary = '';
                const bytes = new Uint8Array(buffer);
                const len = bytes.byteLength;

                for (let i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }

                const mimeType = contentType || 'image/png';
                const base64 = 'data:' + mimeType + ';base64,' + btoa(binary);
                sendResponse({ base64: base64 });
            })
            .catch(err => {
                sendResponse({ base64: null });
            });
        return true; // Keep message channel open for async response
    }
});

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        // On Safari, open Settings so website access can be granted right away.
        const url = IS_SAFARI ? chrome.runtime.getURL('backup.html') : 'https://github.com/sandip617/';
        chrome.tabs.create({ url });
    }
});

// Safari build has no toolbar popup (Safari closes popups when a file picker
// opens), so the toolbar button opens Settings in a full tab instead.
// On Chrome this never fires because a popup is set.
if (chrome.action && chrome.action.onClicked) {
    chrome.action.onClicked.addListener(() => {
        chrome.tabs.create({ url: chrome.runtime.getURL('backup.html') });
    });
}

// Not available in Safari.
if (chrome.runtime.setUninstallURL) {
    chrome.runtime.setUninstallURL("https://github.com/sandip617/");
}
