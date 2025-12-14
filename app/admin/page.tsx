'use client'

import { useState, useEffect } from 'react'
import {
  Plus,
  Edit,
  Trash2,
  Search,
  BookOpen,
  Smile,
  Frown,
  Meh,
  Heart,
  Zap,
  Cloud,
  Eye,
  EyeOff,
  X,
  Save,
  Image as ImageIcon,
  Calendar,
  MapPin,
  Tag
} from 'lucide-react'

interface Entry {
  _id?: string
  title: string
  content: string
  mood: 'happy' | 'sad' | 'excited' | 'anxious' | 'peaceful' | 'grateful' | 'reflective' | 'motivated'
  date: string
  weather?: string
  location?: string
  featuredImage?: string
  isPrivate: boolean
  published: boolean
  tags: string[]
}

interface Toast {
  id: number
  message: string
  type: 'success' | 'error'
}

const moodConfig = {
  happy: { icon: Smile, color: 'bg-yellow-100 border-yellow-300 text-yellow-700', label: 'Happy' },
  sad: { icon: Frown, color: 'bg-blue-100 border-blue-300 text-blue-700', label: 'Sad' },
  excited: { icon: Zap, color: 'bg-orange-100 border-orange-300 text-orange-700', label: 'Excited' },
  anxious: { icon: Cloud, color: 'bg-gray-100 border-gray-300 text-gray-700', label: 'Anxious' },
  peaceful: { icon: Heart, color: 'bg-green-100 border-green-300 text-green-700', label: 'Peaceful' },
  grateful: { icon: Heart, color: 'bg-pink-100 border-pink-300 text-pink-700', label: 'Grateful' },
  reflective: { icon: Meh, color: 'bg-purple-100 border-purple-300 text-purple-700', label: 'Reflective' },
  motivated: { icon: Zap, color: 'bg-red-100 border-red-300 text-red-700', label: 'Motivated' },
}

