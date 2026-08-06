import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white px-6">
      <div className="max-w-lg text-center">
        <h1 className="text-8xl font-extrabold text-pink-600">404</h1>

        <h2 className="mt-4 text-3xl font-bold text-gray-800">
          Oops! Page Not Found
        </h2>

        <p className="mt-3 text-gray-600">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Welcome to the <span className="font-semibold text-pink-600">ManMohey</span> server.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-pink-600 px-6 py-3 text-white font-medium hover:bg-pink-700 transition"
          >
            🏠 Go Home
          </Link>

          <Link
            href="/collections"
            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Browse Collections
          </Link>
        </div>

        <p className="mt-10 text-xs text-gray-400">
          Error 404 • ManMohey
        </p>
      </div>
    </div>
  );
}