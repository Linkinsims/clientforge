import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createSession(userId: string): Promise<string> {
  const token = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  
  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  })
  
  return token
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session-token')?.value
  
  if (!token) return null
  
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  })
  
  if (!session || session.expiresAt < new Date()) {
    return null
  }
  
  return session
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user || null
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/auth/login')
  }
  return user
}

export async function deleteSession(token: string) {
  await prisma.session.delete({
    where: { token },
  })
}
