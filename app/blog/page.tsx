import Link from 'next/link';

// Sample journal entries - replace with your actual data source
const journalEntries = [
  {
    slug: 'autumn-reflections',
    title: 'Autumn Reflections',
    date: '2024-11-15',
    mood: 'Contemplative',
    excerpt: 'The leaves are falling, and I find myself thinking about change and letting go. There is something beautiful about how nature embraces transformation...',
    tags: ['life', 'nature', 'reflection']
  },
  {
    slug: 'coffee-shop-moments',
    title: 'Coffee Shop Moments',
    date: '2024-11-10',
    mood: 'Content',
    excerpt: 'Today I spent three hours at my favorite corner cafe, just watching the world go by. Sometimes the best moments are the quiet ones...',
    tags: ['daily life', 'moments', 'gratitude']
  },
  {
    slug: 'on-creativity',
    title: 'On Creativity and Fear',
    date: '2024-11-05',
    mood: 'Inspired',
    excerpt: 'I have been thinking a lot about what holds us back from creating. Is it fear of judgment? Fear of imperfection? Today I decided to let go...',
    tags: ['creativity', 'personal growth', 'thoughts']
  },
  {
    slug: 'rainy-sunday',
    title: 'A Rainy Sunday',
    date: '2024-10-28',
    mood: 'Peaceful',
    excerpt: 'Rain tapping on the windows, a warm blanket, and a good book. Some days do not need to be productive to be meaningful...',
    tags: ['weekend', 'self-care', 'simple pleasures']
  },
  {
    slug: 'conversations-with-strangers',
    title: 'Conversations with Strangers',
    date: '2024-10-20',
    mood: 'Curious',
    excerpt: 'Had the most unexpected conversation with someone at the bus stop today. It reminded me that everyone has a story worth hearing...',
    tags: ['people', 'connection', 'life lessons']
  },
  {
    slug: 'midnight-thoughts',
    title: 'Midnight Thoughts',
    date: '2024-10-12',
    mood: 'Introspective',
    excerpt: 'It is 2 AM and sleep evades me. My mind wanders through memories and dreams, weaving them together in ways that only the quiet hours allow...',
    tags: ['thoughts', 'night', 'reflection']
  }
];

export default function BlogPage() {
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
          {journalEntries.map((entry) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
