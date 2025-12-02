import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"
import Link from "next/link"

export default function Footer() {
  return (
    <footer
      className="
        border-t border-gray-200 dark:border-gray-800 
        bg-white dark:bg-black
        text-gray-700 dark:text-gray-300
        mt-24
      ">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Health Physique
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xs">
              Empowering you with science-based fitness and wellness insights.
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 md:flex gap-6 text-sm font-medium">
            {["Home", "Blog", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="
                  hover:text-blue-600 dark:hover:text-blue-400 
                  transition-colors
                ">
                {item}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex gap-4">
            <Link
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Instagram">
              <FaInstagram size={22} strokeWidth={1.8} />
            </Link>

            <Link
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Twitter">
              <FaTwitter size={22} strokeWidth={1.8} />
            </Link>

            <Link
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="YouTube">
              <FaYoutube size={24} strokeWidth={1.8} />
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Health Physique. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
