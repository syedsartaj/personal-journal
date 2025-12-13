'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf8f5' }}>
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-4" style={{ color: '#c67b5c' }}>
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 font-light">
            I would love to hear from you
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-serif mb-4" style={{ color: '#c67b5c' }}>
                Let us Connect
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Whether you want to share your thoughts on something I wrote, tell me your own story,
                or just say hello - I am here for all of it. Meaningful conversations are my favorite
                kind of conversations.
              </p>
              <p className="text-gray-700 leading-relaxed">
                I read every message I receive, and I do my best to respond to each one thoughtfully.
                Sometimes it takes me a little while, but I promise your words will not go unnoticed.
              </p>
            </div>

            <div className="p-6 rounded-lg" style={{ backgroundColor: '#f0e8e0' }}>
              <h3 className="text-lg font-serif mb-3" style={{ color: '#c67b5c' }}>
                Other Ways to Connect
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-center">
                  <span className="mr-2" style={{ color: '#c67b5c' }}>✉</span>
                  <span>hello@yourjournal.com</span>
                </p>
                <p className="flex items-center">
                  <span className="mr-2" style={{ color: '#c67b5c' }}>✦</span>
                  <span>Instagram: @yourjournal</span>
                </p>
                <p className="flex items-center">
                  <span className="mr-2" style={{ color: '#c67b5c' }}>✦</span>
                  <span>Twitter: @yourjournal</span>
                </p>
              </div>
            </div>

            <div className="p-6 rounded-lg border-l-4" style={{
              backgroundColor: '#faf8f5',
              borderColor: '#c67b5c'
            }}>
              <p className="text-sm text-gray-600 italic">
                "Connection is why we are here; it is what gives purpose and meaning to our lives."
                <span className="block mt-2 not-italic">- Brené Brown</span>
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            {submitted ? (
              <div
                className="p-8 rounded-lg text-center"
                style={{ backgroundColor: '#f0e8e0' }}
              >
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#c67b5c' }}
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif mb-2" style={{ color: '#c67b5c' }}>
                  Message Sent!
                </h3>
                <p className="text-gray-700">
                  Thank you for reaching out. I will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                    style={{ color: '#c67b5c' }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                    style={{
                      backgroundColor: '#faf8f5',
                      borderColor: '#f0e8e0',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#c67b5c'}
                    onBlur={(e) => e.target.style.borderColor = '#f0e8e0'}
                    placeholder="What should I call you?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: '#c67b5c' }}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                    style={{
                      backgroundColor: '#faf8f5',
                      borderColor: '#f0e8e0',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#c67b5c'}
                    onBlur={(e) => e.target.style.borderColor = '#f0e8e0'}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                    style={{ color: '#c67b5c' }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                    style={{
                      backgroundColor: '#faf8f5',
                      borderColor: '#f0e8e0',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#c67b5c'}
                    onBlur={(e) => e.target.style.borderColor = '#f0e8e0'}
                    placeholder="What is on your mind?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                    style={{ color: '#c67b5c' }}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={8}
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-100 transition-colors resize-none"
                    style={{
                      backgroundColor: '#faf8f5',
                      borderColor: '#f0e8e0',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#c67b5c'}
                    onBlur={(e) => e.target.style.borderColor = '#f0e8e0'}
                    placeholder="Share your thoughts, questions, or just say hello..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 rounded-lg font-medium transition-all hover:opacity-90 hover:shadow-lg"
                  style={{
                    backgroundColor: '#c67b5c',
                    color: '#faf8f5'
                  }}
                >
                  Send Message
                </button>

                <p className="text-sm text-gray-500 text-center">
                  I typically respond within 2-3 business days
                </p>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 italic max-w-2xl mx-auto">
            "The most important thing in communication is hearing what is not said." - Peter Drucker
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
