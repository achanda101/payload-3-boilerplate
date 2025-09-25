'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageContext'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { url } from 'inspector'

interface AssetCloud {
  id: number;
  alt: string;
  url?: string | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}

interface HeroProps {
  data?: {
    heroTitle?: string | null,
    heroSubtitle?: string | null,
    pageType?: 'landing' | 'individual',
    bgType?: string | null,
    heroButtons?: {
      id: number;
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
    heroContact?: {
      label?: string | null,
      email?: string | null
    },
    grantCard?: {
      id: number;
      badgeText?: string | null,
      badgeType?: string | null,
      cardColour?: string | null,
      mascot?: AssetCloud | null,
    },
    grantCardsGrid?: []
  }
}

interface GrantPageHeroProps {
  collection: string;
  docId: number;
}

export const GrantPageHero: React.FC<GrantPageHeroProps> = ({ 
  collection,
  docId
 }) => {
  const { selectedLanguage } = useLanguage()
  const { setHeaderTheme } = useHeaderTheme()
  const [ heroHeaderImg, setHeroHeaderImg ] = useState('wavy_top-trans')
  const [ heroBlock, setHeroBlock ] = useState < {
    title?: string | null,
    subtitle?: string | null,
    badgeText?: string | null,
    badgeType?: string | null,
    heroImage?: AssetCloud | null,
    heroButtons?: {
      id: number;
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
    heroContact?: {
      label?: string | null,
      email?: string | null
    },
  }>({})

  const handleLanguageChange = useCallback(async (newLanguage: string) => {
    const fetchPath = `/api/${collection}/${docId}?locale=${newLanguage}&depth=2`
    
    try {
      const response = await fetch(fetchPath)
      const data = await response.json()
      const headerColour = getHeaderColour(data.pageType, data.grantCard)
      setHeroHeaderImg(`${data.bgType}-${headerColour}`)
      setHeaderTheme(headerColour)
      setHeroBlock({
        title: data.heroTitle,
        subtitle: data.heroSubtitle,
        badgeText: data.grantCard?.badgeText,
        badgeType: data.grantCard?.badgeType,
        heroImage: data.grantCard?.mascot,
        heroButtons: data.heroButtons?.map((button: { id: number; link: any; }, index: number) => ({
          id: button.id,
          type: button.link.type,
          link: button.link,
          pillSolid: button.link.pillSolid,
          url: button.link.url,
          label: button.link.label,
          newTab: button.link.newTab,
          email: button.link.email,
          reference: button.link.reference,
        })),
        heroContact: data.heroContact,
      })
      
    } catch (error) {
      console.error('Failed to fetch Hero and Grant Card data on Page:', error)
    }
  }, [collection, docId, setHeaderTheme])


  useEffect(() => {
      // Any side effects based on selectedLanguage can be handled here
      handleLanguageChange(selectedLanguage)
    }, [ selectedLanguage, handleLanguageChange ])

  return (
    <section className="hero-banner">
      <Image
        src={`/heroes/${heroHeaderImg}.png`}
        alt="Header image"
        width={1440}
        height={100}
        sizes="(min-width: 769px) 100vw, 0vw"
        style={{ width: '100%', height: 'auto' }}
        className="desktop-image"
        priority
      />
      <Image
        src={`/heroes/${heroHeaderImg}-mobile.png`}
        alt="Header image"
        width={800}
        height={100}
        sizes="(max-width: 768px) 100vw, 0vw"
        style={{ width: '100%', height: 'auto' }}
        className="mobile-image"
        priority
      />
      <div className="hero-content">
        {heroBlock?.heroImage && typeof heroBlock.heroImage === 'object' && heroBlock.heroImage.url ? (
          <Image
            src={heroBlock.heroImage.url}
            alt="Header image"
            width={heroBlock.heroImage.width || 800}
            height={heroBlock.heroImage.height || 600}
            style={{ width: '100%', height: 'auto' }}
            className='hero-mascot'
            priority
          />
        ) : null}
        {heroBlock?.badgeText ? (
          <div className={`badge ${heroBlock?.badgeType}`}>
            <p className="tag">{heroBlock?.badgeText}</p>
          </div>
        ) : null}  
        <h2 style={{ whiteSpace: 'pre-line' }}>{heroBlock?.title}</h2>
        <p style={{ whiteSpace: 'pre-line' }}>{heroBlock?.subtitle}</p>
        <div>
          <div className="hero-buttons">
              {heroBlock?.heroButtons && heroBlock.heroButtons.length > 0 && (
                heroBlock.heroButtons.map((btn, index) => {
                  const getHref = () => {
                    if (!btn.link) return '#'
                    if (btn.link.type === 'reference') {
                      return `/${btn.link.reference?.relationTo}/${btn.link.reference?.value?.slug}` || '#'
                    } else if (btn.link.type === 'email') {
                      return `mailto:${btn.link.email}` || '#'
                    } else {
                      return btn.link.url || '#'
                    }
                  }
                  return (
                    <Link
                      key={index}
                      href={getHref()}
                      target={btn.link?.newTab ? '_blank' : '_self'}
                    >
                      <button className={`pill-button ${btn.link.pillSolid ? 'dark' : ''}`}>
                        {btn.link?.label}
                      </button>
                    </Link>
                  )
                })
              )}
          </div>
          <div className="hero-contact">
            {heroBlock?.heroContact?.label && heroBlock?.heroContact?.email && (
              <div className="hero-contact">
              <span>{heroBlock.heroContact.label}</span>
              <a href={`mailto:${heroBlock.heroContact.email}`}>{heroBlock.heroContact.email}</a>
              </div>
            )}
            </div>
          </div>
      </div>
    </section>
  )
}


const getHeaderColour = (pageType: 'landing' | 'individual', grantCard: {}) => {
  if (pageType === 'individual' && grantCard && typeof grantCard === 'object' && 'cardColour' in grantCard) {
    return `${(grantCard as { cardColour?: string | null }).cardColour}`.trim() || 'trans'
  }
  return 'trans'
}
