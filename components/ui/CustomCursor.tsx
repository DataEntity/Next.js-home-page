"use client";

import { useEffect, useRef, useState } from "react";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], .swiper-pagination-bullet';
const TEXT_FIELD_SELECTOR = 'input, textarea, select, [contenteditable="true"]';

function targetElement(target: EventTarget | null) {
  if (target instanceof Element) {
    return target;
  }

  if (target instanceof Node) {
    return target.parentElement;
  }

  return null;
}

function isInteractiveTarget(target: EventTarget | null) {
  const element = targetElement(target);

  if (!element || element.closest(TEXT_FIELD_SELECTOR)) {
    return false;
  }

  return Boolean(element.closest(INTERACTIVE_SELECTOR));
}

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pointRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mediaQuery = window.matchMedia(FINE_POINTER_QUERY);
    const syncPointer = () => setEnabled(mediaQuery.matches);

    syncPointer();
    mediaQuery.addEventListener("change", syncPointer);

    return () => mediaQuery.removeEventListener("change", syncPointer);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const outer = outerRef.current;
    const dot = dotRef.current;

    if (!outer || !dot) {
      return;
    }

    const root = document.documentElement;
    let frame = 0;
    let inside = false;
    let active = false;
    let pressed = false;

    root.classList.add("has-custom-cursor");

    const paint = () => {
      frame = 0;

      if (!inside) {
        return;
      }

      const { x, y } = pointRef.current;
      outer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      outer.classList.add("is-visible");
    };

    const requestPaint = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(paint);
    };

    const setActive = (next: boolean) => {
      if (active === next) {
        return;
      }

      active = next;
      dot.classList.toggle("is-active", next);
    };

    const setPressed = (next: boolean) => {
      if (pressed === next) {
        return;
      }

      pressed = next;
      dot.classList.toggle("is-pressed", next);
    };

    const hide = () => {
      inside = false;
      outer.classList.remove("is-visible");
      setActive(false);
      setPressed(false);

      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      pointRef.current.x = event.clientX;
      pointRef.current.y = event.clientY;
      inside = true;
      setActive(isInteractiveTarget(event.target));
      requestPaint();
    };

    const onPointerOver = (event: PointerEvent) => {
      setActive(isInteractiveTarget(event.target));
    };

    const onPointerOut = (event: PointerEvent) => {
      const next = event.relatedTarget;

      if (!(next instanceof Node) || !root.contains(next)) {
        hide();
        return;
      }

      setActive(isInteractiveTarget(next));
    };

    const onPointerDown = () => setPressed(true);
    const onPointerUp = () => setPressed(false);

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointercancel", onPointerUp);
    root.addEventListener("pointerleave", hide);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointercancel", onPointerUp);
      root.removeEventListener("pointerleave", hide);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      root.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div ref={outerRef} className="custom-cursor" aria-hidden="true">
      <div ref={dotRef} className="custom-cursor__dot" />
    </div>
  );
}
