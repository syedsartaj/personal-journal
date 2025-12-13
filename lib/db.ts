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
