import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSmakslyBlogs, getSmakslyBlogBySlug, type SmakslyBlog } from '@/lib/smaksly-blogs'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Transform SmakslyBlog to journal entry format
function transformBlogToEntry(blog: SmakslyBlog) {
  // Extract tags from category (split by comma if multiple)
  const tags = blog.category
    ? blog.category.split(',').map(t => t.trim().toLowerCase())
    : ['journal']

  return {
    title: blog.title,
    date: new Date(blog.publish_date).toISOString().split('T')[0],
    mood: blog.category || 'Reflective',
    content: blog.body,
    tags
  }
}

export async function generateStaticParams() {
  const blogs = await getSmakslyBlogs()
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function JournalEntryPage({ params }: { params: { slug: string } }) {
  const blog = await getSmakslyBlogBySlug(params.slug)

  if (!blog) {
    notFound();
  }

  const entry = transformBlogToEntry(blog)

  return (
    <div style={{ backgroundColor: '#faf8f5' }}>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm mb-8 hover:underline"
          style={{ color: '#c67b5c' }}
        >
          ← Back to all entries
        </Link>

        <article>
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
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
                Feeling: {entry.mood}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif mb-6" style={{ color: '#c67b5c' }}>
              {entry.title}
            </h1>

            <div className="h-px" style={{ backgroundColor: '#c67b5c', opacity: 0.3 }} />
          </header>

          <div className="prose prose-lg max-w-none">
            {entry.content.split('\n\n').map((paragraph, index) => (
              <p
                key={index}
                className="mb-6 text-gray-700 leading-relaxed"
                style={{ textAlign: 'justify' }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <footer className="mt-12 pt-8 border-t" style={{ borderColor: '#c67b5c', opacity: 0.3 }}>
            <div className="flex gap-2 flex-wrap">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1 rounded"
                  style={{ backgroundColor: '#f0e8e0', color: '#8b5a3c' }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </footer>
        </article>

        <div className="mt-12 p-6 rounded-lg" style={{ backgroundColor: '#f0e8e0' }}>
          <p className="text-sm text-gray-600 italic">
            Thank you for reading my thoughts. If this resonated with you, I would love to hear from you.
            <Link href="/contact" className="ml-1 font-medium hover:underline" style={{ color: '#c67b5c' }}>
              Get in touch
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
