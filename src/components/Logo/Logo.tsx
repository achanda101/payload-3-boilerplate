import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = () => {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}`}>
    <Image
      alt="UAF A&P Logo"
      width={305}
      height={70}
      src="/uafanp-logo.png"
      />
      </Link>
  )
}

