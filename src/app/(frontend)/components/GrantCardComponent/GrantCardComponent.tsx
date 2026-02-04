'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '@/providers/LanguageContext'
import { GrantCard } from '@/components/GrantCard'

interface AssetCloud {
  id: string
  alt: string
  url?: string | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
}

interface CardLink {
  type: string
  url?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo?: string
    value: {
      slug?: string
    }
  }
  downloadLink?: boolean | null
  arrowLink?: boolean | null
  pillSolid?: boolean | null
  pillOutline?: boolean | null
  label: string | null
  etestlink?: {
    relationTo?: string
    value: {
      introCard?: object | null
      critList?: object | null
      isECard?: object | null
      notECard?: object | null
    }
  }
}

interface GrantCardComponentProps {
  collection: string
  docId: number
  isDraft?: boolean
}

export const GrantCardComponent: React.FC<GrantCardComponentProps> = ({
  collection,
  docId,
  isDraft = false,
}) => {
  const { selectedLanguage } = useLanguage()
  const [grantBlock, setGrantBlock] = useState<{
    title?: string | null
    desc?: string | null
    badgeText?: string | null
    badgeType?: string | null
    cardColour?: string | null
    mascot?: AssetCloud | null
    grantSpecs?: Array<{
      id: string
      spec: string
    }> | null
    grantUses?: string | null
    cardButtons?: Array<{
      id: string
      link: CardLink
    }> | null
    specialGrant?: boolean | null
    activePeriod?: 'open_all_year' | 'specific_period' | 'closed' | null
    startDate?: string | null
    endDate?: string | null
    msg?: string | null
  }>({})

  const handleLanguageChange = useCallback(
    async (newLanguage: string) => {
      const draftParam = isDraft ? '&draft=true' : ''
      const fetchPath = `/api/${collection}/${docId}?locale=${newLanguage}&depth=3${draftParam}&trash=false`

      try {
        const response = await fetch(fetchPath)
        const data = await response.json()
        setGrantBlock(data)
      } catch (error) {
        console.error('Failed to fetch Grant Card Content data on :', error)
      }
    },
    [collection, docId, isDraft],
  )

  useEffect(() => {
    handleLanguageChange(selectedLanguage)
  }, [selectedLanguage, handleLanguageChange])

  return (
    <>
      <div className="w-full px-[1.25rem] lg:px-[5rem]">
        <div className="frame_layout">
          <div className="w-2/3 mx-auto mb-[2.5rem]">
            <GrantCard
              badgeText={grantBlock.badgeText || ''}
              badgeType={grantBlock.badgeType || ''}
              title={grantBlock.title || ''}
              desc={grantBlock.desc || ''}
              cardColour={grantBlock.cardColour || undefined}
              mascot={grantBlock.mascot || null}
              grantSpecs={grantBlock.grantSpecs || []}
              grantUses={grantBlock.grantUses || ''}
              cardButtons={grantBlock.cardButtons || []}
              specialGrant={grantBlock.specialGrant || false}
              activePeriod={grantBlock.activePeriod || undefined}
              startDate={grantBlock.startDate || null}
              endDate={grantBlock.endDate || null}
              msg={grantBlock.msg || null}
            />
          </div>
        </div>
      </div>
    </>
  )
}
