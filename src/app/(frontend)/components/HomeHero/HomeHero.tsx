'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageContext'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { ButtonArray } from '@/components/ButtonArray'

interface HeroProps {
  data?: {
    heroSection?: {
      heroTitle?: string | null,
      heroSubtitle?: string | null,
      ctaButton?: {
        id: number,
        link: {
          type: string;
          newTab?: boolean;
          downloadLink?: boolean;
          pillSolid?: boolean;
          pillOutline?: boolean;
          url?: string;
          label: string;
          email?: string;
          reference?: {
            relationTo?: string;
            value: {
              slug?: string;
            };
          }
        }
      }[],
   }
  }
}

export const HomeHero: React.FC<HeroProps> = ({ data = {} }) => {
  const { selectedLanguage } = useLanguage()
  const { setHeaderTheme } = useHeaderTheme()
  const [ heroData, setHeroData ] = useState<NonNullable<HeroProps[ 'data' ]>[ 'heroSection' ]>({})
  
  
  const handleLanguageChange = async (newLanguage: string) => {
    try {
      const response = await fetch(`/api/globals/homepage?locale=${newLanguage}&depth=1`)
      const data = await response.json()
      setHeroData(data?.heroSection || {})
      
    } catch (error) {
      console.error('Failed to fetch Hero Section data:', error)
    }
  }

  useEffect(() => {
    // Set the header colour to transparent
    setHeaderTheme('blank')
    // Any side effects based on selectedLanguage can be handled here
    handleLanguageChange(selectedLanguage)
  }, [ selectedLanguage, setHeaderTheme ])

  return (
    <section className="hero-banner">
      <Image
        src="/heroes/homepage-hero-blob-birds.svg"
        alt="Homepage Hero Banner with an orange blob in the center with birds flying around. The title and subtitle are placed within the blob."
        width={1440}
        height={100}
        sizes="(min-width: 769px) 100vw, 0vw"
        style={{ width: '100%', height: 'auto' }}
        className="desktop-image"
        priority
      />
      <Image
        src="/heroes/homepage-hero-blob-birds_mobile.svg"
        alt="Homepage Hero Banner with an orange blob in the center with birds flying around. The title and subtitle are placed within the blob."
        width={800}
        height={100}
        sizes="(max-width: 768px) 100vw, 0vw"
        style={{ width: '100%', height: 'auto' }}
        className="mobile-image"
        priority
      />
      <div className="hero-container">
        <div className="hero-content">
          <h2 style={{ whiteSpace: 'pre-line' }}>{heroData?.heroTitle}</h2>
          <p style={{ whiteSpace: 'pre-line' }}>{heroData?.heroSubtitle}</p>
          <ButtonArray btnArray={heroData?.ctaButton || []} colStackOnMobile={true} />
        </div>
      </div>
      
    </section>
  )
}