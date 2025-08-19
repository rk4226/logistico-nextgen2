import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How it works – Logistico.AI',
  description: 'A modular pipeline from data ingestion through delivery and invoicing.'
}

export default function HowPage() {
  return (
    <main className="min-h-screen text-white pt-32 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-light">How it works</h1>
        <ul className="grid md:grid-cols-2 gap-6">
          <li className="glass-effect rounded-xl p-6"><a href="/how/ingestion" className="hover:underline">Data ingestion</a></li>
          <li className="glass-effect rounded-xl p-6"><a href="/how/classification" className="hover:underline">AI classification</a></li>
          <li className="glass-effect rounded-xl p-6"><a href="/how/matching" className="hover:underline">Vendor & NSN matching</a></li>
          <li className="glass-effect rounded-xl p-6"><a href="/how/pricing" className="hover:underline">Pricing engine</a></li>
          <li className="glass-effect rounded-xl p-6"><a href="/how/rfq" className="hover:underline">RFQ automation</a></li>
          <li className="glass-effect rounded-xl p-6"><a href="/how/bid" className="hover:underline">Bid compilation & submission</a></li>
          <li className="glass-effect rounded-xl p-6"><a href="/how/award" className="hover:underline">Award management</a></li>
          <li className="glass-effect rounded-xl p-6"><a href="/how/fulfillment" className="hover:underline">Delivery & invoicing</a></li>
        </ul>
      </div>
    </main>
  )
}


