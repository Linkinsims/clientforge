import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

const templateSections: Record<string, string[]> = {
  agency: ['HEADER', 'HERO', 'SERVICES', 'ABOUT', 'TESTIMONIALS', 'CONTACT', 'FOOTER'],
  salon: ['HEADER', 'HERO', 'SERVICES', 'ABOUT', 'TESTIMONIALS', 'CONTACT', 'FOOTER'],
  restaurant: ['HEADER', 'HERO', 'ABOUT', 'SERVICES', 'TESTIMONIALS', 'CONTACT', 'FOOTER'],
  coach: ['HEADER', 'HERO', 'ABOUT', 'SERVICES', 'TESTIMONIALS', 'FAQ', 'CONTACT', 'FOOTER'],
  service: ['HEADER', 'HERO', 'SERVICES', 'ABOUT', 'TESTIMONIALS', 'FAQ', 'CONTACT', 'FOOTER'],
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

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, slug, clientName, description, template } = await request.json()

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      )
    }

    const existingProject = await prisma.project.findUnique({
      where: { slug },
    })

    if (existingProject) {
      return NextResponse.json(
        { error: 'A project with this slug already exists' },
        { status: 400 }
      )
    }

    const maxProjects = user.plan === 'FREE' ? 3 : Infinity
    const projectCount = await prisma.project.count({
      where: { userId: user.id },
    })

    if (projectCount >= maxProjects) {
      return NextResponse.json(
        { error: 'Project limit reached. Upgrade to Pro for unlimited projects.' },
        { status: 400 }
      )
    }

    const sectionTypes = templateSections[template] || templateSections.agency

    const project = await prisma.project.create({
      data: {
        name,
        slug,
        clientName: clientName || null,
        description: description || null,
        userId: user.id,
        pages: {
          create: [
            {
              title: 'Home',
              slug: 'home',
              metaTitle: `${name} - Home`,
              metaDescription: description || `Welcome to ${name}`,
              sortOrder: 0,
              sections: {
                create: sectionTypes.map((type, index) => ({
                  type: type as any,
                  content: getDefaultContent(type),
                  sortOrder: index,
                })),
              },
            },
          ],
        },
      },
      include: {
        pages: {
          include: {
            sections: true,
          },
        },
      },
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('Create project error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const projects = await prisma.project.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Get projects error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
