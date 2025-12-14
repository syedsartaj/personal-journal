import Link from 'next/link';
import { getSmakslyBlogs, type SmakslyBlog } from '@/lib/smaksly-blogs'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Organize blogs by year and month
function organizeByYearAndMonth(blogs: SmakslyBlog[]) {
  const archiveByYear: Record<string, { month: string; entries: { slug: string; title: string; date: string; }[] }[]> = {}

  blogs.forEach(blog => {
    const date = new Date(blog.publish_date)
    const year = date.getFullYear().toString()
    const month = date.toLocaleDateString('en-US', { month: 'long' })
    const dateString = date.toISOString().split('T')[0]

    if (!archiveByYear[year]) {
      archiveByYear[year] = []
    }

    let monthData = archiveByYear[year].find(m => m.month === month)
    if (!monthData) {
      monthData = { month, entries: [] }
      archiveByYear[year].push(monthData)
    }

    monthData.entries.push({
      slug: blog.slug,
      title: blog.title,
      date: dateString
    })
  })

  // Sort years descending, months by date descending
  const sortedArchive: Record<string, { month: string; entries: { slug: string; title: string; date: string; }[] }[]> = {}
  Object.keys(archiveByYear)
    .sort((a, b) => Number(b) - Number(a))
    .forEach(year => {
      sortedArchive[year] = archiveByYear[year]
    })

  return sortedArchive
}

export default async function ArchivePage() {
  const blogs = await getSmakslyBlogs()
  const archiveByYear = organizeByYearAndMonth(blogs)
  return (
    <div style={{ backgroundColor: '#faf8f5' }}>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-4" style={{ color: '#c67b5c' }}>
            Archive
          </h1>
          <p className="text-lg text-gray-600 font-light">
            A collection of all my journal entries, organized by time
          </p>
        </div>

        <div className="space-y-12">
          {Object.keys(archiveByYear).length > 0 ? (
            Object.entries(archiveByYear).map(([year, months]) => (
              <div key={year}>
                <h2 className="text-3xl font-serif mb-6 flex items-center gap-4" style={{ color: '#c67b5c' }}>
                  <span>{year}</span>
                  <div className="h-px flex-grow" style={{ backgroundColor: '#c67b5c', opacity: 0.3 }} />
                </h2>

                <div className="space-y-8">
                  {months.map((monthData) => (
                    <div key={monthData.month} className="pl-6 border-l-2" style={{ borderColor: '#f0e8e0' }}>
                      <h3 className="text-xl font-medium text-gray-700 mb-4">
                        {monthData.month}
                      </h3>
                      <div className="space-y-3">
                        {monthData.entries.map((entry) => (
                          <Link
                            key={entry.slug}
                            href={`/blog/${entry.slug}`}
                            className="group flex items-center justify-between py-2 hover:pl-2 transition-all"
                          >
                            <span className="group-hover:underline" style={{ color: '#c67b5c' }}>
                              {entry.title}
                            </span>
                            <time className="text-sm text-gray-500">
                              {new Date(entry.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </time>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No archived entries yet. Check back soon!</p>
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 italic">
            "The past is never dead. It is not even past." - William Faulkner
          </p>
        </div>
      </div>
    </div>
  );
}
