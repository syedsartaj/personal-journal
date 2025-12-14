import Link from 'next/link';
import { getSmakslyBlogs, formatBlogDate, type SmakslyBlog } from '@/lib/smaksly-blogs'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Transform SmakslyBlog to journal entry format
function transformBlogToJournalEntry(blog: SmakslyBlog) {
  // Extract excerpt from body (first 150 characters)
  const excerpt = blog.body
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .substring(0, 150) + '...'

  // Extract tags from category (split by comma if multiple)
  const tags = blog.category
    ? blog.category.split(',').map(t => t.trim().toLowerCase())
    : ['journal']

  return {
    slug: blog.slug,
    title: blog.title,
    date: new Date(blog.publish_date).toISOString().split('T')[0],
    mood: blog.category || 'Reflective',
    excerpt,
    tags
  }
}

export default async function BlogPage() {
  const blogs = await getSmakslyBlogs()
  const journalEntries = blogs.map(transformBlogToJournalEntry)
  return (
    <div style={{ backgroundColor: '#faf8f5' }}>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-4" style={{ color: '#c67b5c' }}>
            Journal Entries
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Thoughts, reflections, and moments from my daily life
          </p>
        </div>

        <div className="space-y-8">
          {journalEntries.length > 0 ? (
            journalEntries.map((entry) => (
              <article
                key={entry.slug}
                className="border-l-4 pl-6 py-4 transition-all hover:pl-8"
                style={{ borderColor: '#c67b5c' }}
              >
                <div className="flex items-center gap-4 mb-2 text-sm text-gray-500">
                  <time dateTime={entry.date}>
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <span className="px-3 py-1 rounded-full text-xs" style={{
                    backgroundColor: '#c67b5c',
                    color: '#faf8f5'
                  }}>
                    {entry.mood}
                  </span>
                </div>

                <Link href={`/blog/${entry.slug}`}>
                  <h2 className="text-2xl font-serif mb-3 hover:opacity-70 transition-opacity" style={{ color: '#c67b5c' }}>
                    {entry.title}
                  </h2>
                </Link>

                <p className="text-gray-700 leading-relaxed mb-4">
                  {entry.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded"
                        style={{ backgroundColor: '#f0e8e0', color: '#8b5a3c' }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${entry.slug}`}
                    className="text-sm font-medium hover:underline"
                    style={{ color: '#c67b5c' }}
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No journal entries yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
