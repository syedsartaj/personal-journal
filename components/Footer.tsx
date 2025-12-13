import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t-2 border-brown/20 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="font-handwritten text-3xl text-brown mb-4">
              About This Space
            </h3>
            <p className="text-charcoal/80 leading-relaxed mb-4">
              Welcome to my little corner of the internet. This is where I share my thoughts,
              experiences, and the small moments that make life beautiful. I believe in the power
              of vulnerability, the magic of everyday moments, and the healing nature of putting
              pen to paper (or fingers to keyboard).
            </p>
            <p className="text-charcoal/80 leading-relaxed">
              This journal is a space for reflection, growth, and authentic connection.
              Thank you for being here and sharing in this journey with me.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-handwritten text-2xl text-brown mb-4">
              Explore
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-charcoal/80 hover:text-terracotta transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-charcoal/80 hover:text-terracotta transition-colors duration-300"
              >
                About Me
              </Link>
              <Link
                href="/archive"
                className="text-charcoal/80 hover:text-terracotta transition-colors duration-300"
              >
                Archive
              </Link>
              <Link
                href="/thoughts"
                className="text-charcoal/80 hover:text-terracotta transition-colors duration-300"
              >
                Random Thoughts
              </Link>
              <Link
                href="/contact"
                className="text-charcoal/80 hover:text-terracotta transition-colors duration-300"
              >
                Get in Touch
              </Link>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="decorative-line my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-charcoal/60 text-sm">
            {currentYear} Dear Diary. Written with love and coffee.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal/60 hover:text-terracotta transition-colors duration-300"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal/60 hover:text-terracotta transition-colors duration-300"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
              </svg>
            </a>
            <a
              href="/rss"
              className="text-charcoal/60 hover:text-terracotta transition-colors duration-300"
              aria-label="RSS Feed"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-12.832 20c-1.197 0-2.168-.969-2.168-2.165s.971-2.165 2.168-2.165 2.167.969 2.167 2.165-.97 2.165-2.167 2.165zm5.18 0c-.041-4.029-3.314-7.298-7.348-7.339v-3.207c5.814.041 10.518 4.739 10.561 10.546h-3.213zm5.441 0c-.021-7.063-5.736-12.761-12.789-12.792v-3.208c8.83.031 15.98 7.179 16 16h-3.211z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Handwritten Note */}
        <div className="mt-8 text-center">
          <p className="font-handwritten text-2xl text-brown/60">
            Thank you for reading
          </p>
        </div>
      </div>
    </footer>
  )
}
