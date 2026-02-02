'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="text-9xl mb-8">⚠️</div>
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Oops!
        </h1>
        <h2 className="text-3xl font-bold mb-6">Something went wrong</h2>
        <p className="text-muted-foreground text-lg mb-8">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button onClick={reset} className="tech-button text-lg">
          🔄 Try Again
        </button>
      </div>
    </div>
  )
}