export default function AdminDashboard() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [tagInput, setTagInput] = useState('')

  // Form state
  const [formData, setFormData] = useState<Entry>({
    title: '',
    content: '',
    mood: 'peaceful',
    date: new Date().toISOString().split('T')[0],
    weather: '',
    location: '',
    featuredImage: '',
    isPrivate: false,
    published: true,
    tags: []
  })

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/entries')
      const data = await response.json()
      setEntries(data.entries || [])
    } catch (error) {
      showToast('Error fetching entries', 'error')
      console.error('Error fetching entries:', error)
    } finally {
      setLoading(false)
    }
  }

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      mood: 'peaceful',
      date: new Date().toISOString().split('T')[0],
      weather: '',
      location: '',
      featuredImage: '',
      isPrivate: false,
      published: true,
      tags: []
    })
    setTagInput('')
    setEditingEntry(null)
    setShowForm(false)
  }

  const handleCreateClick = () => {
    resetForm()
    setShowForm(true)
  }

  const handleEditClick = (entry: Entry) => {
    setEditingEntry(entry)
    setFormData({
      title: entry.title,
      content: entry.content,
      mood: entry.mood,
      date: entry.date,
      weather: entry.weather || '',
      location: entry.location || '',
      featuredImage: entry.featuredImage || '',
      isPrivate: entry.isPrivate,
      published: entry.published,
      tags: entry.tags
    })
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingEntry ? `/api/entries/${editingEntry._id}` : '/api/entries'
      const method = editingEntry ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        showToast(
          editingEntry ? 'Entry updated successfully!' : 'Entry created successfully!',
          'success'
        )
        await fetchEntries()
        resetForm()
      } else {
        const error = await response.json()
        showToast(error.error || 'Operation failed', 'error')
      }
    } catch (error) {
      showToast('An error occurred', 'error')
      console.error('Error:', error)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/entries/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        showToast('Entry deleted successfully!', 'success')
        await fetchEntries()
      } else {
        showToast('Failed to delete entry', 'error')
      }
    } catch (error) {
      showToast('An error occurred while deleting', 'error')
      console.error('Error deleting entry:', error)
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const stats = {
    total: entries.length,
    published: entries.filter(e => e.published).length,
    draft: entries.filter(e => !e.published).length,
    private: entries.filter(e => e.isPrivate).length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center">
        <div className="text-amber-600 text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-6 py-3 rounded-lg shadow-lg ${
              toast.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            } animate-slide-in`}
          >
            {toast.message}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-10 h-10 text-amber-600" />
            <h1 className="text-4xl font-bold text-amber-900">Journal Dashboard</h1>
          </div>
          <p className="text-amber-700">Manage all your journal entries from one place</p>
        </div>

        {/* Actions Section */}
        <div className="mb-8 bg-white rounded-lg shadow-md border border-amber-200 p-6">
          <h2 className="text-xl font-semibold text-amber-900 mb-4">Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCreateClick}
              className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Create Entry
            </button>
            <button
              onClick={() => {
                if (entries.length === 0) {
                  showToast('No entries to edit', 'error')
                } else {
                  showToast('Select an entry below to edit', 'success')
                }
              }}
              className="flex items-center gap-2 bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors font-medium"
            >
              <Edit className="w-5 h-5" />
              Edit Entry
            </button>
            <button
              onClick={() => {
                if (entries.length === 0) {
                  showToast('No entries to delete', 'error')
                } else {
                  showToast('Click delete on any entry below', 'success')
                }
              }}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              <Trash2 className="w-5 h-5" />
              Delete Entry
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md border border-amber-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 text-sm font-medium">Total Entries</p>
                <p className="text-3xl font-bold text-amber-900">{stats.total}</p>
              </div>
              <BookOpen className="w-10 h-10 text-amber-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md border border-green-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Published</p>
                <p className="text-3xl font-bold text-green-900">{stats.published}</p>
              </div>
              <Eye className="w-10 h-10 text-green-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md border border-blue-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Drafts</p>
                <p className="text-3xl font-bold text-blue-900">{stats.draft}</p>
              </div>
              <Edit className="w-10 h-10 text-blue-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md border border-purple-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Private</p>
                <p className="text-3xl font-bold text-purple-900">{stats.private}</p>
              </div>
              <EyeOff className="w-10 h-10 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Inline Create/Edit Form */}
        {showForm && (
          <div className="mb-8 bg-white rounded-lg shadow-lg border-2 border-amber-300 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-amber-900">
                {editingEntry ? 'Edit Entry' : 'Create New Entry'}
              </h2>
              <button
                onClick={resetForm}
                className="text-amber-600 hover:text-amber-800"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="What's on your mind?"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Content *
                </label>
                <textarea
                  required
                  rows={8}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Write your thoughts..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mood */}
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">
                    Mood *
                  </label>
                  <select
                    value={formData.mood}
                    onChange={(e) => setFormData({ ...formData, mood: e.target.value as Entry['mood'] })}
                    className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    {Object.entries(moodConfig).map(([key, config]) => (
                      <option key={key} value={key}>
                        {config.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                {/* Weather */}
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">
                    Weather
                  </label>
                  <input
                    type="text"
                    value={formData.weather}
                    onChange={(e) => setFormData({ ...formData, weather: e.target.value })}
                    className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="e.g., Sunny, Rainy"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Where are you?"
                  />
                </div>
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  <ImageIcon className="w-4 h-4 inline mr-1" />
                  Featured Image URL
                </label>
                <input
                  type="url"
                  value={formData.featuredImage}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  <Tag className="w-4 h-4 inline mr-1" />
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Add a tag..."
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm flex items-center gap-2"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-amber-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                  />
                  <span className="text-sm font-medium text-amber-900">Published</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPrivate}
                    onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
                    className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                  />
                  <span className="text-sm font-medium text-amber-900">Private</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4 border-t border-amber-200">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
                >
                  <Save className="w-5 h-5" />
                  {editingEntry ? 'Update Entry' : 'Create Entry'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search entries by title, content, or tags..."
              className="w-full pl-12 pr-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        {/* Entries List */}
        <div className="bg-white rounded-lg shadow-md border border-amber-200 overflow-hidden">
          <div className="px-6 py-4 bg-amber-50 border-b border-amber-200">
            <h2 className="text-xl font-semibold text-amber-900">
              All Entries ({filteredEntries.length})
            </h2>
          </div>

          {filteredEntries.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-amber-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                {searchQuery ? 'No entries found' : 'No entries yet'}
              </h3>
              <p className="text-amber-700 mb-6">
                {searchQuery
                  ? 'Try adjusting your search terms'
                  : 'Start your journaling journey by creating your first entry'}
              </p>
              {!searchQuery && (
                <button
                  onClick={handleCreateClick}
                  className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Create First Entry
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-amber-100">
              {filteredEntries.map((entry) => {
                const MoodIcon = moodConfig[entry.mood].icon
                return (
                  <div
                    key={entry._id}
                    className="p-6 hover:bg-amber-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-2 ${moodConfig[entry.mood].color}`}>
                            <MoodIcon className="w-4 h-4" />
                            {moodConfig[entry.mood].label}
                          </span>
                          {entry.isPrivate && (
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium border border-purple-300 flex items-center gap-1">
                              <EyeOff className="w-4 h-4" />
                              Private
                            </span>
                          )}
                          {!entry.published && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-300">
                              Draft
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-semibold text-amber-900 mb-2">
                          {entry.title}
                        </h3>

                        <p className="text-amber-800 mb-3 line-clamp-2">
                          {entry.content}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-amber-600 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(entry.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                          {entry.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {entry.location}
                            </span>
                          )}
                          {entry.weather && (
                            <span>Weather: {entry.weather}</span>
                          )}
                        </div>

                        {entry.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
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
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleEditClick(entry)}
                          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium whitespace-nowrap"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(entry._id!, entry.title)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium border border-red-300 whitespace-nowrap"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
