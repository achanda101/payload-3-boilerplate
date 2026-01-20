import React from 'react'
import { serializeLexical } from '@/components/RichText/serializeRichText'

interface ColumnData {
  id?: string
  content?: any
}

interface RowData {
  id?: string
  columns?: ColumnData[]
}

interface ThreeColumnTableProps {
  title?: string | null
  subtitle?: string | null
  rows?: RowData[]
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

    // Handle string data
    if (typeof columnData === 'string') {
      return (
        <div className="prose [&>*:first-child]:!mt-0 [&>*:first-child]:!pt-0 [&_p]:!mt-0 [&_li]:!my-0 [&_li]:!text-[18px]">{columnData}</div>
      )
    }

    // Handle object data (Lexical)
    if (typeof columnData === 'object' && columnData !== null && columnData.root) {
      const children = columnData.root?.children
      if (Array.isArray(children) && children.length > 0) {
        return (
          <div className="prose [&>*:first-child]:!mt-0 [&>*:first-child]:!pt-0 [&>*:first-child_img]:!mt-0 [&_p]:!mt-0 [&_li]:!my-0 [&_li]:!text-[18px]">
            {serializeLexical({ nodes: children })}
          </div>
        )
      }
    }

    return null
  }

  if (!rows || !Array.isArray(rows)) return null

  return (
    <>
      <div className="col-span-full md:col-span-5 lg:col-span-6">
        {/* Title and Subtitle */}
        <div className="mb-6">
          {title && <h3 style={{ whiteSpace: 'pre-line' }}>{title}</h3>}
          {subtitle && <p style={{ whiteSpace: 'pre-line' }}>{subtitle}</p>}
        </div>
      </div>
      <div className="col-span-full">
        {/* Table Rows */}
        <div className="space-y-0">
          {rows.map((row, rowIndex) => (
            <div
              key={row.id || rowIndex}
              className="flex flex-col lg:flex-row border-t border-black py-4"
            >
              {row.columns &&
                Array.isArray(row.columns) &&
                row.columns.map((column, colIndex) => (
                  <div
                    key={column.id || colIndex}
                    className={`${getColumnWidthClass(colIndex)} px-0 lg:px-4 first:lg:pl-0 last:lg:pr-0 mb-4 last:mb-0 lg:mb-0`}
                  >
                    {renderColumn(column.content)}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
