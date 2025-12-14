'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import EntryForm from '@/components/EntryForm'

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

export default function EditEntryPage() {
  const params = useParams()
  const [entry, setEntry] = useState<Entry | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await fetch(`/api/entries/${params.id}`)
        if (!response.ok) {
          throw new Error('Entry not found')
        }
        const data = await response.json()
        setEntry(data.entry)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load entry')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchEntry()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-amber-600 text-xl">Loading...</div>
      </div>
    )
  }

  if (error || !entry) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-red-200">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-red-700">{error || 'Entry not found'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Edit Entry</h1>
          <p className="text-amber-700">Update your journal entry</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 border border-amber-200">
          <EntryForm entry={entry} isEdit={true} />
        </div>
      </div>
    </div>
  )
}
