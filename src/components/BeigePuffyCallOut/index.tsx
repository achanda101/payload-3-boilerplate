import React from 'react'
import '@/styles/callouts.scss'

interface ItemType {
  title?: string | null
  subtitle?: string | null
  description?: string | null
  id?: string | null
}

interface BeigePuffyCallOutProps {
  title?: string | null
  subtitle?: string | null
  align?: 'center' | 'left'
  items?: ItemType[] | null
}

export const BeigePuffyCallOut: React.FC<BeigePuffyCallOutProps> = ({
  title,
  subtitle,
  align = 'center',
  items,
}) => {
  const alignmentClass = align === 'center' ? 'text-center' : 'text-left'

  return (
    <div className="page_column_layout gap-6 gap-y-0">
      {/* Header Section - Outside beige background */}
      <div
        className={
          alignmentClass === 'text-center'
            ? 'col-span-full md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4'
            : 'col-span-6 col-start-1'
        }
      >
        {(title || subtitle) && (
          <div className={`container mx-auto px-4 ${alignmentClass}`}>
            {title && <h4>{title}</h4>}
            {subtitle && <p>{subtitle}</p>}
          </div>
        )}
      </div>

      {/* Items Grid - Each item has its own beige puffy background */}
      <div className="col-span-full mt-[1rem] lg:mt-0">
        {items && items.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {items.map((item, index) => (
              <div key={item.id || index} className="beigepuffy_callout">
                <div className="py-12 lg:py-16 px-8 lg:px-12">
                  <div className="mb-4">
                    {item.title && <h4>{item.title}</h4>}
                    {item.subtitle && <p className="tag">{item.subtitle}</p>}
                  </div>
                  {item.description && <p>{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
