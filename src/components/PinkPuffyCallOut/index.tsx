import React from 'react'
import '@/styles/callouts.scss'
import { ButtonArray } from '@/components/ButtonArray'
import { Heading } from '@/components/Heading'

interface TopRowItem {
  title?: string | null
  subtitle?: string | null
  description?: string | null
  id?: string | null
}

interface BotRowItem {
  title?: string | null
  description?: string | null
  id?: string | null
}

interface LinkItem {
  link?: {
    type?: string
    newTab?: boolean | null
    downloadLink?: boolean | null
    arrowLink?: boolean | null
    pillSolid?: boolean | null
    pillOutline?: boolean | null
    url?: string | null
    label?: string | null
    email?: string | null
    reference?: {
      relationTo?: string
      value: {
        slug?: string
      }
    } | null
    doc?: {
      relationTo: string
      value: {
        url?: string
      }
    } | null
    etestlink?: any
  }
  id?: string | null
}

interface PinkPuffyCallOutProps {
  title?: string | null
  subtitle?: string | null
  align?: 'center' | 'left'
  topRow?: TopRowItem[] | null
  botRow?: BotRowItem[] | null
  links?: LinkItem[] | any
}

export const PinkPuffyCallOut: React.FC<PinkPuffyCallOutProps> = ({
  title,
  subtitle,
  align = 'center',
  topRow,
  botRow,
  links,
}) => {
  const alignmentClass = align === 'center' ? 'text-center' : 'text-left'

  return (
    <div className="page_column_layout gap-6 gap-y-0">
      {/* Header Section - Outside pink background */}
      <div
        className={
          alignmentClass === 'text-center'
            ? 'col-span-full md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4'
            : 'col-span-6 col-start-1'
        }
      >
        {(title || subtitle) && (
          <div className={`container mx-auto px-4 mb-8 md:mb-12 ${alignmentClass}`}>
            {title && <Heading level={4}>{title}</Heading>}
            {subtitle && <p>{subtitle}</p>}
          </div>
        )}
      </div>

      {/* Pink Puffy Background - Contains only content */}
      <div className="col-span-full mt-[40px] lg:mt-0">
        <div className={`pinkpuffy_callout ${botRow && botRow.length > 0 ? 'two_line' : ''}`}>
          <div className="py-12 lg:py-16 px-8 lg:px-20">
            {/* Top Row - Stats Grid */}
            {topRow && topRow.length > 0 && (
              <div
                className={`grid grid-cols-1 gap-8 lg:gap-0 lg:grid-cols-3 ${botRow && botRow.length > 0 ? 'pt-14' : 'pt-0'} lg:pt-12`}
              >
                {topRow.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="stat-item py-1 md:py-2 px-4 md:px-6 border-b border-black last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
                  >
                    <div className="mb-2">
                      {item.title && <Heading level={1}>{item.title}</Heading>}
                      {item.subtitle && <p className="tag">{item.subtitle}</p>}
                    </div>
                    {item.description && <p className="pb-6 lg:pb-0">{item.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Horizontal divider line */}
            {topRow && topRow.length > 0 && botRow && botRow.length > 0 && (
              <div className="w-full h-px my-8 bg-black"></div>
            )}

            {/* Bottom Row - Secondary Stats */}
            {botRow && botRow.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0 pb-20 lg:pb-12">
                {botRow.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="stat-item py-1 md:py-2 px-4 md:px-6 border-b border-black last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
                  >
                    {item.title && <Heading level={1}>{item.title}</Heading>}
                    {item.description && <p className="pb-6 lg:pb-0">{item.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Links Section */}
      {links && links.length > 0 && (
        <div className="col-span-full mt-6 lg:mt-8">
          <div className="flex">
            {links && <ButtonArray btnArray={links} colStackOnMobile={true} />}
          </div>
        </div>
      )}
    </div>
  )
}
