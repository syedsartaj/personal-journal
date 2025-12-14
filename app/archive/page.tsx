import Link from 'next/link';

const archiveByYear: Record<string, { month: string; entries: { slug: string; title: string; date: string; }[] }[]> = {
  '2024': [
    {
      month: 'November',
      entries: [
        { slug: 'autumn-reflections', title: 'Autumn Reflections', date: '2024-11-15' },
        { slug: 'coffee-shop-moments', title: 'Coffee Shop Moments', date: '2024-11-10' },
        { slug: 'on-creativity', title: 'On Creativity and Fear', date: '2024-11-05' },
      ]
    },
    {
      month: 'October',
      entries: [
        { slug: 'rainy-sunday', title: 'A Rainy Sunday', date: '2024-10-28' },
        { slug: 'conversations-with-strangers', title: 'Conversations with Strangers', date: '2024-10-20' },
        { slug: 'midnight-thoughts', title: 'Midnight Thoughts', date: '2024-10-12' },
      ]
    },
    {
      month: 'March',
      entries: [
        { slug: 'finding-peace-morning-rituals', title: 'Finding Peace in Morning Rituals', date: '2024-03-15' },
        { slug: 'letter-to-younger-self', title: 'A Letter to My Younger Self', date: '2024-03-10' },
        { slug: 'art-of-slow-living', title: 'The Art of Slow Living', date: '2024-03-05' },
      ]
    },
    {
      month: 'February',
      entries: [
        { slug: 'gratitude-in-ordinary', title: 'Gratitude in the Ordinary', date: '2024-02-28' },
        { slug: 'growing-through-seasons', title: 'Growing Through the Seasons', date: '2024-02-20' },
        { slug: 'coffee-shop-conversations', title: 'Coffee Shop Conversations', date: '2024-02-12' },
      ]
    }
  ],
  '2023': [
    {
      month: 'December',
      entries: [
        { slug: 'year-end-reflections', title: 'Year-End Reflections', date: '2023-12-28' },
        { slug: 'winter-solstice-thoughts', title: 'Winter Solstice Thoughts', date: '2023-12-21' },
      ]
    },
    {
      month: 'November',
      entries: [
        { slug: 'thankful-heart', title: 'A Thankful Heart', date: '2023-11-23' },
        { slug: 'autumn-walks', title: 'Autumn Walks', date: '2023-11-10' },
      ]
    }
  ]
};

export default function ArchivePage() {
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
          {Object.entries(archiveByYear).map(([year, months]) => (
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
          ))}
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
