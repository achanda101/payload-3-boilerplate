'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageContext'
import { SecondaryCTA } from './components/SecondaryCTA'
import { GrantCardGrid } from '@/components/GrantCardGrid'
import { ColumnIndicators } from '../ColumnIndicators'
import { set } from 'react-hook-form'

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
                  grantCards={(block as any).grantCardGrid || []}
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
      })}
      
    </div>

  )
}