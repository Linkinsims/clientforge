'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Globe, ArrowLeft, Loader2 } from 'lucide-react'
import { slugify } from '@/lib/utils'

const templates = [
  {
    id: 'blank',
    name: 'Blank',
    description: 'Start from scratch',
    sections: [],
  },
  {
    id: 'agency',
    name: 'Agency',
    description: 'Digital agency website',
    sections: ['HEADER', 'HERO', 'SERVICES', 'ABOUT', 'TESTIMONIALS', 'CONTACT', 'FOOTER'],
  },
  {
    id: 'salon',
    name: 'Salon & Beauty',
    description: 'Beauty salon website',
    sections: ['HEADER', 'HERO', 'SERVICES', 'ABOUT', 'GALLERY', 'TESTIMONIALS', 'CONTACT', 'FOOTER'],
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'Restaurant or cafe website',
    sections: ['HEADER', 'HERO', 'ABOUT', 'MENU', 'TESTIMONIALS', 'CONTACT', 'FOOTER'],
  },
  {
    id: 'coach',
    name: 'Personal Brand',
    description: 'Coach or consultant website',
    sections: ['HEADER', 'HERO', 'ABOUT', 'SERVICES', 'TESTIMONIALS', 'FAQ', 'CONTACT', 'FOOTER'],
  },
  {
    id: 'service',
    name: 'Local Service',
    description: 'Local business website',
    sections: ['HEADER', 'HERO', 'SERVICES', 'ABOUT', 'TESTIMONIALS', 'FAQ', 'CONTACT', 'FOOTER'],
  },
]

export default function NewProjectPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [clientName, setClientName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('agency')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const slug = slugify(name)
      const template = templates.find(t => t.id === selectedTemplate)

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          slug,
          clientName: clientName || null,
          description: description || null,
          template: selectedTemplate,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create project')
        return
      }

      router.push(`/dashboard/${data.id}/edit`)
      router.refresh()
    } catch (err) {
      setError('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold">ClientForge</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-xl border p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Project</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Project Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Awesome Website"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
                Client Name
              </label>
              <input
                id="clientName"
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Acme Corp"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief description of this project"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Choose a Template
              </label>
              <div className="grid grid-cols-2 gap-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                      selectedTemplate === template.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{template.name}</div>
                    <div className="text-sm text-gray-500">{template.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Create Project'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
