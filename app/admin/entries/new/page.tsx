import EntryForm from '@/components/EntryForm'

export default function NewEntryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">New Journal Entry</h1>
          <p className="text-amber-700">Capture your thoughts and feelings</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 border border-amber-200">
          <EntryForm />
        </div>
      </div>
    </div>
  )
}
