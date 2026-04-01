'use client'

interface Section {
  id: string
  type: string
  content: any
}

interface PreviewProps {
  sections: Section[]
}

export default function Preview({ sections }: PreviewProps) {
  return (
    <div className="min-h-screen">
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  )
}

function SectionRenderer({ section }: { section: Section }) {
  const { type, content } = section

  switch (type) {
    case 'HEADER':
      return (
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="font-bold text-xl">{content.logo}</div>
            <nav className="hidden md:flex items-center gap-6">
              {content.navItems?.map((item: any, index: number) => (
                <a key={index} href={item.href} className="text-gray-600 hover:text-gray-900">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </header>
      )

    case 'HERO':
      return (
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.heading}</h1>
            <p className="text-xl mb-8 opacity-90">{content.subheading}</p>
            <a
              href={content.ctaHref}
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {content.ctaText}
            </a>
          </div>
        </section>
      )

    case 'ABOUT':
      return (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">{content.heading}</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">{content.description}</p>
          </div>
        </section>
      )

    case 'SERVICES':
      return (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{content.heading}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {content.services?.map((service: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )

    case 'TESTIMONIALS':
      return (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{content.heading}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {content.testimonials?.map((testimonial: any, index: number) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )

    case 'FAQ':
      return (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{content.heading}</h2>
            <div className="max-w-2xl mx-auto space-y-4">
              {content.items?.map((item: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )

    case 'CONTACT':
      return (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">{content.heading}</h2>
            <div className="space-y-2 text-gray-600">
              <p>{content.email}</p>
              <p>{content.phone}</p>
              <p>{content.address}</p>
            </div>
          </div>
        </section>
      )

    case 'FOOTER':
      return (
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="font-bold text-lg mb-2">{content.companyName}</div>
            <p className="text-gray-400">{content.copyright}</p>
          </div>
        </footer>
      )

    default:
      return null
  }
}
