import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Who it's for – Logistico.AI",
  description: 'Teams across capture, procurement, operations, finance, and IT.'
}

export default function WhoPage() {
  return (
    <main className="min-h-screen text-white pt-32 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-light">Who it’s for</h1>
        <ul className="grid md:grid-cols-2 gap-6">
          <li className="glass-effect rounded-xl p-6"><a href="/who/capture" className="hover:underline">Capture & proposal teams</a></li>
          <li className="glass-effect rounded-xl p-6"><a href="/who/analysts" className="hover:underline">Procurement analysts</a></li>
          <li className="glass-effect rounded-xl p-6"><a href="/who/ops" className="hover:underline">Operations & logistics</a></li>
          <li className="glass-effect rounded-xl p-6"><a href="/who/executives" className="hover:underline">Executives & finance</a></li>
          <li className="glass-effect rounded-xl p-6"><a href="/who/it" className="hover:underline">IT & Odoo admins</a></li>
        </ul>
      </div>
    </main>
  )
}


