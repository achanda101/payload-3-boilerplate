import React from 'react'
import { serializeLexical } from '@/components/RichText/serializeRichText'
import { Heading } from '@/components/Heading'

interface TwoColumnBlockProps {
  title?: string | null
  subtitle?: string | null
  leftColumn?: any
  rightColumn?: any
}

export const TwoColumnBlock: React.FC<TwoColumnBlockProps> = ({
  title,
  subtitle,
  leftColumn,
  rightColumn,
}) => {
  const renderColumn = (columnData: any) => {
    if (!columnData) return null

    // Handle string data
    if (typeof columnData === 'string') {
      return (
        <div className="prose [&>*:first-child]:!mt-0 [&>*:first-child]:!pt-0 [&_li]:!text-[18px]">{columnData}</div>
      )
    }

    // Handle object data (Lexical)
    if (typeof columnData === 'object' && columnData !== null) {
      try {
        const children = columnData.root?.children || []
        if (Array.isArray(children) && children.length > 0) {
          return (
            <div className="column-block-content prose [&>*:first-child]:!mt-0 [&>*:first-child]:!pt-0 [&>*:first-child_img]:!mt-0 [&>*:last-child]:!mb-0 [&_li]:!text-[18px]">
              {serializeLexical({ nodes: children })}
            </div>
          )
        }
      } catch (error) {
        console.error('Error serializing column data:', error)
        return null
      }
    }

    return null
  }

  return (
    <div className="page_column_layout gap-x-6 gap-y-1 md:gap-y-4">
      <div className="col-span-full md:col-span-6 lg:col-span-6 md:col-start-1 lg:col-start-1">
        {title && <Heading level={3} className="mb-1" style={{ whiteSpace: 'pre-line' }}>{title}</Heading>}
      </div>
      <div className="col-span-full md:col-span-6 lg:col-span-6 md:col-start-1 lg:col-start-1">
        {subtitle && <p style={{ whiteSpace: 'pre-line' }}>{subtitle}</p>}
      </div>
      <div className="col-span-full md:col-span-4 lg:col-span-5 md:col-start-1 lg:col-start-1">
        <div className="flex flex-col">{renderColumn(leftColumn)}</div>
      </div>
      <div className="col-span-full md:col-span-4 lg:col-span-6 md:col-start-5 lg:col-start-7 mt-3 md:mt-0">
        <div className="flex flex-col">{renderColumn(rightColumn)}</div>
      </div>
    </div>
  )
}
