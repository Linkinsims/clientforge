import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('demo123', 10)
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@clientforge.com' },
    update: {},
    create: {
      email: 'demo@clientforge.com',
      name: 'Demo User',
      password: hashedPassword,
      plan: 'PRO',
    },
  })

  console.log('Created demo user:', user.email)
  
  const project = await prisma.project.create({
    data: {
      name: 'Demo Agency',
      slug: 'demo-agency',
      clientName: 'Acme Corp',
      description: 'A modern digital agency website',
      status: 'PUBLISHED',
      userId: user.id,
      themeConfig: {
        primaryColor: '#3b82f6',
        secondaryColor: '#1e40af',
        accentColor: '#f59e0b',
      },
      pages: {
        create: [
          {
            title: 'Home',
            slug: 'home',
            metaTitle: 'Demo Agency - Modern Digital Solutions',
            metaDescription: 'We create stunning digital experiences',
            sortOrder: 0,
            sections: {
              create: [
                {
                  type: 'HEADER',
                  sortOrder: 0,
                  content: {
                    logo: 'Demo Agency',
                    navItems: [
                      { label: 'Home', href: '/' },
                      { label: 'Services', href: '#services' },
                      { label: 'About', href: '#about' },
                      { label: 'Contact', href: '#contact' },
                    ],
                  },
                },
                {
                  type: 'HERO',
                  sortOrder: 1,
                  content: {
                    heading: 'We Build Digital Experiences',
                    subheading: 'Modern solutions for modern businesses',
                    ctaText: 'Get Started',
                    ctaHref: '#contact',
                    backgroundImage: '',
                  },
                },
                {
                  type: 'ABOUT',
                  sortOrder: 2,
                  content: {
                    heading: 'About Us',
                    description: 'We are a team of passionate designers and developers creating exceptional digital experiences.',
                    image: '',
                  },
                },
                {
                  type: 'SERVICES',
                  sortOrder: 3,
                  content: {
                    heading: 'Our Services',
                    services: [
                      {
                        title: 'Web Design',
                        description: 'Beautiful, responsive websites',
                        icon: 'palette',
                      },
                      {
                        title: 'Development',
                        description: 'Fast, reliable applications',
                        icon: 'code',
                      },
                      {
                        title: 'Marketing',
                        description: 'Grow your online presence',
                        icon: 'trending-up',
                      },
                    ],
                  },
                },
                {
                  type: 'TESTIMONIALS',
                  sortOrder: 4,
                  content: {
                    heading: 'What Clients Say',
                    testimonials: [
                      {
                        quote: 'Amazing work! Highly recommended.',
                        author: 'John Smith',
                        role: 'CEO, TechCorp',
                      },
                      {
                        quote: 'Professional and delivered on time.',
                        author: 'Jane Doe',
                        role: 'Founder, StartupXYZ',
                      },
                    ],
                  },
                },
                {
                  type: 'CONTACT',
                  sortOrder: 5,
                  content: {
                    heading: 'Get In Touch',
                    email: 'hello@demoagency.com',
                    phone: '+1 234 567 890',
                    address: '123 Business St, City, Country',
                  },
                },
                {
                  type: 'FOOTER',
                  sortOrder: 6,
                  content: {
                    companyName: 'Demo Agency',
                    copyright: '© 2024 Demo Agency. All rights reserved.',
                    socialLinks: [
                      { platform: 'twitter', url: '#' },
                      { platform: 'linkedin', url: '#' },
                      { platform: 'instagram', url: '#' },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  })

  console.log('Created demo project:', project.name)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
