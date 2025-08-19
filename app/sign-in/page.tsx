import Link from 'next/link'

export default function SignInPage() {
  return (
    <main className="min-h-screen text-white pt-32 px-6">
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" aria-label="Back to home" className="inline-flex items-center gap-2 text-sm bg-white text-black px-3 py-1.5 rounded-md font-medium hover:bg-gray-100 transition-colors shadow">
          ← Back
        </Link>
      </div>
      <div className="max-w-md mx-auto space-y-6">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm bg-white text-black px-3 py-1.5 rounded-md font-medium hover:bg-gray-100 transition-colors">← Back to home</Link>
        </div>
        <h1 className="text-4xl font-light">Sign in</h1>
        <p className="text-white/80">This is a placeholder sign-in page. Wire up your auth provider here.</p>
        <form className="glass-effect rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm text-white/80 mb-1" htmlFor="email">Email</label>
            <input id="email" type="email" className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 outline-none focus:border-white/40" placeholder="you@company.com" />
          </div>
          <div>
            <label className="block text-sm text-white/80 mb-1" htmlFor="password">Password</label>
            <input id="password" type="password" className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 outline-none focus:border-white/40" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-white text-black py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">Continue</button>
        </form>
        <div>
          <Link href="/" className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">← Back to home</Link>
        </div>
      </div>
    </main>
  )
}


