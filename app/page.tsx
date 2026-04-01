import Link from 'next/link'
import { ArrowRight, Check, Globe, Palette, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold">ClientForge</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link href="/auth/login" className="text-gray-600 hover:text-gray-900">Login</Link>
            <Link href="/auth/signup" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Websites for Your Clients
            <span className="text-primary-600"> Faster Than Ever</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The all-in-one website builder designed for freelancers, agencies, and service businesses. 
            Create, manage, and publish stunning websites in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors">
              Start Building Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="#demo" className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 transition-colors">
              Watch Demo
            </Link>
          </div>
        </section>

        <section id="features" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visual Builder</h3>
              <p className="text-gray-600">
                Drag-and-drop interface with pre-built sections. No coding required.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Build complete websites in minutes, not days. Ship faster to clients.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Publish Instantly</h3>
              <p className="text-gray-600">
                One-click publishing to custom domains. Your clients go live fast.
              </p>
            </div>
          </div>
        </section>

        <section id="pricing" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <p className="text-4xl font-bold mb-4">$0<span className="text-lg text-gray-500">/mo</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Up to 3 projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Basic templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Community support</span>
                </li>
              </ul>
              <Link href="/auth/signup" className="block text-center border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 transition-colors">
                Get Started
              </Link>
            </div>
            <div className="bg-primary-600 p-8 rounded-xl shadow-lg text-white">
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-4xl font-bold mb-4">$29<span className="text-lg opacity-80">/mo</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>Unlimited projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>All templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>Custom domains</span>
                </li>
              </ul>
              <Link href="/auth/signup" className="block text-center bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Free Trial
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>© 2024 ClientForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
