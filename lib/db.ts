import { MongoClient, ServerApiVersion } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local')
}

const uri = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the connection
  // across module reloads caused by HMR (Hot Module Replacement)
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, create a new client for each connection
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise
export default clientPromise

// Helper function to get the database
export async function getDatabase() {
  const client = await clientPromise
  return client.db('personal-journal')
}

// Collection interfaces for type safety
export interface JournalEntry {
  _id?: string
  title: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  publishedAt: Date
  updatedAt: Date
  readTime: string
  featured: boolean
  draft: boolean
  slug: string
}

// Entry interface for blog management system
export interface Entry {
  _id?: string
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

export interface Comment {
  _id?: string
  entryId: string
  author: string
  email: string
  content: string
  createdAt: Date
  approved: boolean
}

export interface Category {
  _id?: string
  name: string
  slug: string
  description: string
  count: number
}

// Helper functions for common database operations
export async function getJournalEntries(limit = 10, skip = 0) {
  const db = await getDatabase()
  const entries = await db
    .collection<JournalEntry>('entries')
    .find({ draft: false })
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray()

  return entries
}

export async function getJournalEntryBySlug(slug: string) {
  const db = await getDatabase()
  const entry = await db
    .collection<JournalEntry>('entries')
    .findOne({ slug, draft: false })

  return entry
}

export async function getCategories() {
  const db = await getDatabase()
  const categories = await db
    .collection<Category>('categories')
    .find()
    .sort({ name: 1 })
    .toArray()

  return categories
}

export async function createJournalEntry(entry: Omit<JournalEntry, '_id'>) {
  const db = await getDatabase()
  const result = await db.collection<JournalEntry>('entries').insertOne(entry as JournalEntry)
  return result
}

export async function updateJournalEntry(slug: string, updates: Partial<JournalEntry>) {
  const db = await getDatabase()
  const result = await db
    .collection<JournalEntry>('entries')
    .updateOne({ slug }, { $set: { ...updates, updatedAt: new Date() } })

  return result
}

// CRUD functions for Entry management system
export async function getEntries(filterPrivate = true) {
  const db = await getDatabase()
  const filter = filterPrivate ? { private: false } : {}
  const entries = await db
    .collection<Entry>('blog_entries')
    .find(filter)
    .sort({ date: -1 })
    .toArray()

  return entries.map(entry => ({
    ...entry,
    _id: entry._id?.toString()
  }))
}

export async function getAllEntries() {
  const db = await getDatabase()
  const entries = await db
    .collection<Entry>('blog_entries')
    .find()
    .sort({ date: -1 })
    .toArray()

  return entries.map(entry => ({
    ...entry,
    _id: entry._id?.toString()
  }))
}

export async function getEntryById(id: string) {
  const db = await getDatabase()
  const { ObjectId } = require('mongodb')

  const entry = await db
    .collection<Entry>('blog_entries')
    .findOne({ _id: new ObjectId(id) })

  if (!entry) return null

  return {
    ...entry,
    _id: entry._id?.toString()
  }
}

export async function createEntry(entry: Omit<Entry, '_id' | 'createdAt' | 'updatedAt'>) {
  const db = await getDatabase()
  const now = new Date()

  const newEntry = {
    ...entry,
    createdAt: now,
    updatedAt: now
  }

  const result = await db.collection<Entry>('blog_entries').insertOne(newEntry as Entry)

  return {
    ...newEntry,
    _id: result.insertedId.toString()
  }
}

export async function updateEntry(id: string, updates: Partial<Entry>) {
  const db = await getDatabase()
  const { ObjectId } = require('mongodb')

  const result = await db
    .collection<Entry>('blog_entries')
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    )

  return result
}

export async function deleteEntry(id: string) {
  const db = await getDatabase()
  const { ObjectId } = require('mongodb')

  const result = await db
    .collection<Entry>('blog_entries')
    .deleteOne({ _id: new ObjectId(id) })

  return result
}
