import Image from "next/image"
import Link from "next/link"
import FitnessImage from "@/public/hp-fitness-1.jpg"
import DailyQuote from "@/components/daily-quote"

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <DailyQuote />
      {/* Background Glow (theme-aware) */}
      <div
        className="
        absolute inset-0 -z-10 
        bg-linear-to-br 
        from-blue-400/20 via-transparent to-purple-400/20
        dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20
        transition-colors duration-500
      "></div>

      <section
        className="
        pt-32 pb-24 md:pb-32 
        max-w-6xl mx-auto px-6 
        grid md:grid-cols-2 gap-16 items-center
      ">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Transform Your
            <span className="text-blue-600 dark:text-blue-400"> Health</span>
            <br />
            Shape Your{" "}
            <span className="text-purple-600 dark:text-purple-400">
              Physique
            </span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
            Evidence-based training, smart nutrition, and sustainable habits to
            help you build strength, longevity, and confidence.
          </p>

          <div className="flex gap-4 pt-4">
            <Link
              href="/blog"
              className="
                px-6 py-3 
                bg-blue-600 text-white 
                dark:bg-blue-500 
                rounded-xl font-semibold 
                shadow-lg hover:shadow-xl 
                hover:bg-blue-700 dark:hover:bg-blue-600 
                transition
              ">
              Read the Blog
            </Link>

            <Link
              href="/about"
              className="
                px-6 py-3 
                border border-gray-300 dark:border-gray-700 
                rounded-xl font-semibold 
                hover:bg-gray-100 dark:hover:bg-gray-800 
                transition
              ">
              Learn More
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative group">
          {/* Theme-aware gradient overlay over the image */}
          <div
            className="
              absolute inset-0 rounded-3xl 
              bg-linear-to-tr from-black/30 to-transparent
              dark:from-black/60 dark:to-transparent
              z-10 pointer-events-none
              transition-opacity duration-500
            "></div>

          <Image
            src={FitnessImage}
            alt="Fitness training"
            width={700}
            height={700}
            className="
              rounded-3xl shadow-xl object-cover 
              group-hover:scale-[1.02] transition duration-500
              brightness-[0.95] dark:brightness-[0.80]
            "
          />
        </div>
      </section>
    </div>
  )
}
