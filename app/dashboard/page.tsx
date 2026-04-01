import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Globe, Calendar, MoreVertical, Pencil, Trash2, Copy } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default async function DashboardPage() {
  const user = await requireAuth()

  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: 'desc' },
  })

  const projectCount = projects.length
  const maxProjects = user.plan === 'FREE' ? 3 : Infinity

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold">ClientForge</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <form action="/api/auth/logout" method="POST">
              <button type="submit" className="text-sm text-gray-600 hover:text-gray-900">
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              {projectCount} / {maxProjects === Infinity ? 'Unlimited' : maxProjects} projects
            </p>
          </div>
          {projectCount < maxProjects ? (
            <Link
              href="/dashboard/new"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              New Project
            </Link>
          ) : (
            <div className="text-sm text-gray-500">
              Upgrade to Pro for unlimited projects
            </div>
          )}
        </div>

        {projects.length === 0 ? (
          <div className="bg-white rounded-xl border p-12 text-center">
            <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No projects yet</h2>
            <p className="text-gray-600 mb-6">Create your first website project to get started</p>
            <Link
              href="/dashboard/new"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Create Your First Project
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any ) => (
              <div key={project.id} className="bg-white rounded-xl border hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                      {project.clientName && (
                        <p className="text-sm text-gray-500">{project.clientName}</p>
                      )}
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' :
                      project.status === 'READY' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  {project.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {formatDate(project.updatedAt)}
                  </div>
                </div>
                <div className="border-t px-6 py-3 flex items-center gap-2">
                  <Link
                    href={`/dashboard/${project.id}/edit`}
                    className="flex-1 text-center py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Edit
                  </Link>
                  {project.status === 'PUBLISHED' && (
                    <Link
                      href={`/site/${project.slug}`}
                      target="_blank"
                      className="flex-1 text-center py-2 text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      View
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
