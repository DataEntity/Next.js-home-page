"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { HashNavigation, Keyboard, Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const DESKTOP_BREAKPOINT = "(min-width: 1024px)";
const REDUCE_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const SWIPE_SPEED = 700;
const TAP_SLOP = 12;

const SECTION_HASHES = [
  "home",
  "about",
  "experience",
  "links",
  "services",
  "recognition",
  "writers",
  "blog",
  "contacts",
] as const;

type SectionSwiperProps = {
  children: ReactNode;
};

function hashToIndex(hash: string) {
  const id = hash.replace(/^#/, "");
  const index = SECTION_HASHES.indexOf(id as (typeof SECTION_HASHES)[number]);
  return index >= 0 ? index : 0;
}

function menuIsOpen() {
  return document.documentElement.hasAttribute("data-menu-open");
}

function canScroll(node: HTMLElement, direction: "up" | "down") {
  const maxScroll = node.scrollHeight - node.clientHeight;
  if (maxScroll <= 1) {
    return false;
  }

  if (direction === "up") {
    return node.scrollTop > 1;
  }

  return node.scrollTop < maxScroll - 1;
}

function scrollTarget(target: EventTarget | null, slide: HTMLElement) {
  let node = target instanceof Element ? target : null;

  while (node && node !== slide) {
    if (node instanceof HTMLElement) {
      const overflowY = window.getComputedStyle(node).overflowY;
      const scrolls = overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay";
      if (scrolls && node.scrollHeight > node.clientHeight + 1) {
        return node;
      }
    }

    node = node.parentElement;
  }

  return slide;
}

function syncHash(index: number) {
  const hash = SECTION_HASHES[index];
  if (!hash) {
    return;
  }

  const next = `#${hash}`;
  if (window.location.hash === next) {
    return;
  }

  window.history.replaceState(null, "", next);
}

function bindMobileGesture(swiper: SwiperInstance) {
  const el = swiper.el;
  let startX = 0;
  let startY = 0;
  let lastY = 0;
  let direction = 0;

  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    startX = event.clientX;
    startY = event.clientY;
    lastY = event.clientY;
    direction = 0;
    swiper.allowTouchMove = false;
  };

  const updateTouch = (clientY: number, target: EventTarget | null) => {
    const step = clientY - lastY;
    lastY = clientY;

    if (Math.abs(step) >= 2) {
      direction = step > 0 ? 1 : -1;
    }

    if (menuIsOpen() || direction === 0) {
      swiper.allowTouchMove = false;
      return;
    }

    const slide = swiper.slides[swiper.activeIndex] as HTMLElement | undefined;
    if (!slide) {
      swiper.allowTouchMove = true;
      return;
    }

    const scroller = scrollTarget(target, slide);
    const blocked =
      (direction > 0 && canScroll(scroller, "up")) || (direction < 0 && canScroll(scroller, "down"));

    swiper.allowTouchMove = !blocked;
  };

  const onPointerMove = (event: PointerEvent) => {
    updateTouch(event.clientY, event.target);
  };

  const onTouchMove = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (!touch) {
      return;
    }

    updateTouch(touch.clientY, event.target);
  };

  const onPointerUp = (event: PointerEvent) => {
    const dx = Math.abs(event.clientX - startX);
    const dy = Math.abs(event.clientY - startY);
    if (dx < TAP_SLOP && dy < TAP_SLOP) {
      (swiper as SwiperInstance & { allowClick: boolean }).allowClick = true;
    }
  };

  const onMenuToggle = (event: Event) => {
    if (event instanceof CustomEvent && event.detail === true) {
      swiper.allowTouchMove = false;
    }
  };

  el.addEventListener("pointerdown", onPointerDown, true);
  el.addEventListener("pointermove", onPointerMove);
  el.addEventListener("touchmove", onTouchMove, { passive: true });
  el.addEventListener("pointerup", onPointerUp);
  el.addEventListener("pointercancel", onPointerUp);
  window.addEventListener("site-menu-toggle", onMenuToggle);

  swiper.on("destroy", () => {
    el.removeEventListener("pointerdown", onPointerDown, true);
    el.removeEventListener("pointermove", onPointerMove);
    el.removeEventListener("touchmove", onTouchMove);
    el.removeEventListener("pointerup", onPointerUp);
    el.removeEventListener("pointercancel", onPointerUp);
    window.removeEventListener("site-menu-toggle", onMenuToggle);
  });
}

