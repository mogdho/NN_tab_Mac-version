// Browser detection shared by the new tab page and the settings page.
// Safari extension pages run on the safari-web-extension:// scheme.
export const isSafari = location.protocol === 'safari-web-extension:';

// Encodes a canvas as WebP when the browser can, otherwise falls back to
// `fallbackType`. Safari may silently return PNG for 'image/webp', which is
// far too large for a full-size wallpaper, so we check the result.
export function canvasToDataURL(canvas, quality, fallbackType = 'image/jpeg') {
    const webp = canvas.toDataURL('image/webp', quality);
    if (webp.startsWith('data:image/webp')) return webp;
    return canvas.toDataURL(fallbackType, quality);
}
