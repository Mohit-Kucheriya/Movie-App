import { Link } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

export default function About() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-zinc-900 via-black to-zinc-950 text-white">
      {/* Overlay content */}
      <div className="relative z-10 mx-auto flex flex-col gap-12 px-4 py-10 sm:px-8 md:px-16 lg:px-24">
        <nav>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            <TiArrowBack className="text-base" />
            Back to Home
          </Link>
        </nav>

        {/* Main Content */}
        <section className="flex flex-col gap-6">
          <h1 className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            About MovieVerse
          </h1>

          <p className="text-lg leading-relaxed text-zinc-300">
            <span className="font-semibold text-white">MovieVerse</span> is a
            modern movie and TV show discovery platform built to help you
            explore the entertainment universe effortlessly. It provides
            detailed information about movies, TV series, and your favorite
            actors — all in one immersive cinematic experience.
          </p>

          <p className="leading-relaxed text-zinc-400">
            Using real-time data fetched from the{" "}
            <span className="font-medium text-white">
              TMDb (The Movie Database)
            </span>{" "}
            API, MovieVerse delivers up-to-date details including ratings,
            trailers, cast, seasons, and streaming providers. Whether you’re
            searching for what to watch next, learning more about a specific
            show, or just exploring trending content — MovieVerse has you
            covered.
          </p>
        </section>

        {/* Features Section */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-red-400">
            🎬 Key Features
          </h2>

          <ul className="list-inside list-disc space-y-2 text-zinc-300">
            <li>Discover trending and top-rated movies & TV shows</li>
            <li>View detailed cast, crew, and character information</li>
            <li>Watch trailers and access official streaming links</li>
            <li>Explore seasons, episodes, and show-specific details</li>
            <li>Search easily across movies, shows, and people</li>
            <li>Clean, responsive UI built with React & Tailwind CSS</li>
          </ul>
        </section>

        {/* Mission Section */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-red-400">🌟 Our Vision</h2>

          <p className="leading-relaxed text-zinc-300">
            MovieVerse is more than just a database — it’s designed to be your
            personal movie companion. Our goal is to make discovering, tracking,
            and learning about films and series fast, elegant, and enjoyable for
            everyone who loves storytelling through cinema.
          </p>
        </section>

        {/* Footer / Credits */}
        <footer className="border-t border-zinc-800 pt-8 text-sm text-zinc-500">
          <p>
            Built with ❤️ using React, Redux, and Tailwind CSS. Data powered by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:underline"
            >
              TMDb API
            </a>
            .
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} MovieVerse. All rights reserved.
          </p>
        </footer>
      </div>

      {/* Background Image or gradient overlay */}
      <div className="absolute inset-0 bg-[url('https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg')] bg-cover bg-center opacity-20"></div>
    </div>
  );
}
