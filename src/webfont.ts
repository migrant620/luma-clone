import { Platform } from 'react-native';


const FACE_ID = 'luma-face-plus-jakarta';
const FONT_URL: unknown = require('../assets/fonts/PlusJakartaSans-VF.ttf');

function fontUrl(): string | null {
  if (typeof FONT_URL === 'string') return FONT_URL;
  const mod = FONT_URL as { uri?: unknown; default?: unknown } | null;
  if (mod && typeof mod.uri === 'string') return mod.uri;
  if (mod && typeof mod.default === 'string') return mod.default;
  return null;
}

export function registerAppFont(): void {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  if (document.getElementById(FACE_ID)) return;
  const url = fontUrl();
  if (!url) return;
  const style = document.createElement('style');
  style.id = FACE_ID;
  style.textContent = `@font-face{font-family:'PlusJakartaSans';src:url("${url}") format('truetype');font-weight:200 800;font-display:swap;}`;
  document.head.appendChild(style);
  const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
  if (fonts && fonts.ready) {
    fonts.ready.then(() => document.body && document.body.setAttribute('data-fonts', 'ready')).catch(() => undefined);
  }
}
