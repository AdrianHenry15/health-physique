import Link from "next/link"

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-32">
      <div className="text-center space-y-6">
        <h1
          className="
          text-5xl md:text-6xl font-extrabold 
          text-gray-900 dark:text-white
        ">
          Coming Soon
        </h1>

        <p
          className="
          text-gray-600 dark:text-gray-300 
          max-w-md mx-auto text-lg
        ">
          {`This page is still under construction. We’re working hard to bring you
          something amazing!`}
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="
              inline-block px-6 py-3  
              bg-blue-600 text-white 
              dark:bg-blue-500 
              rounded-xl font-semibold
              shadow-lg hover:shadow-xl
              hover:bg-blue-700 dark:hover:bg-blue-600
              transition
            ">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
