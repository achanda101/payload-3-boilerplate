import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'
import { CMSLink } from '../../components/Link'

interface ContentBlockProps {
  id?: string
  columns?: Array<{
    enableLink?: boolean
    link?: {
      type?: 'reference' | 'custom'
      reference?: any
      url?: string
      label: string
      newTab?: boolean
    }
    richText?: any
    size?: 'full' | 'half' | 'oneThird' | 'twoThirds'
  }>
  blockType?: 'content'
}

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                {richText && <RichText content={richText} enableGutter={false} />}

                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
