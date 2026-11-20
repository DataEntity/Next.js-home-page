'use client'

import { useEffect, useState } from 'react'
import { navigationItems } from '@/data/navigation'

export function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const closeOnDesktop = () => {
      if (mediaQuery.matches) {
        setOpen(false)
      }
    }

    mediaQuery.addEventListener('change', closeOnDesktop)
    return () => mediaQuery.removeEventListener('change', closeOnDesktop)
  }, [])

  useEffect(() => {
    document.documentElement.toggleAttribute('data-menu-open', open)
    window.dispatchEvent(new CustomEvent('site-menu-toggle', { detail: open }))

    return () => {
      document.documentElement.removeAttribute('data-menu-open')
      window.dispatchEvent(new CustomEvent('site-menu-toggle', { detail: false }))
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-paper/85 pt-[env(safe-area-inset-top)] backdrop-blur">
      <div className="page-gutter mx-auto flex h-16 max-w-7xl items-center justify-between gap-3">
        <a href="#home" className="inline-flex min-h-11 items-center font-display text-2xl tracking-tight" onClick={() => setOpen(false)}>
          KI
        </a>
        <nav className="hidden items-center gap-4 text-sm text-muted lg:flex xl:gap-6">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href} className="inline-flex min-h-11 items-center transition fine:hover:text-ink focus-visible:text-ink active:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#contacts" className="inline-flex min-h-11 items-center rounded-full border border-ink px-4 text-sm transition fine:hover:bg-ink fine:hover:text-paper focus-visible:bg-ink focus-visible:text-paper active:bg-ink active:text-paper" onClick={() => setOpen(false)}>
            Contact
          </a>
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm lg:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      {open && (
        <nav id="site-menu" className="page-gutter max-h-[calc(100dvh-4rem-env(safe-area-inset-top))] overflow-y-auto border-t border-line/80 bg-paper/95 py-3 backdrop-blur lg:hidden">
          <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex min-h-11 items-center rounded-2xl px-3 py-3 text-base transition fine:hover:bg-ink fine:hover:text-paper focus-visible:bg-ink focus-visible:text-paper active:bg-ink active:text-paper"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
