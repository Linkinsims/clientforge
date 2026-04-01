'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Globe, ArrowLeft, Save, Eye, Smartphone, Tablet, Monitor, Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Settings, Palette } from 'lucide-react'
import SectionEditor from './SectionEditor'
import Preview from './Preview'

interface Section {
  id: string
  type: string
  content: any
  sortOrder: number
}

interface Page {
  id: string
  title: string
  slug: string
  metaTitle: string | null
  metaDescription: string | null
  sections: Section[]
}

interface Project {
  id: string
  name: string
  slug: string
  clientName: string | null
  description: string | null
  status: string
  themeConfig: any
  pages: Page[]
}

interface User {
  id: string
  email: string
  name: string | null
  plan: string
}

interface EditorProps {
  project: Project
  user: User
}

export default function Editor({ project, user }: EditorProps) {
  const router = useRouter()
  const [pages, setPages] = useState<Page[]>(project.pages)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [showPreview, setShowPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showTheme, setShowTheme] = useState(false)

  const currentPage = pages[currentPageIndex]

  const handleSave = async () => {
    setSaving(true)
    try {
      for (const page of pages) {
        await fetch(`/api/projects/${project.id}/pages/${page.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: page.title,
            slug: page.slug,
            metaTitle: page.metaTitle,
            metaDescription: page.metaDescription,
            sections: page.sections,
          }),
        })
      }
      router.refresh()
    } catch (error) {
      console.error('Save error:', error)
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    try {
      await fetch(`/api/projects/${project.id}/publish`, {
        method: 'POST',
      })
      router.refresh()
    } catch (error) {
      console.error('Publish error:', error)
    }
  }

  const handleAddSection = (type: string) => {
    const newSection: Section = {
      id: `temp-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      sortOrder: currentPage.sections.length,
    }

    const updatedPages = [...pages]
    updatedPages[currentPageIndex] = {
      ...currentPage,
      sections: [...currentPage.sections, newSection],
    }
    setPages(updatedPages)
  }

  const handleUpdateSection = (sectionId: string, content: any) => {
    const updatedPages = [...pages]
    const sectionIndex = currentPage.sections.findIndex(s => s.id === sectionId)
    if (sectionIndex !== -1) {
      updatedPages[currentPageIndex].sections[sectionIndex].content = content
      setPages(updatedPages)
    }
  }

  const handleDeleteSection = (sectionId: string) => {
    const updatedPages = [...pages]
    updatedPages[currentPageIndex] = {
      ...currentPage,
      sections: currentPage.sections.filter(s => s.id !== sectionId),
    }
    setPages(updatedPages)
  }

  const handleMoveSection = (sectionId: string, direction: 'up' | 'down') => {
    const updatedPages = [...pages]
    const sections = [...currentPage.sections]
    const index = sections.findIndex(s => s.id === sectionId)

    if (direction === 'up' && index > 0) {
      [sections[index - 1], sections[index]] = [sections[index], sections[index - 1]]
    } else if (direction === 'down' && index < sections.length - 1) {
      [sections[index], sections[index + 1]] = [sections[index + 1], sections[index]]
    }

    updatedPages[currentPageIndex] = {
      ...currentPage,
      sections: sections.map((s, i) => ({ ...s, sortOrder: i })),
    }
    setPages(updatedPages)
  }

  const previewWidth = previewMode === 'desktop' ? '100%' : previewMode === 'tablet' ? '768px' : '375px'

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-primary-600" />
              <span className="font-semibold">{project.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-white shadow' : ''}`}
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPreviewMode('tablet')}
                className={`p-2 rounded ${previewMode === 'tablet' ? 'bg-white shadow' : ''}`}
              >
                <Tablet className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-white shadow' : ''}`}
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={() => setShowPreview(!showPreview)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Eye className="h-5 w-5" />
            </button>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Settings className="h-5 w-5" />
            </button>

            <button
              onClick={() => setShowTheme(!showTheme)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Palette className="h-5 w-5" />
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save'}
            </button>

            <button
              onClick={handlePublish}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Publish
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        <aside className="w-64 bg-white border-r overflow-y-auto">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-900 mb-2">Pages</h3>
            {pages.map((page, index) => (
              <button
                key={page.id}
                onClick={() => setCurrentPageIndex(index)}
                className={`w-full text-left px-3 py-2 rounded-lg mb-1 ${
                  currentPageIndex === index
                    ? 'bg-primary-50 text-primary-700'
                    : 'hover:bg-gray-50'
                }`}
              >
                {page.title}
              </button>
            ))}
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Add Section</h3>
            <div className="space-y-2">
              {['HEADER', 'HERO', 'ABOUT', 'SERVICES', 'TESTIMONIALS', 'FAQ', 'CONTACT', 'FOOTER'].map((type) => (
                <button
                  key={type}
                  onClick={() => handleAddSection(type)}
                  className="w-full text-left px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {type}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-6">
          <div
            className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300"
            style={{ width: previewWidth, maxWidth: '100%' }}
          >
            {showPreview ? (
              <Preview sections={currentPage.sections} />
            ) : (
              <div className="p-6 space-y-4">
                {currentPage.sections.map((section, index) => (
                  <div key={section.id} className="border rounded-lg">
                    <div className="flex items-center justify-between p-3 bg-gray-50 border-b">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-sm">{section.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveSection(section.id, 'up')}
                          disabled={index === 0}
                          className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleMoveSection(section.id, 'down')}
                          disabled={index === currentPage.sections.length - 1}
                          className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSection(section.id)}
                          className="p-1 hover:bg-red-100 text-red-600 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <SectionEditor
                        type={section.type}
                        content={section.content}
                        onChange={(content) => handleUpdateSection(section.id, content)}
                      />
                    </div>
                  </div>
                ))}

                {currentPage.sections.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <p>No sections yet. Add a section from the sidebar.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

function getDefaultContent(type: string) {
  switch (type) {
    case 'HEADER':
      return {
        logo: 'Your Brand',
        navItems: [
          { label: 'Home', href: '/' },
          { label: 'About', href: '#about' },
          { label: 'Services', href: '#services' },
          { label: 'Contact', href: '#contact' },
        ],
      }
    case 'HERO':
      return {
        heading: 'Welcome to Our Website',
        subheading: 'We create amazing digital experiences',
        ctaText: 'Get Started',
        ctaHref: '#contact',
      }
    case 'ABOUT':
      return {
        heading: 'About Us',
        description: 'We are a team of passionate professionals dedicated to delivering exceptional results.',
      }
    case 'SERVICES':
      return {
        heading: 'Our Services',
        services: [
          { title: 'Service 1', description: 'Description of service 1', icon: 'star' },
          { title: 'Service 2', description: 'Description of service 2', icon: 'star' },
          { title: 'Service 3', description: 'Description of service 3', icon: 'star' },
        ],
      }
    case 'TESTIMONIALS':
      return {
        heading: 'What Clients Say',
        testimonials: [
          { quote: 'Amazing work! Highly recommended.', author: 'John Smith', role: 'CEO' },
          { quote: 'Professional and delivered on time.', author: 'Jane Doe', role: 'Founder' },
        ],
      }
    case 'FAQ':
      return {
        heading: 'Frequently Asked Questions',
        items: [
          { question: 'How does it work?', answer: 'It works great!' },
          { question: 'What is the pricing?', answer: 'Contact us for pricing.' },
        ],
      }
    case 'CONTACT':
      return {
        heading: 'Get In Touch',
        email: 'hello@example.com',
        phone: '+1 234 567 890',
        address: '123 Business St, City, Country',
      }
    case 'FOOTER':
      return {
        companyName: 'Your Brand',
        copyright: '© 2024 Your Brand. All rights reserved.',
      }
    default:
      return {}
  }
}
