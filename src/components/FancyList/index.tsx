import React from 'react'
import Image from 'next/image'
import { Heading } from '@/components/Heading'

// List marker images - cycle through these in sequence
const LIST_MARKERS = [
  '/list_markers/gem.png',
  '/list_markers/chain.png',
  '/list_markers/diamond.png',
  '/list_markers/cloud.png',
  '/list_markers/nugget.png',
  '/list_markers/squirt.png',
  '/list_markers/wave.png',
]

interface FancyListItem {
  id?: string
  title: string
  description?: string
}

interface FancyListProps {
  id?: string
  items?: FancyListItem[]
  blockType?: 'fancyListBlock'
}

export const FancyList: React.FC<FancyListProps> = ({ items }) => {
  if (!items || items.length === 0) return null

  return (
    <ul className="list-none p-0 m-0">
      {items.map((item, index) => {
        // Cycle through list markers
        const markerImage = LIST_MARKERS[index % LIST_MARKERS.length]

        return (
          <li
            key={item.id || index}
            className="flex items-start gap-4"
            style={index > 0 ? { marginTop: '2rem' } : undefined}
          >
            {/* Auto-assigned list marker - max 40px */}
            <div className="flex-shrink-0 w-10 h-10 flex items-start justify-center">
              <Image
                src={markerImage}
                alt=""
                width={40}
                height={40}
                className="object-contain max-w-[40px] max-h-[40px] w-auto h-auto"
              />
            </div>
            {/* Content */}
            <div className="flex-1">
              <Heading level={6} className="m-0 mb-1">{item.title}</Heading>
              {item.description && <p className="m-0 leading-normal">{item.description}</p>}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default FancyList
