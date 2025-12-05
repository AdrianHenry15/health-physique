export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <section className="max-w-5xl mx-auto px-4 mt-10 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Breadcrumb / Eyebrow */}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-4">
          About • Health Physique
        </p>

        <div className="grid gap-10 md:gap-12 md:grid-cols-[minmax(0,3fr)_minmax(0,2.3fr)] items-start">
          {/* Text column */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
              Meet{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Sohaila Henry
              </span>
              , Your Coach from Colón, Panamá
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
              Sohaila Henry isn’t just a fitness instructor—she’s your hype
              woman, form coach, and big-sister energy all rolled into one. Born
              and raised in <span className="font-semibold">Colón, Panamá</span>
              , she brings Caribbean rhythm, discipline, and a whole lot of fun
              into every training session.
            </p>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                From Colón to the World
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                Growing up where music is loud, family is everything, and
                movement is part of daily life, fitness never felt like
                punishment for Sohaila—it felt natural. From dancing at family
                gatherings to running around the streets and beaches of Colón,
                she learned early that the body is meant to move and that joy
                belongs in every workout.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                She didn’t start with a fancy gym membership or high-end
                equipment—just a couple of worn-out dumbbells, some basic
                resistance bands, and a playlist that went way harder than her
                setup. Friends and family started asking for tips, then for
                “little workouts,” then for full-on routines. Before long, they
                weren’t just sweating—they were transforming.
              </p>
            </div>

            {/* Pill / philosophy section */}
            <div className="rounded-2xl border border-blue-100 dark:border-blue-900/60 bg-white dark:bg-neutral-900/60 p-5 sm:p-6 shadow-sm">
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-50">
                Her Training Philosophy
              </h3>
              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 mb-3">
                Sohaila isn’t interested in breaking you—she’s here to build
                you. Her approach is:
              </p>
              <ul className="grid gap-2 text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
                <li>
                  • <span className="font-semibold">Form-first</span> – move
                  well before you move heavy.
                </li>
                <li>
                  •{" "}
                  <span className="font-semibold">
                    Progress over perfection
                  </span>{" "}
                  – small, consistent wins.
                </li>
                <li>
                  • <span className="font-semibold">Real life–friendly</span> –
                  built for parents, workers, and real schedules.
                </li>
                <li>
                  • <span className="font-semibold">Fun, but structured</span> –
                  expect strength, conditioning, mobility… and the occasional
                  dance break.
                </li>
              </ul>
            </div>

            {/* Bulleted specialties */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-neutral-900 text-neutral-50 p-4 sm:p-5 shadow-sm">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-blue-300 mb-2">
                  What She Specializes In
                </h4>
                <ul className="space-y-1.5 text-sm">
                  <li>• Strength training for beginners & intermediates</li>
                  <li>• Glutes, legs & core-focused programs</li>
                  <li>• Sustainable fat loss (no crash dieting)</li>
                  <li>• Habit-building for people who “fell off” before</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 sm:p-5">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-300 mb-2">
                  What She Believes
                </h4>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-2">
                  “You don’t need a different body to deserve respect—just a
                  different plan to feel your best.”
                </p>
                <ul className="space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300">
                  <li>• Fitness should fit your life, not consume it.</li>
                  <li>• The right 30–45 minutes beats a random 2 hours.</li>
                  <li>
                    • You can love your culture’s food and still hit your goals.
                  </li>
                </ul>
              </div>
            </div>

            {/* Fun facts */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                Fun Facts About Sohaila
              </h2>
              <ul className="space-y-1.5 text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
                <li>
                  🌴 Proudly from{" "}
                  <span className="font-semibold">Colón, Panamá</span>, and it
                  shows in her energy.
                </li>
                <li>
                  🎵 Builds workouts around the beat—reggaetón, Afrobeat, and
                  everything that makes you move.
                </li>
                <li>
                  🧃 Loves smoothies but won’t judge your cafecito obsession.
                </li>
                <li>
                  💬 Can hype you up in English and Spanish—double the
                  motivation.
                </li>
                <li>
                  🤝 Treats every session like a partnership: “We’re in this
                  together.”
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white text-sm sm:text-base font-semibold shadow-sm hover:bg-blue-700 transition cursor-pointer">
                Train with Sohaila
              </a>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                Whether you’re just starting or starting again, she’s here to
                make fitness feel alive, fun, and actually sustainable.
              </p>
            </div>
          </div>

          {/* Image / card column */}
          <div className="flex md:justify-end">
            <div className="w-full max-w-sm md:max-w-xs lg:max-w-sm mx-auto md:mx-0">
              <div className="relative rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 text-neutral-50 shadow-xl">
                {/* <div className="relative h-64 sm:h-72">
                  <Image
                    src="/images/sohaila-henry.jpg" // replace with your real image path
                    alt="Sohaila Henry - Fitness Instructor from Colón, Panamá"
                    fill
                    className="object-cover"
                  />
                </div> */}
                <div className="p-4 sm:p-5 space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-300">
                    Coach Profile
                  </p>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Sohaila Henry
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300">
                    Fitness Instructor • Health Physique • Colón, Panamá
                  </p>

                  <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
                    <div className="rounded-2xl bg-neutral-800 px-2 py-2">
                      <div className="font-semibold">Strength</div>
                      <div className="text-neutral-400">Glutes & Legs</div>
                    </div>
                    <div className="rounded-2xl bg-neutral-800 px-2 py-2">
                      <div className="font-semibold">Focus</div>
                      <div className="text-neutral-400">Form & Safety</div>
                    </div>
                    <div className="rounded-2xl bg-neutral-800 px-2 py-2">
                      <div className="font-semibold">Vibe</div>
                      <div className="text-neutral-400">Fun & Real</div>
                    </div>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-neutral-300">
                    “We’re not chasing perfection—we’re building a stronger,
                    more confident version of you, one session at a time.”
                  </p>
                </div>
              </div>
              <div className="mt-4 text-xs text-neutral-500 dark:text-neutral-400 text-center">
                Health Physique • Coaching with heart, science, and a little
                Caribbean flavor.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
