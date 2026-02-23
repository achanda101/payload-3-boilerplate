import React from 'react'
import { serializeLexical } from '@/components/RichText/serializeRichText'
import { Heading } from '@/components/Heading'

interface ThreeColumnRow {
  firstColumn?: any
  secondColumn?: any
  thirdColumn?: any
}

interface ThreeColumnTableProps {
  title?: string | null
  subtitle?: string | null
  rows?: ThreeColumnRow[] | null
  columnWidths?: 'f-t-t' | 't-f-t' | 't-t-f' | 'vt-t-f'
}

export const ThreeColumnTable: React.FC<ThreeColumnTableProps> = ({
  title,
  subtitle,
  rows,
  columnWidths = 'f-t-t',
}) => {
  const getColumnWidthClass = (columnIndex: number): string => {
    const widthMap: Record<string, string[]> = {
      'f-t-t': ['lg:w-1/2', 'lg:w-1/4', 'lg:w-1/4'],
      't-f-t': ['lg:w-1/4', 'lg:w-1/2', 'lg:w-1/4'],
      't-t-f': ['lg:w-1/4', 'lg:w-1/4', 'lg:w-1/2'],
      'vt-t-f': ['lg:w-[15%]', 'lg:w-[30%]', 'lg:w-[55%]'],
    }
    return `w-full ${widthMap[columnWidths]?.[columnIndex] || 'lg:w-1/3'}`
  }

  const renderColumn = (columnData: any) => {
    if (!columnData) return null

    if (typeof columnData === 'string') {
      return (
        <div className="prose [&>*:first-child]:!mt-0 [&>*:first-child]:!pt-0 [&_p]:!mt-0 [&_li]:!text-[18px]">
          {columnData}
        </div>
      )
    }

    if (typeof columnData === 'object' && columnData !== null && columnData.root) {
      const children = columnData.root?.children
      if (Array.isArray(children) && children.length > 0) {
        return (
          <div className="prose [&>*:first-child]:!mt-0 [&>*:first-child]:!pt-0 [&>*:first-child_img]:!mt-0 [&_p]:!mt-0 [&_li]:!text-[18px]">
            {serializeLexical({ nodes: children })}
          </div>
        )
      }
    }

    return null
  }

  return (
    <>
      <div className="col-span-full md:col-span-5 lg:col-span-6">
        <div className="mb-6">
          {title && (
            <Heading level={3} style={{ whiteSpace: 'pre-line' }}>
              {title}
            </Heading>
          )}
          {subtitle && <p style={{ whiteSpace: 'pre-line' }}>{subtitle}</p>}
        </div>
      </div>
      <div className="col-span-full">
        {rows?.map((row, index) => (
          <div key={index} className="flex flex-col lg:flex-row border-t border-black py-4">
            <div className={`${getColumnWidthClass(0)} px-0 lg:px-4 first:lg:pl-0`}>
              {renderColumn(row.firstColumn)}
            </div>
            <div className={`${getColumnWidthClass(1)} px-0 lg:px-4`}>
              {renderColumn(row.secondColumn)}
            </div>
            <div className={`${getColumnWidthClass(2)} px-0 lg:px-4 last:lg:pr-0`}>
              {renderColumn(row.thirdColumn)}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
