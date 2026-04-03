'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Heading } from '@/components/Heading'
import { useLanguage } from '@/providers/LanguageContext'
import { getLocalizedRegionLabel } from '@/blocks/FundingMap/regionLabels'

interface FundingMapSubitem {
  id?: string | null
  statnumber?: string | null
  description?: string | null
}

interface FundingMapItem {
  id?: string | null
  regionName?: string | null
  subitems?: FundingMapSubitem[] | null
}

export interface FundingMapProps {
  title?: string | null
  subtitle?: string | null
  selectorLabel?: string | null
  items?: FundingMapItem[] | null
}

export const FundingMap: React.FC<FundingMapProps> = ({
  title,
  subtitle,
  selectorLabel,
  items,
}) => {
  const { selectedLanguage } = useLanguage()
  const [selectedRegion, setSelectedRegion] = useState<string>(
    items && items.length > 0 ? items[0].regionName || '' : '',
  )

  const selectedItem = items?.find((item) => item.regionName === selectedRegion)

  const getRegionLabel = (regionName?: string | null) =>
    getLocalizedRegionLabel(regionName || '', selectedLanguage)

  return (
    <div className="page_column_layout gap-6">
      {/* Text Content Section - 4 columns on desktop, full width on mobile/tablet */}
      <div className="col-span-full md:col-span-8 lg:col-span-4">
        {title && <Heading level={3}>{title}</Heading>}
        {subtitle && <p>{subtitle}</p>}

        {selectorLabel && <p className="tag mt-6">{selectorLabel}</p>}

        {/* Dropdown Selector */}
        {items && items.length > 0 && (
          <div className="mt-4">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-full bg-white cursor-pointer"
            >
              {items.map((item) => (
                <option key={item.id} value={item.regionName || ''}>
                  {getRegionLabel(item.regionName)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Subitems - Statistics - Desktop: stacked vertically, Mobile/Tablet: horizontal */}
        {selectedItem?.subitems && selectedItem.subitems.length > 0 && (
          <div className="mt-8 flex flex-row lg:flex-col gap-6 lg:gap-8">
            {selectedItem.subitems.map((subitem: FundingMapSubitem, index: number) => (
              <div
                key={subitem.id || index}
                className="flex-1 lg:flex-none border-r border-black pr-2 lg:pr-0 last:border-r-0 lg:border-r-0 lg:border-b lg:pb-4 lg:last:border-b-0"
              >
                {subitem.statnumber && (
                  <>
                    <Heading level={3} className="md:hidden">{subitem.statnumber}</Heading>
                    <Heading level={2} className="hidden md:block">{subitem.statnumber}</Heading>
                  </>
                )}
                {subitem.description && (
                  <>
                    <p className="mt-2 md:hidden">{subitem.description}</p>
                    <p className="tag hidden md:block">{subitem.description}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Map Image Section - 7 columns on desktop, full width on mobile/tablet */}
      <div className="col-span-full md:col-span-8 lg:col-span-7 lg:col-start-6">
        {selectedRegion && (
          <div className="relative w-full h-[250px] md:h-[500px] lg:h-[600px]">
            <Image
              src={`/fundingmap_countries/${selectedRegion}.png`}
              alt={getRegionLabel(selectedRegion)}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 58vw"
              className="object-contain"
            />
          </div>
        )}
      </div>
    </div>
  )
}
