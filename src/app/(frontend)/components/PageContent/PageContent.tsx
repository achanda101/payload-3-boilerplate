'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageContext'
import { SecondaryCTA } from './components/SecondaryCTA'
import { GrantCardGrid } from '@/components/GrantCardGrid'
import { ColumnIndicators } from '../ColumnIndicators'

interface PageProps {
  data?: {
    secondaryCTA?: {
      id: number,
      ctaTitle?: string | '',
      ctaSubtitle?: string | '',
      ctaButton?: {
        id: number,
        buttonPrimary: boolean,
        link: {
          newTab: boolean,
          url: string,
          label: string
        }
      }[],
    }[],
  }
}

export const PageContent: React.FC<PageProps> = ({ data = {} }) => {
  const { selectedLanguage } = useLanguage()
  const [ secCTAData, setSecCTAData ] = useState<NonNullable<PageProps[ 'data' ]>[ 'secondaryCTA' ]>([])
  const [ grantCards, setGrantCards ] = useState([])

  const handleLanguageChange = async (newLanguage: string) => {
    try {
      const response = await fetch(`/api/globals/homepage?locale=${newLanguage}&depth=2`)
      const data = await response.json()
      setSecCTAData(data?.secondaryCTA || [])

      const grantCardsData = data.grantCards
      setGrantCards(grantCardsData || [])
      
    } catch (error) {
      console.error('Failed to fetch Secondary CTA Section data:', error)
    }
  }
  
  useEffect(() => {
    handleLanguageChange(selectedLanguage)
  }, [ selectedLanguage ])
  
  
  return (
    <div className='frame_layout'>
      {secCTAData && secCTAData.length > 0 && (
        secCTAData.map((cta, index) => (
          <SecondaryCTA
            key={index}
            title={cta?.ctaTitle || ''}
            subtitle={cta?.ctaSubtitle || ''}
            ctaButton={cta?.ctaButton || []}
            />
        ))
      )}
      {process.env.NODE_ENV === 'development' && (
        <div className="page_column_layout gap-6">
          <ColumnIndicators />
        </div>
      )}
      {/* Grant Cards Section */}
      <div className="page_column_layout gap-6">
        {grantCards && grantCards.length > 0 && (
          <GrantCardGrid
            grantCards={grantCards}
            showSpecialGrantCard={true}
          />
        )}
      </div>
    </div>

  )
}