export function SectionSwiper({ children }: SectionSwiperProps) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const activeIndexRef = useRef(0);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const slides = Children.toArray(children);

  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_BREAKPOINT);
    const motionQuery = window.matchMedia(REDUCE_MOTION_QUERY);

    const sync = () => {
      const swiper = swiperRef.current;
      if (swiper && !swiper.destroyed) {
        activeIndexRef.current = swiper.activeIndex;
        syncHash(swiper.activeIndex);
      }

      setIsDesktop(desktopQuery.matches);
      setReduceMotion(motionQuery.matches);
    };

    sync();
    desktopQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);

    return () => {
      desktopQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (isDesktop === null) {
      return;
    }

    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previous;
  }, [isDesktop]);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || swiper.destroyed) {
      return;
    }

    swiper.params.speed = reduceMotion ? 0 : SWIPE_SPEED;
  }, [reduceMotion, isDesktop]);

  if (slides.length !== SECTION_HASHES.length && isDesktop !== null) {
    console.warn(
      `SectionSwiper: expected ${SECTION_HASHES.length} sections, received ${slides.length}.`,
    );
  }

  if (isDesktop === null) {
    return <main className="min-h-screen overflow-x-clip">{children}</main>;
  }

  const speed = reduceMotion ? 0 : SWIPE_SPEED;

  return (
    <main className="h-dvh overflow-hidden">
      <Swiper
        key={isDesktop ? "desktop" : "mobile"}
        className="section-swiper h-full w-full"
        direction="vertical"
        slidesPerView={1}
        speed={speed}
        resistanceRatio={0}
        threshold={isDesktop ? 0 : TAP_SLOP}
        initialSlide={activeIndexRef.current}
        modules={isDesktop ? [Mousewheel, Keyboard, HashNavigation, Pagination] : [HashNavigation]}
        mousewheel={
          isDesktop
            ? {
                forceToAxis: true,
                sensitivity: 1,
                releaseOnEdges: true,
              }
            : undefined
        }
        keyboard={
          isDesktop
            ? {
                enabled: true,
                onlyInViewport: true,
              }
            : undefined
        }
        hashNavigation={{
          watchState: true,
          replaceState: true,
        }}
        pagination={isDesktop ? { clickable: true } : false}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          const lockContainerScroll = () => {
            if (swiper.el.scrollTop !== 0) {
              swiper.el.scrollTop = 0;
            }
            if (swiper.el.scrollLeft !== 0) {
              swiper.el.scrollLeft = 0;
            }
          };
          swiper.el.addEventListener("scroll", lockContainerScroll);
          swiper.on("destroy", () => {
            swiper.el.removeEventListener("scroll", lockContainerScroll);
          });
          lockContainerScroll();
          if (!isDesktop) {
            bindMobileGesture(swiper);
          }
        }}
        onSlideChange={(swiper) => {
          activeIndexRef.current = swiper.activeIndex;
        }}
        onInit={(swiper) => {
          const index = hashToIndex(window.location.hash);
          activeIndexRef.current = index;
          if (index !== swiper.activeIndex) {
            swiper.slideTo(index, 0);
          }
        }}
      >
        {slides.map((slide, index) => {
          const hash = SECTION_HASHES[index] ?? `section-${index}`;

          return (
            <SwiperSlide key={hash} data-hash={hash} className="!h-dvh overflow-x-clip overflow-y-auto">
              {slide}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </main>
  );
}
