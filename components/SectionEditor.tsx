'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

interface SectionEditorProps {
  type: string
  content: any
  onChange: (content: any) => void
}

export default function SectionEditor({ type, content, onChange }: SectionEditorProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...content, [field]: value })
  }

  const updateArrayItem = (field: string, index: number, key: string, value: any) => {
    const items = [...content[field]]
    items[index] = { ...items[index], [key]: value }
    onChange({ ...content, [field]: items })
  }

  const addArrayItem = (field: string, template: any) => {
    const items = [...content[field], template]
    onChange({ ...content, [field]: items })
  }

  const removeArrayItem = (field: string, index: number) => {
    const items = content[field].filter((_: any, i: number) => i !== index)
    onChange({ ...content, [field]: items })
  }

  switch (type) {
    case 'HEADER':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Logo Text</label>
            <input
              type="text"
              value={content.logo || ''}
              onChange={(e) => updateField('logo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Navigation Items</label>
            {content.navItems?.map((item: any, index: number) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => updateArrayItem('navItems', index, 'label', e.target.value)}
                  placeholder="Label"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={item.href}
                  onChange={(e) => updateArrayItem('navItems', index, 'href', e.target.value)}
                  placeholder="URL"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={() => removeArrayItem('navItems', index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem('navItems', { label: 'New Item', href: '#' })}
              className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
            >
              <Plus className="h-4 w-4" />
              Add Item
            </button>
          </div>
        </div>
      )

    case 'HERO':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
            <input
              type="text"
              value={content.heading || ''}
              onChange={(e) => updateField('heading', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
            <input
              type="text"
              value={content.subheading || ''}
              onChange={(e) => updateField('subheading', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
              <input
                type="text"
                value={content.ctaText || ''}
                onChange={(e) => updateField('ctaText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
              <input
                type="text"
                value={content.ctaHref || ''}
                onChange={(e) => updateField('ctaHref', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      )

    case 'ABOUT':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
            <input
              type="text"
              value={content.heading || ''}
              onChange={(e) => updateField('heading', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={content.description || ''}
              onChange={(e) => updateField('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      )

    case 'SERVICES':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
            <input
              type="text"
              value={content.heading || ''}
              onChange={(e) => updateField('heading', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Services</label>
            {content.services?.map((service: any, index: number) => (
              <div key={index} className="border rounded-lg p-4 mb-2">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Service {index + 1}</span>
                  <button
                    onClick={() => removeArrayItem('services', index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => updateArrayItem('services', index, 'title', e.target.value)}
                  placeholder="Title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                />
                <textarea
                  value={service.description}
                  onChange={(e) => updateArrayItem('services', index, 'description', e.target.value)}
                  placeholder="Description"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            ))}
            <button
              onClick={() => addArrayItem('services', { title: 'New Service', description: 'Description', icon: 'star' })}
              className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
            >
              <Plus className="h-4 w-4" />
              Add Service
            </button>
          </div>
        </div>
      )

    case 'TESTIMONIALS':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
            <input
              type="text"
              value={content.heading || ''}
              onChange={(e) => updateField('heading', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Testimonials</label>
            {content.testimonials?.map((testimonial: any, index: number) => (
              <div key={index} className="border rounded-lg p-4 mb-2">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Testimonial {index + 1}</span>
                  <button
                    onClick={() => removeArrayItem('testimonials', index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <textarea
                  value={testimonial.quote}
                  onChange={(e) => updateArrayItem('testimonials', index, 'quote', e.target.value)}
                  placeholder="Quote"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={testimonial.author}
                    onChange={(e) => updateArrayItem('testimonials', index, 'author', e.target.value)}
                    placeholder="Author"
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    value={testimonial.role}
                    onChange={(e) => updateArrayItem('testimonials', index, 'role', e.target.value)}
                    placeholder="Role"
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() => addArrayItem('testimonials', { quote: 'Great work!', author: 'Name', role: 'Title' })}
              className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
            >
              <Plus className="h-4 w-4" />
              Add Testimonial
            </button>
          </div>
        </div>
      )

    case 'FAQ':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
            <input
              type="text"
              value={content.heading || ''}
              onChange={(e) => updateField('heading', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">FAQ Items</label>
            {content.items?.map((item: any, index: number) => (
              <div key={index} className="border rounded-lg p-4 mb-2">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">FAQ {index + 1}</span>
                  <button
                    onClick={() => removeArrayItem('items', index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => updateArrayItem('items', index, 'question', e.target.value)}
                  placeholder="Question"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                />
                <textarea
                  value={item.answer}
                  onChange={(e) => updateArrayItem('items', index, 'answer', e.target.value)}
                  placeholder="Answer"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            ))}
            <button
              onClick={() => addArrayItem('items', { question: 'New question?', answer: 'Answer here' })}
              className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
            >
              <Plus className="h-4 w-4" />
              Add FAQ
            </button>
          </div>
        </div>
      )

    case 'CONTACT':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
            <input
              type="text"
              value={content.heading || ''}
              onChange={(e) => updateField('heading', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={content.email || ''}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={content.phone || ''}
                onChange={(e) => updateField('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              value={content.address || ''}
              onChange={(e) => updateField('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      )

    case 'FOOTER':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              value={content.companyName || ''}
              onChange={(e) => updateField('companyName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Copyright Text</label>
            <input
              type="text"
              value={content.copyright || ''}
              onChange={(e) => updateField('copyright', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      )

    default:
      return <div className="text-gray-500">No editor available for this section type</div>
  }
}
