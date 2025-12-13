import AuthorIntro from '@/components/AuthorIntro'
import BlogCard from '@/components/BlogCard'

// Mock blog entries
const mockEntries = [
  {
    id: '1',
    title: 'Finding Peace in Morning Rituals',
    excerpt: 'There\'s something magical about those quiet moments before the world wakes up. Just me, my coffee, and the soft glow of sunrise...',
    date: '2024-03-15',
    category: 'Reflections',
    readTime: '3 min read'
  },
  {
    id: '2',
    title: 'A Letter to My Younger Self',
    excerpt: 'If I could go back and whisper wisdom to the person I was ten years ago, I\'d start with this: it\'s okay to not have everything figured out...',
    date: '2024-03-10',
    category: 'Personal Growth',
    readTime: '5 min read'
  },
  {
    id: '3',
    title: 'The Art of Slow Living',
    excerpt: 'In a world that glorifies busy, I\'m learning to embrace the beauty of doing less. Today I spent an hour just watching the rain...',
    date: '2024-03-05',
    category: 'Lifestyle',
    readTime: '4 min read'
  },
  {
    id: '4',
    title: 'Gratitude in the Ordinary',
    excerpt: 'Sometimes the most profound moments hide in the mundane. The smell of fresh bread, a smile from a stranger, the weight of a good book...',
    date: '2024-02-28',
    category: 'Reflections',
    readTime: '3 min read'
  },
  {
    id: '5',
    title: 'Growing Through the Seasons',
    excerpt: 'Just like the garden outside my window, I\'m learning that growth isn\'t always visible. Sometimes we grow roots before we bloom...',
    date: '2024-02-20',
    category: 'Personal Growth',
    readTime: '6 min read'
  },
  {
    id: '6',
    title: 'Coffee Shop Conversations',
    excerpt: 'Met an elderly woman at my favorite coffee shop today. She told me stories about her travels, and I remembered why human connection matters...',
    date: '2024-02-12',
    category: 'Stories',
    readTime: '4 min read'
  }
]

export default function Home() {
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
          {mockEntries.map((entry) => (
            <BlogCard key={entry.id} entry={entry} />
          ))}
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
