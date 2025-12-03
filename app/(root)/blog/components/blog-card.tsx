import Image, { StaticImageData } from "next/image"
import Link from "next/link"

type BlogCardProps = {
  title: string
  description: string
  date: string
  slug: string
  image: string | StaticImageData
}

export default function BlogCard({
  title,
  description,
  date,
  slug,
  image,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="
        block rounded-2xl overflow-hidden 
        border border-gray-200 dark:border-gray-800
        hover:shadow-xl transition
        bg-white dark:bg-gray-900
      ">
      {/* Demo Label */}
      <div
        className="
          text-[10px] uppercase font-semibold tracking-wide 
          bg-blue-600 text-white 
          dark:bg-blue-500
          px-3 py-1
        ">
        For demonstration purposes
      </div>

      <div className="relative h-52 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="
            object-cover 
            transition-transform duration-500 hover:scale-105
          "
        />
      </div>

      <div className="p-5 space-y-3">
        <h3 className="font-bold text-xl text-gray-900 dark:text-white">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {description}
        </p>

        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
          {date}
        </span>
      </div>
    </Link>
  )
}
