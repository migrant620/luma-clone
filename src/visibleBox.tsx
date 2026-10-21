import React from 'react';
import { Platform, Pressable, View, type ViewProps } from 'react-native';


type Rect = { left: number; top: number; right: number; bottom: number };

const targets = new Set<HTMLElement>();
let listening = false;

function isClipping(el: Element): boolean {
  const cs = getComputedStyle(el);
  return cs.overflowX !== 'visible' || cs.overflowY !== 'visible';
}

function visiblePart(host: HTMLElement): Rect | null {
  const r = host.getBoundingClientRect();
  const v: Rect = { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
  const root = document.scrollingElement;
  for (let a = host.parentElement; a && a !== document.body && a !== root; a = a.parentElement) {
    if (!isClipping(a)) continue;
    const ar = a.getBoundingClientRect();
    v.left = Math.max(v.left, ar.left);
    v.top = Math.max(v.top, ar.top);
    v.right = Math.min(v.right, ar.right);
    v.bottom = Math.min(v.bottom, ar.bottom);
  }
  v.left = Math.max(v.left, 0);
  v.top = Math.max(v.top, 0);
  v.right = Math.min(v.right, window.innerWidth);
  v.bottom = Math.min(v.bottom, window.innerHeight);
  if (v.right - v.left <= 0.5 || v.bottom - v.top <= 0.5) return null;
  document.querySelectorAll<HTMLElement>('[data-occluder]').forEach((o) => {
    if (o.contains(host) || host.contains(o)) return;
    const or = o.getBoundingClientRect();
    if (or.left > v.left + 0.5 || or.right < v.right - 0.5) return;
    if (or.top <= v.top && or.bottom > v.top) v.top = Math.min(or.bottom, v.bottom);
    if (or.top < v.bottom && or.bottom >= v.bottom) v.bottom = Math.max(or.top, v.top);
  });
  if (v.bottom - v.top <= 0.5) return null;
  return v;
}

function place(el: HTMLElement): void {
  const host = el.parentElement;
  if (!host) return;
  const hr = host.getBoundingClientRect();
  const v = visiblePart(host);
  const ox = hr.left + host.clientLeft;
  const oy = hr.top + host.clientTop;
  const box = v
    ? { left: v.left - ox, top: v.top - oy, width: v.right - v.left, height: v.bottom - v.top }
    : { left: hr.left - ox, top: hr.top - oy, width: hr.width, height: hr.height };
  el.style.left = `${box.left}px`;
  el.style.top = `${box.top}px`;
  el.style.width = `${box.width}px`;
  el.style.height = `${box.height}px`;
}

function placeAll(): void {
  targets.forEach(place);
}

function listen(): void {
  if (listening) return;
  listening = true;
  document.addEventListener('scroll', placeAll, { capture: true, passive: true });
  window.addEventListener('resize', placeAll, { passive: true });
}

type VisibleTargetProps = ViewProps & { onPress?: () => void };

const FILL = { position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 } as const;
const PRESSED = { backgroundColor: 'rgba(255,255,255,0.28)' } as const;

export function VisibleTarget({ style, onPress, ...rest }: VisibleTargetProps) {
  const ref = React.useRef<View>(null);
  React.useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return undefined;
    const el = ref.current as unknown as HTMLElement | null;
    if (!el || !el.parentElement) return undefined;
    listen();
    targets.add(el);
    place(el);
    const raf = requestAnimationFrame(() => requestAnimationFrame(placeAll));
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(placeAll) : null;
    ro?.observe(el.parentElement);
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      targets.delete(el);
    };
  }, []);
  if (onPress) {
    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        style={({ pressed }) => [FILL, style, pressed && PRESSED]}
        {...rest}
      />
    );
  }
  return <View ref={ref} style={[FILL, style]} {...rest} />;
}

export const occluder = { dataSet: { occluder: '1' } } as unknown as ViewProps;

export function refreshVisibleTargets(): void {
  if (Platform.OS === 'web' && typeof document !== 'undefined') placeAll();
}
