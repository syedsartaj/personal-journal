import AuthorIntro from '@/components/AuthorIntro'
import BlogCard from '@/components/BlogCard'
import { getSmakslyBlogs, estimateReadTime, formatBlogDate, type SmakslyBlog } from '@/lib/smaksly-blogs'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Transform SmakslyBlog to BlogEntry format
function transformBlogToEntry(blog: SmakslyBlog) {
  // Extract excerpt from body (first 150 characters)
  const excerpt = blog.body
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .substring(0, 150) + '...'

  return {
    id: blog.slug,
    title: blog.title,
    excerpt,
    date: formatBlogDate(blog.publish_date),
    category: blog.category || 'Uncategorized',
    readTime: estimateReadTime(blog.body)
  }
}

export default async function Home() {
  const blogs = await getSmakslyBlogs()
  const entries = blogs.slice(0, 6).map(transformBlogToEntry)
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Author Introduction */}
      <AuthorIntro />

      {/* Recent Entries Section */}
      <section className="mt-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-grow bg-brown/20"></div>
          <h2 className="font-handwritten text-3xl text-brown">Recent Entries</h2>
          <div className="h-px flex-grow bg-brown/20"></div>
        </div>

        <div className="space-y-8">
          {entries.length > 0 ? (
            entries.map((entry) => (
              <BlogCard key={entry.id} entry={entry} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-charcoal/60 text-lg">No entries yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Archive Link */}
      <div className="mt-12 text-center">
        <button className="px-8 py-3 border-2 border-brown text-brown hover:bg-brown hover:text-cream transition-colors duration-300 rounded-full font-semibold">
          View All Entries
        </button>
      </div>
    </div>
  )
}
