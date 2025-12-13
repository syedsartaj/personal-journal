import Image from 'next/image'

export default function AuthorIntro() {
  return (
    <section className="bg-white border-2 border-brown/20 rounded-lg p-8 md:p-10 shadow-sm paper-texture">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        {/* Author Image */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-terracotta/30 overflow-hidden bg-sage/20">
            <div className="w-full h-full flex items-center justify-center text-6xl">
              ✍️
            </div>
          </div>
        </div>

        {/* Author Text */}
        <div className="flex-grow text-center md:text-left">
          <h2 className="font-handwritten text-4xl md:text-5xl text-brown mb-3">
            Hello, Friend
          </h2>

          <p className="text-lg text-charcoal/80 leading-relaxed mb-4">
            I'm Sarah, a writer, dreamer, and lover of quiet mornings. This journal is my
            sacred space where I share the messy, beautiful, and wonderfully ordinary moments
            of life.
          </p>

          <p className="text-charcoal/70 leading-relaxed mb-6">
            You'll find me reflecting on everything from the profound to the mundane - because
            I believe magic exists in both. I write about personal growth, mindful living, books
            that changed me, and the little things that make my heart full. Pull up a chair,
            grab some tea, and stay awhile.
          </p>

          {/* Tags/Interests */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="px-4 py-1.5 bg-terracotta/10 text-terracotta rounded-full text-sm font-medium">
              Slow Living
            </span>
            <span className="px-4 py-1.5 bg-terracotta/10 text-terracotta rounded-full text-sm font-medium">
              Books
            </span>
            <span className="px-4 py-1.5 bg-terracotta/10 text-terracotta rounded-full text-sm font-medium">
              Journaling
            </span>
            <span className="px-4 py-1.5 bg-terracotta/10 text-terracotta rounded-full text-sm font-medium">
              Nature
            </span>
            <span className="px-4 py-1.5 bg-terracotta/10 text-terracotta rounded-full text-sm font-medium">
              Mindfulness
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Quote */}
      <div className="mt-8 pt-8 border-t border-brown/20">
        <blockquote className="text-center">
          <p className="font-handwritten text-2xl text-brown/80 mb-2">
            "Write what should not be forgotten."
          </p>
          <footer className="text-sm text-charcoal/60 italic">
            - Isabel Allende
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
