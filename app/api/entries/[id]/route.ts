import { NextRequest, NextResponse } from 'next/server'
import { getEntryById, updateEntry, deleteEntry } from '@/lib/db'

// GET single entry by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const entry = await getEntryById(params.id)

    if (!entry) {
      return NextResponse.json(
        { error: 'Entry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ entry })
  } catch (error) {
    console.error('Error fetching entry:', error)
    return NextResponse.json(
      { error: 'Failed to fetch entry' },
      { status: 500 }
    )
  }
}

// PUT update entry
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, content, mood, coverImage, date, tags, private: isPrivate, slug } = body

    // Validate mood if provided
    if (mood) {
      const validMoods = ['Happy', 'Grateful', 'Peaceful', 'Excited', 'Thoughtful', 'Melancholy', 'Anxious', 'Hopeful']
      if (!validMoods.includes(mood)) {
        return NextResponse.json(
          { error: 'Invalid mood. Must be one of: ' + validMoods.join(', ') },
          { status: 400 }
        )
      }
    }

    const updates: any = {}
    if (title !== undefined) updates.title = title
    if (content !== undefined) updates.content = content
    if (mood !== undefined) updates.mood = mood
    if (coverImage !== undefined) updates.coverImage = coverImage
    if (date !== undefined) updates.date = new Date(date)
    if (tags !== undefined) updates.tags = tags
    if (isPrivate !== undefined) updates.private = isPrivate
    if (slug !== undefined) updates.slug = slug

    const result = await updateEntry(params.id, updates)

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Entry not found' },
        { status: 404 }
      )
    }

    const updatedEntry = await getEntryById(params.id)
    return NextResponse.json({ entry: updatedEntry })
  } catch (error) {
    console.error('Error updating entry:', error)
    return NextResponse.json(
      { error: 'Failed to update entry' },
      { status: 500 }
    )
  }
}

// DELETE entry
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await deleteEntry(params.id)

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Entry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Entry deleted successfully' })
  } catch (error) {
    console.error('Error deleting entry:', error)
    return NextResponse.json(
      { error: 'Failed to delete entry' },
      { status: 500 }
    )
  }
}
