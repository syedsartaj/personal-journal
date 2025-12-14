import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#faf8f5' }}>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-4" style={{ color: '#c67b5c' }}>
            About Me
          </h1>
          <p className="text-lg text-gray-600 font-light">
            The person behind the words
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-1">
            <div
              className="aspect-square rounded-lg overflow-hidden mb-4"
              style={{ backgroundColor: '#f0e8e0' }}
            >
              {/* Replace with actual image */}
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  className="w-32 h-32"
                  style={{ color: '#c67b5c', opacity: 0.3 }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 italic text-center">
              Photo of me contemplating life over coffee
            </p>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-serif mb-4" style={{ color: '#c67b5c' }}>
                Hello, I am [Your Name]
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  I am a collector of moments, a seeker of meaning in the mundane, and someone who believes
                  that the ordinary holds extraordinary beauty when we pause long enough to notice it.
                </p>
                <p>
                  This journal started as a way to process my thoughts, but it has become something more - a
                  practice of paying attention. To the changing seasons, to conversations with strangers, to
                  the way light falls through windows on Sunday afternoons. To life, in all its messy, beautiful
                  complexity.
                </p>
                <p>
                  By day, I [your profession/what you do]. But in the quiet hours, I write. Not because I have
                  all the answers, but because I am learning to love the questions. I am figuring out who I am,
                  what I believe, and how to live with more intention and less noise.
                </p>
                <p>
                  If you are someone who also finds yourself thinking too much, feeling too deeply, or
                  questioning everything - welcome. You have found your people.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-lg" style={{ backgroundColor: '#f0e8e0' }}>
            <h3 className="text-xl font-serif mb-4" style={{ color: '#c67b5c' }}>
              Things I Love
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2" style={{ color: '#c67b5c' }}>•</span>
                <span>Early morning walks before the world wakes up</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2" style={{ color: '#c67b5c' }}>•</span>
                <span>Books that change the way I see things</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2" style={{ color: '#c67b5c' }}>•</span>
                <span>Conversations that go deeper than small talk</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2" style={{ color: '#c67b5c' }}>•</span>
                <span>The smell of coffee and old bookstores</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2" style={{ color: '#c67b5c' }}>•</span>
                <span>Rainy days spent doing absolutely nothing</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2" style={{ color: '#c67b5c' }}>•</span>
                <span>Finding beauty in unexpected places</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2" style={{ color: '#c67b5c' }}>•</span>
                <span>People who are unapologetically themselves</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-lg" style={{ backgroundColor: '#f0e8e0' }}>
            <h3 className="text-xl font-serif mb-4" style={{ color: '#c67b5c' }}>
              Currently
            </h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-medium mb-1">Reading:</p>
                <p className="text-sm italic">The Art of Noticing by Rob Walker</p>
              </div>
              <div>
                <p className="font-medium mb-1">Learning:</p>
                <p className="text-sm">To be more present and less anxious about the future</p>
              </div>
              <div>
                <p className="font-medium mb-1">Exploring:</p>
                <p className="text-sm">Watercolor painting and the beauty of imperfection</p>
              </div>
              <div>
                <p className="font-medium mb-1">Thinking about:</p>
                <p className="text-sm">What it means to live authentically in a curated world</p>
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none mb-16">
          <h2 className="text-2xl font-serif mb-6" style={{ color: '#c67b5c' }}>
            Why I Write
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              Writing is how I make sense of the world. It is how I process emotions, work through confusion,
              and discover what I actually think about things. Often, I do not know what I believe until I
              write it down and see it staring back at me.
            </p>
            <p>
              This journal is not about presenting a polished version of myself or offering wisdom I do not
              have. It is about showing up honestly, even when - especially when - I am still figuring things
              out. It is about creating space for the messy middle, for the questions without answers, for
              the ordinary moments that turn out to be extraordinary.
            </p>
            <p>
              If my words resonate with you, if they make you feel less alone in your own journey, then this
              journal has served its purpose. We are all just walking each other home, as Ram Dass said. And
              sometimes, sharing our stories is how we light the way.
            </p>
          </div>
        </div>

        <div className="text-center p-8 rounded-lg" style={{ backgroundColor: '#c67b5c' }}>
          <h3 className="text-2xl font-serif mb-4 text-white">
            Let us Connect
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            I love hearing from readers. Whether you want to share your own story, continue a conversation
            I started in a journal entry, or just say hello - I am here for it.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 rounded-lg font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: '#faf8f5', color: '#c67b5c' }}
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
