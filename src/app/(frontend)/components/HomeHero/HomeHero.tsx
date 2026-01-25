'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageContext'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { ButtonArray } from '@/components/ButtonArray'
import { Heading } from '@/components/Heading'

interface HeroProps {
  data?: any
  isDraft?: boolean
}

export const HomeHero: React.FC<HeroProps> = ({ data = {}, isDraft = false }) => {
  const { selectedLanguage } = useLanguage()
  const { setHeaderTheme } = useHeaderTheme()
  const [heroTitle, setHeroTitle] = useState<string>(data?.heroTitle || '')
  const [heroSubtitle, setHeroSubtitle] = useState<string>(data?.heroSubtitle || '')
  const [ctaButton, setCtaButton] = useState<any[]>(data?.ctaButton || [])

  const handleLanguageChange = useCallback(
    async (newLanguage: string) => {
      try {
        const draftParam = isDraft ? '&draft=true' : ''
        const response = await fetch(
          `/api/globals/homepage?locale=${newLanguage}&depth=1${draftParam}`,
        )
        const data = await response.json()

        setHeroTitle(data?.heroTitle || '')
        setHeroSubtitle(data?.heroSubtitle || '')
        setCtaButton(data?.ctaButton || [])
      } catch (error) {
        console.error('Failed to fetch Hero Section data:', error)
      }
    },
    [isDraft],
  )

  useEffect(() => {
    // Set the header colour to transparent
    setHeaderTheme('blank')
    // Any side effects based on selectedLanguage can be handled here
    handleLanguageChange(selectedLanguage)
  }, [selectedLanguage, setHeaderTheme, handleLanguageChange])

  return (
    <section className="hero-banner">
      <Image
        src="/heroes/homepage-hero-blob-birds.svg"
        alt="Homepage Hero Banner with an fire red blob in the center with birds flying around. The title and subtitle are placed within the blob."
        width={1440}
        height={100}
        sizes="(min-width: 769px) 100vw, 0vw"
        style={{ width: '100%', height: 'auto' }}
        className="desktop-image"
        priority
      />
      <Image
        src="/heroes/homepage-hero-blob-birds_mobile.svg"
        alt="Homepage Hero Banner with an fire red blob in the center with birds flying around. The title and subtitle are placed within the blob."
        width={800}
        height={100}
        sizes="(max-width: 768px) 100vw, 0vw"
        style={{ width: '100%', height: 'auto' }}
        className="mobile-image"
        priority
      />
      <div className="hero-container">
        <div className="hero-content">
          <Heading level={2} style={{ whiteSpace: 'pre-line' }}>{heroTitle}</Heading>
          <p style={{ whiteSpace: 'pre-line' }}>{heroSubtitle}</p>
          <ButtonArray btnArray={ctaButton || []} colStackOnMobile={true} />
        </div>
      </div>
    </section>
  )
}
