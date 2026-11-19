export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-5 text-center">
      <p className="text-sm uppercase tracking-[0.28em] text-muted sm:tracking-[0.35em]">404</p>
      <h1 className="mt-6 font-display text-5xl sm:text-6xl">Page not found</h1>
      <a href="/" className="mt-10 inline-flex min-h-11 items-center rounded-full border border-ink px-6 transition fine:hover:bg-ink fine:hover:text-paper focus-visible:bg-ink focus-visible:text-paper active:bg-ink active:text-paper">
        Back home
      </a>
    </main>
  )
}
