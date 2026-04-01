import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

 export async function PATCH(
  request: Request,
  context: { params: Promise<{ projectId: string; pageId: string }> }
) {
  const { projectId, pageId } = await context.params
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId: user.id,
      },
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    const body = await request.json()
    const { title, slug, metaTitle, metaDescription, sections } = body

    const page = await prisma.page.findUnique({
      where: {
        id: pageId,
        projectId: projectId,
      },
    })

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    if (sections) {
      await prisma.section.deleteMany({
        where: { pageId: pageId },
      })

      await prisma.section.createMany({
        data: sections.map((section: any, index: number) => ({
          type: section.type,
          content: section.content,
          sortOrder: index,
          pageId: pageId,
        })),
      })
    }

    const updatedPage = await prisma.page.update({
      where: { id: pageId },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(metaTitle !== undefined && { metaTitle }),
        ...(metaDescription !== undefined && { metaDescription }),
      },
      include: {
        sections: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    })

    await prisma.project.update({
      where: { id: projectId },
      data: { updatedAt: new Date() },
    })

    return NextResponse.json(updatedPage)
  } catch (error) {
    console.error('Update page error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
