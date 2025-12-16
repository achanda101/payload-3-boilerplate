import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = () => {
  // Fallback to root path if NEXT_PUBLIC_SERVER_URL is not defined
  const homeUrl = process.env.NEXT_PUBLIC_SERVER_URL || '/'

  return (
    <Link href={homeUrl}>
      <Image
        alt="UAF A&P Logo"
        width={305}
        height={70}
        src="/uafanp-logo.png"
      />
    </Link>
  )
}

