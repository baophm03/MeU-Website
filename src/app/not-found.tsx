'use client';

import Link from 'next/link';

export default function notFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Number */}
        <h1 className="text-9xl font-bold text-blue-800 ">
          404
        </h1>
        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Page not found
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="px-8 py-3 bg-blue-800  text-white font-semibold rounded-lg shadow-lg hover:shadow-xl duration-200"
          >
            Back to home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-lg border border-gray-200 duration-200"
          >
            Go back
          </button>
        </div>

        {/* Additional Help */}
        <div className="pt-8 text-sm text-gray-500">
          <p>You can try:</p>
          <ul className="mt-2 space-y-1">
            <li>• Check the URL again</li>
            <li>• Search for the content you need</li>
            <li>• Contact us if you think this is an error</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
