import { blogFallback, type BlogPost } from '@/data/blog-fallback'

export type { BlogPost }

const FEED_URL = 'https://blog.kirishima.dev/rss.xml'
const POST_LIMIT = 4
const FETCH_TIMEOUT_MS = 8000

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
}

function decodeEntities(value: string) {
  return value.replace(/&(#(?:x[0-9a-fA-F]+|\d+)|[a-zA-Z]+);/g, (entity, body: string) => {
    if (body[0] !== '#') {
      return NAMED_ENTITIES[body] ?? entity
    }

    const codePoint = body[1] === 'x' || body[1] === 'X' ? Number.parseInt(body.slice(2), 16) : Number.parseInt(body.slice(1), 10)
    if (!Number.isInteger(codePoint) || codePoint < 0 || codePoint > 0x10ffff) {
      return entity
    }

    return String.fromCodePoint(codePoint)
  })
}

function collapseWhitespace(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function readElement(source: string, tag: string) {
  const match = source.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, 'i'))
  if (!match) return ''

  const cdata = match[1].match(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/)
  return (cdata ? cdata[1] : match[1]).trim()
}

function formatUtcDate(pubDate: string) {
  const timestamp = Date.parse(pubDate)
  if (Number.isNaN(timestamp)) return ''

  const date = new Date(timestamp)
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}/${month}/${day}`
}

function readItems(xml: string) {
  const pattern = /<item\b[^>]*>([\s\S]*?)<\/item>/gi
  const items: string[] = []
  let match: RegExpExecArray | null = pattern.exec(xml)

  while (match && items.length < POST_LIMIT) {
    items.push(match[1])
    match = pattern.exec(xml)
  }

  return items
}

export function parseFeed(xml: string): BlogPost[] {
  const posts: BlogPost[] = []

  for (const item of readItems(xml)) {
    const title = collapseWhitespace(decodeEntities(readElement(item, 'title')))
    const href = collapseWhitespace(decodeEntities(readElement(item, 'link')))
    if (!title || !href) continue

    const description = decodeEntities(readElement(item, 'description')).replace(/<[^>]*>/g, ' ')
    posts.push({
      title,
      href,
      date: formatUtcDate(readElement(item, 'pubDate')),
      summary: collapseWhitespace(description),
    })
  }

  return posts
}

let recentPosts: Promise<BlogPost[]> | null = null

export function getRecentPosts() {
  recentPosts ??= loadRecentPosts()
  return recentPosts
}

async function loadRecentPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(FEED_URL, {
      cache: 'force-cache',
      headers: {
        accept: 'application/rss+xml, application/xml, text/xml',
        'user-agent': 'Mozilla/5.0',
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    })

    if (!response.ok) {
      console.warn(`Blog feed responded ${response.status}. Using fallback posts.`)
      return blogFallback
    }

    const posts = parseFeed(await response.text())
    if (posts.length === 0) {
      console.warn('Blog feed did not include any posts. Using fallback posts.')
      return blogFallback
    }

    return posts
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error'
    console.warn(`Blog feed unavailable (${message}). Using fallback posts.`)
    return blogFallback
  }
}
