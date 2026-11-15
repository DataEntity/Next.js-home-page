export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-5 text-center">
      <p className="text-sm uppercase tracking-[0.28em] text-muted sm:tracking-[0.35em]">404</p>
      <h1 className="mt-6 font-display text-5xl sm:text-6xl">Page not found</h1>
      <a href="/" className="mt-10 rounded-full border border-ink px-6 py-3 transition hover:bg-ink hover:text-paper">
        Back home
      </a>
    </main>
  )
}
