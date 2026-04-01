import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Preview from '@/components/Preview'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug, status: 'PUBLISHED' },
    include: { pages: { orderBy: { sortOrder: 'asc' }, take: 1 } },
  })

  if (!project || project.pages.length === 0) {
    return {
      title: 'Not Found',
    }
  }

  const page = project.pages[0]

  return {
    title: page.metaTitle || project.name,
    description: page.metaDescription || project.description,
  }
}

export default async function SitePage({ params }: PageProps) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug, status: 'PUBLISHED' },
    include: {
      pages: {
        include: {
          sections: {
            orderBy: { sortOrder: 'asc' },
          },
        },
        orderBy: { sortOrder: 'asc' },
        take: 1,
      },
    },
  })

  if (!project || project.pages.length === 0) {
    notFound()
  }

  const page = project.pages[0]

  return (
    <div className="min-h-screen">
      <Preview sections={page.sections} />
    </div>
  )
}
