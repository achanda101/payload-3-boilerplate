'use client'
import React from 'react'
import Image from 'next/image'
import { serializeLexical } from '@/components/RichText/serialize'
import '@/styles/cards.scss'

interface PillarCardProps {
  title?: string | null
  subtitle?: any
  align?: 'left' | 'center'
  cards?: {
    id: string
    title: string
    mascot?: {
      id: string
      alt: string | null
      url?: string | null
      width?: number | null
      height?: number | null
    }
  }[]
}

export const PillarCard: React.FC<PillarCardProps> = ({
  title,
  subtitle,
  align = 'left',
  cards,
}) => {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'
  const columnClass =
    align === 'center' ? 'md:col-start-2 lg:col-start-4' : 'md:col-start-1 lg:col-start-1'

  return (
    <>
      {/* Title */}
      {title && (
        <h4 className={`col-span-full md:col-span-6 lg:col-span-6 ${columnClass} ${alignClass}`}>
          {title}
        </h4>
      )}

      {/* Subtitle (Lexical rich text) */}
      {subtitle && typeof subtitle === 'object' ? (
        <div
          className={`col-span-full md:col-span-6 lg:col-span-6 ${columnClass} ${alignClass} -mt-6`}
        >
          {serializeLexical({ nodes: subtitle.root?.children || [] })}
        </div>
      ) : subtitle ? (
        <p
          className={`col-span-full md:col-span-6 lg:col-span-6 ${columnClass} ${alignClass} -mt-6`}
        >
          {subtitle}
        </p>
      ) : null}

      {/* Cards Grid */}
      <div className="col-span-full grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {cards?.map((card, index) => (
          <div key={card.id} className="pillarCard">
            <div className="p-6 md:p-8 flex flex-col h-full">
              {/* Card Number & Title */}
              <div className="flex flex-col row-gap-1 lg:flex-row lg:gap-5 lg:items-start">
                <h4 className="text-color-light mb-0">{String(index + 1).padStart(2, '0')}</h4>
                <h6 className="mt-[5px] mb-4 lg:mt-0 lg:mb-0">{card.title}</h6>
              </div>

              {/* Mascot Image */}
              {card.mascot?.url && (
                <div className="mt-5 flex justify-center">
                  <Image
                    src={card.mascot.url}
                    alt={card.mascot.alt || 'Mascot'}
                    width={card.mascot.width || 150}
                    height={card.mascot.height || 200}
                    className="object-contain max-h-[200px] md:max-h-[250px]"
                    style={{ width: 'auto' }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
