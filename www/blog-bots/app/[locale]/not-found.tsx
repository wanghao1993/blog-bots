import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="text-9xl mb-8">🔌</div>
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
        <p className="text-muted-foreground text-lg mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link href="/">
          <button className="tech-button text-lg">
            🏠 Back to Home
          </button>
        </Link>
      </div>
    </div>
  )
}
