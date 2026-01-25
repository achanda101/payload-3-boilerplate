import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UAFButton } from '@/components/UAFButton'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Heading } from '@/components/Heading'

interface ResourceCardProps {
  id: string
  title: string | null
  desc: string | null
  image?: {
    id: string
    alt: string | null
    url?: string | null
    width?: number | null
    height?: number | null
    focalX?: number | null
    focalY?: number | null
  }
  tags?: {
    id: string
    tag: string | null
  }[]
  link: {
    type: string
    newTab?: boolean | null
    downloadLink?: boolean | null
    arrowLink?: boolean | null
    pillSolid?: boolean | null
    pillOutline?: boolean | null
    url?: string | null
    email?: string | null
    label: string | null
    doc?: {
      relationTo: string
      value: {
        url?: string
      }
    } | null
    reference?: {
      relationTo?: string
      value: {
        slug?: string
      }
    }
  }
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  id,
  title,
  desc,
  image,
  tags,
  link,
}) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
  let currentCardWidth = 0
  let numCardsPerRow = 3

  // Calculate width based on the number of cards and available space
  if (isDesktop) {
    const desiredCardWidth = Math.max(100 / numCardsPerRow, 18)
    currentCardWidth = Math.min(desiredCardWidth, 28)
  } else if (isTablet) {
    const desiredCardWidth = Math.max(100 / numCardsPerRow, 40)
    currentCardWidth = Math.min(desiredCardWidth, 48)
  } else {
    currentCardWidth = 80 //80vw for mobile
  }

  return (
    <div
      className={`px-[1rem] md:px-[2rem] py-0 h-full flex flex-col`}
      style={{ width: `${currentCardWidth}vw` }}
      key={id}
    >
      {image?.url && (
        <Link href={link?.reference?.value?.slug ? `/${link.reference.relationTo}/${link.reference.value.slug}` : '#'}>
          <div className="w-full relative mb-4 h-80 overflow-hidden rounded-2xl">
            <Image
              src={image.url}
              alt={image.alt || 'Listing Card Image'}
              fill
              sizes="(max-width: 768px) 80vw, (max-width: 1023px) 48vw, 28vw"
              className="object-cover"
              style={{
                objectPosition: `${image.focalX ?? 50}% ${image.focalY ?? 50}%`,
              }}
            />
          </div>
        </Link>
      )}
      {title && <Heading level={5} className="mb-2">{title}</Heading>}
      {tags && (
        <div className="flex flex-wrap gap-1 items-center my-[0.5rem]">
          {tags.map((tag, index) => (
            <React.Fragment key={tag.id || index}>
              <span className="tag">{tag.tag}</span>
              {index < tags!.length - 1 && <span className="mx-0.5">•</span>}
            </React.Fragment>
          ))}
        </div>
      )}
      {desc && <p className="mb-4 text-color-light">{desc}</p>}
      {link && <UAFButton button={link} />}
    </div>
  )
}
