'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageContext'
import { SecondaryCTA } from './components/SecondaryCTA'

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

  const handleLanguageChange = async (newLanguage: string) => {
    try {
      const response = await fetch(`/api/globals/homepage?locale=${newLanguage}&depth=1`)
      const data = await response.json()
      setSecCTAData(data?.secondaryCTA || [])
      
    } catch (error) {
      console.error('Failed to fetch Secondary CTA Section data:', error)
    }
  }
  
  useEffect(() => {
    handleLanguageChange(selectedLanguage)
  }, [ selectedLanguage ])
  
  
  return (
    <div>
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
    </div>
  )
}