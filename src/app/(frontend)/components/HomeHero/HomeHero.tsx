'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageContext'

interface HeroProps {
  data?: {
    heroSection?: {
      heroTitle?: string | null,
      heroSubtitle?: string | null,
      ctaButton?: {
        id: number,
        buttonPrimary?: boolean,
        link?: {
          type: string | null,
          newTab?: boolean | null,
          url?: string | null,
          label?: string | null
        }
      }[],
   }
  }
}

export const HomeHero: React.FC<HeroProps> = ({ data = {} }) => {

  const { selectedLanguage } = useLanguage()
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
    // Any side effects based on selectedLanguage can be handled here
    handleLanguageChange(selectedLanguage)
  }, [ selectedLanguage ])

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
      <div className="hero-content">
        <h2 style={{ whiteSpace: 'pre-line' }}>{heroData?.heroTitle}</h2>
        <p style={{ whiteSpace: 'pre-line' }}>{heroData?.heroSubtitle}</p>
        <div className="hero-buttons">
          {heroData?.ctaButton && heroData.ctaButton.length > 0 && (
          heroData.ctaButton.map((cta, index) => (
              <Link
                key={index}
                href={cta.link?.url || '#'}
                target={cta.link?.newTab ? '_blank' : '_self'}
              >
                <button className={`pill-button ${cta.buttonPrimary ? 'dark' : ''}`}>
                  {cta.link?.label}
                </button>
              </Link>
            ))
          )}
        </div>
      </div>
      
    </section>
  )
}