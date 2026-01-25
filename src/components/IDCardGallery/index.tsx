'use client'
import React from 'react'
import Image from 'next/image'
import { Heading } from '@/components/Heading'

interface IDCardGalleryProps {
  header?: {
    title?: string | null
    subtitle?: string | null
    description?: string | null
  }
  cards?: {
    id: string
    mascot?: {
      id: string
      alt: string | null
      url?: string | null
      width?: number | null
      height?: number | null
    }
    pronouns?: string | null
    fullname: string
    designation?: string | null
  }[]
}

export const IDCardGallery: React.FC<IDCardGalleryProps> = ({ header, cards }) => {
  return (
    <>
      {/* Block Header - Left Aligned */}
      {(header?.title || header?.subtitle || header?.description) && (
        <div className="col-span-6 md:col-span-5 lg:col-span-6">
          {header?.title && <Heading level={3} className="text-left">{header.title}</Heading>}
          {header?.subtitle && <Heading level={4} className="text-left mt-2">{header.subtitle}</Heading>}
          {header?.description && <p className="text-left mt-4">{header.description}</p>}
        </div>
      )}

      {/* Cards Grid: 2/row mobile, 4/row tablet, 4/row desktop */}
      {cards && cards.length > 0 && (
        <div className="col-span-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-4 lg:gap-6">
          {cards.map((card) => (
            <div key={card.id} className="flex flex-col">
              {/* Mascot Image - fixed height container for alignment */}
              <div className="h-[120px] flex items-end mb-3">
                {card.mascot?.url && (
                  <Image
                    src={card.mascot.url}
                    alt={card.mascot.alt || 'ID card mascot'}
                    width={Math.round(
                      (card.mascot.width || 120) * (120 / (card.mascot.height || 120)),
                    )}
                    height={120}
                    className="object-contain max-h-[120px] max-w-full w-auto h-auto"
                  />
                )}
              </div>

              {/* Pronouns - fixed position */}
              <div className="mt-4 h-6 flex items-center">
                {card.pronouns && <p className="tag">{card.pronouns}</p>}
              </div>

              {/* Full Name */}
              <Heading level={5} className="mt-4 break-words">{card.fullname}</Heading>

              {/* Designation */}
              {card.designation && (
                <p className="mt-2 break-words" style={{ whiteSpace: 'pre-line' }}>
                  {card.designation}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
