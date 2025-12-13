import Link from 'next/link'

interface BlogEntry {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
}

interface BlogCardProps {
  entry: BlogEntry
}

export default function BlogCard({ entry }: BlogCardProps) {
  // Format date to be more personal
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return date.toLocaleDateString('en-US', options)
  }

  return (
    <article className="journal-entry paper-texture group">
      {/* Date and Category */}
      <div className="flex items-center justify-between mb-3">
        <time className="font-handwritten text-lg text-brown">
          {formatDate(entry.date)}
        </time>
        <span className="text-xs uppercase tracking-wider text-charcoal/60 bg-sage/20 px-3 py-1 rounded-full">
          {entry.category}
        </span>
      </div>

      {/* Title */}
      <Link href={`/entry/${entry.id}`}>
        <h3 className="text-2xl font-semibold text-charcoal mb-3 group-hover:text-terracotta transition-colors duration-300">
          {entry.title}
        </h3>
      </Link>

      {/* Excerpt */}
      <p className="text-charcoal/80 leading-relaxed mb-4 text-balance">
        {entry.excerpt}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-brown/10">
        <span className="text-sm text-charcoal/60 italic">
          {entry.readTime}
        </span>
        <Link
          href={`/entry/${entry.id}`}
          className="text-terracotta hover:text-brown transition-colors duration-300 font-medium inline-flex items-center gap-2 group/link"
        >
          Read More
          <svg
            className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg viewBox="0 0 100 100" className="text-terracotta/10">
          <path d="M 0 0 L 100 0 L 100 100 Z" fill="currentColor" />
        </svg>
      </div>
    </article>
  )
}
