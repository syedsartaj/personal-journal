import Link from 'next/link';
import { getSmakslyBlogs, type SmakslyBlog } from '@/lib/smaksly-blogs'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Transform SmakslyBlog to thought format
function transformBlogToThought(blog: SmakslyBlog) {
  // Extract excerpt from body (first 100 characters)
  const excerpt = blog.body
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .substring(0, 100) + '...'

  return {
    slug: blog.slug,
    title: blog.title,
    excerpt,
    date: new Date(blog.publish_date).toISOString().split('T')[0],
    category: blog.category || 'Reflection'
  }
}

export default async function ThoughtsPage() {
  const blogs = await getSmakslyBlogs()
  const thoughts = blogs.map(transformBlogToThought)

  // Extract unique categories from blogs
  const uniqueCategories = Array.from(new Set(thoughts.map(t => t.category).filter(Boolean)))
  const categories = ['All', ...uniqueCategories]
  return (
    <div style={{ backgroundColor: '#faf8f5' }}>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-4" style={{ color: '#c67b5c' }}>
            Thoughts
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Musings, reflections, and deeper contemplations on life
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
              style={{
                backgroundColor: category === 'All' ? '#c67b5c' : '#f0e8e0',
                color: category === 'All' ? '#faf8f5' : '#8b5a3c'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Thoughts Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {thoughts.length > 0 ? (
            thoughts.map((thought) => (
              <Link
                key={thought.slug}
                href={`/blog/${thought.slug}`}
                className="group p-6 rounded-lg transition-all hover:shadow-lg"
                style={{ backgroundColor: '#f0e8e0' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ backgroundColor: '#c67b5c', color: '#faf8f5' }}
                  >
                    {thought.category}
                  </span>
                  <time className="text-xs text-gray-500">
                    {new Date(thought.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                </div>

                <h2
                  className="text-xl font-serif mb-2 group-hover:underline"
                  style={{ color: '#c67b5c' }}
                >
                  {thought.title}
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {thought.excerpt}
                </p>

                <span
                  className="inline-block mt-4 text-sm font-medium"
                  style={{ color: '#c67b5c' }}
                >
                  Read more →
                </span>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">No thoughts to share yet. Check back soon!</p>
            </div>
          )}
        </div>

        {/* Quote */}
        <div className="mt-16 p-8 rounded-lg text-center" style={{ backgroundColor: '#f0e8e0' }}>
          <p className="text-lg text-gray-700 italic mb-4">
            "The unexamined life is not worth living."
          </p>
          <p className="text-sm text-gray-500">- Socrates</p>
        </div>

        {/* Newsletter */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-serif mb-4" style={{ color: '#c67b5c' }}>
            Want to read more?
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe to receive new thoughts directly in your inbox
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
              style={{
                backgroundColor: '#faf8f5',
                borderColor: '#f0e8e0',
              }}
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#c67b5c', color: '#faf8f5' }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
