export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex items-center justify-center">
        <div className="relative">
          <div className="h-24 w-24 rounded-lg border-4 border-cyan-200 dark:border-cyan-900"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-lg border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-4xl">
            ⚡
          </div>
        </div>
      </div>
    </div>
  )
}
