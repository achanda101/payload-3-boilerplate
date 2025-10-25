'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/providers/LanguageContext'
import { SecondaryCTA } from './components/SecondaryCTA'
import { GrantCardGrid } from '@/components/GrantCardGrid'
import { FeatureCard } from '@/components/FeatureCard'
import { ListingCardDeck } from '@/components/ListingCardDeck'
import { ColumnIndicators } from '../ColumnIndicators'

interface PageProps {
  data?: {
    contentBlocks: [
      { blockType: string } 
    ],
  }
}

export const PageContent: React.FC<PageProps> = ({ data = {} }) => {
  const { selectedLanguage } = useLanguage()
  const [ contentBlocks, setContentBlocks ] = useState(data.contentBlocks || [])

  const handleLanguageChange = async (newLanguage: string) => {
    try {
      const response = await fetch(`/api/globals/homepage?locale=${newLanguage}&depth=2`)
      const responseData = await response.json()
      
      if (responseData?.contentBlocks?.length > 0) {
        setContentBlocks(responseData.contentBlocks)
      }
      
    } catch (error) {
      console.error('Failed to fetch Content Blocks data:', error)
    }
  }
 
  useEffect(() => {
    handleLanguageChange(selectedLanguage)
  }, [ selectedLanguage ])
  
  
  return (
    <div className='frame_layout'>
      {contentBlocks && contentBlocks.length > 0 && contentBlocks.map((block, index) => {
        if (block.blockType === 'secondarycta') {
          return (
            <React.Fragment key={index}>
              <SecondaryCTA
                title={(block as any).ctaTitle || ''}
                subtitle={(block as any).ctaSubtitle || ''}
                ctaButton={(block as any).ctaButton || []}
              />
              {process.env.NODE_ENV === 'development' && (
                <div className="page_column_layout gap-6">
                  <ColumnIndicators />
                </div>
              )}
            </React.Fragment>
          )
        }
        if (block.blockType === 'grantCardGridBlock') {
          return (
            <React.Fragment key={index}>
              <div className="page_column_layout gap-6">
                <GrantCardGrid
                  grantCards={block as any}
                />
              </div>
              {process.env.NODE_ENV === 'development' && (
                <div className="page_column_layout gap-6">
                  <ColumnIndicators />
                </div>
              )}
            </React.Fragment>
          )
        }
        if (block.blockType === 'featCrd') {
          return (
            <React.Fragment key={index}>
              
              <FeatureCard
                title={block.title}
                subtitle={block.subtitle}
                desc={block.desc}
                tags={block.tags}
                image={block.image}
                link={block.link}
              />

              {process.env.NODE_ENV === 'development' && (
                <div className="page_column_layout gap-6">
                  <ColumnIndicators />
                </div>
              )}
            </React.Fragment>
          )
        }
        if (block.blockType === 'listCrdDck') {
          return (
            <React.Fragment key={index}>
              <div className="page_column_layout gap-6">
                <ListingCardDeck
                  title={block.title}
                  cards={block.cards}
                  buttons={block.buttons}
                />
              </div>
            </React.Fragment>
          )
        }
        return null;
      })}
      
    </div>

  )
}