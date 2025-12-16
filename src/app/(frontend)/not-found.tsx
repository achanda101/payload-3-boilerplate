import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="w-full px-[1.25rem] py-[2.5rem] lg:px-[5rem] lg:py-[5rem]">
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-6xl font-bold lg:text-8xl">404</h1>
        <h2 className="text-2xl font-semibold lg:text-4xl">Page Not Found</h2>
        <p className="max-w-[600px] text-lg lg:text-xl">
          The page you are looking for might have been removed, had its name changed, or is
          temporarily unavailable.
        </p>
        <Link href="/" className="mt-4">
          <button className="pill-button dark">Return Home</button>
        </Link>
      </main>
    </div>
  )
}

export const metadata: Metadata = {
  title: '404 - Page Not Found | Urgent Action Fund: Asia & Pacific',
  description: 'The page you are looking for could not be found.',
}
