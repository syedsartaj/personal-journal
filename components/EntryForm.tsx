'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface Entry {
  _id?: string
  slug: string
  title: string
  content: string
  mood: 'Happy' | 'Grateful' | 'Peaceful' | 'Excited' | 'Thoughtful' | 'Melancholy' | 'Anxious' | 'Hopeful'
  coverImage?: string
  date: Date
  tags: string[]
  private: boolean
}

interface EntryFormProps {
  entry?: Entry
  isEdit?: boolean
}

const moods = [
  { value: 'Happy', emoji: '😊', color: 'bg-yellow-100 border-yellow-300 text-yellow-700' },
  { value: 'Grateful', emoji: '🙏', color: 'bg-pink-100 border-pink-300 text-pink-700' },
  { value: 'Peaceful', emoji: '😌', color: 'bg-blue-100 border-blue-300 text-blue-700' },
  { value: 'Excited', emoji: '🤩', color: 'bg-orange-100 border-orange-300 text-orange-700' },
  { value: 'Thoughtful', emoji: '🤔', color: 'bg-purple-100 border-purple-300 text-purple-700' },
  { value: 'Melancholy', emoji: '😔', color: 'bg-gray-100 border-gray-300 text-gray-700' },
  { value: 'Anxious', emoji: '😰', color: 'bg-red-100 border-red-300 text-red-700' },
  { value: 'Hopeful', emoji: '🌟', color: 'bg-green-100 border-green-300 text-green-700' },
] as const

export default function EntryForm({ entry, isEdit = false }: EntryFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    title: entry?.title || '',
    content: entry?.content || '',
    mood: entry?.mood || 'Thoughtful' as const,
    coverImage: entry?.coverImage || '',
    date: entry?.date ? new Date(entry.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    tags: entry?.tags?.join(', ') || '',
    private: entry?.private || false,
    slug: entry?.slug || ''
  })

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: isEdit ? prev.slug : generateSlug(title)
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const payload = {
        title: formData.title,
        content: formData.content,
        mood: formData.mood,
        coverImage: formData.coverImage,
        date: formData.date,
        tags: tagsArray,
        private: formData.private,
        slug: formData.slug
      }

      const url = isEdit ? `/api/entries/${entry?._id}` : '/api/entries'
      const method = isEdit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save entry')
      }

      router.push('/admin')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-amber-900 mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          required
          value={formData.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="What's on your mind?"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-amber-900 mb-2">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          required
          value={formData.slug}
          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
          className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="entry-slug"
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-amber-900 mb-2">
          Date
        </label>
        <input
          type="date"
          id="date"
          required
          value={formData.date}
          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
          className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-900 mb-3">
          How are you feeling?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {moods.map((mood) => (
            <button
              key={mood.value}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, mood: mood.value }))}
              className={`p-3 border-2 rounded-lg transition-all ${
                formData.mood === mood.value
                  ? mood.color + ' ring-2 ring-offset-2 ring-amber-400'
                  : 'bg-white border-gray-200 hover:border-amber-300'
              }`}
            >
              <div className="text-2xl mb-1">{mood.emoji}</div>
              <div className="text-sm font-medium">{mood.value}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-amber-900 mb-2">
          Content
        </label>
        <textarea
          id="content"
          required
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          rows={12}
          className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Write your thoughts..."
        />
      </div>

      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium text-amber-900 mb-2">
          Cover Image URL (optional)
        </label>
        <input
          type="url"
          id="coverImage"
          value={formData.coverImage}
          onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
          className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-amber-900 mb-2">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
          className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="reflection, gratitude, personal growth"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="private"
          checked={formData.private}
          onChange={(e) => setFormData(prev => ({ ...prev, private: e.target.checked }))}
          className="w-4 h-4 text-amber-600 border-amber-300 rounded focus:ring-amber-500"
        />
        <label htmlFor="private" className="ml-2 text-sm text-amber-900">
          Keep this entry private
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? 'Saving...' : isEdit ? 'Update Entry' : 'Create Entry'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
