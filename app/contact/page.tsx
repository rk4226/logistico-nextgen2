import type { Metadata } from 'next'
import VideoBackground from '../components/VideoBackground'

export const metadata: Metadata = {
  title: 'Contact – Logistico.AI',
  description: 'Get in touch with the Logistico.AI team.'
}

export default function ContactPage() {
  return (
    <div className="min-h-screen text-white relative">
      <section className="relative isolate pt-32 pb-20 px-6 min-h-screen flex items-center z-30">
        <VideoBackground variant="section" className="-z-10 opacity-100" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-black/40" />

        <div className="max-w-3xl mx-auto text-center w-full relative z-50 space-y-8">
          <h1 className="text-5xl md:text-6xl font-light text-shadow">Get in touch</h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            We would love to hear from you. For product questions, partnerships, or support,
            email us and we will respond promptly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@logistico.ai"
              className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Email hello@logistico.ai
            </a>
            <a href="/" className="text-white/80 hover:text-white transition-colors">
              Back to home
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}


