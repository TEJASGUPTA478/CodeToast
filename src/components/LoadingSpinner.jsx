export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center mt-12 gap-5 animate-fade-in-up">
      {/* Flame animation */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-2xl">
          🔥
        </div>
      </div>
      <div className="text-center">
        <p className="text-gray-300 font-medium">Claude is sharpening its words...</p>
        <p className="text-gray-500 text-sm mt-1">This might sting a little.</p>
      </div>
    </div>
  )
}
