import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What we do – Logistico.AI',
  description: 'Overview of Logistico.AI capabilities across procurement, inventory, logistics, and Odoo integration.'
}

export default function WhatPage() {
  return (
    <main className="min-h-screen text-white pt-32 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-light">What we do</h1>
        <p className="text-white/80 max-w-3xl">End-to-end automation across procurement, inventory, logistics, and distribution with deep Odoo ERP integration.</p>
        <ul className="grid md:grid-cols-2 gap-6">
          <li className="glass-effect rounded-xl p-6"><a href="/what/procurement" className="hover:underline">Procurement automation</a></li>
          <li className="glass-effect rounded-xl p-6"><a href="/what/inventory" className="hover:underline">Inventory management</a></li>
          <li className="glass-effect rounded-xl p-6"><a href="/what/logistics" className="hover:underline">Logistics & distribution</a></li>
          <li className="glass-effect rounded-xl p-6"><a href="/what/odoo" className="hover:underline">Odoo ERP integration</a></li>
        </ul>
      </div>
    </main>
  )
}


