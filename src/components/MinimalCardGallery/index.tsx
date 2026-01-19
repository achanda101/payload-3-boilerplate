'use client'
import React from 'react'
import Image from 'next/image'

interface MinimalCardGalleryProps {
  header?: {
    title?: string | null
    subtitle?: string | null
    align?: 'left' | 'center'
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
    title: string
    description?: string | null
  }[]
}

export const MinimalCardGallery: React.FC<MinimalCardGalleryProps> = ({ header, cards }) => {
  const alignClass = header?.align === 'center' ? 'text-center' : 'text-left'

  return (
    <>
      {/* Block Header */}
      {(header?.title || header?.subtitle) && (
        <div className="col-span-6 md:col-span-5 lg:col-span-6">
          {header?.title && <h3 className={alignClass}>{header.title}</h3>}
          {header?.subtitle && <p className={`${alignClass} mt-4`}>{header.subtitle}</p>}
        </div>
      )}

      {/* Cards Grid */}
      {cards && cards.length > 0 && (
        <div className="col-span-full grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {cards.map((card) => (
            <div key={card.id} className="border-t border-black pt-4">
              {/* Mascot Image - fixed 60px height */}
              {card.mascot?.url && (
                <div className="mb-3">
                  <Image
                    src={card.mascot.url}
                    alt={card.mascot.alt || 'Card mascot'}
                    width={Math.round(
                      (card.mascot.width || 60) * (60 / (card.mascot.height || 60)),
                    )}
                    height={60}
                    className="object-contain h-[60px] w-auto"
                  />
                </div>
              )}

              {/* Card Title */}
              <h5 className="mb-2">{card.title}</h5>

              {/* Card Description */}
              {card.description && (
                <p className="text-sm" style={{ whiteSpace: 'pre-line' }}>
                  {card.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
