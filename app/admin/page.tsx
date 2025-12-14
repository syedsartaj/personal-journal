'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Entry {
  _id: string
  slug: string
  title: string
  content: string
  mood: 'Happy' | 'Grateful' | 'Peaceful' | 'Excited' | 'Thoughtful' | 'Melancholy' | 'Anxious' | 'Hopeful'
  coverImage?: string
  date: Date
  tags: string[]
  private: boolean
  createdAt: Date
  updatedAt: Date
}

const moodConfig = {
  Happy: { emoji: '😊', color: 'bg-yellow-100 border-yellow-300 text-yellow-700' },
  Grateful: { emoji: '🙏', color: 'bg-pink-100 border-pink-300 text-pink-700' },
  Peaceful: { emoji: '😌', color: 'bg-blue-100 border-blue-300 text-blue-700' },
  Excited: { emoji: '🤩', color: 'bg-orange-100 border-orange-300 text-orange-700' },
  Thoughtful: { emoji: '🤔', color: 'bg-purple-100 border-purple-300 text-purple-700' },
  Melancholy: { emoji: '😔', color: 'bg-gray-100 border-gray-300 text-gray-700' },
  Anxious: { emoji: '😰', color: 'bg-red-100 border-red-300 text-red-700' },
  Hopeful: { emoji: '🌟', color: 'bg-green-100 border-green-300 text-green-700' },
}

export default function AdminPage() {
  const router = useRouter()
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [filter, setFilter] = useState<'all' | 'public' | 'private'>('all')

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/entries')
      const data = await response.json()
      setEntries(data.entries)
    } catch (error) {
      console.error('Error fetching entries:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/entries/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setEntries(entries.filter(entry => entry._id !== id))
      } else {
        alert('Failed to delete entry')
      }
    } catch (error) {
      console.error('Error deleting entry:', error)
      alert('Error deleting entry')
    }
  }

  const filteredEntries = entries.filter(entry => {
    if (filter === 'public') return !entry.private
    if (filter === 'private') return entry.private
    return true
  })

  const groupEntriesByMonth = () => {
    const grouped: { [key: string]: Entry[] } = {}
    filteredEntries.forEach(entry => {
      const date = new Date(entry.date)
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      if (!grouped[key]) {
        grouped[key] = []
      }
      grouped[key].push(entry)
    })
    return grouped
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatMonthYear = (key: string) => {
    const [year, month] = key.split('-')
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-amber-600 text-xl">Loading...</div>
      </div>
    )
  }

  const groupedEntries = viewMode === 'calendar' ? groupEntriesByMonth() : {}

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Journal Admin</h1>
          <p className="text-amber-700">Manage your personal journal entries</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Link
            href="/admin/entries/new"
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium text-center"
          >
            + New Entry
          </Link>

          <div className="flex gap-2 bg-white rounded-lg p-1 border border-amber-200">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-amber-600 text-white'
                  : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-amber-600 text-white'
                  : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              Calendar View
            </button>
          </div>

          <div className="flex gap-2 bg-white rounded-lg p-1 border border-amber-200">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md transition-colors ${
                filter === 'all'
                  ? 'bg-amber-600 text-white'
                  : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('public')}
              className={`px-4 py-2 rounded-md transition-colors ${
                filter === 'public'
                  ? 'bg-amber-600 text-white'
                  : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              Public
            </button>
            <button
              onClick={() => setFilter('private')}
              className={`px-4 py-2 rounded-md transition-colors ${
                filter === 'private'
                  ? 'bg-amber-600 text-white'
                  : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              Private
            </button>
          </div>
        </div>

        {filteredEntries.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center border border-amber-200">
            <div className="text-6xl mb-4">📔</div>
            <h2 className="text-2xl font-semibold text-amber-900 mb-2">No entries yet</h2>
            <p className="text-amber-700 mb-6">Start your journaling journey by creating your first entry</p>
            <Link
              href="/admin/entries/new"
              className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
            >
              Create First Entry
            </Link>
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <div
                key={entry._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-amber-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${moodConfig[entry.mood].color}`}>
                          {moodConfig[entry.mood].emoji} {entry.mood}
                        </span>
                        {entry.private && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-300">
                            🔒 Private
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-amber-900 mb-1">{entry.title}</h3>
                      <p className="text-sm text-amber-600">{formatDate(entry.date)}</p>
                    </div>
                  </div>

                  <p className="text-amber-800 mb-4 line-clamp-2">
                    {entry.content.substring(0, 200)}...
                  </p>

                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {entry.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 pt-4 border-t border-amber-100">
                    <Link
                      href={`/admin/entries/${entry._id}`}
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(entry._id, entry.title)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium border border-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {Object.keys(groupedEntries).sort().reverse().map((monthKey) => (
              <div key={monthKey} className="bg-white rounded-lg shadow-lg p-6 border border-amber-200">
                <h2 className="text-2xl font-bold text-amber-900 mb-6">{formatMonthYear(monthKey)}</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {groupedEntries[monthKey].map((entry) => (
                    <div
                      key={entry._id}
                      className="bg-amber-50 rounded-lg p-4 border border-amber-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{moodConfig[entry.mood].emoji}</span>
                        <span className="text-xs text-amber-600">
                          {new Date(entry.date).getDate()}
                        </span>
                      </div>
                      <h3 className="font-semibold text-amber-900 mb-2 line-clamp-1">{entry.title}</h3>
                      <p className="text-sm text-amber-700 mb-3 line-clamp-2">{entry.content}</p>
                      {entry.private && (
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs mb-2">
                          🔒 Private
                        </span>
                      )}
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/entries/${entry._id}`}
                          className="flex-1 text-center px-3 py-1 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors text-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(entry._id, entry.title)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
