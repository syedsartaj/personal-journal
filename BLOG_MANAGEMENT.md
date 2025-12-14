# Blog Management System Documentation

A complete blog management system for the Personal Journal template with mood tracking, entry management, and a beautiful admin interface.

## Overview

This blog management system provides a full-featured content management solution for personal journal entries, including:

- Full CRUD operations (Create, Read, Update, Delete)
- Mood tracking with 8 different moods
- Public/Private entry visibility
- Tag system for organizing entries
- Calendar and list view modes
- Cover image support
- Beautiful warm, cozy theme with amber/orange accents

## Table of Contents

1. [Architecture](#architecture)
2. [Database Schema](#database-schema)
3. [API Endpoints](#api-endpoints)
4. [Components](#components)
5. [Admin Interface](#admin-interface)
6. [Setup Instructions](#setup-instructions)
7. [Usage Guide](#usage-guide)
8. [Customization](#customization)

## Architecture

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Language**: TypeScript

### File Structure

```
personal-journal/
├── lib/
│   └── db.ts                          # Database connection and CRUD functions
├── app/
│   ├── api/
│   │   └── entries/
│   │       ├── route.ts               # GET all, POST create
│   │       └── [id]/
│   │           └── route.ts           # GET, PUT, DELETE single entry
│   └── admin/
│       ├── page.tsx                   # Admin dashboard
│       └── entries/
│           ├── new/
│           │   └── page.tsx           # Create new entry
│           └── [id]/
│               └── page.tsx           # Edit entry
├── components/
│   └── EntryForm.tsx                  # Reusable form component
└── .env.example                       # Environment variables template
```

## Database Schema

### Entry Interface

```typescript
interface Entry {
  _id?: string                         // MongoDB ObjectId (auto-generated)
  slug: string                         // URL-friendly identifier
  title: string                        // Entry title
  content: string                      // Main entry content
  mood: 'Happy' | 'Grateful' | 'Peaceful' | 'Excited' | 'Thoughtful' | 'Melancholy' | 'Anxious' | 'Hopeful'
  coverImage?: string                  // Optional cover image URL
  date: Date                           // Entry date
  tags: string[]                       // Array of tags
  private: boolean                     // Visibility flag
  createdAt: Date                      // Auto-generated timestamp
  updatedAt: Date                      // Auto-updated timestamp
}
```

### Collection Name

- Collection: `blog_entries`
- Database: `personal-journal`

### Moods

The system supports 8 different moods, each with its own emoji and color scheme:

| Mood        | Emoji | Color Scheme |
|-------------|-------|--------------|
| Happy       | 😊    | Yellow       |
| Grateful    | 🙏    | Pink         |
| Peaceful    | 😌    | Blue         |
| Excited     | 🤩    | Orange       |
| Thoughtful  | 🤔    | Purple       |
| Melancholy  | 😔    | Gray         |
| Anxious     | 😰    | Red          |
| Hopeful     | 🌟    | Green        |

## API Endpoints

### GET /api/entries

Fetches all entries (for admin use).

**Response:**
```json
{
  "entries": [
    {
      "_id": "...",
      "slug": "my-first-entry",
      "title": "My First Entry",
      "content": "...",
      "mood": "Happy",
      "date": "2024-01-01T00:00:00.000Z",
      "tags": ["personal", "reflection"],
      "private": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST /api/entries

Creates a new entry.

**Request Body:**
```json
{
  "title": "My Entry",
  "content": "Entry content...",
  "mood": "Thoughtful",
  "slug": "my-entry",
  "coverImage": "https://example.com/image.jpg",
  "date": "2024-01-01",
  "tags": ["personal", "growth"],
  "private": false
}
```

**Response:**
```json
{
  "entry": {
    "_id": "...",
    ...
  }
}
```

### GET /api/entries/[id]

Fetches a single entry by ID.

**Response:**
```json
{
  "entry": {
    "_id": "...",
    ...
  }
}
```

### PUT /api/entries/[id]

Updates an existing entry.

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "mood": "Hopeful"
}
```

**Response:**
```json
{
  "entry": {
    "_id": "...",
    ...
  }
}
```

### DELETE /api/entries/[id]

Deletes an entry.

**Response:**
```json
{
  "message": "Entry deleted successfully"
}
```

## Components

### EntryForm Component

A reusable form component for creating and editing entries.

**Props:**
- `entry?: Entry` - Optional entry object for editing
- `isEdit?: boolean` - Flag to indicate edit mode

**Features:**
- Auto-generates slugs from titles
- Visual mood selector with emojis
- Tag input with comma separation
- Private/public toggle
- Form validation
- Error handling
- Loading states

**Usage:**
```tsx
// Create new entry
<EntryForm />

// Edit existing entry
<EntryForm entry={entry} isEdit={true} />
```

## Admin Interface

### Dashboard (/admin)

The main admin dashboard provides:

**View Modes:**
1. **List View**: Traditional list of entries with full details
2. **Calendar View**: Entries grouped by month

**Features:**
- Filter by visibility (All, Public, Private)
- Create new entries
- Edit existing entries
- Delete entries with confirmation
- Mood indicators
- Tag display
- Entry preview

**Actions:**
- **New Entry**: Navigate to create page
- **Edit**: Open entry in edit mode
- **Delete**: Remove entry (with confirmation)

### Create Entry (/admin/entries/new)

Form page for creating new journal entries.

**Features:**
- Title input with auto-slug generation
- Date picker
- Mood selector with visual indicators
- Rich text content area
- Cover image URL input
- Tag input
- Private toggle

### Edit Entry (/admin/entries/[id])

Form page for editing existing entries.

**Features:**
- Pre-populated form with existing data
- All create features
- Manual slug editing
- Update timestamp tracking

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud)
- MongoDB connection string

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/personal-journal?retryWrites=true&w=majority
```

Replace with your actual MongoDB connection string.

3. **Start the development server:**
```bash
npm run dev
```

4. **Access the admin panel:**
Navigate to `http://localhost:3000/admin`

### Database Setup

The system will automatically create the `blog_entries` collection in your MongoDB database when you create your first entry. No manual setup required.

## Usage Guide

### Creating an Entry

1. Navigate to `/admin`
2. Click "New Entry" button
3. Fill in the form:
   - Enter a title (slug auto-generates)
   - Select your current mood
   - Choose the entry date
   - Write your content
   - Optionally add a cover image URL
   - Add tags (comma-separated)
   - Toggle private if needed
4. Click "Create Entry"

### Editing an Entry

1. Navigate to `/admin`
2. Find the entry you want to edit
3. Click "Edit" button
4. Modify the form fields
5. Click "Update Entry"

### Deleting an Entry

1. Navigate to `/admin`
2. Find the entry you want to delete
3. Click "Delete" button
4. Confirm the deletion

### Switching View Modes

On the admin dashboard:
- Click "List View" for detailed list
- Click "Calendar View" for month-grouped view

### Filtering Entries

Use the filter buttons:
- **All**: Show all entries
- **Public**: Show only public entries
- **Private**: Show only private entries

## Customization

### Changing Colors

The theme uses Tailwind CSS with amber/orange accents. To customize:

**In Tailwind config** (`tailwind.config.ts`):
```typescript
theme: {
  extend: {
    colors: {
      // Replace amber with your preferred color
      primary: colors.amber,
    }
  }
}
```

**In components**:
Replace `amber-*` and `orange-*` classes with your preferred color palette.

### Adding New Moods

1. **Update the Entry interface** in `lib/db.ts`:
```typescript
mood: 'Happy' | 'Grateful' | 'YourNewMood'
```

2. **Add mood configuration** in `components/EntryForm.tsx` and `app/admin/page.tsx`:
```typescript
const moods = [
  // ... existing moods
  { value: 'YourNewMood', emoji: '🎨', color: 'bg-custom-color' }
]
```

### Customizing Fields

To add new fields to entries:

1. Update the `Entry` interface in `lib/db.ts`
2. Update API routes to handle new fields
3. Update the `EntryForm` component
4. Update the admin dashboard display

### Styling the Admin Panel

All styling uses Tailwind CSS classes. Modify classes in:
- `app/admin/page.tsx` - Dashboard styling
- `components/EntryForm.tsx` - Form styling
- Individual page files for specific pages

## Database Functions

### Available Functions (lib/db.ts)

```typescript
// Get all public entries
getEntries(filterPrivate = true): Promise<Entry[]>

// Get all entries (including private)
getAllEntries(): Promise<Entry[]>

// Get single entry by ID
getEntryById(id: string): Promise<Entry | null>

// Create new entry
createEntry(entry: Omit<Entry, '_id' | 'createdAt' | 'updatedAt'>): Promise<Entry>

// Update entry
updateEntry(id: string, updates: Partial<Entry>): Promise<UpdateResult>

// Delete entry
deleteEntry(id: string): Promise<DeleteResult>
```

## Security Considerations

### Current Implementation

- No authentication system (assumes single-user personal journal)
- API endpoints are publicly accessible
- MongoDB connection secured via environment variables

### Recommended Enhancements

For production use, consider adding:

1. **Authentication**: Add NextAuth.js or similar
2. **Authorization**: Protect /admin routes
3. **API Security**: Add API authentication
4. **Rate Limiting**: Prevent abuse
5. **Input Sanitization**: Enhanced validation
6. **HTTPS**: Use secure connections in production

## Troubleshooting

### Common Issues

**Database Connection Failed:**
- Verify MONGODB_URI in `.env.local`
- Check network access to MongoDB
- Ensure database exists

**Entries Not Displaying:**
- Check browser console for errors
- Verify API endpoints are responding
- Check MongoDB collection has data

**Slug Conflicts:**
- Ensure slugs are unique
- Manually edit slug if needed
- Consider adding timestamp to slugs

## Performance Optimization

### Best Practices

1. **Pagination**: For large numbers of entries, implement pagination
2. **Indexing**: Add MongoDB indexes on frequently queried fields
3. **Caching**: Implement caching for read-heavy operations
4. **Image Optimization**: Use Next.js Image component for cover images

### Recommended Indexes

```javascript
db.blog_entries.createIndex({ slug: 1 })
db.blog_entries.createIndex({ date: -1 })
db.blog_entries.createIndex({ tags: 1 })
```

## Future Enhancements

Potential features to add:

- Rich text editor (e.g., Tiptap, Quill)
- Image upload functionality
- Search and filter capabilities
- Export entries (PDF, Markdown)
- Entry statistics and insights
- Mood tracking analytics
- Calendar integration
- Markdown support
- Draft system
- Version history

## Support

For issues or questions:
1. Check this documentation
2. Review the code comments
3. Consult Next.js and MongoDB documentation
4. Check the browser console for errors

## License

This blog management system is part of the Personal Journal template. Use freely in your projects.
