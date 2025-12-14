import { NextRequest, NextResponse } from 'next/server'
import { getAllEntries, createEntry } from '@/lib/db'

// GET all entries (for admin)
export async function GET(request: NextRequest) {
  try {
    const entries = await getAllEntries()
    return NextResponse.json({ entries })
  } catch (error) {
    console.error('Error fetching entries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch entries' },
      { status: 500 }
    )
  }
}

// POST create new entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, mood, coverImage, date, tags, private: isPrivate, slug } = body

    // Validate required fields
    if (!title || !content || !mood || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, mood, and slug are required' },
        { status: 400 }
      )
    }

    // Validate mood
    const validMoods = ['Happy', 'Grateful', 'Peaceful', 'Excited', 'Thoughtful', 'Melancholy', 'Anxious', 'Hopeful']
    if (!validMoods.includes(mood)) {
      return NextResponse.json(
        { error: 'Invalid mood. Must be one of: ' + validMoods.join(', ') },
        { status: 400 }
      )
    }

    const entry = await createEntry({
      title,
      content,
      mood,
      coverImage: coverImage || '',
      date: date ? new Date(date) : new Date(),
      tags: tags || [],
      private: isPrivate || false,
      slug
    })

    return NextResponse.json({ entry }, { status: 201 })
  } catch (error) {
    console.error('Error creating entry:', error)
    return NextResponse.json(
      { error: 'Failed to create entry' },
      { status: 500 }
    )
  }
}
