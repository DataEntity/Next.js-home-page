import { getRecentPosts, type BlogPost } from '@/lib/blog'
import { Section } from '@/components/ui/Section'

const linkSurface =
  'transition fine:hover:bg-ink fine:hover:text-paper focus-visible:bg-ink focus-visible:text-paper active:bg-ink active:text-paper'

const mutedOnInk =
  'text-muted fine:group-hover:text-paper/70 group-focus-visible:text-paper/70 group-active:text-paper/70'

function PostDate({ date, className }: { date: string; className: string }) {
  if (!date) return null
  return <p className={className}>{date}</p>
}

function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <a href={post.href} target="_blank" rel="noreferrer" className={`group block rounded-3xl p-4 sm:p-6 lg:p-4 ${linkSurface}`}>
      <PostDate date={post.date} className={`text-xs tracking-[0.28em] sm:text-sm sm:tracking-[0.32em] ${mutedOnInk}`} />
      <h3 className="mt-3 flex items-start justify-between gap-4 font-display text-3xl sm:mt-4 lg:mt-2">
        <span className="min-w-0">{post.title}</span>
        <span aria-hidden="true" className="shrink-0">
          ↗
        </span>
      </h3>
      {post.summary ? <p className={`mt-3 line-clamp-2 sm:mt-4 lg:mt-2 ${mutedOnInk}`}>{post.summary}</p> : null}
    </a>
  )
}

function PostList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line">
      {posts.map((post) => (
        <a
          key={post.href}
          href={post.href}
          target="_blank"
          rel="noreferrer"
          className={`group grid min-h-11 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 p-4 sm:p-6 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-end lg:px-4 lg:py-3 ${linkSurface}`}
        >
          <h3 className="min-w-0 font-display text-2xl">{post.title}</h3>
          <span aria-hidden="true" className="font-display text-2xl md:col-start-3">
            ↗
          </span>
          <PostDate
            date={post.date}
            className={`text-xs tracking-[0.2em] sm:text-sm sm:tracking-[0.25em] md:col-start-2 md:row-start-1 ${mutedOnInk}`}
          />
        </a>
      ))}
    </div>
  )
}

export async function BlogSection() {
  const posts = await getRecentPosts()
  const [featured, ...rest] = posts

  return (
    <Section id="blog" eyebrow="Blog" title="最近寫的" subtitle="閱讀札記、生活瑣事，和還沒想完的念頭。">
      <div className="flex flex-col gap-6 sm:gap-8 lg:gap-4">
        {featured ? <FeaturedPost post={featured} /> : null}
        {rest.length > 0 ? <PostList posts={rest} /> : null}
        <a
          href="https://blog.kirishima.dev/writing/"
          target="_blank"
          rel="noreferrer"
          className={`inline-flex min-h-11 w-fit items-center gap-3 self-start rounded-full px-4 font-display text-2xl sm:px-6 lg:px-4 ${linkSurface}`}
        >
          全部寫作
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </Section>
  )
}
