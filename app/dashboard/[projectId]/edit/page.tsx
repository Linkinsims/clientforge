import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Editor from '@/components/Editor'

interface PageProps {
  params: Promise<{ projectId: string }>
}

export default async function EditPage({ params }: PageProps) {
  const user = await requireAuth()
  const { projectId } = await params

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
      userId: user.id,
    },
    include: {
      pages: {
        include: {
          sections: {
            orderBy: { sortOrder: 'asc' },
          },
        },
        orderBy: { sortOrder: 'asc' },
      },
    },
  })

  if (!project) {
    redirect('/dashboard')
  }

  return <Editor project={project} user={user} />
}
