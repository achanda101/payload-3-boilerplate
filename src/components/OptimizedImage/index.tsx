import React from 'react'
import Image from 'next/image'
import type { MediaCloud, AssetCloud } from '@/payload-types'

interface OptimizedImageProps {
  media: MediaCloud | AssetCloud | string
  alt?: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  style?: React.CSSProperties
}

/**
 * Optimized Image component with blurhash placeholder support
 * Supports MediaCloud, AssetCloud, and string URLs
 * Wraps Next.js Image with automatic blur placeholder from upload collections
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  media,
  alt,
  fill = false,
  width,
  height,
  className,
  priority = false,
  sizes,
  style,
}) => {
  // Handle string URLs (legacy or external images)
  if (typeof media === 'string') {
    return (
      <Image
        src={media}
        alt={alt || ''}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={className}
        priority={priority}
        sizes={sizes}
        style={style}
      />
    )
  }

  // Extract data from MediaCloud/AssetCloud object
  const imageUrl = media.url
  const imageAlt = alt || media.alt || ''
  const blurhash = media.blurhash
  const focalX = media.focalX ?? 50
  const focalY = media.focalY ?? 50

  // Calculate object position from focal point
  const objectPosition = `${focalX}% ${focalY}%`

  // Determine if we should use blurhash placeholder
  const hasBlur = Boolean(blurhash)

  // For fill mode, merge objectPosition into style
  const fillStyle = fill
    ? {
        objectFit: 'cover' as const,
        objectPosition,
        ...style,
      }
    : style

  return (
    <Image
      src={imageUrl || ''}
      alt={imageAlt}
      fill={fill}
      width={!fill ? width || media.width || undefined : undefined}
      height={!fill ? height || media.height || undefined : undefined}
      className={className}
      priority={priority}
      sizes={sizes}
      placeholder={hasBlur ? 'blur' : 'empty'}
      blurDataURL={blurhash || undefined}
      style={fillStyle}
    />
  )
}

export default OptimizedImage
